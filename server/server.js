import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import authentificationRoutes from "./routes/authentification.js";
import locationRoutes from "./routes/location.js";
dotenv.config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
// app.use(express.cookieParser());

mongoose.connect(process.env.MONGO_CONNECTION);

// authentificationRoutes
app.use("/", authentificationRoutes);
app.use("/api", locationRoutes);

const port = 9002;
app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));
