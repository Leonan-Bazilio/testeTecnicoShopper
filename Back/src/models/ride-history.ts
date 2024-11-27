import mongoose, { Schema, Document } from "mongoose";

export interface IRideHistory extends Document {
  customer_id: string;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

const RideHistorySchema: Schema = new Schema({
  customer_id: { type: String, required: true },
  date: { type: Date, required: true },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  distance: { type: Number, required: true },
  duration: { type: String, required: true },
  driver: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  value: { type: Number, required: true },
});

export default mongoose.model<IRideHistory>("RideHistory", RideHistorySchema);
