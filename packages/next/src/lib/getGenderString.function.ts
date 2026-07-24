export function getGenderString(gender?: "M" | "W" | "0"): string {
    switch (gender) {
        case "M":
            return "Männlich";
        case "W":
            return "Weiblich";
        case "0":
            return "Keine Angabe";
    }
    return "Keine Angabe";
}