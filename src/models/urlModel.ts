import mongoose from "mongoose";

export interface TypeUrl extends mongoose.Document {
  long_url: string;
  short_url: string;
  domain: string;
}

const urlSchema = new mongoose.Schema<TypeUrl>(
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

urlSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const Url = mongoose.model<TypeUrl>("Url", urlSchema);
