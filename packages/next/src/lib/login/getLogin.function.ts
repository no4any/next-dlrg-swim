import { cookies } from "next/headers";
import React from "react";
import { COOKIE_AUTH_TOKEN_NAME } from "../../props";
import { jwtValidate } from "../jwt";
import { findUser } from "@/src/mongo/user.mongo";

async function getLoginRaw() {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_AUTH_TOKEN_NAME)?.value ?? "";
    const tokenUser = await jwtValidate(token);
    const user = findUser(tokenUser?.email || "");

    if(!user) return null;

    return tokenUser;
}

export const getLogin = React.cache(getLoginRaw)