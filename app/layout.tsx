import type {Metadata} from 'next';
import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Linha 31: An Endless Tram Ride',
  description:
    "An endless, atmospheric 3D ride on Lisbon's historic Linha 31 tram across sunlit cobblestone hills, tiled houses, and winding tracks.",
  openGraph: {
    title: 'Linha 31: An Endless Tram Ride',
    description:
      "An endless, atmospheric 3D ride on Lisbon's historic Linha 31 tram across sunlit cobblestone hills, tiled houses, and winding tracks.",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linha 31: An Endless Tram Ride',
    description:
      "An endless, atmospheric 3D ride on Lisbon's historic Linha 31 tram across sunlit cobblestone hills, tiled houses, and winding tracks.",
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
