'use client';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiShieldKeyholeLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiCloseLine,
  RiCheckLine,
  RiDashboardLine,
  RiSettings3Line,
  RiSunLine,
  RiGovernmentLine,
  RiToolsLine,
  RiFolderVideoLine,
  RiChatQuoteLine,
  RiDatabase2Line,
  RiWhatsappLine,
  RiCustomerService2Line,
  RiLayoutBottomLine,
  RiSaveLine,
  RiRestartLine,
  RiAddLine,
  RiDeleteBinLine,
  RiCalculatorLine,
  RiBarChartLine,
  RiAwardLine,
  RiCheckboxCircleLine,
  RiFileDownloadLine,
  RiFileUploadLine,
} from 'react-icons/ri';
import { SiteDataContext } from '../../context/SiteDataContext';
import styles from '../AdminModal/AdminModal.module.css';

export interface HeroContentState {
  badgeText: string;
  titlePrefix: string;
  highlightText: string;
  subtitle: string;
  quickPills: string[];
}

export interface UspItem {
  id: string;
  title: string;
  desc: string;
  iconTag: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  sublabel: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  category: string;
  accentColor: string;
}

export interface AdminCMSProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSave?: (data: any) => void;
  defaultTab?: string;
}

const DEFAULT_DATA = {
  header: {
    brandName: 'Maa Vindhyavasini',
    brandSubtitle: 'Mirzapur Solar & Electrical EPC',
    phone: '+91 9670215052',
    email: 'info@maavindhyavasinisolar.in',
    tickerBadge: 'UPPCL DISCOM Net-Metering Active',
    tickerText: 'PM Surya Ghar ₹78,000 Direct Bank Subsidy',
    ctaText: 'Get Free Quote',
  },
  hero: {
    badgeText: "Mirzapur's No.1 Solar & Electrical EPC",
    titlePrefix: 'Engineering Clean Power & ',
    highlightText: 'Zero Electricity Bills',
    subtitle:
      'Cut your power costs by up to 90% with Tier-1 solar systems. Official PM Surya Ghar partner in Mirzapur & Eastern UP with direct ₹78,000 bank subsidy disbursement & guaranteed UPPCL net-metering.',
    generationTitle: 'Live Solar Generation in Mirzapur',
    generationSubtitle: 'Avg. 4.8 Peak Sun Hours / Day Available',
    generationTag: 'Peak Output',
    quickPills: [
      '✓ 100% DISCOM Net-Metering',
      '✓ SBI Solar Loan Ready',
      '✓ 25-Year Performance Cover',
    ],
  },
  services: [
    {
      id: 'residential',
      title: 'Residential Rooftop Solar',
      subtitle: 'PM Surya Ghar Muft Bijli Yojana',
      badge: 'Up to ₹78,000 Direct Subsidy',
      desc: 'High-efficiency mono-PERC and TOPCon rooftop solar installations engineered for UP homes. Complete end-to-end DISCOM net-metering liaisoning and fast DBT subsidy sanction.',
      features: [
        'Direct ₹78,000 Bank Subsidy Assistance',
        'Bi-Directional UPPCL Net-Meter Sanction',
        'Pre-Approved SBI Solar Loan Option',
        '25-Year Linear Power Output Warranty',
      ],
    },
    {
      id: 'commercial',
      title: 'Commercial & Industrial Solar',
      subtitle: 'Factories, Petrol Pumps & Colleges',
      badge: 'Accelerated 40% Depreciation',
      desc: 'High-yield 10kW to 500kW grid-tied systems engineered for manufacturing plants, educational institutions, cold storages, and commercial plazas across Mirzapur & Eastern UP.',
      features: [
        'Payback Period Under 3.2 Years',
        '40% Section 32 Income Tax Benefit',
        'Peak Load Shaving & Grid Independence',
        'Dedicated HT/LT Substation Engineering',
      ],
    },
    {
      id: 'agricultural',
      title: 'Solar Agricultural Pumps & Hybrid',
      subtitle: 'PM KUSUM Scheme & Remote Fields',
      badge: 'Zero Diesel Irrigation',
      desc: 'Reliable solar water pumping systems and hybrid battery energy storage (BESS) designed for agricultural farms, poultry units, and off-grid facilities in rural Vindhya region.',
      features: [
        'High-Discharge DC Solar Submersible Pumps',
        'Automatic Sunrise to Sunset Operation',
        'Zero Monthly Grid Bill or Fuel Expense',
        'Rugged Galvanized Anti-Corrosion Structures',
      ],
    },
    {
      id: 'netmetering',
      title: 'UPPCL Net Metering Liaisoning',
      subtitle: 'Purvanchal Vidyut Vitran Nigam Ltd',
      badge: '100% Guaranteed Approval',
      desc: 'We handle 100% of the bureaucratic process with Purvanchal DISCOM: online application, site feasibility survey, meter testing, transformer inspection, and final grid synchronization.',
      features: [
        'Zero Paperwork Burden on Customer',
        'Rapid Feasibility NOC Issuance',
        'Official DISCOM Approved Test Reports',
        'Guaranteed Surplus Energy Banking Credits',
      ],
    },
    {
      id: 'financing',
      title: 'Zero-Down Financing & Solar Loans',
      subtitle: 'SBI, PNB & Canara Bank Tie-ups',
      badge: 'Low 7% Interest Rates',
      desc: 'Install solar today with zero upfront capital through collateral-free collateralized green energy loans. Monthly EMIs are lower than your existing DISCOM electricity bill.',
      features: [
        'Zero Down Payment Options Available',
        'Flexible 3 to 7 Year Loan Tenures',
        'EMI Replaced by Solar Power Savings',
        'Doorstep KYC Verification Assistance',
      ],
    },
    {
      id: 'amc',
      title: 'Annual Operation & Maintenance (AMC)',
      subtitle: 'Drone Thermography & Robotic Cleaning',
      badge: '99.4% Generation Uptime',
      desc: 'Maximize generation year after year. Our certified solar engineers provide scheduled high-pressure demineralized water cleaning, inverter firmware tuning, and string health audits.',
      features: [
        'Scheduled Bi-Monthly Panel Cleaning',
        'Thermal Hotspot Infrared Audits',
        'Inverter Error Diagnostics & Swap Support',
        'Guaranteed Rapid On-Site Response Time',
      ],
    },
  ],
  contact: {
    kicker: 'Consultation & Site Feasibility',
    title: 'Schedule Your Free Solar Engineering Survey',
    subtitle:
      'Our certified solar engineers will inspect your rooftop, evaluate shadow angles, calculate exact load requirements, and process your PM Surya Ghar subsidy application.',
    formTitle: 'Request Free Quote & Subsidy Calculation',
    formSubtitle: 'Guaranteed callback within 30 minutes during business hours.',
    address: 'Maa Vindhyavasini Enterprises, Main Road, Mirzapur, Uttar Pradesh - 231001, India',
    servingAreas: 'Mirzapur, Vindhyachal, Chunar, Robertsganj, Varanasi, Sonbhadra, Bhadohi',
    workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM | Sun: 10:00 AM - 4:00 PM',
    responseTime: '30 Minutes Guaranteed Response',
    financeNotice: '0% Downpayment SBI & Canara Bank Solar Loan Assistance Available',
  },
  stats: [
    { label: 'Solar Installations', value: 500, suffix: '+', sublabel: 'Rooftops & Commercial Grid-tied' },
    { label: 'Clean Capacity Deployed', value: 10, suffix: '+ MW', sublabel: 'Generating over 14.5M units/year' },
    { label: 'Verified Clients', value: 200, suffix: '+', sublabel: 'Industrial, Institutional & Homes' },
    { label: 'Annual Power Savings', value: 8.5, suffix: ' Cr+', sublabel: 'Saved for Mirzapur power consumers' },
  ],
  calculator: {
    unitRate: 7.5,
    solarUnitsPerKw: 115,
    defaultBill: 4500,
    roiYears: 3.2,
    warrantyYears: 25,
  },
  whyUs: {
    kicker: 'The MVE Engineering Edge',
    title: 'Why Eastern UP Trusts Maa Vindhyavasini Enterprises',
    subtitle: 'From tier-1 solar modules to guaranteed DISCOM synchronization, we engineer turnkey solar power plants that last for decades.',
    usps: [
      {
        id: 'usp-1',
        title: 'Authorized Tier-1 Brand Partner',
        desc: 'Direct distributor empanelment with Waree Energies, Adani Solar, Ksolare, Emvee Photovoltaics, and Aurawatt. 100% factory-backed linear warranties.',
        iconTag: 'Tier-1 Hardware',
      },
      {
        id: 'usp-2',
        title: 'PM Surya Ghar Yojana Subsidy Assistance',
        desc: 'Seamless direct benefit transfer (DBT) documentation assistance. Get up to ₹78,000 government subsidy credited directly to your bank account.',
        iconTag: '₹78,000 Subsidy',
      },
      {
        id: 'usp-3',
        title: 'End-to-End Turnkey EPC Engineering',
        desc: 'Complete project lifecycle ownership: 3D shadow analysis, structural wind-load engineering, civil foundation mounting, and string testing.',
        iconTag: 'Turnkey EPC',
      },
      {
        id: 'usp-4',
        title: 'DISCOM Net Metering Liaisoning',
        desc: 'Guaranteed paperwork and liaisoning with Purvanchal Vidyut Vitran Nigam (UPPCL) for bi-directional net-meter sanctions and grid synchronization.',
        iconTag: 'UPPCL Net-Meter',
      },
    ],
  },
  brands: [
    { name: 'Waree Energies', tag: 'Top Solar PV Modules', category: 'Solar Panels', accentColor: '#EA580C' },
    { name: 'Adani Solar', tag: 'High-Efficiency Mono-PERC', category: 'Solar Panels', accentColor: '#0284C7' },
    { name: 'Ksolare Inverters', tag: 'Grid-Tie Inverter Tech', category: 'Inverters', accentColor: '#10B981' },
    { name: 'Emvee Photovoltaics', tag: 'Precision Clean Energy', category: 'Solar Panels', accentColor: '#F59E0B' },
    { name: 'Aurawatt Solar', tag: 'Smart String Monitoring', category: 'Inverters', accentColor: '#8B5CF6' },
    { name: 'Growatt CleanTech', tag: 'Global Inverter Leader', category: 'Inverters', accentColor: '#06B6D4' },
  ],
  footer: {
    tagline: 'Leading Solar & Electrical EPC Contractor in Mirzapur & Eastern Uttar Pradesh. Authorized PM Surya Ghar Muft Bijli Yojana installation vendor.',
    partnerBadge: 'MNRE & UPPCL Approved Solar EPC',
    copyrightNotice: 'All rights reserved. Engineering Clean Energy for Eastern Uttar Pradesh.',
  },
  whatsapp: {
    tooltip: 'Chat with Solar EPC Engineer in Mirzapur',
    prefilledMessage: 'Hello Maa Vindhyavasini Enterprises! I am interested in rooftop solar installation and PM Surya Ghar subsidy in Mirzapur.',
  },
  leads: [],
};

