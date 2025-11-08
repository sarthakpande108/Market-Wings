// Fix: Removed unused 'Type' import.
import { GoogleGenAI } from "@google/genai";
import type { AnalysisData, NewsSource } from "../types";

interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Fix: Removed unused analysisSchema constant.

export async function analyzeStockChart(
  imagePart: GenerativePart
): Promise<{ analysis: AnalysisData | null; sources: NewsSource[] | null }> {
  // Fix: Updated prompt to request raw JSON and provide a structure example, as responseSchema is not allowed with googleSearch tool.
  const prompt = `You are an expert stock market analyst specializing in technical analysis of candlestick charts. Analyze the provided image of a stock chart.
- Identify the most prominent candlestick patterns and technical indicators.
- Based on your analysis, provide a clear 'Buy', 'Sell', or 'Hold' recommendation.
- Provide a confidence score for your recommendation from 0.0 to 1.0.
- Write a concise summary explaining your reasoning.
- Use your web search tool to find the latest news and general sentiment for the stock shown. Infer the stock ticker from the image.
- Determine if the overall news sentiment is 'Positive', 'Negative', or 'Neutral'.
- Summarize the key news points in a JSON array of strings. Each string should be a concise bullet point.
- Return your complete analysis as a raw JSON object. The JSON object must follow the structure in the example below. Your response must only be the JSON object, with no other text or markdown formatting (e.g., no \`\`\`json ... \`\`\` wrappers).

Example JSON structure:
{
  "recommendation": "Buy",
  "confidence": 0.85,
  "pattern": "Bullish Engulfing",
  "summary": "The chart shows a strong bullish engulfing pattern near a key support level, suggesting a potential upward price movement.",
  "newsSentiment": "Positive",
  "newsSummary": [
    "Recent news indicates strong quarterly earnings.",
    "Positive analyst ratings have been released for the company."
  ]
}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { text: prompt },
          imagePart,
        ]
      },
      // Fix: Removed responseMimeType and responseSchema as they are not permitted when using the googleSearch tool.
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    // Fix: Added logic to extract JSON from markdown code blocks in case the model wraps its response.
    let analysisJson = response.text.trim();
    const match = analysisJson.match(/```json\s*([\s\S]*?)\s*```/);
    if (match && match[1]) {
      analysisJson = match[1];
    }
    const analysis: AnalysisData = JSON.parse(analysisJson);

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    let sources: NewsSource[] = [];
    if (groundingMetadata?.groundingChunks) {
      sources = groundingMetadata.groundingChunks
        .filter(chunk => chunk.web && chunk.web.uri && chunk.web.title)
        .map(chunk => ({
          uri: chunk.web.uri,
          title: chunk.web.title,
        }));
    }

    return { analysis, sources };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Invalid API Key. Please check your configuration.");
    }
    throw new Error("Failed to get analysis from Gemini.");
  }
}