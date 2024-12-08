import jwt from 'jsonwebtoken';

// Generate JWT Token
export const generateToken = (user) => {
    const payload = {
        id: user._id,
        email: user.email,
        lastActivity: Date.now(),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
};
