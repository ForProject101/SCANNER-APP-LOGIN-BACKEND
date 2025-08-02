import mongoose, { Schema, Document } from 'mongoose';

export interface IOperation extends Document {
  technicianId: mongoose.Types.ObjectId;
  operationType: string;
  details: any;
  timestamp: Date;
}

const OperationSchema: Schema = new Schema({
  technicianId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Technician', 
    required: true 
  },
  operationType: { 
    type: String, 
    required: true,
    enum: ['SESSION_START', 'SCAN', 'STATUS_UPDATE', 'SESSION_END', 'LOGIN']
  },
  details: { 
    type: Schema.Types.Mixed, 
    default: {} 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export default mongoose.model<IOperation>('Operation', OperationSchema); 