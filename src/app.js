import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";
import allergyRoutes from "./routes/allergy.routes.js";
import emergencyRoutes from "./routes/emergency.routes.js";
import nearbyRoutes from "./routes/nearby.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Root health check
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    service: "Food Allergen Prediction Backend",
    version: "1.0.0"
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/allergy", allergyRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/nearby", nearbyRoutes);

export default app;
