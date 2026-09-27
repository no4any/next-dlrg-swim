import z from "zod"

export const Counter = z.object({
    _id: z.string(),
    count: z.number().min(1)
})

export type Counter = z.infer<typeof Counter>;