export default function AdminCMS({
  isOpen = true,
  onClose,
  onSave,
  defaultTab = 'header',
}: AdminCMSProps) {
  // Check if SiteDataContext is provided
  const siteContext = useContext(SiteDataContext) as any;

  // Initial data source
  const sourceData = siteContext?.siteData || DEFAULT_DATA;
  const [draftData, setDraftData] = useState<any>(sourceData);

  // Passcode security state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Keep draft in sync if external siteData changes
  useEffect(() => {
    if (siteContext?.siteData) {
      setDraftData(JSON.parse(JSON.stringify(siteContext.siteData)));
    }
  }, [siteContext?.siteData]);

  const triggerSaveIndicator = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  // Passcode authentication
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = siteContext?.adminPasscode || '9670';
    if (passcode.trim() === correctPin.trim()) {
      setIsAuthenticated(true);
      setPasscodeError('');
      setPasscode('');
    } else {
      setPasscodeError('Incorrect passcode! Please re-try (default is 9670).');
    }
  };

  // Top-level field updates
  const updateDraft = (section: string, key: string, value: any) => {
    setDraftData((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [key]: value,
      },
    }));
  };

  // Save All Changes button logic
  const handleSaveAll = () => {
    // 1. Update global SiteDataContext if available
    if (siteContext?.updateSiteData) {
      siteContext.updateSiteData(draftData);
    }
    // 2. Persist to localStorage
    try {
      localStorage.setItem('mve_solar_cms_data_v2', JSON.stringify(draftData));
    } catch (e) {
      console.warn('LocalStorage save error', e);
    }
    // 3. Trigger callback if passed
    if (onSave) {
      onSave(draftData);
    }
    // 4. Show live indicator
    triggerSaveIndicator();
  };

  // Revert draft edits
  const handleDiscardChanges = () => {
    if (window.confirm('Discard unsaved draft changes and reload saved settings?')) {
      const freshData = siteContext?.siteData || DEFAULT_DATA;
      setDraftData(JSON.parse(JSON.stringify(freshData)));
    }
  };

  // Tab label helper
  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'crm': return 'Leads CRM';
      case 'header': return 'Navbar & Ticker';
      case 'contact': return 'Contact & Inquiries';
      case 'footer': return 'Footer & Legal';
      case 'hero': return 'Hero & Slogans';
      case 'services': return 'Services EPC';
      case 'stats': return 'Stats & Impact';
      case 'calculator': return 'ROI Calculator';
      case 'whyus': return 'Why Us & Process';
      case 'brands': return 'Brand Partners';
      case 'whatsapp': return 'Floating WhatsApp';
      case 'settings': return 'Security & Backup';
      default: return 'Module Editor';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 1. Passcode Challenge Modal if not authenticated */}
      {!isAuthenticated && (
        <div className={styles.passcodeBackdrop} onClick={() => onClose && onClose()}>
          <motion.div
            className={styles.passcodeCard}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.22 }}
          >
            {onClose && (
              <button
                type="button"
                className={styles.passcodeCloseBtn}
                onClick={onClose}
                aria-label="Close"
              >
                <RiCloseLine size={20} />
              </button>
            )}

            <div className={styles.lockIconWrapper}>
              <RiShieldKeyholeLine size={30} />
            </div>

            <h3 className={styles.passcodeTitle}>MVE Solar Admin Dashboard</h3>
            <p className={styles.passcodeSubtitle}>
              Enter administrative passcode to unlock the centralized CMS and manage live website content.
            </p>

            <form onSubmit={handleUnlock}>
              <div className={styles.pinInputWrapper}>
                <input
                  type={showPasscode ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (passcodeError) setPasscodeError('');
                  }}
                  placeholder="Enter Passcode"
                  autoFocus
                  className={styles.pinInput}
                  aria-label="Admin Passcode"
                />
                <button
                  type="button"
                  className={styles.toggleVisibilityBtn}
                  onClick={() => setShowPasscode(!showPasscode)}
                  aria-label={showPasscode ? 'Hide Passcode' : 'Show Passcode'}
                >
                  {showPasscode ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                </button>
              </div>

              {passcodeError && <div className={styles.errorText}>{passcodeError}</div>}

              <div className={styles.passcodeActions}>
                <button type="submit" className={styles.unlockBtn}>
                  <RiLockPasswordLine size={18} />
                  <span>Unlock Admin Dashboard</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* 2. Centralized Executive Admin Dashboard Modal */}
      {isAuthenticated && (
        <div className={styles.adminStudioModal}>
          <motion.div
            className={styles.adminWindow}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Top Bar Navigation */}
            <div className={styles.adminTopBar}>
              <div className={styles.adminBrandGroup}>
                <div className={styles.adminLogoIcon}>
                  <RiShieldKeyholeLine size={20} />
                </div>
                <div>
                  <div className={styles.adminBrandTitle}>MVE Executive Admin Dashboard</div>
                  <div className={styles.adminBrandSub}>
                    Centralized Content Management &amp; Live Site Control
                  </div>
                </div>
              </div>

              <div className={styles.adminTopActions}>
                {savedSuccess && (
                  <motion.span
                    className={styles.saveIndicator}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <RiCheckLine size={14} />
                    <span>Changes Saved Live!</span>
                  </motion.span>
                )}

                <button
                  type="button"
                  className={styles.saveChangesBtn}
                  onClick={handleSaveAll}
                  title="Apply and save all changes to live site"
                >
                  <RiSaveLine size={16} />
                  <span>Save All Changes</span>
                </button>

                <button
                  type="button"
                  className={styles.closeAdminBtn}
                  onClick={() => {
                    setIsAuthenticated(false);
                    if (onClose) onClose();
                  }}
                  title="Exit dashboard"
                >
                  <RiCloseLine size={18} />
                  <span>Exit Admin</span>
                </button>
              </div>
            </div>

            {/* Admin Layout: Sidebar + Workspace */}
            <div className={styles.adminLayout}>
              {/* Left Sidebar Navigation */}
              <div className={styles.adminSidebar}>
                <div className={styles.sidebarCategory}>Overview &amp; Inquiries</div>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'crm' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('crm')}
                >
                  <RiDashboardLine size={18} />
                  <span>Leads CRM</span>
                  <span className={styles.tabBadge}>{draftData.leads?.length || 0}</span>
                </button>

                <div className={styles.sidebarCategory}>Global Structure</div>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'header' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('header')}
                >
                  <RiSettings3Line size={18} />
                  <span>Navbar &amp; Ticker</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <RiCustomerService2Line size={18} />
                  <span>Contact &amp; Forms</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'footer' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('footer')}
                >
                  <RiLayoutBottomLine size={18} />
                  <span>Footer &amp; Legal</span>
                </button>

                <div className={styles.sidebarCategory}>Core Content</div>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'hero' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('hero')}
                >
                  <RiSunLine size={18} />
                  <span>Hero &amp; Slogans</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'services' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('services')}
                >
                  <RiToolsLine size={18} />
                  <span>Services EPC</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'stats' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('stats')}
                >
                  <RiBarChartLine size={18} />
                  <span>Stats &amp; Impact</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'calculator' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('calculator')}
                >
                  <RiCalculatorLine size={18} />
                  <span>ROI Calculator</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'whyus' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('whyus')}
                >
                  <RiCheckboxCircleLine size={18} />
                  <span>Why Us &amp; Blueprint</span>
                </button>

                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'brands' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('brands')}
                >
                  <RiAwardLine size={18} />
                  <span>Brand Partners</span>
                </button>

                <div className={styles.sidebarCategory}>Engagement</div>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'whatsapp' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('whatsapp')}
                >
                  <RiWhatsappLine size={18} />
                  <span>Floating WhatsApp</span>
                </button>

                <div className={styles.sidebarCategory}>System &amp; Security</div>
                <button
                  type="button"
                  className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <RiDatabase2Line size={18} />
                  <span>Backup &amp; Security</span>
                </button>
              </div>

              {/* Right Content Workspace */}
              <div className={styles.adminContent}>
                {/* 1. NAVBAR & TICKER */}
                {activeTab === 'header' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Global Navigation</span>
                        <h4 className={styles.sectionTitle}>Navbar &amp; Announcement Ticker</h4>
                        <p className={styles.sectionSubtitle}>
                          Control brand identification, top notice badges, phone numbers, and call-to-actions.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Brand Name</label>
                          <input
                            type="text"
                            value={draftData.header?.brandName || ''}
                            onChange={(e) => updateDraft('header', 'brandName', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Brand Subtitle</label>
                          <input
                            type="text"
                            value={draftData.header?.brandSubtitle || ''}
                            onChange={(e) => updateDraft('header', 'brandSubtitle', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Contact Phone / WhatsApp</label>
                          <input
                            type="text"
                            value={draftData.header?.phone || ''}
                            onChange={(e) => updateDraft('header', 'phone', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Contact Email</label>
                          <input
                            type="email"
                            value={draftData.header?.email || ''}
                            onChange={(e) => updateDraft('header', 'email', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Navbar CTA Button Text</label>
                          <input
                            type="text"
                            value={draftData.header?.ctaText || ''}
                            onChange={(e) => updateDraft('header', 'ctaText', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Top Ticker Badge</label>
                          <input
                            type="text"
                            value={draftData.header?.tickerBadge || ''}
                            onChange={(e) => updateDraft('header', 'tickerBadge', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Top Ticker Notice Message</label>
                        <input
                          type="text"
                          value={draftData.header?.tickerText || ''}
                          onChange={(e) => updateDraft('header', 'tickerText', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. HERO CONTENT */}
                {activeTab === 'hero' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Above-the-Fold</span>
                        <h4 className={styles.sectionTitle}>Hero Section &amp; Value Proposition</h4>
                        <p className={styles.sectionSubtitle}>
                          The first impression for all visitors arriving on the website.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Authority Kicker Badge</label>
                        <input
                          type="text"
                          value={draftData.hero?.badgeText || ''}
                          onChange={(e) => updateDraft('hero', 'badgeText', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Main Title Prefix</label>
                          <input
                            type="text"
                            value={draftData.hero?.titlePrefix || ''}
                            onChange={(e) => updateDraft('hero', 'titlePrefix', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Highlighted Accent Text</label>
                          <input
                            type="text"
                            value={draftData.hero?.highlightText || ''}
                            onChange={(e) => updateDraft('hero', 'highlightText', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Subtitle Editorial Description</label>
                        <textarea
                          rows={3}
                          value={draftData.hero?.subtitle || ''}
                          onChange={(e) => updateDraft('hero', 'subtitle', e.target.value)}
                          className={styles.formTextarea}
                        />
                      </div>

                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Live Generation Card Title</label>
                          <input
                            type="text"
                            value={draftData.hero?.generationTitle || ''}
                            onChange={(e) => updateDraft('hero', 'generationTitle', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Live Generation Card Subtitle</label>
                          <input
                            type="text"
                            value={draftData.hero?.generationSubtitle || ''}
                            onChange={(e) => updateDraft('hero', 'generationSubtitle', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. SERVICES EPC */}
                {activeTab === 'services' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Engineering Capabilities</span>
                        <h4 className={styles.sectionTitle}>Solar EPC Services CMS</h4>
                        <p className={styles.sectionSubtitle}>
                          Manage commercial, residential, agricultural, and DISCOM liaisoning offerings.
                        </p>
                      </div>
                    </div>

                    {(draftData.services || []).map((service: any, index: number) => (
                      <div key={service.id || index} className={styles.adminCard}>
                        <div className={styles.itemCardHeader}>
                          <span className={styles.itemCardTitle}>
                            Service #{index + 1}: {service.title}
                          </span>
                        </div>
                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Service Title</label>
                            <input
                              type="text"
                              value={service.title || ''}
                              onChange={(e) => {
                                const updated = [...(draftData.services || [])];
                                updated[index].title = e.target.value;
                                setDraftData({ ...draftData, services: updated });
                              }}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Badge Highlight</label>
                            <input
                              type="text"
                              value={service.badge || ''}
                              onChange={(e) => {
                                const updated = [...(draftData.services || [])];
                                updated[index].badge = e.target.value;
                                setDraftData({ ...draftData, services: updated });
                              }}
                              className={styles.formInput}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Service Description</label>
                          <textarea
                            rows={2}
                            value={service.desc || ''}
                            onChange={(e) => {
                              const updated = [...(draftData.services || [])];
                              updated[index].desc = e.target.value;
                              setDraftData({ ...draftData, services: updated });
                            }}
                            className={styles.formTextarea}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. CONTACT & FORMS */}
                {activeTab === 'contact' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Lead Intake</span>
                        <h4 className={styles.sectionTitle}>Contact Section &amp; Forms CMS</h4>
                        <p className={styles.sectionSubtitle}>
                          Edit physical office location, regional coverage, business hours, and form notices.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Section Kicker</label>
                          <input
                            type="text"
                            value={draftData.contact?.kicker || ''}
                            onChange={(e) => updateDraft('contact', 'kicker', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Response Time Guarantee</label>
                          <input
                            type="text"
                            value={draftData.contact?.responseTime || ''}
                            onChange={(e) => updateDraft('contact', 'responseTime', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Section Main Heading</label>
                        <input
                          type="text"
                          value={draftData.contact?.title || ''}
                          onChange={(e) => updateDraft('contact', 'title', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Head Office Physical Address</label>
                        <input
                          type="text"
                          value={draftData.contact?.address || ''}
                          onChange={(e) => updateDraft('contact', 'address', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Serving Regions &amp; Districts</label>
                          <input
                            type="text"
                            value={draftData.contact?.servingAreas || ''}
                            onChange={(e) => updateDraft('contact', 'servingAreas', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Working Hours</label>
                          <input
                            type="text"
                            value={draftData.contact?.workingHours || ''}
                            onChange={(e) => updateDraft('contact', 'workingHours', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Loan &amp; Finance Notice Under Form</label>
                        <input
                          type="text"
                          value={draftData.contact?.financeNotice || ''}
                          onChange={(e) => updateDraft('contact', 'financeNotice', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. STATS & IMPACT */}
                {activeTab === 'stats' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Metrics &amp; Milestones</span>
                        <h4 className={styles.sectionTitle}>Key Performance Statistics</h4>
                        <p className={styles.sectionSubtitle}>
                          Numbers and impact metrics proving regional market dominance.
                        </p>
                      </div>
                    </div>

                    <div className={styles.fieldsGrid2}>
                      {(draftData.stats || []).map((stat: any, index: number) => (
                        <div key={index} className={styles.adminCard}>
                          <div className={styles.itemCardHeader}>
                            <span className={styles.itemCardTitle}>Counter #{index + 1}</span>
                          </div>
                          <div className={styles.fieldsGrid2}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Numeric Value</label>
                              <input
                                type="number"
                                value={stat.value}
                                onChange={(e) => {
                                  const updated = [...(draftData.stats || [])];
                                  updated[index].value = Number(e.target.value);
                                  setDraftData({ ...draftData, stats: updated });
                                }}
                                className={styles.formInput}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Suffix / Units</label>
                              <input
                                type="text"
                                value={stat.suffix || ''}
                                onChange={(e) => {
                                  const updated = [...(draftData.stats || [])];
                                  updated[index].suffix = e.target.value;
                                  setDraftData({ ...draftData, stats: updated });
                                }}
                                className={styles.formInput}
                              />
                            </div>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Primary Label</label>
                            <input
                              type="text"
                              value={stat.label || ''}
                              onChange={(e) => {
                                const updated = [...(draftData.stats || [])];
                                updated[index].label = e.target.value;
                                setDraftData({ ...draftData, stats: updated });
                              }}
                              className={styles.formInput}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Sublabel Detail</label>
                            <input
                              type="text"
                              value={stat.sublabel || ''}
                              onChange={(e) => {
                                const updated = [...(draftData.stats || [])];
                                updated[index].sublabel = e.target.value;
                                setDraftData({ ...draftData, stats: updated });
                              }}
                              className={styles.formInput}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. ROI CALCULATOR */}
                {activeTab === 'calculator' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Interactive Tool</span>
                        <h4 className={styles.sectionTitle}>Solar Savings Calculator Engine</h4>
                        <p className={styles.sectionSubtitle}>
                          Configure electricity tariffs, units generation coefficients, and default assumptions.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.fieldsGrid3}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>UPPCL Electricity Rate (₹/Unit)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={draftData.calculator?.unitRate || 7.5}
                            onChange={(e) => updateDraft('calculator', 'unitRate', Number(e.target.value))}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Monthly Units / kW Generation</label>
                          <input
                            type="number"
                            value={draftData.calculator?.solarUnitsPerKw || 115}
                            onChange={(e) => updateDraft('calculator', 'solarUnitsPerKw', Number(e.target.value))}
                            className={styles.formInput}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Default Initial Bill (₹)</label>
                          <input
                            type="number"
                            value={draftData.calculator?.defaultBill || 4500}
                            onChange={(e) => updateDraft('calculator', 'defaultBill', Number(e.target.value))}
                            className={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. WHY US & PROCESS */}
                {activeTab === 'whyus' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Value Propositions</span>
                        <h4 className={styles.sectionTitle}>Why Us &amp; Engineering USPs</h4>
                        <p className={styles.sectionSubtitle}>
                          Key competitive reasons customers choose Maa Vindhyavasini Enterprises.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Section Title</label>
                        <input
                          type="text"
                          value={draftData.whyUs?.title || ''}
                          onChange={(e) => updateDraft('whyUs', 'title', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Section Subtitle</label>
                        <textarea
                          rows={2}
                          value={draftData.whyUs?.subtitle || ''}
                          onChange={(e) => updateDraft('whyUs', 'subtitle', e.target.value)}
                          className={styles.formTextarea}
                        />
                      </div>
                    </div>

                    {(draftData.whyUs?.usps || []).map((usp: any, index: number) => (
                      <div key={usp.id || index} className={styles.adminCard}>
                        <div className={styles.itemCardHeader}>
                          <span className={styles.itemCardTitle}>USP #{index + 1}: {usp.title}</span>
                        </div>
                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>USP Headline</label>
                            <input
                              type="text"
                              value={usp.title}
                              onChange={(e) => {
                                const updated = [...(draftData.whyUs?.usps || [])];
                                updated[index].title = e.target.value;
                                setDraftData({ ...draftData, whyUs: { ...draftData.whyUs, usps: updated } });
                              }}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Badge Tag</label>
                            <input
                              type="text"
                              value={usp.iconTag}
                              onChange={(e) => {
                                const updated = [...(draftData.whyUs?.usps || [])];
                                updated[index].iconTag = e.target.value;
                                setDraftData({ ...draftData, whyUs: { ...draftData.whyUs, usps: updated } });
                              }}
                              className={styles.formInput}
                            />
                          </div>
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Detailed Description</label>
                          <textarea
                            rows={2}
                            value={usp.desc}
                            onChange={(e) => {
                              const updated = [...(draftData.whyUs?.usps || [])];
                              updated[index].desc = e.target.value;
                              setDraftData({ ...draftData, whyUs: { ...draftData.whyUs, usps: updated } });
                            }}
                            className={styles.formTextarea}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 8. BRAND PARTNERS */}
                {activeTab === 'brands' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Authorized Distributors</span>
                        <h4 className={styles.sectionTitle}>Tier-1 Brand Partners</h4>
                        <p className={styles.sectionSubtitle}>
                          Authorized hardware equipment partners showcased on the home page.
                        </p>
                      </div>
                    </div>

                    <div className={styles.fieldsGrid2}>
                      {(draftData.brands || []).map((brand: any, index: number) => (
                        <div key={index} className={styles.adminCard}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Partner Name</label>
                            <input
                              type="text"
                              value={brand.name}
                              onChange={(e) => {
                                const updated = [...(draftData.brands || [])];
                                updated[index].name = e.target.value;
                                setDraftData({ ...draftData, brands: updated });
                              }}
                              className={styles.formInput}
                            />
                          </div>
                          <div className={styles.fieldsGrid2}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Category</label>
                              <input
                                type="text"
                                value={brand.category}
                                onChange={(e) => {
                                  const updated = [...(draftData.brands || [])];
                                  updated[index].category = e.target.value;
                                  setDraftData({ ...draftData, brands: updated });
                                }}
                                className={styles.formInput}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Specialty Tag</label>
                              <input
                                type="text"
                                value={brand.tag}
                                onChange={(e) => {
                                  const updated = [...(draftData.brands || [])];
                                  updated[index].tag = e.target.value;
                                  setDraftData({ ...draftData, brands: updated });
                                }}
                                className={styles.formInput}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. FOOTER & LEGAL */}
                {activeTab === 'footer' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Closing &amp; Compliance</span>
                        <h4 className={styles.sectionTitle}>Footer &amp; Legal Notices</h4>
                        <p className={styles.sectionSubtitle}>
                          Taglines, official DISCOM empanelment badges, and copyright notices.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Footer Company Tagline</label>
                        <textarea
                          rows={2}
                          value={draftData.footer?.tagline || ''}
                          onChange={(e) => updateDraft('footer', 'tagline', e.target.value)}
                          className={styles.formTextarea}
                        />
                      </div>

                      <div className={styles.fieldsGrid2}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Partner Empanelment Badge</label>
                          <input
                            type="text"
                            value={draftData.footer?.partnerBadge || ''}
                            onChange={(e) => updateDraft('footer', 'partnerBadge', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Copyright Notice</label>
                          <input
                            type="text"
                            value={draftData.footer?.copyrightNotice || ''}
                            onChange={(e) => updateDraft('footer', 'copyrightNotice', e.target.value)}
                            className={styles.formInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. FLOATING WHATSAPP */}
                {activeTab === 'whatsapp' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Instant Conversion</span>
                        <h4 className={styles.sectionTitle}>Floating WhatsApp Assistant</h4>
                        <p className={styles.sectionSubtitle}>
                          Configure greeting tooltip and the pre-filled message when a customer opens WhatsApp.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Tooltip Hover Text</label>
                        <input
                          type="text"
                          value={draftData.whatsapp?.tooltip || ''}
                          onChange={(e) => updateDraft('whatsapp', 'tooltip', e.target.value)}
                          className={styles.formInput}
                        />
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Pre-filled WhatsApp Message</label>
                        <textarea
                          rows={3}
                          value={draftData.whatsapp?.prefilledMessage || ''}
                          onChange={(e) => updateDraft('whatsapp', 'prefilledMessage', e.target.value)}
                          className={styles.formTextarea}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. LEADS CRM */}
                {activeTab === 'crm' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Inquiries &amp; Pipeline</span>
                        <h4 className={styles.sectionTitle}>Customer Inquiries CRM</h4>
                        <p className={styles.sectionSubtitle}>
                          All solar quote requests and calculator inquiries captured on your site.
                        </p>
                      </div>
                    </div>

                    {draftData.leads && draftData.leads.length > 0 ? (
                      <div className={styles.adminTableWrapper}>
                        <table className={styles.adminTable}>
                          <thead>
                            <tr>
                              <th className={styles.adminTh}>Date &amp; Time</th>
                              <th className={styles.adminTh}>Customer</th>
                              <th className={styles.adminTh}>Phone</th>
                              <th className={styles.adminTh}>Location / Category</th>
                              <th className={styles.adminTh}>Bill / Capacity</th>
                              <th className={styles.adminTh}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {draftData.leads.map((lead: any, i: number) => (
                              <tr key={i}>
                                <td className={styles.adminTd}>
                                  <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                                    {lead.submittedAt || 'Recent'}
                                  </span>
                                </td>
                                <td className={styles.adminTd}>
                                  <strong>{lead.name}</strong>
                                </td>
                                <td className={styles.adminTd}>
                                  <a href={`tel:${lead.phone}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>
                                    {lead.phone}
                                  </a>
                                </td>
                                <td className={styles.adminTd}>{lead.location || lead.category || 'Mirzapur'}</td>
                                <td className={styles.adminTd}>
                                  <span className={styles.leadBadge}>
                                    {lead.bill ? `₹${lead.bill}/mo` : lead.capacity || 'Inquiry'}
                                  </span>
                                </td>
                                <td className={styles.adminTd}>
                                  <button
                                    type="button"
                                    className={styles.deleteItemBtn}
                                    onClick={() => {
                                      if (window.confirm('Delete lead?')) {
                                        const updated = draftData.leads.filter((_: any, idx: number) => idx !== i);
                                        setDraftData({ ...draftData, leads: updated });
                                      }
                                    }}
                                  >
                                    <RiDeleteBinLine size={13} /> Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className={styles.adminCard} style={{ textAlign: 'center', padding: '48px 24px' }}>
                        <div style={{ color: 'var(--muted-slate)', marginBottom: 8, fontSize: '0.92rem' }}>
                          No leads submitted yet.
                        </div>
                        <p style={{ color: '#94A3B8', fontSize: '0.82rem' }}>
                          When visitors request a quote or calculate solar savings, submissions appear here live.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* 12. BACKUP & SECURITY */}
                {activeTab === 'settings' && (
                  <div>
                    <div className={styles.sectionHeaderRow}>
                      <div>
                        <span className={styles.sectionKicker}>Data Protection</span>
                        <h4 className={styles.sectionTitle}>Backup, Restore &amp; Passcode</h4>
                        <p className={styles.sectionSubtitle}>
                          Export full JSON backups, restore previous configuration, or change security PIN.
                        </p>
                      </div>
                    </div>

                    <div className={styles.adminCard}>
                      <div className={styles.itemCardHeader}>
                        <span className={styles.itemCardTitle}>Export / Import Website Data</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          className={styles.addItemBtn}
                          onClick={() => {
                            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(draftData, null, 2));
                            const downloadAnchor = document.createElement('a');
                            downloadAnchor.setAttribute('href', dataStr);
                            downloadAnchor.setAttribute('download', `mve_solar_backup_${new Date().toISOString().slice(0, 10)}.json`);
                            document.body.appendChild(downloadAnchor);
                            downloadAnchor.click();
                            downloadAnchor.remove();
                          }}
                        >
                          <RiFileDownloadLine size={16} />
                          <span>Export JSON Backup</span>
                        </button>

                        <button
                          type="button"
                          className={styles.deleteItemBtn}
                          style={{ padding: '8px 16px', borderRadius: 8, fontSize: '0.84rem' }}
                          onClick={() => {
                            if (window.confirm('Reset all CMS content back to factory defaults?')) {
                              if (siteContext?.resetToDefaults) {
                                siteContext.resetToDefaults();
                              }
                              setDraftData(DEFAULT_DATA);
                              triggerSaveIndicator();
                            }
                          }}
                        >
                          <RiRestartLine size={16} />
                          <span>Reset to Factory Defaults</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sticky Bottom Save Bar */}
                <div className={styles.bottomSaveBar}>
                  <div className={styles.bottomSaveInfo}>
                    <span className={styles.activeTabTag}>{getTabLabel(activeTab)}</span>
                    <span className={styles.activeTabHint}>
                      Editing in draft mode. Click 'Save All Changes' to apply updates across the site.
                    </span>
                  </div>
                  <div className={styles.bottomSaveActions}>
                    <button
                      type="button"
                      className={styles.discardBtn}
                      onClick={handleDiscardChanges}
                      title="Revert draft back to current saved state"
                    >
                      <RiRestartLine size={15} />
                      <span>Discard Changes</span>
                    </button>
                    <button
                      type="button"
                      className={styles.saveChangesBtn}
                      onClick={handleSaveAll}
                      title="Save all draft changes to live site"
                    >
                      <RiSaveLine size={16} />
                      <span>Save All Changes</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
