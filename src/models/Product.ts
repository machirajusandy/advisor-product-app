// models/Product.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  advisorId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
}

const ProductSchema: Schema = new Schema({
  advisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Advisor",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
