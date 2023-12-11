import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    location: {
      lat: Number,
      long: Number,
    },
    userId: {
      type: String,
    },
    issueDesc: {
      type: String,
    },
    category: {
      type: String,
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("report", reportSchema);
