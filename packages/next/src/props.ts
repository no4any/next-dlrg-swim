import "server-only";

// Global stuff
export const DOMAIN = process.env.DOMAIN ?? "localhost";

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

// SMTP parameters
export const SMTP_HOST = process.env.SMTP_HOST || "localhost";
export const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
export const SMTP_SECURE = SMTP_PORT === 465;
export const SMTP_USERNAME = process.env.SMTP_USERNAME || "";
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
export const SMTP_FROM = process.env.SMTP_FROM || '"[no-reply] DLRG-Gießen" <your@mail.de>';