import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "24h Schwimmen | Anmelden",
  description: "Anmeldung für Administratoren",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <body className="flex min-h-screen items-center justify-center h-full bg-dlrg-red text-black">
        <div className="bg-white rounded-md p-4">{children}</div>
      </body>
    </html>
  );
}
