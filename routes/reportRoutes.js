import express from "express";
import {verifyToken} from "../verifyToken.js"
import { createReport } from "../controllers/reportController.js";

const router = express.Router();

//Create a report or issue
router.post("/", verifyToken, createReport)

export default router;
