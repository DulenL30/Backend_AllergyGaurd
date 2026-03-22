import { Router } from "express";
import { addAllergy, getAllergy } from "../controllers/allergy.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
//GET (fetch profile)
router.get("/", authMiddleware, getAllergy);

router.post("/",authMiddleware, addAllergy);
export default router;