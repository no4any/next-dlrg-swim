import "server-only";

// Mongo parameters
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING ?? "mongodb://mongo:mongo@localhost:27017";

// Auth parameters
export const SALT = process.env.SALT ?? 'salt';

// Cookie names
export const COOKIE_AUTH_TOKEN_NAME = process.env.TOKEN_COOKIE_NAME ?? 'auth-token';

// Header names
export const HEADER_USER_NAME = process.env.HEADER_USER_NAME ?? 'user';

// Default user (on fresh setup)
export const DEFAULT_USER_EMAIL = process.env.DEFAULT_USER_EMAIL ?? 'default@user.com';
export const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD ?? "default123"