import { Query } from "node-appwrite";
import { databases, DATABASE_ID } from "../config/appwrite.js";

/** Quick peek — returns true when the collection has zero documents */
export async function isCollectionEmpty(collectionId) {
  const peek = await databases.listDocuments(DATABASE_ID, collectionId, [
    Query.limit(1),
  ]);
  return peek.total === 0;
}

/** Return total document count without fetching all rows */
export async function getCollectionTotal(collectionId) {
  const peek = await databases.listDocuments(DATABASE_ID, collectionId, [
    Query.limit(1),
  ]);
  return peek.total;
}

/**
 * List documents safely: returns [] immediately when the collection is empty,
 * avoiding unnecessary (and sometimes failing) filtered queries.
 */
export async function listCollection(collectionId, extraQueries = []) {
  if (await isCollectionEmpty(collectionId)) return [];

  const response = await databases.listDocuments(
    DATABASE_ID,
    collectionId,
    extraQueries,
  );
  return response.documents;
}

/** Find a single document by slug field (in-memory filter — safe for small collections) */
export async function findBySlug(collectionId, slug) {
  if (await isCollectionEmpty(collectionId)) return null;
  const docs = await listCollection(collectionId);
  return docs.find((d) => d.slug === slug) ?? null;
}

export { Query };
