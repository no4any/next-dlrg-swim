"use client"

import Link from "next/link";
import { LapsCard } from "../model/LapsCard.zod";

export function SwimmerLapsDetails({laps}:{laps?: LapsCard[] | null}) {
    return laps && laps.length && <div>
        <div className="flex flex-row gap-0-5 p-1 font-bold sticky">
            <div className="flex-1">ID</div>
            <div className="flex-1">Pokal</div>
            <div className="flex-1">Erfasser</div>
            <div className="flex-1">Bahnen</div>
        </div>
        {laps.map((lap, index) => <Link href={`/admin/loggings/${lap.id}`} key={lap.id} ><div className="flex flex-row gap-0-5 hover:bg-gray-200 rounded-md p-1">
            <div className="flex-1">{lap.id}</div>
            <div className="flex-1">{lap.isNightCup && "Nachpokal"}</div>
            <div className="flex-1">{lap.editor}</div>
            <div className="flex-1">{lap.laps}</div>
        </div>
        </Link>)}
    </div>
}