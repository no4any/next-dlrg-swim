import { Input } from "@/components/form/Input.component";
import { Grid } from "@/components/grid/Grid.component";
import { GridItem } from "@/components/grid/GridItem.component";
import { TeamRegistationForm } from "./TeamRegistrationForm.form";

export default function TeamRegistrationPage() {
    return <div className="bg-bg-menu/75 backdrop-blur-sm rounded-2xl p-3 m-5">
        <TeamRegistationForm />
    </div>
}