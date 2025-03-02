import express from "express";
import { addExpense, getExpenses } from "../controllers/expense.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addExpense);
router.get("/", protect, getExpenses);

export default router;