import User from "../models/User.js";

// Deactivate User (Admin only)
export const deactivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = false; // Deactivate the account
    await user.save();
    res.status(200).json({ message: "User account deactivated", user });
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

    user.isActive = true; // Reactivate the account
    await user.save();
    res.status(200).json({ message: "User account reactivated", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error reactivating user" });
  }
};

// Get All Users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Do not return password
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};
