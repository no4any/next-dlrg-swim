export function Button({ children, onClick }: Readonly<{ children: React.ReactNode, onClick: ()=>void }>) {
    return <button
        type="button"
        onClick={onClick}
        className="text-text cursor-pointer bg-middle box-border border rounded-xl border-transparent shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5"
    >{children}</button>
}