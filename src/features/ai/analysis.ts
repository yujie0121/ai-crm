import { OpenAI } from 'openai';

// 生成文本摘要
async function generateSummary(text: string): Promise<string> {
  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_KEY });
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的文本分析助手，请为给定的文本生成简洁的摘要。'
        },
        {
          role: 'user',
          content: `请为以下文本生成一个简短的摘要：\n${text}`
        }
      ],
      max_tokens: 150
    });
    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('生成摘要失败:', error);
    throw new Error('生成摘要失败');
  }
}

// 提取关键词
async function extractKeywords(text: string): Promise<string[]> {
  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_KEY });
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: '你是一个专业的文本分析助手，请从给定的文本中提取关键词。'
        },
        {
          role: 'user',
          content: `请从以下文本中提取5-10个关键词，以逗号分隔：\n${text}`
        }
      ],
      max_tokens: 100
    });
    const keywords = response.choices[0]?.message?.content?.split(',') || [];
    return keywords.map(k => k.trim()).filter(k => k);
  } catch (error) {
    console.error('提取关键词失败:', error);
    throw new Error('提取关键词失败');
  }
}

// 生成文本向量嵌入
async function generateEmbeddings(text: string): Promise<number[]> {
  const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_KEY });
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('生成向量嵌入失败:', error);
    throw new Error('生成向量嵌入失败');
  }
}

// 内容分析器
export const contentAnalyzer = {
  async analyze(text: string) {
    try {
      const [summary, keywords, embeddings] = await Promise.all([
        generateSummary(text),
        extractKeywords(text),
        generateEmbeddings(text)
      ]);

      return {
        summary,
        keywords,
        embeddings,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('内容分析失败:', error);
      throw new Error('内容分析失败');
    }
  }
};