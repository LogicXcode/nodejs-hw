import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  const file = req.file;

  if (!file) {
    throw createHttpError(400, 'No file');
  }

  const cloudinaryResult = await saveFileToCloudinary(file.buffer);

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: cloudinaryResult.secure_url },
    { new: true },
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated avatar!',
    data: {
      avatar: updatedUser.avatar,
    },
  });
};