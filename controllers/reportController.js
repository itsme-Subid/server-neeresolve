import Report from "../models/reportModel.js";

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

export const getReports = async (req, res, next) => {
  try {
    const {city, } = req.query.q;

    const result = await Report.find({});

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
