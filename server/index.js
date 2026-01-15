const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Added for serving frontend
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const rightsRoutes = require("./routes/rightsRoutes");
const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const scenarioQuizRoutes = require("./routes/scenarioQuizRoutes"); // ✅ NEW

app.use("/api/rights", rightsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/scenario-quizzes", scenarioQuizRoutes); // ✅ NEW

// Root route
app.get("/", (req, res) => {
  res.send("🚀 Digital Legal Rights API is running.");
});

// ✅ Serve frontend in production (ONLY if deploying backend + frontend together)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

// Error handler middleware (optional but useful)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// DB + Server Start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ Mongo Error:", err));
