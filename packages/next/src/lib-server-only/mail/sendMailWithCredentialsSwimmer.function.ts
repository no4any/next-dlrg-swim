import { DOMAIN } from "@/src/props";
import mail from "./mail.function";
import { generateHash } from "@/src/lib-server-only";

export async function sendMailWithCredentialsSwimmer(email: string, name: string, id: string) {
    return await mail(
        email,
        'Anmeldung als Schwimmer bei 24 Stunden Schwimmen',
        `<h1>Deine Anmeldung zum Gießener 24-Stunden-Schwimmen (2026)</h1>
         <p>Mit dieser Mail erhältst Du den Link zu deinen Anmeldedaten und Fortschritten. <b>Behandle diesen Link vertraulich!</b> Sollten Änderungen nötig sein, kannst Du diese beim Check-In am Veranstaltungstag vornehmen lassen.</p>
         <p>Teilnehmer: ${name}</p>
         <p><a href="https://${DOMAIN}/anmelden/schwimmer/${id}/${await generateHash(id)}">Zu deinen Anmeldedaten</a></p>
        `)
}