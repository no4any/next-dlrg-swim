"use server"

import { redirect } from "next/navigation";
import { ChangePasswordFormState } from "./ChangePasswordForm.component";
import { ZodError } from "zod";
import { getLogin } from "@/src/lib";
import { PasswordString } from "@/src/model";
import { authUser, updateUserPassword } from "@/src/mongo/user.mongo";

type NewPasswordCredentials = {
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string
}

function getFormData(formData: FormData): NewPasswordCredentials {
    return {
        oldPassword: formData.get('oldPassword')?.toString() ?? '',
        newPassword: PasswordString.parse(formData.get('newPassword')?.toString()),
        newPasswordConfirm: formData.get('newPasswordConfirm')?.toString() ?? ''
    }
}


export async function changePassword(_initialState: ChangePasswordFormState, formData: FormData): Promise<ChangePasswordFormState> {
    const username = await getLogin();
    if (!username) redirect('/login');
    try {
        const credentials = getFormData(formData);
        if (credentials.newPassword !== credentials.newPasswordConfirm) {
            return {
                passwordsNotIdentical: true
            }
        }
        const user = await authUser(username, credentials.oldPassword)
        if(!user) {
            return {
                oldPasswordWrong: true
            }
        }
        const success = await updateUserPassword(username, credentials.newPassword);
        if(!success) {
            return {
                unknownError: true
            }
        }
    } catch (e) {
        if (e instanceof ZodError) {
            return {
                issues: e.issues.map((issue) => issue.message)
            }
        }
        return {
            unknownError: true
        }
    }
    redirect('/admin/user')
}