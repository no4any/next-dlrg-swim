import { DarkToggle } from "../DarkToggle.component";

export function Header() {
    return <header className="sticky top-0 z-50 w-full border-b border-accent bg-bg-menu backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex flex-1 items-center justify-start">
                <a href="#" className="text-xl font-bold tracking-tight text-accent">
                    Mein<span className="text-blue-600">Logo</span>
                </a>
            </div>

            <nav className="hidden md:flex space-x-8">
                <a href="#" className="text-sm font-medium text-accent transition-colors hover:text-text">Startseite</a>
                <a href="#" className="text-sm font-medium text-accent transition-colors hover:text-text">Funktionen</a>
                <a href="#" className="text-sm font-medium text-accent transition-colors hover:text-text">Preise</a>
                <a href="#" className="text-sm font-medium text-accent transition-colors hover:text-text">Über uns</a>
            </nav>

            <div className="flex flex-1 items-center justify-end space-x-4">
                <DarkToggle />
            </div>

            <div className="flex md:hidden">
                <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
                    <span className="sr-only">Menü öffnen</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor">
                        <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
            </div>

        </div>
    </header>
    //return <header className="bg-bg-menu sticky top-0">
    //    asdf
    //</header>
}