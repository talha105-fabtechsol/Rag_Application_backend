import express, { Router } from "express";
import { auth } from "../../modules/auth";
import { adminController } from "../../modules/admin";

const router: Router = express.Router();

// All admin routes strictly require authentication and the "adminAccess" right
router.use(auth("adminAccess"));

// ── Overview Stats ──
router.get("/stats", adminController.getStats);

// ── Users Management ──
router.get("/users", adminController.getUsers);
router.get("/users/:userId", adminController.getUser);
router.patch("/users/:userId/status", adminController.updateUser);

// ── Documents Management ──
router.get("/documents", adminController.getDocuments);
router.get("/documents/:documentId", adminController.getDocument);
router.delete("/documents/:documentId", adminController.deleteDocument);

// ── Chats Management ──
router.get("/chats", adminController.getChats);
router.get("/chats/:chatId", adminController.getChat);

export default router;

