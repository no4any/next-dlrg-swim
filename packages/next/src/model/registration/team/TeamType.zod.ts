import { z } from "zod";

export const TeamType = z.enum([
    "SCHWIMMVEREIN",
    "VEREIN",
    "FIRMA",
    "SONSTIGE"
]);

export type TeamType = z.infer<typeof TeamType>;