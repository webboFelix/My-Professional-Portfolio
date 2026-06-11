import { Query } from "node-appwrite";
import { databases, DATABASE_ID } from "../config/appwrite.js";

// Helper to add timeout to async operations
function withTimeout(promise, timeoutMs = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`Operation timeout after ${timeoutMs}ms`)),
        timeoutMs,
      ),
    ),
  ]);
}

/** Quick peek — returns true when the collection has zero documents */
export async function isCollectionEmpty(collectionId) {
  console.log(`📋 Checking if collection "${collectionId}" is empty...`);
  try {
    const peek = await withTimeout(
      databases.listDocuments(DATABASE_ID, collectionId, [Query.limit(1)]),
      5000,
    );
    const isEmpty = peek.total === 0;
    console.log(
      `✅ Collection "${collectionId}" has ${peek.total} documents (empty: ${isEmpty})`,
    );
    return isEmpty;
  } catch (err) {
    console.error(
      `❌ Error checking collection "${collectionId}":`,
      err.message,
    );
    throw err;
  }
}

/** Return total document count without fetching all rows */
export async function getCollectionTotal(collectionId) {
  console.log(`🔢 Getting total count for collection "${collectionId}"...`);
  try {
    const peek = await withTimeout(
      databases.listDocuments(DATABASE_ID, collectionId, [Query.limit(1)]),
      5000,
    );
    console.log(`✅ Collection "${collectionId}" total: ${peek.total}`);
    return peek.total;
  } catch (err) {
    console.error(`❌ Error getting total for "${collectionId}":`, err.message);
    throw err;
  }
}

/**
 * List documents safely: returns [] immediately when the collection is empty,
 * avoiding unnecessary (and sometimes failing) filtered queries.
 */
export async function listCollection(collectionId, extraQueries = []) {
  console.log(`📚 Listing documents from "${collectionId}"...`);
  try {
    if (await isCollectionEmpty(collectionId)) {
      console.log(`⚪ Collection "${collectionId}" is empty, returning []`);
      return [];
    }

    console.log(`📥 Fetching documents from "${collectionId}"...`);
    const response = await withTimeout(
      databases.listDocuments(DATABASE_ID, collectionId, extraQueries),
      5000,
    );
    console.log(
      `✅ Fetched ${response.documents.length} documents from "${collectionId}"`,
    );
    return response.documents;
  } catch (err) {
    console.error(`❌ Error listing "${collectionId}":`, err.message);
    throw err;
  }
}

/** Find a single document by slug field (in-memory filter — safe for small collections) */
export async function findBySlug(collectionId, slug) {
  console.log(`🔍 Finding "${slug}" in "${collectionId}"...`);
  try {
    if (await isCollectionEmpty(collectionId)) {
      console.log(`⚪ Collection "${collectionId}" empty, no slug match`);
      return null;
    }
    const docs = await listCollection(collectionId);
    const doc = docs.find((d) => d.slug === slug) ?? null;
    if (doc) {
      console.log(`✅ Found slug "${slug}" in "${collectionId}"`);
    } else {
      console.log(`❌ Slug "${slug}" not found in "${collectionId}"`);
    }
    return doc;
  } catch (err) {
    console.error(`❌ Error finding slug "${slug}":`, err.message);
    throw err;
  }
}

export { Query };
