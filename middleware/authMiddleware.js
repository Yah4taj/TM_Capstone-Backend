import bcrypt from "bcryptjs";
import User from "../models/User.js";


export const authMiddleware = (req, res, next) => {
  if (!req.session.user) {
      return res.status(401).json({ message: 'Unauthorized: Please log in' });
  }
  req.user = req.session.user; // Attach user data to the request
  next();
};


export const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
  };

// Middleware to protect routes (checks if user is logged in)
export const protect = async (req, res, next) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authorized. Please log in." });
    }

    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user; // Attach user data to request
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Hash password before saving a user to the database
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare entered password with stored hashed password
export const matchPassword = async (enteredPassword, storedHash) => {
  return await bcrypt.compare(enteredPassword, storedHash);
};

  