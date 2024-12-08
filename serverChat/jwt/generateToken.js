const jwt = require("jsonwebtoken");

const createToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });

  return res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // Disable in development
    sameSite: "strict", // Allow cross-origin requests
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};
module.exports = createToken;
