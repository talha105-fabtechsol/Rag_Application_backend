import Contact from "./contact.model";
import { IContact, IContactFilter } from "./contact.interfaces";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

/**
 * Create a new public contact inquiry
 */
export const createContact = async (data: Partial<IContact>) => {
  const contact = await Contact.create({
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

/**
 * Get paginated inquiries for admin dashboard
 */
export const getAdminContacts = async (filter: IContactFilter) => {
  const page = Math.max(1, Number(filter.page) || 1);
  const limit = Math.max(1, Math.min(100, Number(filter.limit) || 10));
  const skip = (page - 1) * limit;

  const matchQuery: any = {};

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
    Contact.find(matchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Contact.countDocuments(matchQuery),
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

/**
 * Get single inquiry by ID
 */
export const getContactById = async (id: string) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new ApiError("Contact inquiry not found", httpStatus.NOT_FOUND);
  }
  return contact;
};

/**
 * Update contact inquiry status or admin notes
 */
export const updateContact = async (
  id: string,
  updateData: { status?: string; adminNotes?: string }
) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new ApiError("Contact inquiry not found", httpStatus.NOT_FOUND);
  }

  if (updateData.status) {
    contact.status = updateData.status as any;
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

/**
 * Delete inquiry
 */
export const deleteContact = async (id: string) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new ApiError("Contact inquiry not found", httpStatus.NOT_FOUND);
  }
  return contact;
};

/**
 * Get inquiry statistics for overview counters
 */
export const getContactStats = async () => {
  const [total, pending, inReview, resolved] = await Promise.all([
    Contact.countDocuments(),
    Contact.countDocuments({ status: "pending" }),
    Contact.countDocuments({ status: "in-review" }),
    Contact.countDocuments({ status: "resolved" }),
  ]);

  return {
    total,
    pending,
    inReview,
    resolved,
  };
};

