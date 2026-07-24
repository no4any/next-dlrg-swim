import { registerSwimmer } from "@/src/components/forms/swimmer/registerSwimmer.action";
import { SwimmerForm } from "@/src/components/forms/swimmer/SwimmerForm.component";

export default async function RegisterSwimmerPage() {
    return <div>
        <h1>Schwimmer anmeldung</h1>
        <SwimmerForm serverAction={registerSwimmer} submitButtonText="Anmelden" />
    </div>
}