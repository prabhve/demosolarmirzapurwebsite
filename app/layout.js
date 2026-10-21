'use client';

import './globals.css';
import { Inter, Poppins } from 'next/font/google';
import { SiteDataProvider } from '../context/SiteDataContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <SiteDataProvider>
      <div className={`${inter.variable || ''} ${poppins.variable || ''} app-root`}>
        {children}
      </div>
    </SiteDataProvider>
  );
}
