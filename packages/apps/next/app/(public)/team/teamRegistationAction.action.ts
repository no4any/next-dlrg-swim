"use server"

import { trpcClient } from "@next-dlrg-swim/trpc/client";
import { Team } from "../../../../../libs/models/src";
import { redirect } from "next/navigation";

export async function teamRegistrationAction(formData: FormData) {
    const obj = Object.fromEntries(formData);
    const teamReg = Team.parse({type:"TEAM", ...obj});
    trpcClient.registration.register.mutate(teamReg);
    redirect("/");
}