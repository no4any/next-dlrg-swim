import FindSwimmerByCapColorForm from "./FindSwimmerByCapForm.component"
import FindSwimmerByRegNrForm from "./FindSwimmerByRegNrForm.component"

export default async function FindSwimmerForLogForm() {
    return <div>
        <h2>Nach Kappen und Nummer</h2>
        <FindSwimmerByCapColorForm />
        <h2>Nach Registriernummer</h2>
        <FindSwimmerByRegNrForm />
    </div>
}