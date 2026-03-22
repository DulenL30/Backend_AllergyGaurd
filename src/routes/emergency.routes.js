import { Router } from "express";
import { addContact } from "../controllers/emergency.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();
router.post("/", authMiddleware, addContact);
export default router;
