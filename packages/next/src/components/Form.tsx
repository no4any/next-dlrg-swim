"use client"

import { startTransition } from "react";

export function Form({ children, action, className }: { children: React.ReactNode, action: (payload: FormData) => void, className?: string }) {
    const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(() => {
            action(formData);
        });
    };

    return <form onSubmit={handleSubmit} className={className} method="post">
        {children}
    </form>
}