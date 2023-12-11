import express from "express";
import { verifyToken } from "../verifyToken.js";
import { editDetails } from "../controllers/userController.js";

const router = express.Router();

//Edit details
router.put("/edit", verifyToken, editDetails);

export default router;