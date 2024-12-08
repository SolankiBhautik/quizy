import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ message: "Authentication token required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const now = Date.now();
        const lastActivity = decoded.lastActivity || now;
        const tokenExpiryLimit = 60 * 60 * 1000; // 1 hour in milliseconds

        if (now - lastActivity > tokenExpiryLimit) {
            return res.status(401).json({ message: "Session expired. Please log in again." });
        }

        // Update `lastActivity` and sign a new token
        decoded.lastActivity = now;
        const refreshedToken = jwt.sign(
            { id: decoded.id, email: decoded.email, lastActivity: now },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Send the refreshed token to the client
        res.setHeader("x-refreshed-token", refreshedToken);

        // Attach user data to request for further use
        req.user = { id: decoded.id };

        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ message: "Invalid token" });
    }
};
