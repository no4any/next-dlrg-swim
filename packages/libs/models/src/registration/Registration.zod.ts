import {z} from "zod";
import { RegistrationType } from "./RegistrationType.zod.ts";

export const Registration = z.object({ 
    type: RegistrationType,
    email: z.email().optional(),
});

export type Registration = z.infer<typeof Registration>;