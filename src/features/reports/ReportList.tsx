import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';

interface Report {
  id: string;
  title: string;
  type: 'sales' | 'customer' | 'performance';
  description: string;
  createdAt: string;
  status: 'ready' | 'generating' | 'failed';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: '月度销售报告',
    type: 'sales',
    description: '包含销售业绩、趋势分析和预测',
    createdAt: '2024-03-01',
    status: 'ready'
  },
  {
    id: '2',
    title: '客户分析报告',
    type: 'customer',
    description: '客户画像、满意度和流失风险分析',
    createdAt: '2024-03-05',
    status: 'ready'
  },
  {
    id: '3',
    title: '销售团队绩效报告',
    type: 'performance',
    description: '团队和个人业绩评估',
    createdAt: '2024-03-10',
    status: 'ready'
  }
];

const getReportTypeIcon = (type: Report['type']) => {
  switch (type) {
    case 'sales':
      return <TrendingUpIcon />;
    case 'customer':
      return <GroupIcon />;
    case 'performance':
      return <WorkIcon />;
    default:
      return <DescriptionIcon />;
  }
};

const getReportTypeText = (type: Report['type']) => {
  const typeMap = {
    sales: '销售报告',
    customer: '客户报告',
    performance: '绩效报告'
  };
  return typeMap[type];
};

const getStatusColor = (status: Report['status']) => {
  const colorMap = {
    ready: 'success',
    generating: 'warning',
    failed: 'error'
  };
  return colorMap[status];
};

const getStatusText = (status: Report['status']) => {
  const statusMap = {
    ready: '已生成',
    generating: '生成中',
    failed: '生成失败'
  };
  return statusMap[status];
};

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'sales',
    description: ''
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      title: '',
      type: 'sales',
      description: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      type: e.target.value
    }));
  };

  const handleSubmit = () => {
    const newReport: Report = {
      id: String(Date.now()),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'generating'
    };

    setReports(prev => [newReport, ...prev]);
    handleCloseDialog();

    // 模拟报告生成过程
    setTimeout(() => {
      setReports(prev =>
        prev.map(report =>
          report.id === newReport.id
            ? { ...report, status: 'ready' }
            : report
        )
      );
    }, 3000);
  };

  const handleViewReport = (reportId: string) => {
    // 导航到报告详情页面
    console.log('查看报告:', reportId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          报告中心
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          startIcon={<AddIcon />}
        >
          生成报告
        </Button>
      </Box>

      <Grid container spacing={3}>
        {reports.map(report => (
          <Grid item xs={12} md={4} key={report.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      color: 'primary.main'
                    }}
                  >
                    {getReportTypeIcon(report.type)}
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {report.title}
                    </Typography>
                    <Chip
                      label={getReportTypeText(report.type)}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {report.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    生成时间: {report.createdAt}
                  </Typography>
                  <Chip
                    label={getStatusText(report.status)}
                    color={getStatusColor(report.status) as 'success' | 'warning' | 'error'}
                    size="small"
                  />
                </Box>
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleViewReport(report.id)}
                  disabled={report.status !== 'ready'}
                >
                  查看报告
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>生成新报告</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="报告标题"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>报告类型</InputLabel>
              <Select
                value={formData.type}
                label="报告类型"
                onChange={handleTypeChange}
              >
                <MenuItem value="sales">销售报告</MenuItem>
                <MenuItem value="customer">客户报告</MenuItem>
                <MenuItem value="performance">绩效报告</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="报告描述"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>取消</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title}
          >
            生成
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReportList;