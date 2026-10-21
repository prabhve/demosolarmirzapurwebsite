'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  RiFlashlightLine,
  RiBattery2ChargeLine,
  RiUserHeartLine,
  RiMedalLine,
  RiMapPinLine,
  RiShieldCheckLine,
  RiLeafLine,
} from 'react-icons/ri';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Stats.module.css';

function CountUp({ target, duration = 2, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const end = Number(target) || 0;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const current = Math.round(end * (1 - Math.pow(2, -10 * progress)));

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration, inView]);

  return <>{count}</>;
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { siteData } = useSiteData();

  const icons = [
    <RiFlashlightLine key="0" size={30} />,
    <RiBattery2ChargeLine key="1" size={30} />,
    <RiUserHeartLine key="2" size={30} />,
    <RiMedalLine key="3" size={30} />,
  ];

  const rawStats = siteData?.stats || [
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
  ];

  const impact = siteData?.impact || {
    regionBadge: 'Serving Mirzapur • Sonbhadra • Varanasi • Prayagraj',
    co2Offset: '14,200+ Tonnes',
    coalSaved: '6,100+ Tonnes',
    treesPlanted: '71,000+ Trees',
  };

  return (
    <section className={styles.statsSection} ref={ref}>
      <div className={styles.statsContainer}>
        <div className={styles.regionalBadgeRow}>
          <div className={styles.regionalBadge}>
            <RiMapPinLine size={15} style={{ color: 'var(--secondary)' }} />
            <span>{impact.regionBadge || 'Serving Mirzapur • Sonbhadra • Varanasi • Prayagraj'}</span>
          </div>
        </div>

        <div className={styles.statsGrid}>
          {rawStats.map((stat, index) => (
            <motion.div
              key={stat.label || index}
              className={styles.statCard}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.iconWrapper}>{icons[index % icons.length]}</div>
              <div className={styles.statNumber}>
                <CountUp target={stat.value} duration={2} inView={isInView} />
                <span className={styles.statSuffix}>{stat.suffix}</span>
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statSublabel}>{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Live Environmental Impact & Uptime Bar */}
        <div className={styles.bottomMetricsBar}>
          <div className={styles.metricPill}>
            <RiLeafLine size={18} style={{ color: '#10B981' }} />
            <span>
              Annual CO2 Offset: <strong className={styles.metricVal}>{impact.co2Offset || '14,200+ Tonnes'}</strong>
            </span>
          </div>

          <div className={styles.metricPill}>
            <RiShieldCheckLine size={18} style={{ color: 'var(--secondary)' }} />
            <span>
              Coal Conserved: <strong className={styles.metricVal}>{impact.coalSaved || '6,100+ Tonnes'}</strong>
            </span>
          </div>

          <div className={styles.metricPill}>
            <RiFlashlightLine size={18} style={{ color: 'var(--primary-light)' }} />
            <span>
              Tree Equiv: <strong className={styles.metricVal}>{impact.treesPlanted || '71,000+ Trees'}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
