// src/models/setupCollections.js
import { databases, DATABASE_ID, ID } from "../config/appwrite.js";

async function setupDatabase() {
  // 1. Create database (if not exists)
  try {
    await databases.get(DATABASE_ID);
    console.log(`✅ Using existing database: ${DATABASE_ID}`);
  } catch (err) {
    if (err.code === 404) {
      console.log(
        `Database ${DATABASE_ID} not found – please create it manually or use an existing ID.`,
      );
      process.exit(1);
    }
    throw err;
  }
  // 2. Collection definitions
  const collections = [
    {
      name: "posts",
      id: "posts",
      attributes: [
        { key: "title", type: "string", size: 256, required: true },
        {
          key: "slug",
          type: "array",
          arrayType: "string",
          required: true,
        },
        { key: "date", type: "datetime", required: true },
        { key: "content", type: "string", size: 1000000, required: true },
        { key: "excerpt", type: "string", size: 500, required: true },
        { key: "wordCount", type: "integer", required: true },
        { key: "readTime", type: "integer", required: true },
        { key: "tags", type: "array", arrayType: "string", required: false },
        { key: "published", type: "boolean", required: true },
        { key: "coverImage", type: "string", size: 500, required: false },
      ],
    },
    {
      name: "labs",
      id: "labs",
      attributes: [
        { key: "title", type: "string", size: 256, required: true },
        {
          key: "slug",
          type: "string",
          size: 256,
          required: true,
          unique: true,
        },
        { key: "date", type: "datetime", required: true },
        { key: "content", type: "string", size: 1000000, required: true },
        { key: "difficulty", type: "string", size: 50, required: true },
        { key: "platform", type: "string", size: 50, required: true },
        { key: "tags", type: "array", arrayType: "string", required: false },
        { key: "published", type: "boolean", required: true },
      ],
    },
    {
      name: "projects",
      id: "projects",
      attributes: [
        { key: "title", type: "string", size: 256, required: true },
        { key: "description", type: "string", size: 2000, required: true },
        { key: "githubLink", type: "string", size: 500, required: false },
        { key: "liveLink", type: "string", size: 500, required: false },
        {
          key: "technologies",
          type: "array",
          arrayType: "string",
          required: true,
        },
        { key: "date", type: "datetime", required: true },
      ],
    },
    {
      name: "contacts",
      id: "contacts",
      attributes: [
        { key: "name", type: "string", size: 256, required: true },
        { key: "email", type: "string", size: 256, required: true },
        { key: "message", type: "string", size: 5000, required: true },
        { key: "date", type: "datetime", required: true },
        { key: "read", type: "boolean", required: true, default: false },
      ],
    },
    {
      name: "videos",
      id: "videos",
      attributes: [
        { key: "title", type: "string", size: 256, required: true },
        {
          key: "slug",
          type: "string",
          size: 256,
          required: true,
          unique: true,
        },
        { key: "description", type: "string", size: 1000, required: true },
        { key: "cloudinaryUrl", type: "string", size: 500, required: true },
        {
          key: "cloudinaryPublicId",
          type: "string",
          size: 200,
          required: true,
        },
        { key: "duration", type: "integer", required: false },
        { key: "thumbnailUrl", type: "string", size: 500, required: false },
        { key: "tags", type: "array", arrayType: "string", required: false },
        { key: "date", type: "datetime", required: true },
        { key: "published", type: "boolean", required: true },
      ],
    },
  ];

  // Helper to create an attribute with fallback for arrays
  async function addAttribute(collectionId, attr) {
    try {
      if (attr.type === "array") {
        // Try to use native array attribute if available
        if (typeof databases.createArrayAttribute === "function") {
          await databases.createArrayAttribute(
            DATABASE_ID,
            collectionId,
            attr.key,
            attr.arrayType,
            attr.required,
          );
        } else {
          // Fallback: store array as JSON string
          await databases.createStringAttribute(
            DATABASE_ID,
            collectionId,
            attr.key,
            2000,
            attr.required,
          );
          console.log(
            `  ⚠️  ${attr.key} stored as JSON string (array method not supported)`,
          );
        }
      } else {
        switch (attr.type) {
          case "string":
            await databases.createStringAttribute(
              DATABASE_ID,
              collectionId,
              attr.key,
              attr.size,
              attr.required,
              undefined,
              attr.unique === true,
            );
            break;
          case "datetime":
            await databases.createDatetimeAttribute(
              DATABASE_ID,
              collectionId,
              attr.key,
              attr.required,
            );
            break;
          case "integer":
            await databases.createIntegerAttribute(
              DATABASE_ID,
              collectionId,
              attr.key,
              attr.required,
            );
            break;
          case "boolean":
            await databases.createBooleanAttribute(
              DATABASE_ID,
              collectionId,
              attr.key,
              attr.required,
            );
            break;
        }
      }
      console.log(`  ➕ Attribute ${attr.key} added to ${collectionId}`);
    } catch (err) {
      if (err.code !== 409) {
        console.warn(`  ⚠️ Could not add ${attr.key}: ${err.message}`);
      } else {
        console.log(`  ℹ️ Attribute ${attr.key} already exists`);
      }
    }
  }

  // 3. Loop through collections and create them
  for (const col of collections) {
    try {
      await databases.createCollection(DATABASE_ID, col.id, col.name);
      console.log(`✅ Collection ${col.id} created`);
    } catch (err) {
      if (err.code !== 409) throw err;
      console.log(`ℹ️ Collection ${col.id} already exists`);
    }

    // Add each attribute
    for (const attr of col.attributes) {
      await addAttribute(col.id, attr);
    }
  }

  console.log("🎉 Database setup complete!");
}

setupDatabase().catch(console.error);

//! Run this file once to set up the database and collections. It will create the "Cyber Portfolio DB" database and the "posts", "labs", "projects", "contacts", and "videos" collections with their respective attributes. If you run it again, it will skip existing collections and attributes without throwing errors.
//mag: node src/models/setupCollections.js
