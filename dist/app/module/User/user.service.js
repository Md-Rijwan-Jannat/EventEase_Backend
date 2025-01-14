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
exports.UserServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = require("../Auth/auth.model");
// Get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield auth_model_1.User.find().select("-password");
    return users;
});
// Get a single user by ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(id).select("-password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
// Update a user by ID
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.User.findById(id);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const user = yield auth_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select("-password");
    console.log("user should update", user, payload);
    return user;
});
// Delete a user by ID
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield auth_model_1.User.findById(id);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const user = yield auth_model_1.User.findByIdAndDelete(id);
    return user;
});
exports.UserServices = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
