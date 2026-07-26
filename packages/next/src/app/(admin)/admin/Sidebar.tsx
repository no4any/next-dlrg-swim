"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCalculator, FaSwimmer } from "react-icons/fa";
import { GrGroup, GrUser } from "react-icons/gr";
import { LuLogOut } from "react-icons/lu";

export function Sidebar() {
    return <div className="md:h-full flex md:flex-col flex-row gap-4 bg-dlrg-red p-2">
        <div className="flex md:flex-col flex-row gap-4 grow">
            <SidebarLink href="/admin">
                <AiOutlineDashboard className="size-8" />
            </SidebarLink>
            <SidebarLink href="/admin/swimmers">
                <FaSwimmer className="size-8" />
            </SidebarLink>
            <SidebarLink href="/admin/teams">
                <GrGroup className="size-8" />
            </SidebarLink>
            <SidebarLink href="/admin/log">
                <div>
                    <FaCalculator className="size-8" />
                </div>
            </SidebarLink>
        </div>
        <div className="flex md:flex-col flex-row gap-4 shrink md:border-t-2 md:border-t-dlrg-yellow md:pt-2">
            <SidebarLink href="/admin/logout" prefetch={false}>
                <div>
                    <LuLogOut className="size-8" />
                </div>
            </SidebarLink>

            <SidebarLink href="/admin/user">
                <div>
                    <GrUser className="size-8" />
                </div>
            </SidebarLink>
        </div>
    </div>
}

function SidebarLink({ href, children, prefetch }: { href: string, children: React.ReactNode, prefetch?:boolean }) {
    const pathname = usePathname();
    const active = pathname === href ? { "data-active": true } : {}

    return <Link href={href} {...active} prefetch={prefetch} className=" data-active:text-dlrg-yellow text-black bg-transparent rounded-md hover:bg-gray-400 p-1">
        {children}
    </Link>
}