import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Register User
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;  //  pass role here for admins

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: "User already exists" });

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user with role (default to 'user' if not specified)
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: role || 'user'  // Default role is 'user', but can be 'admin' if provided
  });

  await user.save();

  // Store user information in session (including role)
  req.session.user = { 
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role  // Store role for role-based access control
  };

  res.status(201).json({ message: "User registered successfully", user: req.session.user });
};

// Login User (Session-Based)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Store user information in session (including role)
  req.session.user = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role  // Store role in session
  };

  res.json({ message: "Login successful", user: req.session.user });
};

//  Logout User
export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");  // Clear the session cookie
    res.json({ message: "Logged out successfully" });
  });
};

// Get User Profile (Check Session)
export const getUserProfile = async (req, res) => {
  // Ensure the user is authenticated
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({ user: req.session.user });
};
