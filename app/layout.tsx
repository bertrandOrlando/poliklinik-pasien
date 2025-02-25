import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import NavbarWrapper from "@/components/NavbarWrapper";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Klinik Vida",
  description: "Sistem Informasi Klinik Vida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <AppRouterCacheProvider>
          <NextUIProvider>
            <NavbarWrapper />
            <div className="min-h-[calc(100vh-130px)]">{children}</div>
            <Footer />
          </NextUIProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
