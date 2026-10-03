import { Suspense } from "react";
import { Results } from "./Results.component";
import { Spinner } from "../../(admin)/admin/Spinner";
import { connection } from "next/server";

export function dateToGermanDateWithTime(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() + 2;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${leadingZero(day)}.${leadingZero(month)}.${year} um ${leadingZero(hours)}:${leadingZero(minutes)}:${leadingZero(seconds)}`;
}

function leadingZero(value: number) {
    return value < 10 ? `0${value}` : value;
}

export const instant = false;

export default async function ResultsPage() {
    await connection();

    return <Suspense fallback={<Spinner />}>
        <Results />
    </Suspense>
}