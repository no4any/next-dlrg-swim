import { CapColor } from "@/src/model";

export function borderColorForCapColor(capColor: CapColor) {
    switch (capColor) {
        case "RED":
            return "border-cap-red-border";
        case "ORANGE":
            return "border-cap-orange-border";
        case "GREEN":
            return "border-cap-green-border";
        case "YELLOW":
            return "border-cap-yellow-border";
        case "BLUE":
            return "border-cap-blue-border";
        case "WHITE":
            return "border-cap-white-border";
        default:
            return "border-cap-white-border";
    }
}