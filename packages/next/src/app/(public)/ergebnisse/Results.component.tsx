"use cache"

import { Swimmer } from "@/src/model";
import { getAllSwimmersWithResults } from "@/src/mongo/swimmer.mongo";
import { getAllTeamsWithResult } from "@/src/mongo/team.mongo";
import { dateToGermanDateWithTime } from "./page";
import { cacheLife } from "next/cache";

export async function Results() {
    cacheLife("minutes");

    function name(swimmer: Swimmer) {
        return `${swimmer.lastName}, ${swimmer.firstName}`
    }

    const swimmersWithResults = (await getAllSwimmersWithResults()).filter(s => s.publishName).sort((a, b) => name(a).localeCompare(name(b)));
    const teams = (await getAllTeamsWithResult()).sort((a, b) => a.name.localeCompare(b.name));

    return <div>
        <h1>Ergebnisse</h1>
        <div className="my-4"><span className="font-bold">Letzte Aktualisierung:</span><span className="italic">{dateToGermanDateWithTime(new Date(Date.now()))}</span></div>
        <div>
            <h1>Teams</h1>
            <div className="flex flex-row gap-4 font-bold">
                <div className="basis-2/4">Name</div>
                <div className="basis-1/4">Bahnen</div>
                <div className="basis-1/4">Strecke</div>
            </div>
            {
                teams.map(t => {
                    const laps = t.laps.reduce((acc, curr) => acc + curr.laps, 0)
                    return <div key={t._id?.toString()} className="flex flex-row gap-4">
                        <div className="basis-2/4">{t.name}</div>
                        <div className="basis-1/4">{laps.toLocaleString('de-DE')}</div>
                        <div className="basis-1/4">{(laps * 50).toLocaleString('de-DE')}m</div>
                    </div>
                })
            }
        </div>
        <div>
            <h1>Schwimmer</h1>
            <div className="flex flex-row gap-4 font-bold">
                <div className="basis-2/4">Name</div>
                <div className="basis-1/4">Bahnen</div>
                <div className="basis-1/4">Strecke</div>
            </div>
            {
                swimmersWithResults.filter(s => s.laps?.length > 0).filter(s => s.publishName).map(s => {
                    const laps = s.laps.reduce((acc, curr) => acc + curr.laps, 0)
                    return <div key={s._id?.toString()} className="flex flex-row gap-4">
                        <div className="basis-2/4">{s.firstName} {s.lastName}</div>
                        <div className="basis-1/4">{laps.toLocaleString('de-DE')}</div>
                        <div className="basis-1/4">{(laps * 50).toLocaleString('de-DE')}m</div>
                    </div>
                })
            }
        </div>
    </div>
}