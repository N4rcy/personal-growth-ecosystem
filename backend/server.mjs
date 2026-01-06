import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100; // 100 requests per window

// In-memory rate limiting (for production, use Redis or a dedicated service)
const requestCounts = new Map();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] // Set this in production
    : ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple rate limiting middleware
app.use((req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  
  // Clean old entries
  for (const [key, timestamp] of requestCounts.entries()) {
    if (timestamp < windowStart) {
      requestCounts.delete(key);
    }
  }
  
  // Count requests from this IP
  const requestTimestamps = Array.from(requestCounts.entries())
    .filter(([key]) => key.startsWith(ip))
    .map(([, timestamp]) => timestamp)
    .filter(timestamp => timestamp > windowStart);
  
  if (requestTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: 'Too many requests',
      message: 'Please try again later'
    });
  }
  
  requestCounts.set(`${ip}-${now}`, now);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'Relationship Advice API',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Main AI endpoint
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { messages } = req.body;
    const apiKey = process.env.DEEPSEEK_API_KEY;
    
    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ 
        error: 'Bad request',
        message: 'Messages array is required'
      });
    }
    
    if (!apiKey || apiKey.includes('YOUR_ACTUAL')) {
      console.error('❌ API key not properly configured');
      return res.status(500).json({ 
        error: 'Server configuration error',
        message: 'API service is not properly configured'
      });
    }

    console.log(`🤖 Processing request from ${req.ip}...`);
    
    // Forward to Taobao API
    const response = await fetch('https://tb.api.mkeai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7
      }),
      timeout: 30000 // 30 second timeout
    });

    // Handle API errors
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API error ${response.status}:`, errorText.substring(0, 200));
      
      // Provide user-friendly error messages
      if (response.status === 401) {
        return res.status(500).json({ 
          error: 'Authentication error',
          message: 'API service configuration issue'
        });
      } else if (response.status === 429) {
        return res.status(429).json({
          error: 'Rate limited',
          message: 'AI service is busy. Please try again in a moment.'
        });
      }
      
      return res.status(502).json({ 
        error: 'AI service temporarily unavailable',
        message: 'Please try again in a moment'
      });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Empty response from AI service');
    }
    
    const processingTime = Date.now() - startTime;
    console.log(`✅ Response generated in ${processingTime}ms`);
    
    // Log successful request (without sensitive data)
    console.log(`📊 Request processed: ${req.ip}, ${processingTime}ms`);
    
    // Return clean response
    res.json({
      success: true,
      content: content,
      processingTime: processingTime
    });

  } catch (error) {
    const processingTime = Date.now() - startTime;
    console.error(`❌ Server error in ${processingTime}ms:`, error.message);
    
    // Handle specific error types
    if (error.name === 'TimeoutError' || error.code === 'ECONNABORTED') {
      return res.status(504).json({ 
        error: 'Request timeout',
        message: 'The AI service is taking too long to respond'
      });
    }
    
    if (error.name === 'FetchError') {
      return res.status(503).json({ 
        error: 'Service unavailable',
        message: 'Cannot connect to AI service'
      });
    }
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Unable to process your request at this time'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📌 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📌 Health check: http://localhost:${PORT}/health`);
  console.log(`🔐 API key configured: ${process.env.DEEPSEEK_API_KEY ? 'Yes' : 'NO!'}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('⚡ Production mode: Rate limiting enabled');
  }
});
