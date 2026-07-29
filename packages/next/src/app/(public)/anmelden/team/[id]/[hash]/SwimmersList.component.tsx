"use client"

import { ButtonError } from "@/src/components/Button.component";
import { dateToGermanDate, getGenderString } from "@/src/lib";
import { statusToString } from "@/src/lib/statusToString.function";
import { Swimmer } from "@/src/model";
import { removeSwimmer } from "./removeSwimmer.action";

export function SwimmersList({ swimmers, teamId, teamHash }: { swimmers: Swimmer[], teamId: string, teamHash: string }) {
    return <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-row gap-4 font-bold">
            <div className="flex-1">Name</div>
            <div className="flex-1 hidden md:block">Geburtstag</div>
            <div className="flex-1 hidden md:block">Geschlecht</div>
            <div className="flex-1">Status</div>
            <div className="flex-1 hidden md:block">Frühstück</div>
            <div className="flex-1 hidden md:block">Namen Veröffentlichen</div>
            <div className="flex-1">Optionen</div>
        </div>
        {swimmers.map((swimmer, index) => <SwimmerItem key={index} swimmer={swimmer} teamHash={teamHash} teamId={teamId} />)}
    </div>
}



function SwimmerItem({ swimmer, teamId, teamHash }: { swimmer: Swimmer, teamId: string, teamHash: string }) {
    return <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
            <div className="flex-1">{swimmer.lastName}, {swimmer.firstName}</div>
            <div className="flex-1 hidden xl:block">{swimmer.birthday && dateToGermanDate(new Date(swimmer.birthday))}</div>
            <div className="flex-1 hidden xl:block">{getGenderString(swimmer.gender)}</div>
            <div className="flex-1">{statusToString(swimmer.status)}</div>
            <div className="flex-1 hidden xl:block">{swimmer.breakfast && "Ja"}</div>
            <div className="flex-1 hidden xl:block">{swimmer.publishName && "Ja"}</div>
            <div className="flex-1">{swimmer.type === "MANAGED" && <ButtonError onClick={() => {
                if(confirm(`${swimmer.firstName} ${swimmer.lastName} wirklich löschen?`)) return removeSwimmer(swimmer._id?.toString() || "", teamId, teamHash)
            }}>Löschen</ButtonError>}</div>
        </div>
    </div>
}


/*
            

*/