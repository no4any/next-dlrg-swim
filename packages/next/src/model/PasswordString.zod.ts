import z from "zod";

export const PasswordString = z
    .string({ error: "Passwort ist erforderlich" })
    .min(8, "Das neue Passwort muss mindestens 8 Zeichen lang sein")
    .max(100, "Das neue Passwort ist zu lang")
    .regex(/[A-Z]/, "Das neue Passwort muss mindestens ein Großbuchstabe erforderlich")
    .regex(/[a-z]/, "Das neue Passwort muss mindestens ein Kleinbuchstabe erforderlich")
    .regex(/[0-9]/, "Das neue Passwort muss mindestens eine Zahl erforderlich")
    .regex(/[^A-Za-z0-9]/, "Das neue Passwort muss mindestens ein Sonderzeichen erforderlich");

export type PasswordString = z.infer<typeof PasswordString>;