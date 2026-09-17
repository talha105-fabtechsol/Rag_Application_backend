"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContactById = exports.getContacts = exports.submitContact = void 0;
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("../validate/custom.validation");
exports.submitContact = {
    body: joi_1.default.object().keys({
        name: joi_1.default.string().required().trim().max(120),
        email: joi_1.default.string().required().email({ tlds: { allow: false } }).trim().max(254),
        company: joi_1.default.string().allow("").optional().max(200),
        role: joi_1.default.string().allow("").optional().max(120),
        phone: joi_1.default.string().allow("").optional().max(50),
        inquiryType: joi_1.default.string()
            .valid("general", "sales", "security", "enterprise", "support", "partnership")
            .default("general"),
        subject: joi_1.default.string().required().trim().max(300),
        message: joi_1.default.string().required().trim().max(5000),
    }),
};
exports.getContacts = {
    query: joi_1.default.object().keys({
        page: joi_1.default.number().integer().min(1).default(1),
        limit: joi_1.default.number().integer().min(1).max(100).default(10),
        search: joi_1.default.string().allow("").optional(),
        status: joi_1.default.string().allow("").optional(),
        inquiryType: joi_1.default.string().allow("").optional(),
    }),
};
exports.getContactById = {
    params: joi_1.default.object().keys({
        contactId: joi_1.default.string().custom(custom_validation_1.objectId).required(),
    }),
};
exports.updateContact = {
    params: joi_1.default.object().keys({
        contactId: joi_1.default.string().custom(custom_validation_1.objectId).required(),
    }),
    body: joi_1.default.object()
        .keys({
        status: joi_1.default.string().valid("pending", "in-review", "resolved", "archived").optional(),
        adminNotes: joi_1.default.string().allow("").optional().max(3000),
    })
        .min(1),
};
exports.deleteContact = {
    params: joi_1.default.object().keys({
        contactId: joi_1.default.string().custom(custom_validation_1.objectId).required(),
    }),
};
