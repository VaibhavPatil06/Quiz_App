import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Adjust the path to your user model

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, please login again" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found, please login again",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};

export default authMiddleware;
