import "dotenv/config";

const e = process.env;

export const DB_NAME = e.DB_NAME;
export const DB_HOST = e.DB_HOST;
export const DB_PORT = Number(e.DB_PORT);
export const DB_USER = e.DB_USER;
export const DB_PASSWORD = e.DB_PASSWORD;

export const DB_URL = e.DB_URL as string;

export const PORT = Number(e.PORT);