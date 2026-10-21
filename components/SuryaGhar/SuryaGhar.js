'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  RiGovernmentLine,
  RiBankCardLine,
  RiFileCheckLine,
  RiArrowRightLine,
  RiWhatsappLine,
  RiShieldFlashLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './SuryaGhar.module.css';

export default function SuryaGhar() {
  const { siteData } = useSiteData();
  const suryaGhar = siteData?.suryaGhar || {};
  const cleanPhone = (siteData?.header?.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  const points = [
    {
      icon: <RiBankCardLine size={24} />,
      title: 'Direct Bank Subsidy Up to ₹78,000',
      text: 'Direct Benefit Transfer (DBT) deposited straight into your bank account: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 for 3 kW and higher residential rooftop setups.',
    },
    {
      icon: <RiFileCheckLine size={24} />,
      title: 'Complete Portal Liaisoning Handled',
      text: 'We take complete responsibility for your National Solar Rooftop Portal registration, load sanction paperwork, UPPCL DISCOM approvals, and safety inspections.',
    },
    {
      icon: <RiShieldFlashLine size={24} />,
      title: 'Guaranteed Net-Metering Setup',
      text: 'We arrange official bi-directional meter replacement from your local electricity division in Mirzapur so you receive full tariff credit for excess solar power generated.',
    },
  ];

  const subsidyMatrix = suryaGhar.matrix || [
    { capacity: '1 kW System', area: '100 sq. ft.', units: '120 Units / Mo', savings: '₹900 / Mo', subsidy: '₹30,000' },
    { capacity: '2 kW System', area: '200 sq. ft.', units: '240 Units / Mo', savings: '₹1,800 / Mo', subsidy: '₹60,000' },
    { capacity: '3 kW System', area: '300 sq. ft.', units: '360 Units / Mo', savings: '₹2,800 / Mo', subsidy: '₹78,000', popular: true },
    { capacity: '5 kW System', area: '500 sq. ft.', units: '600 Units / Mo', savings: '₹4,800 / Mo', subsidy: '₹78,000' },
    { capacity: '10 kW System', area: '1,000 sq. ft.', units: '1,200 Units / Mo', savings: '₹9,600 / Mo', subsidy: '₹78,000 (Max Residential)' },
  ];

  return (
    <section id="surya-ghar" className={styles.suryaSection}>
      <div className={styles.svgPatternOverlay} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div
          className={styles.contentWrapper}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.badgePill}>
            <RiGovernmentLine size={18} />
            <span>{suryaGhar.badge || 'Govt. of India Initiative • National Solar Mission'}</span>
          </div>

          <h2 className={styles.headline}>
            {suryaGhar.headline || 'Get Up to ₹78,000 Government Subsidy'}
          </h2>

          <p className={styles.subheadline}>
            {suryaGhar.subheadline ||
              'Under the PM Surya Ghar: Muft Bijli Yojana, eligible homeowners in Mirzapur can generate up to 300 units of free electricity every month. Let our authorized team handle your paperwork from application to money in your bank.'}
          </p>

          {/* 3 Core Points */}
          <div className={styles.eligibilityGrid}>
            {points.map((pt, index) => (
              <motion.div
                key={pt.title}
                className={styles.eligibilityCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className={styles.cardIcon}>{pt.icon}</div>
                <h3 className={styles.cardTitle}>{pt.title}</h3>
                <p className={styles.cardText}>{pt.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Subsidy Breakdown Table */}
          <motion.div
            className={styles.subsidyTableWrapper}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.tableHeaderRow}>
              <div>
                <h3 className={styles.tableTitle}>PM Surya Ghar Subsidy &amp; Capacity Matrix</h3>
                <span className={styles.tableSubtitle}>Official benchmark subsidy rates applicable across Uttar Pradesh</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', background: '#FFF0E5', padding: '4px 10px', borderRadius: 6 }}>
                UPPCL Empanelled
              </span>
            </div>

            <div className={styles.scrollHint}>← Swipe horizontally to view full matrix →</div>

            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>System Size</th>
                    <th className={styles.th}>Rooftop Area</th>
                    <th className={styles.th}>Monthly Generation</th>
                    <th className={styles.th}>Est. Monthly Savings</th>
                    <th className={styles.th}>Direct Govt. Subsidy</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidyMatrix.map((row) => (
                    <tr key={row.capacity} className={row.popular ? styles.popularRow : ''}>
                      <td className={styles.td}>
                        <strong>{row.capacity}</strong>
                        {row.popular && <span className={styles.popularBadge}>Most Recommended</span>}
                      </td>
                      <td className={styles.td}>{row.area}</td>
                      <td className={styles.td}>{row.units}</td>
                      <td className={styles.td}>{row.savings}</td>
                      <td className={styles.td}>
                        <span className={styles.subsidyAmount}>{row.subsidy}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className={styles.ctaWrapper}>
            <motion.a
              href={`https://wa.me/${cleanPhone}?text=Hello%20Maa%20Vindhyavasini%20Enterprises,%20please%20verify%20my%20PM%20Surya%20Ghar%20Yojana%20eligibility%20and%20subsidy%20disbursement%20process.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <RiWhatsappLine size={24} />
              <span>Check Your Eligibility Free on WhatsApp</span>
              <RiArrowRightLine size={20} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
