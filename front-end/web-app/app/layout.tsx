import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NavBar from "./nav/NavBar";
import QueryProvider from "./providers/QueryProvider";
import "@uploadthing/react/styles.css";
import ToasterProvider from "./providers/ToasterProvider";
import {SignalRProvider} from "@/app/providers/SignalRProvider";
import {getCurrentUser} from "@/app/actions/authActions";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "AutoBidHub",
    description: "Your friend to find good cars to buy",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getCurrentUser();
    return (
        <html lang="en" data-theme="dark">
        <body className={inter.className}>
        <QueryProvider>
            <ToasterProvider/>
            <NavBar/>
            <SignalRProvider user={user}>
                {children}
            </SignalRProvider>
        </QueryProvider>
        </body>
        </html>
    );
}
