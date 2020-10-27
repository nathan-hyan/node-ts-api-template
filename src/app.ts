import cors from "cors";
import morgan from "morgan";

// DotEnv File Config
import dotenv from "dotenv";
dotenv.config();

import express, { Application, json } from "express";
import path from "path";
import "./middleware/database";
import authRoute from "./routes/auth";

// Express
const app: Application = express();
app.use(json());
app.use(cors());
app.use(morgan("common"));

// Heroku deploy
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.use("*", express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
  });
}

// Routes
app.use("/api/user", authRoute);

// Setting up the server
const PORT: number = parseInt(process.env.PORT || "8000");
app.listen(PORT, () => console.log(`Server running in ${PORT}`));
