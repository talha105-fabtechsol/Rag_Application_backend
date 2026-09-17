import express, { Router } from "express";
import { auth } from "../../modules/auth";
import { validate } from "../../modules/validate";
import { contactController, contactValidation } from "../../modules/contact";

const router: Router = express.Router();

// ── Public Route ──
// Anyone can submit a contact inquiry / security consultation request
router.post(
  "/",
  validate(contactValidation.submitContact),
  contactController.submitContact
);

// ── Super Admin / Admin Routes ──
// Strictly protected by adminAccess right
router.get(
  "/stats",
  auth("adminAccess"),
  contactController.getContactStats
);

router.get(
  "/",
  auth("adminAccess"),
  validate(contactValidation.getContacts),
  contactController.getAdminContacts
);

router.get(
  "/:contactId",
  auth("adminAccess"),
  validate(contactValidation.getContactById),
  contactController.getAdminContact
);

router.patch(
  "/:contactId",
  auth("adminAccess"),
  validate(contactValidation.updateContact),
  contactController.updateContact
);

router.delete(
  "/:contactId",
  auth("adminAccess"),
  validate(contactValidation.deleteContact),
  contactController.deleteContact
);

export default router;

