import { Document, Model } from "mongoose";

export type InquiryType = "general" | "sales" | "security" | "enterprise" | "support" | "partnership";
export type ContactStatus = "pending" | "in-review" | "resolved" | "archived";

export interface IContact {
  name: string;
  email: string;
  company?: string;
  role?: string;
  phone?: string;
  inquiryType: InquiryType;
  subject: string;
  message: string;
  status: ContactStatus;
  adminNotes?: string;
  respondedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IContactDoc extends IContact, Document {}

export interface IContactModel extends Model<IContactDoc> {}

export interface IContactFilter {
  page?: number;
  limit?: number;
  search?: string;
  inquiryType?: string;
  status?: string;
  sortBy?: string;
}

