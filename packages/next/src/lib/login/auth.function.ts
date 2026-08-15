"use server"

import { jwtValidate } from "@/src/lib-server-only/jwt";
import { findUser } from "@/src/mongo/user.mongo";
import { COOKIE_AUTH_TOKEN_NAME } from "@/src/props";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function auth(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_AUTH_TOKEN_NAME)?.value ?? "";
    if (!token) redirect(`/admin`);
    const tokenUser = await jwtValidate(token);
    if(!tokenUser) redirect(`/admin`);
    if(!await findUser(tokenUser.email)) redirect(`/admin`)
    return tokenUser.email;
}