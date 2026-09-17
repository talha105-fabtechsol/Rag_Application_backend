import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import * as contactService from "./contact.service";

export const submitContact = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.createContact(req.body);
  res.status(httpStatus.CREATED).send({
    status: "success",
    message: "Your inquiry has been submitted successfully. Our enterprise engineering team will reach out shortly.",
    data: contact,
  });
});

export const getAdminContacts = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, status, inquiryType } = req.query;
  const result = await contactService.getAdminContacts({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search as string,
    status: status as string,
    inquiryType: inquiryType as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getContactStats = catchAsync(async (_req: Request, res: Response) => {
  const stats = await contactService.getContactStats();
  res.status(httpStatus.OK).send({
    status: "success",
    data: stats,
  });
});

export const getAdminContact = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.getContactById(req.params["contactId"] as string);
  res.status(httpStatus.OK).send({
    status: "success",
    data: contact,
  });
});

export const updateContact = catchAsync(async (req: Request, res: Response) => {
  const contact = await contactService.updateContact(
    req.params["contactId"] as string,
    req.body
  );
  res.status(httpStatus.OK).send({
    status: "success",
    message: "Inquiry updated successfully",
    data: contact,
  });
});

export const deleteContact = catchAsync(async (req: Request, res: Response) => {
  await contactService.deleteContact(req.params["contactId"] as string);
  res.status(httpStatus.OK).send({
    status: "success",
    message: "Inquiry deleted successfully",
  });
});

