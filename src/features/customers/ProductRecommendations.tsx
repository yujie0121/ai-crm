import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  LinearProgress,
  Chip
} from '@mui/material';
import { RecommendationSystem, ProductFeatures, UserBehaviorData } from '../../ai/models/recommendationSystem';

interface ProductRecommendationsProps {
  customerId: string;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ customerId }) => {
  const [recommendations, setRecommendations] = useState<{
    userId: string;
    recommendations: {
      productId: string;
      score: number;
      reason: string;
    }[];
    personalizationScore: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 模拟产品数据
  const mockProducts: ProductFeatures[] = [
    {
      productId: '1',
      category: '企业管理系统',
      price: 100000,
      features: [0.8, 0.6, 0.9, 0.7],
      popularity: 0.85
    },
    {
      productId: '2',
      category: '数据分析平台',
      price: 80000,
      features: [0.9, 0.7, 0.5, 0.8],
      popularity: 0.75
    },
    {
      productId: '3',
      category: '客户关系管理系统',
      price: 60000,
      features: [0.7, 0.8, 0.6, 0.9],
      popularity: 0.9
    },
    {
      productId: '4',
      category: '供应链管理系统',
      price: 120000,
      features: [0.6, 0.9, 0.7, 0.8],
      popularity: 0.7
    },
    {
      productId: '5',
      category: '人力资源管理系统',
      price: 50000,
      features: [0.7, 0.6, 0.8, 0.7],
      popularity: 0.8
    }
  ];

  // 模拟用户行为数据
  const mockUserBehaviors: UserBehaviorData[] = [
    {
      userId: customerId,
      productId: '2',
      interactionType: 'view',
      timestamp: new Date(Date.now() - 86400000 * 5),
      timeSpent: 180
    },
    {
      userId: customerId,
      productId: '3',
      interactionType: 'like',
      timestamp: new Date(Date.now() - 86400000 * 3),
      rating: 4
    },
    {
      userId: customerId,
      productId: '1',
      interactionType: 'purchase',
      timestamp: new Date(Date.now() - 86400000 * 30),
      rating: 5
    }
  ];

  // 生成产品推荐
  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // 初始化推荐系统
      const recommendationSystem = new RecommendationSystem();
      await recommendationSystem.initialize();
      
      // 更新模型
      await recommendationSystem.updateModel(mockUserBehaviors, mockProducts);
      
      // 生成推荐
      const result = await recommendationSystem.generateRecommendations(customerId, mockProducts, 3);
      setRecommendations(result);
    } catch (error) {
      console.error('推荐生成失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 获取产品名称
  const getProductName = (productId: string): string => {
    const product = mockProducts.find(p => p.productId === productId);
    return product ? product.category : `产品 ${productId}`;
  };

  // 获取产品价格
  const getProductPrice = (productId: string): number => {
    const product = mockProducts.find(p => p.productId === productId);
    return product ? product.price : 0;
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            智能产品推荐
          </Typography>
          {!recommendations && !isLoading && (
            <Button 
              variant="outlined" 
              color="primary"
              onClick={generateRecommendations}
            >
              生成推荐
            </Button>
          )}
          {recommendations && (
            <Chip 
              label={`个性化程度: ${Math.round(recommendations.personalizationScore * 100)}%`} 
              color="primary" 
              size="small" 
            />
          )}
        </Box>
        
        {isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" paragraph>
              正在分析客户偏好，生成个性化推荐...
            </Typography>
            <LinearProgress />
          </Box>
        )}
        
        {recommendations && (
          <List>
            {recommendations.recommendations.map((rec, index) => (
              <React.Fragment key={rec.productId}>
                <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1">{getProductName(rec.productId)}</Typography>
                        <Typography variant="subtitle1">¥{getProductPrice(rec.productId).toLocaleString()}</Typography>
                      </Box>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" color="textSecondary">
                          匹配度: {Math.round(rec.score * 100)}%
                        </Typography>
                        <Typography variant="body2">
                          {rec.reason}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                {index < recommendations.recommendations.length - 1 && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        )}
        
        {!recommendations && !isLoading && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="textSecondary">
              基于客户历史行为和偏好，生成个性化产品推荐
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductRecommendations;