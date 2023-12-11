import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createReport,
  getReportForAUser,
  getReports,
} from "../controllers/reportController.js";

const router = express.Router();

//Create a report or issue
router.post("/", createReport);

//Get all reports and issues
router.get("/", getReports);

//Get report of a user
router.get("/userReports", getReportForAUser);

export default router;
