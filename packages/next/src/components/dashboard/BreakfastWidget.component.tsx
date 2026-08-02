import { getAllSwimmers } from "@/src/mongo/swimmer.mongo";
import { Widget } from "./Widget.component";
import { Swimmer } from "@/src/model";

export async function BreakfastWidget({swimmers}: {swimmers: Swimmer[]}) {
    const breakfastCount = swimmers.filter(s => s.breakfast).length
    return <Widget title="Frühstück">
        <div className="text-8xl text-center md:pt-10">
            {breakfastCount}
        </div>
    </Widget>
}