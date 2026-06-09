import { Client, Databases, ID } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config();

const client = new Client();
client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

export { client, databases, DATABASE_ID, ID };
