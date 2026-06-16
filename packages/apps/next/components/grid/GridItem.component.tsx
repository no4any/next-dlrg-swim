import { ReactNode } from "react";

export function GridItem({ children }: { children: ReactNode }) {
    return <div className="p-1">
        {children}
    </div>
}