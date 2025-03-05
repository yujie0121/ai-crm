import * as tf from '@tensorflow/tfjs';

/**
 * 用户行为数据接口
 */
export interface UserBehaviorData {
  userId: string;
  productId: string;
  interactionType: 'view' | 'like' | 'purchase';
  timestamp: Date;
  rating?: number; // 评分 (1-5)
  timeSpent?: number; // 浏览时间（秒）
}

/**
 * 产品特征接口
 */
export interface ProductFeatures {
  productId: string;
  category: string;
  price: number;
  features: number[]; // 产品特征向量
  popularity: number; // 产品流行度 (0-1)
}

/**
 * 推荐结果接口
 */
export interface RecommendationResult {
  userId: string;
  recommendations: {
    productId: string;
    score: number;
    reason: string;
  }[];
  personalizationScore: number; // 个性化程度 (0-1)
}

/**
 * 智能推荐系统模型类
 */
export class RecommendationSystem {
  private model: tf.LayersModel | null = null;
  private userEmbeddings: Map<string, number[]> = new Map();
  private productEmbeddings: Map<string, number[]> = new Map();
  private readonly embeddingSize = 32;

  /**
   * 初始化模型
   */
  async initialize(): Promise<void> {
    this.model = tf.sequential();
    
    // 构建模型架构
    this.model.add(tf.layers.dense({
      inputShape: [this.embeddingSize * 2], // 用户和产品嵌入的拼接
      units: 64,
      activation: 'relu'
    }));
    
    this.model.add(tf.layers.dropout({ rate: 0.3 }));
    
    this.model.add(tf.layers.dense({
      units: 32,
      activation: 'relu'
    }));
    
    this.model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));
    
    this.model.compile({
      optimizer: 'adam',
      loss: 'binaryCrossentropy',
      metrics: ['accuracy']
    });
    
    console.log('推荐系统模型已初始化');
  }

  /**
   * 更新用户嵌入向量
   */
  private updateUserEmbedding(userId: string, behaviors: UserBehaviorData[]): void {
    // 基于用户行为计算嵌入向量
    const embedding = new Array(this.embeddingSize).fill(0);
    
    behaviors.forEach(behavior => {
      const weight = this.getInteractionWeight(behavior);
      const productEmbedding = this.productEmbeddings.get(behavior.productId);
      
      if (productEmbedding) {
        for (let i = 0; i < this.embeddingSize; i++) {
          embedding[i] += productEmbedding[i] * weight;
        }
      }
    });
    
    // 归一化
    const norm = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
    if (norm > 0) {
      for (let i = 0; i < this.embeddingSize; i++) {
        embedding[i] /= norm;
      }
    }
    
    this.userEmbeddings.set(userId, embedding);
  }

  /**
   * 获取交互权重
   */
  private getInteractionWeight(behavior: UserBehaviorData): number {
    const weights = {
      view: 1,
      like: 2,
      purchase: 3
    };
    
    let weight = weights[behavior.interactionType];
    
    // 考虑评分和时间因素
    if (behavior.rating) {
      weight *= behavior.rating / 5;
    }
    
    if (behavior.timeSpent) {
      weight *= Math.min(behavior.timeSpent / 300, 1); // 最多考虑5分钟
    }
    
    return weight;
  }

  /**
   * 生成产品推荐
   */
  async generateRecommendations(
    userId: string,
    availableProducts: ProductFeatures[],
    limit: number = 5
  ): Promise<RecommendationResult> {
    const userEmbedding = this.userEmbeddings.get(userId);
    if (!userEmbedding) {
      throw new Error('用户数据不足，无法生成推荐');
    }

    const recommendations = await Promise.all(
      availableProducts.map(async product => {
        const productEmbedding = this.productEmbeddings.get(product.productId);
        if (!productEmbedding) return null;

        const combinedEmbedding = [...userEmbedding, ...productEmbedding];
        const inputTensor = tf.tensor2d([combinedEmbedding]);
        const prediction = this.model!.predict(inputTensor) as tf.Tensor;
        const score = (await prediction.data())[0];

        // 释放张量
        inputTensor.dispose();
        prediction.dispose();

        return {
          productId: product.productId,
          score: score,
          reason: this.generateRecommendationReason(score, product)
        };
      })
    );

    // 过滤空值并按得分排序
    const validRecommendations = recommendations
      .filter((r): r is NonNullable<typeof r> => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // 计算个性化程度
    const personalizationScore = this.calculatePersonalizationScore(validRecommendations);

    return {
      userId,
      recommendations: validRecommendations,
      personalizationScore
    };
  }

  /**
   * 生成推荐理由
   */
  private generateRecommendationReason(score: number, product: ProductFeatures): string {
    const reasons: string[] = [];

    if (score > 0.8) {
      reasons.push('非常符合您的购物偏好');
    } else if (score > 0.6) {
      reasons.push('基于您的历史浏览记录推荐');
    }

    if (product.popularity > 0.8) {
      reasons.push('近期热门商品');
    }

    if (reasons.length === 0) {
      reasons.push('您可能感兴趣的商品');
    }

    return reasons[0];
  }

  /**
   * 计算推荐的个性化程度
   */
  private calculatePersonalizationScore(recommendations: {
    productId: string;
    score: number;
    reason: string;
  }[]): number {
    if (recommendations.length === 0) return 0;

    // 计算推荐分数的方差作为个性化指标
    const scores = recommendations.map(r => r.score);
    const mean = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const variance = scores.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scores.length;

    // 将方差映射到0-1范围
    return Math.min(variance * 4, 1);
  }

  /**
   * 更新模型
   */
  async updateModel(
    behaviors: UserBehaviorData[],
    products: ProductFeatures[]
  ): Promise<void> {
    // 更新产品嵌入
    products.forEach(product => {
      this.productEmbeddings.set(product.productId, this.generateProductEmbedding(product));
    });

    // 按用户分组行为数据
    const userBehaviors = new Map<string, UserBehaviorData[]>();
    behaviors.forEach(behavior => {
      const userBehaviorList = userBehaviors.get(behavior.userId) || [];
      userBehaviorList.push(behavior);
      userBehaviors.set(behavior.userId, userBehaviorList);
    });

    // 更新用户嵌入
    userBehaviors.forEach((behaviors, userId) => {
      this.updateUserEmbedding(userId, behaviors);
    });

    console.log('推荐系统模型已更新');
  }

  /**
   * 生成产品嵌入向量
   */
  private generateProductEmbedding(product: ProductFeatures): number[] {
    // 将产品特征转换为嵌入向量
    const embedding = [...product.features];
    
    // 如果特征向量长度不够，补充随机值
    while (embedding.length < this.embeddingSize) {
      embedding.push(Math.random() * 2 - 1);
    }
    
    // 如果特征向量过长，截取
    return embedding.slice(0, this.embeddingSize);
  }

  /**
   * 保存模型
   */
  async saveModel(path: string): Promise<void> {
    if (!this.model) {
      throw new Error('模型尚未初始化');
    }

    await this.model.save(`file://${path}`);
    console.log(`模型已保存到 ${path}`);
  }

  /**
   * 加载模型
   */
  async loadModel(path: string): Promise<void> {
    this.model = await tf.loadLayersModel(`file://${path}`);
    console.log(`模型已从 ${path} 加载`);
  }
}