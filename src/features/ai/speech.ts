import { OpenAI } from 'openai';

// 将音频文件转换为WebM格式
async function convertToWebm(file: File): Promise<File> {
  // TODO: 实现音频格式转换
  return file;
}

export const speechHandler = {
  async transcribe(file: File) {
    const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_KEY });
    try {
      const transcription = await openai.audio.transcriptions.create({
        file: await convertToWebm(file),
        model: "whisper-1",
      });
      return transcription.text;
    } catch (error) {
      console.error('语音转写失败:', error);
      throw new Error('语音转写失败');
    }
  }
};