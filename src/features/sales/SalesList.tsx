import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Grid,
  Avatar
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchOffIcon from '@mui/icons-material/SearchOff';

interface SalesOpportunity {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  stage: string;
  probability: number;
  expectedClosingDate: string;
}

const mockSalesData: SalesOpportunity[] = [
  {
    id: '1',
    customerName: '科技有限公司',
    productName: '企业管理系统',
    amount: 100000,
    stage: '需求确认',
    probability: 60,
    expectedClosingDate: '2024-06-30'
  },
  {
    id: '2',
    customerName: '贸易有限公司',
    productName: '仓储管理系统',
    amount: 80000,
    stage: '商务谈判',
    probability: 40,
    expectedClosingDate: '2024-07-15'
  }
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case '已成交':
      return 'success';
    case '商务谈判':
      return 'warning';
    case '需求确认':
      return 'primary';
    case '已失败':
      return 'error';
    default:
      return 'default';
  }
};

const SalesList: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('全部');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleViewOpportunity = (opportunityId: string) => {
    navigate(`/sales/${opportunityId}`);
  };

  const handleEditOpportunity = (opportunityId: string) => {
    navigate(`/sales/${opportunityId}/edit`);
  };

  const handleCreateOpportunity = () => {
    navigate('/sales/create');
  };

  // 处理筛选菜单
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleStageFilterChange = (stage: string) => {
    setStageFilter(stage);
    handleFilterClose();
  };

  // 筛选销售机会数据
  const filteredSales = mockSalesData.filter(opportunity => {
    const matchesSearch = opportunity.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === '全部' || opportunity.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
          销售机会
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateOpportunity}
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1,
            fontSize: '0.9rem',
            boxShadow: theme.shadows[2],
            '&:hover': {
              boxShadow: theme.shadows[4],
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.2s'
          }}
        >
          新增机会
        </Button>
      </Box>

      {/* 搜索和筛选工具栏 */}
      <Card sx={{ mb: 3, boxShadow: theme.shadows[1], borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="搜索客户名称或产品名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                    '&:hover': {
                      backgroundColor: theme.palette.background.paper,
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleFilterClick}
                startIcon={<FilterListIcon />}
                sx={{ mr: 1, borderRadius: 2 }}
              >
                {stageFilter === '全部' ? '筛选阶段' : `阶段: ${stageFilter}`}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
                PaperProps={{
                  elevation: 3,
                  sx: { borderRadius: 2, minWidth: 180 }
                }}
              >
                <MenuItem
                  onClick={() => handleStageFilterChange('全部')}
                  selected={stageFilter === '全部'}
                >
                  全部
                </MenuItem>
                <MenuItem
                  onClick={() => handleStageFilterChange('需求确认')}
                  selected={stageFilter === '需求确认'}
                >
                  <Chip
                    size="small"
                    label="需求确认"
                    color="primary"
                    sx={{ mr: 1, height: 20 }}
                  />
                  需求确认
                </MenuItem>
                <MenuItem
                  onClick={() => handleStageFilterChange('商务谈判')}
                  selected={stageFilter === '商务谈判'}
                >
                  <Chip
                    size="small"
                    label="商务谈判"
                    color="warning"
                    sx={{ mr: 1, height: 20 }}
                  />
                  商务谈判
                </MenuItem>
                <MenuItem
                  onClick={() => handleStageFilterChange('已成交')}
                  selected={stageFilter === '已成交'}
                >
                  <Chip
                    size="small"
                    label="已成交"
                    color="success"
                    sx={{ mr: 1, height: 20 }}
                  />
                  已成交
                </MenuItem>
                <MenuItem
                  onClick={() => handleStageFilterChange('已失败')}
                  selected={stageFilter === '已失败'}
                >
                  <Chip
                    size="small"
                    label="已失败"
                    color="error"
                    sx={{ mr: 1, height: 20 }}
                  />
                  已失败
                </MenuItem>
              </Menu>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setSearchTerm('');
                  setStageFilter('全部');
                }}
                sx={{ borderRadius: 2 }}
              >
                重置
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: theme.shadows[1] }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>客户名称</TableCell>
                <TableCell>产品名称</TableCell>
                <TableCell>金额</TableCell>
                <TableCell>阶段</TableCell>
                <TableCell>成功概率</TableCell>
                <TableCell>预计成交日期</TableCell>
                <TableCell align="center" width="120">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.length > 0 ? (
                filteredSales.map((opportunity) => (
                  <TableRow
                    key={opportunity.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => handleViewOpportunity(opportunity.id)}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            mr: 2,
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            fontWeight: 'bold'
                          }}
                        >
                          {opportunity.customerName.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {opportunity.customerName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{opportunity.productName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium" color="primary.main">
                        ¥{opportunity.amount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={opportunity.stage}
                        color={getStageColor(opportunity.stage) as 'error' | 'warning' | 'success' | 'primary' | 'default'}
                        size="small"
                        sx={{
                          fontWeight: 500,
                          borderRadius: '6px',
                          px: 1,
                          minWidth: 72
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>
                          {opportunity.probability}%
                        </Typography>
                        <Box
                          sx={{
                            width: 60,
                            height: 4,
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            borderRadius: 2,
                            overflow: 'hidden'
                          }}
                        >
                          <Box
                            sx={{
                              width: `${opportunity.probability}%`,
                              height: '100%',
                              backgroundColor: 'primary.main',
                              transition: 'width 0.3s ease-in-out'
                            }}
                          />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{opportunity.expectedClosingDate}</Typography>
                    </TableCell>
                    <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                      <Tooltip title="查看详情" arrow>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewOpportunity(opportunity.id);
                          }}
                          sx={{
                            mr: 1,
                            '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="编辑" arrow>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditOpportunity(opportunity.id);
                          }}
                          sx={{
                            '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <SearchOffIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        未找到匹配的销售机会
                      </Typography>
                      <Typography variant="body2" color="text.disabled">
                        尝试调整搜索条件或清除筛选器
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default SalesList;