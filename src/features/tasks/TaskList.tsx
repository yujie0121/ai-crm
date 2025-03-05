import React from 'react';
import {
  Box,
  Paper,
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
  Tooltip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

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

  const handleViewTask = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleEditTask = (taskId: string) => {
    navigate(`/tasks/${taskId}/edit`);
  };

  const handleCreateTask = () => {
    navigate('/tasks/create');
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          任务管理
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTask}
          startIcon={<AddIcon />}
        >
          创建任务
        </Button>
      </Box>

      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 4,
          width: '100%',
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
          background: 'linear-gradient(to right bottom, #ffffff, #fafafa)',
          backdropFilter: 'blur(10px)',
          '& .MuiTable-root': {
            borderCollapse: 'separate',
            borderSpacing: '0 8px',
            width: '100%',
            overflowX: 'auto'
          },
          '& .MuiTableCell-root': {
            padding: '12px 20px',
            transition: 'all 0.2s ease-in-out'
          },
          '& .MuiTableHead-root .MuiTableCell-root': {
            fontWeight: 600,
            color: '#1a1f2c',
            borderBottom: '2px solid rgba(33, 150, 243, 0.1)'
          }
        }}>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>任务标题</TableCell>
              <TableCell>相关客户</TableCell>
              <TableCell>负责人</TableCell>
              <TableCell>截止日期</TableCell>
              <TableCell>优先级</TableCell>
              <TableCell>状态</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockTasks.map((task) => (
              <TableRow key={task.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {task.title}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {task.description}
                  </Typography>
                </TableCell>
                <TableCell>{task.relatedCustomer}</TableCell>
                <TableCell>{task.assignedTo}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Chip 
                    label={task.priority} 
                    color={getPriorityColor(task.priority) as 'error' | 'warning' | 'success' | 'default'} 
                    size="small" 
                    sx={{ minWidth: 60 }}
                  />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={task.status} 
                    color={getStatusColor(task.status) as 'success' | 'primary' | 'default' | 'error'} 
                    size="small" 
                    sx={{ minWidth: 70 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="查看详情">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewTask(task.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="编辑任务">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditTask(task.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TaskList;