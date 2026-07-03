import {z} from "zod";

export const RegistrationType = z.enum(["TEAM", "INDIVIDUAL", "MANAGED"]);

export type RegistrationType = z.infer<typeof RegistrationType>;