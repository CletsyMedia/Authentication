import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { connect2DB } from './db/connect2DB.js';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();

// Middleware to parse JSON bodies for incoming requests
app.use(express.json());
app.use(cookieParser());

// Handle CORS
app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:5173'], // Update these for production
  credentials: true
}));

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// API Routes
app.use('/api/auth', authRoutes);

// Serve static files and index.html for the frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  connect2DB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
