import Link from "next/link";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaCalculator, FaSwimmer } from "react-icons/fa";
import { GrGroup, GrUser } from "react-icons/gr";

export async function Sidebar() {
    return <div className="md:h-full flex md:flex-col flex-row gap-4 bg-dlrg-red p-2">
        <div className="flex md:flex-col flex-row gap-4 grow">
            <Link href="/admin">
                <div>
                    <AiOutlineDashboard className="size-8" />
                </div>
            </Link>
            <Link href="/admin">
                <div>
                    <FaSwimmer className="size-8" />
                </div>
            </Link>
            <Link href="/admin">
                <div>
                    <GrGroup className="size-8" />
                </div>
            </Link>
            <Link href="/admin">
                <div>
                    <FaCalculator className="size-8" />
                </div>
            </Link>
        </div>
        <div className="flex flex-col gap-4 shrink border-t-2 border-t-dlrg-yellow">
            <Link href="/admin">
                <div>
                    <GrUser className="size-8" />
                </div>
            </Link>
        </div>
    </div>
}