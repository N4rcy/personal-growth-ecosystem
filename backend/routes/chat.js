const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

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
- Ends with supportive encouragement`;

router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Messages array is required' 
      });
    }

    // Ensure system prompt is first
    const allMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.filter(m => m.role !== 'system')
    ];

    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: allMessages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content || '';

    res.json({
      success: true,
      content: content
        .replace(/^[💭🔍🛠️🤔⭐✨🌟🎯✅❌]+/gm, '')
        .replace(/^(?:Understanding Your Situation|Key Observations|Actionable Steps|Reflection Questions).*\n?/gmi, '')
        .replace(/^\s*[\d•\-*]\s+/gm, '')
        .trim()
    });
  } catch (error) {
    console.error('Chat route error:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while processing your request'
    });
  }
});

module.exports = router;
