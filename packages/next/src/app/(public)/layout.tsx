import type { Metadata } from "next";
import "../globals.css";
import { Footer } from "./Footer";
import { Suspense } from "react";
import { Spinner } from "../(admin)/admin/Spinner";

export const metadata: Metadata = {
  title: "DLRG Gießene | 24 Stunden Schwimmen 2026",
  description: "DLRG Gießene | 24 Stunden Schwimmen 2026",
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
      <body className="h-full bg-dlrg-red text-black">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 h-full flex flex-2 flex-col gap-2 py-1">
          <main className="grow bg-white rounded-md p-3">
            <Suspense fallback={<Spinner />}>
              {children}
            </Suspense>
          </main>
          <div className="flow-none bg-white rounded-md p-3">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
