// ---------------- DNS FIX (for Render / Windows issues) ----------------
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

// ---------------- IMPORTS ----------------
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ---------------- APP INIT ----------------
const app = express();

// ---------------- ENV CHECK ----------------
if (!process.env.MONGODB_URL) {
  console.error(" MONGODB_URL is missing in .env");
  process.exit(1);
}

// ---------------- MIDDLEWARE ----------------

// CORS (important for cookies)
app.use(
  cors({
    origin: process.env.CLIENT_URL, // e.g. http://localhost:5173 or deployed frontend
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ---------------- ROUTES ----------------

// health check
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// API routes
const authRoutes = require("./src/routes/auth.routes");
const portfolioRoutes = require("./src/routes/portfolio.routes");
const projectRoutes = require("./src/routes/project.routes");
const uploadRoutes = require("./src/routes/upload.routes");

app.use("/api/auth", authRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/upload", uploadRoutes);

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ---------------- DATABASE + SERVER ----------------
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });