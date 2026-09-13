import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dns from "dns";
import dotenv from "dotenv";
import path from "path";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.join(__dirname, "../.env") });

const mongoUri =
  process.env["MONGODB_URL"] ||
  "mongodb+srv://talhariaz:talhariaz@cluster0.k2itfyk.mongodb.net/Rag_Application?retryWrites=true&w=majority";

async function createSuperAdmin() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB.");

  const usersCollection = mongoose.connection.collection("users");
  const email = "admin@techbreta.com";
  const plainPassword = "talha@786";
  const hashedPassword = await bcrypt.hash(plainPassword, 8);

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    console.log(`User ${email} already exists. Updating role to superadmin and resetting password...`);
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          role: "superadmin",
          isEmailVerified: true,
          status: "active",
          providers: ["local"],
          updatedAt: new Date(),
        },
      }
    );
    console.log("Superadmin updated successfully.");
  } else {
    console.log(`Creating new superadmin ${email}...`);
    const result = await usersCollection.insertOne({
      name: "Super Admin",
      email,
      password: hashedPassword,
      role: "superadmin",
      isEmailVerified: true,
      status: "active",
      providers: ["local"],
      isDeleted: false,
      isOnline: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("Superadmin created successfully with ID:", result.insertedId);
  }

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

createSuperAdmin().catch((err) => {
  console.error("Error creating superadmin:", err);
  process.exit(1);
});

