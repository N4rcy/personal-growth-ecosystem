import { callDeepSeekAPI } from "./deepseekApi";

export async function generateAIAnalysis(caseData) {
  // Format the case data for the AI
  const prompt = `Analyze this relationship case and provide insights:

Title: ${caseData.title}
Description: ${caseData.description}
User's Role: ${caseData.metadata?.yourRole || "Not specified"}
Other Person's Role: ${caseData.metadata?.theirRole || "Not specified"}
Emotions: ${caseData.metadata?.emotions?.join(", ") || "None"}

Please provide:
1. Root cause analysis
2. Communication advice
3. Suggested next steps
4. Empathy and understanding for both sides`;

  try {
    const response = await callDeepSeekAPI(prompt);
    return response;
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    return "Unable to generate analysis at this time. Please try again later.";
  }
}

export function formatAnalysisResponse(text) {
  // Parse the AI response into structured format
  const sections = text.split(/\d\.\s+/).filter((section) => section.trim());

  return {
    rootCause: sections[0]?.trim() || text,
    communicationAdvice: sections[1]?.trim() || "",
    nextSteps: sections[2]?.trim() || "",
    empathy: sections[3]?.trim() || "",
  };
}

// Alias for backward compatibility
export const analyzeWithAI = generateAIAnalysis;
