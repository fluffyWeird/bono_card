import mongoose from "mongoose";

const accessLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    method: {
      type: String,
      enum: ["QR", "ID-input"], // restricts to only these methods
      required: true,
    },
  },
  { timestamps: true }
);

const AccessLog = mongoose.model("AccessLog", accessLogSchema);

export default AccessLog;
