"use server"

import { COOKIE_AUTH_TOKEN_NAME } from "@/src/props";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_AUTH_TOKEN_NAME);
    redirect('/login');
}