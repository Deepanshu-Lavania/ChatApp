import createToken from "../jwt/generateToken.js";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";

const Signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Match the confirm Password" });
    }
    
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already Exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    if (newUser) {
      console.log("Response before creatingToken is : ", res);
      createToken(newUser._id, res);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login page input data is : ", req.body);
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }
    
    const user = await User.findOne({ email });
    
    if (!user || typeof user.password !== "string") {
      return res.status(404).json({ message: "Invalid User or password" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid User or password" });
    }
    
    createToken(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const Logout = async (req, res) => {
  try {
    res.clearCookie("jwt", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 0,
    });

    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ message: "Server error, please try again later" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    console.log("loggedInUser Id is ", loggedInUser);
    
    const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUserProfile Controller : ", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { Signup, Login, Logout, getUserProfile };