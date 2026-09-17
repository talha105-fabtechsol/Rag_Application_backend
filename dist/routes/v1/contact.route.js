"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../modules/auth");
const validate_1 = require("../../modules/validate");
const contact_1 = require("../../modules/contact");
const router = express_1.default.Router();
// ── Public Route ──
// Anyone can submit a contact inquiry / security consultation request
router.post("/", (0, validate_1.validate)(contact_1.contactValidation.submitContact), contact_1.contactController.submitContact);
// ── Super Admin / Admin Routes ──
// Strictly protected by adminAccess right
router.get("/stats", (0, auth_1.auth)("adminAccess"), contact_1.contactController.getContactStats);
router.get("/", (0, auth_1.auth)("adminAccess"), (0, validate_1.validate)(contact_1.contactValidation.getContacts), contact_1.contactController.getAdminContacts);
router.get("/:contactId", (0, auth_1.auth)("adminAccess"), (0, validate_1.validate)(contact_1.contactValidation.getContactById), contact_1.contactController.getAdminContact);
router.patch("/:contactId", (0, auth_1.auth)("adminAccess"), (0, validate_1.validate)(contact_1.contactValidation.updateContact), contact_1.contactController.updateContact);
router.delete("/:contactId", (0, auth_1.auth)("adminAccess"), (0, validate_1.validate)(contact_1.contactValidation.deleteContact), contact_1.contactController.deleteContact);
exports.default = router;
