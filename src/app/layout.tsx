import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { VisitTracker } from "@/components/VisitTracker";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Atul M. Gavaskar",
  description: "Official Academic Portfolio of Dr. Atul M. Gavaskar, Post Graduate Teaching Department of English, Gondwana University, Gadchiroli.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-ivory text-oxford-blue font-sans overflow-x-hidden max-w-[100vw]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <VisitTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
