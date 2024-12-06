import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "./components/sidebar";
import { ThemeProvider } from "./components/theme-provider";
import styles from "./layout.module.css";

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${archiveGrotesk.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className={styles.layout}>
            <Sidebar />
            <main className={styles.main}>
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
