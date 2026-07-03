import z from "zod";

export const RegistrationStatus = z.enum([
    "ANNOUNCED",
    "REGISTERED",
    "FINISHED"
])
