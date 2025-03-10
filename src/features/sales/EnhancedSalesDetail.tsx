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
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  TextField,
  CircularProgress,
  Tooltip,
  LinearProgress,
  useTheme
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Phone,
  Email,
  LocationOn,
  AttachMoney,
  TrendingUp,
  Person,
  Edit,
  Add,
  InsertChart,
  Lightbulb,
  History,
  CalendarToday,
  Check,
  Refresh,
  Info
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts';
import AIAssistant from '../ai/AIAssistant';
import { designSystem } from '../../theme/designSystem';

interface SalesDetailProps {
  opportunityId?: string;
}

interface SalesOpportunity {
  id: string;
  title: string;
  customerName: string;
  customerCompany: string;
  customerAvatar?: string;
  productName: string;
  amount: number;
  stage: string;
  probability: number;
  expectedClosingDate: string;
  createdAt: string;
  lastContactDate: string;
  assignedTo: string;
  assignedToAvatar?: string;
  notes: string;
  tags?: string[];
  activities: {
    id: string;
    type: string;
    date: string;
    description: string;
    user?: string;
    userAvatar?: string;
  }[];
  competitors?: {
    name: string;
    strengths: string[];
    weaknesses: string[];
    pricing?: string;
    probability?: number;
  }[];
}

// 模拟销售机会详细数据
const mockOpportunityData: SalesOpportunity = {
  id: '1',
  title: '企业管理系统实施项目',
  customerName: '张总',
  customerCompany: '科技有限公司',
  customerAvatar: 'https://mui.com/static/images/avatar/2.jpg',
  productName: '企业管理系统',
  amount: 100000,
  stage: '需求确认',
  probability: 60,
  expectedClosingDate: '2024-06-30',
  createdAt: '2024-01-15',
  lastContactDate: '2024-02-20',
  assignedTo: '王销售',
  assignedToAvatar: 'https://mui.com/static/images/avatar/3.jpg',
  notes: '客户对价格比较敏感，需要强调产品的性价比和长期价值',
  tags: ['重点客户', '新行业', '高价值'],
  activities: [
    {
      id: '1',
      type: '电话沟通',
      date: '2024-02-20',
      description: '与客户讨论了需求细节，客户表示对自动化报表功能特别感兴趣',
      user: '王销售',
      userAvatar: 'https://mui.com/static/images/avatar/3.jpg'
    },
    {
      id: '2',
      type: '邮件往来',
      date: '2024-02-15',
      description: '发送了产品介绍文档和初步报价',
      user: '王销售',
      userAvatar: 'https://mui.com/static/images/avatar/3.jpg'
    },
    {
      id: '3',
      type: '现场拜访',
      date: '2024-02-01',
      description: '拜访客户公司，了解业务流程和痛点',
      user: '李经理',
      userAvatar: 'https://mui.com/static/images/avatar/4.jpg'
    }
  ],
  competitors: [
    {
      name: 'A公司',
      strengths: ['品牌知名度高', '产品功能全面'],
      weaknesses: ['价格昂贵', '定制化能力弱'],
      pricing: '¥150,000',
      probability: 25
    },
    {
      name: 'B公司',
      strengths: ['价格低廉', '实施周期短'],
      weaknesses: ['功能简单', '售后服务差'],
      pricing: '¥80,000',
      probability: 15
    }
  ]
};

// 模拟销售漏斗数据
const funnelData = [
  { value: 100, name: '初步接触', fill: '#8884d8' },
  { value: 80, name: '需求确认', fill: '#83a6ed' },
  { value: 60, name: '方案制定', fill: '#8dd1e1' },
  { value: 40, name: '商务谈判', fill: '#82ca9d' },
  { value: 20, name: '合同签订', fill: '#a4de6c' }
];

// 模拟销售活动数据
const activityData = [
  { month: '1月', 电话: 8, 邮件: 12, 会议: 3 },
  { month: '2月', 电话: 10, 邮件: 8, 会议: 4 },
  { month: '3月', 电话: 12, 邮件: 15, 会议: 2 },
  { month: '4月', 电话: 6, 邮件: 10, 会议: 1 },
  { month: '5月', 电话: 8, 邮件: 9, 会议: 5 },
  { month: '6月', 电话: 14, 邮件: 18, 会议: 3 }
];

// 模拟竞争对手分析数据
const competitorData = [
  { x: 70, y: 80, z: 150000, name: 'A公司' },
  { x: 60, y: 60, z: 100000, name: '我们' },
  { x: 50, y: 40, z: 80000, name: 'B公司' }
];

// 模拟预测数据
const predictionData = [
  { name: '成交', value: 60, color: '#4caf50' },
  { name: '未成交', value: 40, color: '#f44336' }
];

