"use client";

import { FaFlagCheckered, FaQuestion } from "react-icons/fa";
import { RegistrationStatus } from "../model";
import { IoMdPlay } from "react-icons/io";

export function Status({status}:{status: RegistrationStatus}) {
    switch(status) {
        case "ANNOUNCED": return <FaQuestion className="bg-gray-400 rounded-full p-1" role="img" title="Angemeldet" />;
        case "REGISTERED": return <IoMdPlay className="bg-green-600 rounded-full p-1" role="img" title="Registriert" />;
        case "FINISHED": return <FaFlagCheckered className="border border-black rounded-full p-1" role="img" title="Beendet" />;
    }
}