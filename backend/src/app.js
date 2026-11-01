import express from "express";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";
import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import {config} from "./config/config.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(morgan("dev"));
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello welcome to the backend server of Fabruna");
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

export default app;