import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Smartphone,
  Sparkles,
  ChevronDown,
  Check,
} from 'lucide-react';
import {
  LUXURY_THEMES,
  LUXURY_THEME_LIST,
  type ThemeId,
} from '../config/themeRegistry';
import { getInvitationConfigForTheme } from '../config/invitationConfig';

interface DesktopPhoneSimulatorProps {
  themeId: ThemeId;
  onBackToCollection: () => void;
  onSelectTheme?: (themeId: ThemeId) => void;
}

/**
 * DESKTOP SMARTPHONE SIMULATOR (Zero-Overlap Studio Layout)
 *
 * - Centered iPhone-proportioned brushed titanium chassis.
 * - Top-left "Back to Collection" button and top-right compact "Explore Editions"
 *   dropdown are constrained strictly to the left and right outer studio margins
 *   so they NEVER overlap the phone frame or screen at 1280x720, 1440x900, or 1920x1080.
 */
export const DesktopPhoneSimulator: React.FC<DesktopPhoneSimulatorProps> = ({
  themeId,
  onBackToCollection,
  onSelectTheme,
}) => {
  const theme = LUXURY_THEMES[themeId] || LUXURY_THEMES.ivory;
  const config = getInvitationConfigForTheme(theme.id);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [phoneSize, setPhoneSize] = useState<{ width: number; height: number }>(() => {
    if (typeof window === 'undefined') return { width: 380, height: 800 };
    const availH = Math.max(580, window.innerHeight - 64);
    const height = Math.min(844, availH);
    const width = Math.max(336, Math.min(402, Math.round(height * (390 / 844))));
    return { width, height };
  });

  useEffect(() => {
    const updateSize = () => {
      const availH = Math.max(580, window.innerHeight - 64);
      const height = Math.min(844, availH);
      const width = Math.max(336, Math.min(402, Math.round(height * (390 / 844))));
      setPhoneSize({ width, height });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = `${config.couple.partnerOne} & ${config.couple.partnerTwo} — ${theme.name} | Mobile Preview`;
    }
  }, [config, theme]);

  // Dismiss dropdown on Escape or outside click
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isDropdownOpen]);

  const iframeSrc = `${theme.route}?embed=mobile`;

  return (
    <div
      style={{ backgroundColor: theme.studioBgColor }}
      className="fixed inset-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden select-none transition-colors duration-700"
    >
      {/* Tasteful Luxury Studio Backdrop Outside the Device */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-all duration-700"
        style={{ background: theme.studioRadialGradient }}
      />

      {/* Ambient Studio Floor Contact Shadow Beneath the Phone */}
      <div
        style={{
          width: `${phoneSize.width + 90}px`,
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.18) 48%, transparent 76%)',
        }}
        className="pointer-events-none absolute bottom-1 z-10 h-10 blur-md"
      />

      {/* Top-Left "Back to Collection" Control Outside the Phone (Strictly in Left Margin) */}
      <div className="fixed left-5 top-5 z-40 flex items-center">
        <button
          type="button"
          onClick={onBackToCollection}
          aria-label="Back to Collection"
          className="lacy-nacre-button inline-flex items-center gap-2 px-4 py-2 font-lacy-serif text-xs font-bold uppercase tracking-[0.22em] text-[#5E4F3E] shadow-md cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#8F6B42]" />
          <span>Back to Collection</span>
        </button>
      </div>

      {/* Top-Right Compact "Explore Editions" Dropdown (Strictly in Right Margin, Never Overlaps Phone) */}
      {onSelectTheme && (
        <div
          ref={dropdownRef}
          data-testid="edition-selector-container"
          className="fixed right-5 top-5 z-40 w-[236px]"
        >
          <button
            type="button"
            data-testid="edition-selector-trigger"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="lacy-nacre-button flex w-full items-center justify-between gap-2 px-4 py-2 font-lacy-serif text-xs font-bold uppercase tracking-[0.18em] text-[#5E4F3E] shadow-md cursor-pointer"
          >
            <span className="truncate">
              Explore Editions · {theme.number}
            </span>
            <ChevronDown
              className={`h-3.5 w-3.5 shrink-0 text-[#8F6B42] transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div
              role="listbox"
              data-testid="edition-selector-menu"
              aria-label="Select Wedding Invitation Edition"
              className="mt-2 w-full overflow-hidden rounded-[20px] border border-[#C9B79C]/85 bg-[#FAF6F0]/98 p-1.5 shadow-[0_20px_50px_rgba(32,22,12,0.38)] backdrop-blur-md"
            >
              {LUXURY_THEME_LIST.map((item) => {
                const isActive = item.id === theme.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setIsDropdownOpen(false);
                      if (item.id !== theme.id) {
                        onSelectTheme(item.id);
                      }
                    }}
                    className={`flex w-full items-center justify-between rounded-[14px] px-3 py-2 text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-[#EFEAE3] text-[#4E4032]'
                        : 'text-[#5E4F3E] hover:bg-[#EFEAE3]/60'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <span className="block font-engraved text-[9px] uppercase tracking-[0.22em] text-[#8F6B42]">
                        Edition {item.number}
                      </span>
                      <span className="block truncate font-lacy-display text-sm font-normal text-[#4E4032]">
                        {item.name}
                      </span>
                    </div>
                    {isActive && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#8F6B42]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Subtle Edition Plaque on Left Desktop Margin */}
      <aside
        aria-label="Edition Details"
        className="pointer-events-none fixed bottom-7 left-5 z-30 hidden xl:flex flex-col w-[236px] rounded-[20px] border border-white/25 bg-black/30 px-4 py-3.5 text-[#FAF6F0] backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center gap-1.5 text-[#E5C98B]">
          <Sparkles className="h-3 w-3" />
          <span className="font-engraved text-[9.5px] uppercase tracking-[0.28em]">
            Edition {theme.number} · {theme.openingStyle}
          </span>
        </div>
        <p className="mt-1 font-lacy-display text-lg leading-tight text-white">
          {theme.name}
        </p>
        <p className="mt-0.5 font-lacy-text text-xs italic text-white/85">
          {config.couple.partnerOneFull || config.couple.partnerOne} &amp;{' '}
          {config.couple.partnerTwoFull || config.couple.partnerTwo}
        </p>
        <p className="mt-0.5 font-lacy-serif text-[10px] uppercase tracking-[0.18em] text-white/70">
          {config.venue.name} · {config.venue.location}
        </p>
      </aside>

      {/* Subtle Mobile Viewport Indicator on Bottom-Right Outside the Phone */}
      <div className="pointer-events-none fixed bottom-7 right-5 z-30 hidden lg:inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3.5 py-1.5 text-[10px] font-lacy-serif uppercase tracking-[0.2em] text-white/85 backdrop-blur-md">
        <Smartphone className="h-3 w-3 text-[#E5C98B]" />
        <span>Interactive Mobile View · {phoneSize.width}×{phoneSize.height}</span>
      </div>

      {/* ====================================================================
          CENTERED REALISTIC SMARTPHONE DEVICE FRAME
         ==================================================================== */}
      <div
        data-testid="desktop-phone-simulator"
        style={{
          width: `${phoneSize.width + 24}px`,
          height: `${phoneSize.height + 24}px`,
        }}
        className="relative z-20 flex items-center justify-center rounded-[50px] bg-gradient-to-b from-[#43403D] via-[#1F1E1D] to-[#2E2C2A] p-[12px] shadow-[0_38px_100px_-14px_rgba(0,0,0,0.68),0_0_0_1px_rgba(255,255,255,0.26)_inset,0_0_0_2px_rgba(16,15,14,0.96)]"
      >
        {/* Left Hardware Buttons */}
        <div className="pointer-events-none absolute -left-[3px] top-[18%] h-7 w-[3px] rounded-l-sm bg-[#4A4744]" />
        <div className="pointer-events-none absolute -left-[3px] top-[27%] h-12 w-[3px] rounded-l-sm bg-[#4A4744]" />
        <div className="pointer-events-none absolute -left-[3px] top-[37%] h-12 w-[3px] rounded-l-sm bg-[#4A4744]" />

        {/* Right Hardware Button */}
        <div className="pointer-events-none absolute -right-[3px] top-[30%] h-16 w-[3px] rounded-r-sm bg-[#4A4744]" />

        {/* Inner Bezel & Isolated Mobile Viewport Screen */}
        <div
          style={{
            width: `${phoneSize.width}px`,
            height: `${phoneSize.height}px`,
          }}
          className="relative overflow-hidden rounded-[40px] bg-black ring-1 ring-white/15"
        >
          {/* Subtle Top Speaker Slit on the Top Bezel Edge */}
          <div className="pointer-events-none absolute left-1/2 top-[5px] z-30 h-[4px] w-14 -translate-x-1/2 rounded-full bg-black/65 ring-1 ring-white/15" />

          {/* Subtle Diagonal Sapphire-Glass Screen Specular Reflection */}
          <div
            style={{
              background:
                'linear-gradient(125deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 28%, transparent 50%)',
            }}
            className="pointer-events-none absolute inset-0 z-25"
          />

          {/* Genuine Mobile Viewport Iframe */}
          <iframe
            key={theme.id}
            src={iframeSrc}
            title={`${theme.name} Mobile Wedding Invitation Preview`}
            style={{
              width: `${phoneSize.width}px`,
              height: `${phoneSize.height}px`,
              border: '0',
            }}
            allow="autoplay"
            className="block h-full w-full overflow-hidden bg-transparent"
          />

          {/* Subtle iOS Home Indicator Bar at Bottom Edge */}
          <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-1 w-28 -translate-x-1/2 rounded-full bg-white/40 mix-blend-difference" />
        </div>
      </div>
    </div>
  );
};
