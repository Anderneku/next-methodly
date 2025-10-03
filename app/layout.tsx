"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ConvexProvider client={convex}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}
