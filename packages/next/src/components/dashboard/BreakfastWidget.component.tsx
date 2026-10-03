import { getAllSwimmers } from "@/src/mongo/swimmer.mongo";
import { Widget } from "./Widget.component";
import { Swimmer } from "@/src/model";
import Link from "next/link";

export async function BreakfastWidget({ swimmers }: { swimmers: Swimmer[] }) {
    const breakfastCount = swimmers.filter(s => s.breakfast).length
    const breakfastCountPaid = swimmers.filter(s => s.breakfast && s.status !== "ANNOUNCED").length

    return <Link prefetch={false} href="/admin/breakfast">
        <Widget title="Frühstück">
            <div className="text-center">Bezahlt</div>
            <div className="text-8xl text-center">{breakfastCountPaid}</div>
            <div className="text-center">Vorangemeldet</div>
            <div className="text-4xl text-center">{breakfastCount}</div>
        </Widget>
    </Link>
}