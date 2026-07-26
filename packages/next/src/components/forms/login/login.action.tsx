"use server";

import { redirect } from "next/navigation";
import { LoginFormState } from "./LoginForm.component";
import { User, UserWithPassword } from "@/src/model";
import { authUser } from "@/src/mongo/user.mongo";
import { jwtSign } from "@/src/lib";
import { cookies } from "next/headers";
import { COOKIE_AUTH_TOKEN_NAME } from "@/src/props";

async function parseUserFromFormData(formData: FormData): Promise<UserWithPassword> {
    const unparsedUser = Object.fromEntries(formData.entries());
    return UserWithPassword.parse(unparsedUser);
}


export async function login(_initialState: LoginFormState, formData: FormData): Promise<LoginFormState> {
    try {
        const user2auth = await parseUserFromFormData(formData);
        const user = await authUser(user2auth.email, user2auth.password);

        if (!user) return { wrongCredentials: true }

        if (user) {
            const token = await jwtSign(user);
            const cookieStore = await cookies();
            cookieStore.set(COOKIE_AUTH_TOKEN_NAME, token, { maxAge: 60 * 60 * 24 * 7, path: '/' });
        }
    } catch (e) {
        console.error(e);
        return { error: true }
    }
    redirect('/admin')
}