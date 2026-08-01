import z from "zod";
import { CapColor as CapColorSchema } from "./CapColor.zod";

export const CapColors = z.record(z.string(), CapColorSchema);

export type CapColors = z.infer<typeof CapColors>