import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from './layout-client';
import ThemeRegistry from './ThemeRegistry';
import { ToolsStoreProvider } from './providers/ToolsStoreProvider';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tools Collection",
  description: "A collection of useful developer tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeRegistry>
          <ToolsStoreProvider>
            <ClientLayout>{children}</ClientLayout>
          </ToolsStoreProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
