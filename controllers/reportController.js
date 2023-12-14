import { haversineDistance } from "../helper/getDistanceFromLatLong.js";
import Report from "../models/reportModel.js";
import Suggestion from "../models/suggestionModel.js";

export const createReport = async (req, res, next) => {
  try {
    const { lat, long, issueDesc, category, image, userId } = req.body;

    const newReport = new Report({
      userId,
      image,
      location: {
        lat,
        long,
      },
      issueDesc,
      category,
      status: "In Review",
    });

    const savedReport = await newReport.save();
    res.status(200).json(savedReport);
  } catch (error) {
    next(error);
  }
};

export const createSuggestion = async (req, res, next) => {
  try {
    const { userId = "", reportId = "", suggestion = "" } = req.body;

    const newSuggestion = new Suggestion({
      userId,
      reportId,
      suggestion,
    });

    const savedSuggestion = await newSuggestion.save();
    res.status(200).json(savedSuggestion);
  } catch (error) {
    next(error);
  }
};

export const upvoteSuggestion = async (req, res, next) => {
  const { suggestionId } = req.params;
  const { userId } = req.body;
  try {
    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
    }
    if (suggestion.votes.includes(userId)) {
      res.status(400).json({ message: "Already upvoted" });
    }
    suggestion.votes.push(userId);
    await suggestion.save();
    res.status(200).json(suggestion);
  } catch (error) {
    next(error);
  }
}

export const downvoteSuggestion = async (req, res, next) => {
  const { suggestionId } = req.params;
  const { userId } = req.body;
  try {
    const suggestion = await Suggestion.findById(suggestionId);
    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
    }
    if (!suggestion.votes.includes(userId)) {
      res.status(400).json({ message: "Already downvoted" });
    }
    suggestion.votes = suggestion.votes.filter((vote) => vote !== userId);
    await suggestion.save();
    res.status(200).json(suggestion);
  } catch (error) {
    next(error);
  }
}

export const getReports = async (req, res, next) => {
  try {
    const { lat, long, threshold } = req.body;
    const results = await Report.find();
    if (!results) {
      res.status(404).json({ message: "No reports found" });
    }
    if (lat && long) {
      const filteredReports = results.filter((report) => {
        const distance = haversineDistance(
          +lat,
          +long,
          report.location.lat,
          report.location.long
        );
        return distance <= +threshold ?? 1; // 1 km
      });
      return res.status(200).json(filteredReports);
    }
    return res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

export const getSuggestions = async (req, res, next) => {
  try {
    const { reportId } = req.params;

    const result = await Suggestion.find({ reportId });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getReportForAUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const reports = await Report.find({ userId });

    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};

export const changeReportStatus = async (req, res, next) => {
  try {
    const { reportId, status } = req.body;

    const editedReportStatus = await Report.findByIdAndUpdate(
      reportId,
      {
        status,
      },
      {
        new: true,
      }
    );

    res.status(200).json(editedReportStatus);
  } catch (error) {
    next(error);
  }
};
