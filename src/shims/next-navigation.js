import { useState, useEffect, useMemo } from 'react';

function notifyLocationChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('app_navigation_change'));
  }
}

export function usePathname() {
  const [pathname, setPathname] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handle = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', handle);
    window.addEventListener('app_navigation_change', handle);
    return () => {
      window.removeEventListener('popstate', handle);
      window.removeEventListener('app_navigation_change', handle);
    };
  }, []);

  return pathname;
}

export function useParams() {
  const pathname = usePathname();
  return useMemo(() => {
    const blogMatch = pathname.match(/^\/blog\/([^/]+)/);
    if (blogMatch) {
      return { slug: decodeURIComponent(blogMatch[1]) };
    }
    return {};
  }, [pathname]);
}

export function useSearchParams() {
  const [search, setSearch] = useState(() =>
    typeof window !== 'undefined' ? window.location.search : ''
  );

  useEffect(() => {
    const handle = () => setSearch(window.location.search);
    window.addEventListener('popstate', handle);
    window.addEventListener('app_navigation_change', handle);
    return () => {
      window.removeEventListener('popstate', handle);
      window.removeEventListener('app_navigation_change', handle);
    };
  }, []);

  return useMemo(() => new URLSearchParams(search), [search]);
}

export function useRouter() {
  return useMemo(
    () => ({
      push: (url) => {
        if (typeof window === 'undefined') return;
        if (url.startsWith('#')) {
          const el = document.querySelector(url);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
        window.history.pushState({}, '', url);
        notifyLocationChange();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      replace: (url) => {
        if (typeof window === 'undefined') return;
        window.history.replaceState({}, '', url);
        notifyLocationChange();
      },
      back: () => {
        if (typeof window !== 'undefined') window.history.back();
      },
      forward: () => {
        if (typeof window !== 'undefined') window.history.forward();
      },
      refresh: () => {
        if (typeof window !== 'undefined') window.location.reload();
      },
      prefetch: () => {},
    }),
    []
  );
}

export const redirect = (url) => {
  if (typeof window !== 'undefined') {
    window.history.pushState({}, '', url);
    notifyLocationChange();
  }
};

export const notFound = () => {};

export default {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
  redirect,
  notFound,
};
