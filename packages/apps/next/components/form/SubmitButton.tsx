export function SubmitButton({ children }: { children: string }) {
    return <button type="submit" className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
        {children}
    </button>
}