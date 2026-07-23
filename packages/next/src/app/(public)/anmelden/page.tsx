import { Button, ButtonError, ButtonInfo, ButtonSuccess } from "@/src/components/Button.component";
import Link from "next/link";
import React from "react";
import { FaSwimmer, FaUber, FaUbuntu } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";

export default function RegisterPage() {
    return <div>
        <div>
            <h1>Anmeldung zum 24-Stunden-Schwimmen 2026</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore aperiam consequatur perspiciatis ipsa accusantium dolores eaque eius eligendi iusto dolor, ut maiores. Molestias illo sunt quisquam! Neque eos similique obcaecati.</p>
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