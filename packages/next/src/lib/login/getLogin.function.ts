"use server"

import { HEADER_USER_NAME } from "@/src/props";
import { headers } from "next/headers";
import React from "react";

async function getLoginRaw() {
    const headerStore = await headers();
    return headerStore.get(HEADER_USER_NAME);
}

export const getLogin = React.cache(getLoginRaw)