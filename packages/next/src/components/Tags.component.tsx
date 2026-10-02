"use client"

import { Swimmer } from "../model";
import { Medal } from "./Medal.component";
import { Status } from "./Status.component";

export function Tags({ swimmer, distance }: { swimmer: Swimmer, distance?: number }) {
    return <>
        <Status status={swimmer.status} />
        {distance ? <Medal distance={distance} swimmer={swimmer} /> : <></>}
    </>
}