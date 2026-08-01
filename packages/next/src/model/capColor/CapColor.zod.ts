import z from "zod";
import { Color } from "./Color.zod";

export const CapColor = z.object({
    name: z.string(),
    lightColor: Color,
    darkColor: Color
})

export type CapColor = z.infer<typeof CapColor>