// models/Advisor.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdvisor extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const AdvisorSchema = new Schema<IAdvisor>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

// Hash before save
AdvisorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password comparison
AdvisorSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model<IAdvisor>("Advisor", AdvisorSchema);
