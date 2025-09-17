import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?\d{9,15}$/, "Please enter a valid phone number"], // optional regex
    },
    telegramId: {
      type: String,
      default: null,
    },
    photo: {
      type: String, // can be a URL or base64 string
      default: null,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
