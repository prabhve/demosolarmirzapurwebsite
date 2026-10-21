'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  RiSunLine,
  RiBuilding2Line,
  RiFlashlightLine,
  RiToolsLine,
  RiGovernmentLine,
  RiSettings3Line,
  RiArrowRightLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Services.module.css';

export default function Services() {
  const { siteData } = useSiteData();
  const servicesList = siteData?.services || [];
  const cleanPhone = (siteData?.header?.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  const iconMap = {
    residential: <RiSunLine size={28} />,
    commercial: <RiBuilding2Line size={28} />,
    'on-grid': <RiFlashlightLine size={28} />,
    epc: <RiToolsLine size={28} />,
    'surya-ghar': <RiGovernmentLine size={28} />,
    amc: <RiSettings3Line size={28} />,
  };

  return (
    <section id="services" className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.sectionKicker}>Comprehensive Solar Solutions</span>
          <h2 className={styles.sectionTitle}>Our Solar &amp; EPC Services</h2>
          <p className={styles.sectionSubtitle}>
            Engineered for high performance and longevity. From residential rooftops to large-scale commercial plants across Mirzapur and surrounding districts.
          </p>
        </motion.div>

        <div className={styles.servicesGrid}>
          {servicesList.map((service, index) => (
            <motion.div
              key={service.id || index}
              className={styles.serviceCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.iconContainer}>
                {iconMap[service.id] || <RiSunLine size={28} />}
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.desc}</p>

              <ul className={styles.serviceFeatures}>
                {(service.features || []).map((feat, i) => (
                  <li key={i} className={styles.serviceFeatureItem}>
                    <span className={styles.featureDot} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`https://wa.me/${cleanPhone}?text=Hi%20Maa%20Vindhyavasini%20Enterprises,%20I%20am%20interested%20in%20${encodeURIComponent(
                  service.title
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardCta}
                aria-label={`Inquire about ${service.title}`}
              >
                <span>Request Detailed Quote</span>
                <RiArrowRightLine size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
