import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors())


const port = 9002;
app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));
