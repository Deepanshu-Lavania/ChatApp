const createToken = require("../jwt/generateToken");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    if (password != confirmpassword) {
      return res.status(400).json({ message: "Match the confirm Password" });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email already Exists" });
    }
    //hashed the Password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      console.log("Response before creatingToken is : ", res);

      createToken(newUser._id, res);//call generateToken function
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
    console.log("login page input data is : ",req.body);
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (typeof password !== "string") {
      return res.status(400).json({ message: "Password must be a string" });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (typeof user.password !== "string") {
      return res.status(500).json({ message: "Password hash is invalid" });
    } 
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "Invalid User or password" });
    }
       
    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Check if password matches
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
    // Clear the JWT cookie (ensure path matches cookie setup)
    res.clearCookie("jwt","", {
      httpOnly: true, //xss
      secure: true,
      sameSite: "strict", //prevent from csrf attck
      maxAge:0
    });

    // Respond to the client
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};

const getUserProfile=async( req,res)=>{
    try {
        //we have to do in such that registered user will not show so we have to use middleware
        const loggedInUser = req.user._id;//req.user from authorisedMiddleware 
        console.log("loggedInUser Id is "+loggedInUser);
        
        const filteredUsers =await User.find({_id:{$ne:loggedInUser}}).select("-password");
        // const filteredUsers =await User.find().select("-password");
        res.status(201).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUserProfile Controller : ",error);
        res.status(500).json({message:"Server error"});
    }
}

module.exports = { Signup, Login, Logout, getUserProfile };
