import express from "express";
import cors from "cors";
import quiz from "./routes/quiz.js";
import auth from "./routes/auth.js";
import user from "./routes/user.js";
import "./db/connection.js";
import dotenv from "dotenv";
dotenv.config()


const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());


// routes 
app.use("/quiz", quiz);
app.use("/auth", auth);
app.use("/user", user);

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});