import User from "../models/userModel.js";

export const editDetails = async (req, res, next) => {
  try {
    const { username, name, profilePicture, userId } = req.body;

    const editedData = await User.findByIdAndUpdate(
      userId,
      {
        username,
        name,
        profilePicture,
      },
      {
        new: true,
      }
    );

    res.status(200).json(editedData);
  } catch (error) {
    next(error);
  }
};
