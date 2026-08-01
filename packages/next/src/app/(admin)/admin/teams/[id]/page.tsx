import { ButtonSuccess } from "@/src/components/Button.component";
import { Detail } from "@/src/components/Detail.component";
import { dateToGermanDate, getAge, getGenderString } from "@/src/lib";
import { generateHash } from "@/src/lib-server-only";
import { getSwimmer } from "@/src/mongo/swimmer.mongo";
import { getTeam } from "@/src/mongo/team.mongo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SwimmerList } from "../../swimmers/SwimmerList.component";

async function NotDefined() {
    return <span className="italic">Nicht angegeben</span>
}

export default async function TeamPage({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;

    const team = await getTeam(id);
    if(!team) notFound();

    return <div>
        <h1>Team: {team.name}</h1>
        <div className="py-4">
            <Link prefetch={false} href={`/anmelden/team/${team._id?.toString()}/${await generateHash(team._id?.toString() || "")}`}>
                <ButtonSuccess>Inspizieren</ButtonSuccess>
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Detail title="Name">{team.name}</Detail>
            <Detail title="Manager">{team.managerName}</Detail>
            <Detail title="E-Mail">{team.email ?? <NotDefined />}</Detail>
        </div>
        <hr className="my-4" />
        <h2 className="my-4">Schwimmer für das Team</h2>
        <SwimmerList swimmers={team.swimmers} />
    </div>
}