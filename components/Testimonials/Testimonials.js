'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiStarFill } from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const { siteData } = useSiteData();
  const testimonials = siteData?.testimonials || [];

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.kicker}>Client Endorsements</span>
          <h2 className={styles.title}>Trusted Across Mirzapur</h2>
          <p className={styles.subtitle}>
            Hear directly from homeowners, businesses, and industrial plant owners who have switched to clean solar power with us.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name || index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.starsRow} aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RiStarFill key={i} size={18} />
                ))}
              </div>

              <p className={styles.reviewText}>
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className={styles.clientInfo}>
                <div
                  className={styles.avatarCircle}
                  style={{ background: t.avatarBg || 'linear-gradient(135deg, #EA580C, #F59E0B)' }}
                  aria-hidden="true"
                >
                  {t.initials || (t.name ? t.name.slice(0, 2).toUpperCase() : 'CL')}
                </div>
                <div className={styles.details}>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.location}>
                    {t.location} • <strong style={{ color: 'var(--primary)', fontWeight: 600 }}>{t.system}</strong>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
