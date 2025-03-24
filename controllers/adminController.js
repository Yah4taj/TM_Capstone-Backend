//For Admin specific actions

import User from "../models/User.js";
import StudyGroup from "../models/StudyGroup.js";

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

//Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
  }
};

// Ban a user (Admin only)
export const banUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { banned: true });
    res.json({ message: `User ${user.username} has been banned` });
  } catch (error) {
    res.status(500).json({ message: "Error banning user" });
  }
}

//Delete any study group (Admin only)
export const deleteGroup = async (req, res) => {
  try {
    await StudyGroup.findByIdAndDelete(req.params.id);
    res.json({ message: "Study group deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting study group" });
  }
};

