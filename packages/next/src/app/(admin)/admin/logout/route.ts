import { logout } from "@/src/lib/login/logout.action";

export async function GET(request: Request) {
    await logout();
}