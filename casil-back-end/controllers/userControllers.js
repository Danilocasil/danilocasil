const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      username,
      password,
      address,
      type,
    } = req.body;

    console.log("Received type from frontend:", type); // Add this line

    if (
      !firstName || !lastName || !age || !gender || !contactNumber ||
      !email || !username || !password || !address || !type
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      age,
      gender,
      contactNumber,
      email,
      username,
      password: hashedPassword,
      address,
      type,
      isActive: true,
    });

    console.log("User created:", user); // Add this line

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        type: user.type,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

   
    if (!user) {
      return res.status(404).json({ message: "Account doesn't exist." });
    }

  
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is inactive. Please contact support.",
      });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        type: user.type,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      type: user.type,
      firstName: user.firstName,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };