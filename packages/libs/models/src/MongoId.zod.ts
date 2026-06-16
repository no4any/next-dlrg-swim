import z from "zod";

export const MongoId = z.union([
    z.string(),
    z.object({
        toString: z.function({
            output: z.string()
        })
    })
])

export type MongoId = z.infer<typeof MongoId>;