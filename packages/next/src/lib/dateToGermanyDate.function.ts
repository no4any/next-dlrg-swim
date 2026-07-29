export function dateToGermanDate(date:Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${leadingZero(day)}.${leadingZero(month)}.${year}`;
}

function leadingZero(number: number): string {
    return number < 10 ? `0${number}` : `${number}`;
}