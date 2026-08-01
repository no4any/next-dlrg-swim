import { isAdmin } from "@/src/lib/login/isAdmin.function";
import { Sidebar } from "./Sidebar";

export async function SidebarWrapper() {
    return <Sidebar isAdmin={await isAdmin()} />
}