import { CapColor } from "../model";

export function capColorToReadable(color: CapColor) {
    switch (color) {
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
            return "Weiß"
        default:
            return "Keine Kappenfarbe";
    }
}