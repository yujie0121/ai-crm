import React, { useState, useEffect } from 'react';
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
  IconButton,
  Menu,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Tooltip,
  useTheme,
  Fade,
  List,
  ListItem,
  Divider,
  LinearProgress
} from '@mui/material';
import {
  Timeline,
  People,
  Lightbulb,
  SmartToy,
  MoreVert,
  FilterList,
  Refresh,
  LocationOn,
  TrendingUp,
  Group,
  Assessment,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
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
  Bar,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { InsightsOutlined as Insights } from '@mui/icons-material';
import recentActivities from './recentActivities';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [aiInsightLoading, setAiInsightLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const chartHeight = 300;

  useEffect(() => {
    // 模拟数据刷新
    if (isRefreshing) {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  }, [isRefreshing]);

  // 处理菜单打开关闭
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // 处理筛选器
  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // 处理时间范围变更
  const handleTimeRangeChange = (event: any) => {
    setTimeRange(event.target.value);
  };

  // 刷新数据
  const handleRefresh = () => {
    setIsRefreshing(true);
  };

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
    // 如果已经在加载状态，先重置状态
    if (aiInsightLoading) {
      setAiInsightLoading(false);
      return;
    }
    
    setAiInsightLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setAiInsightLoading(false);
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Fade in={true} timeout={800}>
        <Box>
          {/* 顶部控制栏 */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              仪表盘概览
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>时间范围</InputLabel>
                <Select
                  value={timeRange}
                  label="时间范围"
                  onChange={handleTimeRangeChange}
                >
                  <MenuItem value="day">今日</MenuItem>
                  <MenuItem value="week">本周</MenuItem>
                  <MenuItem value="month">本月</MenuItem>
                  <MenuItem value="quarter">本季度</MenuItem>
                  <MenuItem value="year">本年</MenuItem>
                </Select>
              </FormControl>
              <IconButton onClick={handleFilterOpen}>
                <FilterList />
              </IconButton>
              <IconButton onClick={handleRefresh} disabled={isRefreshing}>
                <Refresh sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
              </IconButton>
              <IconButton onClick={handleMenuOpen}>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {/* 筛选器菜单 */}
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterClose}
          >
            <MenuItem onClick={handleFilterClose}>按部门筛选</MenuItem>
            <MenuItem onClick={handleFilterClose}>按产品线筛选</MenuItem>
            <MenuItem onClick={handleFilterClose}>按地区筛选</MenuItem>
          </Menu>

          {/* 更多操作菜单 */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>导出报表</MenuItem>
            <MenuItem onClick={handleMenuClose}>打印视图</MenuItem>
            <MenuItem onClick={handleMenuClose}>自定义布局</MenuItem>
          </Menu>
          {/* 数据概览卡片 */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        总客户数
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                        1,254
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                        较上月增长 12%
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                      <Group sx={{ fontSize: 32 }} />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'success.light', 
                color: 'success.contrastText',
                background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)',
                boxShadow: '0 3px 5px 2px rgba(139, 195, 74, .3)',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        本月销售额
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                        ¥328,500
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                        较上月增长 8.5%
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                      <Assessment sx={{ fontSize: 32 }} />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'warning.light', 
                color: 'warning.contrastText',
                background: 'linear-gradient(45deg, #FF9800 30%, #FFEB3B 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 235, 59, .3)',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        待处理任务
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                        28
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5, transform: 'rotate(90deg)', color: 'error.main' }} />
                        较上周增加 5 个
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                      <Timeline sx={{ fontSize: 32 }} />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ 
                bgcolor: 'error.light', 
                color: 'error.contrastText',
                background: 'linear-gradient(45deg, #F44336 30%, #FF9800 90%)',
                boxShadow: '0 3px 5px 2px rgba(244, 67, 54, .3)',
                height: '100%',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="overline" sx={{ opacity: 0.8 }}>
                        客户流失风险
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                        12
                      </Typography>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <TrendingUp sx={{ fontSize: 16, mr: 0.5, transform: 'rotate(180deg)', color: 'success.light' }} />
                        较上月减少 3 个
                      </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 56, height: 56 }}>
                      <People sx={{ fontSize: 32 }} />
                    </Avatar>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Grid container spacing={3}>
            {/* 最近活动 */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ 
                p: 2, 
                borderRadius: 2, 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                height: '100%',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    最近活动
                  </Typography>
                  <Chip label="实时更新" size="small" color="primary" variant="outlined" />
                </Box>
                <List sx={{ maxHeight: chartHeight, overflow: 'auto' }}>
                  {recentActivities.map((activity, index) => {
                    // 根据优先级设置颜色
                    const getPriorityColor = (priority: string) => {
                      switch(priority) {
                        case 'urgent': return theme.palette.error.main;
                        case 'high': return theme.palette.warning.main;
                        default: return theme.palette.primary.main;
                      }
                    };
                    
                    // 根据类型设置图标
                    const getTypeIcon = (type: string) => {
                      switch(type) {
                        case 'alert': return <SmartToy sx={{ color: theme.palette.error.main }} />;
                        case 'opportunity': return <TrendingUp sx={{ color: theme.palette.success.main }} />;
                        case 'ai': return <Lightbulb sx={{ color: theme.palette.info.main }} />;
                        default: return <Timeline sx={{ color: theme.palette.primary.main }} />;
                      }
                    };
                    
                    return (
                      <React.Fragment key={index}>
                        <ListItem sx={{ 
                          py: 1.5, 
                          px: 2, 
                          borderLeft: `3px solid ${getPriorityColor(activity.priority)}`,
                          borderRadius: 1,
                          mb: 1,
                          bgcolor: 'background.paper',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                          '&:hover': { bgcolor: 'action.hover', transform: 'translateX(5px)', transition: 'all 0.3s' }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Avatar 
                              src={activity.avatar} 
                              alt={activity.user}
                              sx={{ width: 36, height: 36, mr: 2 }}
                            >
                              {getTypeIcon(activity.type)}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                {activity.content}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {activity.time}
                              </Typography>
                            </Box>
                          </Box>
                        </ListItem>
                      </React.Fragment>
                    );
                  })}
                </List>
              </Paper>
            </Grid>

            {/* 销售漏斗分析 */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title="销售漏斗分析"
                  subheader="各阶段转化情况"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <FunnelChart>
                      <Tooltip title="业绩指标对比"><div /></Tooltip>
                      <Funnel
                        data={funnelData}
                        dataKey="value"
                        nameKey="name"
                        isAnimationActive
                      >
                        <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                      </Funnel>
                    </FunnelChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* 客户画像分析 */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title="客户画像分析"
                  subheader="多维度客户特征"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart outerRadius={150} data={customerPortraitData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="客户特征"
                        dataKey="A"
                        stroke={theme.palette.primary.main}
                        fill={theme.palette.primary.main}
                        fillOpacity={0.6}
                      />
                      <Tooltip title="业绩指标对比"><div /></Tooltip>
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* 客户类型分布 */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title="客户类型分布"
                  subheader="不同类型客户占比"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={customerTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip title="业绩指标对比"><div /></Tooltip>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* 业绩指标对比 */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title="业绩指标对比"
                  subheader="目标达成情况"
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip title="业绩指标对比"><div /></Tooltip>
                      <Bar dataKey="value" fill={theme.palette.primary.main} name="实际值">
                        {performanceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.value >= entry.target ? theme.palette.success.main : theme.palette.warning.main}
                          />
                        ))}
                      </Bar>
                      <Bar dataKey="target" fill={theme.palette.grey[300]} name="目标值" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
            
            {/* 客户地域分布 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    客户地域分布
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ color: theme.palette.primary.main, mr: 0.5, fontSize: 18 }} />
                    <Typography variant="body2" color="text.secondary">
                      覆盖全国28个省市
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ height: chartHeight, position: 'relative', overflow: 'hidden' }}>
                  {/* 这里实际项目中应该使用地图组件，如 react-simple-maps 或 echarts */}
                  <Box sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: 'rgba(0,0,0,0.03)',
                    borderRadius: 1
                  }}>
                    <img 
                      src="/china-map-placeholder.png" 
                      alt="中国地图" 
                      style={{ maxWidth: '100%', maxHeight: '100%', opacity: 0.7 }}
                      onError={(e) => {
                        // 如果图片加载失败，显示备用内容
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      left: 0, 
                      right: 0, 
                      bottom: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                        客户地域热力图
                      </Typography>
                      <Grid container spacing={1} sx={{ maxWidth: '80%' }}>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#f44336', mr: 1 }} />
                            <Typography variant="body2">华东地区 (38%)</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff9800', mr: 1 }} />
                            <Typography variant="body2">华北地区 (24%)</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#2196f3', mr: 1 }} />
                            <Typography variant="body2">华南地区 (18%)</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#4caf50', mr: 1 }} />
                            <Typography variant="body2">西南地区 (12%)</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#9c27b0', mr: 1 }} />
                            <Typography variant="body2">西北地区 (5%)</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#607d8b', mr: 1 }} />
                            <Typography variant="body2">东北地区 (3%)</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            {/* 团队绩效对比 */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    团队绩效对比
                  </Typography>
                  <Chip label="本季度" size="small" color="primary" variant="outlined" />
                </Box>
                <Box sx={{ height: chartHeight }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: '销售一组', 目标完成率: 95, 客户满意度: 88, 新增客户: 76 },
                        { name: '销售二组', 目标完成率: 85, 客户满意度: 92, 新增客户: 65 },
                        { name: '销售三组', 目标完成率: 78, 客户满意度: 85, 新增客户: 82 },
                        { name: '销售四组', 目标完成率: 90, 客户满意度: 79, 新增客户: 70 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip title="业绩指标对比"><div /></Tooltip>
                      <Bar dataKey="目标完成率" fill="#8884d8" />
                      <Bar dataKey="客户满意度" fill="#82ca9d" />
                      <Bar dataKey="新增客户" fill="#ffc658" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>

            {/* AI 分析建议 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SmartToy sx={{ mr: 1, color: theme.palette.secondary.main, fontSize: 28 }} />
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      AI 智能分析建议
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      startIcon={<Lightbulb />}
                      size="small"
                      onClick={generateAiInsight}
                      disabled={aiInsightLoading}
                      sx={{ 
                        background: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                        '&:hover': {
                          boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      {aiInsightLoading ? '生成中...' : '生成新洞察'}
                    </Button>
                  </Box>
                </Box>
                {aiInsightLoading && <LinearProgress 
                  sx={{ 
                    mb: 2,
                    height: 6,
                    borderRadius: 3,
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 100%)'
                    }
                  }} 
                />}
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                      height: '100%',
                      borderRadius: 2
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label="AI置信度: 92%" 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                          />
                          <Button size="small" color="primary">查看详情</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                      height: '100%',
                      borderRadius: 2
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label="AI置信度: 87%" 
                            size="small" 
                            color="warning" 
                            variant="outlined" 
                          />
                          <Button size="small" color="warning">立即处理</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ 
                      transition: 'transform 0.3s, box-shadow 0.3s', 
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                      height: '100%',
                      borderRadius: 2
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
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip 
                            label="AI置信度: 89%" 
                            size="small" 
                            color="success" 
                            variant="outlined" 
                          />
                          <Button size="small" color="success">应用推荐</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          
          {/* 产品销售趋势图 */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TrendingUp sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6">产品销售趋势</Typography>
                    </Box>
                  }
                  subheader="近6个月各产品销售情况"
                  action={
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>产品类别</InputLabel>
                      <Select
                        value="all"
                        label="产品类别"
                      >
                        <MenuItem value="all">全部产品</MenuItem>
                        <MenuItem value="software">软件产品</MenuItem>
                        <MenuItem value="hardware">硬件产品</MenuItem>
                        <MenuItem value="service">服务产品</MenuItem>
                      </Select>
                    </FormControl>
                  }
                />
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                      data={[
                        { month: '1月', 产品A: 4000, 产品B: 2400, 产品C: 1800 },
                        { month: '2月', 产品A: 3000, 产品B: 2210, 产品C: 2200 },
                        { month: '3月', 产品A: 2000, 产品B: 2290, 产品C: 2500 },
                        { month: '4月', 产品A: 2780, 产品B: 3090, 产品C: 2800 },
                        { month: '5月', 产品A: 1890, 产品B: 3490, 产品C: 3300 },
                        { month: '6月', 产品A: 2390, 产品B: 3800, 产品C: 3700 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip title="业绩指标对比"><div /></Tooltip>
                      <Legend />
                      <Line type="monotone" dataKey="产品A" stroke="#8884d8" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="产品B" stroke="#82ca9d" />
                      <Line type="monotone" dataKey="产品C" stroke="#ff7300" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* 销售业绩排行榜 */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Assessment sx={{ mr: 1, color: theme.palette.success.main }} />
                      <Typography variant="h6">销售业绩排行</Typography>
                    </Box>
                  }
                  subheader="本月销售人员业绩排名"
                />
                <CardContent>
                  <List>
                    {[
                      { name: '张三', amount: 125800, target: 150000, avatar: 'Z' },
                      { name: '李四', amount: 98500, target: 100000, avatar: 'L' },
                      { name: '王五', amount: 86700, target: 80000, avatar: 'W' },
                      { name: '赵六', amount: 75200, target: 80000, avatar: 'Z' },
                      { name: '钱七', amount: 62300, target: 70000, avatar: 'Q' },
                    ].map((item, index) => (
                      <React.Fragment key={index}>
                        <ListItem sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <Avatar
                              sx={{
                                bgcolor: index === 0 ? 'warning.main' : index === 1 ? 'info.main' : 'grey.400',
                                mr: 2
                              }}
                            >
                              {item.avatar}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography variant="subtitle2">{item.name}</Typography>
                                <Typography variant="subtitle2" fontWeight="bold">
                                  ¥{item.amount.toLocaleString()}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={(item.amount / item.target) * 100}
                                  sx={{ flexGrow: 1, mr: 2, height: 8, borderRadius: 4 }}
                                  color={item.amount >= item.target ? 'success' : 'primary'}
                                />
                                <Typography variant="caption" color="text.secondary">
                                  {Math.round((item.amount / item.target) * 100)}%
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </ListItem>
                        {index < 4 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardHeader
                  title={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Insights sx={{ mr: 1, color: theme.palette.info.main }} />
                      <Typography variant="h6">销售指标分析</Typography>
                    </Box>
                  }
                  subheader="关键销售指标监控"
                />
                <CardContent>
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">客户转化率</Typography>
                      <Typography variant="body2" fontWeight="bold">42%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={42} 
                      sx={{ height: 8, borderRadius: 4 }} 
                      color="success"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">平均成交周期</Typography>
                      <Typography variant="body2" fontWeight="bold">18天</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={65} 
                      sx={{ height: 8, borderRadius: 4 }} 
                      color="primary"
                    />
                  </Box>
                  
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">客单价</Typography>
                      <Typography variant="body2" fontWeight="bold">¥12,500</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={78} 
                      sx={{ height: 8, borderRadius: 4 }} 
                      color="info"
                    />
                  </Box>
                  
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">复购率</Typography>
                      <Typography variant="body2" fontWeight="bold">35%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={35} 
                      sx={{ height: 8, borderRadius: 4 }} 
                      color="warning"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default Dashboard;

// 删除这些额外的组件定义，它们不应该在这个文件中
// 这些组件应该在Dashboard组件内部定义或移动到单独的文件中