const User = require("../models/user-model");
const jsonwebtoken = require("jsonwebtoken");

const authorisedMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;// Extract the token from cookies by using postman
    console.log("Token from cookies: ", token);
    if (!token) {
      return res.status(401).json({ message: "user Not authorized" });
    }
    const verified = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
    if (!verified) {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log("verified is : ",verified);
    
    const user = await User.findById(verified.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;//pass the authentic user
    next();
  } catch (error) {
    console.log(error);
    res.status(501).json({ message: "Internal server error" });
  }
};
module.exports = authorisedMiddleware;
