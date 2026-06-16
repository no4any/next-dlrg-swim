import { trpcClient } from "@next-dlrg-swim/trpc/client";

export default async function AdminPage() {
    const reg = await trpcClient.registration.getAll.query();
    console.log(reg);
    return <>
        <div>
            {reg.map(r => <div key={r.type === "TEAM"?r.name:"---"}>{r.type === "TEAM"?r.name:"---"}</div>)}
        </div>
    </>
}