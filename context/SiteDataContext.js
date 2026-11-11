'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'mve_solar_cms_data_v3';
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
      label: 'Annual Power Savings',
      value: 8.5,
      suffix: ' Cr+',
      sublabel: 'Saved for Mirzapur power consumers',
    },
  ],
  impact: {
    co2Metric: '12,400+',
    co2Label: 'Tonnes of CO2 Offset',
    treesMetric: '1.85 Lakh+',
    treesLabel: 'Equivalent Trees Planted',
    coalMetric: '5,200+',
    coalLabel: 'Tonnes Coal Burning Averted',
  },
  whyUs: {
    kicker: 'The MVE Engineering Edge',
    title: 'Why Eastern UP Trusts Maa Vindhyavasini Enterprises',
    subtitle:
      'From Tier-1 hardware empanelment to 100% bureaucratically approved net-metering sanctions, we engineer solar power plants that perform reliably for over 25 years.',
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
      {
        id: 'usp-5',
        title: '25-Year Performance & Generation Guarantee',
        desc: 'Uncompromised durability with 25-year performance warranties on solar modules and comprehensive 5-10 year warranty on high-efficiency inverters.',
        iconTag: '25-Year Warranty',
      },
    ],
    processSteps: [
      {
        step: '01',
        title: 'Drone & Shadow Analysis',
        desc: 'On-site digital azimuth scan, civil structural load audit, and irradiance mapping of your rooftop or industrial land in Mirzapur.',
      },
      {
        step: '02',
        title: 'Custom Engineering & Feasibility',
        desc: 'Detailed electrical single-line diagram (SLD), string design, and UPPCL DISCOM feasibility clearance filing with local division.',
      },
      {
        step: '03',
        title: 'Precision Turnkey Installation',
        desc: 'Heavy hot-dip galvanized mounting structures, Tier-1 modules, MC4 industrial crimping, SPD lightning arrestors, and copper earth pits.',
      },
      {
        step: '04',
        title: 'Net-Metering & Subsidy Sanction',
        desc: 'Bi-directional electronic meter installation by UPPCL engineers, synchronization inspection, and direct bank subsidy disbursement.',
      },
    ],
  },
  brands: [
    {
      name: 'Waree Energies',
      tag: 'India’s No. 1 Solar PV Module Manufacturer',
      category: 'Solar Panels',
      accentColor: '#EA580C',
      description: 'Authorized distributor of TopCon & Bi-facial high-efficiency modules with 25-year linear performance warranty.',
    },
    {
      name: 'Adani Solar',
      tag: 'Tier-1 Mono-PERC & Bifacial Cells',
      category: 'Solar Panels',
      accentColor: '#0284C7',
      description: 'Ultra-durable photovoltaic modules engineered for high ambient temperatures and dusty conditions in Eastern UP.',
    },
    {
      name: 'Ksolare Inverters',
      tag: 'High-Efficiency Grid-Tied Inverters',
      category: 'Inverters',
      accentColor: '#10B981',
      description: 'Quad-MPPT commercial and residential string inverters with built-in Wi-Fi monitoring and rapid grid synchronization.',
    },
    {
      name: 'Emvee Photovoltaics',
      tag: 'European Standard Solar PV',
      category: 'Solar Panels',
      accentColor: '#F59E0B',
      description: 'High-yield modules with low degradation rates and IP68 junction boxes designed for maximum power output.',
    },
    {
      name: 'Aurawatt Solar',
      tag: 'Advanced Clean Energy Systems',
      category: 'Inverters & Balance of System',
      accentColor: '#8B5CF6',
      description: 'Heavy-duty industrial junction boxes, lightning arrestors, and smart bidirectional electrical energy monitoring.',
    },
    {
      name: 'Growatt CleanTech',
      tag: 'Smart Energy Inverters',
      category: 'Inverters',
      accentColor: '#06B6D4',
      description: 'Global benchmark in smart residential inverters with 98.4% efficiency and mobile app generation tracking.',
    },
  ],
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
      desc: 'Install solar today with zero upfront capital through collateral-free green energy loans. Monthly EMIs are lower than your existing DISCOM electricity bill.',
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
      type: 'Commercial',
      category: 'Commercial',
      location: 'Industrial Area, Mirzapur',
      capacity: '100 kW',
      client: 'Aditya Precision Wire & Forgings',
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
      imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Complete turnkey EPC execution for a heavy industrial metal fabrication facility. Reduced grid peak power consumption by 82% and achieved payback within 34 months through 40% accelerated depreciation.',
    },
    {
      id: 2,
      title: '5 kW Premium Residential Rooftop Solar',
      type: 'Residential',
      category: 'Residential',
      location: 'Vindhyachal Dham, Mirzapur',
      capacity: '5 kW',
      client: 'Shri Amitabh Sharma Residence',
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
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1545208942-e1c9c916524b?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Engineered as an architectural rooftop pergola preserving 100% roof walkability. Claimed full ₹78,000 Central DBT subsidy with monthly electricity bills dropping from ₹6,800 to ₹320.',
    },
    {
      id: 3,
      title: '250 kW Turnkey Institutional Solar Plant',
      type: 'EPC',
      category: 'EPC',
      location: 'Engineering College Campus, Mirzapur',
      capacity: '250 kW',
      client: 'Vindhya Institute of Technology & Management',
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
      imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Campus-wide green energy installation powering academic buildings, computer labs, and hostels. Includes cloud SCADA for students to study real-time irradiance and generation metrics.',
    },
    {
      id: 4,
      title: '15 kW Cold Storage Grid-Tied System',
      type: 'Commercial',
      category: 'Commercial',
      location: 'Robertsganj Highway, Mirzapur',
      capacity: '15 kW',
      client: 'Kashi Agro Cold Storage & Logistics',
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
      imageUrl: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Heavy refrigeration compressor solar integration designed to run non-stop during summer peak heat, reducing grid draw during high daytime commercial tariff hours.',
    },
    {
      id: 5,
      title: '10 kW Walkable Pergola Solar Rooftop',
      type: 'Residential',
      category: 'Residential',
      location: 'Civil Lines, Mirzapur',
      capacity: '10 kW',
      client: 'Er. Rajesh K. Tiwari Bungalow',
      modules: 'Adani Solar 545W Mono-PERC (18 Modules)',
      inverter: 'Ksolare 10kW Dual-MPPT String Inverter',
      structure: 'Architectural Powder-Coated Walkable Pergola',
      tilt: '18° Elevated High-Clearance Frame (9 ft)',
      generation: '14,600 kWh / Year',
      dailyUnits: '40 Units / Day Avg.',
      commissioned: 'January 2026',
      savings: '₹1.15 Lakh / Year',
      co2: '12 Tonnes CO2 Offset / Year',
      trees: '600 Mature Trees Equivalent',
      status: 'Completed & Net-Metered',
      discom: 'UPPCL Domestic Bi-Directional Net-Meter',
      sanctionNo: 'UPPCL-MZP-DOM-2026-0814',
      imageUrl: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1545208942-e1c9c916524b?w=900&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Turnkey residential power plant powering multiple 1.5-ton AC units with surplus units exported to UPPCL grid through bi-directional net-metering.',
    },
    {
      id: 6,
      title: '50 kW Multi-Speciality Hospital Solar EPC',
      type: 'Commercial',
      category: 'Commercial',
      location: 'Civil Lines, Mirzapur',
      capacity: '50 kW',
      client: 'Vindhya Lifeline Hospital & Trauma Centre',
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
      imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Dedicated priority feed engineered with dual-inverter redundancy for uninterrupted power delivery to ICUs, neonatal wings, and surgical theatres.',
    },
    {
      id: 7,
      title: '35 kW Ground-Mount & Net-Meter Commissioning',
      type: 'EPC',
      category: 'EPC',
      location: 'Chunar Industrial Corridor',
      capacity: '35 kW',
      client: 'Gaurav Agrico Processing Mills',
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
      imageUrl: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Ground-mount solar EPC engineered alongside agro-processing facilities. High ground clearance facilitates weed suppression and robotic cleaning access.',
    },
    {
      id: 8,
      title: '3 kW PM Surya Ghar Subsidy Installation',
      type: 'Residential',
      category: 'Residential',
      location: 'Shastri Nagar, Mirzapur',
      capacity: '3 kW',
      client: 'Shri Rakesh Verma Home',
      modules: 'Waree 545W Mono PERC (6 Modules)',
      inverter: 'Growatt 3.3kW High-Efficiency Inverter',
      structure: 'Standard Flush Mount Hot-Dip Galvanized Struts',
      tilt: '22° South Facing Roof Slope',
      generation: '4,380 kWh / Year',
      dailyUnits: '12 Units / Day Avg.',
      commissioned: 'April 2026',
      savings: '₹34,000 / Year',
      co2: '3.6 Tonnes CO2 Offset / Year',
      trees: '180 Mature Trees Equivalent',
      status: 'Completed & Subsidy Disbursed',
      discom: 'PM Surya Ghar ₹78,000 Direct DBT Received',
      sanctionNo: 'PMSURYAGHAR-UP-MZP-10492',
      imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=900&auto=format&fit=crop&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=900&auto=format&fit=crop&q=80',
      ],
      description: 'Benchmark PM Surya Ghar residential installation in Mirzapur town. Zero electricity bills achieved with rapid subsidy sanction inside 28 days of net-meter grid sync.',
    },
  ],
  articles: [
    {
      id: 1,
      slug: 'pm-surya-ghar-muft-bijli-yojana-mirzapur-guide',
      title: 'Complete Guide to PM Surya Ghar Muft Bijli Yojana in Mirzapur (₹78,000 Subsidy)',
      category: 'Government Subsidy',
      excerpt: 'How Mirzapur homeowners can claim direct DBT bank subsidies up to ₹78,000, eligibility guidelines, UPPCL documentation, and realistic ROI breakdown.',
      author: 'Er. Arvind Upadhyay',
      authorRole: 'Lead Solar EPC Engineer',
      date: 'March 2026',
      readTime: '5 min read',
      featuredImage: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=1200&auto=format&fit=crop&q=80',
      tags: ['PM Surya Ghar', 'Mirzapur Solar', '₹78000 Subsidy', 'UPPCL Net-Metering'],
      keyTakeaways: [
        'Central government provides up to ₹78,000 direct benefit transfer (DBT) directly into your bank account for 3 kW systems.',
        'Requires valid UPPCL electricity bill in homeowner’s name and roughly 300 sq. ft. of shadow-free rooftop.',
        'Maa Vindhyavasini Enterprises handles 100% of the portal registration, DISCOM feasibility, and net-meter sanctions.',
        'Typical payback period is 2.5 to 3 years with zero monthly electricity bills afterwards.',
      ],
      content: `
### What is PM Surya Ghar: Muft Bijli Yojana?
Launched by the Government of India, the **PM Surya Ghar: Muft Bijli Yojana** is designed to provide free electricity to 1 Crore households across India. In Mirzapur, Sonbhadra, and Eastern Uttar Pradesh, high summer temperatures and escalating DISCOM power tariffs make rooftop solar the single smartest home investment.

Under this scheme, the Central Government credits subsidies directly into your Aadhaar-linked bank account via Direct Benefit Transfer (DBT) once your rooftop plant is commissioned and inspected by **Purvanchal Vidyut Vitran Nigam Ltd (UPPCL)**.

### Subsidy Slabs & System Sizing for Uttar Pradesh Homes

| System Capacity | Monthly Generation | Monthly Bill Savings | Central Government Subsidy |
| :--- | :--- | :--- | :--- |
| **1 kW System** | 120 Units | ₹900 - ₹1,000 | **₹30,000** |
| **2 kW System** | 240 Units | ₹1,800 - ₹2,000 | **₹60,000** |
| **3 kW to 10 kW** | 360 - 1,200 Units | ₹2,800 - ₹9,600 | **₹78,000 (Maximum)** |

For standard 2-3 BHK homes in Mirzapur running 1-2 air conditioners, refrigerators, and water pumps, a **3 kW system** is the sweet spot. It claims the maximum subsidy of ₹78,000 and easily covers summer bills.

### Step-by-Step Application Process in Mirzapur

1. **Rooftop Audit & Shadow Mapping**: Our certified solar engineers visit your home in Mirzapur, measure roof azimuth, structural strength, and calculate exact daily sun hours.
2. **National Portal Registration**: We assist with submitting your application on the official National Portal for Rooftop Solar, tagging Maa Vindhyavasini Enterprises as your authorized empanelled EPC vendor.
3. **UPPCL Technical Feasibility Approval**: Purvanchal DISCOM issues an online technical feasibility clearance verifying transformer capacity.
4. **Hardware Installation**: We install Tier-1 Mono PERC or TopCon modules (Waree or Adani Solar), heavy hot-dip galvanized mounting structures, and lightning arrestors.
5. **Net-Meter Grid Synchronization**: UPPCL engineers inspect the installation and install the bi-directional electronic net meter.
6. **Direct Subsidy Disbursement**: Within 30 working days of net-meter commissioning, ₹78,000 is credited directly into your bank account.

### Why Partner with Maa Vindhyavasini Enterprises?
Unlike aggregator apps that subcontract your installation to untrained local technicians, Maa Vindhyavasini Enterprises is a registered local EPC contractor headquartered in Mirzapur. We provide a **25-year linear performance warranty**, SBI low-interest loan paperwork assistance, and dedicated local after-sales service.
      `,
    },
    {
      id: 2,
      slug: 'uppcl-solar-net-metering-process-eastern-up',
      title: 'UPPCL Solar Net-Metering in Eastern UP: Rules, Approval Timeline & Tariffs',
      category: 'Policy & DISCOM',
      excerpt: 'A comprehensive breakdown of Purvanchal DISCOM bi-directional net-metering regulations, solar banking units, surplus export credits, and how we handle 100% of paperwork.',
      author: 'Pooja Mishra',
      authorRole: 'Technical Liaisoning Manager',
      date: 'February 2026',
      readTime: '6 min read',
      featuredImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80',
      tags: ['UPPCL Net-Metering', 'Purvanchal DISCOM', 'Solar Banking', 'TOD Tariffs'],
      keyTakeaways: [
        'Bi-directional net meters record both power imported from the grid and excess solar exported.',
        'Excess units generated during sunny peak hours are banked and adjusted against night-time or winter consumption.',
        'Feasibility clearance is strictly capped at 80% of local distribution transformer rated capacity.',
        'Maa Vindhyavasini Enterprises guarantees rapid turnaround for test report approvals and meter testing.',
      ],
      content: `
### Understanding Bi-Directional Net-Metering
A rooftop solar power plant without net-metering is incomplete. Under UPPCL regulations, a **Bi-Directional Electronic Net Meter** replaces your standard consumer meter. It features two reading registers:
- **Import Register**: Units of electricity drawn from the grid when your solar system is producing less than you consume (e.g., nighttime or heavy monsoon days).
- **Export Register**: Surplus electricity generated by your solar panels fed directly back into the DISCOM grid during bright sunny afternoons.

At the end of your billing cycle, UPPCL bills you only for **Net Units = Import Units - Export Units**. If you exported more than you imported, the balance units carry forward as banked energy credits for following months!

### UPPCL Technical Regulations Every Consumer Must Know

1. **Transformer Capacity Ceiling**: As per Uttar Pradesh Electricity Regulatory Commission (UPERC) guidelines, the total solar capacity connected to any distribution transformer cannot exceed 80% of its rated capacity. Early applicants in each locality lock in their quota before the transformer is saturated.
2. **Approved Inverter Protection**: The grid-tied inverter must have built-in anti-islanding protection (IEC 62116 / IEEE 1547 compliant) to ensure lineworker safety during grid power cuts.
3. **Dedicated Earth Pits**: Separate chemical earthing pits for AC, DC, and lightning arrestor systems with earth resistance under 5 Ohms.

### How Maa Vindhyavasini Enterprises Accelerates Approvals
Our in-house DISCOM liaisoning team in Mirzapur coordinates daily with Purvanchal Vidyut Vitran Nigam engineers. We prepare CAD drawings, Single Line Diagrams, earthing test certificates, and meter calibration reports, saving our clients weeks of bureaucratic hassle.
      `,
    },
    {
      id: 3,
      slug: 'solar-roi-cold-storage-flour-mills-eastern-up',
      title: 'Commercial Solar for Cold Storages & Flour Mills in Mirzapur: Payback in 3.2 Years',
      category: 'Commercial EPC',
      excerpt: 'Analyzing how commercial enterprises, rice mills, cold storages, and petrol pumps across Mirzapur and Sonbhadra slash high commercial power bills with captive solar.',
      author: 'Sanjay Vind',
      authorRole: 'Director of EPC Operations',
      date: 'January 2026',
      readTime: '7 min read',
      featuredImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=1200&auto=format&fit=crop&q=80',
      tags: ['Commercial Solar', 'Cold Storage ROI', 'Accelerated Depreciation', 'Industrial EPC'],
      keyTakeaways: [
        'Commercial electricity rates in UP exceed ₹8.50 to ₹10.50 per unit plus fixed demand charges.',
        'Commercial solar generates power at an levelized cost of under ₹1.80 per unit over 25 years.',
        'Businesses claim 40% Accelerated Depreciation in the first financial year under Section 32 of Income Tax Act.',
        'Cold storages and flour mills achieve complete capital payback within 36 to 40 months.',
      ],
      content: `
### The Industrial Electricity Challenge in Eastern UP
For agro-processing plants, cold storages, flour mills, and manufacturing units operating along the Mirzapur-Robertsganj and Chunar corridors, electricity is the single largest operational expense. Commercial LT and HT tariffs often range between ₹8.50 and ₹11.00 per unit, with heavy penalties for exceeding contracted maximum demand.

Installing a commercial grid-tied solar power plant on empty factory tin sheds or RCC rooftops offers three distinct financial returns:

### 1. Direct Reduction in Power Bills
A 100 kW industrial solar plant in Mirzapur generates approximately **1,46,000 units (kWh) annually**. At a commercial grid tariff of ₹9.50/unit:
- **Annual Energy Savings**: ₹13,87,000
- **25-Year Cumulative Savings**: Over ₹3.8 Crore

### 2. 40% Accelerated Depreciation Tax Shield
Under Section 32 of the Indian Income Tax Act, solar power equipment is eligible for **40% Accelerated Depreciation** in the year of commissioning. For a corporate or partnership firm in the 30% tax bracket, this delivers significant first-year tax savings:
- On a ₹45 Lakh 100 kW plant, 40% depreciation provides an immediate tax buffer of ₹18 Lakhs.

### 3. Peak-Load Shaving
Heavy machinery often peaks during afternoon hours. Solar generation perfectly coincides with these peak hours, keeping your maximum demand indicator safely within sanctioned limits and preventing DISCOM surcharge penalties.

### Turnkey Execution by Maa Vindhyavasini Enterprises
We handle the full industrial EPC lifecycle: structural Finite Element Analysis (FEA) of tin-shed trusses, non-penetrative aluminum Klip-Lok clamps to protect shed warranties, dual 33kV HT metering coordination, and real-time remote telemetry.
      `,
    },
    {
      id: 4,
      slug: 'monocrystalline-vs-topcon-bifacial-solar-panels-guide',
      title: 'TopCon vs Mono PERC vs Bifacial: Which Solar Panels Are Best for UP Summers?',
      category: 'Technical Guide',
      excerpt: 'Detailed engineering comparison of temperature coefficients, dust degradation, and 25-year generation performance between Waree, Adani Solar, and TopCon technology.',
      author: 'Er. Arvind Upadhyay',
      authorRole: 'Lead Solar EPC Engineer',
      date: 'December 2025',
      readTime: '4 min read',
      featuredImage: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?w=1200&auto=format&fit=crop&q=80',
      tags: ['TopCon Modules', 'Bifacial Solar', 'Mono PERC', 'Solar Technology'],
      keyTakeaways: [
        'TopCon N-Type cells have superior temperature coefficients (-0.30%/°C) compared to standard P-Type Mono PERC.',
        'Bifacial modules on reflective white-painted terraces generate an additional 8% to 15% rear-side power.',
        'Dust-repellent anti-reflective coating is vital during dusty North Indian pre-monsoon dry spells.',
        'Always verify Tier-1 factory linear performance warranties ensuring 84.8% output even after 25 years.',
      ],
      content: `
### Why Temperature Coefficient Matters in Mirzapur
Solar panels generate electricity from light, not heat. In fact, high ambient temperatures reduce solar cell voltage and efficiency. During peak Mirzapur summers where roof temperatures reach 55°C, a panel with a high temperature coefficient will experience steep generation drops.

### Comparing Modern Solar Cell Technologies

| Feature | Polycrystalline (Legacy) | Mono PERC (Standard) | TopCon N-Type (Modern Benchmark) |
| :--- | :--- | :--- | :--- |
| **Cell Efficiency** | 16% - 17% | 20% - 21.5% | **22% - 23.5%** |
| **Temperature Coefficient** | -0.42% / °C | -0.35% / °C | **-0.30% / °C (Best for UP)** |
| **Bifacial Factor** | 0% | Up to 70% | **Up to 85%** |
| **First Year Degradation**| 2.5% | 2.0% | **< 1.0%** |
| **25-Year Guaranteed Power**| 80% | 84.8% | **87.4%** |

### The Bifacial Advantage on Terrace Roofs
If you have a concrete terrace roof painted with white heat-reflective waterproofing paint, **Bifacial TopCon modules** are game-changers. The transparent dual-glass backsheet captures sunlight reflected off the terrace floor, providing up to **15% bonus kilowatt-hours** from the exact same footprint!

At Maa Vindhyavasini Enterprises, we empanel exclusively with **Waree Energies** and **Adani Solar** to supply factory-tested Tier-1 modules backed by 12-year product and 25-year linear performance warranties.
      `,
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

export const SiteDataContext = createContext(null);

export function SiteDataProvider({ children }) {
  const [siteData, setSiteData] = useState(initialDefaultData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPasscodeModalOpen, setIsPasscodeModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPasscode, setAdminPasscode] = useState(DEFAULT_PASSCODE);

  // Load from localStorage on client mount with backward compatibility fallback
  useEffect(() => {
    try {
      // Check v3 key or previous v2/v1 keys
      const storedData =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('mve_solar_cms_data_v2') ||
        localStorage.getItem('mve_solar_cms_data_v1');

      if (storedData) {
        const parsed = JSON.parse(storedData);
        setSiteData((prev) => {
          // Normalize projects to have type: 'Residential' | 'Commercial' | 'EPC'
          const mergedProjects = (parsed.projects && parsed.projects.length >= 6 ? parsed.projects : prev.projects).map((p, idx) => {
            const fallback = prev.projects[idx] || prev.projects[0];
            let normType = p.type;
            if (!normType) {
              const cat = (p.category || '').toLowerCase();
              if (cat.includes('residen') || cat.includes('on-grid') && p.capacity?.includes('5') || p.capacity?.includes('3')) {
                normType = 'Residential';
              } else if (cat.includes('epc') || cat.includes('commission')) {
                normType = 'EPC';
              } else {
                normType = 'Commercial';
              }
            }
            return {
              ...fallback,
              ...p,
              type: normType,
              category: normType,
            };
          });

          return {
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
            projects: mergedProjects,
            articles: parsed.articles && parsed.articles.length > 0 ? parsed.articles : prev.articles,
            testimonials: parsed.testimonials && parsed.testimonials.length > 0 ? parsed.testimonials : prev.testimonials,
            media: parsed.media && parsed.media.length > 0 ? parsed.media : prev.media,
            leads: parsed.leads || prev.leads,
          };
        });
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
      localStorage.removeItem('mve_solar_cms_data_v2');
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
