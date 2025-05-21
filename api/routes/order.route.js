import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, createDirectOrder } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);
// New route for direct order creation
router.post("/direct/:id", verifyToken, createDirectOrder);

export default router;