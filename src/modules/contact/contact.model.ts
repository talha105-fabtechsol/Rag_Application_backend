import mongoose from "mongoose";
import { IContactDoc, IContactModel } from "./contact.interfaces";

const contactSchema = new mongoose.Schema<IContactDoc, IContactModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ inquiryType: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

const Contact = mongoose.model<IContactDoc, IContactModel>("Contact", contactSchema);

export default Contact;

