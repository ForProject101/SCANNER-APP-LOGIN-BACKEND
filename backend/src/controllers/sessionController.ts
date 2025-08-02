// 📄 src/controllers/sessionController.ts
import { Request, Response } from 'express';
import TaskSession from '../models/TaskSession';
import Operation from '../models/Operation';
import Technician from '../models/Technician';

export const startSession = async (req: Request, res: Response) => {
  try {
    const { technicianId, location, sessionNotes } = req.body;

    if (!technicianId) {
      return res.status(400).json({ success: false, message: 'Technician ID is required' });
    }

    const session = await TaskSession.create({ 
      technicianId, 
      screens: [], 
      startTime: new Date() 
    });

    // Log the operation
    await Operation.create({
      technicianId,
      operationType: 'SESSION_START',
      details: {
        sessionId: session._id,
        location,
        sessionNotes,
        startTime: session.startTime
      }
    });

    res.status(201).json({ 
      success: true, 
      sessionId: session._id,
      message: 'Session started successfully'
    });
  } catch (error) {
    console.error('Start session error:', error);
    res.status(500).json({ success: false, error: 'Failed to start session' });
  }
};

export const scanScreen = async (req: Request, res: Response) => {
  try {
    const { technicianId, barcode, status, notes, location } = req.body;

    if (!technicianId || !barcode || !status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Technician ID, barcode, and status are required' 
      });
    }

    // Find active session for technician
    const activeSession = await TaskSession.findOne({
      technicianId,
      endTime: { $exists: false }
    });

    if (!activeSession) {
      return res.status(400).json({ 
        success: false, 
        message: 'No active session found for this technician' 
      });
    }

    // Add screen to session
    activeSession.screens.push({
      barcode,
      status,
      timestamp: new Date(),
    });

    await activeSession.save();

    // Log the operation
    await Operation.create({
      technicianId,
      operationType: 'STATUS_UPDATE',
      details: {
        sessionId: activeSession._id,
        barcode,
        status,
        notes,
        location,
        timestamp: new Date()
      }
    });

    res.status(200).json({ 
      success: true, 
      message: 'Screen scanned successfully',
      sessionId: activeSession._id
    });
  } catch (error) {
    console.error('Scan screen error:', error);
    res.status(500).json({ success: false, error: 'Failed to scan screen' });
  }
};

export const stopSession = async (req: Request, res: Response) => {
  try {
    const { technicianId, sessionNotes } = req.body;

    if (!technicianId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Technician ID is required' 
      });
    }

    // Find active session for technician
    const session = await TaskSession.findOne({
      technicianId,
      endTime: { $exists: false }
    });

    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: 'No active session found for this technician' 
      });
    }

    session.endTime = new Date();
    await session.save();

    const reparable = session.screens.filter((s: any) => s.status === 'Reparable').length;
    const beyondRepair = session.screens.filter((s: any) => s.status === 'Beyond Repair').length;
    const duration = (session.endTime.getTime() - session.startTime.getTime()) / 1000; // seconds

    // Log the operation
    await Operation.create({
      technicianId,
      operationType: 'SESSION_END',
      details: {
        sessionId: session._id,
        sessionNotes,
        totalScreens: session.screens.length,
        reparable,
        beyondRepair,
        duration,
        endTime: session.endTime
      }
    });

    res.status(200).json({
      success: true,
      message: 'Session ended successfully',
      totalScreens: session.screens.length,
      duration,
      reparable,
      beyondRepair,
    });
  } catch (error) {
    console.error('Stop session error:', error);
    res.status(500).json({ success: false, error: 'Failed to stop session' });
  }
};

export const getSessionSummary = async (req: Request, res: Response) => {
  try {
    const { technicianId } = req.params;

    if (!technicianId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Technician ID is required' 
      });
    }

    // Get all sessions for technician
    const sessions = await TaskSession.find({ technicianId })
      .sort({ startTime: -1 })
      .limit(10);

    // Calculate summary statistics
    let totalScreens = 0;
    let totalReparable = 0;
    let totalBeyondRepair = 0;
    let totalDuration = 0;

    sessions.forEach(session => {
      totalScreens += session.screens.length;
      totalReparable += session.screens.filter((s: any) => s.status === 'Reparable').length;
      totalBeyondRepair += session.screens.filter((s: any) => s.status === 'Beyond Repair').length;
      
      if (session.endTime) {
        totalDuration += (session.endTime.getTime() - session.startTime.getTime()) / 1000;
      }
    });

    res.status(200).json({
      success: true,
      summary: {
        totalSessions: sessions.length,
        totalScreens,
        totalReparable,
        totalBeyondRepair,
        totalDuration,
        averageScreensPerSession: sessions.length > 0 ? totalScreens / sessions.length : 0
      },
      recentSessions: sessions
    });
  } catch (error) {
    console.error('Get session summary error:', error);
    res.status(500).json({ success: false, error: 'Failed to get session summary' });
  }
};

// New endpoint to get all technicians statistics
export const getAllTechniciansStats = async (req: Request, res: Response) => {
  try {
    // Get all technicians
    const technicians = await Technician.find({}, 'name surname department task');
    
    // Get all sessions
    const allSessions = await TaskSession.find({});
    
    // Get all operations for additional insights
    const allOperations = await Operation.find({});

    // Calculate global statistics
    let globalStats = {
      totalTechnicians: technicians.length,
      totalSessions: allSessions.length,
      totalScreens: 0,
      totalReparable: 0,
      totalBeyondRepair: 0,
      totalDuration: 0,
      activeSessions: 0
    };

    // Calculate per-technician statistics
    const technicianStats = technicians.map(tech => {
      const techSessions = allSessions.filter(session => 
        session.technicianId.toString() === tech._id.toString()
      );
      
      let techTotalScreens = 0;
      let techReparable = 0;
      let techBeyondRepair = 0;
      let techDuration = 0;
      let techActiveSessions = 0;

      techSessions.forEach(session => {
        techTotalScreens += session.screens.length;
        techReparable += session.screens.filter((s: any) => s.status === 'Reparable').length;
        techBeyondRepair += session.screens.filter((s: any) => s.status === 'Beyond Repair').length;
        
        if (session.endTime) {
          techDuration += (session.endTime.getTime() - session.startTime.getTime()) / 1000;
        } else {
          techActiveSessions++;
        }
      });

      // Add to global stats
      globalStats.totalScreens += techTotalScreens;
      globalStats.totalReparable += techReparable;
      globalStats.totalBeyondRepair += techBeyondRepair;
      globalStats.totalDuration += techDuration;
      globalStats.activeSessions += techActiveSessions;

      return {
        technicianId: tech._id,
        name: tech.name,
        surname: tech.surname,
        department: tech.department,
        task: tech.task,
        stats: {
          totalSessions: techSessions.length,
          totalScreens: techTotalScreens,
          reparable: techReparable,
          beyondRepair: techBeyondRepair,
          totalDuration: techDuration,
          activeSessions: techActiveSessions,
          averageScreensPerSession: techSessions.length > 0 ? techTotalScreens / techSessions.length : 0
        }
      };
    });

    res.status(200).json({
      success: true,
      globalStats,
      technicianStats,
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Get all technicians stats error:', error);
    res.status(500).json({ success: false, error: 'Failed to get technicians statistics' });
  }
};