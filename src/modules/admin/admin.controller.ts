import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import * as adminService from "./admin.service";

export const getStats = catchAsync(async (_req: Request, res: Response) => {
  const stats = await adminService.getAdminStats();
  res.status(httpStatus.OK).send({
    status: "success",
    data: stats,
  });
});

export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, role, status, sortBy } = req.query;
  const result = await adminService.getAllUsers({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search as string,
    role: role as string,
    status: status as string,
    sortBy: sortBy as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getUserDetails(req.params["userId"] as string);
  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.updateUserStatus(
    req.params["userId"] as string,
    req.body
  );
  res.status(httpStatus.OK).send({
    status: "success",
    data: { user: result },
  });
});

export const getDocuments = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, fileType, status, userId, sortBy } = req.query;
  const result = await adminService.getAllDocuments({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search as string,
    fileType: fileType as string,
    status: status as string,
    userId: userId as string,
    sortBy: sortBy as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getDocumentDetails(
    req.params["documentId"] as string
  );
  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const deleteDocument = catchAsync(async (req: Request, res: Response) => {
  await adminService.deleteDocumentAdmin(req.params["documentId"] as string);
  res.status(httpStatus.NO_CONTENT).send();
});

export const getChats = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, chatType, userId, sortBy } = req.query;
  const result = await adminService.getAllChats({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
    search: search as string,
    chatType: chatType as string,
    userId: userId as string,
    sortBy: sortBy as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getChat = catchAsync(async (req: Request, res: Response) => {
  const result = await adminService.getChatDetails(req.params["chatId"] as string);
  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getImages = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, userId, sortBy } = req.query;
  const result = await adminService.getAllImages({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 12,
    search: search as string,
    userId: userId as string,
    sortBy: sortBy as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const deleteImage = catchAsync(async (req: Request, res: Response) => {
  await adminService.deleteImageAdmin(req.params["imageId"] as string);
  res.status(httpStatus.NO_CONTENT).send();
});

