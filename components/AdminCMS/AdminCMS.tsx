'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiCloseLine,
  RiSaveLine,
  RiCheckLine,
  RiSunLine,
  RiShieldCheckLine,
  RiBarChartLine,
  RiAwardLine,
  RiAddLine,
  RiDeleteBinLine,
  RiRestartLine,
  RiEyeLine,
} from 'react-icons/ri';

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
  onSave?: (data: {
    hero: HeroContentState;
    usps: UspItem[];
    stats: StatItem[];
    partners: PartnerItem[];
  }) => void;
}

export default function AdminCMS({
  isOpen = true,
  onClose,
  onSave,
}: AdminCMSProps) {
  // Active Navigation Tab: 'hero' | 'usps' | 'stats' | 'partners'
  const [activeTab, setActiveTab] = useState<'hero' | 'usps' | 'stats' | 'partners'>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 1. Local React State: Hero Content
  const [heroContent, setHeroContent] = useState<HeroContentState>({
    badgeText: "Mirzapur's No.1 Solar & Electrical EPC",
    titlePrefix: 'Engineering Clean Power & ',
    highlightText: 'Zero Electricity Bills',
    subtitle:
      'Cut your power costs by up to 90% with Tier-1 solar systems. Official PM Surya Ghar partner in Mirzapur & Eastern UP with direct ₹78,000 bank subsidy disbursement & guaranteed UPPCL net-metering.',
    quickPills: [
      '✓ 100% DISCOM Net-Metering',
      '✓ SBI Solar Loan Ready',
      '✓ 25-Year Performance Cover',
    ],
  });

  // 2. Local React State: USPs
  const [usps, setUsps] = useState<UspItem[]>([
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
  ]);

  // 3. Local React State: Stats
  const [stats, setStats] = useState<StatItem[]>([
    {
      id: 'stat-1',
      label: 'Solar Installations',
      value: 500,
      suffix: '+',
      sublabel: 'Rooftops & Commercial Grid-tied',
    },
    {
      id: 'stat-2',
      label: 'Clean Capacity Deployed',
      value: 10,
      suffix: '+ MW',
      sublabel: 'Generating over 14.5M units/year',
    },
    {
      id: 'stat-3',
      label: 'Verified Clients',
      value: 200,
      suffix: '+',
      sublabel: 'Industrial, Institutional & Homes',
    },
    {
      id: 'stat-4',
      label: 'Tier-1 Brand Partners',
      value: 15,
      suffix: '+',
      sublabel: 'Waree, Adani, Ksolare & Emvee',
    },
  ]);

  // 4. Local React State: Partners
  const [partners, setPartners] = useState<PartnerItem[]>([
    { id: 'partner-1', name: 'Waree Energies', category: 'Authorized Tier-1 Modules', accentColor: '#E11D48' },
    { id: 'partner-2', name: 'Adani Solar', category: 'Monocrystalline Perc', accentColor: '#0284C7' },
    { id: 'partner-3', name: 'Ksolare', category: 'Grid-Tie Inverters', accentColor: '#D97706' },
    { id: 'partner-4', name: 'Emvee Photovoltaics', category: 'High-Efficiency Panels', accentColor: '#16A34A' },
    { id: 'partner-5', name: 'Aurawatt', category: 'Solar EPC Engineering', accentColor: '#EA580C' },
    { id: 'partner-6', name: 'Polycab Solar', category: 'DC Solar Cables & Protection', accentColor: '#9333EA' },
    { id: 'partner-7', name: 'Growatt', category: 'Smart Cloud Inverters', accentColor: '#059669' },
    { id: 'partner-8', name: 'Luminous Solar', category: 'Hybrid Systems & Storage', accentColor: '#2563EB' },
  ]);

  // Handlers for USPs
  const handleAddUsp = () => {
    const newItem: UspItem = {
      id: `usp-${Date.now()}`,
      title: 'New Value Proposition',
      desc: 'Engineered for reliability, long-term efficiency, and peak energy yield.',
      iconTag: 'Quality Assured',
    };
    setUsps([...usps, newItem]);
  };

  const handleUpdateUsp = (id: string, field: keyof UspItem, value: string) => {
    setUsps(usps.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  const handleDeleteUsp = (id: string) => {
    setUsps(usps.filter((u) => u.id !== id));
  };

  // Handlers for Stats
  const handleUpdateStat = (id: string, field: keyof StatItem, value: string | number) => {
    setStats(
      stats.map((s) => (s.id === id ? { ...s, [field]: field === 'value' ? Number(value) || 0 : value } : s))
    );
  };

  // Handlers for Partners
  const handleAddPartner = () => {
    const newPartner: PartnerItem = {
      id: `partner-${Date.now()}`,
      name: 'New Brand Partner',
      category: 'Solar Equipment Manufacturer',
      accentColor: '#EA580C',
    };
    setPartners([...partners, newPartner]);
  };

  const handleUpdatePartner = (id: string, field: keyof PartnerItem, value: string) => {
    setPartners(partners.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const handleDeletePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
  };

  // Save changes simulation
  const handleSave = () => {
    setSaveSuccess(true);
    if (onSave) {
      onSave({
        hero: heroContent,
        usps,
        stats,
        partners,
      });
    }
    setTimeout(() => setSaveSuccess(false), 2400);
  };

  // Reset to initial simulation defaults
  const handleReset = () => {
    if (window.confirm('Reset all CMS drafts back to default simulation state?')) {
      setHeroContent({
        badgeText: "Mirzapur's No.1 Solar & Electrical EPC",
        titlePrefix: 'Engineering Clean Power & ',
        highlightText: 'Zero Electricity Bills',
        subtitle:
          'Cut your power costs by up to 90% with Tier-1 solar systems. Official PM Surya Ghar partner in Mirzapur & Eastern UP with direct ₹78,000 bank subsidy disbursement & guaranteed UPPCL net-metering.',
        quickPills: [
          '✓ 100% DISCOM Net-Metering',
          '✓ SBI Solar Loan Ready',
          '✓ 25-Year Performance Cover',
        ],
      });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/85 backdrop-blur-md text-slate-800">
        <motion.div
          className="flex flex-col w-full h-full bg-slate-50 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          {/* Executive Top Bar */}
          <header className="flex items-center justify-between px-6 py-4 bg-[#0A1128] text-white border-b border-slate-800 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 border border-orange-500/30">
                <RiSunLine size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base font-bold tracking-tight text-white font-heading">
                    MVE Executive Admin CMS
                  </h1>
                  <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full">
                    Active State
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Full-Screen Content Management Studio • Local State Simulation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {saveSuccess && (
                <motion.span
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 rounded-lg"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <RiCheckLine size={15} />
                  Changes Saved!
                </motion.span>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700 transition"
                title="Reset drafts to simulation defaults"
              >
                <RiRestartLine size={15} />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 rounded-lg shadow-sm hover:shadow-orange-600/20 transition cursor-pointer"
              >
                <RiSaveLine size={16} />
                <span>Save All Changes</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center justify-center w-9 h-9 text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 rounded-lg transition cursor-pointer"
                  aria-label="Close CMS Studio"
                >
                  <RiCloseLine size={20} />
                </button>
              )}
            </div>
          </header>

          {/* Studio Workspace Layout */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Tabs Navigation */}
            <aside className="w-64 bg-[#0E1726] border-r border-slate-800 flex flex-col p-3 gap-1.5 select-none shrink-0">
              <span className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Content Modules
              </span>

              <button
                type="button"
                onClick={() => setActiveTab('hero')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition text-left cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <RiSunLine size={18} />
                <span>Hero Content</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('usps')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition text-left cursor-pointer ${
                  activeTab === 'usps'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <RiShieldCheckLine size={18} />
                <span>USPs &amp; Trust Pillars</span>
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 rounded-md text-slate-300">
                  {usps.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('stats')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition text-left cursor-pointer ${
                  activeTab === 'stats'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <RiBarChartLine size={18} />
                <span>Stats Counters</span>
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 rounded-md text-slate-300">
                  {stats.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('partners')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition text-left cursor-pointer ${
                  activeTab === 'partners'
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <RiAwardLine size={18} />
                <span>Brand Partners</span>
                <span className="ml-auto px-1.5 py-0.5 text-[10px] font-bold bg-slate-800 rounded-md text-slate-300">
                  {partners.length}
                </span>
              </button>

              <div className="mt-auto p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1">
                  <RiEyeLine size={14} className="text-orange-400" />
                  <span>Real-time Preview</span>
                </div>
                Edits persist in state and simulate live website management.
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 bg-slate-50 text-slate-800">
              {/* TAB 1: HERO CONTENT */}
              {activeTab === 'hero' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Hero Section Content</h2>
                    <p className="text-sm text-slate-500">
                      Manage the top kicker badge, primary headline, orange highlighted phrases, and descriptive subtitle.
                    </p>
                  </div>

                  <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Top Kicker Badge Pill
                      </label>
                      <input
                        type="text"
                        value={heroContent.badgeText}
                        onChange={(e) => setHeroContent({ ...heroContent, badgeText: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Headline Prefix
                        </label>
                        <input
                          type="text"
                          value={heroContent.titlePrefix}
                          onChange={(e) => setHeroContent({ ...heroContent, titlePrefix: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Highlighted Callout Phrase (Orange)
                        </label>
                        <input
                          type="text"
                          value={heroContent.highlightText}
                          onChange={(e) => setHeroContent({ ...heroContent, highlightText: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-orange-600 font-bold focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Hero Description Subtitle
                      </label>
                      <textarea
                        rows={3}
                        value={heroContent.subtitle}
                        onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Trust Badges / Quick Pills (Comma separated)
                      </label>
                      <input
                        type="text"
                        value={heroContent.quickPills.join(', ')}
                        onChange={(e) =>
                          setHeroContent({
                            ...heroContent,
                            quickPills: e.target.value.split(',').map((p) => p.trim()),
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {heroContent.quickPills.map((pill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200"
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: USPs & TRUST PILLARS */}
              {activeTab === 'usps' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Unique Selling Points (USPs)</h2>
                      <p className="text-sm text-slate-500">
                        Manage the trust badges, certification claims, and guarantees highlighted to customers.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddUsp}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition shadow-sm"
                    >
                      <RiAddLine size={16} />
                      <span>Add USP</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {usps.map((usp, index) => (
                      <div
                        key={usp.id}
                        className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-200">
                            USP #{index + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteUsp(usp.id)}
                            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-200 rounded-md transition cursor-pointer"
                          >
                            <RiDeleteBinLine size={13} />
                            <span>Delete</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-600 mb-1">
                              Headline / Title
                            </label>
                            <input
                              type="text"
                              value={usp.title}
                              onChange={(e) => handleUpdateUsp(usp.id, 'title', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">
                              Badge Tag Label
                            </label>
                            <input
                              type="text"
                              value={usp.iconTag}
                              onChange={(e) => handleUpdateUsp(usp.id, 'iconTag', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Detailed Description
                          </label>
                          <textarea
                            rows={2}
                            value={usp.desc}
                            onChange={(e) => handleUpdateUsp(usp.id, 'desc', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: STATS */}
              {activeTab === 'stats' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Stats Counters &amp; Capacity Figures</h2>
                    <p className="text-sm text-slate-500">
                      Configure the 4 high-impact counters displayed across the live platform with numeric count-ups.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div
                        key={stat.id}
                        className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Metric Counter #{index + 1}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Live: <strong className="text-slate-800">{stat.value}{stat.suffix}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">
                              Numeric Value
                            </label>
                            <input
                              type="number"
                              value={stat.value}
                              onChange={(e) => handleUpdateStat(stat.id, 'value', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-bold focus:bg-white focus:border-orange-500 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">
                              Suffix Symbol
                            </label>
                            <input
                              type="text"
                              value={stat.suffix}
                              onChange={(e) => handleUpdateStat(stat.id, 'suffix', e.target.value)}
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold focus:bg-white focus:border-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Primary Label
                          </label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => handleUpdateStat(stat.id, 'label', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Sublabel / Context
                          </label>
                          <input
                            type="text"
                            value={stat.sublabel}
                            onChange={(e) => handleUpdateStat(stat.id, 'sublabel', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-600 focus:bg-white focus:border-orange-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: PARTNERS */}
              {activeTab === 'partners' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Brand Partners &amp; Manufacturers</h2>
                      <p className="text-sm text-slate-500">
                        Add, remove, or modify Tier-1 equipment brand partners shown in the marquee ticker.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddPartner}
                      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer transition shadow-sm"
                    >
                      <RiAddLine size={16} />
                      <span>Add Partner</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {partners.map((partner) => (
                      <div
                        key={partner.id}
                        className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: partner.accentColor }}
                            />
                            <strong className="text-sm font-bold text-slate-800">{partner.name}</strong>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeletePartner(partner.id)}
                            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 bg-red-50 border border-red-200 rounded-md transition cursor-pointer"
                          >
                            <RiDeleteBinLine size={12} />
                            <span>Remove</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Brand / Company Name
                          </label>
                          <input
                            type="text"
                            value={partner.name}
                            onChange={(e) => handleUpdatePartner(partner.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Category / Specialization Tag
                          </label>
                          <input
                            type="text"
                            value={partner.category}
                            onChange={(e) => handleUpdatePartner(partner.id, 'category', e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-orange-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">
                            Accent Badge Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={partner.accentColor}
                              onChange={(e) => handleUpdatePartner(partner.id, 'accentColor', e.target.value)}
                              className="w-9 h-9 p-0 border border-slate-300 rounded-lg cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              value={partner.accentColor}
                              onChange={(e) => handleUpdatePartner(partner.id, 'accentColor', e.target.value)}
                              className="w-32 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono uppercase focus:bg-white focus:border-orange-500 focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
