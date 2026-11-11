/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { usePathname } from './shims/next-navigation.js';
import RootLayout from '../app/layout.js';
import HomePage from '../app/page.js';
import BlogPostPage from '../app/blog/[slug]/page.js';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton';
import AdminModal from '../components/AdminModal/AdminModal';

export default function App() {
  const pathname = usePathname();
  const isBlogPost = pathname.startsWith('/blog/');

  return (
    <RootLayout>
      {isBlogPost ? (
        <>
          <Navbar />
          <BlogPostPage />
          <Footer />
          <WhatsAppButton />
          <AdminModal />
        </>
      ) : (
        <HomePage />
      )}
    </RootLayout>
  );
}
