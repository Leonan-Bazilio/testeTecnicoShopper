import mongoose, { Schema, Document, Types } from "mongoose";

export interface IDriver extends Document {
  _id: Types.ObjectId;
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  ratePerKmInCent: number;
  minDistanceInKm: number;
}

const DriverSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  vehicle: { type: String, required: true },
  review: {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  ratePerKmInCent: { type: Number, required: true },
  minDistanceInKm: { type: Number, required: true },
});

export default mongoose.model<IDriver>("Driver", DriverSchema);
