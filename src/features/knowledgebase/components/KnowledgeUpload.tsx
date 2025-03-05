import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, Close as CloseIcon } from '@mui/icons-material';

interface KnowledgeUploadProps {
  onUploadComplete: (files: File[]) => void;
}

export const KnowledgeUpload: React.FC<KnowledgeUploadProps> = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(prev => [...prev, ...files]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    try {
      // 这里将来需要实现实际的文件上传逻辑
      await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟上传延迟
      onUploadComplete(selectedFiles);
      setSelectedFiles([]);
    } catch (error) {
      console.error('上传失败:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.txt,.mp3,.wav"
          style={{ display: 'none' }}
          id="knowledge-file-input"
          onChange={handleFileSelect}
        />
        <label htmlFor="knowledge-file-input">
          <Button
            variant="outlined"
            component="span"
            startIcon={<CloudUploadIcon />}
            disabled={uploading}
          >
            选择文件
          </Button>
        </label>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          支持 PDF、Word、文本文档和音频文件
        </Typography>
      </Box>

      {selectedFiles.length > 0 && (
        <Box>
          <List>
            {selectedFiles.map((file, index) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemText
                  primary={file.name}
                  secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveFile(index)}
                    disabled={uploading}
                  >
                    <CloseIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={uploading}
              startIcon={uploading ? <CircularProgress size={20} /> : undefined}
            >
              {uploading ? '上传中...' : '开始上传'}
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};