import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SideBar } from "@/components/bar/SideBar";
import { NavBar } from "@/components/bar/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDLEGLANCE AI",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <head/>
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <div className="flex flex-row gap-4 overflow-y-auto">
            <SideBar />
            <div className="w-full h-full ml-14 mt-8">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
