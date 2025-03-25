import express from "express";
// import session from "express-session";
// import MongoStore from "connect-mongo";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

// Routers
import { healthRouter } from "./routes/health.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import studygroupRouter from "./routes/studygroup.js";

dotenv.config();

const app = express();

// Middleware - 
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging requests
app.use(helmet()); // Security headers
app.use(express.static("./public")); // Serve static files

// Connect to MongoDB BEFORE starting the server
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => {
    console.error("MongoDB Connection Error:", e);
    process.exit(1); // Stop the app if database connection fails
  });

// Session Middleware (AFTER DB connection)
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "supersecret",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
//     cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }, // 1 day
//   })
// );

// View Engine Setup (AFTER Middleware)
app.set("views", "./views");
app.set("view engine", "pug");

// API Routes (AFTER Middleware & DB Connection)
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/api/health", healthRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/studygroup",studygroupRouter);

// Global Error Handling (LAST Middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

// Start Server AFTER everything is set up
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

//Proper server shutdown in the event of Ctrl C or kill

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination");
  process.exit(0);
});
