
import { GoogleGenAI } from "@google/genai";

// Securely access API Key from environment
const getApiKey = () => {
  try {
    return (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
  } catch (e) {
    return '';
  }
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export async function getDivineInsight(day: number) {
  try {
    if (!apiKey) {
      console.warn("Gemini API key not found. Using fallback message.");
      return "Seu anjo está cuidando de cada detalhe hoje. Confie no processo divino.";
    }
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma mensagem curta, inspiradora e espiritual de "insight divino" para uma pessoa que está no dia ${day} de uma jornada de 19 dias de oração e prosperidade com São Miguel Arcanjo. A mensagem deve ser em português, ter no máximo 2 frases e ser muito acolhedora.`,
    });
    
    return response.text || "Seu anjo está cuidando de cada detalhe hoje. Confie no processo divino.";
  } catch (error) {
    console.error("Error fetching Gemini insight:", error);
    return "Que a luz de São Miguel ilumine seu caminho hoje e sempre.";
  }
}
