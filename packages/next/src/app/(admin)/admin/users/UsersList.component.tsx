"use client"

import { ButtonError } from "@/src/components/Button.component"
import { UserInput } from "@/src/model"
import { removeUser } from "./removeUser.action"
import { MdDelete } from "react-icons/md"

export function UsersList({users}: {users: UserInput[]}) {
    return <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center-safe p-1">
            <div className="flex-1 font-bold">E-Mail</div>
            <div className="flex-1 font-bold">Typ</div>
            <div className="flex-1 font-bold text-right">Aktionen</div>
        </div>
        {users.map(user => <div key={user.email} className="flex flex-row gap-2 items-center-safe p-1 hover:bg-gray-200 rounded-md">
            <div className="flex-1">{user.email}</div>
            <div className="flex-1">{user.isAdmin ? "Admin" : "User"}</div>
            <div className="flex-1 text-right"><ButtonError onClick={()=> {
                if(confirm(`${user.email} wirklich löschen?`)) {
                    removeUser(user.email);
                }
            }}><MdDelete className="size-6"/></ButtonError></div>
        </div>)}
    </div>
}