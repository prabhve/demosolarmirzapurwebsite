'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RiWhatsappLine,
  RiArrowRightLine,
  RiShieldCheckLine,
  RiAwardLine,
  RiFlashlightLine,
  RiSunLine,
  RiCalculatorLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Hero.module.css';

export default function Hero() {
  const { siteData, addLead } = useSiteData();
  const hero = siteData?.hero || {};
  const header = siteData?.header || {};
  const calcConfig = siteData?.calculator || {
    unitRate: 7.5,
    solarUnitsPerKw: 115,
    defaultBill: 4500,
    roiYears: 3.2,
    warrantyYears: 25,
  };
  const [monthlyBill, setMonthlyBill] = useState(calcConfig.defaultBill || 4500);
  const cleanPhone = (header.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  // Solar calculations driven by configurable CMS rates
  const unitRate = Number(calcConfig.unitRate) || 7.5;
  const solarUnitsPerKw = Number(calcConfig.solarUnitsPerKw) || 115;
  const warrantyYears = Number(calcConfig.warrantyYears) || 25;
  const recommendedKw = Math.max(1, Math.min(10, Math.ceil((monthlyBill / unitRate) / solarUnitsPerKw)));
  const subsidyAmount = recommendedKw === 1 ? 30000 : recommendedKw === 2 ? 60000 : 78000;
  const estimatedAnnualSavings = Math.round(monthlyBill * 12 * 0.92);
  const lifetimeSavings = Math.round((estimatedAnnualSavings * warrantyYears) / 100000); // In Lakhs

  const handleClaimSubsidyClick = () => {
    addLead({
      name: 'Calculator Lead',
      phone: 'WhatsApp Click',
      city: 'Mirzapur',
      systemSize: `${recommendedKw} kW System (₹${subsidyAmount.toLocaleString('en-IN')} Subsidy)`,
      message: `User calculated ₹${monthlyBill}/month bill with ₹${lifetimeSavings} Lakhs 25-yr savings.`,
    });
  };

  return (
    <section id="home" className={styles.heroSection}>
      {/* Background Animated Sun Rays SVG */}
      <svg
        className={styles.sunRaysBackground}
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="500" cy="500" r="160" fill="white" />
        {Array.from({ length: 24 }).map((_, index) => {
          const angle = (index * 360) / 24;
          return (
            <line
              key={index}
              x1="500"
              y1="500"
              x2="500"
              y2="50"
              stroke="white"
              strokeWidth="6"
              strokeDasharray="16 12"
              transform={`rotate(${angle} 500 500)`}
            />
          );
        })}
      </svg>

      <div className={styles.heroContent}>
        {/* Left Side: Headline & CTAs with Staggered Framer Motion Entry */}
        <motion.div
          className={styles.heroLeft}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {/* Badge Pill */}
          <motion.div
            className={styles.badgeTag}
            variants={{
              hidden: { opacity: 0, y: 14, scale: 0.96 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            <span className={styles.badgeDot} />
            <span>{hero.badgeText || "Mirzapur's No.1 Solar & Electrical EPC"}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className={styles.heroTitle}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {hero.titlePrefix || 'Engineering Clean Power & '}{' '}
            <span className={styles.highlightText}>{hero.highlightText || 'Zero Electricity Bills'}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className={styles.heroSubtitle}
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {hero.subtitle ||
              'Cut your power costs by up to 90% with Tier-1 solar systems. Official PM Surya Ghar partner in Mirzapur & Eastern UP with direct ₹78,000 bank subsidy disbursement & guaranteed UPPCL net-metering.'}
          </motion.p>

          {/* Call to Action Group */}
          <motion.div
            className={styles.ctaGroup}
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.08,
                },
              },
            }}
          >
            <motion.a
              href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
                header.brandName || 'Maa Vindhyavasini Enterprises'
              )},%20I%20want%20to%20get%20a%20free%20solar%20feasibility%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryCta}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: '0 8px 24px rgba(10, 17, 40, 0.28)',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              aria-label="Calculate Solar Savings on WhatsApp"
            >
              <RiWhatsappLine size={20} />
              <span>Get Free Site Survey</span>
            </motion.a>

            <motion.a
              href="#services"
              className={styles.secondaryCta}
              variants={{
                hidden: { opacity: 0, y: 12, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{
                scale: 1.03,
                y: -2,
                boxShadow: '0 6px 20px rgba(234, 88, 12, 0.16)',
                borderColor: 'var(--primary)',
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              aria-label="Explore our solar services"
            >
              <span>Explore Services</span>
              <RiArrowRightLine size={18} />
            </motion.a>
          </motion.div>

          {/* Quick Trust Pills */}
          <motion.div
            className={styles.quickPillsRow}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {(hero.quickPills || [
              '✓ 100% DISCOM Net-Metering',
              '✓ SBI Solar Loan Ready',
              '✓ 25-Year Performance Cover',
            ]).map((pill, i) => (
              <span key={i} className={styles.quickPill}>
                {pill}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Interactive Live Solar ROI & Subsidy Calculator */}
        <motion.div
          className={styles.heroRight}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.calcCard}>
            <div className={styles.calcHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <RiCalculatorLine size={22} style={{ color: 'var(--primary)' }} />
                <span className={styles.calcTitle}>Solar Savings Estimator</span>
              </div>
              <span className={styles.calcTag}>PM Surya Ghar</span>
            </div>

            <div className={styles.billSelectorSection}>
              <div className={styles.billLabel}>
                <span>Your Monthly Electricity Bill:</span>
                <span className={styles.billAmountText}>₹{monthlyBill.toLocaleString('en-IN')} / mo</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className={styles.billSlider}
                aria-label="Select Monthly Electricity Bill"
              />
            </div>

            <div className={styles.calcResultsGrid}>
              <div className={styles.resultBox}>
                <div className={styles.resultVal}>{recommendedKw} kW</div>
                <div className={styles.resultLabel}>Recommended System</div>
              </div>

              <div className={styles.resultBoxHighlight}>
                <div className={styles.resultValHighlight}>₹{subsidyAmount.toLocaleString('en-IN')}</div>
                <div className={styles.resultLabel}>Direct Govt. Subsidy</div>
              </div>

              <div className={styles.resultBox}>
                <div className={styles.resultVal}>₹{lifetimeSavings} Lakhs</div>
                <div className={styles.resultLabel}>25-Yr Bill Savings</div>
              </div>
            </div>

            <a
              href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                header.brandName || 'Maa Vindhyavasini Enterprises'
              )},%20my%20monthly%20electricity%20bill%20is%20₹${monthlyBill}.%20I%20am%20interested%20in%20a%20${recommendedKw}%20kW%20system%20with%20₹${subsidyAmount.toLocaleString(
                'en-IN'
              )}%20subsidy.`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.calcCta}
              onClick={handleClaimSubsidyClick}
            >
              <RiWhatsappLine size={18} />
              <span>Claim ₹{subsidyAmount.toLocaleString('en-IN')} Subsidy on WhatsApp</span>
            </a>
          </div>

          {/* Mini Generation Status Badge */}
          <div className={styles.generationBadgeLive}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <RiSunLine size={22} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {hero.generationTitle || 'Live Solar Generation in Mirzapur'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>
                  {hero.generationSubtitle || 'Avg. 4.8 Peak Sun Hours / Day Available'}
                </div>
              </div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'rgba(34, 197, 94, 0.25)', color: '#4ADE80', padding: '3px 8px', borderRadius: 4, flexShrink: 0 }}>
              {hero.generationTag || 'Peak Output'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Trust Badge Strip */}
      <div className={styles.trustStripWrapper}>
        <div className={styles.trustStrip}>
          <div className={styles.trustItem}>
            <RiShieldCheckLine className={styles.trustIcon} />
            <span>500+ Verified Installations</span>
          </div>

          <div className={styles.trustDivider} aria-hidden="true" />

          <div className={styles.trustItem}>
            <RiAwardLine className={styles.trustIcon} />
            <span>10+ Years EPC Leadership</span>
          </div>

          <div className={styles.trustDivider} aria-hidden="true" />

          <div className={styles.trustItem}>
            <RiFlashlightLine className={styles.trustIcon} />
            <span>Waree &amp; Adani Authorized Partner</span>
          </div>

          <div className={styles.trustDivider} aria-hidden="true" />

          <div className={styles.trustItem}>
            <RiSunLine className={styles.trustIcon} />
            <span>PM Surya Ghar DBT Empanelled</span>
          </div>
        </div>
      </div>
    </section>
  );
}
