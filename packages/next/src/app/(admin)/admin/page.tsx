import { getLogin } from "@/src/lib";


export default async function Home() {
  const user = await getLogin();
  return <div>
    <h1>Dashboard {user && <>({user})</>}</h1>
  </div>
}
