import type { Metadata } from "next";
import StoreProvider from "@store/StoreProvider";
import Navbar from "@/components/Navbar";
import CostumeAlertProvider from "@/components/CostumeAlertProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meli Challenge",
  description: "Prueba de Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <main className="flex flex-col items-center min-h-screen">
            <Navbar />
            <CostumeAlertProvider>
              {children}
            </CostumeAlertProvider>
          </main>
        </StoreProvider>
      </body>
    </html>
  );
}
