import React, { useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { KnowledgeList } from '../components/KnowledgeList';
import { KnowledgeDetail } from '../components/KnowledgeDetail';
import { KnowledgeUpload } from '../components/KnowledgeUpload';
import { KnowledgeItem } from '../KBInterface';

// 示例数据
const sampleKnowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    content: '这是一个示例知识条目，展示了知识库系统的基本功能。\n\n知识库系统支持多种类型的内容，包括文本、文件和音频。每个条目都会经过AI处理，生成摘要、关键词等信息，方便用户快速了解内容要点。',
    embeddings: [],
    sourceType: 'text',
    metadata: {
      fileName: '示例知识条目',
      uploadedAt: new Date(),
      processed: true
    },
    aiAnnotations: {
      summary: '这是一个演示知识库系统基本功能的示例条目',
      keywords: ['示例', '知识库', 'AI处理'],
      sentiment: 0.8,
      entities: ['知识库系统', 'AI']
    }
  },
  {
    id: '2',
    content: '客户服务指南\n\n1. 始终保持专业和友好的态度\n2. 认真倾听客户需求\n3. 及时回应客户询问\n4. 遇到无法解决的问题及时上报',
    embeddings: [],
    sourceType: 'file',
    metadata: {
      fileName: '客户服务指南.pdf',
      fileType: 'pdf',
      uploadedAt: new Date(),
      processed: true
    },
    aiAnnotations: {
      summary: '客户服务基本准则和工作指导',
      keywords: ['客户服务', '专业态度', '需求响应'],
      sentiment: 0.6,
      entities: ['客户服务', '客户需求']
    }
  }
];

export const KnowledgeBase: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleItemClick = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const handleDetailClose = () => {
    setDetailOpen(false);
  };

  const handleUploadComplete = (files: File[]) => {
    // TODO: 实现文件上传和AI分析逻辑
    console.log('文件上传完成:', files);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          知识库
        </Typography>
        <Typography variant="body1" color="text.secondary">
          浏览和管理企业知识资源，支持多种格式文件的存储和智能分析。
        </Typography>
      </Box>

      <KnowledgeUpload onUploadComplete={handleUploadComplete} />

      <KnowledgeList
        items={sampleKnowledgeItems}
        onItemClick={handleItemClick}
      />

      <KnowledgeDetail
        item={selectedItem}
        open={detailOpen}
        onClose={handleDetailClose}
      />
    </Container>
  );
};