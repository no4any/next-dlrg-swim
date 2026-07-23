import Link from "next/link";

export function Footer() {
    return <footer className="flex flex-row-reverse gap-4">
        <Link className="shrink text-dlrg-red hover:text-dlrg-red/90 transition-colors duration-300" href="https://giessen.dlrg.de/impressum-und-datenschutz/">Impressum</Link>
        <Link className="shrink text-dlrg-red hover:text-dlrg-red/90 transition-colors duration-300" href="/datenschutz">Datenschutz</Link>
    </footer>
}