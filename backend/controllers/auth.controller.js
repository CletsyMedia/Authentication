import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    console.log("user already exist", userAlreadyExists);
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save();

    //jwt
    generateTokenAndSetCookie(res, user._id);
    //send email
    await sendVerificationEmail(user.email, user.name, verificationToken);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  // six digit token
  const { verifyCode } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: verifyCode,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid or expired verification token",
        });
    }
    user.isVerified = true;
    user.verificationToken = null;
    user.verificationTokenExpires = null;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    console.log(`Error verifying email: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // Update last login time
    user.lastLogin = Date.now();
    await user.save();

    // Send response
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    console.log(`Error logging in: ${error.message}`);
    return res.status(400).json({ success: false, message: error.message });
  }
};


export const logout = async (req, res) => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    // Generate a random token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpires = Date.now() + 1 * 60 * 60 * 1000; // 60 minutes
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();
    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Password reset email sent successfully",
      });
  } catch (error) {
    console.log(`Error forgot password: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user with the reset token and check if the token is still valid
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    console.log("Received Token:", token);
    console.log("Current Time:", Date.now());
    console.log("User Found:", user);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    // Update the user's password
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save();
    await sendResetSuccessEmail(user.email);
    res
      .status(200)
      .json({ success: true, message: "Password successfully reset" });
  } catch (error) {
    console.log(`Error resetting password: ${error.message}`);
    res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while resetting the password",
      });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    console.log("User", req.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.log(`Error checking auth: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { name, email }= req.body;
  console.log("Name", name);
  try {
    const user = await User.findById(req.userId);
    // If user doesn't exist
    if(!user){
      return res.status(400).json({ success: false, message: "User not found" });
    }
    // Update user details
    user.name = name || user.name;
    user.email = email || user.email;
    await user.save();
    res.status(200).json({success: true, message: "Profile updated successfully", user});
  } catch (error) {
    console.error(`Error updating profile: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
}
