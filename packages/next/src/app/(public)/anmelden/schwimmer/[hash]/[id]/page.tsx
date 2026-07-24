import { Hint } from "@/src/components/Hint.component";
import { HintBox } from "@/src/components/HintBox.component";
import { dateToGermanDate } from "@/src/lib/dateToGermanyDate.function";
import { generateHash } from "@/src/lib/generateHash.function";
import { getAge } from "@/src/lib/getAge.function";
import { getGenderString } from "@/src/lib/getGenderString.function";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { notFound } from "next/navigation";
import React from "react";

export default async function SwimmerPage({ params }: { params: Promise<{ id: string, hash: string }> }) {
    const { id, hash } = await params;

    if (await generateHash(id) !== hash) notFound();

    const swimmer = await getSwimmer(id);

    if (swimmer == null) notFound()

    return <div>
        <h1>Übersicht zu Ihrer Anmeldung</h1>
        <HintBox>
            {!swimmer.publishName && <Hint type="WARNING">
                <div>
                    <div>
                        Sie können keine Pokale oder Wertungen erhalten - <span className="underline">Teamwertungen können weiterhin erfolgen</span>
                    </div>
                    <div className="font-bold">
                        Sollten Sie dies ändern wollen, teilen Sie uns dies bitte bei der Anmeldung am Veranstaltungstag mit.
                    </div>
                </div></Hint>}
        </HintBox>
        <div className="flow flex-col gap-4 mt-4">
            <Detail title="Name">{swimmer?.firstName} {swimmer.lastName}</Detail>
            <Detail title="Geschlecht">{getGenderString(swimmer.gender)}</Detail>
            <Detail title="E-Mail">{swimmer.email}</Detail>
            {swimmer.birthday && <Detail title="Geburtstag">{dateToGermanDate(new Date(swimmer.birthday))} ({getAge(new Date(swimmer.birthday))})</Detail>}
            {swimmer.city && <Detail title="Wohnort">{swimmer.city}</Detail>}
            <Detail title="Namen veröffentlichen">{!!swimmer.publishName ? "Ja" : "Nein"}</Detail>
            <Detail title="Frühstück">{!!swimmer.breakfast ? "Ja" : "Nein"}</Detail>
            <Detail title="Newsletter">{!!swimmer.newsletter ? "Ja" : "Nein"}</Detail>
        </div>
    </div>
}

function Detail({ children, title }: { title: string | React.ReactElement, children: string | React.ReactNode }) {
    return <div className="flex flex-row gap-4">
        <div className="font-bold">{title}:</div>
        <div>{children}</div>
    </div>
}