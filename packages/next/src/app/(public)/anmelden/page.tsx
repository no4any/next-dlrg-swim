import { Button, ButtonError, ButtonInfo, ButtonSuccess } from "@/src/components/Button.component";
import Link from "next/link";
import React from "react";
import { FaSwimmer, FaUber, FaUbuntu } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";

export default function RegisterPage() {
    return <div>
        <div>
            <header className="mb-4">
                <h1 className="mb-4">
                    Anmeldung
                    <small className="ms-2 font-semibold text-dlrg-black-100">
                        zum 24 Stunden Schwimmen 2026
                    </small>
                </h1>
                <div>
                    <p>Hier melden Sie sich unverbindlich zur 24 Stunden Schwimmer 2025 an. Nach erfolgreicher Anmeldung erhalten Sie eine E-Mail mit Ihren Zugangsdaten. <span className="text-dlrg-red font-bold">Behandeln Sie den enthaltenen Link vertraulich.</span></p>
                    <p className="mt-4">Vor Ort beträgt die Startgebühr 7 &euro;. Außerdem beträgt der Pfand für eine Badekappe 5 &euro;. Es erleichtert uns die Rückgabe, wenn Sie das Pfand passend als 5 &euro; mitbringen können. <b>An der Veranstaltung sind ausschließlich Barzahlungen möglich.</b></p>
                    <p className="mt-4">Sie können nun entscheiden, ob Sie ein Team erstellen möchten oder sich als Einzelschwimmer anmelden möchten. Falls Sie in einem Team mitschwimmen wollen, erstellen Sie ein Team oder fragen Sie einen Teamleiter nach einem Anmeldelink.</p>
                </div>
            </header>
        </div>
        <div className="flex flex-row gap-12 justify-center pt-12">
            <Option icon={<GrGroup className="size-32" />} href="/anmelden/team">Team</Option>
            <Option icon={<FaSwimmer className="size-32" />} href="/anmelden/schwimmer">Schwimmer</Option>
        </div>
    </div>
}

function Option({ children, icon, href }: { children: React.ReactNode, icon: React.ReactNode, href: string }) {
    return <Link href={href}>
        <div className="flex-none bg-gray-200 hover:bg-dlrg-red hover:text-dlrg-yellow transition-colors duration-300 rounded-md p-3">
            <center>
                {icon}
                <h3>{children}</h3>
            </center>
        </div>
    </Link>
}