'use client';

import React from 'react';
import {
  RiSunLine,
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiShieldCheckLine,
  RiArrowRightSLine,
  RiShieldKeyholeLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { siteData, setIsPasscodeModalOpen } = useSiteData();
  const header = siteData?.header || {};
  const contact = siteData?.contact || {};
  const footerData = siteData?.footer || {};
  const tagline =
    footerData.tagline ||
    "Mirzapur's No.1 Solar & Electrical EPC Company. Empowering homes, industries, and institutions with high-yield photovoltaic systems and government subsidy facilitation.";
  const partnerBadge = footerData.partnerBadge || 'Waree & Adani Authorized Partner';
  const copyrightNotice = footerData.copyrightNotice || 'All rights reserved.';

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          {/* Column 1: Brand & Tagline */}
          <div className={styles.brandCol}>
            <a href="#home" className={styles.footerLogo}>
              <div className={styles.logoIcon}>
                <RiSunLine size={24} />
              </div>
              <span className={styles.brandName}>{header.brandName || 'Maa Vindhyavasini'}</span>
            </a>
            <p className={styles.tagline}>{tagline}</p>
            <div className={styles.partnerBadge}>
              <RiShieldCheckLine size={16} />
              <span>{partnerBadge}</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#home" className={styles.linkItem}>
                  <RiArrowRightSLine /> Home
                </a>
              </li>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> Solar EPC Services
                </a>
              </li>
              <li>
                <a href="#why-us" className={styles.linkItem}>
                  <RiArrowRightSLine /> Why Choose Us
                </a>
              </li>
              <li>
                <a href="#surya-ghar" className={styles.linkItem}>
                  <RiArrowRightSLine /> PM Surya Ghar Subsidy
                </a>
              </li>
              <li>
                <a href="#projects" className={styles.linkItem}>
                  <RiArrowRightSLine /> Completed Projects
                </a>
              </li>
              <li>
                <a href="#contact" className={styles.linkItem}>
                  <RiArrowRightSLine /> Contact &amp; Site Survey
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className={styles.colTitle}>Our Expertise</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> Residential Rooftop Solar
                </a>
              </li>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> Commercial &amp; Industrial Plants
                </a>
              </li>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> On-Grid Net Metering Systems
                </a>
              </li>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> Turnkey EPC Commissioning
                </a>
              </li>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> 25-Year Performance AMC
                </a>
              </li>
              <li>
                <a href="#services" className={styles.linkItem}>
                  <RiArrowRightSLine /> DISCOM Liaisoning
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className={styles.colTitle}>Head Office</h4>
            <ul className={styles.contactInfoList}>
              <li className={styles.contactItem}>
                <RiMapPinLine className={styles.contactIcon} />
                <span>
                  {contact.address || 'Maa Vindhyavasini Enterprises, Main Road, Mirzapur, Uttar Pradesh - 231001, India'}
                </span>
              </li>
              <li className={styles.contactItem}>
                <RiPhoneLine className={styles.contactIcon} />
                <div>
                  <a href={`tel:${(header.phone || '+919670215052').replace(/[^0-9+]/g, '')}`} className={styles.contactLink}>
                    {header.phone || '+91 9670215052'}
                  </a>
                  <div style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>Call / WhatsApp Support</div>
                </div>
              </li>
              <li className={styles.contactItem}>
                <RiMailLine className={styles.contactIcon} />
                <a href={`mailto:${header.email || 'info@maavindhyavasinisolar.in'}`} className={styles.contactLink}>
                  {header.email || 'info@maavindhyavasinisolar.in'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <div>
              &copy; {currentYear} {header.brandName || 'Maa Vindhyavasini Enterprises'}. {copyrightNotice}
            </div>

            {/* Admin Panel button replacing documents ready notice */}
            <button
              type="button"
              className={styles.adminPortalBtn}
              onClick={() => setIsPasscodeModalOpen(true)}
              aria-label="Open Admin Control Center"
              title="Click to enter passcode and manage website content"
            >
              <span className={styles.adminStatusDot} />
              <RiShieldKeyholeLine size={16} />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
