import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { UpdateSwimmerForm } from "./UpdateSwimmerForm";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { flat } from "@/src/lib";

export const instant = false;

export default async function UpdateSwimmerPage({ params }: { params: Promise<{ id: string }> }) {
    await connection();

    const { id } = await params;
    const swimmer = await flat(await getSwimmer(id));

    if(!swimmer) notFound();

    return <div>
        <h1>Schwimmer ändern</h1>
        <UpdateSwimmerForm swimmer={swimmer} key={`swimmer-update-${Date.now()}`}/>
    </div>
}