import dotenv from "dotenv";
dotenv.config();

import express, { Application, json } from "express";
import "./middleware/database";
import authRoute from "./routes/auth";

// DotEnv File Config

// Express
const app: Application = express();
app.use(json());

// Routes
app.use("/api/user", authRoute);

// Setting up the server
const PORT: number = parseInt(process.env.PORT || "8000");
app.listen(PORT, () => console.log(`Server running in ${PORT}`));
