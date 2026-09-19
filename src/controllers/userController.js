import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const updateUserAvatar = async (req, res, next) => {
  const file = req.file;

  if (!file) {
    throw createHttpError(400, 'No file');
  }


  const cloudinaryResult = await saveFileToCloudinary(file.buffer, req.user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar: cloudinaryResult.secure_url },
    { returnDocument: 'after' }, 
  );

  if (!updatedUser) {
    throw createHttpError(404, 'User not found');
  }

  
  res.status(200).json({
    url: updatedUser.avatar,
  });
};