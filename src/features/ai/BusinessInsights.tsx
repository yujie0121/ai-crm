import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Tabs,
  Tab,
  Button,
  Chip,
  Divider,
  IconButton,
  Paper,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Slider,
  useTheme,
  Fade
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  TrendingUp,
  Warning,
  ShowChart,
  Recommend,
  FilterList,
  DateRange,
  Info,
  Check,
  ArrowDownward,
  Refresh,
  Lightbulb,
  Analytics
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  ZAxis,
  AreaChart,
  Area
} from 'recharts';
import { designSystem } from '../../theme/designSystem';

interface BusinessInsightsProps {
  context?: 'sales' | 'customer' | 'product' | 'market' | 'general';
  entityId?: string;
  onInsightAction?: (insight: any, action: string) => void;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'prediction' | 'risk' | 'trend' | 'recommendation';
  category: 'sales' | 'customer' | 'product' | 'market';
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeFrame: string;
  data: any;
  chartType?: 'line' | 'bar' | 'pie' | 'radar' | 'scatter' | 'area' | 'heatmap';
  actions?: string[];
}

// 模拟销售预测数据
const salesForecastData = [
  { month: '1月', 实际销售额: 120000, 预测销售额: 125000 },
  { month: '2月', 实际销售额: 132000, 预测销售额: 130000 },
  { month: '3月', 实际销售额: 101000, 预测销售额: 105000 },
  { month: '4月', 实际销售额: 134000, 预测销售额: 140000 },
  { month: '5月', 实际销售额: 150000, 预测销售额: 155000 },
  { month: '6月', 实际销售额: 160000, 预测销售额: 165000 },
  { month: '7月', 实际销售额: null, 预测销售额: 180000 },
  { month: '8月', 实际销售额: null, 预测销售额: 195000 },
  { month: '9月', 实际销售额: null, 预测销售额: 210000 }
];

// 模拟客户流失风险数据
const churnRiskData = [
  { name: '低风险', value: 65, color: '#4caf50' },
  { name: '中风险', value: 25, color: '#ff9800' },
  { name: '高风险', value: 10, color: '#f44336' }
];

// 模拟客户流失风险因素数据
const churnFactorsData = [
  { factor: '互动频率下降', score: 85 },
  { factor: '产品使用率降低', score: 72 },
  { factor: '支持请求增加', score: 65 },
  { factor: '账单延迟', score: 45 },
  { factor: '竞争对手接触', score: 30 }
];

// 模拟市场趋势数据
const marketTrendData = [
  { quarter: 'Q1 2023', 市场份额: 15, 行业平均: 12 },
  { quarter: 'Q2 2023', 市场份额: 16, 行业平均: 12.5 },
  { quarter: 'Q3 2023', 市场份额: 18, 行业平均: 13 },
  { quarter: 'Q4 2023', 份额: 17.5, 行业平均: 13.5 },
  { quarter: 'Q1 2024', 市场份额: 19, 行业平均: 14 },
  { quarter: 'Q2 2024', 市场份额: 21, 行业平均: 14.5 }
];

// 模拟产品推荐数据
const productRecommendationData = [
  { product: '企业版CRM', 匹配度: 95, 预期收入: 150000 },
  { product: '数据分析服务', 匹配度: 85, 预期收入: 80000 },
  { product: '客户支持套餐', 匹配度: 75, 预期收入: 50000 },
  { product: '培训服务', 匹配度: 65, 预期收入: 30000 },
  { product: '云存储扩展', 匹配度: 60, 预期收入: 25000 }
];

// 模拟客户细分数据
const customerSegmentationData = [
  { x: 85, y: 90, z: 120000, name: '高价值忠诚客户' },
  { x: 75, y: 85, z: 80000, name: '高价值风险客户' },
  { x: 60, y: 40, z: 60000, name: '中价值增长客户' },
  { x: 50, y: 30, z: 40000, name: '中价值稳定客户' },
  { x: 30, y: 20, z: 20000, name: '低价值客户' }
];

// 模拟销售漏斗优化数据
const salesFunnelData = [
  { stage: '线索生成', 当前转化率: 25, 优化后预期: 35, 行业基准: 30 },
  { stage: '初步接触', 当前转化率: 60, 优化后预期: 70, 行业基准: 65 },
  { stage: '需求确认', 当前转化率: 40, 优化后预期: 55, 行业基准: 50 },
  { stage: '方案提交', 当前转化率: 30, 优化后预期: 45, 行业基准: 40 },
  { stage: '价格谈判', 当前转化率: 50, 优化后预期: 60, 行业基准: 55 },
  { stage: '成交', 当前转化率: 80, 优化后预期: 85, 行业基准: 82 }
];

