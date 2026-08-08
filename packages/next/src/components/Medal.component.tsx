import { Swimmer } from "../model";
import { getYouthMedal } from '../lib'
import { FaFlagCheckered, FaMedal } from "react-icons/fa";
import React from "react";

async function MedalRaw({ distance, swimmer }: { distance: number, swimmer: Swimmer }) {
    if (!swimmer.birthday) return <></>;
    if (swimmer.status === "FINISHED") return <FaFlagCheckered className="bg-white rounded-md p-1 size-6" />
    const medal = getYouthMedal(distance, new Date(swimmer.birthday));

    switch (medal) {
        case "Gold": return <FaMedal className="bg-gold rounded-md p-1 size-6" role="img" title="Gold" />
        case "Silber": return <FaMedal className="bg-silver rounded-md p-1 size-6" role="img" title="Silber" />
        case "Bronze": return <FaMedal className="bg-bronze rounded-md p-1 size-6" role="img" title="Bronze" />
    }
}

export const Medal = React.cache(MedalRaw);