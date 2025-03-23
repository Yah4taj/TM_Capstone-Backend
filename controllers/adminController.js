

import User from "../models/User.js";

//  Manage Users
export const manageUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

//  View Reports
export const viewReports = async (req, res) => {
  try {
    // Placeholder: Fetch reports, could be from a report model or other data
    res.status(200).json({ message: "View reports route" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error viewing reports" });
  }
};

//  Modify Data
export const modifyData = async (req, res) => {
  try {
    // Placeholder: Modify configurations, settings, etc.
    res.status(200).json({ message: "Modify data route" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error modifying data" });
  }
};

// Example: Manage Materials
export const manageMaterials = async (req, res) => {
  try {
    // Placeholder: Handle material management, like uploading, deleting, etc.
    res.status(200).json({ message: "Manage materials route" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error managing materials" });
  }
};

// Deactivate User (Admin only)
export const deactivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = false;
    await user.save();
    res.status(200).json({ message: "User account deactivated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deactivating user" });
  }
};

// Reactivate User (Admin only)
export const reactivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = true;
    await user.save();
    res.status(200).json({ message: "User account reactivated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error reactivating user" });
  }
};
