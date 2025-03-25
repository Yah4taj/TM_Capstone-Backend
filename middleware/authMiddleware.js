
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// authMiddleware.js

// Example adminOnly middleware to restrict access to admins
// export const adminOnly = (req, res, next) => {
//   if (req.session.user && req.session.user.role === 'admin') {
//     return next(); // Allow access if the user is an admin
//   } else {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
// };
// authMiddleware.js

// Protect middleware to ensure the user is logged in
// export const protect = (req, res, next) => {
//   if (req.session.user) {
//     return next();  // User is authenticated, proceed to the next handler
//   } else {
//     return res.status(401).json({ message: "Not authenticated" });
//   }
// };


// Middleware to check if a user is authenticated
// export const isAuthenticated = async (req, res, next) => {
//   try {
//     if (!req.session.userId) {
//       return res.status(401).json({ message: "Unauthorized: Please log in" });
//     }

//     // Fetch user from database
//     const user = await User.findById(req.session.userId);
//     try{
//     if (!user) {
//       return res.status(401).json({ message: "User not found." });
//     }

//     req.user = user; // Attach user data to the request
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// // Middleware to check if the user is an admin
// export const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ message: "Access denied. Admins only." });
//   }
//   next();
// };
const authMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // Explicitly ensure role is set
    if (!user.role) {
      // If no role is set, assign a default
      user.role = 'user';
      await user.save();
    }

    req.user = user; // Attach user data to the request
    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
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
