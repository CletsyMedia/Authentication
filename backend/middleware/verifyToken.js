import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  console.log("Token", token);
  console.log("JWT SECRET", process.env.JWT_SECRET);
  if (!token)
    return res.status(401).json({ errorMessage: "Unauthorized - no token provided" });
  
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token", decodedToken);
    if (!decodedToken)
      return res.status(401).json({ errorMessage: "Unauthorized - invalid token" });
    
    req.userId = decodedToken.userId;
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ errorMessage: "Unauthorized - invalid token" });
  }
};
