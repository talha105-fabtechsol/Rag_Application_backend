import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import Blog from "../src/modules/blog/blog.model";

// Configure DNS for MongoDB Atlas SRV resolution
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.join(__dirname, "../.env") });

const mongoUri =
  process.env["MONGODB_URL"] ||
  "mongodb+srv://talhariaz:talhariaz@cluster0.k2itfyk.mongodb.net/Rag_Application?retryWrites=true&w=majority";

async function main() {
  console.log("================================================================================");
  console.log("   RagAI: Seeding Expanded Long-Form Technical Blogs & Descriptions");
  console.log("================================================================================");
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(mongoUri);
  console.log("Connected successfully to MongoDB Atlas.");

  const jsonPath = path.join(__dirname, "blogsData.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const allBlogs = JSON.parse(rawData);

  console.log(`Loaded ${allBlogs.length} blogs from blogsData.json.`);

  for (const b of allBlogs) {
    const wordCount = b.content.trim().split(/\s+/).length;
    const computedReadTime = Math.max(1, Math.ceil(wordCount / 180));
    b.readTimeMinutes = computedReadTime;
    b.publishedAt = new Date(b.publishedAt);

    await Blog.findOneAndUpdate(
      { slug: b.slug },
      {
        $set: {
          title: b.title,
          slug: b.slug,
          excerpt: b.excerpt,
          content: b.content,
          coverImage: b.coverImage,
          category: b.category,
          tags: b.tags,
          author: b.author,
          readTimeMinutes: b.readTimeMinutes,
          status: b.status,
          featured: b.featured,
          seoTitle: b.seoTitle,
          seoDescription: b.seoDescription,
          publishedAt: b.publishedAt,
        },
      },
      { upsert: true, new: true }
    );

    console.log(
      `✓ Updated: [${b.slug}] Words: ${wordCount} | Chars: ${b.content.length} | ReadTime: ${b.readTimeMinutes}m`
    );
  }

  console.log("\n--------------------------------------------------------------------------------");
  console.log("Verifying updated database records in MongoDB Atlas...");
  const dbBlogs = await Blog.find({ status: "published" }).sort({ publishedAt: -1 });

  console.log(`Total published blogs in database: ${dbBlogs.length}`);
  console.table(
    dbBlogs.map((b) => ({
      Slug: b.slug,
      ExcerptChars: b.excerpt?.length || 0,
      SeoDescChars: b.seoDescription?.length || 0,
      ContentChars: b.content?.length || 0,
      ContentWords: b.content?.trim().split(/\s+/).length || 0,
      ReadTimeMin: b.readTimeMinutes,
    }))
  );

  await mongoose.disconnect();
  console.log("Database connection closed. All blogs successfully updated with expanded content!");
}

main().catch((err) => {
  console.error("Error executing seedExpandedBlogs:", err);
  process.exit(1);
});

