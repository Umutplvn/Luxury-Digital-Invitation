import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { LUXURY_THEMES, type ThemeId } from './config/themeRegistry';

const InvitationExperiencePage = lazy(() =>
  import('./components/InvitationExperiencePage').then((m) => ({
    default: m.InvitationExperiencePage,
  }))
);

const DesktopPhoneSimulator = lazy(() =>
  import('./components/DesktopPhoneSimulator').then((m) => ({
    default: m.DesktopPhoneSimulator,
  }))
);

const CollectionPreviewPage = lazy(() =>
  import('./components/CollectionPreviewPage').then((m) => ({
    default: m.CollectionPreviewPage,
  }))
);

function resolveRouteTheme(pathname: string, hash: string): ThemeId | null {
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase();
  const cleanHash = hash.replace(/^#\/?/, '').replace(/\/+$/, '').toLowerCase();

  const candidate = (cleanPath.slice(1) || cleanHash) as ThemeId;
  if (candidate && candidate in LUXURY_THEMES) {
    return candidate;
  }
  return null;
}

function checkIsEmbedMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('embed') === 'mobile';
}

function checkIsDesktopViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= 768;
}

export function App() {
  const [activeTheme, setActiveTheme] = useState<ThemeId | null>(() =>
    typeof window !== 'undefined'
      ? resolveRouteTheme(window.location.pathname, window.location.hash)
      : null
  );
  const [openedFromCollection, setOpenedFromCollection] = useState(false);
  const [isEmbedMobile] = useState<boolean>(() => checkIsEmbedMobile());
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean>(() =>
    checkIsDesktopViewport()
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopViewport(checkIsDesktopViewport());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextTheme = resolveRouteTheme(
        window.location.pathname,
        window.location.hash
      );
      setActiveTheme(nextTheme);
      if (!nextTheme) {
        setOpenedFromCollection(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const handleSelectTheme = useCallback((themeId: ThemeId) => {
    const targetRoute = LUXURY_THEMES[themeId].route;
    window.history.pushState({ themeId, fromCollection: true }, '', targetRoute);
    setOpenedFromCollection(true);
    setActiveTheme(themeId);
  }, []);

  const handleNavigateToCollection = useCallback(() => {
    window.history.pushState({}, '', '/');
    setOpenedFromCollection(false);
    setActiveTheme(null);
  }, []);

  return (
    <Suspense fallback={<div className="min-h-[100dvh] w-full bg-[#EFE8DC]" />}>
      {activeTheme ? (
        isDesktopViewport && !isEmbedMobile ? (
          <DesktopPhoneSimulator
            key={`sim-${activeTheme}`}
            themeId={activeTheme}
            onBackToCollection={handleNavigateToCollection}
            onSelectTheme={handleSelectTheme}
          />
        ) : (
          <InvitationExperiencePage
            key={activeTheme}
            themeId={activeTheme}
            onNavigateToCollection={
              !isEmbedMobile && openedFromCollection
                ? handleNavigateToCollection
                : undefined
            }
          />
        )
      ) : (
        <CollectionPreviewPage onSelectTheme={handleSelectTheme} />
      )}
    </Suspense>
  );
}

export default App;
