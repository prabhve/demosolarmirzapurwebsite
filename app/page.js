'use client';

import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Stats from '../components/Stats/Stats';
import Services from '../components/Services/Services';
import WhyUs from '../components/WhyUs/WhyUs';
import Brands from '../components/Brands/Brands';
import SuryaGhar from '../components/SuryaGhar/SuryaGhar';
import Projects from '../components/Projects/Projects';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import WhatsAppButton from '../components/WhatsAppButton/WhatsAppButton';
import AdminModal from '../components/AdminModal/AdminModal';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Brands />
      <SuryaGhar />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <AdminModal />
    </main>
  );
}
