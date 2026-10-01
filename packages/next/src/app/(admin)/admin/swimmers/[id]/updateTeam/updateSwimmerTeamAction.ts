"use server"

import { auth } from "@/src/lib";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UpdateSwimmerTeamFormState } from "./UpdateSwimmerTeamForm";
import z, { ZodError } from "zod";
import { MongoObjectId } from "@/src/model";
import { updateSwimmer } from "@/src/mongo/swimmer.mongo";

const DTO = z.object({
    id: MongoObjectId,
    teamId: MongoObjectId
})

export async function updateSwimmerTeamAction(_initialData: unknown, formData: FormData): Promise<UpdateSwimmerTeamFormState> {
    await auth();
    let id;
    try {
        const obj = Object.fromEntries(formData);
        console.log(obj)
        id = obj.id.toString();
        if(obj.teamId === "0") {
            const result = await updateSwimmer(MongoObjectId.parse(obj.id), {
                teamId: null
            })
            if(result.modifiedCount <= 0) return {errors: ["Keine Änderung"]}
        } else {
            const parsed = DTO.parse(Object.fromEntries(formData));
            const result = await updateSwimmer(parsed.id, {
                teamId: parsed.teamId
            })
            if(result.modifiedCount <= 0) return {errors: ["Keine Änderung"]}
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                errors: e.issues.map((issue) => issue.message)
            }
        }
        console.log(e);
        return { errors: ['Unbekannter fehler!'] }
    }

    revalidatePath('/admin');
    redirect(`/admin/swimmers/${id.toString()}`);
}