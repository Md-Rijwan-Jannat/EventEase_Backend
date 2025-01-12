import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  bcrypt_salt_rounds: process.env.BCRYPT_SLAT_ROUNDS,
  cloudinary_cloud_name: process.env.cloudinary_cloud_name,
  cloudinary_api_key: process.env.cloudinary_api_key,
  cloudinary_api_secret: process.env.cloudinary_api_secret,
};
