import { RegistrationStatus } from "../model";

export function statusToString(status?: RegistrationStatus) {
    switch(status) {
        case "ANNOUNCED": return "Online angemeldet";
        case "REGISTERED": return "Angemeldet";
        case "FINISHED": return "Abgeschlossen";
        default: return "Unbekannt";
    }
}