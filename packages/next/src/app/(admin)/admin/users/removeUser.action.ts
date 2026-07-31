"use server"

import { isAdmin } from "@/src/lib/login/isAdmin.function"
import { deleteUser } from "@/src/mongo/user.mongo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeUser(email: string) {
    const admin = await isAdmin();
    if(!admin) redirect('/admin');
    await deleteUser(email);
    revalidatePath('/admin/users');
    redirect('/admin/users');
}