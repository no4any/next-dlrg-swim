"use server"

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function redirectAction(path: string) {
    revalidatePath(path);
    redirect(path);
}