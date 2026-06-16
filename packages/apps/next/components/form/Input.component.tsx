import { ReactNode } from "react";

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input(props: { children: ReactNode, type?: "text" | "number" | "date" } & InputProps) {
    const { children, className, ...p } = props;
    return <div className="w-full select-none">
        <label className="cursor-pointer">
            <b>{children}</b>
            <input className="w-full border-b backdrop-blur-lg" {...p} />
        </label>
    </div>
}