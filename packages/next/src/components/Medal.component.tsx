"use client"

import { Swimmer } from "../model";
import { getYouthMedal } from '../lib'
import { FaMedal } from "react-icons/fa";

export function Medal({ distance, swimmer }: { distance: number, swimmer: Swimmer }) {
    if (!swimmer.birthday) return <></>;

    const medal = getYouthMedal(distance, new Date(swimmer.birthday));

    switch (medal) {
        case "Gold": return <FaMedal className="bg-gold rounded-md p-1" role="img" title="Gold" />
        case "Silber": return <FaMedal className="bg-silver rounded-md p-1" role="img" title="Silber" />
        case "Bronze": return <FaMedal className="bg-bronze rounded-md p-1" role="img" title="Bronze" />
    }
}