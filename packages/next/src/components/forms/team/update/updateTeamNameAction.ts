"use server"

import { auth } from "@/src/lib";
import { UpdateTeamNameFormStateProps } from "./UpdateTeamNameForm";
import { MongoObjectId } from "@/src/model";
import z from "zod";
import { redirect } from "next/navigation";
import { updateTeam } from "@/src/mongo/team.mongo";
import { revalidatePath } from "next/cache";

async function getData(formData: FormData) {
    const obj = Object.fromEntries(formData);
    const { id, name } = obj;

    return {
        id: MongoObjectId.parse(id),
        name: z.string().min(3, "Teamname zu kurz").parse(name),
        lowerName: z.string().min(3).toLowerCase().parse(name)
    }
}

export async function updateTeamNameAction(_initialState: UpdateTeamNameFormStateProps, formData: FormData): Promise<UpdateTeamNameFormStateProps> {
    const user = await auth();

    let id;

    try {
        const data = await getData(formData);
        id = data.id;
        const result = await updateTeam(id, {
            name: data.name,
            nameLower: data.lowerName
        })
        if(result.modifiedCount <= 0) return {errors: ['Wahrscheinlich wurde das Team bereits gelöscht!']}
    } catch(e) {
        console.log(e);
        return {errors: ['Teamname wahrscheinlich bereit vergeben!']}
    }
    const path = `/admin/teams/${id.toString()}`;
    revalidatePath(path);
    redirect(path);
}