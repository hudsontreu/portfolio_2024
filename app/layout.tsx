import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import { Sidebar } from "./components/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import Scribble from "./components/scribble";
import styles from "./layout.module.css";
import { SanityLive } from "../sanity/lib/live";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700']
});

const archiveGrotesk = localFont({
  src: [
    {
      path: './fonts/archive_grotesk/ArchivGrotesk-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/archive_grotesk/ArchivGrotesk-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-archive',
});

export const metadata: Metadata = {
  title: "Hudson Treu",
  description: "Design Technologist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${robotoMono.variable} ${archiveGrotesk.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Scribble />
          <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
              {children}
            </main>
          </div>
        </ThemeProvider>
        <SanityLive />
      </body>
    </html>
  );
}
