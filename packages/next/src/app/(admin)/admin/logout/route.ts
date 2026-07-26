import { logout } from "@/src/lib/login/logout.action";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    console.log("Logout")
    await logout();
}