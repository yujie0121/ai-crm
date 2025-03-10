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
  useTheme,
  LinearProgress
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Phone,
  Email,
  LocationOn,
  Business,
  Person,
  Edit,
  Add,
  MoreVert,
  InsertChart,
  Lightbulb,
  History,
  AttachMoney
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import AIAssistant from '../ai/AIAssistant';
import { designSystem } from '../../theme/designSystem';

interface CustomerDetailProps {
  customerId?: string;
}

interface CustomerData {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  address: string;
  industry: string;
  createdAt: string;
  notes: string;
  avatar?: string;
  website?: string;
  contactHistory?: {
    id: string;
    type: string;
    date: string;
    summary: string;
    outcome: string;
  }[];
  purchaseHistory?: {
    id: string;
    product: string;
    date: string;
    amount: number;
    status: string;
  }[];
  customerScore?: number;
  lifetimeValue?: number;
  tags?: string[];
  assignedTo?: string;
}

// 模拟客户详细数据
const mockCustomerData: CustomerData = {
  id: '1',
  name: '张三',
  company: '科技有限公司',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  status: '活跃',
  address: '北京市海淀区中关村大街1号',
  industry: '信息技术',
  createdAt: '2023-01-15',
  notes: '重要客户，需要定期跟进',
  avatar: 'https://mui.com/static/images/avatar/1.jpg',
  website: 'www.example.com',
  customerScore: 85,
  lifetimeValue: 250000,
  tags: ['VIP客户', '长期合作', '高潜力'],
  assignedTo: '李销售',
  contactHistory: [
    {
      id: '1',
      type: '电话',
      date: '2024-03-15',
      summary: '讨论新产品需求',
      outcome: '积极，计划下周再次沟通'
    },
    {
      id: '2',
      type: '邮件',
      date: '2024-03-10',
      summary: '发送产品更新文档',
      outcome: '已阅读，有几个问题需要澄清'
    },
    {
      id: '3',
      type: '会议',
      date: '2024-02-28',
      summary: '季度业务回顾',
      outcome: '满意，提出了新的合作意向'
    },
    {
      id: '4',
      type: '现场拜访',
      date: '2024-02-15',
      summary: '演示新功能',
      outcome: '非常感兴趣，要求提供报价'
    }
  ],
  purchaseHistory: [
    {
      id: '1',
      product: '企业版CRM系统',
      date: '2023-12-10',
      amount: 100000,
      status: '已完成'
    },
    {
      id: '2',
      product: '数据分析服务',
      date: '2023-09-05',
      amount: 50000,
      status: '已完成'
    },
    {
      id: '3',
      product: '技术支持服务',
      date: '2023-06-20',
      amount: 30000,
      status: '已完成'
    },
    {
      id: '4',
      product: '系统升级服务',
      date: '2023-03-15',
      amount: 70000,
      status: '已完成'
    }
  ]
};

// 模拟互动数据
const interactionData = [
  { month: '1月', 电话: 4, 邮件: 6, 会议: 1 },
  { month: '2月', 电话: 3, 邮件: 4, 会议: 2 },
  { month: '3月', 电话: 5, 邮件: 8, 会议: 1 },
  { month: '4月', 电话: 2, 邮件: 5, 会议: 0 },
  { month: '5月', 电话: 4, 邮件: 7, 会议: 3 },
  { month: '6月', 电话: 6, 邮件: 9, 会议: 2 }
];

// 模拟购买数据
const purchaseData = [
  { quarter: 'Q1', 金额: 70000 },
  { quarter: 'Q2', 金额: 30000 },
  { quarter: 'Q3', 金额: 50000 },
  { quarter: 'Q4', 金额: 100000 }
];

// 模拟客户画像数据
const profileData = [
  { subject: '参与度', A: 80, fullMark: 100 },
  { subject: '满意度', A: 90, fullMark: 100 },
  { subject: '忠诚度', A: 85, fullMark: 100 },
  { subject: '增长潜力', A: 70, fullMark: 100 },
  { subject: '决策速度', A: 60, fullMark: 100 },
  { subject: '预算规模', A: 75, fullMark: 100 }
];

