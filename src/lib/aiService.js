// Single source of truth for AI service
// This ensures consistent, plain-text responses

const SYSTEM_PROMPT = `You are a compassionate relationship advisor. Your goal is to provide thoughtful, empathetic advice.

IMPORTANT FORMATTING RULES:
1. Write in PLAIN TEXT only - no markdown, no HTML
2. No emojis, bullet points, or special characters for formatting
3. No headings or section titles like "Understanding Your Situation"
4. Write in natural, flowing paragraphs
5. Do not use numbers or symbols to structure your response
6. Maximum 300 words

Your response should be a single, continuous piece of advice that:
- Acknowledges their feelings empathetically
- Offers insights into the situation
- Suggests practical steps they can take
- Ends with supportive encouragement

Example of what NOT to do:
❌ 💭 Understanding Your Situation...
❌ 🔍 Key Observations...
❌ 🛠️ Actionable Steps...
❌ 1. First step...
❌ - Bullet points...

Example of what TO do:
✅ I understand this must be difficult for you. When someone seems distant, it often means... You might try... Remember that...`;

export async function getRelationshipAdvice(userInput) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userInput }
        ]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.content) {
      // Clean up any accidental formatting that might slip through
      return cleanResponse(data.content);
    } else {
      throw new Error(data.message || 'Unable to process your request');
    }
  } catch (error) {
    console.error('AI service error:', error.message);
    throw error;
  }
}

function cleanResponse(text) {
  // Remove common formatting patterns that might slip through
  return text
    .replace(/^[💭🔍🛠️🤔⭐✨🌟🎯✅❌]+/gm, '') // Remove leading emojis
    .replace(/^(?:Understanding Your Situation|Key Observations|Actionable Steps|Reflection Questions).*\n?/gmi, '') // Remove section headers
    .replace(/^\s*[\d•\-*]\s+/gm, '') // Remove bullet points and numbered lists
    .replace(/\n{3,}/g, '\n\n') // Normalize excessive newlines
    .trim();
}

// For backward compatibility
export async function callTaobaoDeepSeekAPI(messages) {
  const userMessage = messages.find(m => m.role === 'user');
  return getRelationshipAdvice(userMessage?.content || '');
}
