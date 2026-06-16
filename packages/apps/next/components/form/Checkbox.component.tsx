import { ReactNode } from "react";

type CheckBoxProps = any;

export function CheckBox(props: {children: ReactNode} & CheckBoxProps) {
    const {className, children, ...p} = props;
    return <div className="w-full select-none">
        <label className="cursor-pointer">
            <input type="checkbox" className="mr-2"/>
            {children}
        </label>
    </div>
}