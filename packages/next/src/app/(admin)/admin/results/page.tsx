import { dateToGermanDate } from "@/src/lib";
import getResultsAction from "@/src/lib/getResultsAction";
import { Swimmer, Team } from "@/src/model";
import Link from "next/link";
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

        <div>
            <Link prefetch={false} href="/admin/print"><h3 className="text-dlrg-red">Urkunden drucken</h3></Link>
        </div>

        {results.youngestMale && <SingleResult title="Jüngster Teilnehmer (männlich)" swimmer={results.youngestMale} />}
        {results.youngestFemale && <SingleResult title="Jüngster Teilnehmer (weiblich)" swimmer={results.youngestFemale} />}
        {results.oldestMale && <SingleResult title="Ältester Teilnehmer (männlich)" swimmer={results.oldestMale} />}
        {results.oldestFemale && <SingleResult title="Ältester Teilnehmer (weiblich)" swimmer={results.oldestFemale} />}

        <Result title="Weiteste Strecke" swimmers={results.swimmers}></Result>
        
        <Result title="Weiteste Strecke männlich" swimmers={results.swimmersMale}></Result>
        <Result title="Weiteste Strecke weiblich" swimmers={results.swimmersFemale}></Result>

        <Result title="Weiteste Strecke Nachtpokal männlich" swimmers={results.swimmersMaleNight} night></Result>
        <Result title="Weiteste Strecke Nachtpokal weiblich" swimmers={results.swimmersFemaleNight} night></Result>

        <Result title="Männlich 15 bis 18" swimmers={results.swimmersMale15} />
        <Result title="Männlich 18 bis 25" swimmers={results.swimmersMale18} />
        <Result title="Männlich 26 bis 35" swimmers={results.swimmersMale26} />
        <Result title="Männlich 36 bis 45" swimmers={results.swimmersMale36} />
        <Result title="Männlich 46 bis 55" swimmers={results.swimmersMale46} />
        <Result title="Männlich 56 bis 65" swimmers={results.swimmersMale56} />
        <Result title="Männlich 66 bis 75" swimmers={results.swimmersMale66} />
        <Result title="Männlich 75 bis 99" swimmers={results.swimmersMale76} />

        <Result title="Weiblich 15 bis 18" swimmers={results.swimmersFemale15} />
        <Result title="Weiblich 18 bis 25" swimmers={results.swimmersFemale18} />
        <Result title="Weiblich 26 bis 35" swimmers={results.swimmersFemale26} />
        <Result title="Weiblich 36 bis 45" swimmers={results.swimmersFemale36} />
        <Result title="Weiblich 46 bis 55" swimmers={results.swimmersFemale46} />
        <Result title="Weiblich 56 bis 65" swimmers={results.swimmersFemale56} />
        <Result title="Weiblich 66 bis 75" swimmers={results.swimmersFemale66} />
        <Result title="Weiblich 75 bis 99" swimmers={results.swimmersFemale76} />

        <TeamResult title="Weiteste Strecke Team" teams={results.teams} />
        <TeamResult title="Weitester Durchschnitt Team" teams={results.teamsAvg} average />

        <TeamResult title="Weiteste Strecke Team (Sonstige)" teams={results.teams.filter(t => t.teamType === "SONSTIGE")} />
        <TeamResult title="Weitester Durchschnitt Team (Sonstige" teams={results.teamsAvg.filter(t => t.teamType === "SONSTIGE")} average />

        <TeamResult title="Weiteste Strecke Team (Verein)" teams={results.teams.filter(t => t.teamType === "VEREIN")} />
        <TeamResult title="Weitester Durchschnitt Team (Verein" teams={results.teamsAvg.filter(t => t.teamType === "VEREIN")} average />

        <TeamResult title="Weiteste Strecke Team (Schwimmverein)" teams={results.teams.filter(t => t.teamType === "SCHWIMMVEREIN")} />
        <TeamResult title="Weitester Durchschnitt Team (Schwimmverein)" teams={results.teamsAvg.filter(t => t.teamType === "SCHWIMMVEREIN")} average />

        <TeamResult title="Weiteste Strecke Team (Firma)" teams={results.teams.filter(t => t.teamType === "FIRMA")} />
        <TeamResult title="Weitester Durchschnitt Team (Firma)" teams={results.teamsAvg.filter(t => t.teamType === "FIRMA")} average />
    </div>
}

function SingleResult({ title, swimmer, night }: {
    title: string,
    swimmer: (Swimmer & {
        total: number,
        night: number,
        age: number
    }),
    night?: boolean
}) {
    return <div className="mt-4">
        <h2>{title}</h2>
        <div className="grid grid-cols-4">
            <div><b>Name</b></div>
            <div><b>Vorname</b></div>
            <div><b>Alter</b></div>
            <div><b>Geschwommen</b></div>
        </div>
        <div className="grid grid-cols-4">
            <div>{swimmer.publishName ? swimmer.lastName : ""}</div>
            <div>{swimmer.publishName ? swimmer.firstName : ""}</div>
            {swimmer.birthday ? <div>{dateToGermanDate(new Date(swimmer.birthday as string))} <span className="font-bold">({swimmer.age})</span></div> : <div></div>}
            <div>{(night ? swimmer.night : swimmer.total).toLocaleString('de-DE')}m</div>
        </div>
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
    return <div className="mt-4">
        <h2>{title}</h2>
        <div className="grid grid-cols-5">
            <div><b>Platz</b></div>
            <div><b>Name</b></div>
            <div><b>Vorname</b></div>
            <div><b>Alter</b></div>
            <div><b>Geschwommen</b></div>
        </div>
        {swimmers.map(((swimmer, i) => <div key={swimmer._id?.toString()} className="grid grid-cols-5">
            <div>{++i}</div>
            <div>{swimmer.publishName ? swimmer.lastName : ""}</div>
            <div>{swimmer.publishName ? swimmer.firstName : ""}</div>
            {swimmer.birthday ? <div>{dateToGermanDate(new Date(swimmer.birthday as string))} <span className="font-bold">({swimmer.age})</span></div> : <div></div>}
            <div>{(night ? swimmer.night : swimmer.total).toLocaleString('de-DE')}m</div>
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
    return <div className="mt-4">
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
            <div>{(average ? Math.floor(team.total / team.swimmerCount) : team.total).toLocaleString('de-DE')}m</div>
        </div>))}
    </div>
}