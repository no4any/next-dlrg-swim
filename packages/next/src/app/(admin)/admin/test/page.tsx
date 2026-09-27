import { counterNext } from "@/src/mongo/counter.mongo";
import { connection } from "next/server";

export const instant = false;

export default async function TestPage() {
    await connection();
    const id = await counterNext('test');
    return <div>
        <h1>Testseite</h1>
        <div>{id}</div>
    </div>
}