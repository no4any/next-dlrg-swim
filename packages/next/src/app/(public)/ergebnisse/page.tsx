import { cacheLife } from "next/cache";

function dateToGermanDateWithTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${leadingZero(day)}.${leadingZero(month)}.${year} um ${leadingZero(hours)}:${leadingZero(minutes)}:${leadingZero(seconds)}`;
}

function leadingZero(value: number) {
    return value < 10 ? `0${value}` : value;
}

const FIVE_MINUTES = 300;

export default async function ResultsPage() {
    "use cache"
    //cacheLife('minutes')
    cacheLife({
        stale: FIVE_MINUTES,
        expire: FIVE_MINUTES,
        revalidate: FIVE_MINUTES
    })
    return <div>
        <h1>Ergebnisse</h1>
        <div className="my-4"><span className="font-bold">Letzte Aktualisierung:</span><span className="italic">{dateToGermanDateWithTime()}</span></div>
    </div>
}