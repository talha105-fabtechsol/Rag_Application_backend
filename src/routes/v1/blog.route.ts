import express, { Router } from "express";
import { blogController } from "../../modules/blog";

const router: Router = express.Router();

// Public routes for SSR blog views and readers
router.get("/", blogController.getPublishedBlogs);
router.get("/categories", blogController.getCategories);
router.get("/:slug", blogController.getBlogBySlug);

export default router;

