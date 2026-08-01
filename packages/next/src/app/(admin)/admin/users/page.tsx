import { Button, ButtonError } from "@/src/components/Button.component";
import { flat, getLogin } from "@/src/lib"
import { findUser, getUsers } from "@/src/mongo/user.mongo";
import Link from "next/link";
import { UsersList } from "./UsersList.component";
import { redirect } from "next/navigation";
import { isAdmin } from "@/src/lib/login/isAdmin.function";

export default async function UsersPage() {
    if(!await isAdmin()) redirect('/admin');
    const users = await getUsers();
    return <div>
        <h1>Benutzer</h1>
        <div className="py-4">
            <Link href="/admin/users/add" prefetch={false}>
                <Button>Benutzer hinzufügen</Button>
            </Link>
        </div>
        <UsersList users={await flat(users)} />
    </div >
}