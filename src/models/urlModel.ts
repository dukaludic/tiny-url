import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    long_url: { type: String, required: false },
    short_url: { type: String, required: false },
    counter: { type: Number, required: false, default: 1 },
  },
  { timestamps: { createdAt: true, updatedAt: false }, versionKey: false }
);

export default mongoose.model("Url", urlSchema);
