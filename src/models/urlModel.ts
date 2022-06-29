import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    long_url: { type: String, required: false },
    short_url: { type: String, required: false },
    domain: { type: String, required: false },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  }
);

// urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });

export interface TypeUrl extends mongoose.Document {
  long_url: string;
  short_url: string;
  domain: string;
}

export const Url = mongoose.model<TypeUrl>("Url", urlSchema);
