import User from "../models/userModel.js";

export const editDetails = async (req, res, next) => {
  try {
    const {
      username,
      name,
      profilePicture,
      userId,
      notificationId,
      lat,
      long,
    } = req.body;

    const editedData = await User.findByIdAndUpdate(
      userId,
      {
        username,
        name,
        profilePicture,
        notificationId,
        location: {
          lat,
          long,
        },
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

export const getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(userId);

    const userDetails = await User.findById(userId);

    res.status(200).json(userDetails);
  } catch (error) {
    next(error);
  }
};
