import z from "zod";

export const WithId = z.object({
    _id: z.string().optional()
})

export type WithId = z.infer<typeof WithId>;