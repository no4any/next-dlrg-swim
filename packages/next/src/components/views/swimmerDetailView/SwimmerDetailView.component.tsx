"use client"

import { Swimmer, Team } from "@/src/model";
import { useEffect, useState, useTransition } from "react";
import { Tags } from "../../Tags.component";
import { ButtonSuccess, ButtonWarn } from "../../Button.component";
import { SwimmerDetails } from "../../SwimmerDetails";
import { finishToggleAction } from "./finishToggleAction.action";
import Link from "next/link";

export function SwimmerDetailView({ swimmer, team }: { swimmer: Swimmer, team?: Team }) {
    const [currentSwimmer, setCurrentSwimmer] = useState(swimmer);
    const [disabled, startTransition] = useTransition();

    useEffect(() => {
        setCurrentSwimmer(swimmer);
    }, [swimmer]);

    function toggleFinish() {
        startTransition(async ()=>{
            const resultSwimmer = await finishToggleAction(currentSwimmer._id);
            if(resultSwimmer) setCurrentSwimmer(resultSwimmer);
        })
    }

    return <div>
        <div className="flex-1 flex-row flex gap-1 text-2xl mt-2">
            <Tags swimmer={currentSwimmer} />
        </div>
        <div className="py-4">
            {swimmer.status === "ANNOUNCED" ? <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/register`} className="pr-2"><ButtonSuccess>Anmelden</ButtonSuccess></Link> : <></>}
            {swimmer.status === "REGISTERED" ? <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/updateRegistration`} className="pr-2"><ButtonSuccess>Registrierung ändern</ButtonSuccess></Link> : <></>}
            {swimmer.status !== "ANNOUNCED" ?<ButtonWarn disabled={disabled} onClick={toggleFinish}>{swimmer.status === "REGISTERED" ? "Schwimmer beendet" : "Schwimmer reaktivieren"}</ButtonWarn> : <></>}
        </div>
        <SwimmerDetails swimmer={swimmer} team={team} />
    </div>
}