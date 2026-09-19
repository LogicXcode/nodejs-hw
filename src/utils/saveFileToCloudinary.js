import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';

cloudinary.v2.config({
  cloud_name: env('CLOUDINARY_CLOUD_NAME'),
  api_key: env('CLOUDINARY_API_KEY'),
  api_secret: env('CLOUDINARY_API_SECRET'),
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.v2.uploader.upload(file.path);
    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    await fs.unlink(file.path);
    throw error;
  }
};