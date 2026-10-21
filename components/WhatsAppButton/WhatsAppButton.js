'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RiWhatsappFill } from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './WhatsAppButton.module.css';

export default function WhatsAppButton() {
  const { siteData } = useSiteData();
  const phone = (siteData?.header?.phone || '+91 9670215052').replace(/[^0-9]/g, '');
  const brandName = siteData?.header?.brandName || 'Maa Vindhyavasini Enterprises';
  const whatsappConfig = siteData?.whatsapp || {};
  const tooltipText = whatsappConfig.tooltip || 'Chat with us on WhatsApp';
  const prefilledMessage =
    whatsappConfig.prefilledMessage ||
    `Hello ${brandName}, I would like to know more about your solar rooftop services.`;

  return (
    <div className={styles.floatContainer}>
      <div className={styles.pulseRing} aria-hidden="true" />
      <div className={styles.tooltip}>{tooltipText}</div>
      <motion.a
        href={`https://wa.me/${phone}?text=${encodeURIComponent(prefilledMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappBtn}
        aria-label="Direct WhatsApp Consultation with Solar Engineer"
        whileTap={{ scale: 0.92 }}
      >
        <RiWhatsappFill size={34} />
      </motion.a>
    </div>
  );
}
