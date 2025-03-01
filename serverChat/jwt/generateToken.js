import jsonwebtoken from "jsonwebtoken";

const createToken = (userId, res) => {
  const token = jsonwebtoken.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "30d",
  });

  return res.cookie("jwt", token, {
    httpOnly: true,
    secure: false, // Disable in development
    sameSite: "strict", // Allow cross-origin requests
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

export default createToken;