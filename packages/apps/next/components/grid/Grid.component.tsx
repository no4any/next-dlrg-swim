import { ReactElement } from "react";
import { GridItem } from "./GridItem.component"

type GridItemElement = ReactElement<typeof GridItem>;
type GridItemElements = GridItemElement | GridItemElement[];

export function Grid({ children }: { children: GridItemElements }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {children}
    </div>
}