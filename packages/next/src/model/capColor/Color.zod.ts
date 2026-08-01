import z from "zod";

export const Color = z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

export type Color = z.infer<typeof Color>;