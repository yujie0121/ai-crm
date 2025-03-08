import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Chip,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CommentIcon from '@mui/icons-material/Comment';
import UpdateIcon from '@mui/icons-material/Update';

interface TaskDetailProps {
  taskId?: string;
}

interface TaskComment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

interface TaskUpdate {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  updatedBy: string;
  timestamp: string;
}

interface TaskDetail {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  relatedTo?: {
    type: 'customer' | 'sales';
    id: string;
    name: string;
  };
  comments: TaskComment[];
  updates: TaskUpdate[];
}

// 模拟任务详细数据
const mockTaskData: TaskDetail = {
  id: '1',
  title: '跟进销售机会',
  description: '与科技有限公司联系，确认需求细节，准备初步方案',
  dueDate: '2024-03-10',
  priority: 'high',
  status: 'in_progress',
  assignedTo: '王销售',
  createdBy: '张经理',
  createdAt: '2024-02-28',
  relatedTo: {
    type: 'sales',
    id: '1',
    name: '科技有限公司-企业管理系统'
  },
  comments: [
    {
      id: '1',
      content: '已经和客户初步沟通，对方希望下周三进行详细需求讨论',
      author: '王销售',
      timestamp: '2024-03-01 14:30'
    },
    {
      id: '2',
      content: '请准备好演示材料和价格方案',
      author: '张经理',
      timestamp: '2024-03-01 15:00'
    }
  ],
  updates: [
    {
      id: '1',
      field: '状态',
      oldValue: '待处理',
      newValue: '进行中',
      updatedBy: '王销售',
      timestamp: '2024-03-01 09:00'
    },
    {
      id: '2',
      field: '优先级',
      oldValue: '中',
      newValue: '高',
      updatedBy: '张经理',
      timestamp: '2024-03-01 10:30'
    }
  ]
};

const getPriorityColor = (priority: TaskDetail['priority']) => {
  const colors = {
    high: 'error',
    medium: 'warning',
    low: 'success'
  };
  return colors[priority];
};

const getStatusIcon = (status: TaskDetail['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon color="success" />;
    case 'in_progress':
      return <ScheduleIcon color="primary" />;
    case 'pending':
      return <PriorityHighIcon color="action" />;
    default:
      return null;
  }
};

const getStatusText = (status: TaskDetail['status']) => {
  const statusMap = {
    completed: '已完成',
    in_progress: '进行中',
    pending: '待处理'
  };
  return statusMap[status];
};

const TaskDetail: React.FC<TaskDetailProps> = ({ taskId: _ = '1' }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    // 这里应该调用API添加评论，现在先模拟添加
    const newCommentObj: TaskComment = {
      id: String(Date.now()),
      content: newComment,
      author: '当前用户',
      timestamp: new Date().toLocaleString()
    };

    // 直接使用mockTaskData而不是task状态
    mockTaskData.comments = [newCommentObj, ...mockTaskData.comments];

    setNewComment('');
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', width: '100%', px: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h5" component="h2">
          任务详情
        </Typography>
        <Box>
          <Button variant="outlined" color="primary" sx={{ mr: 1 }}>
            编辑
          </Button>
          <Button variant="contained" color="primary">
            更新状态
          </Button>
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getStatusIcon(mockTaskData.status)}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {mockTaskData.title}
                </Typography>
              </Box>
              <Typography color="textSecondary" paragraph>
                {mockTaskData.description}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>
                优先级: <Chip 
                  label={mockTaskData.priority} 
                  color={getPriorityColor(mockTaskData.priority) as 'error' | 'warning' | 'success'}
                  size="small" 
                />
              </Typography>
              <Typography variant="body2" gutterBottom>
                状态: {getStatusText(mockTaskData.status)}
              </Typography>
              <Typography variant="body2" gutterBottom>
                截止日期: {mockTaskData.dueDate}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" gutterBottom>
                负责人: {mockTaskData.assignedTo}
              </Typography>
              <Typography variant="body2" gutterBottom>
                创建人: {mockTaskData.createdBy}
              </Typography>
              <Typography variant="body2" gutterBottom>
                创建时间: {mockTaskData.createdAt}
              </Typography>
            </Grid>
            {mockTaskData.relatedTo && (
              <Grid item xs={12}>
                <Typography variant="body2">
                  关联: <Chip 
                    label={mockTaskData.relatedTo.name}
                    variant="outlined"
                    size="small"
                  />
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                评论
              </Typography>
              <List>
                {mockTaskData.comments.map((comment) => (
                  <React.Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <CommentIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">{comment.author}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {comment.timestamp}
                            </Typography>
                          </Box>
                        }
                        secondary={comment.content}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  placeholder="添加评论..."
                  value={newComment}
                  onChange={handleCommentChange}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  发表评论
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                更新记录
              </Typography>
              <List>
                {mockTaskData.updates.map((update) => (
                  <React.Fragment key={update.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemIcon>
                        <UpdateIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle2">{update.updatedBy}</Typography>
                            <Typography variant="caption" color="textSecondary">
                              {update.timestamp}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" component="span">
                            将{update.field}从「{update.oldValue}」修改为「{update.newValue}」
                          </Typography>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskDetail;