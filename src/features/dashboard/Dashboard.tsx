import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

// 模拟数据
const salesData = [
  { month: '1月', amount: 150000 },
  { month: '2月', amount: 180000 },
  { month: '3月', amount: 220000 },
  { month: '4月', amount: 200000 },
  { month: '5月', amount: 250000 },
  { month: '6月', amount: 280000 }
];

const customerInsights = [
  { title: '高价值客户', count: 25, trend: '+5%' },
  { title: '流失风险客户', count: 8, trend: '-2%' },
  { title: '新增客户', count: 12, trend: '+10%' },
  { title: '活跃客户', count: 45, trend: '+8%' }
];

const recentActivities = [
  { type: '新订单', customer: '科技有限公司', value: '¥50,000', date: '2024-05-15' },
  { type: '客户跟进', customer: '贸易有限公司', value: '-', date: '2024-05-14' },
  { type: '报价单', customer: '制造有限公司', value: '¥180,000', date: '2024-05-13' }
];

const funnelData = [
  { value: 100, name: '线索', fill: '#8884d8' },
  { value: 80, name: '商机', fill: '#83a6ed' },
  { value: 60, name: '报价', fill: '#8dd1e1' },
  { value: 40, name: '谈判', fill: '#82ca9d' },
  { value: 20, name: '成交', fill: '#a4de6c' }
];

const customerPortraitData = [
  { subject: '消费能力', A: 80, fullMark: 100 },
  { subject: '活跃度', A: 65, fullMark: 100 },
  { subject: '忠诚度', A: 90, fullMark: 100 },
  { subject: '购买频率', A: 70, fullMark: 100 },
  { subject: '投诉率', A: 20, fullMark: 100 },
  { subject: '满意度', A: 85, fullMark: 100 }
];

const customerTypeData = [
  { name: '企业客户', value: 400, color: '#0088FE' },
  { name: '个人客户', value: 300, color: '#00C49F' },
  { name: '政府客户', value: 200, color: '#FFBB28' },
  { name: '其他', value: 100, color: '#FF8042' }
];

const performanceData = [
  { name: '销售转化率', value: 68, target: 75 },
  { name: '客户满意度', value: 92, target: 90 },
  { name: '响应时间', value: 85, target: 88 },
  { name: '跟进及时率', value: 78, target: 85 }
];

const Dashboard: React.FC = () => {
  const [chartHeight, setChartHeight] = React.useState(300);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setChartHeight(200);
      } else if (width <= 960) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <Typography variant="h4" gutterBottom>
        仪表盘
      </Typography>

      <Grid container spacing={3}>
        {/* 客户洞察卡片 */}
        {customerInsights.map((insight, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {insight.title}
              </Typography>
              <Typography variant="h4">{insight.count}</Typography>
              <Typography color={insight.trend.startsWith('+') ? 'success.main' : 'error.main'}>
                {insight.trend}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* 销售趋势图表 */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 1.5 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>
              销售趋势
            </Typography>
            <Box sx={{ height: chartHeight }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* 最近活动 */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardHeader title="最近活动" sx={{ pb: 1 }} />
            <CardContent sx={{ pt: 0 }}>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText
                        primary={activity.type}
                        secondary={
                          <React.Fragment>
                            <Typography component="span" variant="body2" color="text.primary">
                              {activity.customer}
                            </Typography>
                            {` - ${activity.value}`}
                            <br />
                            {activity.date}
                          </React.Fragment>
                        }
                      />
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
            <Typography variant="h6" gutterBottom>
              AI 智能分析建议
            </Typography>
            <Grid container spacing={1.5}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title="销售预测" sx={{ pb: 0 }} />
                  <CardContent sx={{ pt: 1 }}>
                    <Typography variant="body2">
                      根据历史数据分析，预计下月销售额将增长15%，建议提前备货热销产品。
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title="客户行为分析" sx={{ pb: 0 }} />
                  <CardContent sx={{ pt: 1 }}>
                    <Typography variant="body2">
                      发现3个高价值客户有流失风险，建议安排客户经理进行重点跟进。
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardHeader title="产品推荐" sx={{ pb: 0 }} />
                  <CardContent sx={{ pt: 1 }}>
                    <Typography variant="body2">
                      基于客户画像分析，为5个重点客户生成了个性化产品推荐方案。
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;