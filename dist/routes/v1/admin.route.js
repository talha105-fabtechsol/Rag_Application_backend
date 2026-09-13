"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../modules/auth");
const admin_1 = require("../../modules/admin");
const router = express_1.default.Router();
// All admin routes strictly require authentication and the "adminAccess" right
router.use((0, auth_1.auth)("adminAccess"));
// ── Overview Stats ──
router.get("/stats", admin_1.adminController.getStats);
// ── Users Management ──
router.get("/users", admin_1.adminController.getUsers);
router.get("/users/:userId", admin_1.adminController.getUser);
router.patch("/users/:userId/status", admin_1.adminController.updateUser);
// ── Documents Management ──
router.get("/documents", admin_1.adminController.getDocuments);
router.get("/documents/:documentId", admin_1.adminController.getDocument);
router.delete("/documents/:documentId", admin_1.adminController.deleteDocument);
// ── Chats Management ──
router.get("/chats", admin_1.adminController.getChats);
router.get("/chats/:chatId", admin_1.adminController.getChat);
// ── Images Management ──
router.get("/images", admin_1.adminController.getImages);
router.delete("/images/:imageId", admin_1.adminController.deleteImage);
exports.default = router;
