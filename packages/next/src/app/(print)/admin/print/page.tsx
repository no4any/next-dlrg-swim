import getResultsAction from "@/src/lib/getResultsAction";
import { Swimmer, Team } from "@/src/model";
import { connection } from "next/server";


async function PlainCert({ title, swimmer }: { title: string, swimmer: Swimmer }) {
    return <div className="page">
        <h1>Urkunde</h1>
        <h2>{title}</h2>
        <p className="for">für</p>
        <h4>{swimmer.firstName} {swimmer.lastName}</h4>
        <p>beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 03. bis 4. Oktober 2026 im Westbad Gießen</p>
    </div>
}

async function RankedCertRanking({ group, title, swimmers, nightCup }: { group: string, title: string, swimmers: (Swimmer & { total: number, night: number })[], nightCup?: boolean }) {
    const swimmersTop3 = swimmers.slice(0, 3);
    if(!swimmersTop3.length) return <></>
    return <>
        <div className="page">
            <h1>{group}</h1>
            {swimmersTop3.map(s => <p key={s._id.toString()}>{s.firstName} {s.lastName}: {nightCup ? s.night.toLocaleString('de-DE') : s.total.toLocaleString('de-DE')}m</p>)}
        </div>
        {swimmersTop3.map((swimmer, i) => <RankedCert key={i} rank={++i} title={title} swimmer={swimmer} />)}
    </>
}

async function RankedCert({ title, swimmer, rank }: { title: string, rank: number, swimmer: Swimmer }) {
    return <div className="page">
        <h1>Urkunde</h1>
        <h2>{title}</h2>
        <h3>{rank}. Platz</h3>
        <p className="for">für</p>
        <h4>{swimmer.firstName} {swimmer.lastName}</h4>
        <p>beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 03. bis 04. Oktober 2026 im Westbad Gießen</p>
    </div>
}

async function TeamCertRanking({ group, title, teams, average }: { group: string, title: string, teams: (Team & { total: number, average: number })[], average?: boolean }) {
    const teamsTop3 = teams.slice(0, 3);
    if(!teamsTop3.length) return <></>
    return <>
        <div className="page">
            <h1>{group}</h1>
            {teamsTop3.map(t => <p key={t._id.toString()}>{t.name}: {average ? t.average.toLocaleString('de-DE') : t.total.toLocaleString('de-DE')}m</p>)}
        </div>
        {teamsTop3.map((t, i) => <TeamCert key={i} rank={++i} title={title} team={t} />)}
    </>
}

function TeamCert({ title, team, rank }: { rank: number, title: string, team: Team }) {
    return <div className="page">
        <h1>Urkunde</h1>
        <h2>{title}</h2>
        <h3>{rank}. Platz</h3>
        <p className="for">für das Team</p>
        <h4>{team.name}</h4>
        <p>beim 24 Stunden-Schwimmen der DLRG KG Gießen e.V. vom 03. bis 04. Oktober 2026 im Westbad Gießen</p>
    </div>
}

export const instant = false;

