import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Tabs,
  Tab,
  Button
} from '@mui/material';

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
  notes: '重要客户，需要定期跟进'
};

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId = '1' }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', width: '100%', px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          客户详情
        </Typography>
        <Box>
          <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
            编辑
          </Button>
          <Button variant="contained" color="primary">
            联系客户
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {mockCustomerData.name}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {mockCustomerData.company}
              </Typography>
              <Typography variant="body2">
                状态: {mockCustomerData.status}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>
                邮箱: {mockCustomerData.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                电话: {mockCustomerData.phone}
              </Typography>
              <Typography variant="body2" gutterBottom>
                地址: {mockCustomerData.address}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="客户详情标签">
            <Tab label="基本信息" />
            <Tab label="联系记录" />
            <Tab label="销售机会" />
            <Tab label="相关任务" />
          </Tabs>
        </Box>
        <Box sx={{ p: 2 }}>
          {tabValue === 0 && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    行业: {mockCustomerData.industry}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    创建时间: {mockCustomerData.createdAt}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    备注:
                  </Typography>
                  <Typography variant="body2">
                    {mockCustomerData.notes}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}
          {tabValue === 1 && (
            <Typography variant="body1">
              暂无联系记录
            </Typography>
          )}
          {tabValue === 2 && (
            <Typography variant="body1">
              暂无销售机会
            </Typography>
          )}
          {tabValue === 3 && (
            <Typography variant="body1">
              暂无相关任务
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerDetail;