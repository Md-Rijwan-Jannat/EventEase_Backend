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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const tokenGenerateFunction_1 = require("../../utils/tokenGenerateFunction");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_model_1 = require("./auth.model");
// Service to register a new user
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, "User already exists");
    }
    const result = yield auth_model_1.User.create(payload);
    const jwtPayload = {
        id: result._id,
        email: payload.email,
    };
    const accessToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const _a = result.toObject(), { password } = _a, resultData = __rest(_a, ["password"]);
    return {
        result: resultData,
        accessToken,
    };
});
// Service to log in a user
const loginUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch the user and exclude the password field
    const user = yield auth_model_1.User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    // Check password
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    // Create JWT payload
    const jwtPayload = {
        id: user._id,
        email: user.email,
    };
    const accessToken = (0, tokenGenerateFunction_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    // Exclude the password from the final result
    const _a = user.toObject(), { password } = _a, result = __rest(_a, ["password"]);
    return {
        user: result,
        accessToken,
    };
});
// Service to log out a user
const logoutUserFromDB = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        // Invalidate the token (if using a token blacklist)
        // Example: Add the token to a blacklist in Redis or DB
        return { message: "Successfully logged out" };
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid token");
    }
});
// Check auth user
const checkAuth = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.User.findById(userId).select("-password");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    return user;
});
exports.UserServices = {
    registerUserIntoDB,
    loginUserFromDB,
    logoutUserFromDB,
    checkAuth,
};
