"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.getChats = exports.deleteDocument = exports.getDocument = exports.getDocuments = exports.updateUser = exports.getUser = exports.getUsers = exports.getStats = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const adminService = __importStar(require("./admin.service"));
exports.getStats = (0, catchAsync_1.default)(async (_req, res) => {
    const stats = await adminService.getAdminStats();
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: stats,
    });
});
exports.getUsers = (0, catchAsync_1.default)(async (req, res) => {
    const { page, limit, search, role, status, sortBy } = req.query;
    const result = await adminService.getAllUsers({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        search: search,
        role: role,
        status: status,
        sortBy: sortBy,
    });
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: result,
    });
});
exports.getUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await adminService.getUserDetails(req.params["userId"]);
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: result,
    });
});
exports.updateUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await adminService.updateUserStatus(req.params["userId"], req.body);
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: { user: result },
    });
});
exports.getDocuments = (0, catchAsync_1.default)(async (req, res) => {
    const { page, limit, search, fileType, status, userId, sortBy } = req.query;
    const result = await adminService.getAllDocuments({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        search: search,
        fileType: fileType,
        status: status,
        userId: userId,
        sortBy: sortBy,
    });
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: result,
    });
});
exports.getDocument = (0, catchAsync_1.default)(async (req, res) => {
    const result = await adminService.getDocumentDetails(req.params["documentId"]);
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: result,
    });
});
exports.deleteDocument = (0, catchAsync_1.default)(async (req, res) => {
    await adminService.deleteDocumentAdmin(req.params["documentId"]);
    res.status(http_status_1.default.NO_CONTENT).send();
});
exports.getChats = (0, catchAsync_1.default)(async (req, res) => {
    const { page, limit, search, chatType, userId, sortBy } = req.query;
    const result = await adminService.getAllChats({
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        search: search,
        chatType: chatType,
        userId: userId,
        sortBy: sortBy,
    });
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: result,
    });
});
exports.getChat = (0, catchAsync_1.default)(async (req, res) => {
    const result = await adminService.getChatDetails(req.params["chatId"]);
    res.status(http_status_1.default.OK).send({
        status: "success",
        data: result,
    });
});
