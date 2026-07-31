import { Button, ButtonError } from "@/src/components/Button.component";
import { flat, getLogin } from "@/src/lib"
import { findUser, getUsers } from "@/src/mongo/user.mongo";
import Link from "next/link";
import { UsersList } from "./UsersList.component";

export default async function UsersPage() {
    const username = await getLogin();
    const u = await findUser(username ?? "");
    const isAdmin = u?.isAdmin === true;
    const users = await getUsers();
    return <div>
        <h1>Benutzer ({isAdmin ? "Admin" : "User"})</h1>
        <div className="py-4">
            <Link href="/admin/users/add" prefetch={false}>
                <Button>Benutzer hinzufügen</Button>
            </Link>
        </div>
        <UsersList users={await flat(users)}/>
    </div >
}