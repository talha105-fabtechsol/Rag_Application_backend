"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 254,
    },
    company: {
        type: String,
        trim: true,
        default: "",
        maxlength: 200,
    },
    role: {
        type: String,
        trim: true,
        default: "",
        maxlength: 120,
    },
    phone: {
        type: String,
        trim: true,
        default: "",
        maxlength: 50,
    },
    inquiryType: {
        type: String,
        enum: ["general", "sales", "security", "enterprise", "support", "partnership"],
        default: "general",
        index: true,
    },
    subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
    },
    status: {
        type: String,
        enum: ["pending", "in-review", "resolved", "archived"],
        default: "pending",
        index: true,
    },
    adminNotes: {
        type: String,
        trim: true,
        default: "",
        maxlength: 3000,
    },
    respondedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ inquiryType: 1, createdAt: -1 });
contactSchema.index({ email: 1 });
const Contact = mongoose_1.default.model("Contact", contactSchema);
exports.default = Contact;
