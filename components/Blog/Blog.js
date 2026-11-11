'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiBookOpenLine,
  RiTimeLine,
  RiCalendarLine,
  RiArrowRightLine,
  RiUserLine,
  RiShieldCheckLine,
} from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useSiteData } from '../../context/SiteDataContext';
import styles from './Blog.module.css';

export default function Blog() {
  const router = useRouter();
  const { siteData } = useSiteData();
  const rawArticles = siteData?.articles || [];

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set();
    rawArticles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set)];
  }, [rawArticles]);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return rawArticles;
    return rawArticles.filter((a) => a.category === selectedCategory);
  }, [rawArticles, selectedCategory]);

  const handleNavigate = (slug) => {
    router.push(`/blog/${slug}`);
  };

  if (!rawArticles || rawArticles.length === 0) {
    return null;
  }

  return (
    <section id="blog" className={styles.blogSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.kicker}>Solar Knowledge &amp; Industry News</span>
          <h2 className={styles.title}>Articles &amp; Solar Guides</h2>
          <p className={styles.subtitle}>
            Expert insights on PM Surya Ghar Muft Bijli Yojana subsidies, UPPCL net-metering regulations, and commercial solar EPC engineering in Eastern Uttar Pradesh.
          </p>
        </motion.div>

        {/* Filter Pills */}
        {categories.length > 2 && (
          <div className={styles.filterBar} role="tablist" aria-label="Filter articles by category">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const count =
                category === 'All'
                  ? rawArticles.length
                  : rawArticles.filter((a) => a.category === category).length;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.filterBtn} ${isActive ? styles.activeFilterBtn : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span>{category}</span>
                  <span className={styles.filterBadgeCount}>{count}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Articles Grid with Framer Motion Layout Animation */}
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article) => {
              const authorInitials = (article.author || 'MVE')
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('');

              return (
                <motion.article
                  key={article.id || article.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={styles.card}
                  onClick={() => handleNavigate(article.slug)}
                  tabIndex={0}
                  role="link"
                  aria-label={`Read article: ${article.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNavigate(article.slug);
                    }
                  }}
                >
                  {/* Featured Image */}
                  <div className={styles.imageWrap}>
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className={styles.featuredImage}
                      loading="lazy"
                    />
                    <div className={styles.imageOverlay} />
                    <div className={styles.topPills}>
                      <span className={styles.categoryPill}>{article.category}</span>
                      <span className={styles.readTimeBadge}>
                        <RiTimeLine size={13} />
                        {article.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className={styles.cardBody}>
                    <div className={styles.postMetaRow}>
                      <span className={styles.metaItem}>
                        <RiCalendarLine size={14} />
                        {article.date}
                      </span>
                      <span>•</span>
                      <span className={styles.metaItem}>
                        <RiShieldCheckLine size={14} style={{ color: 'var(--primary)' }} />
                        Verified Guide
                      </span>
                    </div>

                    <h3 className={styles.postTitle}>{article.title}</h3>
                    <p className={styles.postExcerpt}>{article.excerpt}</p>

                    {/* Tag badges */}
                    {article.tags && article.tags.length > 0 && (
                      <div className={styles.tagsRow}>
                        {article.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className={styles.tagPill}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Card Footer */}
                    <div className={styles.cardFooter}>
                      <div className={styles.authorBrief}>
                        <div className={styles.authorAvatar}>{authorInitials}</div>
                        <div>
                          <span className={styles.authorName}>{article.author}</span>
                          <span className={styles.authorRole}>{article.authorRole}</span>
                        </div>
                      </div>

                      <div className={styles.readMoreBtn}>
                        <span>Read Full</span>
                        <RiArrowRightLine size={16} />
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
