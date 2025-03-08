import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  List,
  ListItem,
  Divider,
  Fade
} from '@mui/material';
import {
  Timeline,
  People,
  Lightbulb,
  SmartToy
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  LabelList,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import recentActivities from './recentActivities';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [aiInsightLoading, setAiInsightLoading] = useState(false);
  const chartHeight = 300;

  // 模拟数据
  const funnelData = [
    { name: '线索', value: 100 },
    { name: '商机', value: 80 },
    { name: '报价', value: 60 },
    { name: '谈判', value: 40 },
    { name: '成交', value: 20 }
  ];

  const customerPortraitData = [
    { subject: '消费能力', A: 80 },
    { subject: '忠诚度', A: 65 },
    { subject: '活跃度', A: 90 },
    { subject: '信用评分', A: 75 },
    { subject: '增长潜力', A: 85 }
  ];

  const customerTypeData = [
    { name: '企业客户', value: 45, color: '#8884d8' },
    { name: '个人客户', value: 35, color: '#82ca9d' },
    { name: '政府客户', value: 20, color: '#ffc658' }
  ];

  const performanceData = [
    { name: '客户满意度', value: 85, target: 80 },
    { name: '销售达成率', value: 75, target: 70 },
    { name: '客户留存率', value: 90, target: 85 },
    { name: '响应时效', value: 95, target: 90 }
  ];

  const generateAiInsight = () => {
    setAiInsightLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setAiInsightLoading(false);
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Fade in={true}>
        <Box>
          <Grid container spacing={3}>
            {/* 最近活动 */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    最近活动
                  </Typography>
                  <List>
                    {recentActivities.map((activity, index) => (
                      <React.Fragment key={index}>
                        <ListItem>
                          {activity.content}
                        </ListItem>
                        {index < recentActivities.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* 销售漏斗分析 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 1.5 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                  销售漏斗分析
                </Typography>
                <Box sx={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <FunnelChart>
                      <Tooltip />
                      <Funnel
                        data={funnelData}
                        dataKey="value"
                        nameKey="name"
                      >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* 客户画像分析 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 1.5 }}>
                <Typography variant="h6" gutterBottom sx={{ mb: 0.5 }}>
                  客户画像分析
                </Typography>
                <Box sx={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={customerPortraitData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar name="客户特征" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* 客户类型分布 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  客户类型分布
                </Typography>
                <Box sx={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={customerTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* 性能指标 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  性能指标分析
                </Typography>
                <Box sx={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" name="当前值">
                        {performanceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.value >= entry.target ? '#4caf50' : '#ff9800'}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* AI 分析建议 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmartToy sx={{ mr: 1, color: theme.palette.primary.main }} />
                    <Typography variant="h6" sx={{ mb: 0 }}>
                      AI 智能分析建议
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<Lightbulb />}
                    size="small"
                    onClick={generateAiInsight}
                    disabled={aiInsightLoading}
                  >
                    {aiInsightLoading ? '生成中...' : '生成新洞察'}
                  </Button>
                </Box>
                {aiInsightLoading && <LinearProgress sx={{ mb: 2 }} />}
                <Grid container spacing={1.5}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } 
                    }}>
                      <CardHeader 
                        title="销售预测" 
                        avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main }}><Timeline /></Avatar>}
                        sx={{ pb: 0 }} 
                      />
                      <CardContent sx={{ pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          根据历史数据分析，预计下月销售额将增长15%，建议提前备货热销产品。
                        </Typography>
                        <Chip 
                          label="AI置信度: 92%" 
                          size="small" 
                          color="primary" 
                          variant="outlined" 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } 
                    }}>
                      <CardHeader 
                        title="客户行为分析" 
                        avatar={<Avatar sx={{ bgcolor: theme.palette.warning.main }}><People /></Avatar>}
                        sx={{ pb: 0 }} 
                      />
                      <CardContent sx={{ pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          发现3个高价值客户有流失风险，建议安排客户经理进行重点跟进。
                          <br />
                          <b>高风险客户:</b> 科技有限公司, 贸易有限公司, 制造有限公司
                        </Typography>
                        <Chip 
                          label="AI置信度: 87%" 
                          size="small" 
                          color="warning" 
                          variant="outlined" 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } 
                    }}>
                      <CardHeader 
                        title="产品推荐" 
                        avatar={<Avatar sx={{ bgcolor: theme.palette.success.main }}><Lightbulb /></Avatar>}
                        sx={{ pb: 0 }} 
                      />
                      <CardContent sx={{ pt: 1 }}>
                        <Typography variant="body2" paragraph>
                          基于客户画像分析，为5个重点客户生成了个性化产品推荐方案。
                          <br />
                          <b>推荐效果预测:</b> 转化率提升约23%
                        </Typography>
                        <Chip 
                          label="AI置信度: 89%" 
                          size="small" 
                          color="success" 
                          variant="outlined" 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default Dashboard;