import Joi from "joi";
import { objectId } from "../validate/custom.validation";

export const submitContact = {
  body: Joi.object().keys({
    name: Joi.string().required().trim().max(120),
    email: Joi.string().required().email({ tlds: { allow: false } }).trim().max(254),
    company: Joi.string().allow("").optional().max(200),
    role: Joi.string().allow("").optional().max(120),
    phone: Joi.string().allow("").optional().max(50),
    inquiryType: Joi.string()
      .valid("general", "sales", "security", "enterprise", "support", "partnership")
      .default("general"),
    subject: Joi.string().required().trim().max(300),
    message: Joi.string().required().trim().max(5000),
  }),
};

export const getContacts = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    search: Joi.string().allow("").optional(),
    status: Joi.string().allow("").optional(),
    inquiryType: Joi.string().allow("").optional(),
  }),
};

export const getContactById = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId).required(),
  }),
};

export const updateContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object()
    .keys({
      status: Joi.string().valid("pending", "in-review", "resolved", "archived").optional(),
      adminNotes: Joi.string().allow("").optional().max(3000),
    })
    .min(1),
};

export const deleteContact = {
  params: Joi.object().keys({
    contactId: Joi.string().custom(objectId).required(),
  }),
};

