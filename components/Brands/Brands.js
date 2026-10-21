'use client';

import React from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Brands.module.css';

export default function Brands() {
  const { siteData } = useSiteData();

  const brandList = siteData?.brands && siteData.brands.length > 0 ? siteData.brands : [
    { name: 'Waree Energies', tag: 'Authorized Tier-1 Modules', color: '#E11D48' },
    { name: 'Adani Solar', tag: 'Monocrystalline Perc', color: '#0284C7' },
    { name: 'Ksolare', tag: 'Grid-Tie Inverters', color: '#D97706' },
    { name: 'Emvee Photovoltaics', tag: 'High-Efficiency Panels', color: '#16A34A' },
    { name: 'Aurawatt', tag: 'Solar EPC Engineering', color: '#EA580C' },
    { name: 'Polycab Solar', tag: 'DC Solar Cables & Protection', color: '#9333EA' },
    { name: 'Growatt', tag: 'Smart Cloud Inverters', color: '#059669' },
    { name: 'Luminous Solar', tag: 'Hybrid Systems & Storage', color: '#2563EB' },
  ];

  // Duplicate for seamless 50% translation loop
  const marqueeItems = [...brandList, ...brandList];

  return (
    <section className={styles.brandsSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>Direct OEM Partnerships</span>
          <h2 className={styles.title}>Our Trusted Brand Partners</h2>
        </div>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((brand, index) => (
            <div key={`${brand.name}-${index}`} className={styles.brandBadge}>
              <span className={styles.brandLogoDot} style={{ backgroundColor: brand.color || '#EA580C' }} />
              <span className={styles.brandName}>{brand.name}</span>
              <span className={styles.brandCategory}>{brand.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
