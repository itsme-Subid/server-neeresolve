import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  changeReportStatus,
  createReport,
  getReportForAUser,
  getReports,
} from "../controllers/reportController.js";

const router = express.Router();

//Create a report or issue
router.post("/", createReport);

//Get report of a user
router.get("/userReports", getReportForAUser);



//Administrations Contol//
//Get all reports and issues
router.get("/", getReports);

//Change Report status
router.put("/edit/status", changeReportStatus);

export default router;