const EnhancedSalesDetail: React.FC<SalesDetailProps> = ({ opportunityId: propOpportunityId }) => {
  const { id: urlId } = useParams<{ id: string }>();
  const opportunityId = propOpportunityId || urlId || '1';
  const theme = useTheme();
  
  const [tabValue, setTabValue] = useState(0);
  const [opportunityData, setOpportunityData] = useState<SalesOpportunity>(mockOpportunityData);
  const [isLoading, setIsLoading] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [predictionResult, setPredictionResult] = useState<{
    predictedRevenue: number;
    confidenceScore: number;
    trendDirection: string;
    seasonalImpact: number;
    recommendedActions: string[];
  } | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);

  useEffect(() => {
    // 这里应该使用opportunityId从API获取销售机会数据
    // 暂时使用模拟数据
    setOpportunityData(mockOpportunityData);
  }, [opportunityId]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setOpportunityData(prev => ({
        ...prev,
        notes: prev.notes + '\n' + newNote
      }));
      setNewNote('');
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestionApply = (suggestion: any) => {
    console.log('应用建议:', suggestion);
    // 这里应该实现建议应用逻辑
    alert(`已应用建议: ${suggestion.title}`);
  };

  const generateSalesPrediction = async () => {
    setIsPredicting(true);
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 模拟预测结果
      setPredictionResult({
        predictedRevenue: 85000,
        confidenceScore: 72,
        trendDirection: '上升',
        seasonalImpact: 15,
        recommendedActions: [
          '提供更详细的技术规格文档',
          '安排产品演示会议',
          '准备竞品对比分析'
        ]
      });
    } catch (error) {
      console.error('生成预测失败:', error);
    } finally {
      setIsPredicting(false);
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case '初步接触':
        return theme.palette.info.main;
      case '需求确认':
        return theme.palette.primary.main;
      case '方案制定':
        return theme.palette.secondary.main;
      case '商务谈判':
        return theme.palette.warning.main;
      case '合同签订':
        return theme.palette.success.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', width: '100%', px: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          销售机会详情
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<Edit />}
            sx={{ 
              borderRadius: designSystem.borderRadius.md,
              transition: designSystem.transitions.normal,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: designSystem.shadows.sm
              }
            }}
          >
            编辑
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Phone />}
            sx={{ 
              borderRadius: designSystem.borderRadius.md,
              transition: designSystem.transitions.normal,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: designSystem.shadows.md
              }
            }}
          >
            联系客户
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            borderRadius: designSystem.borderRadius.xl,
            boxShadow: designSystem.shadows.md,
            height: '100%',
            transition: designSystem.transitions.normal,
            '&:hover': {
              boxShadow: designSystem.shadows.lg,
              transform: 'translateY(-4px)'
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {opportunityData.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar 
                    src={opportunityData.customerAvatar} 
                    alt={opportunityData.customerName}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="body1">
                    {opportunityData.customerName} - {opportunityData.customerCompany}
                  </Typography>
                </Box>
                <Chip 
                  label={opportunityData.stage} 
                  size="small"
                  sx={{ 
                    bgcolor: alpha(getStageColor(opportunityData.stage), 0.1),
                    color: getStageColor(opportunityData.stage),
                    fontWeight: 500,
                    borderRadius: designSystem.borderRadius.md,
                    mb: 1
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <AttachMoney fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="金额" 
                    secondary={`¥${opportunityData.amount.toLocaleString()}`}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="成交概率" 
                    secondary={`${opportunityData.probability}%`}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="预计成交日期" 
                    secondary={opportunityData.expectedClosingDate}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="负责人" 
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          src={opportunityData.assignedToAvatar} 
                          alt={opportunityData.assignedTo}
                          sx={{ width: 20, height: 20, mr: 1 }}
                        />
                        <Typography variant="body1">{opportunityData.assignedTo}</Typography>
                      </Box>
                    }
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  标签
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {opportunityData.tags?.map((tag, index) => (
                    <Chip 
                      key={index} 
                      label={tag} 
                      size="small"
                      sx={{ 
                        borderRadius: designSystem.borderRadius.md,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  销售进度
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={opportunityData.probability} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 4,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                        }
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {opportunityData.probability}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            borderRadius: designSystem.borderRadius.xl,
            boxShadow: designSystem.shadows.md,
            mb: 3,
            transition: designSystem.transitions.normal,
            '&:hover': {
              boxShadow: designSystem.shadows.lg
            }
          }}>
            <CardContent sx={{ p: 0 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ 
                  borderBottom: 1, 
                  borderColor: 'divider',
                  '& .MuiTab-root': {
                    minWidth: 100,
                    transition: designSystem.transitions.fast,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                    '&.Mui-selected': {
                      color: theme.palette.primary.main,
                      fontWeight: 600,
                    }
                  }
                }}
              >
                <Tab label="概览" icon={<InsertChart />} iconPosition="start" />
                <Tab label="活动记录" icon={<History />} iconPosition="start" />
                <Tab label="竞争分析" icon={<BarChart />} iconPosition="start" />
                <Tab label="销售预测" icon={<TrendingUp />} iconPosition="start" />
                <Tab label="智能助手" icon={<Lightbulb />} iconPosition="start" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {/* 概览面板 */}
                {tabValue === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        销售漏斗
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          height: 300, 
                          borderRadius: designSystem.borderRadius.lg,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <FunnelChart>
                            <RechartsTooltip />
                            <Funnel
                              dataKey="value"
                              data={funnelData}
                              isAnimationActive
                            >
                              <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                            </Funnel>
                          </FunnelChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        活动趋势
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          height: 300, 
                          borderRadius: designSystem.borderRadius.lg,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={activityData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <RechartsTooltip />
                            <Legend />
                            <Line type="monotone" dataKey="电话" stroke="#8884d8" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="邮件" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="会议" stroke="#ffc658" />
                          </LineChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        备注
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          borderRadius: designSystem.borderRadius.lg,
                          border: `1px solid ${theme.palette.divider}`,
                          mb: 2
                        }}
                      >
                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                          {opportunityData.notes}
                        </Typography>
                      </Paper>
                      <Box sx={{ display: 'flex' }}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          placeholder="添加备注..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          variant="outlined"
                          sx={{ 
                            mr: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: designSystem.borderRadius.md,
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleAddNote}
                          disabled={!newNote.trim() || isLoading}
                          sx={{ 
                            borderRadius: designSystem.borderRadius.md,
                            minWidth: 100,
                            alignSelf: 'flex-start'
                          }}
                        >
                          {isLoading ? <CircularProgress size={24} /> : '添加'}
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                )}
                
                {/* 活动记录面板 */}
                {tabValue === 1 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        活动记录
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<Add />}
                        size="small"
                        sx={{ borderRadius: designSystem.borderRadius.md }}
                      >
                        添加活动
                      </Button>
                    </Box>
                    <List>
                      {opportunityData.activities.map((activity) => (
                        <React.Fragment key={activity.id}>
                          <ListItem 
                            alignItems="flex-start"
                            sx={{ 
                              py: 2,
                              borderRadius: designSystem.borderRadius.lg,
                              '&:hover': {
                                backgroundColor: alpha(theme.palette.primary.main, 0.03),
                              }
                            }}
                          >
                            <ListItemIcon>
                              {activity.type === '电话沟通' && <Phone color="primary" />}
                              {activity.type === '邮件往来' && <Email color="primary" />}
                              {activity.type === '现场拜访' && <LocationOn color="primary" />}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="subtitle2">{activity.type}</Typography>
                                  <Typography variant="body2" color="text.secondary">{activity.date}</Typography>
                                </Box>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    {activity.description}
                                  </Typography>
                                  {activity.user && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                      <Avatar 
                                        src={activity.userAvatar} 
                                        alt={activity.user}
                                        sx={{ width: 20, height: 20, mr: 1 }}
                                      />
                                      <Typography variant="body2" color="text.secondary">
                                        {activity.user}
                                      </Typography>
                                    </Box>
                                  )}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider component="li" />
                        </React.Fragment>
                      ))}
                    </List>
                  </Box>
                )}
                
                {/* 竞争分析面板 */}
                {tabValue === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        竞争对手分析
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          height: 350, 
                          borderRadius: designSystem.borderRadius.lg,
                          border: `1px solid ${theme.palette.divider}`,
                          mb: 3
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <ScatterChart
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                            <XAxis 
                              type="number" 
                              dataKey="x" 
                              name="功能完整度" 
                              unit="%" 
                              domain={[0, 100]}
                            />
                            <YAxis 
                              type="number" 
                              dataKey="y" 
                              name="客户满意度" 
                              unit="%" 
                              domain={[0, 100]}
                            />
                            <ZAxis 
                              type="number" 
                              dataKey="z" 
                              range={[100, 500]} 
                              name="价格" 
                              unit="元"
                            />
                            <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} formatter={(value, name) => [`${value}${name === 'z' ? '元' : '%'}`, name === 'z' ? '价格' : name === 'x' ? '功能完整度' : '客户满意度']} />
                            <Legend />
                            <Scatter name="竞争对手分析" data={competitorData} fill={theme.palette.primary.main} />
                          </ScatterChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                    
                    {opportunityData.competitors && opportunityData.competitors.length > 0 && (
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          竞争对手详情
                        </Typography>
                        <Grid container spacing={2}>
                          {opportunityData.competitors.map((competitor, index) => (
                            <Grid item xs={12} md={6} key={index}>
                              <Paper 
                                elevation={0} 
                                sx={{ 
                                  p: 2, 
                                  borderRadius: designSystem.borderRadius.lg,
                                  border: `1px solid ${theme.palette.divider}`,
                                  height: '100%'
                                }}
                              >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                    {competitor.name}
                                  </Typography>
                                  <Chip 
                                    label={`${competitor.probability}%`} 
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ borderRadius: designSystem.borderRadius.md }}
                                  />
                                </Box>
                                
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    优势:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {competitor.strengths.map((strength, i) => (
                                      <Chip 
                                        key={i} 
                                        label={strength} 
                                        size="small"
                                        sx={{ 
                                          borderRadius: designSystem.borderRadius.md,
                                          bgcolor: alpha(theme.palette.success.main, 0.1),
                                          color: theme.palette.success.main,
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                                
                                <Box sx={{ mb: 2 }}>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    劣势:
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {competitor.weaknesses.map((weakness, i) => (
                                      <Chip 
                                        key={i} 
                                        label={weakness} 
                                        size="small"
                                        sx={{ 
                                          borderRadius: designSystem.borderRadius.md,
                                          bgcolor: alpha(theme.palette.error.main, 0.1),
                                          color: theme.palette.error.main,
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                                
                                {competitor.pricing && (
                                  <Typography variant="body2">
                                    价格: <strong>{competitor.pricing}</strong>
                                  </Typography>
                                )}
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                )}
                
                {/* 销售预测面板 */}
                {tabValue === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        成交概率预测
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          height: 300, 
                          borderRadius: designSystem.borderRadius.lg,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={predictionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {predictionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <RechartsTooltip />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                        AI销售预测
                        <Tooltip title="生成基于历史数据和市场趋势的销售预测">
                          <IconButton size="small" sx={{ ml: 1 }}>
                            <Info fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      <Paper 
                        elevation={0} 
                        sx={{ 
                          p: 2, 
                          height: 300, 
                          borderRadius: designSystem.borderRadius.lg,
                          border: `1px solid ${theme.palette.divider}`,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
                        {!predictionResult && !isPredicting && (
                          <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              生成AI销售预测，帮助您更好地了解销售机会
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<TrendingUp />}
                              onClick={generateSalesPrediction}
                              sx={{ 
                                mt: 2,
                                borderRadius: designSystem.borderRadius.md
                              }}
                            >
                              生成预测
                            </Button>
                          </Box>
                        )}
                        
                        {isPredicting && (
                          <Box sx={{ textAlign: 'center' }}>
                            <CircularProgress size={40} />
                            <Typography variant="body2" sx={{ mt: 2 }}>
                              正在分析数据，生成预测...
                            </Typography>
                          </Box>
                        )}
                        
                        {predictionResult && !isPredicting && (
                          <Box sx={{ width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="body2">
                                预测收入:
                              </Typography>
                              <Typography variant="body2" fontWeight={600}>
                                ¥{predictionResult.predictedRevenue.toLocaleString()}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="body2">
                                置信度:
                              </Typography>
                              <Typography variant="body2" fontWeight={600}>
                                {predictionResult.confidenceScore}%
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                              <Typography variant="body2">
                                趋势方向:
                              </Typography>
                              <Typography variant="body2" fontWeight={600} color={predictionResult.trendDirection === '上升' ? 'success.main' : 'error.main'}>
                                {predictionResult.trendDirection}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" gutterBottom>
                                建议行动:
                              </Typography>
                              <List dense>
                                {predictionResult.recommendedActions.map((action, index) => (
                                  <ListItem key={index} sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 30 }}>
                                      <Check fontSize="small" color="primary" />
                                    </ListItemIcon>
                                    <ListItemText primary={action} />
                                  </ListItem>
                                ))}
                              </List>
                            </Box>
                            
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button
                                size="small"
                                startIcon={<Refresh />}
                                onClick={generateSalesPrediction}
                              >
                                刷新预测
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                )}
                
                {/* AI助手面板 */}
                {tabValue === 4 && (
                  <Box>
                    <AIAssistant 
                      context="sales" 
                      entityId={opportunityId}
                      onSuggestionApply={handleSuggestionApply}
                    />
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EnhancedSalesDetail;
// 在第546行附近，修复Tooltip组件的使用
// 将:
// <Tooltip content="" />
// 修改为:
// <Tooltip title="">
//   <span>内容</span>
// </Tooltip>