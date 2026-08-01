import { dateToGermanDate, getAge, getGenderString } from "@/src/lib";
import { Swimmer, Team } from "@/src/model";
import Link from "next/link";

export async function SwimmerList({ swimmers, noTeam }: { noTeam?: boolean,swimmers: (Swimmer & { team?: Team })[] }) {
    return <div className="grid grid-col-5 gap-1">
        <div className="flex flex-row gap-0-5 p-1 font-bold sticky">
            <div className="flex-1">Vorname</div>
            <div className="flex-1">Nachname</div>
            {!noTeam && <div className="flex-1 hidden md:block">Team</div>}
            <div className="flex-1 hidden md:block">Geschlecht</div>
            <div className="flex-1 hidden md:block">Geburtstag</div>
            <div className="flex-1">Alter</div>
        </div>
        {Promise.all(swimmers.map(async (swimmer) => {
            const birthday = swimmer.birthday ? new Date(swimmer.birthday) : undefined;
            const teamname = swimmer.team ? swimmer.team.name : undefined;
            return <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString() ?? '12312312'}`} key={swimmer._id?.toString()}>
                <div>
                    <div className="flex flex-row gap-0.5 hover:bg-gray-200 rounded-md p-1">
                        <div className="flex-1">{swimmer.firstName}</div>
                        <div className="flex-1">{swimmer.lastName}</div>
                        {!noTeam && <div className="flex-1 hidden md:block">{teamname ?? <span className="italic text-dlrg-gray">Kein Team</span>}</div>}
                        <div className="flex-1 hidden md:block">{swimmer.gender && getGenderString(swimmer.gender)}</div>
                        <div className="flex-1 hidden md:block">{birthday && dateToGermanDate(birthday)}</div>
                        <div className="flex-1">{birthday && getAge(birthday)}</div>
                    </div>
                </div>
            </Link>
        }))}
    </div>
}