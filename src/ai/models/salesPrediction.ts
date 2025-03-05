import * as tf from '@tensorflow/tfjs';

/**
 * 销售数据接口
 */
export interface SalesData {
  date: Date;
  productId: string;
  quantity: number;
  revenue: number;
  seasonality: number; // 季节性因子 (1-4)
  marketTrend: number; // 市场趋势指标 (-1 到 1)
  promotionActive: boolean; // 是否有促销活动
}

/**
 * 销售预测结果接口
 */
export interface SalesPredictionResult {
  productId: string;
  predictedQuantity: number;
  predictedRevenue: number;
  confidenceScore: number; // 预测置信度 (0-1)
  trendDirection: 'up' | 'down' | 'stable';
  seasonalImpact: number; // 季节性影响程度 (-1 到 1)
  recommendedActions: string[];
}

/**
 * 销售预测模型类
 */
export class SalesPredictionModel {
  private model: tf.LayersModel | null = null;

  /**
   * 初始化模型
   */
  async initialize(): Promise<void> {
    this.model = tf.sequential();
    
    // 构建模型架构
    this.model.add(tf.layers.dense({
      inputShape: [6], // 输入特征数量
      units: 32,
      activation: 'relu'
    }));
    
    this.model.add(tf.layers.dropout({
      rate: 0.2
    }));
    
    this.model.add(tf.layers.dense({
      units: 16,
      activation: 'relu'
    }));
    
    this.model.add(tf.layers.dense({
      units: 2, // 预测数量和收入
      activation: 'linear'
    }));
    
    this.model.compile({
      optimizer: 'adam',
      loss: 'meanSquaredError',
      metrics: ['mse']
    });
    
    console.log('销售预测模型已初始化');
  }

  /**
   * 预处理销售数据
   */
  private preprocessData(data: SalesData): tf.Tensor {
    // 将日期转换为年份的小数部分
    const yearFraction = data.date.getMonth() / 12;
    
    // 归一化数据
    const normalizedData = [
      yearFraction,
      data.quantity / 1000, // 假设最大数量为1000
      data.revenue / 100000, // 假设最大收入为100000
      data.seasonality / 4, // 季节性因子归一化
      data.marketTrend, // 已经在 -1 到 1 范围内
      data.promotionActive ? 1 : 0 // 转换布尔值为数字
    ];
    
    return tf.tensor2d([normalizedData]);
  }

  /**
   * 预测销售情况
   */
  async predictSales(data: SalesData): Promise<SalesPredictionResult> {
    if (!this.model) {
      await this.initialize();
    }

    const inputTensor = this.preprocessData(data);
    const prediction = this.model!.predict(inputTensor) as tf.Tensor;
    const predictionData = await prediction.data();

    // 释放张量
    inputTensor.dispose();
    prediction.dispose();

    // 反归一化预测结果
    const predictedQuantity = Math.round(predictionData[0] * 1000);
    const predictedRevenue = Math.round(predictionData[1] * 100000);

    // 计算预测置信度（示例实现）
    const confidenceScore = this.calculateConfidence(data, predictedQuantity);

    // 确定趋势方向
    const trendDirection = this.determineTrendDirection(data, predictedQuantity);

    // 计算季节性影响
    const seasonalImpact = this.calculateSeasonalImpact(data);

    // 生成建议行动
    const recommendedActions = this.generateRecommendedActions(
      data,
      predictedQuantity,
      predictedRevenue,
      trendDirection,
      seasonalImpact
    );

    return {
      productId: data.productId,
      predictedQuantity,
      predictedRevenue,
      confidenceScore,
      trendDirection,
      seasonalImpact,
      recommendedActions
    };
  }

  /**
   * 计算预测置信度
   */
  private calculateConfidence(data: SalesData, predictedQuantity: number): number {
    // 简化版实现，实际应用中会使用更复杂的算法
    const volatility = Math.abs(data.marketTrend);
    const seasonalityImpact = Math.abs(this.calculateSeasonalImpact(data));
    
    // 置信度基于市场波动性和季节性影响
    const confidence = 1 - (volatility * 0.3 + seasonalityImpact * 0.2);
    
    return parseFloat(confidence.toFixed(2));
  }

  /**
   * 确定趋势方向
   */
  private determineTrendDirection(
    data: SalesData,
    predictedQuantity: number
  ): 'up' | 'down' | 'stable' {
    const threshold = 0.1; // 10%的变化阈值
    const change = (predictedQuantity - data.quantity) / data.quantity;

    if (change > threshold) return 'up';
    if (change < -threshold) return 'down';
    return 'stable';
  }

  /**
   * 计算季节性影响
   */
  private calculateSeasonalImpact(data: SalesData): number {
    // 简化版实现，返回-1到1之间的值
    const normalizedSeason = (data.seasonality - 2.5) / 2.5;
    return parseFloat(normalizedSeason.toFixed(2));
  }

  /**
   * 生成建议行动
   */
  private generateRecommendedActions(
    data: SalesData,
    predictedQuantity: number,
    predictedRevenue: number,
    trendDirection: 'up' | 'down' | 'stable',
    seasonalImpact: number
  ): string[] {
    const actions: string[] = [];

    // 根据趋势方向生成建议
    if (trendDirection === 'up') {
      actions.push('增加库存以满足预期需求增长');
      actions.push('考虑提高价格以优化利润');
    } else if (trendDirection === 'down') {
      actions.push('调整库存水平以避免积压');
      actions.push('考虑促销活动刺激销售');
    }

    // 根据季节性影响生成建议
    if (seasonalImpact > 0.5) {
      actions.push('为旺季提前备货');
    } else if (seasonalImpact < -0.5) {
      actions.push('淡季促销清理库存');
    }

    // 根据预测收入生成建议
    if (predictedRevenue < data.revenue * 0.8) {
      actions.push('制定价格优化策略');
      actions.push('开发新的营销渠道');
    }

    return actions;
  }

  /**
   * 训练模型
   */
  async trainModel(trainingData: SalesData[], labels: number[][]): Promise<void> {
    if (!this.model) {
      await this.initialize();
    }

    // 预处理训练数据
    const inputTensors = trainingData.map(data => this.preprocessData(data));
    const inputTensor = tf.concat(inputTensors, 0);
    const labelTensor = tf.tensor2d(labels);

    // 训练模型
    await this.model!.fit(inputTensor, labelTensor, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          console.log(`Epoch ${epoch}: loss = ${logs?.loss}, mse = ${logs?.mse}`);
        }
      }
    });

    // 释放张量
    inputTensor.dispose();
    labelTensor.dispose();
    inputTensors.forEach(tensor => tensor.dispose());

    console.log('销售预测模型训练完成');
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