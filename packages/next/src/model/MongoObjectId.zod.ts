import { z } from "zod";

export const MongoObjectId = z.string().regex(/^[0-9a-fA-F]{24}$/).transform((val) => {
    if (typeof window === 'undefined') {
      const { ObjectId } = require('mongodb');
      return val ? new ObjectId(val) : val;
    }
    return val;
});

export type MongoObjectId = z.infer<typeof MongoObjectId>;