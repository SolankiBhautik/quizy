import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const oldUser = await User.findOne({ username: req.body.username });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const password = await hashPassword(req.body.password);
        const user = new User({
            username: req.body.username,
            password: password
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


export const login = async (req, res) => {
    try {
        const username = req.body.username;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ message: "Authentication failed. Invalid username or password." })
            return
        }
        const match = await comparePasswords(req.body.password, user.password);
        if (!match) {
            res.status(401).json({ message: "Authentication failed. Invalid username or password." })
            return
        }

        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: "error testing" })
    }
}


async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw new Error("Password hashing failed");
    }
}


async function comparePasswords(enteredPassword, storedHash) {
    const match = await bcrypt.compare(enteredPassword, storedHash);
    return match;
}