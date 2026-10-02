import { getAge, getYouthMedal } from "@/src/lib";
import { calcLaps } from "@/src/lib/calcLaps";
import { getLapsCards } from "@/src/mongo/lapsCards.mongo";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import { connection } from "next/server";

export const instant = false

export default async function ChildrenCert({ params }: { params: Promise<{ id: string }> }) {
    await connection();
    const { id } = await params;

    const swimmer = await getSwimmer(id)
    if (swimmer === null) notFound();
    if (swimmer.birthday === undefined) notFound();

    const laps = await calcLaps(await getLapsCards(id));
    const distance = laps * 50;
    const birthday = swimmer.birthday ? new Date(swimmer.birthday) : undefined;
    if(!birthday) notFound();

    const medal = getYouthMedal(distance, birthday);
    if (medal === null) notFound();

    return <div className="print">
        <div className="page">
            <h1>Urkunde</h1>
            <h2>{swimmer.firstName} {swimmer.lastName}</h2>
            <p>ist beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 04. bis 05. Oktober 2025 im Westbad Gießen</p>
            <h3>{distance} m</h3>
            <p>geschwommen und hat damit in der Altersklasse {getAge(birthday)}</p>
            <h3>{medal}</h3>
            <p>erreicht.</p>
        </div>
    </div>
}