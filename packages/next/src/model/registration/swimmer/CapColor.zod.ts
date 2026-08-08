import { z } from "zod";

export const CapColor = z.enum([
    "RED",
    "ORANGE",
    "GREEN",
    "YELLOW",
    "BLUE",
    "WHITE"
], {error: "Die Kappenfarbe steht nicht zur Verfügung!"});

export type CapColor = z.infer<typeof CapColor>;