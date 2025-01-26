import localFont from "next/font/local";
import { Inter, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import { LayoutWrapper } from "./components/layout-wrapper";
import { metadata } from './metadata';

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

export { metadata };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${robotoMono.variable} ${archiveGrotesk.variable}`}
      >
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
