import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import * as blogService from "./blog.service";

export const getPublishedBlogs = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, category, tag } = req.query;
  const result = await blogService.getPublishedBlogs({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 9,
    search: search as string,
    category: category as string,
    tag: tag as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getBlogBySlug(req.params["slug"] as string);
  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getCategories = catchAsync(async (_req: Request, res: Response) => {
  const categories = await blogService.getCategories();
  res.status(httpStatus.OK).send({
    status: "success",
    data: { categories },
  });
});

export const getAdminBlogs = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, search, category, status } = req.query;
  const result = await blogService.getAllAdminBlogs({
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 15,
    search: search as string,
    category: category as string,
    status: status as string,
  });

  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const getAdminBlog = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getBlogById(req.params["blogId"] as string);
  res.status(httpStatus.OK).send({
    status: "success",
    data: result,
  });
});

export const createBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await blogService.createBlog(req.body);
  res.status(httpStatus.CREATED).send({
    status: "success",
    data: { blog },
  });
});

export const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blog = await blogService.updateBlog(
    req.params["blogId"] as string,
    req.body
  );
  res.status(httpStatus.OK).send({
    status: "success",
    data: { blog },
  });
});

export const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  await blogService.deleteBlog(req.params["blogId"] as string);
  res.status(httpStatus.NO_CONTENT).send();
});

