'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  RiEyeLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiPrinterLine,
  RiLeafLine,
  RiTimeLine,
  RiImageLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Projects.module.css';

export default function Projects() {
  const { siteData } = useSiteData();
  const rawProjects = siteData?.projects || [];
  const cleanPhone = (siteData?.header?.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [activePhotoTab, setActivePhotoTab] = useState('array'); // 'array', 'inverter', 'meter', or index 'photo-0', 'photo-1'

  const filterTabs = ['All', 'Residential', 'Commercial', 'EPC'];

  // Helper to normalize project type
  const getProjectType = useCallback((project) => {
    if (project?.type && ['Residential', 'Commercial', 'EPC'].includes(project.type)) {
      return project.type;
    }
    const raw = `${project?.category || ''} ${project?.title || ''}`.toLowerCase();
    if (raw.includes('res') || raw.includes('home') || raw.includes('pergola') || raw.includes('surya ghar')) {
      return 'Residential';
    }
    if (raw.includes('epc') || raw.includes('turnkey') || raw.includes('college') || raw.includes('mill')) {
      return 'EPC';
    }
    return 'Commercial';
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'All') return rawProjects;
    return rawProjects.filter(
      (p) => getProjectType(p).toLowerCase() === selectedFilter.toLowerCase()
    );
  }, [rawProjects, selectedFilter, getProjectType]);

  const openQuickView = (project) => {
    setActiveModalProject(project);
    setActivePhotoTab('array');
  };

  const closeQuickView = () => {
    setActiveModalProject(null);
  };

  const handleNextProject = useCallback(() => {
    if (!activeModalProject) return;
    const currentIndex = rawProjects.findIndex((p) => p.id === activeModalProject.id);
    const nextIndex = (currentIndex + 1) % rawProjects.length;
    setActiveModalProject(rawProjects[nextIndex]);
    setActivePhotoTab('array');
  }, [activeModalProject, rawProjects]);

  const handlePrevProject = useCallback(() => {
    if (!activeModalProject) return;
    const currentIndex = rawProjects.findIndex((p) => p.id === activeModalProject.id);
    const prevIndex = (currentIndex - 1 + rawProjects.length) % rawProjects.length;
    setActiveModalProject(rawProjects[prevIndex]);
    setActivePhotoTab('array');
  }, [activeModalProject, rawProjects]);

  // Keyboard navigation
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
            Explore our verified rooftop and ground-mounted solar plants across Residential, Commercial, and EPC sectors in Mirzapur and Eastern Uttar Pradesh.
          </p>
        </motion.div>

        {/* Filter Buttons: All, Residential, Commercial, EPC */}
        <div className={styles.filterBar} role="tablist" aria-label="Filter Projects by Type">
          {filterTabs.map((filter) => {
            const isActive = selectedFilter === filter;
            const count =
              filter === 'All'
                ? rawProjects.length
                : rawProjects.filter(
                    (p) => getProjectType(p).toLowerCase() === filter.toLowerCase()
                  ).length;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.filterBtn} ${isActive ? styles.activeFilterBtn : ''}`}
                onClick={() => setSelectedFilter(filter)}
              >
                <span>{filter}</span>
                <span className={styles.filterBadgeCount}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid with Framer Motion Layout Animation */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const projectType = getProjectType(project);
              const typeBadgeClass =
                projectType === 'Residential'
                  ? styles.typeBadgeResidential
                  : projectType === 'Commercial'
                  ? styles.typeBadgeCommercial
                  : styles.typeBadgeEPC;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.card}
                  onClick={() => openQuickView(project)}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${project.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openQuickView(project);
                    }
                  }}
                >
                  {/* Top Color Indicator */}
                  <div className={styles.cardHeaderBar} />

                  {/* Visual Graphic Area / Photo */}
                  <div className={styles.cardVisual}>
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className={styles.projectImage}
                        loading="lazy"
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
                        <g opacity="0.65">
                          <polygon points="40,165 120,65 200,65 120,165" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
                          <line x1="80" y1="115" x2="160" y2="115" stroke="#60A5FA" strokeWidth="1" />
                          <polygon points="150,165 230,65 310,65 230,165" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
                          <line x1="190" y1="115" x2="270" y2="115" stroke="#60A5FA" strokeWidth="1" />
                          <polygon points="260,165 340,65 420,65 340,165" fill="#1E3A8A" stroke="#3B82F6" strokeWidth="1.5" />
                        </g>
                        <circle cx="340" cy="40" r="32" fill="#FFD100" opacity="0.3" filter="blur(10px)" />
                        <circle cx="340" cy="40" r="14" fill="#FFD100" opacity="0.9" />
                      </svg>
                    )}

                    {/* Gradient Overlay for image contrast */}
                    <div className={styles.imageGradientOverlay} />

                    {/* Top Floating Badges: Type & Capacity */}
                    <div className={styles.cardTopPills}>
                      <span className={`${styles.typeBadge} ${typeBadgeClass}`}>
                        {projectType}
                      </span>
                      <span className={styles.capacityBadge}>
                        <RiFlashlightLine size={13} style={{ display: 'inline', marginRight: 3 }} />
                        {project.capacity}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <span className={styles.badgeCompleted}>
                      <RiCheckLine size={13} style={{ display: 'inline', marginRight: 3, verticalAlign: '-1px' }} />
                      {project.status?.split('&')[0] || 'Net-Metered'}
                    </span>
                  </div>

                  {/* Card Content Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>

                    {/* Location Row - Required */}
                    <div className={styles.locationRow}>
                      <RiMapPin2Line size={16} className={styles.locationIcon} />
                      <span className={styles.locationText}>{project.location}</span>
                    </div>

                    {/* Specs snippet */}
                    <div className={styles.specsList}>
                      <div className={styles.specRow}>
                        <span className={styles.specName}>Hardware:</span>
                        <span className={styles.specVal}>{project.modules?.split('(')[0]}</span>
                      </div>
                      <div className={styles.specRow}>
                        <span className={styles.specName}>Est. Savings:</span>
                        <span className={styles.specValHighlight}>{project.savings}</span>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className={styles.cardActionsRow}>
                      <div className={styles.quickViewBtn}>
                        <RiEyeLine size={16} />
                        <span>View Details &amp; Photos</span>
                      </div>
                      <span className={styles.arrowIconWrap}>
                        <RiArrowRightUpLine size={18} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Quick-View / Dedicated Detail Modal */}
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
              {/* Modal Top Header Bar */}
              <div className={styles.modalHeaderBar}>
                <div className={styles.modalHeaderLeft}>
                  <div className={styles.modalBadgesRow}>
                    <span className={styles.modalCategoryBadge}>
                      {getProjectType(activeModalProject)}
                    </span>
                    <span className={styles.modalCapacityHighlight}>
                      {activeModalProject.capacity} System
                    </span>
                  </div>
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

              {/* Photo Gallery & Switcher Tabs */}
              <div className={styles.photoGalleryContainer}>
                <div className={styles.photoViewTabs}>
                  <button
                    type="button"
                    className={`${styles.photoTab} ${activePhotoTab === 'array' ? styles.photoTabActive : ''}`}
                    onClick={() => setActivePhotoTab('array')}
                  >
                    <RiSunLine size={15} />
                    <span>1. Rooftop Array</span>
                  </button>
                  {activeModalProject.galleryImages && activeModalProject.galleryImages.length > 1 && (
                    <button
                      type="button"
                      className={`${styles.photoTab} ${activePhotoTab === 'gallery-1' ? styles.photoTabActive : ''}`}
                      onClick={() => setActivePhotoTab('gallery-1')}
                    >
                      <RiImageLine size={15} />
                      <span>2. Installation Angle</span>
                    </button>
                  )}
                  <button
                    type="button"
                    className={`${styles.photoTab} ${activePhotoTab === 'inverter' ? styles.photoTabActive : ''}`}
                    onClick={() => setActivePhotoTab('inverter')}
                  >
                    <RiFlashlightLine size={15} />
                    <span>Inverter &amp; SCADA</span>
                  </button>
                  <button
                    type="button"
                    className={`${styles.photoTab} ${activePhotoTab === 'meter' ? styles.photoTabActive : ''}`}
                    onClick={() => setActivePhotoTab('meter')}
                  >
                    <RiShieldCheckLine size={15} />
                    <span>Net-Meter Sync</span>
                  </button>
                </div>

                {/* Enlarged Photo / Engineering Illustration Frame */}
                <div className={styles.enlargedPhotoFrame}>
                  {activePhotoTab === 'array' && (
                    activeModalProject.imageUrl ? (
                      <img
                        src={activeModalProject.imageUrl}
                        alt={activeModalProject.title}
                        className={styles.modalMainImg}
                      />
                    ) : (
                      <div className={styles.modalSvgPlaceholder}>
                        <RiSunLine size={48} style={{ color: '#FF8A00', marginBottom: 12 }} />
                        <p>{activeModalProject.modules}</p>
                      </div>
                    )
                  )}

                  {activePhotoTab === 'gallery-1' && activeModalProject.galleryImages?.[1] && (
                    <img
                      src={activeModalProject.galleryImages[1]}
                      alt={`${activeModalProject.title} Angle`}
                      className={styles.modalMainImg}
                    />
                  )}

                  {activePhotoTab === 'inverter' && (
                    <svg
                      className={styles.enlargedSvg}
                      viewBox="0 0 800 320"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="800" height="320" fill="#0A1628" />
                      <rect x="250" y="40" width="300" height="240" rx="12" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                      <rect x="270" y="55" width="260" height="210" rx="8" fill="#0F172A" stroke="#FF6B00" strokeWidth="2" />
                      <rect x="300" y="75" width="200" height="70" rx="6" fill="#022C22" stroke="#059669" strokeWidth="1.5" />
                      <text x="320" y="105" fill="#34D399" fontSize="14" fontFamily="monospace" fontWeight="bold">
                        P_AC: {activeModalProject.capacity} PEAK
                      </text>
                      <text x="320" y="130" fill="#A7F3D0" fontSize="12" fontFamily="monospace">
                        E_TODAY: {activeModalProject.dailyUnits || '40 Units'} | 50.02 Hz
                      </text>
                      <circle cx="320" cy="170" r="6" fill="#22C55E" />
                      <text x="335" y="174" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">MPPT ACTIVE</text>
                      <circle cx="430" cy="170" r="6" fill="#3B82F6" />
                      <text x="445" y="174" fill="#E2E8F0" fontSize="11" fontFamily="sans-serif">CLOUD SCADA</text>
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
                      <rect x="220" y="30" width="360" height="260" rx="14" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="3" />
                      <rect x="250" y="55" width="300" height="130" rx="8" fill="#0F172A" />
                      <rect x="270" y="70" width="260" height="75" rx="4" fill="#064E3B" />
                      <text x="285" y="105" fill="#34D399" fontSize="18" fontFamily="monospace" fontWeight="bold">
                        NET: -{activeModalProject.generation?.split(' ')[0] || '14,600'} kWh
                      </text>
                      <text x="285" y="130" fill="#6EE7B7" fontSize="12" fontFamily="monospace">
                        EXPORT ACTIVE • UPPCL DISCOM
                      </text>
                      <rect x="260" y="210" width="130" height="30" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
                      <text x="270" y="228" fill="#713F12" fontSize="9" fontWeight="bold">UPPCL SEAL VERIFIED</text>
                      <circle cx="500" cy="225" r="8" fill="#22C55E" />
                      <text x="515" y="229" fill="#0F172A" fontSize="11" fontWeight="bold">SYNCHRONIZED</text>
                    </svg>
                  )}

                  {/* Photo Info Badge */}
                  <div className={styles.photoBadgeOverlay}>
                    <span className={styles.badgeLivePulse} />
                    <span>
                      {activePhotoTab === 'array' || activePhotoTab === 'gallery-1'
                        ? `Installed Array • ${activeModalProject.tilt || 'South Facing'}`
                        : activePhotoTab === 'inverter'
                        ? `${activeModalProject.inverter}`
                        : `UPPCL Sanction No: ${activeModalProject.sanctionNo || 'Verified'}`}
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

                {/* Project Description (if available) */}
                {activeModalProject.description && (
                  <div className={styles.projectDescBox}>
                    <p>{activeModalProject.description}</p>
                  </div>
                )}

                {/* Technical Specifications 6-Box Grid */}
                <div className={styles.modalSectionTitle}>
                  <RiFlashlightLine size={18} style={{ color: 'var(--primary)' }} />
                  <span>Engineering &amp; Equipment Specifications</span>
                </div>

                <div className={styles.modalGrid}>
                  <div className={styles.modalBox}>
                    <span className={styles.modalBoxLabel}>System Capacity &amp; Category</span>
                    <span className={styles.modalBoxVal}>
                      {activeModalProject.capacity} • {getProjectType(activeModalProject)}
                    </span>
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
