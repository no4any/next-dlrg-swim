"use server"

import React from "react";
import { findUser } from "@/src/mongo/user.mongo";
import { auth } from "./auth.function";

async function isAdminRaw(): Promise<boolean> {
    const email = await auth();
    if (!email) { return false }
    const user = await findUser(email);
    if (!user) { return false }
    return !!user.isAdmin;
}

export const isAdmin = React.cache(isAdminRaw)