import express, { Router } from "express";
import { seoController } from "../../modules/seo";

const router: Router = express.Router();

router.get("/sitemap.xml", seoController.getSitemapXml);
router.get("/robots.txt", seoController.getRobotsTxt);

export default router;

