"use client"

import { Swimmer, Team } from "@/src/model";
import { useEffect, useState, useTransition } from "react";
import { Tags } from "../../Tags.component";
import { ButtonError, ButtonSuccess, ButtonWarn } from "../../Button.component";
import { SwimmerDetails } from "../../SwimmerDetails";
import { finishToggleAction } from "./finishToggleAction.action";
import Link from "next/link";
import { Medal } from "@/src/lib";
import { removeCapAction } from "./removeCapAction";

export function SwimmerDetailView({ swimmer, team, medal }: { swimmer: Swimmer, team?: Team, medal?: Medal }) {
    const [currentSwimmer, setCurrentSwimmer] = useState(swimmer);
    const [disabled, startTransition] = useTransition();

    useEffect(() => {
        setCurrentSwimmer(swimmer);
    }, [swimmer]);

    function toggleFinish() {
        startTransition(async () => {
            const resultSwimmer = await finishToggleAction(currentSwimmer._id);
            if (resultSwimmer) setCurrentSwimmer(resultSwimmer);
        })
    }

    return <div>
        <div className="flex-1 flex-row flex gap-1 text-2xl mt-2">
            <Tags swimmer={currentSwimmer} />
        </div>
        <div className="py-4">
            {swimmer.status === "ANNOUNCED" ? <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/register`} className="pr-2"><ButtonSuccess>Anmelden</ButtonSuccess></Link> : <></>}
            {swimmer.status === "REGISTERED" ? <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/updateRegistration`} className="pr-2"><ButtonSuccess>Registrierung ändern</ButtonSuccess></Link> : <></>}
            {swimmer.status !== "ANNOUNCED" ? <span className="pr-2"><ButtonWarn disabled={disabled} onClick={toggleFinish}>{swimmer.status === "REGISTERED" ? "Schwimmer beendet" : "Schwimmer reaktivieren"}</ButtonWarn></span> : <></>}
            {swimmer.capColor || swimmer.capNr ? <span className="pr-2"><ButtonError disabled={disabled} onClick={() => {
                if(confirm('Badekappe wirklich abnehmen?')) {
                    removeCapAction(swimmer._id || "")
                }
            }}>Badekappe abnehmen</ButtonError></span> : <></>}
            {swimmer.type !== "MANAGED" ? <Link prefetch={false} className="pr-2" href={`/admin/swimmers/${swimmer._id?.toString()}/updateTeam`}><ButtonError disabled={disabled}>Team ändern</ButtonError></Link> : <></>}
            {medal ? <Link prefetch={false} className="pr-2" href={`/admin/swimmers/${swimmer._id?.toString()}/print`}><ButtonError disabled={disabled}>Urkunde drucken</ButtonError></Link> : <></>}
            <Link prefetch={false} href={`/admin/swimmers/${swimmer._id?.toString()}/update`}><ButtonError disabled={disabled}>Anmeldedaten ändern</ButtonError></Link>
        </div>
        <SwimmerDetails swimmer={swimmer} team={team} />
    </div>
}