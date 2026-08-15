"use server"

import { redirect } from "next/navigation";
import { CommentsFormProps } from "./CommentsForm.component";
import z, { ZodError } from "zod";
import { auth } from "@/src/lib";
import { revalidatePath } from "next/cache";
import { addCommentToTeam } from "@/src/mongo/team.mongo";
import { addCommentToSwimmer } from "@/src/mongo/swimmer.mongo";

async function extractData(formData: FormData) {
    return {
        id: z.string().regex(/^[0-9a-fA-F]{24}$/, "ID ist im falschen Format.").parse(formData.get('id')?.toString()),
        message: z.string().trim().min(3, { error: "Nachricht ist zu kurz (mindestens 3 Zeichen)" }).max(512, { error: "Kommentar ist zu lang (maximal 512 Zeichen)" }).parse(formData.get('message')),
        type: z.enum(["TEAM", "SWIMMER"], { error: "Kein passender Typ." }).parse(formData.get('type')?.toString())
    }
}

export async function createComment(_initialState: CommentsFormProps, formData: FormData): Promise<CommentsFormProps> {
    const username = await auth();
    let path = '/admin';
    try {
        const data = await extractData(formData);
        if(data.type === 'SWIMMER') {
            await addCommentToSwimmer(data.id, username, data.message);
        } else {
            await addCommentToTeam(data.id, username, data.message);
        }
        path = `/admin/${data.type === 'SWIMMER' ? 'swimmers' : 'teams'}/${data.id}`;
    } catch (e) {
        if(e instanceof ZodError) {
            return { errors: e.issues.map(issue => issue.message)}
        }
        return {unkownError: true}
    }
    revalidatePath(path, 'layout');
    redirect(path);
}