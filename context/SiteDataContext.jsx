'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'mve_solar_cms_data_v2';
const PASSCODE_KEY = 'mve_solar_admin_passcode_v1';
const DEFAULT_PASSCODE = '9670';

const initialDefaultData = {
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
  calculator: {
    unitRate: 7.5,
    solarUnitsPerKw: 115,
    defaultBill: 4500,
    roiYears: 3.2,
    warrantyYears: 25,
  },
  stats: [
    {
      label: 'Solar Installations',
      value: 500,
      suffix: '+',
      sublabel: 'Rooftops & Commercial Grid-tied',
    },
    {
      label: 'Clean Capacity Deployed',
      value: 10,
      suffix: '+ MW',
      sublabel: 'Generating over 14.5M units/year',
    },
    {
      label: 'Verified Clients',
      value: 200,
      suffix: '+',
      sublabel: 'Industrial, Institutional & Homes',
    },
    {
      label: 'Tier-1 Brand Partners',
      value: 15,
      suffix: '+',
      sublabel: 'Waree, Adani, Ksolare & Emvee',
    },
  ],
  impact: {
    regionBadge: 'Serving Mirzapur • Sonbhadra • Varanasi • Prayagraj',
    co2Offset: '14,200+ Tonnes',
    coalSaved: '6,100+ Tonnes',
    treesPlanted: '71,000+ Trees',
  },
  whyUs: {
    kicker: 'Why Choose Us',
    headline: "Mirzapur's Most Trusted Solar EPC Partner",
    leadText:
      "We don't just install solar panels; we engineer reliable, high-yield clean energy assets built to withstand regional weather conditions for decades.",
    usps: [
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
    ],
    processSteps: [
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
    ],
  },
  brands: [
    { name: 'Waree Energies', tag: 'Authorized Tier-1 Modules', color: '#E11D48' },
    { name: 'Adani Solar', tag: 'Monocrystalline Perc', color: '#0284C7' },
    { name: 'Ksolare', tag: 'Grid-Tie Inverters', color: '#D97706' },
    { name: 'Emvee Photovoltaics', tag: 'High-Efficiency Panels', color: '#16A34A' },
    { name: 'Aurawatt', tag: 'Solar EPC Engineering', color: '#EA580C' },
    { name: 'Polycab Solar', tag: 'DC Solar Cables & Protection', color: '#9333EA' },
    { name: 'Growatt', tag: 'Smart Cloud Inverters', color: '#059669' },
    { name: 'Luminous Solar', tag: 'Hybrid Systems & Storage', color: '#2563EB' },
  ],
  services: [
    {
      id: 'residential',
      title: 'Residential Rooftop Solar',
      desc: 'Customized on-grid rooftop solar systems for bungalows, villas, and independent homes. Drastically reduce your monthly DISCOM electricity bills with clean solar generation.',
      features: ['1 kW to 10 kW custom arrays', 'Subsidy disbursement assistance', 'Net metering meter integration'],
    },
    {
      id: 'commercial',
      title: 'Commercial & Industrial Solar',
      desc: 'High-yield photovoltaic installations for factories, hospitals, schools, cold storages, and commercial complexes looking for high ROI and lower OPEX.',
      features: ['15 kW to 500+ kW capacity', 'Accelerated depreciation benefits', 'Custom structural load engineering'],
    },
    {
      id: 'on-grid',
      title: 'On-Grid Solar Systems',
      desc: 'Seamless grid-tied systems that synchronize directly with UPPCL / DISCOM power. Export excess daytime power to the grid and earn electricity billing credits.',
      features: ['Bi-directional net metering', 'No battery replacement cost', 'Peak daytime solar utilization'],
    },
    {
      id: 'epc',
      title: 'EPC & Full Commissioning',
      desc: 'Complete turnkey Engineering, Procurement, and Construction. From shadow-analysis 3D site survey, DISCOM liaisoning, cable laying to official commissioning.',
      features: ['Certified electrical engineers', 'Tier-1 aluminum mounting structures', 'Official DISCOM net-meter inspection'],
    },
    {
      id: 'surya-ghar',
      title: 'PM Surya Ghar Yojana',
      desc: 'Official subsidy assistance for the Central Government’s PM Surya Ghar: Muft Bijli Yojana. Receive direct bank account transfers up to ₹78,000 subsidy on 3 kW systems.',
      features: ['Direct DBT subsidy to bank', 'Portal registration & paperwork', 'Fast-track approval support'],
    },
    {
      id: 'amc',
      title: 'AMC & Maintenance',
      desc: 'Comprehensive Annual Maintenance Contracts ensuring 99.5% uptime. Regular high-pressure panel washing, thermal scanning, and inverter firmware diagnostics.',
      features: ['Periodic IV curve health check', 'Emergency 24-hour breakdown visit', 'Dust & degradation prevention'],
    },
  ],
  suryaGhar: {
    badge: 'Govt. of India Initiative • National Solar Mission',
    headline: 'Get Up to ₹78,000 Government Subsidy',
    subheadline:
      'Under the PM Surya Ghar: Muft Bijli Yojana, eligible homeowners in Mirzapur can generate up to 300 units of free electricity every month. Let our authorized team handle your paperwork from application to money in your bank.',
    matrix: [
      { capacity: '1 kW System', area: '100 sq. ft.', units: '120 Units / Mo', savings: '₹900 / Mo', subsidy: '₹30,000' },
      { capacity: '2 kW System', area: '200 sq. ft.', units: '240 Units / Mo', savings: '₹1,800 / Mo', subsidy: '₹60,000' },
      { capacity: '3 kW System', area: '300 sq. ft.', units: '360 Units / Mo', savings: '₹2,800 / Mo', subsidy: '₹78,000', popular: true },
      { capacity: '5 kW System', area: '500 sq. ft.', units: '600 Units / Mo', savings: '₹4,800 / Mo', subsidy: '₹78,000' },
      { capacity: '10 kW System', area: '1,000 sq. ft.', units: '1,200 Units / Mo', savings: '₹9,600 / Mo', subsidy: '₹78,000 (Max Residential)' },
    ],
  },
  projects: [
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
      videoUrl: '',
      imageUrl: '',
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
      videoUrl: '',
      imageUrl: '',
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
      videoUrl: '',
      imageUrl: '',
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
      videoUrl: '',
      imageUrl: '',
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
      videoUrl: '',
      imageUrl: '',
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
      videoUrl: '',
      imageUrl: '',
    },
  ],
  testimonials: [
    {
      name: 'Rajesh Tripathi',
      location: 'Vindhyachal Dham, Mirzapur',
      system: '5 kW Residential Rooftop',
      initials: 'RT',
      avatarBg: 'linear-gradient(135deg, #EA580C, #F97316)',
      quote:
        'Maa Vindhyavasini Enterprises made the whole process effortless. Our monthly electricity bill dropped from ₹7,500 to barely ₹450 with net-metering. They also handled the PM Surya Ghar registration and we received our ₹78,000 direct bank subsidy within 35 days.',
    },
    {
      name: 'Dr. Anil Verma',
      location: 'Civil Lines, Mirzapur',
      system: '40 kW Commercial Hospital System',
      initials: 'AV',
      avatarBg: 'linear-gradient(135deg, #0A1128, #1E293B)',
      quote:
        'For a healthcare facility with non-stop AC and diagnostic machinery, diesel costs were bleeding our margins. The 40 kW Adani Solar setup installed by their certified EPC team cut our daytime grid power intake by nearly 70%. Superb engineering discipline!',
    },
    {
      name: 'Suresh Jaiswal',
      location: 'Robertsganj Road, Mirzapur',
      system: '75 kW Cold Storage Industrial Plant',
      initials: 'SJ',
      avatarBg: 'linear-gradient(135deg, #0284C7, #0369A1)',
      quote:
        'Their DISCOM liaisoning team is unmatched in Eastern Uttar Pradesh. Getting high-voltage net-meter approvals from UPPCL can be painful, but Maa Vindhyavasini Enterprises handled all paperwork, load sanction, and inspection smoothly.',
    },
  ],
  media: [
    {
      id: 1,
      title: '100 kW Rooftop Drone Walkthrough',
      type: 'video',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      caption: 'Drone inspection of Waree Mono PERC 545W array in Mirzapur Industrial Area',
    },
    {
      id: 2,
      title: 'Net-Meter Commissioning with UPPCL Team',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop',
      caption: 'Bi-directional TOD electronic net-meter testing with local DISCOM officials',
    },
    {
      id: 3,
      title: 'Heavy Wind-Load Aluminum Railing Foundation',
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?w=800&auto=format&fit=crop',
      caption: 'HDG 80-micron elevated structure withstands 150 km/h wind gusts',
    },
  ],
  leads: [
    {
      id: 'LEAD-101',
      date: '2026-04-12 11:30 AM',
      name: 'Amitabh Upadhyay',
      phone: '+91 94152 77890',
      city: 'Vindhyachal',
      systemSize: '3 kW (PM Surya Ghar Subsidy)',
      message: 'Interested in getting 3kW rooftop system with UPPCL net meter.',
    },
    {
      id: 'LEAD-102',
      date: '2026-04-15 03:45 PM',
      name: 'Gaurav Flour Mill',
      phone: '+91 98380 44321',
      city: 'Chunar Industrial Area',
      systemSize: '50 kW - 100 kW (Industrial)',
      message: 'Need high-yield commercial array to cut diesel generator costs.',
    },
  ],
  contact: {
    kicker: 'Get In Touch',
    title: 'Request Your Free Solar Quote',
    subtitle:
      'Have questions about system sizing, rooftop load, or PM Surya Ghar subsidy? Contact our engineers today for an on-site feasibility report.',
    formTitle: 'Solar Consultation & Site Survey',
    formSubtitle:
      'Fill out the details below. Our team connects immediately via WhatsApp & Call.',
    address: 'Maa Vindhyavasini Enterprises, Main Road, Mirzapur, Uttar Pradesh - 231001, India',
    servingAreas: 'Serving Mirzapur, Sonbhadra, Varanasi & Prayagraj',
    workingHours: 'Mon – Sat: 9:00 AM – 7:30 PM (Sundays by appointment)',
    responseTime: 'Guaranteed response within 2 hours',
    financeNotice:
      'We assist with low-interest solar financing through SBI Surya Ghar Loan, Canara Bank, Union Bank, and PNB with zero upfront collateral for residential homeowners.',
  },
  footer: {
    brandName: 'Maa Vindhyavasini Enterprises',
    tagline:
      "Mirzapur's No.1 Solar & Electrical EPC Company. Empowering homes, industries, and institutions with high-yield photovoltaic systems and government subsidy facilitation.",
    partnerBadge: 'Waree & Adani Authorized Partner',
    copyrightNotice: 'All rights reserved.',
    disclaimer:
      'Government subsidy rates under PM Surya Ghar are subject to MNRE & Purvanchal Vidyut Vitran Nigam (UPPCL) guidelines.',
  },
  whatsapp: {
    tooltip: 'Chat with us on WhatsApp',
    prefilledMessage:
      'Hello Maa Vindhyavasini Enterprises, I would like to know more about your solar rooftop services.',
  },
};

