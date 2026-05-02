const express = require("express");
require("dotenv").config();

const connectDB = require("./Config/db");
connectDB();

const app = express();

app.use(express.json());

const cors = require("cors");
app.use(cors({
  origin: "https://task-manager-67b5ee9fq-shruti9-ops-projects.vercel.app",
  credentials: true
}));


app.use("/api/auth", require("./Routes/authRoutes"));
app.use("/api/projects", require("./Routes/projectRoutes"));
app.use("/api/tasks", require("./Routes/taskRoutes"));
app.use("/api/users", require("./Routes/userRoutes"));
app.use("/api/dashboard", require("./Routes/dashboardRoutes"));


const authMiddleware = require("./Middleware/authMiddleware");
app.use("/api/test", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
