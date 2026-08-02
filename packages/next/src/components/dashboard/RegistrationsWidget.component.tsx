import { getAllSwimmers } from "@/src/mongo/swimmer.mongo";
import { Widget } from "./Widget.component";
import { cacheLife } from "next/cache";

export async function RegistrationsWidget() {
    "use cache"
    cacheLife("minutes");
    const swimmers = await getAllSwimmers();
    const allCount = swimmers.length;
    const registeredCount = swimmers.filter(s => s.status !== "ANNOUNCED").length;
    return <Widget title="Anmeldungen">
        <div className="text-center">Aktiv angemeldet</div>
        <div className="text-8xl text-center">{allCount}</div>
        <div className="text-center">Online angemeldet</div>
        <div className="text-4xl text-center">{registeredCount}</div>
    </Widget>
}