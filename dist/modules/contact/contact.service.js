"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactStats = exports.deleteContact = exports.updateContact = exports.getContactById = exports.getAdminContacts = exports.createContact = void 0;
const contact_model_1 = __importDefault(require("./contact.model"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
/**
 * Create a new public contact inquiry
 */
const createContact = async (data) => {
    const contact = await contact_model_1.default.create({
        name: data.name,
        email: data.email?.toLowerCase().trim(),
        company: data.company?.trim() || "",
        role: data.role?.trim() || "",
        phone: data.phone?.trim() || "",
        inquiryType: data.inquiryType || "general",
        subject: data.subject?.trim(),
        message: data.message?.trim(),
        status: "pending",
    });
    return contact;
};
exports.createContact = createContact;
/**
 * Get paginated inquiries for admin dashboard
 */
const getAdminContacts = async (filter) => {
    const page = Math.max(1, Number(filter.page) || 1);
    const limit = Math.max(1, Math.min(100, Number(filter.limit) || 10));
    const skip = (page - 1) * limit;
    const matchQuery = {};
    if (filter.status && filter.status !== "all") {
        matchQuery.status = filter.status;
    }
    if (filter.inquiryType && filter.inquiryType !== "all") {
        matchQuery.inquiryType = filter.inquiryType;
    }
    if (filter.search && filter.search.trim()) {
        const searchRegex = new RegExp(filter.search.trim(), "i");
        matchQuery.$or = [
            { name: searchRegex },
            { email: searchRegex },
            { company: searchRegex },
            { subject: searchRegex },
            { message: searchRegex },
        ];
    }
    const [contacts, totalResults] = await Promise.all([
        contact_model_1.default.find(matchQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        contact_model_1.default.countDocuments(matchQuery),
    ]);
    const totalPages = Math.ceil(totalResults / limit);
    return {
        results: contacts,
        page,
        limit,
        totalPages,
        totalResults,
    };
};
exports.getAdminContacts = getAdminContacts;
/**
 * Get single inquiry by ID
 */
const getContactById = async (id) => {
    const contact = await contact_model_1.default.findById(id);
    if (!contact) {
        throw new ApiError_1.default("Contact inquiry not found", http_status_1.default.NOT_FOUND);
    }
    return contact;
};
exports.getContactById = getContactById;
/**
 * Update contact inquiry status or admin notes
 */
const updateContact = async (id, updateData) => {
    const contact = await contact_model_1.default.findById(id);
    if (!contact) {
        throw new ApiError_1.default("Contact inquiry not found", http_status_1.default.NOT_FOUND);
    }
    if (updateData.status) {
        contact.status = updateData.status;
        if (updateData.status === "resolved" && !contact.respondedAt) {
            contact.respondedAt = new Date();
        }
    }
    if (typeof updateData.adminNotes === "string") {
        contact.adminNotes = updateData.adminNotes;
    }
    await contact.save();
    return contact;
};
exports.updateContact = updateContact;
/**
 * Delete inquiry
 */
const deleteContact = async (id) => {
    const contact = await contact_model_1.default.findByIdAndDelete(id);
    if (!contact) {
        throw new ApiError_1.default("Contact inquiry not found", http_status_1.default.NOT_FOUND);
    }
    return contact;
};
exports.deleteContact = deleteContact;
/**
 * Get inquiry statistics for overview counters
 */
const getContactStats = async () => {
    const [total, pending, inReview, resolved] = await Promise.all([
        contact_model_1.default.countDocuments(),
        contact_model_1.default.countDocuments({ status: "pending" }),
        contact_model_1.default.countDocuments({ status: "in-review" }),
        contact_model_1.default.countDocuments({ status: "resolved" }),
    ]);
    return {
        total,
        pending,
        inReview,
        resolved,
    };
};
exports.getContactStats = getContactStats;
