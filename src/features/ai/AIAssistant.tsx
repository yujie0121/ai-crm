import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Collapse,
  Paper,
  Fade,
  useTheme
  // ListItemText,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  SmartToy,
  Lightbulb,
  Psychology,
  Send,
  ExpandMore,
  ExpandLess,
  Mic,
  Stop,
  AutoGraph,
  ContactSupport
} from '@mui/icons-material';
// 这些导入将在实际实现时使用
// import { contentAnalyzer } from './analysis';
// import { speechHandler } from './speech';
import { designSystem } from '../../theme/designSystem';

interface AIAssistantProps {
  context?: 'customer' | 'sales' | 'task' | 'report' | 'general';
  entityId?: string;
  onSuggestionApply?: (suggestion: any) => void;
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  type: 'action' | 'insight' | 'prediction';
  confidence: number;
  data?: any;
}

const AIAssistant: React.FC<AIAssistantProps> = ({
  context = 'general',
  // entityId,
  onSuggestionApply
}) => {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [response, setResponse] = useState<string | null>(null);
  const [expandedSuggestion, setExpandedSuggestion] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // 模拟AI建议数据
  const mockSuggestions: Record<string, Suggestion[]> = {
    customer: [
      {
        id: '1',
        title: '客户流失风险预警',
        description: '该客户最近30天内互动频率下降了60%，存在流失风险',
        type: 'insight',
        confidence: 0.85,
        data: {
          riskScore: 85,
          lastInteraction: '2024-03-01',
          normalFrequency: '每周2次',
          currentFrequency: '每月1次'
        }
      },
      {
        id: '2',
        title: '交叉销售机会',
        description: '基于该客户的购买历史，推荐提供高级服务套餐',
        type: 'action',
        confidence: 0.72,
        data: {
          recommendedProducts: ['高级分析服务', '定制化报表', '优先技术支持'],
          potentialRevenue: '¥50,000',
          successRate: '72%'
        }
      }
    ],
    sales: [
      {
        id: '1',
        title: '销售周期优化',
        description: '当前销售周期比平均水平长25%，建议加强需求确认阶段的沟通',
        type: 'insight',
        confidence: 0.78,
        data: {
          currentCycleDays: 45,
          averageCycleDays: 36,
          bottleneckStage: '需求确认',
          recommendedActions: ['增加客户沟通频率', '提供更详细的需求文档模板']
        }
      },
      {
        id: '2',
        title: '成交概率预测',
        description: '基于历史数据分析，该销售机会的成交概率为65%',
        type: 'prediction',
        confidence: 0.65,
        data: {
          probabilityScore: 65,
          keyFactors: ['客户预算充足', '决策者已确认', '竞争对手报价较高'],
          suggestedFocus: '强调产品差异化优势'
        }
      }
    ],
    task: [
      {
        id: '1',
        title: '任务优先级调整',
        description: '建议提高此任务的优先级，因为它与一个重要客户相关',
        type: 'action',
        confidence: 0.88,
        data: {
          currentPriority: '中',
          suggestedPriority: '高',
          reason: '关联客户年采购额超过100万',
          impact: '可能影响续约决策'
        }
      }
    ],
    report: [
      {
        id: '1',
        title: '异常数据点检测',
        description: '检测到销售数据中存在3个异常值，可能影响分析准确性',
        type: 'insight',
        confidence: 0.92,
        data: {
          anomalyPoints: [{ date: '2024-02-15', value: '¥120,000', expected: '¥45,000' }],
          possibleReasons: ['季节性波动', '大客户一次性采购', '数据录入错误'],
          recommendedAction: '验证数据准确性'
        }
      }
    ],
    general: [
      {
        id: '1',
        title: '工作效率提升',
        description: '基于您的使用模式，建议设置自动化规则处理重复任务',
        type: 'action',
        confidence: 0.75,
        data: {
          repetitiveTasks: ['客户跟进邮件', '周报生成', '数据导入'],
          estimatedTimeSaving: '每周约3小时',
          setupComplexity: '低'
        }
      }
    ]
  };

  // 处理查询提交
  const handleSubmit = async () => {
    if (!query.trim() || isProcessing) return;
    
    setIsProcessing(true);
    setResponse(null);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 根据上下文生成响应
      const contextResponses: Record<string, string> = {
        customer: `根据分析，该客户近期互动频率有所下降，可能存在流失风险。建议安排一次沟通，了解客户需求变化。同时，客户所在行业最近有政策调整，可能带来新的业务机会。`,
        sales: `销售机会分析显示，当前处于需求确认阶段，成交概率约为65%。建议重点关注决策者的核心关注点，并准备针对性的竞品对比资料。基于历史数据，类似特征的销售机会平均周期为36天。`,
        task: `任务优先级分析建议将此任务调整为高优先级，因为它与一个重要客户相关，且临近截止日期。建议分配给有相关经验的团队成员处理。`,
        report: `报告分析发现数据中存在几个异常值，可能影响分析准确性。建议在解读结果时考虑这些因素。整体趋势显示销售额环比增长12%，主要来自新客户贡献。`,
        general: `基于您的使用模式分析，建议设置自动化规则处理重复性任务，预计可节省每周约3小时工作时间。系统检测到您经常访问销售预测相关功能，建议将其添加到快捷访问区域。`
      };
      
      setResponse(contextResponses[context] || contextResponses.general);
      
      // 加载相关建议
      setSuggestions(mockSuggestions[context] || mockSuggestions.general);
    } catch (error) {
      console.error('处理查询失败:', error);
      setResponse('抱歉，处理您的请求时遇到了问题。请稍后再试。');
    } finally {
      setIsProcessing(false);
    }
  };

  // 处理语音输入
  const handleVoiceInput = async () => {
    if (isRecording) {
      setIsRecording(false);
      // 这里应该停止录音并处理结果
      return;
    }
    
    setIsRecording(true);
    try {
      // 模拟语音识别
      await new Promise(resolve => setTimeout(resolve, 3000));
      setQuery('如何提高这个客户的满意度？');
      setIsRecording(false);
    } catch (error) {
      console.error('语音输入失败:', error);
      setIsRecording(false);
    }
  };

  // 处理建议展开/折叠
  const handleExpandSuggestion = (id: string) => {
    setExpandedSuggestion(expandedSuggestion === id ? null : id);
  };

  // 处理应用建议
  const handleApplySuggestion = (suggestion: Suggestion) => {
    if (onSuggestionApply) {
      onSuggestionApply(suggestion);
    }
  };

  // 获取建议类型图标
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'action':
        return <Lightbulb sx={{ color: theme.palette.warning.main }} />;
      case 'insight':
        return <Psychology sx={{ color: theme.palette.info.main }} />;
      case 'prediction':
        return <AutoGraph sx={{ color: theme.palette.secondary.main }} />;
      default:
        return <ContactSupport />;
    }
  };

  return (
    <Card sx={{
      borderRadius: designSystem.borderRadius.xl,
      boxShadow: designSystem.shadows.md,
      overflow: 'hidden',
      transition: designSystem.transitions.normal,
      '&:hover': {
        boxShadow: designSystem.shadows.lg
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <SmartToy sx={{ color: theme.palette.primary.main, mr: 1 }} />
          <Typography variant="h6" component="h2">
            AI助手
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="询问AI助手..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: designSystem.borderRadius.md,
                  transition: designSystem.transitions.fast,
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.light
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.1)}`
                  }
                }
              }}
              disabled={isProcessing}
            />
            <IconButton 
              onClick={handleVoiceInput}
              color={isRecording ? 'error' : 'default'}
              sx={{ ml: 1 }}
              disabled={isProcessing}
            >
              {isRecording ? <Stop /> : <Mic />}
            </IconButton>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!query.trim() || isProcessing}
              sx={{ 
                ml: 1,
                borderRadius: designSystem.borderRadius.md,
                minWidth: 'auto',
                px: 2
              }}
            >
              {isProcessing ? <CircularProgress size={24} color="inherit" /> : <Send />}
            </Button>
          </Box>
          
          {response && (
            <Fade in={!!response}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 2, 
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: designSystem.borderRadius.lg,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  mt: 2
                }}
              >
                <Typography variant="body2">{response}</Typography>
              </Paper>
            </Fade>
          )}
        </Box>
        
        {suggestions.length > 0 && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                智能建议
              </Typography>
              <Button 
                size="small" 
                onClick={() => setShowSuggestions(!showSuggestions)}
                endIcon={showSuggestions ? <ExpandLess /> : <ExpandMore />}
              >
                {showSuggestions ? 
                  '隐藏建议' : '显示建议'}
              </Button>
            </Box>
            
            <Collapse in={showSuggestions}>
              <List sx={{ mt: 1 }}>
                {suggestions.map((suggestion) => (
                  <ListItem 
                    key={suggestion.id} 
                    alignItems="flex-start"
                    sx={{ 
                      p: 0, 
                      mb: 1.5,
                      backgroundColor: expandedSuggestion === suggestion.id ? 
                        alpha(theme.palette.background.paper, 0.5) : 'transparent',
                      borderRadius: designSystem.borderRadius.md,
                      overflow: 'hidden',
                      transition: designSystem.transitions.fast
                    }}
                  >
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        width: '100%', 
                        p: 1.5,
                        backgroundColor: alpha(theme.palette.background.paper, 0.7),
                        borderRadius: designSystem.borderRadius.md,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                        '&:hover': {
                          backgroundColor: theme.palette.background.paper,
                          boxShadow: designSystem.shadows.sm
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {getSuggestionIcon(suggestion.type)}
                          </ListItemIcon>
                          <Typography variant="subtitle2">
                            {suggestion.title}
                          </Typography>
                        </Box>
                        <Box>
                          <Chip 
                            label={`${Math.round(suggestion.confidence * 100)}%`}
                            size="small"
                            color={suggestion.confidence > 0.8 ? 'success' : 
                                  suggestion.confidence > 0.6 ? 'primary' : 'default'}
                            variant="outlined"
                            sx={{ height: 20, fontSize: '0.7rem' }}
                          />
                          <IconButton 
                            size="small" 
                            onClick={() => handleExpandSuggestion(suggestion.id)}
                            sx={{ ml: 0.5 }}
                          >
                            {expandedSuggestion === suggestion.id ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
                          </IconButton>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4.5 }}>
                        {suggestion.description}
                      </Typography>
                      
                      <Collapse in={expandedSuggestion === suggestion.id}>
                        <Box sx={{ mt: 2, ml: 4.5 }}>
                          <Divider sx={{ mb: 2 }} />
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                              详细信息
                            </Typography>
                            <Button 
                              size="small" 
                              variant="outlined" 
                              color="primary"
                              onClick={() => handleApplySuggestion(suggestion)}
                              sx={{ 
                                borderRadius: designSystem.borderRadius.sm,
                                textTransform: 'none',
                                px: 2,
                                py: 0.5
                              }}
                            >
                              应用建议
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </Paper>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistant;