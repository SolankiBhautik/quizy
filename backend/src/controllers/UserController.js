import User from "../models/User.js";

// Get the current user's details
export const getUser = async (req, res) => {
    try {
        // req.user is populated by authenticateToken middleware (based on the JWT token)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user's details, excluding sensitive information like password
        const { password, ...userData } = user.toObject();
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update the current user's details
export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Find the user by ID from the token (req.user.id)
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user's fields if provided
        if (name) user.name = name;
        if (email) user.email = email;

        // Save the updated user
        await user.save();

        // Return the updated user details (excluding sensitive information)
        const { password: _, ...updatedUserData } = user.toObject();
        res.status(200).json(updatedUserData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
