import { Swimmer } from "@/src/model";
import { Widget } from "./Widget.component";

export async function RegistrationsWidget({swimmers}: {swimmers: Swimmer[]}) {
    const allCount = swimmers.length;
    const registeredCount = swimmers.filter(s => s.status !== "ANNOUNCED").length;
    return <Widget title="Anmeldungen">
        <div className="text-center">Aktiv angemeldet</div>
        <div className="text-8xl text-center">{registeredCount}</div>
        <div className="text-center">Online angemeldet</div>
        <div className="text-4xl text-center">{allCount}</div>
    </Widget>
}