import { Document, Model } from "mongoose";

export interface IBlogAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: IBlogAuthor;
  readTimeMinutes: number;
  status: "published" | "draft";
  featured: boolean;
  views: number;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: Date;
}

export interface IBlogDoc extends IBlog, Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogModel extends Model<IBlogDoc> {}

export interface IBlogFilter {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  status?: string;
  sortBy?: string;
}

