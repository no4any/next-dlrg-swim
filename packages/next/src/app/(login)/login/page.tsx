import LoginForm from "@/src/components/forms/login/LoginForm.component";
import { Suspense } from "react";

export default async function LoginPage() {
    return <div>
        <h1 className="mb-4">Login Page</h1>
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    </div>
}