// 模拟产品兴趣分布
const interestData = [
  { name: 'CRM系统', value: 40 },
  { name: '数据分析', value: 25 },
  { name: '技术支持', value: 20 },
  { name: '培训服务', value: 15 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EnhancedCustomerDetail: React.FC<CustomerDetailProps> = ({ customerId: propCustomerId }) => {
  const { id: urlId } = useParams<{ id: string }>();
  const customerId = propCustomerId || urlId || '1';
  // 移除未使用的navigate变量
  const theme = useTheme();
  
  const [tabValue, setTabValue] = useState(0);
  const [customerData, setCustomerData] = useState<CustomerData>(mockCustomerData);
  const [isLoading, setIsLoading] = useState(false);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    // 这里应该使用customerId从API获取客户数据
    // 暂时使用模拟数据
    setCustomerData(mockCustomerData);
  }, [customerId]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    setIsLoading(true);
    // 模拟API调用
    setTimeout(() => {
      setCustomerData(prev => ({
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case '活跃':
        return theme.palette.success.main;
      case '潜在':
        return theme.palette.info.main;
      case '流失风险':
        return theme.palette.warning.main;
      case '非活跃':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', width: '100%', px: { xs: 2, md: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          客户详情
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={customerData.avatar} 
                  alt={customerData.name}
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: 2,
                    border: `2px solid ${theme.palette.primary.main}`,
                    boxShadow: designSystem.shadows.md
                  }}
                />
                <Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {customerData.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {customerData.company}
                  </Typography>
                  <Chip 
                    label={customerData.status} 
                    size="small"
                    sx={{ 
                      bgcolor: alpha(getStatusColor(customerData.status), 0.1),
                      color: getStatusColor(customerData.status),
                      fontWeight: 500,
                      borderRadius: designSystem.borderRadius.md
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Email fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="邮箱" 
                    secondary={customerData.email} 
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="电话" 
                    secondary={customerData.phone}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="地址" 
                    secondary={customerData.address}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Business fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="行业" 
                    secondary={customerData.industry}
                    primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                    secondaryTypographyProps={{ variant: 'body1' }}
                  />
                </ListItem>
              </List>
              
              <Divider sx={{ my: 2 }} />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  标签
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {customerData.tags?.map((tag, index) => (
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
                  客户价值
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    客户评分:
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={customerData.customerScore || 0} 
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
                      {customerData.customerScore}/100
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>终身价值:</span>
                  <span style={{ fontWeight: 600 }}>¥{customerData.lifetimeValue?.toLocaleString()}</span>
                </Typography>
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
                <Tab label="互动历史" icon={<History />} iconPosition="start" />
                <Tab label="购买记录" icon={<AttachMoney />} iconPosition="start" />
                <Tab label="客户画像" icon={<Person />} iconPosition="start" />
                <Tab label="智能助手" icon={<Lightbulb />} iconPosition="start" />
              </Tabs>
              
              <Box sx={{ p: 3 }}>
                {/* 概览面板 */}
                {tabValue === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        互动趋势
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
                            data={interactionData}
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
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        购买历史
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
                          <BarChart
                            data={purchaseData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke={alpha('#000', 0.1)} />
                            <XAxis dataKey="quarter" />
                            <YAxis />
                            <RechartsTooltip formatter={(value) => `¥${value.toLocaleString()}`} />
                            <Bar dataKey="金额" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} />
                          </BarChart>
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
                          {customerData.notes}
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
                
                {/* 互动历史面板 */}
                {tabValue === 1 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        互动历史
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<Add />}
                        size="small"
                        sx={{ borderRadius: designSystem.borderRadius.md }}
                      >
                        添加互动
                      </Button>
                    </Box>
                    <List>
                      {customerData.contactHistory?.map((contact) => (
                        <React.Fragment key={contact.id}>
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
                              {contact.type === '电话' && <Phone color="primary" />}
                              {contact.type === '邮件' && <Email color="primary" />}
                              {contact.type === '会议' && <Business color="primary" />}
                              {contact.type === '现场拜访' && <LocationOn color="primary" />}
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="subtitle2">{contact.type}</Typography>
                                  <Typography variant="body2" color="text.secondary">{contact.date}</Typography>
                                </Box>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography variant="body2" sx={{ mt: 1 }}>
                                    {contact.summary}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    结果: {contact.outcome}
                                  </Typography>
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
                
                {/* 购买记录面板 */}
                {tabValue === 2 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        购买记录
                      </Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<Add />}
                        size="small"
                        sx={{ borderRadius: designSystem.borderRadius.md }}
                      >
                        添加购买
                      </Button>
                    </Box>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        borderRadius: designSystem.borderRadius.lg,
                        overflow: 'hidden',
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box sx={{ overflowX: 'auto' }}>
                        <Box sx={{ minWidth: 500 }}>
                          <Box sx={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            bgcolor: alpha(theme.palette.primary.main, 0.05),
                            p: 2,
                            borderBottom: `1px solid ${theme.palette.divider}`,
                          }}>
                            <Typography variant="subtitle2">产品</Typography>
                            <Typography variant="subtitle2">日期</Typography>
                            <Typography variant="subtitle2">金额</Typography>
                            <Typography variant="subtitle2">状态</Typography>
                            <Typography variant="subtitle2">操作</Typography>
                          </Box>
                          {customerData.purchaseHistory?.map((purchase) => (
                            <Box 
                              key={purchase.id} 
                              sx={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(5, 1fr)',
                                p: 2,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.02),
                                }
                              }}
                            >
                              <Typography variant="body2">{purchase.product}</Typography>
                              <Typography variant="body2">{purchase.date}</Typography>
                              <Typography variant="body2">¥{purchase.amount.toLocaleString()}</Typography>
                              <Box>
                                <Chip 
                                  label={purchase.status} 
                                  size="small"
                                  color={purchase.status === '已完成' ? 'success' : 'default'}
                                  variant="outlined"
                                  sx={{ borderRadius: designSystem.borderRadius.md }}
                                />
                              </Box>
                              <Box>
                                <IconButton size="small">
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                )}
                
                {/* 客户画像面板 */}
                {tabValue === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        客户特征分析
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
                          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={profileData}>
                            <PolarGrid stroke={alpha('#000', 0.1)} />
                            <PolarAngleAxis dataKey="subject" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <Radar
                              name="客户画像"
                              dataKey="A"
                              stroke={theme.palette.primary.main}
                              fill={theme.palette.primary.main}
                              fillOpacity={0.3}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        产品兴趣分布
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
                          <PieChart>
                            <Pie
                              data={interestData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {interestData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <RechartsTooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
                
                {/* AI助手面板 */}
                {tabValue === 4 && (
                  <Box>
                    <AIAssistant 
                      context="customer" 
                      entityId={customerId}
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

export default EnhancedCustomerDetail;