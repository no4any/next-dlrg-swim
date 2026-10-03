import getResultsAction from "@/src/lib/getResultsAction";
import { Swimmer, Team } from "@/src/model";
import { connection } from "next/server";

function dateToString(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} um ${hours < 10 ? "0" : ""}${date.getHours()}:${minutes < 10 ? "0" : ""}${date.getMinutes()} Uhr (GMT)`
}

export const instant = false;

export default async function RankPage() {
    await connection();

    const results = await getResultsAction();

    return <div>
        <h1>Ergebnisse</h1>

        <div className="mt-3">Stand: {dateToString(new Date)}</div>

        <Result title="Weiteste Strecke" swimmers={results.swimmers}></Result>
        <Result title="Weiteste Strecke männlich" swimmers={results.swimmersMale}></Result>
        <Result title="Weiteste Strecke weiblich" swimmers={results.swimmersFemale}></Result>
        <Result title="Weiteste Strecke Nachtpokal männlich" swimmers={results.swimmersMaleNight} night></Result>
        <Result title="Weiteste Strecke Nachtpokal weiblich" swimmers={results.swimmersFemaleNight} night></Result>

        <TeamResult title="Weiteste Strecke Team" teams={results.teams} />
        <TeamResult title="Weitester Durchschnitt Team" teams={results.teamsAvg} average />
    </div>
}

function Result({ title, swimmers, night }: {
    title: string,
    swimmers: (Swimmer & {
        total: number,
        night: number,
        age: number
    })[],
    night?: boolean
}) {
    return <div>
        <h2>{title}</h2>
        <div className="grid grid-cols-4">
            <div><b>Platz</b></div>
            <div><b>Name</b></div>
            <div><b>Vorname</b></div>
            <div><b>Geschwommen</b></div>
        </div>
        {swimmers.map(((swimmer, i) => <div key={swimmer._id?.toString()} className="grid grid-cols-4">
            <div>{++i}</div>
            <div>{swimmer.publishName ? swimmer.lastName : ""}</div>
            <div>{swimmer.publishName ? swimmer.firstName : ""}</div>
            <div>{night ? swimmer.night : swimmer.total}m</div>
        </div>))}
    </div>
}

function TeamResult({ title, teams, average }: {
    title: string,
    teams: (Team & {
        total: number,
        swimmerCount: number
    })[],
    average?: boolean
}) {
    return <div>
        <h2>{title}</h2>
        <div className="grid grid-cols-4">
            <div><b>Platz</b></div>
            <div><b>Name</b></div>
            <div><b>Anzahl Schwimmer</b></div>
            <div><b>{average ? "Durchschnittsleistung" : "Bahnen"}</b></div>
        </div>
        {teams.map(((team, i) => <div key={team._id?.toString()} className="grid grid-cols-4">
            <div>{++i}</div>
            <div>{team.name}</div>
            <div>{team.swimmerCount}</div>
            <div>{average ? Math.floor(team.total / team.swimmerCount) : team.total}m</div>
        </div>))}
    </div>
}