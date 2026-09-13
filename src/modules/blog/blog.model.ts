import mongoose from "mongoose";
import { IBlogDoc, IBlogModel } from "./blog.interfaces";

const blogAuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "RagAI Editorial Team",
    },
    role: {
      type: String,
      trim: true,
      default: "AI Architecture & Engineering",
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema<IBlogDoc, IBlogModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "RAG & AI",
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    author: {
      type: blogAuthorSchema,
      required: true,
      default: () => ({}),
    },
    readTimeMinutes: {
      type: Number,
      default: 5,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    seoTitle: {
      type: String,
      trim: true,
    },
    seoDescription: {
      type: String,
      trim: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, status: 1 });

const Blog = mongoose.model<IBlogDoc, IBlogModel>("Blog", blogSchema);

export default Blog;
