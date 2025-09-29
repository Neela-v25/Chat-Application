import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config()
const app = express();

const PORT = process.env.PORT

app.use(express.json()) //basically allows to extract data from request body

app.use(cookieParser()); //allows to parse the cookies

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)


app.listen(PORT, ()=>{
    console.log('Server is running on port '+ PORT)
    connectDB();
})