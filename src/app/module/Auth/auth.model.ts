import { Model, model, Schema } from "mongoose";
import { TUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

// Define the Mongoose schema
const UserSchema: Schema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Middleware to hash the password before saving
UserSchema.pre("save", async function (next) {
  const user = this as unknown as TUser;

  // Only hash the password if it has been modified (or is new)
  if (!(this as any).isModified("password")) {
    return next();
  }

  try {
    // Generate a salt
    const saltRounds = parseInt(
      config.bcrypt_salt_rounds as unknown as string,
      10
    );
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    user.password = await bcrypt.hash(user.password, salt);

    next();
  } catch (err: any) {
    return next(err);
  }
});

// Create the Mongoose model
export const User: Model<TUser> = model<TUser>("User", UserSchema);
