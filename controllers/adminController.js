import User from "../models/User.js";
import StudyGroup from "../models/StudyGroup.js";

// Manage Users
export const manageUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// View Reports (Placeholder)
export const viewReports = async (req, res) => {
  try {
    res.status(200).json({ message: "View reports route (To be implemented)" });
  } catch (error) {
    console.error("Error viewing reports:", error);
    res.status(500).json({ message: "Error viewing reports" });
  }
};

// Modify Data (Placeholder)
export const modifyData = async (req, res) => {
  try {
    res.status(200).json({ message: "Modify data route (To be implemented)" });
  } catch (error) {
    console.error("Error modifying data:", error);
    res.status(500).json({ message: "Error modifying data" });
  }
};

// Manage Materials (Placeholder)
export const manageMaterials = async (req, res) => {
  try {
    res.status(200).json({ message: "Manage materials route (To be implemented)" });
  } catch (error) {
    console.error("Error managing materials:", error);
    res.status(500).json({ message: "Error managing materials" });
  }
};

// Get All Users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Ban a User (Admin only)
export const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.banned = true;
    await user.save();

    res.json({ message: `User ${user.username} has been banned successfully.` });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ message: "Error banning user" });
  }
};

// Delete Any Study Group (Admin only)
export const deleteGroup = async (req, res) => {
  try {
    const studyGroup = await StudyGroup.findById(req.params.id);
    if (!studyGroup) {
      return res.status(404).json({ message: "Study group not found" });
    }

    await studyGroup.deleteOne();
    res.json({ message: "Study group deleted successfully." });
  } catch (error) {
    console.error("Error deleting study group:", error);
    res.status(500).json({ message: "Error deleting study group" });
  }
};
