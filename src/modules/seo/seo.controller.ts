import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as seoService from "./seo.service";

export const getSitemapXml = catchAsync(async (_req: Request, res: Response) => {
  const xml = await seoService.generateSitemapXml();
  res.header("Content-Type", "application/xml; charset=utf-8");
  res.header("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(xml);
});

export const getRobotsTxt = catchAsync(async (_req: Request, res: Response) => {
  const robots = seoService.generateRobotsTxt();
  res.header("Content-Type", "text/plain; charset=utf-8");
  res.header("Cache-Control", "public, max-age=86400");
  res.status(200).send(robots);
});

