import { Detail } from "@/src/components/Detail.component";
import { getLogin } from "@/src/lib";
import { isAdmin } from "@/src/lib/login/isAdmin.function";
import { redirect } from "next/navigation";

export default async function UserPage() {
    const username = await getLogin();
    if(!username) redirect("/login");
    const admin = await isAdmin();
    return <div>
        <h1>User</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-4">
            <Detail title="E-Mail / Benutzername">
                {username}
            </Detail>
            <Detail title="Art des Accounts">
                {admin ? "Administrator" : "Normaler Benutzer"}
            </Detail>
        </div>
    </div>
}