'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  RiArrowLeftLine,
  RiTimeLine,
  RiCalendarLine,
  RiCheckDoubleLine,
  RiShareLine,
  RiWhatsappLine,
  RiFileCopyLine,
  RiCheckLine,
  RiFlashlightLine,
  RiShieldCheckLine,
  RiArrowRightLine,
} from 'react-icons/ri';
import { useSiteData } from '../../../context/SiteDataContext';
import styles from '../../../components/Blog/BlogPost.module.css';

// Markdown parser helper for editorial solar articles
function renderArticleContent(rawText) {
  if (!rawText) return null;

  const lines = rawText.trim().split('\n');
  const elements = [];
  let tableRows = [];
  let inTable = false;
  let currentList = [];
  let listType = null; // 'ul' or 'ol'

  const flushList = () => {
    if (currentList.length > 0) {
      if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${elements.length}`}>
            {currentList.map((item, i) => (
              <li key={i}>{formatInline(item)}</li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`}>
            {currentList.map((item, i) => (
              <li key={i}>{formatInline(item)}</li>
            ))}
          </ul>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const bodyRows = tableRows.slice(1).filter((r) => !r.every((c) => c.match(/^:?-+:?$/)));

      elements.push(
        <div key={`table-${elements.length}`} className={styles.tableWrapper}>
          <table className={styles.contentTable}>
            <thead>
              <tr>
                {headerRow.map((cell, i) => (
                  <th key={i}>{formatInline(cell.trim())}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>{formatInline(cell.trim())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  const formatInline = (text) => {
    if (!text) return '';
    // Format bold **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Empty line
    if (!line) {
      flushList();
      flushTable();
      continue;
    }

    // Markdown Table row
    if (line.startsWith('|') && line.endsWith('|')) {
      flushList();
      inTable = true;
      const cells = line
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim());
      // Skip markdown divider row like |:---|:---|
      if (cells.every((c) => c.match(/^:?-+:?$/))) {
        continue;
      }
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable();
    }

    // Heading 3
    if (line.startsWith('### ')) {
      flushList();
      flushTable();
      elements.push(
        <h3 key={`h3-${i}`}>{formatInline(line.replace('### ', ''))}</h3>
      );
      continue;
    }

    // Heading 4
    if (line.startsWith('#### ')) {
      flushList();
      flushTable();
      elements.push(
        <h4 key={`h4-${i}`}>{formatInline(line.replace('#### ', ''))}</h4>
      );
      continue;
    }

    // Ordered list item (e.g. 1. 2.)
    const olMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      flushTable();
      if (listType !== 'ol') {
        flushList();
        listType = 'ol';
      }
      currentList.push(olMatch[2]);
      continue;
    }

    // Unordered list item (- or *)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushTable();
      if (listType !== 'ul') {
        flushList();
        listType = 'ul';
      }
      currentList.push(line.replace(/^[-*]\s+/, ''));
      continue;
    }

    // Regular paragraph
    flushList();
    flushTable();
    elements.push(
      <p key={`p-${i}`}>{formatInline(line)}</p>
    );
  }

  flushList();
  flushTable();

  return elements;
}

export default function BlogPostPage(props) {
  const router = useRouter();
  const params = useParams();

  // Support both props.params.slug and useParams().slug
  const targetSlug = props?.params?.slug || params?.slug;

  const { siteData } = useSiteData();
  const rawArticles = siteData?.articles || [];
  const cleanPhone = (siteData?.header?.phone || '+91 9670215052').replace(/[^0-9]/g, '');

  const [copiedLink, setCopiedLink] = useState(false);

  const article = useMemo(() => {
    if (!targetSlug) return rawArticles[0] || null;
    return rawArticles.find((a) => a.slug === targetSlug) || null;
  }, [rawArticles, targetSlug]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return rawArticles.filter((a) => a.id !== article.id).slice(0, 2);
  }, [rawArticles, article]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleBack = () => {
    router.push('/#blog');
  };

  if (!article) {
    return (
      <main className={styles.postContainer}>
        <div className={styles.inner}>
          <div className={styles.notFoundCard}>
            <h2 className={styles.notFoundTitle}>Article Not Found</h2>
            <p className={styles.notFoundText}>
              The solar guide or news post you are looking for may have moved or been updated.
            </p>
            <button type="button" className={styles.backBtn} onClick={handleBack}>
              <RiArrowLeftLine size={16} />
              <span>Return to All Solar Articles</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://maavindhyavasinisolar.in/blog/${article.slug}`;
  const whatsappShareText = encodeURIComponent(
    `Read this solar guide from Maa Vindhyavasini Enterprises: "${article.title}" - ${shareUrl}`
  );

  const authorInitials = (article.author || 'MVE')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('');

  return (
    <main className={styles.postContainer}>
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Breadcrumb Navigation */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <button type="button" className={styles.breadcrumbLink} onClick={() => router.push('/')}>
            Home
          </button>
          <span>/</span>
          <button type="button" className={styles.breadcrumbLink} onClick={handleBack}>
            Articles
          </button>
          <span>/</span>
          <span className={styles.breadcrumbCurrent}>{article.title}</span>
        </nav>

        {/* Back Button */}
        <button type="button" className={styles.backBtn} onClick={handleBack}>
          <RiArrowLeftLine size={16} />
          <span>Back to All Articles</span>
        </button>

        {/* Post Header */}
        <header className={styles.header}>
          <span className={styles.categoryBadge}>{article.category}</span>
          <h1 className={styles.headline}>{article.title}</h1>

          {/* Author & Meta Bar */}
          <div className={styles.authorMetaBar}>
            <div className={styles.authorProfile}>
              <div className={styles.authorAvatar}>{authorInitials}</div>
              <div>
                <span className={styles.authorName}>{article.author}</span>
                <span className={styles.authorRole}>{article.authorRole}</span>
              </div>
            </div>

            <div className={styles.metaInfoGroup}>
              <span className={styles.metaBadge}>
                <RiCalendarLine size={15} />
                <span>Published: {article.date}</span>
              </span>
              <span>•</span>
              <span className={styles.metaBadge}>
                <RiTimeLine size={15} />
                <span>{article.readTime}</span>
              </span>
              <span>•</span>
              <span className={styles.metaBadge} style={{ color: 'var(--primary)' }}>
                <RiShieldCheckLine size={15} />
                <span>Verified EPC Publication</span>
              </span>
            </div>
          </div>
        </header>

        {/* Featured Hero Image */}
        <div className={styles.heroImageWrap}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className={styles.heroImage}
          />
        </div>

        {/* Executive Summary / Key Takeaways Box */}
        {article.keyTakeaways && article.keyTakeaways.length > 0 && (
          <div className={styles.takeawaysBox}>
            <h3 className={styles.takeawaysTitle}>
              <RiCheckDoubleLine size={20} />
              <span>Key Takeaways &amp; Executive Summary</span>
            </h3>
            <ul className={styles.takeawaysList}>
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className={styles.takeawayItem}>
                  <RiFlashlightLine size={18} className={styles.takeawayIcon} />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Editorial Article Body */}
        <article className={styles.contentBody}>
          {renderArticleContent(article.content)}
        </article>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className={styles.tagsContainer}>
            <span className={styles.tagLabel}>Topics Covered:</span>
            {article.tags.map((tag) => (
              <span key={tag} className={styles.tagPill}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Social Share & Link Bar */}
        <div className={styles.shareBar}>
          <span className={styles.shareTitle}>Share this Solar Guide</span>
          <div className={styles.shareButtons}>
            <a
              href={`https://wa.me/?text=${whatsappShareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappShareBtn}
              title="Share via WhatsApp"
            >
              <RiWhatsappLine size={18} />
              <span>Share on WhatsApp</span>
            </a>

            <button type="button" className={styles.copyLinkBtn} onClick={handleCopyLink}>
              {copiedLink ? (
                <>
                  <RiCheckLine size={16} style={{ color: '#16A34A' }} />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <RiFileCopyLine size={16} />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Consultation Callout Banner */}
        <div className={styles.consultationBanner}>
          <div className={styles.bannerText}>
            <h3 className={styles.bannerTitle}>
              Ready for Zero Electricity Bills in Mirzapur?
            </h3>
            <p className={styles.bannerSubtitle}>
              Get a customized solar engineering feasibility report, PM Surya Ghar ₹78,000 subsidy assistance, and official UPPCL net-metering liaisoning from certified local engineers.
            </p>
          </div>
          <a
            href={`https://wa.me/${cleanPhone}?text=Hello%20Maa%20Vindhyavasini%20Enterprises!%20I%20read%20your%20article%20'${encodeURIComponent(
              article.title
            )}'%20and%20would%20like%20a%20free%20solar%20consultation%20for%20my%20premises.`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bannerCta}
          >
            <RiWhatsappLine size={20} />
            <span>Consult EPC Engineer</span>
          </a>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <h3 className={styles.relatedTitle}>Related Solar Articles &amp; Guides</h3>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id || rel.slug}
                  className={styles.relatedCard}
                  onClick={() => router.push(`/blog/${rel.slug}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') router.push(`/blog/${rel.slug}`);
                  }}
                >
                  <div className={styles.relatedCardCategory}>{rel.category}</div>
                  <h4 className={styles.relatedCardTitle}>{rel.title}</h4>
                  <p className={styles.relatedCardExcerpt}>{rel.excerpt}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </main>
  );
}
