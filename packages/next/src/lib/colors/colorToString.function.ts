import { CapColor } from "@/src/model";

export function colorToString(capColor: CapColor) {
    switch (capColor) {
        case "RED":
            return "Rot";
        case "ORANGE":
            return "Orange";
        case "GREEN":
            return "Grün";
        case "YELLOW":
            return "Gelb";
        case "BLUE":
            return "Blau";
        case "WHITE":
            return "Weiß";
        default:
            return "???";
    }
}