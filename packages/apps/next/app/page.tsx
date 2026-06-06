import { trpcClient } from "@next-dlrg-swim/trpc/client"

export default async function Home() {
  await trpcClient.post.add.mutate({username: `test123-${Date.now()}`, password: "test123"})
  const users = await trpcClient.post.list.query();
  return <div>
    <h1>{JSON.stringify(users)}</h1>
  </div>
}
