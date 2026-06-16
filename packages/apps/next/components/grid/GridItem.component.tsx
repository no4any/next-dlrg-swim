import { ReactNode } from "react";

export async function GridItem({ children }: { children: ReactNode }) {
    return <div className="p-1">
        {children}
    </div>
}