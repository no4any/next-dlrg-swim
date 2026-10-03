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

    const swimmersMale = results.swimmersMale.slice(0, 3);
    const swimmersFemale = results.swimmersFemale.slice(0, 3);

    const swimmersMaleNight = results.swimmersMaleNight.slice(0, 3);
    const swimmersFemaleNight = results.swimmersFemaleNight.slice(0, 3);

    return <div className="print">
        {results.swimmerYoungestMale ? <PlainCert swimmer={results.swimmerYoungestMale} title="Jüngster Teilnehmer" /> : <></>}
        {results.swimmerYoungestFemale ? <PlainCert swimmer={results.swimmerYoungestFemale} title="Jüngste Teilnehmerin" /> : <></>}
        {results.swimmerOldestMale ? <PlainCert swimmer={results.swimmerOldestMale} title="Ältester Teilnehmer" /> : <></>}
        {results.swimmerOldestFemale ? <PlainCert swimmer={results.swimmerOldestFemale} title="Älteste Teilnehmerin" /> : <></>}

        <div className="page">
            <h1>Weiteste Strecke männlich</h1>
            {swimmersMale.map(s => <p key={s._id.toString()}>{s.firstName} {s.lastName}: {s.total.toLocaleString('de-DE')}m</p>)}
        </div>
        {swimmersMale.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke" swimmer={swimmer} />)}
        <div className="page">
            <h1>Weiteste Strecke weiblich</h1>
            {swimmersFemale.map(s => <p key={s._id.toString()}>{s.firstName} {s.lastName}: {s.total.toLocaleString('de-DE')}m</p>)}
        </div>
        {swimmersFemale.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke" swimmer={swimmer} />)}

        <div className="page">
            <h1>Nachtpokal männlich</h1>
            {swimmersMaleNight.map(s => <p key={s._id.toString()}>{s.firstName} {s.lastName}: {s.total.toLocaleString('de-DE')}m</p>)}
        </div>
        {swimmersMaleNight.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Nachtpokal" swimmer={swimmer} />)}
        <div className="page">
            <h1>Nachtpokal männlich</h1>
            {swimmersFemaleNight.map(s => <p key={s._id.toString()}>{s.firstName} {s.lastName}: {s.total.toLocaleString('de-DE')}m</p>)}
        </div>
        {swimmersFemaleNight.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Nachtpokal" swimmer={swimmer} />)}

        <div className="page"><h1>Altergruppe 15 bis 17 männlich</h1></div>
        {results.swimmersMale15.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 15 bis 17 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 18 bis 25 männlich</h1></div>
        {results.swimmersMale18.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 18 bis 25 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 26 bis 35 männlich</h1></div>
        {results.swimmersMale26.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 26 bis 35 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 36 bis 45 männlich</h1></div>
        {results.swimmersMale36.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 36 bis 45 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 46 bis 55 männlich</h1></div>
        {results.swimmersMale46.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 46 bis 55 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 56 bis 65 männlich</h1></div>
        {results.swimmersMale56.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 56 bis 65 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 66 bis 75 männlich</h1></div>
        {results.swimmersMale66.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 66 bis 75 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 76 bis 99 männlich</h1></div>
        {results.swimmersMale76.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 76 bis 99 Jahre" swimmer={swimmer} />)}

        <div className="page"><h1>Altergruppe 15 bis 17 weiblich</h1></div>
        {results.swimmersFemale15.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 15 bis 17 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 18 bis 25 weiblich</h1></div>
        {results.swimmersFemale18.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 18 bis 25 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 26 bis 35 weiblich</h1></div>
        {results.swimmersFemale26.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 26 bis 35 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 36 bis 45 weiblich</h1></div>
        {results.swimmersFemale36.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 36 bis 45 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 46 bis 55 weiblich</h1></div>
        {results.swimmersFemale46.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 46 bis 55 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 56 bis 65 weiblich</h1></div>
        {results.swimmersFemale56.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 56 bis 65 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 66 bis 75 weiblich</h1></div>
        {results.swimmersFemale66.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 66 bis 75 Jahre" swimmer={swimmer} />)}
        <div className="page"><h1>Altergruppe 76 bis 99 weiblich</h1></div>
        {results.swimmersFemale76.slice(0, 3).map((swimmer, i) => <RankedCert key={i} rank={++i} title="Weiteste Strecke in der Altersgruppe 76 bis 99 Jahre" swimmer={swimmer} />)}

        <div className="page"><h2>Beste Leistung sonstiger Teams</h2></div>
        {results.teams.filter(t => t.teamType === "SONSTIGE").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung sonstiger Teams" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt sonstiger Teams</h2></div>
        {results.teamsAvg.filter(t => t.teamType === "SONSTIGE").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt sonstiger Teams" team={team} />)}

        <div className="page"><h2>Beste Leistung eines Firmenteam</h2></div>
        {results.teams.filter(t => t.teamType === "FIRMA").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung eines Firmenteams" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt eines Firmenteam</h2></div>
        {results.teamsAvg.filter(t => t.teamType === "FIRMA").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt eines Firmenteams" team={team} />)}

        <div className="page"><h2>Beste Leistung eines Vereinsteams</h2></div>
        {results.teams.filter(t => t.teamType === "VEREIN").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung eines Vereinsteams" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt eines Vereinsteams</h2></div>
        {results.teamsAvg.filter(t => t.teamType === "VEREIN").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt eines Vereinsteams" team={team} />)}

        <div className="page"><h2>Beste Leistung eines Schwimmvereinsteams</h2></div>
        {results.teams.filter(t => t.teamType === "SCHWIMMVEREIN").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung eines Schwimmvereinsteams" team={team} />)}
        <div className="page"><h2>Beste Leistung im Durchschnitt eines Schwimmvereinsteams</h2></div>
        {results.teamsAvg.filter(t => t.teamType === "SCHWIMMVEREIN").slice(0, 3).map((team, i) => <TeamCert key={i} rank={++i} title="Beste Leistung im Durchschnitt eines Schwimmvereinsteams" team={team} />)}
    </div>
}