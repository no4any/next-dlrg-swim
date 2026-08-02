import { ButtonSuccess } from "@/src/components/Button.component";
import { CommentList } from "@/src/components/CommentList.component";
import { Detail } from "@/src/components/Detail.component";
import { CommentsForm } from "@/src/components/forms/comments/CommentsForm.component";
import { dateToGermanDate, getAge, getGenderString } from "@/src/lib";
import { generateHash } from "@/src/lib-server-only";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { getTeam } from "@/src/mongo/team.mongo";
import Link from "next/link";
import { notFound } from "next/navigation";

async function NotDefined() {
    return <span className="italic">Nicht angegeben</span>
}

export default async function SwimmerPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;

    const swimmer = await getSwimmer(id);
    if(!swimmer) notFound();

    const team = swimmer?.teamId ? await getTeam(swimmer?.teamId) : undefined;
    const birthday = swimmer?.birthday ? new Date(swimmer.birthday) : undefined;

    return <div>
        <h1>Schwimmer: {swimmer.firstName} {swimmer.lastName}</h1>
        <div className="py-4">
            <Link prefetch={false} href={`/anmelden/schwimmer/${swimmer._id?.toString()}/${await generateHash(swimmer._id?.toString() || "")}`}>
                <ButtonSuccess>Inspizieren</ButtonSuccess>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Detail title="Vorname">{swimmer.firstName}</Detail>
            <Detail title="Nachname">{swimmer.lastName}</Detail>
            <Detail title="E-Mail">{swimmer.email ?? <NotDefined />}</Detail>
            <Detail title="Team">{team ? <Link prefetch={false} href={`/admin/teams/${team._id?.toString()}`}>{team.name}</Link> : <NotDefined />}</Detail>
            <Detail title="Geschlecht">{getGenderString(swimmer.gender)}</Detail>
            <Detail title="Geburtstag">{birthday ? <>{dateToGermanDate(birthday)} ({getAge(birthday)})</> : <NotDefined />}</Detail>
            <Detail title="Namen veröffentlichen">{swimmer.publishName ? "Ja" : "Nein"}</Detail>
            <Detail title="Newsletter">{swimmer.newsletter ? "Ja" : "Nein"}</Detail>
            <Detail title="Frühstück ">{swimmer.breakfast ? "Ja" : "Nein"}</Detail>
            <Detail title="Stadt">{swimmer.city ?? <NotDefined />}</Detail>
        </div>
        <div>
            <h2 className="my-4">Kommentare</h2>
            <CommentsForm type="SWIMMER" id={swimmer._id.toString()}/>
        </div>
        <div>
            <CommentList comments={swimmer.comments ?? undefined} />
        </div>
    </div>
}