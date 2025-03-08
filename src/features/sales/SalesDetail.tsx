import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Tabs,
  Tab,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  LinearProgress
} from '@mui/material';

interface SalesDetailProps {
  opportunityId?: string;
}

interface SalesOpportunity {
  id: string;
  customerName: string;
  customerCompany: string;
  productName: string;
  amount: number;
  stage: string;
  probability: number;
  expectedClosingDate: string;
  createdAt: string;
  lastContactDate: string;
  assignedTo: string;
  notes: string;
  activities: {
    id: string;
    type: string;
    date: string;
    description: string;
  }[];
}

// 模拟销售机会详细数据
const mockOpportunityData: SalesOpportunity = {
  id: '1',
  customerName: '张总',
  customerCompany: '科技有限公司',
  productName: '企业管理系统',
  amount: 100000,
  stage: '需求确认',
  probability: 60,
  expectedClosingDate: '2024-06-30',
  createdAt: '2024-01-15',
  lastContactDate: '2024-02-20',
  assignedTo: '王销售',
  notes: '客户对价格比较敏感，需要强调产品的性价比和长期价值',
  activities: [
    {
      id: '1',
      type: '电话沟通',
      date: '2024-02-20',
      description: '与客户讨论了需求细节，客户表示对自动化报表功能特别感兴趣'
    },
    {
      id: '2',
      type: '邮件往来',
      date: '2024-02-15',
      description: '发送了产品介绍文档和初步报价'
    },
    {
      id: '3',
      type: '现场拜访',
      date: '2024-02-01',
      description: '拜访客户公司，了解业务流程和痛点'
    }
  ]
};

const SalesDetail: React.FC<SalesDetailProps> = ({ opportunityId: _ = '1' }) => {
  const [tabValue, setTabValue] = useState(0);
  const [predictionResult, setPredictionResult] = useState<{
    predictedRevenue: number;
    confidenceScore: number;
    trendDirection: string;
    seasonalImpact: number;
    recommendedActions: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const generateSalesPrediction = async () => {
    setIsLoading(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟预测结果
      const result = {
        predictedRevenue: mockOpportunityData.amount * 1.2,
        confidenceScore: 0.85,
        trendDirection: 'up',
        seasonalImpact: 0.3,
        recommendedActions: [
          '安排产品演示会议，重点展示自动化报表功能',
          '准备详细的ROI分析报告',
          '制定阶段性实施计划，降低客户的顾虑'
        ]
      };

      setPredictionResult(result);
    } catch (error) {
      console.error('生成预测失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1600, margin: '0 auto', width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          销售机会详情
        </Typography>
        <Box>
          <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
            编辑
          </Button>
          <Button variant="contained" color="primary">
            更新状态
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3, borderRadius: 2, boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)', background: 'linear-gradient(to right bottom, #ffffff, #fafafa)', backdropFilter: 'blur(10px)' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#1a1f2c' }}>
                {mockOpportunityData.customerCompany}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                联系人: {mockOpportunityData.customerName}
              </Typography>
              <Typography variant="body2">
                产品: {mockOpportunityData.productName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>
                金额: <span style={{ color: '#2196F3', fontWeight: 500 }}>¥{mockOpportunityData.amount.toLocaleString()}</span>
              </Typography>
              <Typography variant="body2" gutterBottom>
                阶段: <Chip label={mockOpportunityData.stage} color="primary" size="small" sx={{ borderRadius: 1 }} />
              </Typography>
              <Typography variant="body2" gutterBottom>
                成功概率: {mockOpportunityData.probability}%
                <LinearProgress 
                  variant="determinate" 
                  value={mockOpportunityData.probability} 
                  sx={{ mt: 1, mb: 1, height: 6, borderRadius: 3 }}
                />
              </Typography>
              <Typography variant="body2">
                预计成交日期: {mockOpportunityData.expectedClosingDate}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="销售机会详情标签">
            <Tab label="基本信息" />
            <Tab label="活动记录" />
            <Tab label="销售预测" />
          </Tabs>
        </Box>
        
        {/* 基本信息 */}
        {tabValue === 0 && (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">创建日期</Typography>
                <Typography variant="body2" paragraph>{mockOpportunityData.createdAt}</Typography>
                
                <Typography variant="subtitle2">最后联系日期</Typography>
                <Typography variant="body2" paragraph>{mockOpportunityData.lastContactDate}</Typography>
                
                <Typography variant="subtitle2">负责人</Typography>
                <Typography variant="body2" paragraph>{mockOpportunityData.assignedTo}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2">备注</Typography>
                <Typography variant="body2" paragraph>{mockOpportunityData.notes}</Typography>
              </Grid>
            </Grid>
          </Box>
        )}
        
        {/* 活动记录 */}
        {tabValue === 1 && (
          <Box sx={{ p: 2 }}>
            <List>
              {mockOpportunityData.activities.map((activity) => (
                <React.Fragment key={activity.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2">{activity.type}</Typography>
                          <Typography variant="body2" color="textSecondary">{activity.date}</Typography>
                        </Box>
                      }
                      secondary={activity.description}
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="primary">
                添加活动记录
              </Button>
            </Box>
          </Box>
        )}
        
        {/* 销售预测 */}
        {tabValue === 2 && (
          <Box sx={{ p: 2 }}>
            {!predictionResult && !isLoading && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" paragraph>
                  生成AI销售预测，帮助您更好地把握销售机会
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={generateSalesPrediction}
                >
                  生成销售预测
                </Button>
              </Box>
            )}
            
            {isLoading && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" paragraph>
                  正在生成销售预测...
                </Typography>
                <LinearProgress />
              </Box>
            )}
            
            {predictionResult && (
              <Box>
                <Typography variant="h6" gutterBottom>销售预测结果</Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          预测销售额
                        </Typography>
                        <Typography variant="h5">
                          ¥{predictionResult.predictedRevenue.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          置信度: {Math.round(predictionResult.confidenceScore * 100)}%
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="textSecondary">
                          趋势方向
                        </Typography>
                        <Typography variant="h5">
                          {predictionResult.trendDirection === 'up' ? '上升' : 
                           predictionResult.trendDirection === 'down' ? '下降' : '稳定'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          季节性影响: {predictionResult.seasonalImpact > 0 ? '正面' : '负面'}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                  建议行动
                </Typography>
                <List>
                  {predictionResult.recommendedActions.map((action: string, index: number) => (
                    <ListItem key={index}>
                      <ListItemText primary={action} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SalesDetail;