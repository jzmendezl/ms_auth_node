import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET || "SecretKey";
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

