import Report from "../models/reportModel.js";

export const createReport = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const { lat, long, issueDesc, category, images } = req.body;

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
