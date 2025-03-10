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

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  relatedCustomer: string;
  dueDate: string;
  priority: string;
  status: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: '客户需求跟进',
    description: '跟进科技有限公司的系统需求确认',
    assignedTo: '王五',
    relatedCustomer: '科技有限公司',
    dueDate: '2024-05-20',
    priority: '高',
    status: '进行中'
  },
  {
    id: '2',
    title: '合同准备',
    description: '准备贸易有限公司的合同文档',
    assignedTo: '赵六',
    relatedCustomer: '贸易有限公司',
    dueDate: '2024-05-25',
    priority: '中',
    status: '未开始'
  }
];

// 根据优先级返回对应的颜色
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case '高':
      return 'error';
    case '中':
      return 'warning';
    case '低':
      return 'success';
    default:
      return 'default';
  }
};

// 根据状态返回对应的颜色
const getStatusColor = (status: string) => {
  switch (status) {
    case '完成':
      return 'success';
    case '进行中':
      return 'primary';
    case '未开始':
      return 'default';
    case '延期':
      return 'error';
    default:
      return 'default';
  }
};

const TaskList: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('全部');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleViewTask = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleEditTask = (taskId: string) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  const handleCreateTask = () => {
    navigate('/tasks/create');
  };

  // 处理筛选菜单
  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    handleFilterClose();
  };
  
  // 筛选任务数据
  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.relatedCustomer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '全部' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'primary.dark' }}>
          任务管理
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTask}
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
          创建任务
        </Button>
      </Box>
      
      {/* 搜索和筛选工具栏 */}
      <Card sx={{ mb: 3, boxShadow: theme.shadows[1], borderRadius: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="搜索任务标题、描述或客户..."
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
                {statusFilter === '全部' ? '筛选状态' : `状态: ${statusFilter}`}
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
                  onClick={() => handleStatusFilterChange('全部')}
                  selected={statusFilter === '全部'}
                >
                  全部
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('进行中')}
                  selected={statusFilter === '进行中'}
                >
                  <Chip 
                    size="small" 
                    label="进行中" 
                    color="primary" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  进行中
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('未开始')}
                  selected={statusFilter === '未开始'}
                >
                  <Chip 
                    size="small" 
                    label="未开始" 
                    color="default" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  未开始
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('完成')}
                  selected={statusFilter === '完成'}
                >
                  <Chip 
                    size="small" 
                    label="完成" 
                    color="success" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  完成
                </MenuItem>
                <MenuItem 
                  onClick={() => handleStatusFilterChange('延期')}
                  selected={statusFilter === '延期'}
                >
                  <Chip 
                    size="small" 
                    label="延期" 
                    color="error" 
                    sx={{ mr: 1, height: 20 }} 
                  />
                  延期
                </MenuItem>
              </Menu>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('全部');
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
                <TableCell>任务标题</TableCell>
                <TableCell>相关客户</TableCell>
                <TableCell>负责人</TableCell>
                <TableCell>截止日期</TableCell>
                <TableCell>优先级</TableCell>
                <TableCell>状态</TableCell>
                <TableCell align="center" width="120">操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow 
                    key={task.id}
                    sx={{
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => handleViewTask(task.id)}
                  >
                    <TableCell>
                      <Typography variant="subtitle2" fontWeight="medium">
                        {task.title}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {task.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar 
                          sx={{ 
                            width: 28, 
                            height: 28, 
                            mr: 1, 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: 'primary.main',
                            fontSize: '0.875rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {task.relatedCustomer.charAt(0)}
                        </Avatar>
                        <Typography variant="body2">{task.relatedCustomer}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{task.assignedTo}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{task.dueDate}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={task.priority} 
                        color={getPriorityColor(task.priority) as 'error' | 'warning' | 'success' | 'default'} 
                        size="small" 
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: '6px',
                          px: 1,
                          minWidth: 60 
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={task.status} 
                        color={getStatusColor(task.status) as 'success' | 'primary' | 'default' | 'error'}
                        size="small"
                        sx={{ 
                          fontWeight: 500,
                          borderRadius: '6px',
                          px: 1,
                          minWidth: 60 
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="查看详情" arrow>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewTask(task.id);
                            }}
                            sx={{
                              '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="编辑任务" arrow>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTask(task.id);
                            }}
                            sx={{
                              '&:hover': { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
                            }}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                )))
                : (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box sx={{ textAlign: 'center', py: 3 }}>
                        <SearchOffIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          未找到匹配的任务
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

export default TaskList;