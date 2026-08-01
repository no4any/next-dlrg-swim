import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    title: string,
    optional?: boolean
};

export function Input({title, className, optional, ...rest}: InputProps) {
    return <div className="w-full">
        <label>
            <div><span className="text-md select-none font-bold">{title}</span> {optional && <span className="text-sm text-dlrg-red"> (optional)</span>}</div>
            <input {...rest} className="w-full border border-gray-300 rounded-md p-2 focus:font-bold"/>
        </label>
    </div>
}