import { SalesPredictionModel, SalesData, SalesPredictionResult } from '../models/salesPrediction';
import { CustomerBehaviorModel, CustomerBehaviorData, BehaviorAnalysisResult } from '../models/customerBehavior';

/**
 * 仪表盘AI服务
 * 提供仪表盘所需的AI分析功能
 */
export class DashboardAIService {
  private salesPredictionModel: SalesPredictionModel;
  private customerBehaviorModel: CustomerBehaviorModel;
  
  constructor() {
    this.salesPredictionModel = new SalesPredictionModel();
    this.customerBehaviorModel = new CustomerBehaviorModel();
  }
  
  /**
   * 初始化所有AI模型
   */
  async initialize(): Promise<void> {
    try {
      await Promise.all([
        this.salesPredictionModel.initialize(),
        this.customerBehaviorModel.initialize()
      ]);
      console.log('仪表盘AI服务初始化完成');
    } catch (error) {
      console.error('仪表盘AI服务初始化失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取销售预测分析
   * @param historicalData 历史销售数据
   * @returns 销售预测结果
   */
  async getSalesPredictions(historicalData: SalesData[]): Promise<SalesPredictionResult[]> {
    try {
      const predictions = await Promise.all(
        historicalData.map(data => this.salesPredictionModel.predictSales(data))
      );
      
      return predictions;
    } catch (error) {
      console.error('获取销售预测失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取客户行为分析
   * @param customersData 客户行为数据
   * @returns 客户行为分析结果
   */
  async getCustomerBehaviorAnalysis(customersData: CustomerBehaviorData[]): Promise<BehaviorAnalysisResult[]> {
    try {
      const analyses = await Promise.all(
        customersData.map(data => this.customerBehaviorModel.analyzeCustomerBehavior(data))
      );
      
      return analyses;
    } catch (error) {
      console.error('获取客户行为分析失败:', error);
      throw error;
    }
  }
  
  /**
   * 获取仪表盘AI洞察
   * 综合销售预测和客户行为分析，生成业务洞察
   */
  async getDashboardInsights(salesData: SalesData[], customerData: CustomerBehaviorData[]): Promise<DashboardInsight[]> {
    try {
      // 获取销售预测和客户行为分析
      const [salesPredictions, behaviorAnalyses] = await Promise.all([
        this.getSalesPredictions(salesData),
        this.getCustomerBehaviorAnalysis(customerData)
      ]);
      
      // 生成综合洞察
      const insights: DashboardInsight[] = [];
      
      // 销售趋势洞察
      const salesTrend = this.analyzeSalesTrend(salesPredictions);
      insights.push({
        type: 'sales_trend',
        title: '销售趋势预测',
        content: salesTrend.description,
        confidenceScore: salesTrend.confidenceScore,
        recommendations: salesTrend.recommendations,
        data: salesTrend.data
      });
      
      // 客户流失风险洞察
      const churnRisk = this.analyzeChurnRisk(behaviorAnalyses);
      insights.push({
        type: 'churn_risk',
        title: '客户流失风险',
        content: churnRisk.description,
        confidenceScore: churnRisk.confidenceScore,
        recommendations: churnRisk.recommendations,
        data: churnRisk.data
      });
      
      // 产品推荐洞察
      const productRecommendations = this.generateProductRecommendations(behaviorAnalyses);
      insights.push({
        type: 'product_recommendations',
        title: '产品推荐',
        content: productRecommendations.description,
        confidenceScore: productRecommendations.confidenceScore,
        recommendations: productRecommendations.recommendations,
        data: productRecommendations.data
      });
      
      return insights;
    } catch (error) {
      console.error('获取仪表盘AI洞察失败:', error);
      throw error;
    }
  }
  
  /**
   * 分析销售趋势
   */
  private analyzeSalesTrend(predictions: SalesPredictionResult[]): {
    description: string;
    confidenceScore: number;
    recommendations: string[];
    data: any;
  } {
    // 计算平均增长率
    const upTrends = predictions.filter(p => p.trendDirection === 'up').length;
    const growthRate = (upTrends / predictions.length) * 100;
    
    // 计算平均置信度
    const avgConfidence = predictions.reduce((sum, p) => sum + p.confidenceScore, 0) / predictions.length;
    
    // 获取增长最高的产品
    const sortedByRevenue = [...predictions].sort((a, b) => b.predictedRevenue - a.predictedRevenue);
    const topProducts = sortedByRevenue.slice(0, 3).map(p => p.productId);
    
    return {
      description: `根据历史数据分析，预计下月销售额将${growthRate > 50 ? '增长' : '下降'}${Math.abs(growthRate - 50).toFixed(1)}%，${topProducts.length > 0 ? `其中${topProducts.join('、')}产品表现最佳` : ''}。`,
      confidenceScore: avgConfidence,
      recommendations: [
        '建议提前备货热销产品',
        '关注季节性因素对销售的影响',
        '针对预测增长的产品制定促销策略'
      ],
      data: {
        growthRate,
        topProducts,
        predictions: predictions.map(p => ({
          productId: p.productId,
          revenue: p.predictedRevenue,
          trend: p.trendDirection
        }))
      }
    };
  }
  
  /**
   * 分析客户流失风险
   */
  private analyzeChurnRisk(analyses: BehaviorAnalysisResult[]): {
    description: string;
    confidenceScore: number;
    recommendations: string[];
    data: any;
  } {
    // 筛选高流失风险客户
    const highRiskCustomers = analyses.filter(a => a.churnRisk > 0.7);
    
    // 计算平均置信度
    const avgConfidence = highRiskCustomers.reduce((sum, a) => sum + (1 - a.churnRisk) * 0.9, 0) / 
      (highRiskCustomers.length || 1);
    
    return {
      description: `发现${highRiskCustomers.length}个高价值客户有流失风险，建议安排客户经理进行重点跟进。`,
      confidenceScore: avgConfidence,
      recommendations: [
        '为高风险客户提供个性化优惠',
        '增加客户沟通频率',
        '收集客户反馈并及时解决问题'
      ],
      data: {
        highRiskCount: highRiskCustomers.length,
        customers: highRiskCustomers.map(c => ({
          id: c.customerId,
          risk: c.churnRisk,
          actions: c.recommendedActions
        }))
      }
    };
  }
  
  /**
   * 生成产品推荐
   */
  private generateProductRecommendations(analyses: BehaviorAnalysisResult[]): {
    description: string;
    confidenceScore: number;
    recommendations: string[];
    data: any;
  } {
    // 获取客户偏好类别
    const allCategories = analyses.flatMap(a => a.preferredCategories);
    const categoryCount = allCategories.reduce((count, category) => {
      count[category] = (count[category] || 0) + 1;
      return count;
    }, {} as Record<string, number>);
    
    // 排序获取热门类别
    const popularCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([category]) => category);
    
    // 计算预期转化率提升
    const conversionLift = 0.15 + Math.random() * 0.15; // 模拟15%-30%的提升
    
    return {
      description: `基于客户画像分析，为${analyses.length}个重点客户生成了个性化产品推荐方案。`,
      confidenceScore: 0.85 + Math.random() * 0.1, // 模拟85%-95%的置信度
      recommendations: [
        '针对高价值客户推荐高利润产品',
        '根据季节性因素调整推荐策略',
        '结合客户历史购买行为优化推荐算法'
      ],
      data: {
        customerCount: analyses.length,
        popularCategories,
        conversionLift: (conversionLift * 100).toFixed(1) + '%',
        recommendations: analyses.slice(0, 5).map(a => ({
          customerId: a.customerId,
          categories: a.preferredCategories.slice(0, 3),
          purchaseProbability: a.purchaseProbability
        }))
      }
    };
  }
}

/**
 * 仪表盘AI洞察接口
 */
export interface DashboardInsight {
  type: 'sales_trend' | 'churn_risk' | 'product_recommendations' | 'market_analysis';
  title: string;
  content: string;
  confidenceScore: number; // AI置信度 (0-1)
  recommendations: string[];
  data: any; // 用于图表展示的数据
}

/**
 * 创建仪表盘AI服务实例
 */
export const createDashboardAIService = async (): Promise<DashboardAIService> => {
  const service = new DashboardAIService();
  await service.initialize();
  return service;
};