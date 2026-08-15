"use client"

import { Swimmer } from "../model";
import { Medal } from "./Medal.component";
import { Status } from "./Status.component";

export function Tags({ swimmer }: { swimmer: Swimmer }) {
    return <>
        <Status status={swimmer.status} />
        <Medal distance={500} swimmer={swimmer} />
    </>
}