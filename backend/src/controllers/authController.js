import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

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

        const token = makeToken(user);

        res.status(200).json({ token, message: "Register successful!", user: newUser });
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

        const token = makeToken(user);

        res.status(200).json({ token, message: "Login successful!", user: user });
    } catch (err) {
        res.status(500).json({ message: "error testing" })
    }
}


export const check = async (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user data to the request for further use
        const userid = { id: decoded.id };
        res.status(200).json({ userid: userid })
    } catch (err) {
        res.status(500).json({ message: "error checking token" })
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


function makeToken(user) {
    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return token;

}