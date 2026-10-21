'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  RiCheckboxCircleFill,
  RiShieldCheckLine,
  RiWhatsappLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  const { siteData } = useSiteData();
  const whyUs = siteData?.whyUs || {};
  const header = siteData?.header || {};
  const cleanPhone = (header.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  const usps = whyUs.usps || [
    {
      title: 'Authorized Tier-1 Brand Partner',
      desc: 'Direct distributor empanelment with Waree Energies, Adani Solar, Ksolare, Emvee Photovoltaics, and Aurawatt. 100% factory-backed linear warranties.',
    },
    {
      title: 'PM Surya Ghar Yojana Subsidy Assistance',
      desc: 'Seamless direct benefit transfer (DBT) documentation assistance. Get up to ₹78,000 government subsidy credited directly to your bank account.',
    },
    {
      title: 'End-to-End Turnkey EPC Engineering',
      desc: 'Complete project lifecycle ownership: 3D shadow analysis, structural wind-load engineering, civil foundation mounting, and string testing.',
    },
    {
      title: 'DISCOM Net Metering Liaisoning',
      desc: 'Guaranteed paperwork and liaisoning with Purvanchal Vidyut Vitran Nigam (UPPCL) for bi-directional net-meter sanctions and grid synchronization.',
    },
    {
      title: '25-Year Performance & Generation Guarantee',
      desc: 'Uncompromised durability with 25-year performance warranties on solar modules and comprehensive 5-10 year warranty on high-efficiency inverters.',
    },
  ];

  const processSteps = whyUs.processSteps || [
    {
      step: '01',
      title: 'Free 3D Site Survey',
      desc: 'Our certified engineers assess roof azimuth, shadow angles, and civil structural load-bearing capacity.',
    },
    {
      step: '02',
      title: 'DISCOM & Loan Sanction',
      desc: 'We file your UPPCL net-meter application and assist with low-interest zero-collateral bank solar financing.',
    },
    {
      step: '03',
      title: '48-Hour Installation',
      desc: 'Pre-assembled anodized aluminum structures and Tier-1 solar modules installed with zero damage to your roof.',
    },
    {
      step: '04',
      title: 'Net-Meter & ₹78k Subsidy',
      desc: 'Bi-directional electronic meter commissioned and central PM Surya Ghar subsidy deposited directly into your bank.',
    },
  ];

  return (
    <section id="why-us" className={styles.whyUsSection}>
      <div className={styles.container}>
        <div className={styles.whyUsGrid}>
          {/* Left Column: USPs with orange accent borders */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.sectionKicker}>{whyUs.kicker || 'Why Choose Us'}</span>
            <h2 className={styles.sectionTitle}>
              {whyUs.headline || "Mirzapur's Most Trusted Solar EPC Partner"}
            </h2>
            <p className={styles.leadText}>
              {whyUs.leadText ||
                "We don't just install solar panels; we engineer reliable, high-yield clean energy assets built to withstand regional weather conditions for decades."}
            </p>

            <div className={styles.uspList}>
              {usps.map((usp, index) => (
                <motion.div
                  key={usp.title || index}
                  className={styles.uspItem}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <div className={styles.checkCircle}>
                    <RiCheckboxCircleFill size={18} />
                  </div>
                  <div className={styles.uspContent}>
                    <h3 className={styles.uspTitle}>{usp.title}</h3>
                    <p className={styles.uspDesc}>{usp.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Large Stat & Warranty Showcase */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.showcaseCard}>
              <div className={styles.cardHeader}>
                <div className={styles.badgeQuality}>
                  <RiShieldCheckLine size={16} />
                  <span>Quality Assurance</span>
                </div>
                <span className={styles.warrantyPill}>✓ 100% Certified</span>
              </div>

              <div className={styles.highlightMetric}>
                <div className={styles.metricValue}>
                  25<span className={styles.metricUnit}> Yrs</span>
                </div>
                <div className={styles.metricLabel}>Tier-1 Performance Guarantee</div>
              </div>

              <div className={styles.miniStatsGrid}>
                <div className={styles.miniStatBox}>
                  <div className={styles.miniStatVal}>₹0 Down</div>
                  <div className={styles.miniStatDesc}>Easy bank solar loans &amp; zero-collateral financing options</div>
                </div>

                <div className={styles.miniStatBox}>
                  <div className={styles.miniStatVal}>100%</div>
                  <div className={styles.miniStatDesc}>DISCOM net-metering approval track record in Eastern UP</div>
                </div>

                <div className={styles.miniStatBox}>
                  <div className={styles.miniStatVal}>3-4 Yrs</div>
                  <div className={styles.miniStatDesc}>Typical return on investment (ROI) payback period</div>
                </div>

                <div className={styles.miniStatBox}>
                  <div className={styles.miniStatVal}>48 Hrs</div>
                  <div className={styles.miniStatDesc}>Rapid on-site breakdown response &amp; servicing</div>
                </div>
              </div>

              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
                  header.brandName || 'Maa Vindhyavasini Enterprises'
                )},%20I%20want%20to%20consult%20an%20engineer%20for%20a%20solar%20rooftop%20site%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionButton}
              >
                <RiWhatsappLine size={20} />
                <span>Book Free Engineering Site Survey</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* 4-Step Execution Process Blueprint */}
        <motion.div
          className={styles.processBlueprint}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.processHeader}>
            <h3 className={styles.processTitle}>Our Turnkey EPC Process</h3>
            <p className={styles.processSubtitle}>
              From initial rooftop 3D scanning to official DISCOM grid-tie synchronization, we deliver seamless zero-hassle execution.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {processSteps.map((step) => (
              <div key={step.step} className={styles.stepCard}>
                <div className={styles.stepNumber}>{step.step}</div>
                <h4 className={styles.stepTitle}>{step.title}</h4>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
