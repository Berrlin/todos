import express from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/UserRoute.js";
import todosRoute from "./routes/TodosRoute.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());
connectDB();

// Routes
app.use("/api/user", userRoute);
app.use("/api/todos", todosRoute);

app.get("/", (req, res) => {
    res.send("API Working");
});

// Tạo HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS Server Started on https://maiquoctuan.io.vn:${port}`);
});
