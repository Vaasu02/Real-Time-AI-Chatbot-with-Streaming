import { GoogleGenAI } from '@google/genai';


export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
  }

  return new GoogleGenAI({ apiKey });
}

export async function* streamGeminiResponse(prompt: string) {
  const ai = getGeminiClient();
  
  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    for await (const chunk of response) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

