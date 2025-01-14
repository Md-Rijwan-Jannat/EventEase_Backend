"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
// Define the Mongoose schema
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    imageUrl: { type: String, default: "" },
}, {
    timestamps: true,
});
// Middleware to hash the password before saving
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // Only hash the password if it has been modified (or is new)
        if (!this.isModified("password")) {
            return next();
        }
        try {
            // Generate a salt
            const saltRounds = parseInt(config_1.default.bcrypt_salt_rounds, 10);
            const salt = yield bcrypt_1.default.genSalt(saltRounds);
            // Hash the password with the salt
            user.password = yield bcrypt_1.default.hash(user.password, salt);
            next();
        }
        catch (err) {
            return next(err);
        }
    });
});
// Create the Mongoose model
exports.User = (0, mongoose_1.model)("User", UserSchema);
