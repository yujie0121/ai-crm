// 知识库核心接口定义
export interface KnowledgeItem {
  id: string;
  content: string;
  embeddings: number[];
  sourceType: 'audio' | 'file' | 'text';
  metadata: {
    fileName?: string;
    duration?: number; // 音频时长
    fileType?: string; // pdf/docx/txt等
    uploadedAt: Date;
    processed: boolean;
  };
  aiAnnotations?: {
    summary?: string;
    keywords?: string[];
    sentiment?: number; // 情感分析结果
    entities?: string[]; // 命名实体识别
  };
}