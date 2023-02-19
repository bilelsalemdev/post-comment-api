import mongoose from "mongoose";
import UserModel from "./user.model";
export interface PubInput {
  title: string;
  description: string;
  status: "open" | "confirmed" | "banned";
}

export interface PubDocument extends PubInput, mongoose.Document {
  createdAt: Date;
  user: object;
}

const pubSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "confirmed", "banned"],
    default: "open",
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
/* 
pubSchema.pre("save", async function (next) {
  const userId = await UserModel.findById(this.user._id)._id;
  this.user = userId;
  next();
}); */

const PubModel = mongoose.model<PubDocument>("Pub", pubSchema);

export default PubModel;
