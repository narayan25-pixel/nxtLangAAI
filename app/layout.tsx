import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import SideBar from "./components/SideBar/SideBar";

export const metadata: Metadata = {
  title: "Atmagyaan - Life Manual from Bhagavad Gita",
  description: "Self-knowledge and wisdom for life's journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

      </head>
      <body className={` antialiased`}>

        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Sidebar - Fixed on desktop, top navbar on mobile */}
          <div className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-64 bg-orange-300 z-50">
            <SideBar />
          </div>
          {/* Main content - Offset on desktop to account for fixed sidebar */}
          <div className="flex-1 lg:ml-64 p-6 lg:p-10 relative overflow-hidden min-h-screen">
            <Providers>{children}</Providers>
          </div>
        </div>

      </body>
    </html>
  );
}
