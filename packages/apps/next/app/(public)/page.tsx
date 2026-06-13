import { trpcClient } from "@next-dlrg-swim/trpc/client";

export const revlidation = 0;

export default async function AdminPage() {
    const registration = await trpcClient.registration.register.mutate({
        type: "TEAM",
        email: "asdf@asdf.de"
    })

    return <div>
        {JSON.stringify(registration)}
    </div>
}