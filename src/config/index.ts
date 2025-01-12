import dotenv from "dotenv";
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  bcrypt_salt_rounds: process.env.BCRYPT_SLAT_ROUNDS,
  cloudinary_cloud_name: process.env.cloudinary_cloud_name,
  cloudinary_api_key: process.env.cloudinary_api_key,
  cloudinary_api_secret: process.env.cloudinary_api_secret,
};
