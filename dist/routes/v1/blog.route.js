"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_1 = require("../../modules/blog");
const router = express_1.default.Router();
// Public routes for SSR blog views and readers
router.get("/", blog_1.blogController.getPublishedBlogs);
router.get("/categories", blog_1.blogController.getCategories);
router.get("/:slug", blog_1.blogController.getBlogBySlug);
exports.default = router;
