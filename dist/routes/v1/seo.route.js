"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const seo_1 = require("../../modules/seo");
const router = express_1.default.Router();
router.get("/sitemap.xml", seo_1.seoController.getSitemapXml);
router.get("/robots.txt", seo_1.seoController.getRobotsTxt);
exports.default = router;
