import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./nav/NavBar";
import QueryProvider from "./providers/QueryProvider";
import "@uploadthing/react/styles.css";
import ToasterProvider from "./providers/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoBidHub",
  description: "Your friend to find good cars to buy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <QueryProvider>
          <ToasterProvider />
          <NavBar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
