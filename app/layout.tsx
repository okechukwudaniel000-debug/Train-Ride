// @ts-ignore -- Next.js types are unavailable in this environment.
import type {Metadata} from 'next';
// @ts-ignore -- Next.js font types are unavailable in this environment.
import { Barlow, Barlow_Condensed } from 'next/font/google';
import { createElement, type ReactNode } from 'react';
// @ts-ignore -- CSS declarations are unavailable in this environment.
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

export default function RootLayout({children}: {children: ReactNode}) {
  return createElement(
    'html',
    { lang: 'en', className: `${barlow.variable} ${barlowCondensed.variable}` },
    createElement('body', { suppressHydrationWarning: true }, children),
  );
}
