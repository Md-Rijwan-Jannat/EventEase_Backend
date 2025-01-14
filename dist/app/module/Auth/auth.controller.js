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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// Controller to register a new user
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req.body", req.body);
    const { result, accessToken } = yield auth_service_1.UserServices.registerUserIntoDB(req.body);
    // Set a cookie for the access token
    res.cookie("accessToken", accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax", // Adjust as per requirements
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is created successfully",
        data: result,
        accessToken: accessToken,
    });
}));
// Controller to log in a user
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, accessToken } = yield auth_service_1.UserServices.loginUserFromDB(req.body);
    // Set a cookie for the access token
    res.cookie("accessToken", accessToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged in successfully",
        data: user,
        accessToken: accessToken,
    });
}));
// Controller to log out a user
const logoutUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.accessToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    yield auth_service_1.UserServices.logoutUserFromDB(token);
    // Clear the access token cookie
    res.clearCookie("accessToken", {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged out successfully",
    });
}));
const checkAuth = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.UserServices.checkAuth(req.user.id);
    // Clear the access token cookie
    res.clearCookie("accessToken", {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User logged out successfully",
        data: result,
    });
}));
exports.AuthController = {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
};
