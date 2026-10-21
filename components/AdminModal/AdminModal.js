'use client';

import React, { useState, useRef } from 'react';
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
  RiPhoneLine,
  RiAddLine,
  RiDeleteBinLine,
  RiSaveLine,
  RiFileDownloadLine,
  RiFileUploadLine,
  RiRestartLine,
  RiCalculatorLine,
  RiBarChartLine,
  RiAwardLine,
  RiImageAddLine,
  RiPlayCircleLine,
  RiExternalLinkLine,
  RiCheckboxCircleLine,
  RiCustomerService2Line,
  RiLayoutBottomLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './AdminModal.module.css';

export default function AdminModal() {
  const {
    siteData,
    updateSiteData,
    adminPasscode,
    updateAdminPasscode,
    resetToDefaults,
    isPasscodeModalOpen,
    setIsPasscodeModalOpen,
    isAdminOpen,
    setIsAdminOpen,
    verifyPasscode,
  } = useSiteData();

  // Local state for Passcode challenge prompt
  const [enteredPin, setEnteredPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [pinError, setPinError] = useState('');

  // Local state for active Admin CMS tab
  const [activeTab, setActiveTab] = useState('crm');
  const [savedNotification, setSavedNotification] = useState(false);

  // Editable drafts in Admin
  const [draftData, setDraftData] = useState(siteData);
  const [newPasscodeField, setNewPasscodeField] = useState('');
  const [passcodeSuccessMsg, setPasscodeSuccessMsg] = useState('');

  // File input refs for image upload
  const mediaFileInputRef = useRef(null);
  const [uploadTargetIndex, setUploadTargetIndex] = useState(null);

  // Sync draft data when admin opens or siteData updates
  const handleOpenAdmin = () => {
    setDraftData(JSON.parse(JSON.stringify(siteData)));
  };

  const triggerSaveNotification = () => {
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  // Revert draft edits back to current siteData
  const handleDiscardChanges = () => {
    if (window.confirm('Discard unsaved draft edits and reload saved website settings?')) {
      setDraftData(JSON.parse(JSON.stringify(siteData)));
    }
  };

  // Human-readable active tab labels
  const getTabLabel = (tab) => {
    switch (tab) {
      case 'crm': return 'Leads CRM';
      case 'header': return 'Navbar & Ticker';
      case 'contact': return 'Contact & Forms';
      case 'footer': return 'Footer & Legal';
      case 'hero': return 'Hero & Slogans';
      case 'stats': return 'Stats & Impact';
      case 'calculator': return 'ROI Calculator';
      case 'services': return 'Services EPC';
      case 'suryaghar': return 'PM Surya Ghar Matrix';
      case 'projects': return 'Projects & Plants';
      case 'whyus': return 'Why Us & Blueprint';
      case 'brands': return 'Brand Partners';
      case 'media': return 'Photos & Videos';
      case 'testimonials': return 'Testimonials';
      case 'whatsapp': return 'Floating WhatsApp';
      case 'settings': return 'Backup & Security';
      default: return 'Module Editor';
    }
  };

  // Handle Passcode Unlock
  const handleUnlock = (e) => {
    e.preventDefault();
    if (!enteredPin.trim()) {
      setPinError('Please enter the administrative passcode.');
      return;
    }
    const success = verifyPasscode(enteredPin);
    if (success) {
      setEnteredPin('');
      setPinError('');
      handleOpenAdmin();
    } else {
      setPinError('Incorrect passcode! Please verify and re-try (default is 9670).');
    }
  };

  // General field updater for top-level object sections
  const updateDraft = (section, key, value) => {
    setDraftData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // Client-side canvas image compressor for direct file upload
  const compressImage = (file, callback) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Save current draft to live context & localStorage
  const handleSaveAll = () => {
    updateSiteData(draftData);
    triggerSaveNotification();
  };

  // Stats Counters
  const handleStatChange = (index, field, value) => {
    const updated = [...(draftData.stats || [])];
    updated[index][field] = field === 'value' ? Number(value) : value;
    setDraftData({ ...draftData, stats: updated });
  };

  const handleImpactChange = (field, value) => {
    setDraftData((prev) => ({
      ...prev,
      impact: {
        ...(prev.impact || {}),
        [field]: value,
      },
    }));
  };

  // Calculator Configuration
  const handleCalculatorChange = (field, value) => {
    setDraftData((prev) => ({
      ...prev,
      calculator: {
        ...(prev.calculator || {}),
        [field]: value,
      },
    }));
  };

  // Why Us & USPs
  const handleWhyUsChange = (field, value) => {
    setDraftData((prev) => ({
      ...prev,
      whyUs: {
        ...(prev.whyUs || {}),
        [field]: value,
      },
    }));
  };

  const handleUspChange = (index, field, value) => {
    const updated = [...(draftData.whyUs?.usps || [])];
    updated[index][field] = value;
    setDraftData((prev) => ({
      ...prev,
      whyUs: {
        ...(prev.whyUs || {}),
        usps: updated,
      },
    }));
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...(draftData.whyUs?.processSteps || [])];
    updated[index][field] = value;
    setDraftData((prev) => ({
      ...prev,
      whyUs: {
        ...(prev.whyUs || {}),
        processSteps: updated,
      },
    }));
  };

  // Brand Partners
  const handleBrandChange = (index, field, value) => {
    const updated = [...(draftData.brands || [])];
    updated[index][field] = value;
    setDraftData({ ...draftData, brands: updated });
  };

  const handleAddBrand = () => {
    const newBrand = {
      name: 'New Solar Partner',
      tag: 'Tier-1 Certified Components',
      color: '#EA580C',
    };
    setDraftData({
      ...draftData,
      brands: [...(draftData.brands || []), newBrand],
    });
  };

  const handleDeleteBrand = (index) => {
    const updated = (draftData.brands || []).filter((_, i) => i !== index);
    setDraftData({ ...draftData, brands: updated });
  };

  // Service item updates
  const handleServiceChange = (index, field, value) => {
    const updated = [...draftData.services];
    if (field === 'features') {
      updated[index][field] = value.split('\n').filter((item) => item.trim() !== '');
    } else {
      updated[index][field] = value;
    }
    setDraftData({ ...draftData, services: updated });
  };

  const handleAddService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      title: 'New Solar Solution',
      desc: 'High-performance solar engineering service tailored for regional UP power requirements.',
      features: ['Custom structural engineering', 'Complete DISCOM approval support', '5-year workmanship warranty'],
    };
    setDraftData({
      ...draftData,
      services: [...draftData.services, newService],
    });
  };

  const handleDeleteService = (index) => {
    const updated = draftData.services.filter((_, i) => i !== index);
    setDraftData({ ...draftData, services: updated });
  };

  // Project item updates
  const handleProjectChange = (index, field, value) => {
    const updated = [...draftData.projects];
    updated[index][field] = value;
    setDraftData({ ...draftData, projects: updated });
  };

  const handleProjectPhotoUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImage(file, (dataUrl) => {
      handleProjectChange(index, 'imageUrl', dataUrl);
    });
  };

  const handleAddProject = () => {
    const newProj = {
      id: Date.now(),
      title: 'New Solar Installation',
      category: 'On-Grid Solar',
      location: 'Mirzapur, UP',
      capacity: '20 kW',
      modules: 'Tier-1 Mono PERC 545W Panels',
      inverter: 'Cloud-Tied Smart Inverter',
      structure: 'HDG 80-Micron Aluminum Structure',
      tilt: '24° South-Facing Azimuth',
      generation: '29,200 kWh / Year',
      dailyUnits: '80 Units / Day Avg.',
      commissioned: '2026',
      savings: '₹2.8 Lakh / Year',
      co2: '24 Tonnes / Year',
      trees: '1,200 Trees',
      status: 'Completed & Net-Metered',
      discom: 'UPPCL Net-Meter Active',
      sanctionNo: 'UPPCL-MZP-NEW',
      videoUrl: '',
      imageUrl: '',
    };
    setDraftData({
      ...draftData,
      projects: [newProj, ...draftData.projects],
    });
  };

  const handleDeleteProject = (index) => {
    const updated = draftData.projects.filter((_, i) => i !== index);
    setDraftData({ ...draftData, projects: updated });
  };

  // Media item updates (Videos & Photos)
  const handleMediaChange = (index, field, value) => {
    const updated = [...(draftData.media || [])];
    updated[index][field] = value;
    setDraftData({ ...draftData, media: updated });
  };

  const handleMediaPhotoUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;
    compressImage(file, (dataUrl) => {
      handleMediaChange(index, 'url', dataUrl);
    });
  };

  const handleAddMedia = (type = 'video') => {
    const newItem = {
      id: Date.now(),
      title: type === 'video' ? 'Solar Plant Drone Video Walkthrough' : 'Site Installation Photo',
      type: type,
      url:
        type === 'video'
          ? 'https://www.youtube.com/embed/dQw4w9WgXcQ'
          : 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop',
      caption: 'Detailed drone overview & equipment testing in Mirzapur',
    };
    setDraftData({
      ...draftData,
      media: [...(draftData.media || []), newItem],
    });
  };

  const handleDeleteMedia = (index) => {
    const updated = (draftData.media || []).filter((_, i) => i !== index);
    setDraftData({ ...draftData, media: updated });
  };

  // Testimonials updates
  const handleTestimonialChange = (index, field, value) => {
    const updated = [...draftData.testimonials];
    updated[index][field] = value;
    setDraftData({ ...draftData, testimonials: updated });
  };

  const handleAddTestimonial = () => {
    const newT = {
      name: 'Client Name',
      location: 'Mirzapur',
      system: '5 kW Rooftop Solar',
      initials: 'CN',
      avatarBg: 'linear-gradient(135deg, #EA580C, #F59E0B)',
      quote:
        'Great experience with Maa Vindhyavasini Enterprises. Prompt installation, zero roof damage, and seamless net-meter sanction from UPPCL.',
    };
    setDraftData({
      ...draftData,
      testimonials: [...draftData.testimonials, newT],
    });
  };

  const handleDeleteTestimonial = (index) => {
    const updated = draftData.testimonials.filter((_, i) => i !== index);
    setDraftData({ ...draftData, testimonials: updated });
  };

  // PM Surya Ghar Matrix updates
  const handleMatrixChange = (index, field, value) => {
    const updated = [...draftData.suryaGhar.matrix];
    updated[index][field] = value;
    setDraftData({
      ...draftData,
      suryaGhar: {
        ...draftData.suryaGhar,
        matrix: updated,
      },
    });
  };

  // Delete single lead from CRM
  const handleDeleteLead = (index) => {
    if (window.confirm('Are you sure you want to delete this customer inquiry from the CRM?')) {
      const updated = (draftData.leads || []).filter((_, i) => i !== index);
      setDraftData({ ...draftData, leads: updated });
    }
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(siteData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `maa_vindhyavasini_solar_backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON backup
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        updateSiteData(parsed);
        setDraftData(parsed);
        triggerSaveNotification();
        alert('Data imported and applied to website successfully!');
      } catch (err) {
        alert('Invalid JSON backup file.');
      }
    };
    reader.readAsText(file);
  };

  // Change passcode
  const handleChangePasscode = (e) => {
    e.preventDefault();
    if (!newPasscodeField.trim() || newPasscodeField.trim().length < 4) {
      alert('Passcode must be at least 4 characters long.');
      return;
    }
    updateAdminPasscode(newPasscodeField.trim());
    setPasscodeSuccessMsg('Admin passcode updated successfully!');
    setNewPasscodeField('');
    setTimeout(() => setPasscodeSuccessMsg(''), 3000);
  };

  return (
    <>
      {/* 1. Passcode Authentication Modal */}
      <AnimatePresence>
        {isPasscodeModalOpen && (
          <div className={styles.passcodeBackdrop} onClick={() => setIsPasscodeModalOpen(false)}>
            <motion.div
              className={styles.passcodeCard}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.22 }}
            >
              <button
                type="button"
                className={styles.passcodeCloseBtn}
                onClick={() => setIsPasscodeModalOpen(false)}
                aria-label="Close passcode prompt"
              >
                <RiCloseLine size={20} />
              </button>

              <div className={styles.lockIconWrapper}>
                <RiShieldKeyholeLine size={30} />
              </div>

              <h3 className={styles.passcodeTitle}>MVE Solar Admin Portal</h3>
              <p className={styles.passcodeSubtitle}>
                Enter your administrative PIN to access the full CMS studio, manage website content, leads, and media.
              </p>

              <form onSubmit={handleUnlock}>
                <div className={styles.pinInputWrapper}>
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={enteredPin}
                    onChange={(e) => {
                      setEnteredPin(e.target.value);
                      if (pinError) setPinError('');
                    }}
                    placeholder="Enter Passcode"
                    autoFocus
                    className={styles.pinInput}
                    aria-label="Admin Passcode"
                  />
                  <button
                    type="button"
                    className={styles.toggleVisibilityBtn}
                    onClick={() => setShowPin(!showPin)}
                    aria-label={showPin ? 'Hide PIN' : 'Show PIN'}
                  >
                    {showPin ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>

                {pinError && <div className={styles.errorText}>{pinError}</div>}

                <div className={styles.passcodeActions}>
                  <button type="submit" className={styles.unlockBtn}>
                    <RiLockPasswordLine size={18} />
                    <span>Unlock Studio</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Full-Screen Executive CMS Admin Studio */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className={styles.adminStudioModal}>
            <motion.div
              className={styles.adminWindow}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              {/* Studio Header Bar */}
              <div className={styles.adminTopBar}>
                <div className={styles.adminBrandGroup}>
                  <div className={styles.adminLogoIcon}>
                    <RiShieldKeyholeLine size={20} />
                  </div>
                  <div>
                    <div className={styles.adminBrandTitle}>MVE Executive Admin Studio</div>
                    <div className={styles.adminBrandSub}>Complete Content &amp; Media Management System</div>
                  </div>
                </div>

                <div className={styles.adminTopActions}>
                  {savedNotification && (
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
                    style={{ padding: '8px 18px', fontSize: '0.84rem' }}
                  >
                    <RiSaveLine size={16} />
                    <span>Save All Changes</span>
                  </button>

                  <button
                    type="button"
                    className={styles.closeAdminBtn}
                    onClick={() => setIsAdminOpen(false)}
                  >
                    <RiCloseLine size={18} />
                    <span>Exit Admin</span>
                  </button>
                </div>
              </div>

              {/* Main Admin Content Layout */}
              <div className={styles.adminLayout}>
                {/* Left Tabs Sidebar */}
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
                    className={`${styles.tabBtn} ${activeTab === 'services' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab('services')}
                  >
                    <RiToolsLine size={18} />
                    <span>Services EPC</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.tabBtn} ${activeTab === 'suryaghar' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab('suryaghar')}
                  >
                    <RiGovernmentLine size={18} />
                    <span>PM Surya Ghar Matrix</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    <RiFolderVideoLine size={18} />
                    <span>Projects &amp; Plants</span>
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

                  <div className={styles.sidebarCategory}>Media &amp; Proof</div>
                  <button
                    type="button"
                    className={`${styles.tabBtn} ${activeTab === 'media' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab('media')}
                  >
                    <RiFolderVideoLine size={18} />
                    <span>Photos &amp; Videos</span>
                  </button>

                  <button
                    type="button"
                    className={`${styles.tabBtn} ${activeTab === 'testimonials' ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab('testimonials')}
                  >
                    <RiChatQuoteLine size={18} />
                    <span>Testimonials</span>
                  </button>

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

                {/* Right Tab Content Viewport */}
                <div className={styles.adminContent}>
                  {/* TAB 1: Leads CRM */}
                  {activeTab === 'crm' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Customer Inquiries &amp; Leads CRM</h4>
                          <p className={styles.sectionSubtitle}>
                            All incoming leads submitted through your contact form and solar savings calculator.
                          </p>
                        </div>
                      </div>

                      {draftData.leads && draftData.leads.length > 0 ? (
                        <div className={styles.adminTableWrapper}>
                          <table className={styles.adminTable}>
                            <thead>
                              <tr>
                                <th className={styles.adminTh}>Date &amp; ID</th>
                                <th className={styles.adminTh}>Client Name</th>
                                <th className={styles.adminTh}>Phone Number</th>
                                <th className={styles.adminTh}>City / Area</th>
                                <th className={styles.adminTh}>System Requirement</th>
                                <th className={styles.adminTh}>Message</th>
                                <th className={styles.adminTh}>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {draftData.leads.map((lead, idx) => (
                                <tr key={lead.id || idx}>
                                  <td className={styles.adminTd}>
                                    <span className={styles.leadBadge}>{lead.id}</span>
                                    <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: 4 }}>
                                      {lead.date}
                                    </div>
                                  </td>
                                  <td className={styles.adminTd}>
                                    <strong>{lead.name}</strong>
                                  </td>
                                  <td className={styles.adminTd}>
                                    <a
                                      href={`tel:${lead.phone.replace(/[^0-9+]/g, '')}`}
                                      style={{
                                        color: 'var(--primary)',
                                        fontWeight: 600,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 4,
                                      }}
                                    >
                                      <RiPhoneLine size={14} />
                                      {lead.phone}
                                    </a>
                                  </td>
                                  <td className={styles.adminTd}>{lead.city || 'Mirzapur'}</td>
                                  <td className={styles.adminTd}>
                                    <span
                                      style={{
                                        background: '#FFF7ED',
                                        color: 'var(--primary)',
                                        padding: '2px 8px',
                                        borderRadius: 4,
                                        fontWeight: 600,
                                        fontSize: '0.78rem',
                                      }}
                                    >
                                      {lead.systemSize}
                                    </span>
                                  </td>
                                  <td className={styles.adminTd} style={{ maxWidth: 220, fontSize: '0.8rem' }}>
                                    {lead.message || 'Standard rooftop quote'}
                                  </td>
                                  <td className={styles.adminTd}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <a
                                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                          lead.name
                                        )},%20this%20is%20Maa%20Vindhyavasini%20Enterprises%20regarding%20your%20solar%20rooftop%20inquiry.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          display: 'inline-flex',
                                          alignItems: 'center',
                                          gap: 4,
                                          background: '#25D366',
                                          color: '#FFFFFF',
                                          padding: '5px 10px',
                                          borderRadius: 6,
                                          fontSize: '0.76rem',
                                          fontWeight: 700,
                                          textDecoration: 'none',
                                        }}
                                      >
                                        <RiWhatsappLine size={14} />
                                        <span>WhatsApp</span>
                                      </a>
                                      <button
                                        type="button"
                                        className={styles.deleteItemBtn}
                                        style={{ padding: '5px 8px', fontSize: '0.76rem' }}
                                        onClick={() => handleDeleteLead(idx)}
                                        title="Delete Lead"
                                        aria-label="Delete Lead"
                                      >
                                        <RiDeleteBinLine size={13} />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div
                          style={{
                            padding: 40,
                            textAlign: 'center',
                            color: '#64748B',
                            background: '#F8FAFC',
                            borderRadius: 10,
                          }}
                        >
                          No leads logged yet. Test by submitting the contact form on your website.
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 2: Navbar & Top Ticker */}
                  {activeTab === 'header' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Navbar &amp; Top Announcement Bar</h4>
                          <p className={styles.sectionSubtitle}>
                            Update top ticker banner, hotline numbers, email address, brand identity, and navbar CTA button.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Brand Name</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.header?.brandName || ''}
                              onChange={(e) => updateDraft('header', 'brandName', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Division Subtitle</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.header?.brandSubtitle || ''}
                              onChange={(e) => updateDraft('header', 'brandSubtitle', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Primary Phone / WhatsApp</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.header?.phone || ''}
                              onChange={(e) => updateDraft('header', 'phone', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Email Address</label>
                            <input
                              type="email"
                              className={styles.formInput}
                              value={draftData.header?.email || ''}
                              onChange={(e) => updateDraft('header', 'email', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Top Ticker Green Status Badge</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.header?.tickerBadge || ''}
                              onChange={(e) => updateDraft('header', 'tickerBadge', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Top Ticker Banner Slogan</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.header?.tickerText || ''}
                              onChange={(e) => updateDraft('header', 'tickerText', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Navbar CTA Button Label</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            placeholder="e.g. Get Free Quote"
                            value={draftData.header?.ctaText || ''}
                            onChange={(e) => updateDraft('header', 'ctaText', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: Contact & Inquiries */}
                  {activeTab === 'contact' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Contact Section &amp; Lead Form Settings</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage section headings, lead consultation form titles, office address, operating hours, and financing notice.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Section Kicker</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.kicker || ''}
                              onChange={(e) => updateDraft('contact', 'kicker', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Section Headline Title</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.title || ''}
                              onChange={(e) => updateDraft('contact', 'title', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Section Subtitle Description</label>
                          <textarea
                            rows={2}
                            className={styles.formTextarea}
                            value={draftData.contact?.subtitle || ''}
                            onChange={(e) => updateDraft('contact', 'subtitle', e.target.value)}
                          />
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Lead Capture Card Title</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.formTitle || ''}
                              onChange={(e) => updateDraft('contact', 'formTitle', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Lead Capture Card Subtitle</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.formSubtitle || ''}
                              onChange={(e) => updateDraft('contact', 'formSubtitle', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Physical Office &amp; Warehouse Address</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.address || ''}
                              onChange={(e) => updateDraft('contact', 'address', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Regional Coverage Notice</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.servingAreas || ''}
                              onChange={(e) => updateDraft('contact', 'servingAreas', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Official Working Hours</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.workingHours || ''}
                              onChange={(e) => updateDraft('contact', 'workingHours', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Guaranteed Response Time</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.contact?.responseTime || ''}
                              onChange={(e) => updateDraft('contact', 'responseTime', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Bank Finance &amp; Loan Assistance Notice</label>
                          <textarea
                            rows={3}
                            className={styles.formTextarea}
                            value={draftData.contact?.financeNotice || ''}
                            onChange={(e) => updateDraft('contact', 'financeNotice', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Hero & Slogans */}
                  {activeTab === 'hero' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Hero Section &amp; Main Slogans</h4>
                          <p className={styles.sectionSubtitle}>
                            Customize the main headline, orange highlight phrases, badges, and trust pills.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Top Kicker Badge</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={draftData.hero?.badgeText || ''}
                            onChange={(e) => updateDraft('hero', 'badgeText', e.target.value)}
                          />
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Hero Title (Prefix)</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.hero?.titlePrefix || ''}
                              onChange={(e) => updateDraft('hero', 'titlePrefix', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Hero Title (Orange Highlight)</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.hero?.highlightText || ''}
                              onChange={(e) => updateDraft('hero', 'highlightText', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Hero Paragraph Subtitle</label>
                          <textarea
                            rows={3}
                            className={styles.formTextarea}
                            value={draftData.hero?.subtitle || ''}
                            onChange={(e) => updateDraft('hero', 'subtitle', e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Trust Pills (Comma Separated)</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={(draftData.hero?.quickPills || []).join(', ')}
                            onChange={(e) =>
                              updateDraft(
                                'hero',
                                'quickPills',
                                e.target.value.split(',').map((p) => p.trim())
                              )
                            }
                          />
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Solar Generation Widget Title</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.hero?.generationTitle || ''}
                              onChange={(e) => updateDraft('hero', 'generationTitle', e.target.value)}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Generation Subtitle / Sun Hours</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.hero?.generationSubtitle || ''}
                              onChange={(e) => updateDraft('hero', 'generationSubtitle', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Widget Status Tag</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            placeholder="e.g. Peak Output"
                            value={draftData.hero?.generationTag || ''}
                            onChange={(e) => updateDraft('hero', 'generationTag', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Stats & Impact Indicators */}
                  {activeTab === 'stats' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Stats Bar Numbers &amp; Environmental Impact</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage the 4 dynamic count-up statistics, regional badge, and bottom environmental impact metrics.
                          </p>
                        </div>
                      </div>

                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Regional Serving Badge Text</label>
                        <input
                          type="text"
                          className={styles.formInput}
                          value={draftData.impact?.regionBadge || ''}
                          onChange={(e) => handleImpactChange('regionBadge', e.target.value)}
                        />
                      </div>

                      <h5 style={{ margin: '16px 0 8px', fontWeight: 700, color: 'var(--dark)' }}>
                        4 Primary Count-Up Metrics
                      </h5>
                      <div className={styles.fieldsGrid2}>
                        {(draftData.stats || []).map((stat, idx) => (
                          <div key={idx} className={styles.adminCard}>
                            <div className={styles.fieldsGrid2}>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Target Number (Count-Up)</label>
                                <input
                                  type="number"
                                  className={styles.formInput}
                                  value={stat.value}
                                  onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                                />
                              </div>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Suffix (e.g. +, + MW)</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={stat.suffix}
                                  onChange={(e) => handleStatChange(idx, 'suffix', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Main Label</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={stat.label}
                                onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Sublabel Detail</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={stat.sublabel}
                                onChange={(e) => handleStatChange(idx, 'sublabel', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <h5 style={{ margin: '20px 0 8px', fontWeight: 700, color: 'var(--dark)' }}>
                        Bottom Environmental Metrics
                      </h5>
                      <div className={styles.adminCard}>
                        <div className={styles.fieldsGrid3}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Annual CO2 Reduction</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.impact?.co2Offset || ''}
                              onChange={(e) => handleImpactChange('co2Offset', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Coal Conserved</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.impact?.coalSaved || ''}
                              onChange={(e) => handleImpactChange('coalSaved', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Tree Planting Equivalent</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.impact?.treesPlanted || ''}
                              onChange={(e) => handleImpactChange('treesPlanted', e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: Solar ROI Calculator Settings */}
                  {activeTab === 'calculator' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Solar ROI &amp; Subsidy Calculator Settings</h4>
                          <p className={styles.sectionSubtitle}>
                            Configure the unit tariffs, default monthly electricity bill amount, and solar generation formulas.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>DISCOM Unit Tariff (₹/kWh)</label>
                            <input
                              type="number"
                              step="0.1"
                              className={styles.formInput}
                              value={draftData.calculator?.unitRate || 7.5}
                              onChange={(e) => handleCalculatorChange('unitRate', Number(e.target.value))}
                            />
                            <span className={styles.uploadHelperText}>Average UPPCL domestic tariff in Mirzapur</span>
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Monthly Units Generated per kW</label>
                            <input
                              type="number"
                              className={styles.formInput}
                              value={draftData.calculator?.solarUnitsPerKw || 115}
                              onChange={(e) => handleCalculatorChange('solarUnitsPerKw', Number(e.target.value))}
                            />
                            <span className={styles.uploadHelperText}>Typically 115-125 units/month in Eastern UP</span>
                          </div>
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Default Bill Slider Starting Amount (₹)</label>
                            <input
                              type="number"
                              step="500"
                              className={styles.formInput}
                              value={draftData.calculator?.defaultBill || 4500}
                              onChange={(e) => handleCalculatorChange('defaultBill', Number(e.target.value))}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Lifetime Warranty Horizon (Years)</label>
                            <input
                              type="number"
                              className={styles.formInput}
                              value={draftData.calculator?.warrantyYears || 25}
                              onChange={(e) => handleCalculatorChange('warrantyYears', Number(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: Why Us & 4-Step Engineering Blueprint */}
                  {activeTab === 'whyus' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Why Us USPs &amp; 4-Step Turnkey Process</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage the 5 value proposition trust pillars, headline copy, and the 4 turnkey EPC engineering steps.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Section Kicker</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.whyUs?.kicker || ''}
                              onChange={(e) => handleWhyUsChange('kicker', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Main Section Headline</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.whyUs?.headline || ''}
                              onChange={(e) => handleWhyUsChange('headline', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Lead Paragraph Text</label>
                          <textarea
                            rows={2}
                            className={styles.formTextarea}
                            value={draftData.whyUs?.leadText || ''}
                            onChange={(e) => handleWhyUsChange('leadText', e.target.value)}
                          />
                        </div>
                      </div>

                      <h5 style={{ margin: '20px 0 10px', fontWeight: 700, color: 'var(--dark)' }}>
                        5 Core Value Propositions (USPs)
                      </h5>
                      {(draftData.whyUs?.usps || []).map((usp, idx) => (
                        <div key={idx} className={styles.adminCard}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>USP #{idx + 1} Title</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={usp.title}
                              onChange={(e) => handleUspChange(idx, 'title', e.target.value)}
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Description</label>
                            <textarea
                              rows={2}
                              className={styles.formTextarea}
                              value={usp.desc}
                              onChange={(e) => handleUspChange(idx, 'desc', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}

                      <h5 style={{ margin: '24px 0 10px', fontWeight: 700, color: 'var(--dark)' }}>
                        4-Step Turnkey EPC Blueprint
                      </h5>
                      <div className={styles.fieldsGrid2}>
                        {(draftData.whyUs?.processSteps || []).map((step, idx) => (
                          <div key={idx} className={styles.adminCard}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <span className={styles.stepBadge}>{step.step}</span>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={step.title}
                                onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                              />
                            </div>
                            <textarea
                              rows={2}
                              className={styles.formTextarea}
                              value={step.desc}
                              onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 7: Brand Partners */}
                  {activeTab === 'brands' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Brand Partners &amp; OEM Manufacturers</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage the partner brand badges displayed in the animated marquee carousel.
                          </p>
                        </div>
                        <button type="button" className={styles.addItemBtn} onClick={handleAddBrand}>
                          <RiAddLine size={16} />
                          <span>Add Brand Partner</span>
                        </button>
                      </div>

                      <div className={styles.fieldsGrid2}>
                        {(draftData.brands || []).map((brand, idx) => (
                          <div key={idx} className={styles.adminCard}>
                            <div className={styles.itemCardHeader}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span
                                  style={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    backgroundColor: brand.color || '#EA580C',
                                  }}
                                />
                                <strong>{brand.name}</strong>
                              </div>
                              <button
                                type="button"
                                className={styles.deleteItemBtn}
                                onClick={() => handleDeleteBrand(idx)}
                              >
                                <RiDeleteBinLine size={14} />
                                Delete
                              </button>
                            </div>

                            <div className={styles.fieldsGrid2}>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Manufacturer Name</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={brand.name}
                                  onChange={(e) => handleBrandChange(idx, 'name', e.target.value)}
                                />
                              </div>

                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Category Tag / Badge</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={brand.tag}
                                  onChange={(e) => handleBrandChange(idx, 'tag', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Brand Accent Color</label>
                              <div className={styles.colorInputRow}>
                                <input
                                  type="color"
                                  className={styles.colorPicker}
                                  value={brand.color || '#EA580C'}
                                  onChange={(e) => handleBrandChange(idx, 'color', e.target.value)}
                                />
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  style={{ width: 140 }}
                                  value={brand.color || '#EA580C'}
                                  onChange={(e) => handleBrandChange(idx, 'color', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 8: PM Surya Ghar Matrix */}
                  {activeTab === 'suryaghar' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>PM Surya Ghar: Muft Bijli Yojana Matrix</h4>
                          <p className={styles.sectionSubtitle}>
                            Update subsidy amounts, monthly savings, and roof area metrics for each capacity tier.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Government Initiative Badge</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={draftData.suryaGhar?.badge || ''}
                            onChange={(e) => updateDraft('suryaGhar', 'badge', e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Main Headline</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={draftData.suryaGhar?.headline || ''}
                            onChange={(e) => updateDraft('suryaGhar', 'headline', e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Subheadline Description</label>
                          <textarea
                            rows={3}
                            className={styles.formTextarea}
                            value={draftData.suryaGhar?.subheadline || ''}
                            onChange={(e) => updateDraft('suryaGhar', 'subheadline', e.target.value)}
                          />
                        </div>
                      </div>

                      <h5 style={{ margin: '20px 0 10px', fontWeight: 700, color: 'var(--dark)' }}>
                        Capacity &amp; Direct Bank Subsidy Tiers
                      </h5>

                      <div className={styles.fieldsGrid2}>
                        {draftData.suryaGhar?.matrix?.map((row, idx) => (
                          <div key={idx} className={styles.adminCard}>
                            <div className={styles.itemCardHeader}>
                              <span className={styles.itemCardTitle}>{row.capacity}</span>
                              {row.popular && <span className={styles.leadBadge}>Most Popular</span>}
                            </div>

                            <div className={styles.fieldsGrid2}>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Roof Area Required</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={row.area}
                                  onChange={(e) => handleMatrixChange(idx, 'area', e.target.value)}
                                />
                              </div>

                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Monthly Generation</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={row.units}
                                  onChange={(e) => handleMatrixChange(idx, 'units', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className={styles.fieldsGrid2}>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Monthly Bill Savings</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={row.savings}
                                  onChange={(e) => handleMatrixChange(idx, 'savings', e.target.value)}
                                />
                              </div>

                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Direct Bank Subsidy</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={row.subsidy}
                                  onChange={(e) => handleMatrixChange(idx, 'subsidy', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 9: Services CMS */}
                  {activeTab === 'services' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Solar Solutions &amp; EPC Services</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage all solar services, technical descriptions, and bullet points displayed on the website.
                          </p>
                        </div>
                        <button type="button" className={styles.addItemBtn} onClick={handleAddService}>
                          <RiAddLine size={16} />
                          <span>Add New Service</span>
                        </button>
                      </div>

                      <div className={styles.fieldsGrid2}>
                        {draftData.services?.map((svc, idx) => (
                          <div key={svc.id || idx} className={styles.adminCard}>
                            <div className={styles.itemCardHeader}>
                              <span className={styles.itemCardTitle}>{svc.title}</span>
                              <button
                                type="button"
                                className={styles.deleteItemBtn}
                                onClick={() => handleDeleteService(idx)}
                              >
                                <RiDeleteBinLine size={14} />
                                Delete
                              </button>
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Service Title</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={svc.title}
                                onChange={(e) => handleServiceChange(idx, 'title', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Description</label>
                              <textarea
                                rows={3}
                                className={styles.formTextarea}
                                value={svc.desc}
                                onChange={(e) => handleServiceChange(idx, 'desc', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Feature Bullet Points (1 per line)</label>
                              <textarea
                                rows={3}
                                className={styles.formTextarea}
                                value={(svc.features || []).join('\n')}
                                onChange={(e) => handleServiceChange(idx, 'features', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 10: Projects & Plants CMS */}
                  {activeTab === 'projects' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Commissioned Projects &amp; Plants</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage solar plant installations, technical specifications, real site photos, and video embeds.
                          </p>
                        </div>
                        <button type="button" className={styles.addItemBtn} onClick={handleAddProject}>
                          <RiAddLine size={16} />
                          <span>Add New Plant</span>
                        </button>
                      </div>

                      {draftData.projects?.map((proj, idx) => (
                        <div key={proj.id || idx} className={styles.adminCard}>
                          <div className={styles.itemCardHeader}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              {proj.imageUrl && (
                                <img
                                  src={proj.imageUrl}
                                  alt={proj.title}
                                  className={styles.thumbnailPreview}
                                />
                              )}
                              <div>
                                <span className={styles.itemCardTitle}>{proj.title}</span>
                                <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                                  {proj.capacity} • {proj.category} • {proj.location}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              className={styles.deleteItemBtn}
                              onClick={() => handleDeleteProject(idx)}
                            >
                              <RiDeleteBinLine size={14} />
                              Delete
                            </button>
                          </div>

                          {/* Direct Photo Upload & URL Section */}
                          <div className={styles.uploadSection}>
                            <label className={styles.formLabel} style={{ marginBottom: 4 }}>
                              Project Site Photo (Direct Upload or URL)
                            </label>
                            <div className={styles.uploadRow}>
                              <label className={styles.fileUploadBtn}>
                                <RiImageAddLine size={16} />
                                <span>Upload Photo from Device</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className={styles.fileInputHidden}
                                  onChange={(e) => handleProjectPhotoUpload(e, idx)}
                                />
                              </label>
                              <span style={{ fontSize: '0.78rem', color: '#64748B' }}>or paste Image URL:</span>
                              <input
                                type="text"
                                className={styles.formInput}
                                style={{ flex: 1, minWidth: 200 }}
                                placeholder="https://example.com/photo.jpg"
                                value={proj.imageUrl || ''}
                                onChange={(e) => handleProjectChange(idx, 'imageUrl', e.target.value)}
                              />
                            </div>
                            {proj.imageUrl && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                                <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                                  ✓ Photo Attached
                                </span>
                                <button
                                  type="button"
                                  style={{
                                    fontSize: '0.72rem',
                                    color: '#DC2626',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                  }}
                                  onClick={() => handleProjectChange(idx, 'imageUrl', '')}
                                >
                                  Remove Photo
                                </button>
                              </div>
                            )}
                          </div>

                          <div className={styles.fieldsGrid3} style={{ marginTop: 12 }}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Plant Project Title</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.title}
                                onChange={(e) => handleProjectChange(idx, 'title', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Category</label>
                              <select
                                className={styles.formInput}
                                value={proj.category}
                                onChange={(e) => handleProjectChange(idx, 'category', e.target.value)}
                              >
                                <option value="On-Grid Solar">On-Grid Solar</option>
                                <option value="Commercial Solar">Commercial Solar</option>
                                <option value="EPC & Commissioning">EPC &amp; Commissioning</option>
                              </select>
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Plant Capacity</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.capacity}
                                onChange={(e) => handleProjectChange(idx, 'capacity', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className={styles.fieldsGrid3}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Location</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.location}
                                onChange={(e) => handleProjectChange(idx, 'location', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Annual Generation</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.generation}
                                onChange={(e) => handleProjectChange(idx, 'generation', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Annual Bill Savings</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.savings}
                                onChange={(e) => handleProjectChange(idx, 'savings', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className={styles.fieldsGrid3}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Solar Modules Hardware</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.modules}
                                onChange={(e) => handleProjectChange(idx, 'modules', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Inverter Architecture</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.inverter}
                                onChange={(e) => handleProjectChange(idx, 'inverter', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Mounting Structure &amp; Tilt</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.structure}
                                onChange={(e) => handleProjectChange(idx, 'structure', e.target.value)}
                              />
                            </div>
                          </div>

                          <div className={styles.fieldsGrid2}>
                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>DISCOM Sanction / Net-Meter ID</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={proj.sanctionNo || ''}
                                onChange={(e) => handleProjectChange(idx, 'sanctionNo', e.target.value)}
                              />
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>YouTube Video Embed URL (Optional)</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                placeholder="https://www.youtube.com/embed/..."
                                value={proj.videoUrl || ''}
                                onChange={(e) => handleProjectChange(idx, 'videoUrl', e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 11: Photos & Videos CMS (Media Gallery) */}
                  {activeTab === 'media' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Photos &amp; Videos Media CMS</h4>
                          <p className={styles.sectionSubtitle}>
                            Upload photos directly from your device or embed YouTube drone walkthrough videos with live previews.
                          </p>
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button
                            type="button"
                            className={styles.addItemBtn}
                            onClick={() => handleAddMedia('photo')}
                          >
                            <RiImageAddLine size={16} />
                            <span>Add Photo</span>
                          </button>
                          <button
                            type="button"
                            className={styles.addItemBtn}
                            onClick={() => handleAddMedia('video')}
                          >
                            <RiPlayCircleLine size={16} />
                            <span>Add YouTube Video</span>
                          </button>
                        </div>
                      </div>

                      <div className={styles.fieldsGrid2}>
                        {(draftData.media || []).map((item, idx) => (
                          <div key={item.id || idx} className={styles.adminCard}>
                            <div className={styles.itemCardHeader}>
                              <span className={styles.itemCardTitle}>
                                {item.type === 'video' ? '🎬 Video Embed' : '📷 Site Photo'}
                              </span>
                              <button
                                type="button"
                                className={styles.deleteItemBtn}
                                onClick={() => handleDeleteMedia(idx)}
                              >
                                <RiDeleteBinLine size={14} />
                                Delete
                              </button>
                            </div>

                            {/* Live Media Preview Box */}
                            <div className={styles.mediaPreviewBox}>
                              {item.type === 'video' ? (
                                <iframe
                                  src={item.url}
                                  title={item.title}
                                  width="100%"
                                  height="100%"
                                  frameBorder="0"
                                  allowFullScreen
                                />
                              ) : (
                                <img
                                  src={item.url}
                                  alt={item.title}
                                  className={styles.mediaPreviewImg}
                                />
                              )}
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Title</label>
                              <input
                                type="text"
                                className={styles.formInput}
                                value={item.title}
                                onChange={(e) => handleMediaChange(idx, 'title', e.target.value)}
                              />
                            </div>

                            {item.type === 'photo' ? (
                              <div className={styles.uploadSection}>
                                <label className={styles.formLabel} style={{ marginBottom: 4 }}>
                                  Upload Photo from Device or Paste URL
                                </label>
                                <div className={styles.uploadRow}>
                                  <label className={styles.fileUploadBtn}>
                                    <RiImageAddLine size={15} />
                                    <span>Pick Image File</span>
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className={styles.fileInputHidden}
                                      onChange={(e) => handleMediaPhotoUpload(e, idx)}
                                    />
                                  </label>
                                  <input
                                    type="text"
                                    className={styles.formInput}
                                    style={{ flex: 1, minWidth: 160 }}
                                    placeholder="Image URL"
                                    value={item.url}
                                    onChange={(e) => handleMediaChange(idx, 'url', e.target.value)}
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>YouTube Embed Link</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  placeholder="https://www.youtube.com/embed/VIDEO_ID"
                                  value={item.url}
                                  onChange={(e) => handleMediaChange(idx, 'url', e.target.value)}
                                />
                              </div>
                            )}

                            <div className={styles.formGroup} style={{ marginTop: 8 }}>
                              <label className={styles.formLabel}>Caption / Description</label>
                              <textarea
                                rows={2}
                                className={styles.formTextarea}
                                value={item.caption}
                                onChange={(e) => handleMediaChange(idx, 'caption', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 12: Testimonials */}
                  {activeTab === 'testimonials' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Client Reviews &amp; Testimonials</h4>
                          <p className={styles.sectionSubtitle}>
                            Manage verified customer ratings and real feedback from Mirzapur homeowners and businesses.
                          </p>
                        </div>
                        <button type="button" className={styles.addItemBtn} onClick={handleAddTestimonial}>
                          <RiAddLine size={16} />
                          <span>Add Review</span>
                        </button>
                      </div>

                      <div className={styles.fieldsGrid2}>
                        {draftData.testimonials?.map((t, idx) => (
                          <div key={idx} className={styles.adminCard}>
                            <div className={styles.itemCardHeader}>
                              <span className={styles.itemCardTitle}>{t.name}</span>
                              <button
                                type="button"
                                className={styles.deleteItemBtn}
                                onClick={() => handleDeleteTestimonial(idx)}
                              >
                                <RiDeleteBinLine size={14} />
                                Delete
                              </button>
                            </div>

                            <div className={styles.fieldsGrid2}>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Client Name</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={t.name}
                                  onChange={(e) => handleTestimonialChange(idx, 'name', e.target.value)}
                                />
                              </div>

                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Location</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={t.location}
                                  onChange={(e) => handleTestimonialChange(idx, 'location', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className={styles.fieldsGrid2}>
                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>System Installed</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={t.system}
                                  onChange={(e) => handleTestimonialChange(idx, 'system', e.target.value)}
                                />
                              </div>

                              <div className={styles.formGroup}>
                                <label className={styles.formLabel}>Avatar Initials</label>
                                <input
                                  type="text"
                                  className={styles.formInput}
                                  value={t.initials}
                                  onChange={(e) => handleTestimonialChange(idx, 'initials', e.target.value)}
                                />
                              </div>
                            </div>

                            <div className={styles.formGroup}>
                              <label className={styles.formLabel}>Client Quote</label>
                              <textarea
                                rows={3}
                                className={styles.formTextarea}
                                value={t.quote}
                                onChange={(e) => handleTestimonialChange(idx, 'quote', e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB: Footer & Legal Information */}
                  {activeTab === 'footer' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Footer Content &amp; Regulatory Disclaimers</h4>
                          <p className={styles.sectionSubtitle}>
                            Customize company mission tagline, authorized partner badge, copyright notice, and legal terms.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Footer Brand Name</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={draftData.footer?.brandName || draftData.header?.brandName || ''}
                            onChange={(e) => updateDraft('footer', 'brandName', e.target.value)}
                          />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Company Mission Tagline</label>
                          <textarea
                            rows={3}
                            className={styles.formTextarea}
                            value={draftData.footer?.tagline || ''}
                            onChange={(e) => updateDraft('footer', 'tagline', e.target.value)}
                          />
                        </div>

                        <div className={styles.fieldsGrid2}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Authorized Partner Trust Badge Text</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.footer?.partnerBadge || ''}
                              onChange={(e) => updateDraft('footer', 'partnerBadge', e.target.value)}
                            />
                          </div>

                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>Copyright Notice Statement</label>
                            <input
                              type="text"
                              className={styles.formInput}
                              value={draftData.footer?.copyrightNotice || ''}
                              onChange={(e) => updateDraft('footer', 'copyrightNotice', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Regulatory Subsidy / Terms Disclaimer</label>
                          <textarea
                            rows={2}
                            className={styles.formTextarea}
                            value={draftData.footer?.disclaimer || ''}
                            onChange={(e) => updateDraft('footer', 'disclaimer', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB: Floating WhatsApp Assistant */}
                  {activeTab === 'whatsapp' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Floating WhatsApp Assistant</h4>
                          <p className={styles.sectionSubtitle}>
                            Configure the floating quick-contact bubble tooltip and default customer consultation message.
                          </p>
                        </div>
                      </div>

                      <div className={styles.adminCard}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Floating Button Tooltip Bubble</label>
                          <input
                            type="text"
                            className={styles.formInput}
                            value={draftData.whatsapp?.tooltip || ''}
                            onChange={(e) => updateDraft('whatsapp', 'tooltip', e.target.value)}
                          />
                          <span className={styles.uploadHelperText}>
                            Appears next to the green glowing button on the bottom-right corner of the website.
                          </span>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Default Prefilled Customer Message</label>
                          <textarea
                            rows={3}
                            className={styles.formTextarea}
                            value={draftData.whatsapp?.prefilledMessage || ''}
                            onChange={(e) => updateDraft('whatsapp', 'prefilledMessage', e.target.value)}
                          />
                          <span className={styles.uploadHelperText}>
                            When visitors tap the floating WhatsApp button, their WhatsApp opens with this message ready to send to your sales team.
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 13: Backup & Security Settings */}
                  {activeTab === 'settings' && (
                    <div>
                      <div className={styles.sectionHeaderRow}>
                        <div>
                          <h4 className={styles.sectionTitle}>Security &amp; Full Website Data Backup</h4>
                          <p className={styles.sectionSubtitle}>
                            Update admin authentication passcode, download JSON snapshot backups, or restore data.
                          </p>
                        </div>
                      </div>

                      {/* Passcode Update Card */}
                      <div className={styles.adminCard} style={{ marginBottom: 20 }}>
                        <h5 style={{ margin: '0 0 12px', fontWeight: 700, color: 'var(--dark)' }}>
                          Change Admin Passcode
                        </h5>
                        <form onSubmit={handleChangePasscode} style={{ maxWidth: 400 }}>
                          <div className={styles.formGroup}>
                            <label className={styles.formLabel}>New Passcode (min. 4 characters)</label>
                            <input
                              type="password"
                              className={styles.formInput}
                              placeholder="e.g. 9670"
                              value={newPasscodeField}
                              onChange={(e) => setNewPasscodeField(e.target.value)}
                            />
                          </div>
                          {passcodeSuccessMsg && (
                            <div style={{ color: '#059669', fontSize: '0.84rem', marginBottom: 10 }}>
                              {passcodeSuccessMsg}
                            </div>
                          )}
                          <button
                            type="submit"
                            className={styles.saveChangesBtn}
                            style={{ padding: '8px 18px' }}
                          >
                            Update Passcode
                          </button>
                        </form>
                      </div>

                      {/* Full Offline JSON Backup & Restore Card */}
                      <div className={styles.adminCard}>
                        <h5 style={{ margin: '0 0 12px', fontWeight: 700, color: 'var(--dark)' }}>
                          Website Data Portability &amp; Snapshots
                        </h5>
                        <p style={{ fontSize: '0.84rem', color: '#64748B', lineHeight: 1.5, marginBottom: 16 }}>
                          Export all website content, media links, subsidy tiers, and customer leads to an offline JSON file.
                          You can keep this as a safe backup or import it onto another computer or phone at any time.
                        </p>

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          <button
                            type="button"
                            className={styles.addItemBtn}
                            onClick={handleExportBackup}
                            style={{ margin: 0 }}
                          >
                            <RiFileDownloadLine size={16} />
                            <span>Download Full JSON Backup</span>
                          </button>

                          <label className={styles.addItemBtn} style={{ margin: 0 }}>
                            <RiFileUploadLine size={16} />
                            <span>Restore from JSON File</span>
                            <input
                              type="file"
                              accept=".json"
                              style={{ display: 'none' }}
                              onChange={handleImportBackup}
                            />
                          </label>

                          <button
                            type="button"
                            className={styles.deleteItemBtn}
                            style={{ padding: '8px 16px', fontSize: '0.84rem', borderRadius: 8 }}
                            onClick={() => {
                              if (
                                window.confirm(
                                  'Are you sure you want to reset all content back to factory defaults? Any unsaved edits will be lost.'
                                )
                              ) {
                                resetToDefaults();
                                alert('Website has been restored to factory defaults.');
                                setIsAdminOpen(false);
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

                  {/* Sticky Bottom Save Action Bar */}
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
      </AnimatePresence>
    </>
  );
}
