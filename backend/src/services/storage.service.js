import { v4 as uuidv4 } from 'uuid';
import { memoryStore } from '../db/memoryStore.js';

export async function listItems(collection) {
  return memoryStore.getAll(collection);
}

export async function getItem(collection, id) {
  const items = await memoryStore.getAll(collection);
  return items.find((item) => item.id === id) ?? null;
}

export async function createItem(collection, payload) {
  const items = await memoryStore.getAll(collection);
  const item = { id: uuidv4(), ...payload };
  items.push(item);
  await memoryStore.setAll(collection, items);
  return item;
}

export async function updateItem(collection, id, payload) {
  const items = await memoryStore.getAll(collection);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...payload, id };
  await memoryStore.setAll(collection, items);
  return items[index];
}

export async function deleteItem(collection, id) {
  const items = await memoryStore.getAll(collection);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) return false;
  await memoryStore.setAll(collection, filtered);
  return true;
}

export async function replaceAll(collection, items) {
  await memoryStore.setAll(collection, items);
  return items;
}
