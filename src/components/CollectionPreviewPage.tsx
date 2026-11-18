import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ArrowUpRight,
  Music,
  Calendar,
  MapPin,
  Layers,
  Compass,
  Feather,
  Clock,
  Smartphone,
} from 'lucide-react';
import { getInvitationConfigForTheme } from '../config/invitationConfig';
import {
  LUXURY_THEME_LIST,
  LUXURY_THEMES,
  type LuxuryThemeSpec,
  type ThemeId,
} from '../config/themeRegistry';
import { LacyDiamondGemSvg } from './CoutureArtAssets';

interface CollectionPreviewPageProps {
  onSelectTheme: (themeId: ThemeId) => void;
}

const ClosedCoverMiniature: React.FC<{
  theme: LuxuryThemeSpec;
}> = ({ theme }) => {
  const cfg = getInvitationConfigForTheme(theme.id);

  if (theme.id === 'ivory') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#EFEAE3]">
        <img
          src="/assets/lacy/poster-full.jpg"
          alt={`${theme.name} closed cover`}
          loading="lazy"
          draggable={false}
          className="h-full w-full object-cover"
        />
        <div
          style={{
            left: '49.1%',
            top: '50.4%',
            transform: 'translate(-50%, -50%)',
          }}
          className="absolute z-10 w-[26%]"
        >
          <img
            src={theme.assets.sealCameo}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-auto w-full object-contain drop-shadow-[0_8px_16px_rgba(58,44,30,0.3)]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-[8.5%] z-10 flex justify-center">
          <span className="lacy-nacre-button px-3.5 py-1 font-lacy-serif text-[8.5px] font-bold uppercase tracking-[0.26em] text-[#5E4F3E]">
            {cfg.envelope.tapPrompt}
          </span>
        </div>
      </div>
    );
  }

  if (theme.id === 'blush') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#F4DCD5]">
        <img
          src="/assets/themes/blush/cover-texture.webp"
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <svg viewBox="0 0 400 680" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <polyline points="0,112 200,344 0,680" fill="none" stroke="#C47D72" strokeWidth="2.2" />
          <polyline points="400,112 200,344 400,680" fill="none" stroke="#C47D72" strokeWidth="2.2" />
          <polygon points="0,680 152,328 248,328 400,680" fill="#FFF7F5" fillOpacity="0.6" stroke="#C47D72" strokeWidth="2.2" />
          <path d="M 0,0 L 400,0 L 222,302 Q 200,328 178,302 Z" fill="#FFF9F6" fillOpacity="0.45" stroke="#C47D72" strokeWidth="2.4" />
        </svg>
        <div className="absolute inset-x-5 top-[12%] z-10 flex flex-col items-center rounded-[12px] border border-[#C47D72]/60 bg-[#FFFDFB]/90 py-1.5 text-center shadow-xs">
          <span className="font-engraved text-[6.5px] uppercase tracking-[0.26em] text-[#5B735D]">
            {cfg.eventType}
          </span>
          <span className="font-lacy-script text-lg text-[#593A36]">
            {cfg.couple.partnerOne} &amp; {cfg.couple.partnerTwo}
          </span>
        </div>
        <div className="absolute left-1/2 top-[48.5%] z-10 w-[26%] -translate-x-1/2 -translate-y-1/2">
          <img
            src={theme.assets.sealCameo}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-auto w-full object-contain drop-shadow-[0_8px_16px_rgba(92,46,38,0.34)]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-[6.5%] z-10 flex justify-center">
          <span className="blush-nacre-button px-3 py-1 font-lacy-serif text-[8px] font-bold uppercase tracking-[0.22em] text-[#5D3F3B]">
            {cfg.envelope.tapPrompt}
          </span>
        </div>
      </div>
    );
  }

  if (theme.id === 'emerald') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#0C261C]">
        <img
          src="/assets/themes/emerald/cover-texture.webp"
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          style={{
            background: 'linear-gradient(90deg, #071912 0%, #143B2C 45%, #06150E 100%)',
            borderRight: '2px solid #C9A461',
          }}
          className="absolute inset-y-0 left-0 z-20 w-[8%]"
        />
        <div className="absolute inset-y-[4%] left-[12%] right-[5%] rounded-[8px] border-2 border-[#C9A461]/85" />
        <div className="absolute inset-x-[16%] top-[16%] z-10 flex flex-col items-center rounded-[10px] border border-[#C9A461]/60 bg-[#0A2118]/88 py-1.5 text-center shadow-md">
          <span className="font-engraved text-[6.5px] uppercase tracking-[0.28em] text-[#E5C98B]">
            {cfg.eventType}
          </span>
          <span className="mt-0.5 font-engraved text-xs tracking-[0.06em] text-[#FAF0D7]">
            {cfg.couple.partnerOne} &amp; {cfg.couple.partnerTwo}
          </span>
        </div>
        <div className="absolute left-[52.5%] top-[51%] z-10 w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#0B241A] p-0.5 ring-2 ring-[#F5E0A6]">
          <img src={theme.assets.sealCameo} alt="" loading="lazy" draggable={false} className="h-auto w-full object-contain" />
        </div>
        <div className="absolute inset-x-0 bottom-[7.5%] z-10 flex justify-center">
          <span className="emerald-nacre-button px-3 py-1 font-engraved text-[7.5px] font-semibold uppercase tracking-[0.22em] text-[#F4E6C6]">
            {cfg.envelope.tapPrompt}
          </span>
        </div>
      </div>
    );
  }

  if (theme.id === 'golden-rose') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#3B2212]">
        <img
          src="/assets/themes/golden-rose/cover-texture.webp"
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <svg viewBox="0 0 400 720" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="miniSunbeam" cx="50%" cy="48%" r="52%">
              <stop offset="0%" stopColor="#FFF7DF" stopOpacity="0.92" />
              <stop offset="28%" stopColor="#F0B862" stopOpacity="0.72" />
              <stop offset="68%" stopColor="#6E3E1B" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#3B2111" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <polygon points="0,0 212,356 0,720" fill="rgba(54,30,14,0.22)" stroke="#F5D08A" strokeWidth="2.2" />
          <polygon points="400,0 188,356 400,720" fill="rgba(54,30,14,0.22)" stroke="#F5D08A" strokeWidth="2.2" />
          <polygon points="0,720 200,336 400,720" fill="url(#miniSunbeam)" stroke="#F7D58B" strokeWidth="2.4" />
          <polygon points="0,0 400,0 200,348" fill="rgba(138,76,44,0.4)" stroke="#F7D58B" strokeWidth="2.4" />
        </svg>
        <div className="absolute inset-x-6 top-[9%] z-10 flex flex-col items-center rounded-[10px] border border-[#F5D08A]/75 bg-[#361C0E]/88 py-1 text-center shadow-md">
          <span className="font-engraved text-[6px] uppercase tracking-[0.26em] text-[#F5D08A]">
            {cfg.venue.name}
          </span>
          <span className="font-lacy-display text-xs text-[#FFF6E5]">
            {cfg.couple.partnerOne} &amp; {cfg.couple.partnerTwo}
          </span>
        </div>
        <div
          style={{
            background:
              'radial-gradient(circle at 36% 30%, #FFFDF9 0%, #F4EAE0 48%, #DECBB8 82%, #BEA58E 100%)',
          }}
          className="absolute left-1/2 top-[48%] z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#F5D08A] shadow-[0_10px_24px_rgba(24,10,3,0.72)]"
        >
          <span className="font-lacy-script text-lg text-[#7A5934]">
            {cfg.couple.monogramInitialOne} &amp; {cfg.couple.monogramInitialTwo}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-[7.5%] z-10 flex justify-center">
          <span className="lacy-nacre-button px-3 py-1 font-lacy-serif text-[8px] font-bold uppercase tracking-[0.22em] text-[#4A2C18]">
            {cfg.envelope.tapPrompt}
          </span>
        </div>
      </div>
    );
  }

  if (theme.id === 'noir') {
    return (
      <div className="relative h-full w-full overflow-hidden bg-[#FAF7F2]">
        <img
          src="/assets/themes/noir/cover-texture.webp"
          alt=""
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-3 border-[1.5px] border-[#231F20]" />
        <div className="absolute inset-4.5 border border-[#C59B58]" />
        <div className="absolute inset-x-0 top-1/2 h-[1.5px] -translate-y-1/2 bg-[#231F20]" />
        <div className="absolute inset-x-5 top-[17%] z-10 flex flex-col items-center border border-[#231F20] bg-[#FFFDFB]/95 py-1.5 text-center shadow-sm">
          <span className="font-sans-luxury text-[6.5px] font-medium uppercase tracking-[0.34em] text-[#9E7638]">
            {cfg.eventType}
          </span>
          <span className="mt-1 font-lacy-display text-sm uppercase tracking-[0.12em] text-[#231F20]">
            {cfg.couple.partnerOne} &amp; {cfg.couple.partnerTwo}
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 z-10 flex h-18 w-18 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[16px] border-2 border-[#231F20] bg-[#FFFDFB] shadow-[0_10px_24px_rgba(42,32,24,0.22)]">
          <span className="font-sans-luxury text-[5.5px] font-medium uppercase tracking-[0.25em] text-[#9E7638]">
            FIFTH AVE
          </span>
          <span className="font-lacy-display text-base text-[#231F20]">
            {cfg.couple.monogramInitialOne} &amp; {cfg.couple.monogramInitialTwo}
          </span>
        </div>
        <div className="absolute inset-x-0 bottom-[7.5%] z-10 flex justify-center">
          <span className="noir-nacre-button px-3 py-1 font-sans-luxury text-[7.5px] font-medium uppercase tracking-[0.24em] text-[#231F20]">
            {cfg.envelope.tapPrompt}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#527292]">
      <img
        src="/assets/themes/chateau-blue/cover-texture.webp"
        alt=""
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-y-0 left-0 w-[52%] border-r-2 border-[#C4A265] bg-[#4A6888]/35 shadow-[10px_0_24px_rgba(20,34,50,0.4)]" />
      <div className="absolute inset-3.5 rounded-[10px] border-2 border-[#C4A265]" />
      <div className="absolute inset-x-5 top-[15%] z-10 flex flex-col items-center rounded-[12px] border border-[#C4A265] bg-[#FAFBFD]/94 py-1.5 text-center shadow-md">
        <span className="font-engraved text-[6.5px] uppercase tracking-[0.26em] text-[#8C6B32]">
          {cfg.eventType}
        </span>
        <span className="mt-0.5 font-lacy-display text-xs text-[#213448]">
          {cfg.couple.partnerOne} &amp; {cfg.couple.partnerTwo}
        </span>
      </div>
      <div
        style={{
          background:
            'linear-gradient(180deg, #E2EBF5 0%, #FFFFFF 50%, #CFDCEB 100%)',
          borderTop: '1.5px solid #C4A265',
          borderBottom: '1.5px solid #C4A265',
        }}
        className="absolute inset-x-0 top-1/2 h-6 -translate-y-1/2"
      />
      <div className="absolute left-1/2 top-1/2 z-10 w-[25%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[#FAFBFD] p-0.5 ring-2 ring-[#C4A265]">
        <img src={theme.assets.sealCameo} alt="" loading="lazy" draggable={false} className="h-auto w-full object-contain" />
      </div>
      <div className="absolute inset-x-0 bottom-[7.5%] z-10 flex justify-center">
        <span className="chateau-nacre-button px-3 py-1 font-lacy-serif text-[8px] font-bold uppercase tracking-[0.22em] text-[#213448]">
          {cfg.envelope.tapPrompt}
        </span>
      </div>
    </div>
  );
};

export const CollectionPreviewPage: React.FC<CollectionPreviewPageProps> = ({
  onSelectTheme,
}) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title =
        'CodeMyVision — The Wedding Invitation Collection | Bespoke Digital Wedding Invitations';
    }
  }, []);

  return (
    <div
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, #FCF9F4 0%, #F1EAE0 48%, #E2D6C5 100%)',
      }}
      className="min-h-[100dvh] w-full text-[#4E4032] selection:bg-[#B28A5D]/20"
    >
      {/* ====================================================================
          STICKY LUXURY BOUTIQUE NAVIGATION BAR
         ==================================================================== */}
      <nav
        aria-label="Primary Navigation"
        className="sticky top-0 z-40 border-b border-[#D8CBB8]/80 bg-[#FAF6F0]/88 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-8">
          <a
            href="#top"
            className="flex items-center gap-2.5 text-left group"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B28A5D]/50 bg-[#EFEAE3] text-[#8F6B42]">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <span className="block font-engraved text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#4E4032]">
                CodeMyVision
              </span>
              <span className="block font-lacy-serif text-[10px] italic tracking-[0.06em] text-[#7D6A56]">
                The Wedding Invitation Collection
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-7 font-lacy-serif text-xs font-semibold uppercase tracking-[0.22em] text-[#655645]">
            <a href="#collection" className="hover:text-[#8F6B42] transition">
              The Collection
            </a>
            <a href="#art-of-invitation" className="hover:text-[#8F6B42] transition">
              The Art
            </a>
            <a href="#personalization" className="hover:text-[#8F6B42] transition">
              Personalization
            </a>
            <a href="#how-it-works" className="hover:text-[#8F6B42] transition">
              How It Works
            </a>
          </div>

          <a
            href="https://codemyvision.com"
            target="_blank"
            rel="noopener noreferrer"
            className="lacy-nacre-button inline-flex items-center gap-1.5 px-4 py-2 font-lacy-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#5E4F3E]"
          >
            <span>Create Your Invitation</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#8F6B42]" />
          </a>
        </div>
      </nav>

      {/* ====================================================================
          1. CINEMATIC HERO SECTION
         ==================================================================== */}
      <header
        id="top"
        className="relative mx-auto max-w-7xl px-6 pt-12 pb-16 sm:pt-20 sm:pb-24"
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Editorial Copy Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B28A5D]/40 bg-[#FAF6F0]/90 px-4 py-1.5 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#8F6B42]" />
              <span className="font-engraved text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8F6B42]">
                Bespoke Digital Wedding Invitations
              </span>
            </div>

            <h1 className="lacy-debossed-name mt-6 font-lacy-display text-4xl sm:text-6xl lg:text-[4.1rem] font-normal leading-[1.06] tracking-[-0.015em]">
              An Invitation Worth Remembering.
            </h1>

            <p className="mx-auto lg:mx-0 mt-5 max-w-xl font-lacy-text text-lg sm:text-xl italic leading-relaxed text-[#655645]">
              Six distinctive wedding experiences, thoughtfully crafted to make
              your special day unforgettable.
            </p>

            <p className="mx-auto lg:mx-0 mt-4 max-w-xl font-lacy-serif text-sm sm:text-base leading-relaxed text-[#5E4F3E]">
              Designed by CodeMyVision as tactile digital haute papeterie. Each
              edition pairs a signature 3D opening ceremony with custom venue
              artwork, original instrumental music, live wedding countdowns, and
              seamless guest calendar and map integration.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#collection"
                className="lacy-nacre-button inline-flex items-center gap-2 px-7 py-3.5 font-lacy-serif text-xs sm:text-[13px] font-bold uppercase tracking-[0.26em] text-[#5E4F3E]"
              >
                <span>Explore the Collection</span>
              </a>

              <button
                type="button"
                onClick={() => onSelectTheme('ivory')}
                className="inline-flex items-center gap-2 rounded-full border border-[#8F6B42]/55 bg-transparent px-6 py-3.5 font-lacy-serif text-xs sm:text-[13px] font-bold uppercase tracking-[0.24em] text-[#5E4F3E] hover:bg-[#FAF6F0] transition cursor-pointer"
              >
                <span>Experience The Ivory</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#8F6B42]" />
              </button>
            </div>
          </div>

          {/* Interactive Hero Triptych Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative flex w-full max-w-[420px] items-center justify-center py-4">
              {/* Left Tilted Edition (The Blush) */}
              <div
                onClick={() => onSelectTheme('blush')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectTheme('blush');
                }}
                aria-label="Experience The Blush invitation"
                className="hidden sm:block absolute -left-4 top-10 z-10 w-[44%] aspect-[9/16] -rotate-6 cursor-pointer overflow-hidden rounded-[16px] border border-[#C9B79C] shadow-[0_20px_45px_rgba(58,44,30,0.25)] transition-transform duration-500 hover:-translate-y-2"
              >
                <ClosedCoverMiniature theme={LUXURY_THEMES.blush} />
              </div>

              {/* Center Featured Edition (The Ivory) */}
              <div
                onClick={() => onSelectTheme('ivory')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectTheme('ivory');
                }}
                aria-label="Experience The Ivory invitation"
                className="relative z-20 w-[62%] sm:w-[56%] aspect-[9/16] cursor-pointer overflow-hidden rounded-[20px] border-2 border-[#B28A5D]/70 shadow-[0_32px_70px_rgba(58,44,30,0.38)] transition-transform duration-500 hover:scale-[1.02]"
              >
                <ClosedCoverMiniature theme={LUXURY_THEMES.ivory} />
              </div>

              {/* Right Tilted Edition (The Emerald) */}
              <div
                onClick={() => onSelectTheme('golden-rose')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectTheme('golden-rose');
                }}
                aria-label="Experience The Golden Rose invitation"
                className="hidden sm:block absolute -right-4 top-10 z-10 w-[44%] aspect-[9/16] rotate-6 cursor-pointer overflow-hidden rounded-[16px] border border-[#C9A461]/70 shadow-[0_20px_45px_rgba(12,34,25,0.35)] transition-transform duration-500 hover:-translate-y-2"
              >
                <ClosedCoverMiniature theme={LUXURY_THEMES['golden-rose']} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. THE ART OF THE INVITATION SECTION
         ==================================================================== */}
      <section
        id="art-of-invitation"
        className="border-y border-[#D8CBB8] bg-[#FAF7F2]/85 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="font-engraved text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#8F6B42]">
              The Art of the Invitation
            </span>
            <h2 className="lacy-debossed-name mt-2 font-lacy-display text-3xl sm:text-4xl font-normal">
              Where Fine Stationery Meets Choreographed Motion
            </h2>
            <p className="mx-auto mt-3 max-w-2xl font-lacy-text text-base sm:text-lg italic text-[#655645]">
              Every edition in the CodeMyVision collection is engineered as a
              tactile keepsake—preserving the ceremony of physical couture
              stationery with effortless mobile convenience.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Layers,
                title: 'Tactile Opening Ceremonies',
                description:
                  'French lace gatefolds, botanical envelopes, heraldic wax seals, Art Deco monoliths, and porcelain-silk ribbons choreographed to a 5.45-second reveal.',
              },
              {
                icon: Feather,
                title: 'Six Distinct Worlds',
                description:
                  'Each edition features its own bespoke typography system, custom architectural or botanical venue artwork, and curated paper textures.',
              },
              {
                icon: Music,
                title: 'Original Musical Scores',
                description:
                  'Every invitation is paired with an atmospheric, royalty-free instrumental composition—from Celtic harp and chamber strings to Manhattan jazz.',
              },
              {
                icon: Smartphone,
                title: 'Stationary-Card Architecture',
                description:
                  'Designed mobile-first with smooth upward section transitions, zero layout shift, Google Maps directions, and instant .ics calendar downloads.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[22px] border border-[#D8CBB8] bg-[#FFFDF9]/90 p-6 shadow-xs"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B28A5D]/40 bg-[#EFEAE3] text-[#8F6B42]">
                  <item.icon className="h-4 w-4" />
                </div>
                <h3 className="lacy-debossed-name mt-4 font-lacy-display text-xl font-normal">
                  {item.title}
                </h3>
                <p className="mt-2 font-lacy-text text-sm leading-relaxed text-[#5E4F3E]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. FIVE DISTINCTIVE EXPERIENCES (COLLECTION SHOWCASE)
         ==================================================================== */}
      <main id="collection" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="text-center mb-12">
          <span className="font-engraved text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#8F6B42]">
            Six Distinctive Experiences
          </span>
          <h2 className="lacy-debossed-name mt-2 font-lacy-display text-3xl sm:text-5xl font-normal">
            The Curated Edition Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-lacy-text text-base sm:text-lg italic text-[#655645]">
            Select any edition below to launch the complete interactive wedding
            invitation—including its opening ceremony, 4-section suite, audio
            score, destination map, and live countdown.
          </p>
          <div className="mt-5 flex items-center justify-center gap-3 text-[#B28A5D]">
            <span className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent to-[#B28A5D]" />
            <LacyDiamondGemSvg className="h-3.5 w-3.5" />
            <span className="h-[1px] w-16 sm:w-24 bg-gradient-to-l from-transparent to-[#B28A5D]" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {LUXURY_THEME_LIST.map((theme, idx) => {
            const cfg = getInvitationConfigForTheme(theme.id);
            return (
              <motion.article
                key={theme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between rounded-[28px] border border-[#C9B79C]/60 bg-[#FAF7F2]/95 p-6 shadow-[0_24px_60px_-15px_rgba(58,44,30,0.16)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#B28A5D] hover:shadow-[0_32px_75px_-12px_rgba(58,44,30,0.24)]"
              >
                <div>
                  {/* Edition Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-engraved text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8F6B42]">
                      Edition {theme.number}
                    </span>
                    <span className="rounded-full border border-[#B28A5D]/40 bg-[#EFEAE3] px-3 py-1 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.18em] text-[#5E4F3E]">
                      {theme.openingStyle}
                    </span>
                  </div>

                  <h3 className="lacy-debossed-name mt-2 font-lacy-display text-2xl sm:text-[1.75rem] font-normal">
                    {theme.name}
                  </h3>
                  <p className="font-lacy-serif text-xs font-semibold uppercase tracking-[0.16em] text-[#8F6B42]">
                    {theme.themeTitle}
                  </p>
                  <p className="mt-1 font-lacy-text text-xs italic text-[#655645]">
                    {cfg.couple.partnerOneFull || cfg.couple.partnerOne} &amp;{' '}
                    {cfg.couple.partnerTwoFull || cfg.couple.partnerTwo} · {cfg.venue.name},{' '}
                    {cfg.venue.location}
                  </p>

                  {/* Closed-Cover 9:16 Preview Stage */}
                  <div
                    onClick={() => onSelectTheme(theme.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectTheme(theme.id);
                      }
                    }}
                    aria-label={`Experience ${theme.name} (${theme.openingStyle})`}
                    style={{ background: theme.studioRadialGradient }}
                    className="relative mt-4 flex aspect-[4/5] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[20px] p-5 shadow-inner"
                  >
                    <div className="relative h-full aspect-[9/16] overflow-hidden rounded-[14px] shadow-[0_20px_45px_rgba(0,0,0,0.32)] transition-transform duration-500 group-hover:scale-[1.03]">
                      <ClosedCoverMiniature theme={theme} />
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 font-lacy-text text-sm leading-relaxed text-[#5E4F3E]">
                    {theme.shortDescription}
                  </p>

                  {/* Audio Score Badge */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#DFD3C3] bg-[#F4EFE6]/80 px-3 py-1.5">
                    <Music className="h-3.5 w-3.5 shrink-0 text-[#8F6B42]" />
                    <span className="truncate font-lacy-serif text-[11px] font-medium text-[#5E4F3E]">
                      {cfg.audio.trackTitle}
                    </span>
                  </div>
                </div>

                <div className="mt-5 border-t border-[#DFD3C3] pt-4">
                  {/* Colour Palette Swatches */}
                  <div className="flex items-center justify-between">
                    <span className="font-engraved text-[9.5px] uppercase tracking-[0.24em] text-[#7D6A56]">
                      Atelier Palette
                    </span>
                    <div className="flex items-center gap-2">
                      {theme.palette.map((swatch) => (
                        <div
                          key={swatch.name}
                          title={`${swatch.name} (${swatch.hex})`}
                          className="flex items-center gap-1"
                        >
                          <span
                            style={{ backgroundColor: swatch.hex }}
                            className="h-4 w-4 rounded-full border border-black/20 shadow-xs"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                    {theme.palette.map((swatch) => (
                      <span
                        key={swatch.name}
                        className="font-lacy-serif text-[10px] text-[#7D6A56]"
                      >
                        {swatch.name}
                      </span>
                    ))}
                  </div>

                  {/* Working Experience Invitation CTA */}
                  <a
                    href={theme.route}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTheme(theme.id);
                    }}
                    className="lacy-nacre-button mt-4 inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 font-lacy-serif text-xs font-bold uppercase tracking-[0.24em] text-[#5E4F3E] cursor-pointer"
                  >
                    <span>Experience Invitation</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#8F6B42]" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </main>

      {/* ====================================================================
          4. CRAFTED FOR YOUR STORY & PERSONALIZATION POSSIBILITIES
         ==================================================================== */}
      <section
        id="personalization"
        className="border-t border-[#D8CBB8] bg-[#FAF7F2]/90 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="font-engraved text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#8F6B42]">
                Crafted for Your Story
              </span>
              <h2 className="lacy-debossed-name mt-2 font-lacy-display text-3xl sm:text-4xl font-normal leading-tight">
                Personalization Possibilities
              </h2>
              <p className="mt-4 font-lacy-text text-base leading-relaxed text-[#5E4F3E]">
                Every couple’s celebration is singular. When you commission a
                digital wedding invitation with CodeMyVision, our atelier
                tailors every detail of your chosen edition to your venue,
                schedule, and aesthetic vision.
              </p>
              <div className="mt-6">
                <a
                  href="https://codemyvision.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lacy-nacre-button inline-flex items-center gap-2 px-6 py-3 font-lacy-serif text-xs font-bold uppercase tracking-[0.24em] text-[#5E4F3E]"
                >
                  <span>Enquire About Customisation</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#8F6B42]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Compass,
                  title: 'Bespoke Venue Artwork',
                  text: 'Custom architectural or botanical illustrations of your ceremony and reception estate, framed within your edition’s signature border.',
                },
                {
                  icon: Calendar,
                  title: 'Tailored Order of the Day',
                  text: 'Your complete wedding programme, dress code notes, family introductions, and one-tap .ics calendar downloads for Apple, Google, and Outlook.',
                },
                {
                  icon: MapPin,
                  title: 'Interactive Destination Guide',
                  text: 'Direct Google Maps navigation, full estate address details, and timezone-accurate live countdowns to the exact moment of your ceremony.',
                },
                {
                  icon: Clock,
                  title: 'Monograms, Seals & Music',
                  text: 'Custom couple monograms on wax seals and crests, bespoke colour palette adjustments, and curated instrumental accompaniment.',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[20px] border border-[#D8CBB8] bg-[#FFFDF9] p-5 shadow-2xs"
                >
                  <feature.icon className="h-4 w-4 text-[#8F6B42]" />
                  <h3 className="lacy-debossed-name mt-3 font-lacy-display text-lg font-normal">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 font-lacy-text text-sm leading-relaxed text-[#5E4F3E]">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. HOW IT WORKS SECTION
         ==================================================================== */}
      <section
        id="how-it-works"
        className="border-t border-[#D8CBB8] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="font-engraved text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#8F6B42]">
              The Commissioning Process
            </span>
            <h2 className="lacy-debossed-name mt-2 font-lacy-display text-3xl sm:text-4xl font-normal">
              How It Works
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Select Your Edition',
                text: 'Explore our six signature editions and choose the opening ceremony and aesthetic atmosphere that best reflects your wedding.',
              },
              {
                step: '02',
                title: 'Share Your Details',
                text: 'Provide your names, wedding date, venue details, order of the day, and any bespoke illustration or musical preferences.',
              },
              {
                step: '03',
                title: 'Atelier Craft & Review',
                text: 'CodeMyVision crafts your private preview link so you can review every transition, wording detail, and mobile interaction.',
              },
              {
                step: '04',
                title: 'Share With Your Guests',
                text: 'Receive your dedicated wedding invitation link—ready to share effortlessly with guests worldwide via WhatsApp, email, or SMS.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-[22px] border border-[#C9B79C]/70 bg-[#FAF7F2]/90 p-6"
              >
                <span className="font-engraved text-xs font-semibold tracking-[0.28em] text-[#8F6B42]">
                  STEP {item.step}
                </span>
                <h3 className="lacy-debossed-name mt-2 font-lacy-display text-xl font-normal">
                  {item.title}
                </h3>
                <p className="mt-2 font-lacy-text text-sm leading-relaxed text-[#5E4F3E]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. CONTACT / ENQUIRY CTA SECTION
         ==================================================================== */}
      <section className="border-t border-[#D8CBB8] bg-[#FAF6F0] py-16 sm:py-24 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <span className="font-engraved text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-[#8F6B42]">
            Begin Your Commission
          </span>
          <h2 className="lacy-debossed-name mt-3 font-lacy-display text-3xl sm:text-5xl font-normal">
            Ready to Create Your Wedding Invitation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-lacy-text text-base sm:text-lg italic leading-relaxed text-[#655645]">
            Connect with CodeMyVision to commission your bespoke digital wedding
            invitation or request a tailored consultation for your upcoming
            celebration.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://codemyvision.com"
              target="_blank"
              rel="noopener noreferrer"
              className="lacy-nacre-button inline-flex items-center gap-2 px-8 py-3.5 font-lacy-serif text-xs sm:text-sm font-bold uppercase tracking-[0.26em] text-[#5E4F3E]"
            >
              <span>Create Your Invitation</span>
              <ArrowUpRight className="h-4 w-4 text-[#8F6B42]" />
            </a>

            <a
              href="mailto:info@codemyvision.com?subject=Luxury%20Digital%20Wedding%20Invitation%20Enquiry"
              className="inline-flex items-center gap-2 rounded-full border border-[#8F6B42]/55 px-6 py-3.5 font-lacy-serif text-xs sm:text-sm font-bold uppercase tracking-[0.24em] text-[#5E4F3E] hover:bg-[#EFEAE3] transition"
            >
              <span>Email Our Atelier</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#D8CBB8] bg-[#EFE8DC] py-8 text-center">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-engraved text-[10px] uppercase tracking-[0.3em] text-[#7D6A56]">
            CodeMyVision — The Wedding Invitation Collection
          </p>
          <a
            href="https://codemyvision.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-lacy-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#5E4F3E] hover:text-[#8F6B42] transition"
          >
            codemyvision.com
          </a>
        </div>
      </footer>
    </div>
  );
};
