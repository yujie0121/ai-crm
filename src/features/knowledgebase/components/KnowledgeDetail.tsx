import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { KnowledgeItem } from '../KBInterface';

interface KnowledgeDetailProps {
  item: KnowledgeItem | null;
  open: boolean;
  onClose: () => void;
}

export const KnowledgeDetail: React.FC<KnowledgeDetailProps> = ({ item, open, onClose }) => {
  if (!item) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" component="div">
          {item.metadata.fileName || '知识详情'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            基本信息
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body2">
              类型: {item.sourceType === 'audio' ? '音频' : item.sourceType === 'file' ? '文件' : '文本'}
            </Typography>
            {item.metadata.fileType && (
              <Typography variant="body2">
                文件格式: {item.metadata.fileType}
              </Typography>
            )}
            {item.metadata.duration && (
              <Typography variant="body2">
                时长: {Math.round(item.metadata.duration / 60)}分钟
              </Typography>
            )}
            <Typography variant="body2">
              上传时间: {formatDate(item.metadata.uploadedAt)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            内容
          </Typography>
          <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap' }}>
            {item.content}
          </Typography>
        </Box>

        {item.aiAnnotations && (
          <>
            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                AI 分析
              </Typography>
              
              {item.aiAnnotations.summary && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    摘要
                  </Typography>
                  <Typography variant="body2">
                    {item.aiAnnotations.summary}
                  </Typography>
                </Box>
              )}

              {item.aiAnnotations.keywords && item.aiAnnotations.keywords.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    关键词
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {item.aiAnnotations.keywords.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {item.aiAnnotations.sentiment !== undefined && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    情感倾向
                  </Typography>
                  <Typography variant="body2">
                    {item.aiAnnotations.sentiment > 0.6 ? '积极' :
                     item.aiAnnotations.sentiment < 0.4 ? '消极' : '中性'}
                  </Typography>
                </Box>
              )}

              {item.aiAnnotations.entities && item.aiAnnotations.entities.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    实体识别
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {item.aiAnnotations.entities.map((entity, index) => (
                      <Chip
                        key={index}
                        label={entity}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>关闭</Button>
      </DialogActions>
    </Dialog>
  );
};