import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import aiRoutes from './routes/ai.routes.js';
import headersRoutes from './routes/headers.routes.js';
import jwtRoutes from './routes/jwt.routes.js';
import regexRoutes from './routes/regex.routes.js';
import jsonRoutes from './routes/json.routes.js';
import apiTesterRoutes from './routes/api-tester.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// ===== Routes =====
app.use('/api/ai', aiRoutes);
app.use('/api/headers', headersRoutes);
app.use('/api/jwt', jwtRoutes);
app.use('/api/regex', regexRoutes);
app.use('/api/json', jsonRoutes);
app.use('/api/api-tester', apiTesterRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ===== Start Server =====
async function start() {
  // Connect to MongoDB (non-blocking — server starts even if DB is down)
  try {
    await connectDB();
  } catch (err) {
    console.warn('⚠ MongoDB not connected. Server will run without DB features.');
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 DevProse server running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   OpenAI key: ${process.env.OPENAI_API_KEY ? 'configured ✓' : 'not set (using mock) ✗'}\n`);
  });
}

start();
