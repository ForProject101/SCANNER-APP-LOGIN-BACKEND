const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Test endpoint
app.get('/', (req, res) => {
  res.send('Technician API is running');
});

// Simple auth routes for testing
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // For testing, accept any login
    res.json({ 
      message: 'Login successful', 
      token: 'test-token-123',
      technician: {
        _id: 'test-id-123',
        name: 'Test',
        surname: 'User',
        department: 'Test Department',
        task: 'Test Task'
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Simple sessions routes for testing
app.post('/api/sessions/start', async (req, res) => {
  try {
    const { technicianId } = req.body;
    res.json({ 
      success: true, 
      sessionId: 'test-session-123',
      message: 'Session started successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to start session' });
  }
});

app.post('/api/sessions/scan', async (req, res) => {
  try {
    const { technicianId, barcode, status } = req.body;
    res.json({ 
      success: true, 
      message: 'Screen scanned successfully',
      sessionId: 'test-session-123'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to scan screen' });
  }
});

app.post('/api/sessions/stop', async (req, res) => {
  try {
    const { technicianId } = req.body;
    res.json({
      success: true,
      message: 'Session ended successfully',
      totalScreens: 5,
      duration: 300,
      reparable: 3,
      beyondRepair: 2,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to stop session' });
  }
});

app.get('/api/sessions/all-stats', async (req, res) => {
  try {
    res.json({
      success: true,
      globalStats: {
        totalTechnicians: 3,
        totalSessions: 10,
        totalScreens: 150,
        totalReparable: 100,
        totalBeyondRepair: 50,
        totalDuration: 3600,
        activeSessions: 2
      },
      technicianStats: [
        {
          technicianId: 'tech1',
          name: 'John',
          surname: 'Doe',
          department: 'Screen Repair',
          task: 'Quality Control',
          stats: {
            totalSessions: 5,
            totalScreens: 75,
            reparable: 50,
            beyondRepair: 25,
            totalDuration: 1800,
            activeSessions: 1,
            averageScreensPerSession: 15
          }
        },
        {
          technicianId: 'tech2',
          name: 'Jane',
          surname: 'Smith',
          department: 'Screen Repair',
          task: 'Assessment',
          stats: {
            totalSessions: 3,
            totalScreens: 45,
            reparable: 30,
            beyondRepair: 15,
            totalDuration: 1200,
            activeSessions: 1,
            averageScreensPerSession: 15
          }
        },
        {
          technicianId: 'tech3',
          name: 'Mike',
          surname: 'Johnson',
          department: 'Screen Repair',
          task: 'Repair',
          stats: {
            totalSessions: 2,
            totalScreens: 30,
            reparable: 20,
            beyondRepair: 10,
            totalDuration: 600,
            activeSessions: 0,
            averageScreensPerSession: 15
          }
        }
      ],
      lastUpdated: new Date()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get technicians statistics' });
  }
});

// Simple operations routes for testing
app.post('/api/operations', async (req, res) => {
  try {
    const { technicianId, operationType, details } = req.body;
    res.status(201).json({ 
      success: true, 
      operation: {
        id: 'op-123',
        technicianId,
        operationType,
        details,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to log operation' });
  }
});

app.get('/api/operations/:technicianId', async (req, res) => {
  try {
    const { technicianId } = req.params;
    res.json({ 
      success: true, 
      operations: [
        {
          id: 'op-1',
          technicianId,
          operationType: 'LOGIN',
          details: { loginTime: new Date() },
          timestamp: new Date()
        },
        {
          id: 'op-2',
          technicianId,
          operationType: 'SESSION_START',
          details: { startTime: new Date() },
          timestamp: new Date()
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to get operations' });
  }
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/technician-app')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Start server even if MongoDB fails for testing
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (without MongoDB)`));
  });

module.exports = app; 