"use server"

import { auth } from "@/src/lib";
import { ChangeTeamTypeFormState } from "./ChangeTeamTypeForm";
import { updateTeam } from "@/src/mongo/team.mongo";
import { MongoObjectId, TeamType } from "@/src/model";
import { ZodError } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function changeTeamTypeAction(_initialState: ChangeTeamTypeFormState, formData: FormData): Promise<ChangeTeamTypeFormState> {
    await auth();

    let id;

    try {
        id = formData.get("teamId")?.toString() ?? "";
        const teamId = MongoObjectId.parse(id);
        const teamType = TeamType.parse(formData.get("teamType")?.toString() ?? "");
        const result = await updateTeam(teamId, { teamType });

        if (result.modifiedCount <= 0) return { errors: ["Keine Änderung vorgenommen"] }
    } catch (e) {
        if(e instanceof ZodError) return { errors: e.issues.map((e) => e.message) }
        return { errors: ["Unbekannter Fehler beim Ändern"] }
    }

    revalidatePath('/admin');
    redirect(`/admin/teams/${id}`);
}