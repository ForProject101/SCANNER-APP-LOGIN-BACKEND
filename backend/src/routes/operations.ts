// routes/operations.ts
import express from 'express';
import Operation from '../models/Operation';
import { Request, Response } from 'express';

const router = express.Router();

// Log a new operation
router.post('/', async (req: Request, res: Response) => {
  try {
    const { technicianId, operationType, details } = req.body;

    if (!technicianId || !operationType) {
      return res.status(400).json({ 
        success: false, 
        message: 'Technician ID and operation type are required' 
      });
    }

    const operation = await Operation.create({
      technicianId,
      operationType,
      details: details || {}
    });

    res.status(201).json({ success: true, operation });
  } catch (error) {
    console.error('Log operation error:', error);
    res.status(400).json({ success: false, error: 'Failed to log operation' });
  }
});

// Get all operations for a technician
router.get('/:technicianId', async (req: Request, res: Response) => {
  try {
    const { technicianId } = req.params;
    
    const operations = await Operation.find({ technicianId })
      .sort({ timestamp: -1 })
      .limit(50); // Get last 50 operations
    
    res.json({ success: true, operations });
  } catch (error) {
    console.error('Get operations error:', error);
    res.status(500).json({ success: false, error: 'Failed to get operations' });
  }
});

export default router; 