import { CapColor } from "@/src/model";
import { getSwimmerByCap, getSwimmerByRegNr } from "@/src/mongo/swimmer.mongo";
import z from "zod";

export async function errorTreat(e: unknown, capColor: CapColor, capNr: number, regNr: number) {
    if (e instanceof z.ZodError) {
        return { errors: e.issues.map((e) => e.message) }
    }
    const swimmerByReg = await getSwimmerByRegNr(regNr);
    if (swimmerByReg) return { errors: ["Schwimmer mit diesem Registernummer existiert bereits!"] }
    const swimmerByCap = await getSwimmerByCap(capNr ?? 0, capColor ?? "UNDEFINED");
    if (swimmerByCap) return { errors: ["Schwimmer mit dieser Capnummer existiert bereits!"] }

    console.error(e);
    return { unknownError: true }
}