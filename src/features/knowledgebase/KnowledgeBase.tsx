import React, { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { KnowledgeItem } from './KBInterface';
import { contentAnalyzer } from '../ai/analysis';
import { speechHandler } from '../ai/speech';

const KnowledgeBase: React.FC = () => {
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // 处理文件上传
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      let content = '';
      
      if (file.type.startsWith('audio/')) {
        content = await speechHandler.transcribe(file);
      } else {
        // TODO: 实现其他类型文件的解析
        const reader = new FileReader();
        content = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsText(file);
        });
      }

      const analysis = await contentAnalyzer.analyze(content);
      
      const newItem: KnowledgeItem = {
        id: String(Date.now()),
        content,
        embeddings: analysis.embeddings,
        sourceType: file.type.startsWith('audio/') ? 'audio' : 'file',
        metadata: {
          fileName: file.name,
          fileType: file.type,
          uploadedAt: new Date(),
          processed: true
        },
        aiAnnotations: {
          summary: analysis.summary,
          keywords: analysis.keywords
        }
      };

      setKnowledgeItems(prev => [newItem, ...prev]);
    } catch (error) {
      console.error('文件处理失败:', error);
      // TODO: 添加错误提示
    } finally {
      setIsProcessing(false);
    }
  };

  // 处理语音输入
  const handleVoiceInput = () => {
    setIsRecording(true);
    // TODO: 实现语音输入功能
  };

  // 处理搜索
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    // TODO: 实现基于向量的语义搜索
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" component="h1" gutterBottom>
        知识库
      </Typography>

      {/* 搜索和上传区域 */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="搜索知识库..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Box>
                    <IconButton onClick={handleVoiceInput} disabled={isRecording}>
                      <MicIcon color={isRecording ? 'primary' : 'inherit'} />
                    </IconButton>
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </Box>
                )
              }}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              disabled={isProcessing}
            >
              {isProcessing ? '处理中...' : '上传文件'}
              <input
                type="file"
                hidden
                accept="audio/*,.pdf,.docx,.txt"
                onChange={handleFileUpload}
              />
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* 知识条目列表 */}
      <Grid container spacing={2}>
        {knowledgeItems.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {item.metadata.fileName}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.aiAnnotations?.summary}
                </Typography>
                <Box sx={{ mb: 1 }}>
                  {item.aiAnnotations?.keywords?.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  上传时间: {item.metadata.uploadedAt.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 加载指示器 */}
      {isProcessing && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default KnowledgeBase;