export default async function ResultsPrintPage() {
    await connection();

    const results = await getResultsAction();

    return <div className="print">
        {results.swimmerYoungestMale ? <PlainCert swimmer={results.swimmerYoungestMale} title="Jüngster Teilnehmer" /> : <></>}
        {results.swimmerYoungestFemale ? <PlainCert swimmer={results.swimmerYoungestFemale} title="Jüngste Teilnehmerin" /> : <></>}
        {results.swimmerOldestMale ? <PlainCert swimmer={results.swimmerOldestMale} title="Ältester Teilnehmer" /> : <></>}
        {results.swimmerOldestFemale ? <PlainCert swimmer={results.swimmerOldestFemale} title="Älteste Teilnehmerin" /> : <></>}

        <RankedCertRanking group="Weiteste Strecke männlich" title="Weiteste Strecke" swimmers={results.swimmersMale} />
        <RankedCertRanking group="Weiteste Strecke weiblich" title="Weiteste Strecke" swimmers={results.swimmersFemale} />

        <RankedCertRanking group="Nachtpokal männlich" title="Nachtpokal" swimmers={results.swimmersMaleNight} nightCup />
        <RankedCertRanking group="Nachtpokal weiblich" title="Nachtpokal" swimmers={results.swimmersFemaleNight} nightCup />

        <RankedCertRanking group="Altergruppe 15 bis 17 männlich" title="Weiteste Strecke in der Altersgruppe 15 bis 17 Jahre" swimmers={results.swimmersMale15} />
        <RankedCertRanking group="Altergruppe 18 bis 25 männlich" title="Weiteste Strecke in der Altersgruppe 18 bis 25 Jahre" swimmers={results.swimmersMale18} />
        <RankedCertRanking group="Altergruppe 26 bis 35 männlich" title="Weiteste Strecke in der Altersgruppe 26 bis 35 Jahre" swimmers={results.swimmersMale26} />
        <RankedCertRanking group="Altergruppe 36 bis 45 männlich" title="Weiteste Strecke in der Altersgruppe 36 bis 45 Jahre" swimmers={results.swimmersMale36} />
        <RankedCertRanking group="Altergruppe 46 bis 55 männlich" title="Weiteste Strecke in der Altersgruppe 46 bis 55 Jahre" swimmers={results.swimmersMale46} />
        <RankedCertRanking group="Altergruppe 56 bis 65 männlich" title="Weiteste Strecke in der Altersgruppe 56 bis 65 Jahre" swimmers={results.swimmersMale56} />
        <RankedCertRanking group="Altergruppe 66 bis 75 männlich" title="Weiteste Strecke in der Altersgruppe 66 bis 75 Jahre" swimmers={results.swimmersMale66} />
        <RankedCertRanking group="Altergruppe 76 bis 99 männlich" title="Weiteste Strecke in der Altersgruppe 76 bis 99 Jahre" swimmers={results.swimmersMale76} />

        <RankedCertRanking group="Altergruppe 15 bis 17 weiblich" title="Weiteste Strecke in der Altersgruppe 15 bis 17 Jahre" swimmers={results.swimmersFemale15} />
        <RankedCertRanking group="Altergruppe 18 bis 25 weiblich" title="Weiteste Strecke in der Altersgruppe 18 bis 25 Jahre" swimmers={results.swimmersFemale18} />
        <RankedCertRanking group="Altergruppe 26 bis 35 weiblich" title="Weiteste Strecke in der Altersgruppe 26 bis 35 Jahre" swimmers={results.swimmersFemale26} />
        <RankedCertRanking group="Altergruppe 36 bis 45 weiblich" title="Weiteste Strecke in der Altersgruppe 36 bis 45 Jahre" swimmers={results.swimmersFemale36} />
        <RankedCertRanking group="Altergruppe 46 bis 55 weiblich" title="Weiteste Strecke in der Altersgruppe 46 bis 55 Jahre" swimmers={results.swimmersFemale46} />
        <RankedCertRanking group="Altergruppe 56 bis 65 weiblich" title="Weiteste Strecke in der Altersgruppe 56 bis 65 Jahre" swimmers={results.swimmersFemale56} />
        <RankedCertRanking group="Altergruppe 66 bis 75 weiblich" title="Weiteste Strecke in der Altersgruppe 66 bis 75 Jahre" swimmers={results.swimmersFemale66} />
        <RankedCertRanking group="Altergruppe 76 bis 99 weiblich" title="Weiteste Strecke in der Altersgruppe 76 bis 99 Jahre" swimmers={results.swimmersFemale76} />

        <TeamCertRanking group="Beste Leistung sonstiger Teams" title="Beste Leistung sonstiger Teams" teams={results.teams.filter(t => t.teamType === "SONSTIGE")} />
        <TeamCertRanking group="Beste Leistung im Durchschnitt sonstiger Teams" title="Beste Leistung im Durchschnitt sonstiger Teams" teams={results.teams.filter(t => t.teamType === "SONSTIGE")} average />

        <TeamCertRanking group="Beste Leistung eines Firmenteam" title="Beste Leistung eines Firmenteams" teams={results.teams.filter(t => t.teamType === "FIRMA")} />
        <TeamCertRanking group="Beste Leistung im Durchschnitt eines Firmenteams" title="Beste Leistung im Durchschnitt eines Firmenteams" teams={results.teams.filter(t => t.teamType === "FIRMA")} average />

        <TeamCertRanking group="Beste Leistung eines Schwimmvereins" title="Beste Leistung eines Schwimmvereins" teams={results.teams.filter(t => t.teamType === "SCHWIMMVEREIN")} />
        <TeamCertRanking group="Beste Leistung im Durchschnitt eines Schwimmvereins" title="Beste Leistung im Durchschnitt eines Schwimmvereins" teams={results.teams.filter(t => t.teamType === "SCHWIMMVEREIN")} average />
    </div>
}