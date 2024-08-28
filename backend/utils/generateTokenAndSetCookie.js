import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expiration
    });
    
    const options = {
      httpOnly: true,
      sameSite: "strict", // SameSite flag for CSRF
      secure: process.env.NODE_ENV === "production", // Secure flag for HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration
    };
    
    console.log("Token generated and cookie set", token);
    console.log("JWT SECRET", process.env.JWT_SECRET);
    console.log("NODE_ENV", process.env.NODE_ENV);
    res.cookie("token", token, options);
    return token;
};
