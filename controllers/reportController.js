import Report from "../models/reportModel.js";

export const createReport = async (req, res, next) => {
  try {
    const { lat, long, issueDesc, category, images, userId } = req.body;

    const newReport = new Report({
      userId,
      images,
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

export const getReports = async (req, res, next) => {
  try {
    const query = req.query.q;

    const result = await Report.find({});

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getReportForAUser = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const reports = await Report.find({ userId });

    res.status(200).json(reports);
  } catch (error) {
    next(error);
  }
};
