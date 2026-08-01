import { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    title: string
};

export function Select({ title, className, children, ...rest }: SelectProps) {
    return <div className="w-full">
        <div className="text-md select-none font-bold">{title}</div>
        <select {...rest} className="w-full border border-gray-300 rounded-md p-2">
            {children}
        </select>
    </div>
}