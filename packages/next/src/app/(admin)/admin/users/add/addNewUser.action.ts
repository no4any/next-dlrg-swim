"use server"

import z, { ZodError } from "zod";
import { AddUserFormState } from "./AddUserForm.component";
import { PasswordString } from "@/src/model";
import { isAdmin } from "@/src/lib/login/isAdmin.function";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addUser, findUser } from "@/src/mongo/user.mongo";

async function getFormData(formData: FormData) {
    return {
        email: z.email('E-Mail ist nicht im korrekten Format.').trim().toLowerCase().parse(formData.get('email')?.toString()),
        password: PasswordString.parse(formData.get('password')?.toString()),
        isAdmin: formData.get('type')?.toString() === 'admin'
    }
}

export async function addNewUser(_initState: AddUserFormState, formData: FormData): Promise<AddUserFormState> {
    if (!await isAdmin()) return { unknownError: true }
    let email = '';
    try {
        const data = await getFormData(formData);
        email = data.email;
        await addUser(data.email, data.password, data.isAdmin)
    } catch (e) {
        if (e instanceof ZodError) {
            return { issues: e.issues.map((issue) => issue.message) }
        }
        if (await findUser(email)) {
            return { emailAlreadyExists: true }
        }
        return { unknownError: true }
    }
    revalidatePath('/admin/users');
    redirect('/admin/users');
}