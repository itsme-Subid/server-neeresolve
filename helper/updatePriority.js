import { filterReportsByLocation } from "./getReportFromLatLong";
import { getSimilarity } from "./getSimilarity";
import Report from "../models/reportModel.js";

export const updatePriority = async (
  id,
  lat,
  long,
  image,
) => {
  const newReport = await Report.findById(id);
  const existingReports = await Report.find();

  const filteredReports = filterReportsByLocation(
    existingReports,
    +lat,
    +long,
    1 // threshold, in km
  );

  if (!(filteredReports.length > 0)) return;

  filteredReports.forEach(async (report) => {
    const similarity = await getSimilarity({ img1: image, img2: report.image });
    if (!(similarity > 0.7)) return
    newReport.similarity.push({
      reportId: report._id,
      similarity,
    });
    newReport.priority += 1;
    await Report.findByIdAndUpdate(
      report._id,
      {
        priority: report.priority + 1,
      },
      {
        new: true,
      }
    );
  });
  await newReport.save();
}