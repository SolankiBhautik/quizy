import User from "../models/User.js";

const register = async (req, res) => {
    try {
        console.log(req.body)
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}