// 模拟季节性销售模式数据
const seasonalPatternData = [
  { month: '1月', 销售额: 120000, 同比变化: 5 },
  { month: '2月', 销售额: 132000, 同比变化: 8 },
  { month: '3月', 销售额: 101000, 同比变化: -2 },
  { month: '4月', 销售额: 134000, 同比变化: 12 },
  { month: '5月', 销售额: 150000, 同比变化: 15 },
  { month: '6月', 销售额: 160000, 同比变化: 10 },
  { month: '7月', 销售额: 140000, 同比变化: 7 },
  { month: '8月', 销售额: 130000, 同比变化: 5 },
  { month: '9月', 销售额: 145000, 同比变化: 9 },
  { month: '10月', 销售额: 165000, 同比变化: 12 },
  { month: '11月', 销售额: 180000, 同比变化: 18 },
  { month: '12月', 销售额: 200000, 同比变化: 20 }
];

// 模拟洞察数据
const mockInsights: Insight[] = [
  {
    id: '1',
    title: '销售预测分析',
    description: '基于历史数据和市场趋势，预测未来3个月的销售额将增长15%',
    type: 'prediction',
    category: 'sales',
    confidence: 0.85,
    impact: 'high',
    timeFrame: '未来3个月',
    data: salesForecastData,
    chartType: 'line',
    actions: ['下载详细报告', '调整销售目标', '查看影响因素']
  },
  {
    id: '2',
    title: '客户流失风险预警',
    description: '检测到10%的客户存在高流失风险，主要原因是互动频率下降',
    type: 'risk',
    category: 'customer',
    confidence: 0.92,
    impact: 'high',
    timeFrame: '当前',
    data: {
      overview: churnRiskData,
      factors: churnFactorsData
    },
    chartType: 'pie',
    actions: ['查看高风险客户名单', '制定挽留计划', '分析流失原因']
  },
  {
    id: '3',
    title: '市场份额趋势分析',
    description: '您的市场份额持续增长，当前已超过行业平均水平45%',
    type: 'trend',
    category: 'market',
    confidence: 0.78,
    impact: 'medium',
    timeFrame: '过去6个季度',
    data: marketTrendData,
    chartType: 'area',
    actions: ['查看竞争对手分析', '下载市场报告']
  },
  {
    id: '4',
    title: '产品推荐引擎',
    description: '基于客户画像和购买历史，推荐5个最匹配的产品/服务',
    type: 'recommendation',
    category: 'product',
    confidence: 0.88,
    impact: 'medium',
    timeFrame: '当前',
    data: productRecommendationData,
    chartType: 'bar',
    actions: ['创建销售提案', '查看产品详情']
  },
  {
    id: '5',
    title: '客户价值细分分析',
    description: '基于忠诚度、消费能力和增长潜力的多维度客户细分',
    type: 'trend',
    category: 'customer',
    confidence: 0.82,
    impact: 'high',
    timeFrame: '当前',
    data: customerSegmentationData,
    chartType: 'scatter',
    actions: ['查看细分详情', '制定差异化策略']
  },
  {
    id: '6',
    title: '销售漏斗优化建议',
    description: '通过优化关键转化环节，预计可提升整体转化率25%',
    type: 'recommendation',
    category: 'sales',
    confidence: 0.75,
    impact: 'high',
    timeFrame: '未来季度',
    data: salesFunnelData,
    chartType: 'bar',
    actions: ['查看详细建议', '设置优化目标']
  },
  {
    id: '7',
    title: '季节性销售模式识别',
    description: '识别到明显的季节性销售模式，Q4销售额通常高于全年平均值35%',
    type: 'trend',
    category: 'sales',
    confidence: 0.9,
    impact: 'medium',
    timeFrame: '年度循环',
    data: seasonalPatternData,
    chartType: 'line',
    actions: ['查看详细分析', '制定季节性策略']
  }
];

