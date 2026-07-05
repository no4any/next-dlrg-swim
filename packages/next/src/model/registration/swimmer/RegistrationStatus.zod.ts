import z from "zod";

export const RegistrationStatus = z.enum([
    "ANNOUNCED",
    "REGISTERED",
    "FINISHED"
])

export type RegistrationStatus = z.infer<typeof RegistrationStatus>;