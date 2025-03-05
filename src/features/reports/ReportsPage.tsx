import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import type { Report, ReportType, ReportData, SalesMetrics, CustomerMetrics, PerformanceMetrics } from './models/reportTypes';
import ReportChart from './components/ReportChart';

const ReportsPage: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [reportType, setReportType] = useState<ReportType>('sales');
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<Report | null>(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) return;

    setIsGenerating(true);
    try {
      // 模拟报告生成
      await new Promise(resolve => setTimeout(resolve, 2000));

      const reportId = `report-${Date.now()}`;
      const reportTitle = `${getReportTypeText(reportType)} - ${startDate.toLocaleDateString()} 至 ${endDate.toLocaleDateString()}`;
      
      // 模拟获取数据
      const salesData: SalesMetrics = {
        totalRevenue: 1500000,
        salesCount: 120,
        averageOrderValue: 12500,
        topProducts: [
          { name: '企业管理系统', revenue: 500000, quantity: 5 },
          { name: '数据分析平台', revenue: 300000, quantity: 3 },
          { name: 'CRM系统', revenue: 200000, quantity: 2 }
        ],
        salesTrend: [
          { date: '2024-01', revenue: 200000, orders: 15 },
          { date: '2024-02', revenue: 250000, orders: 20 },
          { date: '2024-03', revenue: 300000, orders: 25 }
        ]
      };

      const customerData: CustomerMetrics = {
        totalCustomers: 500,
        newCustomers: 50,
        activeCustomers: 300,
        customerSegments: [
          { segment: '大企业', count: 100, value: 800000 },
          { segment: '中型企业', count: 200, value: 500000 },
          { segment: '小型企业', count: 200, value: 200000 }
        ],
        customerRetention: [
          { period: '1月', rate: 0.95 },
          { period: '3月', rate: 0.85 },
          { period: '6月', rate: 0.75 }
        ]
      };

      const performanceData: PerformanceMetrics = {
        salesTarget: 2000000,
        actualSales: 1500000,
        achievementRate: 0.75,
        teamPerformance: [
          { member: '张三', sales: 500000, target: 600000, conversion: 0.8 },
          { member: '李四', sales: 400000, target: 500000, conversion: 0.75 },
          { member: '王五', sales: 600000, target: 600000, conversion: 0.85 }
        ],
        kpis: [
          { metric: '销售额', value: 1500000, target: 2000000, trend: 'up' },
          { metric: '客户满意度', value: 4.5, target: 4.8, trend: 'stable' },
          { metric: '转化率', value: 0.25, target: 0.3, trend: 'up' }
        ]
      };

      let reportData;
      switch (reportType) {
        case 'sales':
          reportData = salesData;
          break;
        case 'customer':
          reportData = customerData;
          break;
        case 'performance':
          reportData = performanceData;
          break;
        default:
          reportData = {};
      }

      const mockReport: ReportGenerationResult = {
        title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)}报告`,
        summary: `报告期间：${startDate?.toLocaleDateString()} 至 ${endDate?.toLocaleDateString()}\n主要指标和趋势分析显示业务整体呈现稳健增长态势。`,
        sections: [
          {
            title: '数据概览',
            content: reportType === 'sales' ? 
              `本期总销售额：¥${salesData.totalRevenue.toLocaleString()}\n订单数量：${salesData.salesCount}\n平均订单金额：¥${salesData.averageOrderValue.toLocaleString()}` :
              reportType === 'customer' ?
              `总客户数：${customerData.totalCustomers}\n新增客户：${customerData.newCustomers}\n活跃客户：${customerData.activeCustomers}` :
              `销售目标完成率：${(performanceData.achievementRate * 100).toFixed(1)}%\n实际销售额：¥${performanceData.actualSales.toLocaleString()}`,
            charts: [
              {
                type: 'line',
                data: reportType === 'sales' ? 
                  salesData.salesTrend.map(item => ({
                    name: item.date,
                    收入: item.revenue,
                    订单: item.orders
                  })) :
                  reportType === 'customer' ?
                  customerData.customerRetention.map(item => ({
                    name: item.period,
                    留存率: item.rate * 100
                  })) :
                  performanceData.teamPerformance.map(item => ({
                    name: item.member,
                    销售额: item.sales,
                    目标: item.target
                  })),
                options: {
                  title: reportType === 'sales' ? '销售趋势' :
                         reportType === 'customer' ? '客户留存率' : '团队业绩',
                  xAxisLabel: '时间',
                  yAxisLabel: reportType === 'sales' ? '金额' :
                             reportType === 'customer' ? '百分比' : '金额'
                }
              },
              {
                type: 'pie',
                data: reportType === 'sales' ?
                  salesData.topProducts.map(item => ({
                    name: item.name,
                    value: item.revenue
                  })) :
                  reportType === 'customer' ?
                  customerData.customerSegments.map(item => ({
                    name: item.segment,
                    value: item.value
                  })) :
                  performanceData.kpis.map(item => ({
                    name: item.metric,
                    value: item.value
                  })),
                options: {
                  title: reportType === 'sales' ? '产品销售分布' :
                         reportType === 'customer' ? '客户细分分布' : '关键指标分布'
                }
              }
            ]
          },
          {
            title: '详细分析',
            content: reportType === 'sales' ?
              '销售业绩分析显示，主要产品线保持良好增长势头，企业管理系统产品贡献最大收入。建议进一步加强市场营销力度，扩大市场份额。' :
              reportType === 'customer' ?
              '客户分析显示，大企业客户群体贡献了主要收入，但中小企业客户群体具有较大增长潜力。建议针对不同客户群体制定差异化服务策略。' :
              '团队绩效分析显示，整体达成率良好，个别成员存在提升空间。建议加强培训和激励机制，提高团队整体表现。'
          }
        ],
        recommendations: reportType === 'sales' ? [
          '加大重点产品营销投入，提升市场占有率',
          '优化销售流程，提高成单效率',
          '开发新的产品线，扩大收入来源'
        ] : reportType === 'customer' ? [
          '制定针对性的客户服务方案',
          '加强客户关系管理，提高客户满意度',
          '开发潜在客户市场，扩大客户基础'
        ] : [
          '完善绩效考核体系，提高团队积极性',
          '加强业务技能培训，提升团队能力',
          '优化资源配置，提高运营效率'
        ],
        generatedDate: new Date()
      };

      setGeneratedReport(mockReport);
      handleCloseDialog();
    } catch (error) {
      console.error('报告生成失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          报告生成
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          生成新报告
        </Button>
      </Box>

      {/* 报告生成对话框 */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>生成新报告</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>报告类型</InputLabel>
              <Select
                value={reportType}
                label="报告类型"
                onChange={(e) => setReportType(e.target.value as typeof reportType)}
              >
                <MenuItem value="sales">销售业绩报告</MenuItem>
                <MenuItem value="customer">客户分析报告</MenuItem>
                <MenuItem value="performance">团队绩效报告</MenuItem>
                <MenuItem value="satisfaction">客户满意度报告</MenuItem>
                <MenuItem value="trend">市场趋势报告</MenuItem>
                <MenuItem value="forecast">销售预测报告</MenuItem>
                <MenuItem value="custom">自定义报告</MenuItem>
              </Select>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="开始日期"
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="结束日期"
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button
            onClick={handleGenerateReport}
            variant="contained"
            disabled={isGenerating || !startDate || !endDate}
          >
            {isGenerating ? '生成中...' : '生成报告'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* 生成的报告展示 */}
      {generatedReport && (
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {generatedReport.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {generatedReport.summary}
            </Typography>

            {generatedReport.sections.map((section, index) => (
              <Box key={index} sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {section.content}
                </Typography>
                {section.charts && (
                  <Box sx={{ mt: 2, mb: 2 }}>
                    {section.charts.map((chart, chartIndex) => (
                      <ReportChart
                        key={chartIndex}
                        type={chart.type}
                        data={chart.data}
                        options={chart.options}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                AI建议
              </Typography>
              {generatedReport.recommendations.map((recommendation, index) => (
                <Typography key={index} variant="body1" paragraph>
                  {recommendation}
                </Typography>
              ))}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              生成时间: {generatedReport.generatedDate.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ReportsPage;