import { Spinner } from "@/src/app/(admin)/admin/Spinner";
import { Suspense } from "react";

export default function SuspenseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Suspense fallback={<Spinner />}>
        {children}
    </Suspense>;
}
