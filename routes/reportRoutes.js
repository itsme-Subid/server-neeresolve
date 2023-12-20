import express from "express";
import {
  changeReportStatus,
  createReport,
  createSuggestion,
  getReportForAUser,
  getReports,
  getSuggestions,
  search,
  voteSuggestion,
} from "../controllers/reportController.js";
import { isAdmin } from "../isAdmin.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Create a report or issue
router.post("/", createReport);

// create suggestion
router.post("/suggestion", createSuggestion);

// upvote/downvote suggestion
router.patch("/suggestion/vote/:suggestionId", voteSuggestion);

// Get suggestions for a report
router.get("/suggestion/:reportId", getSuggestions);

//Get report of a user
router.get("/userReports/:userId", getReportForAUser);
//Administrations Contol//
//Get all reports and issues
router.get("/", getReports);

//Change Report status
router.put("/edit/status", changeReportStatus);

//Search api which searches for address
router.get("/search", search);

export default router;
