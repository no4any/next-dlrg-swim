import { Tags } from "@/src/components/Tags.component";
import { borderColorForCapColor, colorForCapColor, dateToGermanDate, flat, getAge, getGenderString } from "@/src/lib";
import { calcLaps } from "@/src/lib/calcLaps";
import { capColorToReadable } from "@/src/lib/capColorToReadable.function";
import { Swimmer, Team } from "@/src/model";
import { getLapsCards } from "@/src/mongo/lapsCards.mongo";
import Link from "next/link";

export async function SwimmerList({ swimmers, noTeam }: { noTeam?: boolean, swimmers: (Swimmer & { team?: Team })[] }) {
    return <div className="grid grid-col-5 gap-1">
        <div className="flex flex-row gap-0-5 p-1 font-bold sticky">
            <div className="flex-1">Tags</div>
            <div className="flex-3">Vorname</div>
            <div className="flex-3">Nachname</div>
            <div className="flex-1 hidden md:block">Frühstück</div>
            <div className="flex-2 hidden md:block">Registierung</div>
            <div className="flex-2 hidden md:block">Geburtstag</div>
        </div>
        {Promise.all(swimmers.map(async (swimmer) => {
            const birthday = swimmer.birthday ? new Date(swimmer.birthday) : undefined;
            const distance = await calcLaps(await getLapsCards(swimmer._id)) * 50;
            return <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString() ?? '12312312'}`} key={swimmer._id?.toString()}>
                <div>
                    <div className="flex flex-row gap-0.5 hover:bg-gray-200 rounded-md p-1">
                        <div className="flex-1 flex-row flex gap-1 text-2xl">
                            <Tags swimmer={await flat(swimmer)} distance={distance} />
                        </div>
                        <div className="flex-3">{swimmer.firstName}</div>
                        <div className="flex-3">{swimmer.lastName}</div>
                        <div className="flex-1 hidden md:block">{swimmer.breakfast ? "Ja": ""}</div>
                        {swimmer.capColor && swimmer.capNr ?
                            <div className={`flex-2 hidden rounded-md md:block ${colorForCapColor(swimmer.capColor || "WHITE")} ${borderColorForCapColor(swimmer.capColor || "WHITE")}`}>{capColorToReadable(swimmer.capColor || "WHITE")}-{swimmer.capNr} (Reg:{swimmer.regNr})</div>
                            : <div className="flex-2"></div>}
                        <div className="flex-2 hidden md:block">{birthday && dateToGermanDate(birthday)} {birthday && <>({getAge(birthday)})</>}</div>
                    </div>
                </div>
            </Link>
        }))}
    </div>
}