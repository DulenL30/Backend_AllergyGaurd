import { Router } from "express";
import { predictFood } from "../controllers/food.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/predict", predictFood);

export default router;
