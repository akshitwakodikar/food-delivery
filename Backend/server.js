import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config.js";
import path from "path";
import { fileURLToPath } from "url";

// Helper to get __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Serve frontend (React)
const frontendPath = path.join(__dirname, "../Frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Fallback health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(port, () => {
  console.log(Server is running on http://localhost:${port});
});
