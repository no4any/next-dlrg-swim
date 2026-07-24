import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    title: string
};

export function Input({title, className, ...rest}: InputProps) {
    return <div className="w-full">
        <label>
            <div className="text-md select-none">{title}</div>
            <input {...rest} className="w-full border border-gray-300 rounded-md p-2"/>
        </label>
    </div>
}