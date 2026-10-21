'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiMapPin2Line,
  RiFlashlightLine,
  RiCheckLine,
  RiWhatsappLine,
  RiArrowRightUpLine,
  RiCloseLine,
  RiShieldCheckLine,
  RiBuildingLine,
  RiSunLine,
  RiBattery2ChargeLine,
  RiEyeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiPrinterLine,
  RiLeafLine,
  RiTimeLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Projects.module.css';

export default function Projects() {
  const { siteData } = useSiteData();
  const projectsData = siteData?.projects || [];
  const cleanPhone = (siteData?.header?.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activePhotoTab, setActivePhotoTab] = useState('array'); // 'array', 'inverter', 'meter', 'video'

  const categories = ['All', 'On-Grid Solar', 'Commercial Solar', 'EPC & Commissioning'];

  const defaultFallbackProjects = [
    {
      id: 1,
      title: '100 kW Industrial Rooftop Solar Plant',
      category: 'Commercial Solar',
      location: 'Industrial Area, Mirzapur',
      capacity: '100 kW',
      modules: 'Waree Mono PERC 545W (184 Modules)',
      inverter: 'Ksolare 100kW Quad-MPPT Grid-Tied Inverter',
      structure: 'HDG 80-Micron Elevated Aluminum Railing',
      tilt: '24° South-Facing Optimized Azimuth',
      generation: '1,46,000 kWh / Year',
      dailyUnits: '400 Units / Day Avg.',
      commissioned: 'January 2026',
      savings: '₹14.2 Lakh / Year',
      co2: '118 Tonnes CO2 Offset / Year',
      trees: '5,900 Mature Trees Equivalent',
      status: 'Completed & Net-Metered',
      discom: 'UPPCL 11kV Dedicated Industrial Feeder',
      sanctionNo: 'UPPCL-MZP-IND-2025-8842',
    },
    {
      id: 2,
      title: '15 kW Cold Storage Grid-Tied System',
      category: 'On-Grid Solar',
      location: 'Robertsganj Highway, Mirzapur',
      capacity: '15 kW',
      modules: 'Adani Solar 550W Bifacial (28 Modules)',
      inverter: 'Growatt 15kW Cloud-Connected Inverter',
      structure: 'South-facing 22° Fixed Slant Ground Mount',
      tilt: '22° South with Zero Shadow Angle',
      generation: '21,900 kWh / Year',
      dailyUnits: '60 Units / Day Avg.',
      commissioned: 'February 2026',
      savings: '₹2.4 Lakh / Year',
      co2: '18 Tonnes CO2 Offset / Year',
      trees: '900 Mature Trees Equivalent',
      status: 'Completed & Net-Metered',
      discom: 'UPPCL LT Commercial Metering',
      sanctionNo: 'UPPCL-MZP-COM-2026-1109',
    },
    {
      id: 3,
      title: '250 kW Turnkey Institutional Solar Plant',
      category: 'EPC & Commissioning',
      location: 'Engineering College Campus, Mirzapur',
      capacity: '250 kW',
      modules: 'Emvee Tier-1 TopCon Modules (460 Modules)',
      inverter: 'Dual 125kW Central Inverters + SCADA System',
      structure: 'Waterproof RCC Roof Non-Penetrative Ballast',
      tilt: '15° Dual-Pitch Aerodynamic Racking',
      generation: '3,65,000 kWh / Year',
      dailyUnits: '1,000 Units / Day Avg.',
      commissioned: 'December 2025',
      savings: '₹32.5 Lakh / Year',
      co2: '290 Tonnes CO2 Offset / Year',
      trees: '14,500 Mature Trees Equivalent',
      status: 'Completed & Net-Metered',
      discom: 'UPPCL 33kV Substation Interconnected',
      sanctionNo: 'UPPCL-MZP-INS-2025-0431',
    },
    {
      id: 4,
      title: '5 kW Premium Residential Rooftop Solar',
      category: 'On-Grid Solar',
      location: 'Vindhyachal Dham, Mirzapur',
      capacity: '5 kW',
      modules: 'Waree 545W Monocrystalline (9 Modules)',
      inverter: 'Luminous Solar Hybrid Grid Inverter 5kVA',
      structure: 'Elevated Gazebo Pergola (Walkable Rooftop)',
      tilt: '24° High-Rise Elevated Stand (8 ft Clearance)',
      generation: '7,300 kWh / Year',
      dailyUnits: '20 Units / Day Avg.',
      commissioned: 'March 2026',
      savings: '₹68,000 / Year',
      co2: '6 Tonnes CO2 Offset / Year',
      trees: '300 Mature Trees Equivalent',
      status: 'Completed & Subsidy Disbursed',
      discom: 'PM Surya Ghar ₹78,000 DBT Credited',
      sanctionNo: 'PMSURYAGHAR-UP-MZP-9921',
    },
    {
      id: 5,
      title: '50 kW Multi-Speciality Hospital Solar EPC',
      category: 'Commercial Solar',
      location: 'Civil Lines, Mirzapur',
      capacity: '50 kW',
      modules: 'Adani Solar High-Efficiency (92 Modules)',
      inverter: 'Ksolare 50kW Dual Inverter Array',
      structure: 'Wind-resistant 150 km/h Certified Stanchions',
      tilt: '20° Elevated Rooftop Mount',
      generation: '73,000 kWh / Year',
      dailyUnits: '200 Units / Day Avg.',
      commissioned: 'November 2025',
      savings: '₹7.5 Lakh / Year',
      co2: '60 Tonnes CO2 Offset / Year',
      trees: '3,000 Mature Trees Equivalent',
      status: 'Completed & Net-Metered',
      discom: 'Hospital Emergency Grid Priority Loop',
      sanctionNo: 'UPPCL-MZP-MED-2025-5510',
    },
    {
      id: 6,
      title: '35 kW Ground-Mount & Net-Meter Commissioning',
      category: 'EPC & Commissioning',
      location: 'Chunar Industrial Corridor',
      capacity: '35 kW',
      modules: 'Aurawatt High-Yield Solar Array (64 Modules)',
      inverter: 'Sungrow Commercial String Inverter',
      structure: 'Driven Pile Hot-Dip Galvanized Frames',
      tilt: '25° Optimal Annual Solar Irradiance',
      generation: '51,100 kWh / Year',
      dailyUnits: '140 Units / Day Avg.',
      commissioned: 'February 2026',
      savings: '₹4.8 Lakh / Year',
      co2: '41 Tonnes CO2 Offset / Year',
      trees: '2,050 Mature Trees Equivalent',
      status: 'Completed & Net-Metered',
      discom: 'UPPCL Bi-Directional TOD Electronic Meter',
      sanctionNo: 'UPPCL-MZP-IND-2026-3390',
    },
  ];

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  const openQuickView = (project) => {
    setActiveModalProject(project);
    setActivePhotoTab('array');
  };

  const closeQuickView = () => {
    setActiveModalProject(null);
  };

  const handleNextProject = useCallback(() => {
    if (!activeModalProject) return;
    const currentIndex = projectsData.findIndex((p) => p.id === activeModalProject.id);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setActiveModalProject(projectsData[nextIndex]);
  }, [activeModalProject, projectsData]);

  const handlePrevProject = useCallback(() => {
    if (!activeModalProject) return;
    const currentIndex = projectsData.findIndex((p) => p.id === activeModalProject.id);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setActiveModalProject(projectsData[prevIndex]);
  }, [activeModalProject, projectsData]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModalProject) return;
      if (e.key === 'Escape') closeQuickView();
      if (e.key === 'ArrowRight') handleNextProject();
      if (e.key === 'ArrowLeft') handlePrevProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalProject, handleNextProject, handlePrevProject]);

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.kicker}>Proven Engineering Track Record</span>
          <h2 className={styles.title}>Our Commissioned Installations</h2>
          <p className={styles.subtitle}>
            Explore our verified on-grid, commercial, and turnkey EPC solar plants generating clean electricity across Mirzapur and Eastern Uttar Pradesh.
          </p>
        </motion.div>

        {/* Dynamic Category Filtering Buttons */}
        <div className={styles.filterBar} role="tablist" aria-label="Filter Projects by Service">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`${styles.filterBtn} ${selectedCategory === category ? styles.activeFilterBtn : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Responsive Grid with Framer Motion Layout Animation */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={styles.card}
              >
                {/* Colored Header Bar (Orange Gradient) */}
                <div className={styles.cardHeaderBar} />

                {/* Visual Graphic Area */}
                <div className={styles.cardVisual}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                  ) : (
                    <svg
                      className={styles.svgPanelVisual}
                      viewBox="0 0 400 200"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect width="400" height="200" fill="#070F1E" />
                      {/* Isometric Solar Arrays */}
                      <g opacity="0.65">
                        <polygon points="40,165 120,65 200,65 120,165" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
                        <line x1="80" y1="115" x2="160" y2="115" stroke="#60A5FA" strokeWidth="1" />
                        <polygon points="150,165 230,65 310,65 230,165" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
                        <line x1="190" y1="115" x2="270" y2="115" stroke="#60A5FA" strokeWidth="1" />
                        <polygon points="260,165 340,65 420,65 340,165" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
                      </g>
                      {/* Sun aura */}
                      <circle cx="340" cy="40" r="32" fill="#FFD100" opacity="0.3" filter="blur(10px)" />
                      <circle cx="340" cy="40" r="14" fill="#FFD100" opacity="0.9" />
                    </svg>
                  )}

                  {/* Status Badge */}
                  <span className={styles.badgeCompleted}>
                    <RiCheckLine size={13} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />
                    {project.status.split('&')[0]}
                  </span>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <div className={styles.categoryTag}>{project.category}</div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>

                  <div className={styles.specsList}>
                    <div className={styles.specRow}>
                      <span className={styles.specName}>Hardware:</span>
                      <span className={styles.specVal}>{project.modules.split('(')[0]}</span>
                    </div>
                    <div className={styles.specRow}>
                      <span className={styles.specName}>Est. Savings:</span>
                      <span className={styles.specVal} style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        {project.savings}
                      </span>
                    </div>
                  </div>

                  <div className={styles.metaRow}>
                    <div className={styles.metaItem}>
                      <RiMapPin2Line size={16} />
                      <span>{project.location}</span>
                    </div>
                    <div className={styles.capacityHighlight}>{project.capacity}</div>
                  </div>

                  {/* Explicit Quick View Row (works reliably on both Desktop & Mobile touch) */}
                  <div className={styles.cardActionsRow}>
                    <button
                      type="button"
                      className={styles.quickViewBtn}
                      onClick={() => openQuickView(project)}
                      aria-label={`Open Quick View modal for ${project.title}`}
                    >
                      <RiEyeLine size={16} />
                      <span>Quick View</span>
                    </button>

                    <button
                      type="button"
                      className={styles.cardDetailsLink}
                      onClick={() => openQuickView(project)}
                    >
                      <span>Specs &amp; Photos →</span>
                    </button>
                  </div>
                </div>

                {/* Hover Full Orange Overlay */}
                <div className={styles.hoverOverlay}>
                  <div className={styles.hoverText}>
                    <span>Inspect Installation</span>
                    <RiArrowRightUpLine size={22} />
                  </div>
                  <p className={styles.hoverSubtext}>
                    {project.modules} • {project.generation}
                  </p>
                  <button
                    type="button"
                    className={styles.hoverActionBtn}
                    onClick={() => openQuickView(project)}
                  >
                    <RiEyeLine size={18} />
                    <span>Open Quick-View Modal</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick-View Modal with Enlarged Photos & Installation Details */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className={styles.modalBackdrop}
            onClick={closeQuickView}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quick-view-title"
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Modal Top Header Bar with Navigation Controls */}
              <div className={styles.modalHeaderBar}>
                <div className={styles.modalHeaderLeft}>
                  <span className={styles.modalCategory}>
                    {activeModalProject.category} • Certified Turnkey EPC
                  </span>
                  <h3 id="quick-view-title" className={styles.modalTitle}>
                    {activeModalProject.title}
                  </h3>
                </div>

                <div className={styles.modalHeaderActions}>
                  {/* Prev / Next Project Arrows */}
                  <div className={styles.navArrows} aria-label="Navigate Projects">
                    <button
                      type="button"
                      className={styles.navArrowBtn}
                      onClick={handlePrevProject}
                      title="Previous Project (Left Arrow)"
                      aria-label="Previous Project"
                    >
                      <RiArrowLeftSLine size={20} />
                    </button>
                    <button
                      type="button"
                      className={styles.navArrowBtn}
                      onClick={handleNextProject}
                      title="Next Project (Right Arrow)"
                      aria-label="Next Project"
                    >
                      <RiArrowRightSLine size={20} />
                    </button>
                  </div>

                  {/* Close Modal Button */}
                  <button
                    type="button"
                    className={styles.modalCloseBtn}
                    onClick={closeQuickView}
                    title="Close (Esc)"
                    aria-label="Close Project Modal"
                  >
                    <RiCloseLine size={20} />
                  </button>
                </div>
              </div>

              {/* Photo Gallery & View Angle Tabs */}
              <div className={styles.photoGalleryContainer}>
                <div className={styles.photoViewTabs}>
                  <button
                    type="button"
                    className={`${styles.photoTab} ${activePhotoTab === 'array' ? styles.photoTabActive : ''}`}
                    onClick={() => setActivePhotoTab('array')}
                  >
                    ☀️ 1. Rooftop Array View
                  </button>
                  <button
                    type="button"
                    className={`${styles.photoTab} ${activePhotoTab === 'inverter' ? styles.photoTabActive : ''}`}
                    onClick={() => setActivePhotoTab('inverter')}
                  >
                    ⚡ 2. Inverter &amp; SCADA
                  </button>
                  <button
                    type="button"
                    className={`${styles.photoTab} ${activePhotoTab === 'meter' ? styles.photoTabActive : ''}`}
                    onClick={() => setActivePhotoTab('meter')}
                  >
                    📊 3. Bi-Directional Net-Meter
                  </button>
                  {activeModalProject.videoUrl && (
                    <button
                      type="button"
                      className={`${styles.photoTab} ${activePhotoTab === 'video' ? styles.photoTabActive : ''}`}
                      onClick={() => setActivePhotoTab('video')}
                    >
                      🎬 4. Video Walkthrough
                    </button>
                  )}
                </div>

                {/* Enlarged Photo / Engineering Illustration Frame */}
                <div className={styles.enlargedPhotoFrame}>
                  {activePhotoTab === 'video' && activeModalProject.videoUrl && (
                    <iframe
                      src={activeModalProject.videoUrl}
                      title={activeModalProject.title}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ border: 'none', width: '100%', height: '100%' }}
                    />
                  )}

                  {activePhotoTab === 'array' && activeModalProject.imageUrl ? (
                    <img
                      src={activeModalProject.imageUrl}
                      alt={activeModalProject.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : activePhotoTab === 'array' && (
                    <svg
                      className={styles.enlargedSvg}
                      viewBox="0 0 800 320"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="skyGradModal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0B1A30" />
                          <stop offset="100%" stopColor="#1E3A5F" />
                        </linearGradient>
                        <linearGradient id="panelModGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#1D4ED8" />
                          <stop offset="50%" stopColor="#1E40AF" />
                          <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>
                      </defs>
                      <rect width="800" height="320" fill="url(#skyGradModal)" />
                      {/* Sun glow in sky */}
                      <circle cx="700" cy="50" r="60" fill="#FFD100" opacity="0.25" filter="blur(20px)" />
                      <circle cx="700" cy="50" r="28" fill="#FFD100" />
                      {/* Rooftop Boundary & Parapet */}
                      <polygon points="50,280 180,140 680,140 750,280" fill="#1E293B" />
                      <polygon points="60,275 185,145 675,145 740,275" fill="#334155" />
                      {/* Multiple Rows of Photovoltaic Panels */}
                      {/* Row 1 */}
                      <g transform="translate(100, 205)">
                        <polygon points="0,55 35,0 120,0 85,55" fill="url(#panelModGrad)" stroke="#60A5FA" strokeWidth="1.5" />
                        <polygon points="100,55 135,0 220,0 185,55" fill="url(#panelModGrad)" stroke="#60A5FA" strokeWidth="1.5" />
                        <polygon points="200,55 235,0 320,0 285,55" fill="url(#panelModGrad)" stroke="#60A5FA" strokeWidth="1.5" />
                        <polygon points="300,55 335,0 420,0 385,55" fill="url(#panelModGrad)" stroke="#60A5FA" strokeWidth="1.5" />
                        <polygon points="400,55 435,0 520,0 485,55" fill="url(#panelModGrad)" stroke="#60A5FA" strokeWidth="1.5" />
                      </g>
                      {/* Row 2 */}
                      <g transform="translate(140, 150)">
                        <polygon points="0,45 30,0 100,0 70,45" fill="url(#panelModGrad)" stroke="#93C5FD" strokeWidth="1.2" />
                        <polygon points="85,45 115,0 185,0 155,45" fill="url(#panelModGrad)" stroke="#93C5FD" strokeWidth="1.2" />
                        <polygon points="170,45 200,0 270,0 240,45" fill="url(#panelModGrad)" stroke="#93C5FD" strokeWidth="1.2" />
                        <polygon points="255,45 285,0 355,0 325,45" fill="url(#panelModGrad)" stroke="#93C5FD" strokeWidth="1.2" />
                        <polygon points="340,45 370,0 440,0 410,45" fill="url(#panelModGrad)" stroke="#93C5FD" strokeWidth="1.2" />
                      </g>
                      {/* Sun ray reflections */}
                      <line x1="700" y1="50" x2="350" y2="210" stroke="#FFD100" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                      <line x1="700" y1="50" x2="520" y2="230" stroke="#FFD100" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                    </svg>
                  )}

                  {activePhotoTab === 'inverter' && (
                    <svg
                      className={styles.enlargedSvg}
                      viewBox="0 0 800 320"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="800" height="320" fill="#0A1628" />
                      {/* Wall mounting plate */}
                      <rect x="250" y="40" width="300" height="240" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                      {/* Inverter Main Chasis */}
                      <rect x="270" y="55" width="260" height="210" rx="8" fill="#0F172A" stroke="#FF6B00" strokeWidth="2" />
                      {/* Large Digital Telemetry Display */}
                      <rect x="300" y="75" width="200" height="70" rx="6" fill="#022C22" stroke="#059669" strokeWidth="1.5" />
                      <text x="320" y="105" fill="#34D399" fontSize="14" fontFamily="monospace" fontWeight="bold">
                        P_AC: {activeModalProject.capacity} PEAK
                      </text>
                      <text x="320" y="130" fill="#A7F3D0" fontSize="12" fontFamily="monospace">
                        E_TODAY: {activeModalProject.dailyUnits} | 50.02 Hz
                      </text>
                      {/* Status indicator lights */}
                      <circle cx="320" cy="170" r="6" fill="#22C55E" />
                      <text x="335" y="174" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">MPPT ACTIVE</text>
                      <circle cx="430" cy="170" r="6" fill="#3B82F6" />
                      <text x="445" y="174" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">CLOUD SCADA</text>
                      {/* Conduit pipes */}
                      <path d="M330 265 L330 310" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />
                      <path d="M470 265 L470 310" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
                    </svg>
                  )}

                  {activePhotoTab === 'meter' && (
                    <svg
                      className={styles.enlargedSvg}
                      viewBox="0 0 800 320"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="800" height="320" fill="#061224" />
                      {/* UPPCL Net Meter Enclosure Box */}
                      <rect x="220" y="30" width="360" height="260" rx="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="3" />
                      {/* Glass Window */}
                      <rect x="250" y="55" width="300" height="130" rx="8" fill="#0F172A" />
                      <rect x="270" y="70" width="260" height="75" rx="4" fill="#064E3B" />
                      <text x="285" y="105" fill="#34D399" fontSize="18" fontFamily="monospace" fontWeight="bold">
                        NET: -{activeModalProject.generation.split(' ')[0]} kWh
                      </text>
                      <text x="285" y="130" fill="#6EE7B7" fontSize="12" fontFamily="monospace">
                        EXPORT ACTIVE • UPPCL DISCOM
                      </text>
                      {/* Anti-tamper Hologram Seal */}
                      <rect x="260" y="210" width="120" height="30" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
                      <text x="270" y="228" fill="#713F12" fontSize="9" fontWeight="bold">UPPCL SEAL VERIFIED</text>
                      <circle cx="500" cy="225" r="8" fill="#22C55E" />
                      <text x="515" y="229" fill="#0F172A" fontSize="11" fontWeight="bold">SYNCHRONIZED</text>
                    </svg>
                  )}

                  {/* Photo Info Badge */}
                  <div className={styles.photoBadgeOverlay}>
                    <span className={styles.badgeLivePulse} />
                    <span>
                      {activePhotoTab === 'array'
                        ? `Installed Array • ${activeModalProject.tilt}`
                        : activePhotoTab === 'inverter'
                        ? `${activeModalProject.inverter}`
                        : `UPPCL Sanction No: ${activeModalProject.sanctionNo}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Details Scroll Body */}
              <div className={styles.modalBodyScroll}>
                {/* Location & Status Notice */}
                <div className={styles.metaInfoBar}>
                  <div className={styles.metaInfoLeft}>
                    <RiMapPin2Line size={18} />
                    <span>{activeModalProject.location}</span>
                  </div>
                  <div className={styles.metaInfoRight}>
                    <span className={styles.statusIndicator}>
                      <RiShieldCheckLine size={16} />
                      {activeModalProject.status}
                    </span>
                    <span style={{ color: '#94A3B8' }}>•</span>
                    <span style={{ color: '#475569', fontSize: '0.84rem' }}>
                      <RiTimeLine size={14} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                      Commissioned: {activeModalProject.commissioned}
                    </span>
                  </div>
                </div>

                {/* Technical Specifications 6-Box Grid */}
                <div className={styles.modalSectionTitle}>
                  <RiFlashlightLine size={18} style={{ color: 'var(--primary)' }} />
                  <span>Engineering &amp; Equipment Specifications</span>
                </div>

                <div className={styles.modalGrid}>
                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>Plant Capacity</span>
                    <span className={styles.modalBoxVal}>{activeModalProject.capacity}</span>
                  </div>

                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>PV Modules</span>
                    <span className={styles.modalBoxVal}>{activeModalProject.modules}</span>
                  </div>

                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>Inverter Architecture</span>
                    <span className={styles.modalBoxVal}>{activeModalProject.inverter}</span>
                  </div>

                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>Mounting &amp; Azimuth</span>
                    <span className={styles.modalBoxVal}>{activeModalProject.structure}</span>
                  </div>

                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>Estimated Annual Yield</span>
                    <span className={styles.modalBoxVal}>{activeModalProject.generation}</span>
                  </div>

                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>DISCOM Interconnection</span>
                    <span className={styles.modalBoxVal}>{activeModalProject.discom}</span>
                  </div>
                </div>

                {/* Savings & ESG Callout */}
                <div className={styles.savingsCallout}>
                  <div className={styles.savingsLeft}>
                    <span className={styles.savingsLabel}>Annual Power Bill Reduction</span>
                    <span className={styles.savingsAmount}>{activeModalProject.savings}</span>
                  </div>
                  <div className={styles.savingsRight}>
                    <span className={styles.co2Val}>
                      <RiLeafLine size={16} style={{ verticalAlign: '-2px', marginRight: 4 }} />
                      {activeModalProject.co2}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#166534' }}>
                      🌱 {activeModalProject.trees}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.modalFooterActions}>
                  <a
                    href={`https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(
                      siteData?.header?.brandName || 'Maa Vindhyavasini Enterprises'
                    )},%20I%20am%20reviewing%20your%20project:%20${encodeURIComponent(
                      activeModalProject.title
                    )}%20(${activeModalProject.capacity})%20in%20${encodeURIComponent(
                      activeModalProject.location
                    )}.%20Please%20share%20a%20detailed%20feasibility%20report%20for%20my%20property.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inquireBtn}
                  >
                    <RiWhatsappLine size={20} />
                    <span>Inquire About Similar Installation via WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => window.print()}
                    title="Print or Save PDF"
                  >
                    <RiPrinterLine size={18} />
                    <span>Print Data Sheet</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
