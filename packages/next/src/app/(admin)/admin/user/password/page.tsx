import { ChangePasswordForm } from "@/src/components/forms/changePassword/ChangePasswordForm.component";

export default async function UserPage() {
    "use cache"
    return <div>
        <h1>Passwort ändern</h1>
        <ChangePasswordForm />
    </div>
}