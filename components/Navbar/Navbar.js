'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiSunLine, RiWhatsappLine, RiMenu3Line, RiCloseLine, RiPhoneLine } from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { siteData } = useSiteData();
  const header = siteData?.header || {};
  const phone = header.phone || '+91 9670215052';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'PM Surya Ghar', href: '#surya-ghar' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className={styles.navRoot}>
      {/* Top Announcement Bar */}
      <div className={styles.topTicker}>
        <div className={styles.topTickerContainer}>
          <div className={styles.tickerLeft}>
            <span className={styles.tickerBadge}>
              <span className={styles.tickerDot} />
              {header.tickerBadge || 'UPPCL DISCOM Net-Metering Active'}
            </span>
            <span style={{ color: '#64748B' }}>•</span>
            <span style={{ color: '#CBD5E1' }}>
              {header.tickerText || 'PM Surya Ghar ₹78,000 Direct Bank Subsidy'}
            </span>
          </div>
          <div className={styles.tickerRight}>
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className={styles.tickerPhone} aria-label={`Call ${phone}`}>
              <RiPhoneLine size={13} style={{ color: 'var(--primary-light)' }} />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </div>

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.navContainer}>
          {/* Logo */}
          <a href="#home" className={styles.logo} aria-label="Maa Vindhyavasini Enterprises Home">
            <div className={styles.logoIconWrapper}>
              <RiSunLine size={24} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.brandName}>{header.brandName || 'Maa Vindhyavasini'}</span>
              <span className={styles.brandSubtitle}>{header.brandSubtitle || 'Mirzapur Solar & Electrical EPC'}</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation">
            <ul className={styles.navLinks}>
              {navItems.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className={styles.ctaWrapper}>
            <motion.a
              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                header.brandName || 'Maa Vindhyavasini Enterprises'
              )},%20I%20would%20like%20to%20get%20a%20free%20solar%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quoteBtn}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Get Free Quote on WhatsApp"
            >
              <RiWhatsappLine size={18} />
              <span>{header.ctaText || 'Get Free Quote'}</span>
            </motion.a>

            <button
              type="button"
              className={styles.hamburgerBtn}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className={styles.mobileNavLinks}>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className={styles.mobileNavLink} onClick={closeMobile}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className={styles.mobileCta}>
                <a
                  href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                    header.brandName || 'Maa Vindhyavasini Enterprises'
                  )},%20I%20would%20like%20to%20get%20a%20free%20solar%20quote.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.quoteBtn}
                  onClick={closeMobile}
                >
                  <RiWhatsappLine size={20} />
                  <span>{header.ctaText || 'Get Free Quote'}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