const BusinessInsights: React.FC<BusinessInsightsProps> = ({
  context = 'general',
  onInsightAction
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('quarter');
  const [insights, setInsights] = useState<Insight[]>([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(60);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [generatingInsights, setGeneratingInsights] = useState(false);

  // 存储原始洞察数据
  const [originalInsights, setOriginalInsights] = useState<Insight[]>([]);
  
  // 根据上下文过滤洞察
  useEffect(() => {
    if (originalInsights.length > 0) {
      setLoading(true);
      
      // 模拟API调用延迟
      setTimeout(() => {
        let filteredInsights = [...originalInsights];
        
        // 根据上下文过滤
        if (context !== 'general') {
          filteredInsights = filteredInsights.filter(insight => insight.category === context);
        }
        
        // 根据置信度过滤
        filteredInsights = filteredInsights.filter(insight => insight.confidence * 100 >= confidenceThreshold);
        
        // 根据标签页过滤
        if (activeTab !== 'all') {
          filteredInsights = filteredInsights.filter(insight => insight.type === activeTab);
        }
        
        setInsights(filteredInsights);
        setLoading(false);
      }, 800);
    }
  }, [context, activeTab, confidenceThreshold, timeRange, originalInsights]);

  // 处理生成洞察
  const handleGenerateInsights = () => {
    setGeneratingInsights(true);
    setShowGenerateButton(false);
    
    // 模拟API调用延迟
    setTimeout(() => {
      setOriginalInsights(mockInsights);
      setInsights(mockInsights);
      setGeneratingInsights(false);
    }, 2500);
  };
  
  // 重置洞察生成状态
  const resetInsights = () => {
    setShowGenerateButton(true);
    setInsights([]);
    setOriginalInsights([]);
    setSelectedInsight(null);
  };

  // 处理洞察操作
  const handleInsightAction = (insight: Insight, action: string) => {
    if (onInsightAction) {
      onInsightAction(insight, action);
    }
    // 这里可以添加默认的操作处理逻辑
    console.log(`执行操作: ${action}，洞察ID: ${insight.id}`);
  };

  // 处理选择洞察
  const handleSelectInsight = (insight: Insight) => {
    setSelectedInsight(selectedInsight?.id === insight.id ? null : insight);
  };

  // 获取洞察类型图标
  const getInsightTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <ShowChart sx={{ color: theme.palette.primary.main }} />;
      case 'risk':
        return <Warning sx={{ color: theme.palette.error.main }} />;
      case 'trend':
        return <TrendingUp sx={{ color: theme.palette.info.main }} />;
      case 'recommendation':
        return <Recommend sx={{ color: theme.palette.success.main }} />;
      default:
        return <Info />;
    }
  };

  // 获取影响程度颜色
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return theme.palette.error.main;
      case 'medium':
        return theme.palette.warning.main;
      case 'low':
        return theme.palette.success.main;
      default:
        return theme.palette.text.secondary;
    }
  };

  // 渲染图表
  const renderChart = (insight: Insight) => {
    if (!insight.chartType || !insight.data) return null;

    const height = 300;
    
    switch (insight.chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={insight.data}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
              <XAxis dataKey={insight.data[0] && 'month' in insight.data[0] ? 'month' : 'quarter'} />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              {insight.data[0] && '实际销售额' in insight.data[0] && (
                <Line 
                  type="monotone" 
                  dataKey="实际销售额" 
                  stroke={theme.palette.primary.main} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              )}
              {insight.data[0] && '预测销售额' in insight.data[0] && (
                <Line 
                  type="monotone" 
                  dataKey="预测销售额" 
                  stroke={theme.palette.secondary.main} 
                  strokeDasharray="5 5" 
                  strokeWidth={2}
                />
              )}
              {insight.data[0] && '销售额' in insight.data[0] && (
                <Line 
                  type="monotone" 
                  dataKey="销售额" 
                  stroke={theme.palette.primary.main} 
                  activeDot={{ r: 8 }} 
                  strokeWidth={2}
                />
              )}
              {insight.data[0] && '同比变化' in insight.data[0] && (
                <Line 
                  type="monotone" 
                  dataKey="同比变化" 
                  stroke={theme.palette.secondary.main} 
                  yAxisId="right"
                  strokeWidth={2}
                />
              )}
              {insight.data[0] && '同比变化' in insight.data[0] && (
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  domain={['dataMin - 5', 'dataMax + 5']} 
                  unit="%" 
                  label={{ value: '同比变化(%)', angle: 90, position: 'right' }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'bar':
        if (insight.id === '6') { // 销售漏斗优化建议
          return (
            <ResponsiveContainer width="100%" height={height}>
              <RechartsBarChart data={insight.data}>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                <XAxis dataKey="stage" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="当前转化率" fill={theme.palette.primary.main} />
                <Bar dataKey="优化后预期" fill={theme.palette.success.main} />
                <Bar dataKey="行业基准" fill={theme.palette.info.main} />
              </RechartsBarChart>
            </ResponsiveContainer>
          );
        } else if (insight.id === '4') { // 产品推荐引擎
          return (
            <ResponsiveContainer width="100%" height={height}>
              <RechartsBarChart data={insight.data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                <XAxis type="number" />
                <YAxis dataKey="product" type="category" width={100} />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="匹配度" fill={theme.palette.primary.main} />
                <Bar dataKey="预期收入" fill={theme.palette.secondary.main} />
              </RechartsBarChart>
            </ResponsiveContainer>
          );
        }
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart data={insight.data}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
              <XAxis dataKey="name" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="value" fill={theme.palette.primary.main} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      
      case 'pie':
        if (insight.id === '2') { // 客户流失风险预警
          return (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>客户风险分布</Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <RechartsPieChart>
                    <Pie
                      data={insight.data.overview}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {insight.data.overview.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>主要风险因素</Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <RechartsBarChart data={insight.data.factors} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
                    <XAxis type="number" />
                    <YAxis dataKey="factor" type="category" width={120} />
                    <RechartsTooltip />
                    <Bar dataKey="score" fill={theme.palette.error.main}>
                      {insight.data.factors.map((entry: any, index: number) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.score > 70 ? theme.palette.error.main : 
                                entry.score > 50 ? theme.palette.warning.main : 
                                theme.palette.info.main} 
                        />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </Grid>
            </Grid>
          );
        }
        return (
          <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
              <Pie
                data={insight.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {insight.data.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color || `hsl(${index * 45}, 70%, 60%)`} />
                ))}
              </Pie>
              <RechartsTooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <AreaChart data={insight.data}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
              <XAxis dataKey="quarter" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Area type="monotone" dataKey="市场份额" stackId="1" stroke={theme.palette.primary.main} fill={alpha(theme.palette.primary.main, 0.6)} />
              <Area type="monotone" dataKey="行业平均" stackId="2" stroke={theme.palette.grey[600]} fill={alpha(theme.palette.grey[600], 0.3)} />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={height}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} />
              <XAxis type="number" dataKey="x" name="忠诚度" unit="%" />
              <YAxis type="number" dataKey="y" name="增长潜力" unit="%" />
              <ZAxis type="number" dataKey="z" range={[100, 1000]} name="客户价值" unit="元" />
              <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <Paper sx={{ p: 1, boxShadow: theme.shadows[3] }}>
                      <Typography variant="subtitle2">{payload[0].payload.name}</Typography>
                      <Typography variant="body2">忠诚度: {payload[0].value}%</Typography>
                      <Typography variant="body2">增长潜力: {payload[1].value}%</Typography>
                      <Typography variant="body2">客户价值: ¥{payload[2].value}</Typography>
                    </Paper>
                  );
                }
                return null;
              }} />
              <Legend />
              <Scatter name="客户细分" data={insight.data} fill={theme.palette.primary.main} />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return <Typography color="text.secondary">暂无图表数据</Typography>;
    }
  };

  return (
    <Card sx={{ 
      borderRadius: designSystem.borderRadius.xl,
      boxShadow: designSystem.shadows.md,
      overflow: 'hidden'
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2">
            AI业务洞察
            {context !== 'general' && (
              <Chip 
                label={{
                  sales: '销售',
                  customer: '客户',
                  product: '产品',
                  market: '市场'
                }[context]}
                size="small"
                color="primary"
                sx={{ ml: 1 }}
              />
            )}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!showGenerateButton && (
              <FormControl size="small" sx={{ minWidth: 120, mr: 1 }}>
                <InputLabel>时间范围</InputLabel>
                <Select
                  value={timeRange}
                  label="时间范围"
                  onChange={(e) => setTimeRange(e.target.value)}
                  size="small"
                >
                  <MenuItem value="month">近1个月</MenuItem>
                  <MenuItem value="quarter">近3个月</MenuItem>
                  <MenuItem value="halfyear">近6个月</MenuItem>
                  <MenuItem value="year">近1年</MenuItem>
                </Select>
              </FormControl>
            )}
            
            {!showGenerateButton && (
              <Tooltip title="刷新数据">
                <IconButton onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 800);
                }}>
                  <Refresh />
                </IconButton>
              </Tooltip>
            )}
            
            {!showGenerateButton && (
              <Tooltip title="重新生成洞察">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<Refresh />}
                  onClick={resetInsights}
                  sx={{ ml: 1 }}
                >
                  重新生成
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
        
        {showGenerateButton ? (
          <Fade in={showGenerateButton}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              py: 8,
              textAlign: 'center'
            }}>
              <Lightbulb sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 3 }} />
              <Typography variant="h5" gutterBottom>
                生成AI业务洞察
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
                基于您的业务数据，AI将分析并生成关于销售趋势、客户行为、市场机会和产品推荐的洞察。
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<Analytics />}
                onClick={handleGenerateInsights}
                disabled={generatingInsights}
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  borderRadius: designSystem.borderRadius.lg,
                  boxShadow: designSystem.shadows.md,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: designSystem.shadows.lg
                  },
                  transition: 'all 0.3s'
                }}
              >
                {generatingInsights ? '正在生成洞察...' : '生成业务洞察'}
                {generatingInsights && <CircularProgress size={24} sx={{ ml: 2 }} />}
              </Button>
            </Box>
          </Fade>
        ) : (
          <>
            <Box sx={{ mb: 3 }}>
              <Paper sx={{ p: 2, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FilterList sx={{ mr: 1, color: theme.palette.primary.main }} />
                  <Typography variant="subtitle1">洞察筛选</Typography>
                </Box>
                
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Tabs
                      value={activeTab}
                      onChange={(_event, newValue) => setActiveTab(newValue)}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="全部" value="all" />
                      <Tab 
                        label="预测" 
                        value="prediction" 
                        icon={<ShowChart />} 
                        iconPosition="start" 
                      />
                      <Tab 
                        label="风险" 
                        value="risk" 
                        icon={<Warning />} 
                        iconPosition="start" 
                      />
                      <Tab 
                        label="趋势" 
                        value="trend" 
                        icon={<TrendingUp />} 
                        iconPosition="start" 
                      />
                      <Tab 
                        label="建议" 
                        value="recommendation" 
                        icon={<Recommend />} 
                        iconPosition="start" 
                      />
                    </Tabs>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 2, minWidth: 120 }}>
                        置信度阈值: {confidenceThreshold}%
                      </Typography>
                      <Slider
                        value={confidenceThreshold}
                        onChange={(_event, newValue) => setConfidenceThreshold(newValue as number)}
                        min={0}
                        max={100}
                        step={5}
                        valueLabelDisplay="auto"
                        sx={{ ml: 2 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
            
            {loading || generatingInsights ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                <CircularProgress />
              </Box>
            ) : insights.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  没有找到符合条件的业务洞察
                </Typography>
                <Button 
                  variant="outlined" 
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setActiveTab('all');
                    setConfidenceThreshold(60);
                  }}
                >
                  重置筛选条件
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {insights.map((insight) => (
                  <Grid item xs={12} md={selectedInsight ? 12 : 6} lg={selectedInsight ? 12 : 4} key={insight.id}>
                    <Card 
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          boxShadow: theme.shadows[10],
                          transform: selectedInsight?.id !== insight.id ? 'translateY(-5px)' : 'none'
                        },
                        ...(selectedInsight?.id === insight.id && {
                          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                        })
                      }}
                      onClick={() => handleSelectInsight(insight)}
                    >
                      <CardContent sx={{ p: 2, flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Box sx={{ mr: 1 }}>
                            {getInsightTypeIcon(insight.type)}
                          </Box>
                          <Typography variant="h6" component="h3" noWrap>
                            {insight.title}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                          <Chip 
                            label={`${Math.round(insight.confidence * 100)}% 置信度`}
                            size="small"
                            color={insight.confidence > 0.8 ? 'success' : 'default'}
                            sx={{ mr: 1, mb: 1 }}
                          />
                          <Chip 
                            label={{
                              high: '高影响',
                              medium: '中影响',
                              low: '低影响'
                            }[insight.impact]}
                            size="small"
                            sx={{ 
                              mr: 1, 
                              mb: 1,
                              bgcolor: alpha(getImpactColor(insight.impact), 0.1),
                              color: getImpactColor(insight.impact),
                              borderColor: getImpactColor(insight.impact)
                            }}
                            variant="outlined"
                          />
                          <Chip 
                            label={insight.timeFrame}
                            size="small"
                            icon={<DateRange sx={{ fontSize: 16 }} />}
                            variant="outlined"
                            sx={{ mb: 1 }}
                          />
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {insight.description}
                        </Typography>
                        
                        {selectedInsight?.id === insight.id && (
                          <Box sx={{ mt: 2 }}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle2" gutterBottom>数据可视化</Typography>
                            <Box sx={{ mt: 2, mb: 3 }}>
                              {renderChart(insight)}
                            </Box>
                            
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="subtitle2" gutterBottom>建议操作</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                              {insight.actions?.map((action, index) => (
                                <Button
                                  key={index}
                                  variant="outlined"
                                  size="small"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleInsightAction(insight, action);
                                  }}
                                  startIcon={action.includes('下载') ? <ArrowDownward /> : <Check />}
                                >
                                  {action}
                                </Button>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BusinessInsights;