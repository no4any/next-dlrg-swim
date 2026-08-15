import { Tags } from "@/src/components/Tags.component";
import { borderColorForCapColor, colorForCapColor, dateToGermanDate, getAge, getGenderString } from "@/src/lib";
import { Swimmer, Team } from "@/src/model";
import Link from "next/link";

export async function SwimmerList({ swimmers, noTeam }: { noTeam?: boolean, swimmers: (Swimmer & { team?: Team })[] }) {
    return <div className="grid grid-col-5 gap-1">
        <div className="flex flex-row gap-0-5 p-1 font-bold sticky">
            <div className="flex-1">Tags</div>
            <div className="flex-3">Vorname</div>
            <div className="flex-3">Nachname</div>
            {!noTeam && <div className="flex-3 hidden md:block">Team</div>}
            <div className="flex-3 hidden md:block">Registierung</div>
            <div className="flex-3 hidden md:block">Geburtstag</div>
        </div>
        {Promise.all(swimmers.map(async (swimmer) => {
            const birthday = swimmer.birthday ? new Date(swimmer.birthday) : undefined;
            const teamname = swimmer.team ? swimmer.team.name : undefined;
            return <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString() ?? '12312312'}`} key={swimmer._id?.toString()}>
                <div>
                    <div className="flex flex-row gap-0.5 hover:bg-gray-200 rounded-md p-1">
                        <div className="flex-1 flex-row flex gap-1 text-2xl">
                            <Tags swimmer={swimmer} />
                        </div>
                        <div className="flex-3">{swimmer.firstName}</div>
                        <div className="flex-3">{swimmer.lastName}</div>
                        {!noTeam && <div className="flex-3 hidden md:block">{teamname ?? <span className="italic text-dlrg-gray">Kein Team</span>}</div>}
                        <div className={`flex-3 hidden md:block ${colorForCapColor(swimmer.capColor || "WHITE")} ${borderColorForCapColor(swimmer.capColor || "WHITE")}`}>{swimmer.capColor}-{swimmer.capNr}:{swimmer.regNr}</div>
                        <div className="flex-3 hidden md:block">{birthday && dateToGermanDate(birthday)} {birthday && <>({getAge(birthday)})</>}</div>
                    </div>
                </div>
            </Link>
        }))}
    </div>
}