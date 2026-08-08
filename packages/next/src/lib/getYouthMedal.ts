import { getAge } from "./getAge.function";

export type Medal = null | "Gold" | "Silber" | "Bronze";

interface Rating {
    bronze: number,
    silver: number,
    gold: number
}

interface AgeRatings {
    5: Rating,
    6: Rating,
    7: Rating,
    8: Rating,
    9: Rating,
    10: Rating,
    11: Rating,
    12: Rating,
    13: Rating,
    14: Rating,
}

export const YOUTH_MEDAL_DATA: AgeRatings = {
    5: { bronze: 200, silver: 400, gold: 600 },
    6: { bronze: 400, silver: 800, gold: 1200 },
    7: { bronze: 800, silver: 1600, gold: 2400 },
    8: { bronze: 1200, silver: 2400, gold: 3600 },
    9: { bronze: 1600, silver: 3200, gold: 4800 },
    10: { bronze: 2000, silver: 4000, gold: 6200 },
    11: { bronze: 2600, silver: 5200, gold: 8000 },
    12: { bronze: 3200, silver: 6400, gold: 10000 },
    13: { bronze: 3800, silver: 7600, gold: 12000 },
    14: { bronze: 4600, silver: 9200, gold: 14000 },
} as const;

export function getYouthMedal(distance: number, birthday?: Date): Medal {
    if (!birthday) {
        return null;
    }

    const age = getAge(birthday);

    if (age >= 5 && age <= 14) {
        const ratings = YOUTH_MEDAL_DATA[age as keyof typeof YOUTH_MEDAL_DATA];

        if (ratings.gold <= distance) {
            return "Gold";
        }

        if (ratings.silver <= distance) {
            return "Silber";
        }

        if (ratings.bronze <= distance) {
            return "Bronze";
        }
    }

    return null;
}