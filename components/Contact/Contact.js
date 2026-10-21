'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RiPhoneLine,
  RiMailLine,
  RiMapPinLine,
  RiTimeLine,
  RiWhatsappLine,
  RiCheckDoubleLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Contact.module.css';

export default function Contact() {
  const { siteData, addLead } = useSiteData();
  const header = siteData?.header || {};
  const contact = siteData?.contact || {};
  const phone = header.phone || '+91 9670215052';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    systemSize: '3 kW (PM Surya Ghar Subsidy)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }

    // Automatically log this lead into the Admin CRM
    addLead({
      name: formData.name || 'Website Visitor',
      phone: formData.phone,
      city: formData.city || 'Mirzapur',
      systemSize: formData.systemSize,
      message: formData.message || 'Looking for rooftop solar feasibility and quote.',
    });

    const messageText = `Hello ${header.brandName || 'Maa Vindhyavasini Enterprises'}!

*New Solar Inquiry Details:*
• *Name:* ${formData.name || 'Not specified'}
• *Phone:* ${formData.phone}
• *City / Area:* ${formData.city || 'Mirzapur'}
• *Desired System Size:* ${formData.systemSize}
• *Message / Requirement:* ${formData.message || 'Looking for rooftop solar feasibility and quote.'}

Please connect with me for a site visit and estimate.`;

    const encoded = encodeURIComponent(messageText);
    const waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;

    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.kicker}>{contact.kicker || 'Get In Touch'}</span>
          <h2 className={styles.title}>{contact.title || 'Request Your Free Solar Quote'}</h2>
          <p className={styles.subtitle}>
            {contact.subtitle ||
              'Have questions about system sizing, rooftop load, or PM Surya Ghar subsidy? Contact our engineers today for an on-site feasibility report.'}
          </p>
        </motion.div>

        <div className={styles.splitGrid}>
          {/* Left: Lead Capture Form */}
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.formTitle}>{contact.formTitle || 'Solar Consultation & Site Survey'}</h3>
            <p className={styles.formSubtitle}>
              {contact.formSubtitle || 'Fill out the details below. Our team connects immediately via WhatsApp & Call.'}
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Ramesh Singh"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number <span style={{ color: 'var(--primary)' }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="city" className={styles.label}>
                    City / Tehsil / Area
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="e.g. Mirzapur / Chunar / Vindhyachal"
                    value={formData.city}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="systemSize" className={styles.label}>
                    Estimated System Capacity
                  </label>
                  <select
                    id="systemSize"
                    name="systemSize"
                    value={formData.systemSize}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="1 kW (Residential)">1 kW (Residential - ₹30,000 Subsidy)</option>
                    <option value="2 kW (Residential)">2 kW (Residential - ₹60,000 Subsidy)</option>
                    <option value="3 kW (PM Surya Ghar Subsidy)">3 kW (Residential - ₹78,000 Max Subsidy)</option>
                    <option value="5 kW - 10 kW (Bungalow / Villa)">5 kW - 10 kW (Large Residential)</option>
                    <option value="15 kW - 50 kW (Commercial / Hospital)">15 kW - 50 kW (Commercial / Institutional)</option>
                    <option value="100 kW+ (Industrial / Cold Storage)">100 kW+ (Industrial Megawatt Plant)</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroupFull}>
                <label htmlFor="message" className={styles.label}>
                  Rooftop Type or Special Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Share details like RCC flat roof, tin shed, monthly electricity bill, or any queries..."
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <RiWhatsappLine size={22} />
                <span>Send via WhatsApp → Instant Response</span>
              </button>

              {submitted && (
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--success)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <RiCheckDoubleLine size={20} />
                  <span>Inquiry logged in CRM &amp; opening WhatsApp with your summary...</span>
                </div>
              )}
            </form>
          </motion.div>

          {/* Right: Contact Information Cards */}
          <motion.div
            className={styles.infoColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.infoCard}>
              <div className={styles.infoIconWrapper}>
                <RiPhoneLine size={24} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Call / WhatsApp Hotline</span>
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className={styles.infoValue}>
                  {phone}
                </a>
                <span className={styles.infoSubtext}>Direct line to Solar Engineering Desk</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIconWrapper}>
                <RiMailLine size={24} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Email Inquiries</span>
                <a href={`mailto:${header.email || 'info@maavindhyavasinisolar.in'}`} className={styles.infoValue}>
                  {header.email || 'info@maavindhyavasinisolar.in'}
                </a>
                <span className={styles.infoSubtext}>Quotes &amp; official tender submissions</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIconWrapper}>
                <RiMapPinLine size={24} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Mirzapur Office &amp; Warehouse</span>
                <span className={styles.infoValue}>
                  {header.brandName || 'Maa Vindhyavasini Enterprises'}
                </span>
                <span className={styles.infoSubtext}>
                  {contact.address || 'Mirzapur, Uttar Pradesh - 231001, India'} ({contact.servingAreas || 'Serving Mirzapur, Sonbhadra, Varanasi & Prayagraj'})
                </span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIconWrapper}>
                <RiTimeLine size={24} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Working Hours</span>
                <span className={styles.infoValue}>{contact.workingHours || 'Mon – Sat: 9:00 AM – 7:30 PM'}</span>
                <span className={styles.infoSubtext}>Site surveys available on Sundays upon prior scheduling</span>
              </div>
            </div>

            <div className={styles.mapCard}>
              <div className={styles.mapHeading}>Bank Finance &amp; Loan Ready</div>
              <p className={styles.mapText}>
                {contact.financeNotice ||
                  'We assist with low-interest solar financing through SBI Surya Ghar Loan, Canara Bank, Union Bank, and PNB with zero upfront collateral for residential homeowners.'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
