"use server"

import { auth } from "@/src/lib";
import { removeCap } from "@/src/mongo/swimmer.mongo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeCapAction(id: string) {
    await auth();
    await removeCap(id)
    revalidatePath(`/admin`);
    redirect(`/admin/swimmers/${id}`);
}