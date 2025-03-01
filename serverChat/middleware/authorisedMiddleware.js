import User from "../models/user-model.js";
import jsonwebtoken from "jsonwebtoken";

const authorisedMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Extract the token from cookies by using postman
    console.log("Token from cookies: ", token);
    if (!token) {
      return res.status(401).json({ message: "User not authorized" });
    }
    const verified = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("Verified is: ", verified);
    
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user; // Pass the authenticated user
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
};

export default authorisedMiddleware;