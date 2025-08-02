// 📄 src/routes/sessions.ts
import express from 'express';
import {
  startSession,
  scanScreen,
  stopSession,
  getSessionSummary,
  getAllTechniciansStats,
} from '../controllers/sessionController';

const router = express.Router();

router.post('/start', startSession);
router.post('/scan', scanScreen);
router.post('/stop', stopSession);
router.get('/summary/:technicianId', getSessionSummary);
router.get('/all-stats', getAllTechniciansStats);

export default router;


// 📄 src/server.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Test endpoint
app.get('/', (_, res) => {
  res.send('Technician API is running');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));