const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(initialDefaultData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState(DEFAULT_PASSCODE);

  // Load from localStorage on client mount with backward compatibility fallback
  useEffect(() => {
    try {
      // Check v2 key or previous v1 key
      const storedData = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('mve_solar_cms_data_v1');
      if (storedData) {
        const parsed = JSON.parse(storedData);
        setSiteData((prev) => ({
          ...prev,
          ...parsed,
          header: { ...prev.header, ...(parsed.header || {}) },
          hero: { ...prev.hero, ...(parsed.hero || {}) },
          calculator: { ...prev.calculator, ...(parsed.calculator || {}) },
          impact: { ...prev.impact, ...(parsed.impact || {}) },
          whyUs: {
            ...prev.whyUs,
            ...(parsed.whyUs || {}),
            usps: parsed.whyUs?.usps && parsed.whyUs.usps.length > 0 ? parsed.whyUs.usps : prev.whyUs.usps,
            processSteps:
              parsed.whyUs?.processSteps && parsed.whyUs.processSteps.length > 0
                ? parsed.whyUs.processSteps
                : prev.whyUs.processSteps,
          },
          brands: parsed.brands && parsed.brands.length > 0 ? parsed.brands : prev.brands,
          stats: parsed.stats && parsed.stats.length > 0 ? parsed.stats : prev.stats,
          suryaGhar: { ...prev.suryaGhar, ...(parsed.suryaGhar || {}) },
          contact: { ...prev.contact, ...(parsed.contact || {}) },
          footer: { ...prev.footer, ...(parsed.footer || {}) },
          whatsapp: { ...prev.whatsapp, ...(parsed.whatsapp || {}) },
          services: parsed.services && parsed.services.length > 0 ? parsed.services : prev.services,
          projects: parsed.projects && parsed.projects.length > 0 ? parsed.projects : prev.projects,
          testimonials: parsed.testimonials && parsed.testimonials.length > 0 ? parsed.testimonials : prev.testimonials,
          media: parsed.media && parsed.media.length > 0 ? parsed.media : prev.media,
          leads: parsed.leads || prev.leads,
        }));
      }

      const storedPasscode = localStorage.getItem(PASSCODE_KEY);
      if (storedPasscode) {
        setAdminPasscode(storedPasscode);
      }
    } catch (e) {
      console.warn('Could not read CMS data from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Update site data partially or fully and save to localStorage
  const updateSiteData = (updater) => {
    setSiteData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      return next;
    });
  };

  // Log lead from contact form or solar calculator
  const addLead = (lead) => {
    const newLead = {
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      ...lead,
    };
    updateSiteData((prev) => ({
      ...prev,
      leads: [newLead, ...(prev.leads || [])],
    }));
  };

  // Reset to default
  const resetToDefaults = () => {
    setSiteData(initialDefaultData);
    setAdminPasscode(DEFAULT_PASSCODE);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('mve_solar_cms_data_v1');
      localStorage.removeItem(PASSCODE_KEY);
    } catch (err) {
      console.error(err);
    }
  };

  // Change Admin Passcode
  const updateAdminPasscode = (newPasscode) => {
    setAdminPasscode(newPasscode);
    try {
      localStorage.setItem(PASSCODE_KEY, newPasscode);
    } catch (err) {
      console.error(err);
    }
  };

  // Verify passcode
  const verifyPasscode = (enteredPasscode) => {
    if (enteredPasscode.trim() === adminPasscode.trim()) {
      setIsPasscodeModalOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        isLoaded,
        updateSiteData,
        addLead,
        resetToDefaults,
        adminPasscode,
        updateAdminPasscode,
        isPasscodeModalOpen,
        setIsPasscodeModalOpen,
        isAdminOpen,
        setIsAdminOpen,
        verifyPasscode,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
