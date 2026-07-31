"use server"

import { HEADER_USER_NAME } from "@/src/props";
import { headers } from "next/headers";
import React from "react";
import { getLogin } from "./getLogin.function";
import { findUser } from "@/src/mongo/user.mongo";

async function isAdminRaw(): Promise<boolean> {
    const email = await getLogin();
    if (!email) { return false }
    const user = await findUser(email);
    if (!user) { return false }
    return !!user.isAdmin;
}

export const isAdmin = React.cache(isAdminRaw)