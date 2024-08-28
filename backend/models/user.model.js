import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    // role: {
    //   type: String,
    //   default: "user"
    // },
    email: {
      type: String,
      required: true,
      unique: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    },
    // avatar: {
    //   type: String,
    //   default: ""
    // },
    isVerified: {
      type: Boolean,
      default: false
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    verificationToken:String,
    verificationTokenExpires:Date,
  },
  {
    timestamps: true
  }
);

export  const User = mongoose.model("User", userSchema);