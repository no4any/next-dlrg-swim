import React from "react";
import { getTeam } from "@/src/mongo/team.mongo";
import { notFound } from "next/navigation";
import { SwimmersList } from "./SwimmersList.component";
import { validateHash } from "@/src/lib-server-only";
import Link from "next/link";
import { Button } from "@/src/components/Button.component";
import { CopyToClipBox } from "@/src/components/CopyToClipBox.component";

export default async function TeamPage({ params }: { params: Promise<{ id: string, hash: string }> }) {
    const { id, hash } = await params;
    if (!await validateHash(id, hash)) notFound();
    const team = await getTeam(id);
    if (!team) notFound()

    return <div>
        <h1>Übersicht zu Ihrer Team-Anmeldung</h1>
        <div className="flow flex-col gap-4 mt-4 mb-4">
            <Detail title="Teamname">{team.name}</Detail>
            <Detail title="Name des Managers">{team.managerName}</Detail>
            <Detail title="E-Mail">{team.email}</Detail>
            <Detail title="Art des Teams">{team.teamType}</Detail>
        </div>
        <div>
            <Link href={`/anmelden/team/${id}/${hash}/add`}>
                <Button>Schwimmer unter Ihrer Verwaltung hinzufügen</Button>
            </Link>
        </div>
        <div className="my-4 flex flex-row">
            <div className="shrink">
                <CopyToClipBox value={`/anmelden/schwimmer/${id}`} isPath />
            </div>
            <div className="grow ml-4">
                <p className="italic">Teilen sie diesen Link mit Teammitgliedern die sich selber verwalten sollen. Schwimmer die sich selbst hinzufügen können nur bei der Registrierung vor Ort entfernt oder bearbeitet werden.</p>
            </div>
        </div>
        <h2 className="my-4">Angemeldete Teammitglieder</h2>
        <SwimmersList swimmers={team.swimmers.map((swimmer) => {
            return {
                ...swimmer,
                _id: swimmer._id?.toString(),
                teamId: ""
            }
        })} teamId={id} teamHash={hash} />
    </div>
}

function Detail({ children, title }: { title: string | React.ReactElement, children: string | React.ReactNode }) {
    return <div className="flex flex-row gap-4">
        <div className="font-bold flex-1">{title}:</div>
        <div className="flex-4">{children}</div>
    </div>
}
