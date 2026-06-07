import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../../data');

const collections = {
  posts: 'posts.json',
  labs: 'labs.json',
  projects: 'projects.json',
  logs: 'logs.json',
  messages: 'messages.json',
};

async function readCollection(name) {
  const file = collections[name];
  if (!file) throw new Error(`Unknown collection: ${name}`);
  const raw = await fs.readFile(path.join(DATA_DIR, file), 'utf-8');
  return JSON.parse(raw);
}

async function writeCollection(name, data) {
  const file = collections[name];
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), 'utf-8');
}

export const memoryStore = {
  getAll: readCollection,
  setAll: writeCollection,
};
