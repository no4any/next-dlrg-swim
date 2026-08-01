"use cache"

import Link from "next/link";

export async function Footer() {
    return <footer className="flex flex-col-reverse md:flex-row-reverse gap-4">
        <Link prefetch={false} className="shrink text-dlrg-red hover:text-dlrg-red/80 transition-colors duration-300" href="https://giessen.dlrg.de/impressum-und-datenschutz/">Impressum</Link>
        <Link prefetch={false} className="shrink text-dlrg-red hover:text-dlrg-red/80 transition-colors duration-300" href="/datenschutz">Datenschutz</Link>
        <Link prefetch={false} className="shrink text-dlrg-red hover:text-dlrg-red/80 transition-colors duration-300" href="/admin">Verwaltung</Link>
        <Link prefetch={false} className="shrink text-dlrg-red hover:text-dlrg-red/80 transition-colors duration-300" href="/ergebnisse">Ergebnisse</Link>
        <Link prefetch={false} className="shrink text-dlrg-red hover:text-dlrg-red/80 transition-colors duration-300" href="/">Startseite</Link>
    </footer>
}