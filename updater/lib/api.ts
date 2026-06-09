import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

/** List endpoints — include drafts/unpublished items in admin panel */
export const listAll = (path: string) =>
  api.get(path, { params: { all: "true" } });

export default api;
