import Link from "next/link";
import { dateToGermanDate, getAge, getGenderString } from "../lib";
import { Swimmer } from "../model";
import { getTeam } from "../mongo/team.mongo";
import { Detail } from "./Detail.component";

async function NotDefined() {
    return <span className="italic">Nicht angegeben</span>
}

export async function SwimmerDetails({ swimmer }: { swimmer: Swimmer }) {
    const team = swimmer?.teamId ? await getTeam(swimmer?.teamId) : undefined;
    const birthday = swimmer?.birthday ? new Date(swimmer.birthday) : undefined;

    return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Detail title="Vorname">{swimmer.firstName}</Detail>
        <Detail title="Nachname">{swimmer.lastName}</Detail>
        <Detail title="E-Mail">{swimmer.email ?? <NotDefined />}</Detail>
        <Detail title="Badekappe">{swimmer.capColor && swimmer.capNr ? <span>{swimmer.capColor} - {swimmer.capNr}</span>: <NotDefined />}</Detail>
        <Detail title="Registriernummer">{swimmer.regNr ? <span>{swimmer.regNr}</span>: <NotDefined />}</Detail>
        <Detail title="Team">{team ? <Link prefetch={false} href={`/admin/teams/${team._id?.toString()}`}>{team.name}</Link> : <NotDefined />}</Detail>
        <Detail title="Geschlecht">{getGenderString(swimmer.gender)}</Detail>
        <Detail title="Geburtstag">{birthday ? <>{dateToGermanDate(birthday)} ({getAge(birthday)})</> : <NotDefined />}</Detail>
        <Detail title="Namen veröffentlichen">{swimmer.publishName ? "Ja" : "Nein"}</Detail>
        <Detail title="Newsletter">{swimmer.newsletter ? "Ja" : "Nein"}</Detail>
        <Detail title="Frühstück ">{swimmer.breakfast ? "Ja" : "Nein"}</Detail>
        <Detail title="Stadt">{swimmer.city ?? <NotDefined />}</Detail>
    </div>
}