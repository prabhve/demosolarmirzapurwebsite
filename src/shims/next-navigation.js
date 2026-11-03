export const useParams = () => ({});
export const usePathname = () => (typeof window !== 'undefined' ? window.location.pathname : '/');
export const useSearchParams = () => (typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams());
export const useRouter = () => ({
  push: (url) => { if (typeof window !== 'undefined') window.location.href = url; },
  replace: (url) => { if (typeof window !== 'undefined') window.location.replace(url); },
  prefetch: () => {},
  back: () => { if (typeof window !== 'undefined') window.history.back(); },
  forward: () => { if (typeof window !== 'undefined') window.history.forward(); },
  refresh: () => { if (typeof window !== 'undefined') window.location.reload(); },
});
export const redirect = (url) => { if (typeof window !== 'undefined') window.location.href = url; };
export const notFound = () => {};

export default {
  useParams,
  usePathname,
  useSearchParams,
  useRouter,
  redirect,
  notFound,
};
