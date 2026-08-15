import { CapColor } from "@/src/model";

export function colorForCapColor(capColor: CapColor) {
    switch (capColor) {
        case "RED":
            return "bg-cap-red";
        case "ORANGE":
            return "bg-cap-orange";
        case "GREEN":
            return "bg-cap-green";
        case "YELLOW":
            return "bg-cap-yellow";
        case "BLUE":
            return "bg-cap-blue";
        case "WHITE":
            return "bg-cap-white";
        default:
            return "bg-cap-white";
    }
}