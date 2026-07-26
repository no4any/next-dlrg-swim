import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";
import { redirect } from "next/navigation";

export function preventPreRendering(): void {
    if(process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD){
        redirect("/");
    }
}