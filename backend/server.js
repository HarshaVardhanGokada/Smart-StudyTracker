// Main backend entry point
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./passport"); // Google OAuth setup

const subjectRoutes = require("./routes/subjects");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());

// Allow frontend (Vite React on port 5173) to talk to backend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Session setup for Passport
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/subjects", subjectRoutes);
app.use("/auth", authRoutes);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/studytracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err));

// Start backend server
const PORT = 3001; // use 5000 for consistency with React proxy
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
