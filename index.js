import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routers
import { healthRouter } from "./routes/health.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
// import studyGroupRouter from "./routes/studyGroupRoutes.js";

dotenv.config();
// console.log(process.env.MONGODB_URI);

// Connect to MongoDB
await mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 4000;

const app = express();

// View Engine
app.set("views", "./views");
app.set("view engine", "pug");

//Session Middleware  
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// Middlewares
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// API Routes
app.use("/api/health", healthRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
// app.use("/api/studygroups", studygroupRouter);


// Global error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Seems like we messed up somewhere...");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
