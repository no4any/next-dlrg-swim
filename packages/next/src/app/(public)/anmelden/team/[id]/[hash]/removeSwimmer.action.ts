"use server"

import { validateHash } from "@/src/lib-server-only";
import { deleteManagedSwimmer } from "@/src/mongo/swimmer.mongo";
import { getTeam } from "@/src/mongo/team.mongo";
import { redirect } from "next/navigation";

export async function removeSwimmer(swimmerIdToDelete: string, teamId: string, teamHash: string) {
    if(!await validateHash(teamId, teamHash)) return;
    const team = await getTeam(teamId);
    const swimmersCount = (team?.swimmers ?? []).filter((swimmer) => swimmer._id?.toString() === swimmerIdToDelete).length;
    if(swimmersCount) await deleteManagedSwimmer(swimmerIdToDelete);
    redirect(`/anmelden/team/${teamId}/${teamHash}`);
}