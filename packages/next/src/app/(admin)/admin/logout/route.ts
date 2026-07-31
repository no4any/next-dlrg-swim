import { logout } from "@/src/lib/login/logout.action";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    await logout();
    redirect('/login');
}