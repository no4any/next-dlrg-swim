import "server-only";

export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://mongo:mongo@localhost:27017";
export const SALT = process.env.SALT || 'salt';