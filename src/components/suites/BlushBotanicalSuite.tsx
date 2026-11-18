import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw, Sparkles } from 'lucide-react';
import type { InvitationConfig } from '../../config/invitationConfig';
import { animationConfig } from '../../config/animationConfig';
import type { LuxuryThemeSpec } from '../../config/themeRegistry';
import type { InvitationSectionIndex } from '../InvitationSuiteDetails';
import { MotherOfPearlCameoSeal } from '../CoutureArtAssets';

interface BlushBotanicalSuiteProps {
  config: InvitationConfig;
  theme: LuxuryThemeSpec;
  isOpened: boolean;
  activeSection: InvitationSectionIndex;
  hasCompletedInitialStagger: boolean;
  isTransitioning: boolean;
  calendarSaved: boolean;
  countdownUnits: { label: string; value: number }[];
  isArrived: boolean;
  onSelectSection: (section: InvitationSectionIndex) => void;
  onNextSection: () => void;
  onPrevSection: () => void;
  onDownloadCalendar: () => void;
  onReplayOpening: () => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
}

/**
 * Distinct 3D Botanical Herbarium Page-Leaf Transition (Unique to 02 — The Blush)
 */
const herbariumPageVariants = {
  enter: {
    rotateY: 16,
    x: 28,
    scale: 0.965,
    opacity: 0,
  },
  center: {
    rotateY: 0,
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.95,
      ease: animationConfig.luxuryEasing,
    },
  },
  exit: {
    rotateY: -16,
    x: -28,
    scale: 0.965,
    opacity: 0,
    transition: {
      duration: 0.7,
      ease: animationConfig.luxuryEasing,
    },
  },
};

const CHAPTER_TABS: { index: InvitationSectionIndex; label: string }[] = [
  { index: 0, label: '01 · Note' },
  { index: 1, label: '02 · Day' },
  { index: 2, label: '03 · Estate' },
  { index: 3, label: '04 · Time' },
];

export const BlushBotanicalSuite: React.FC<BlushBotanicalSuiteProps> = ({
  config,
  theme,
  activeSection,
  isTransitioning,
  calendarSaved,
  countdownUnits,
  isArrived,
  onSelectSection,
  onNextSection,
  onPrevSection,
  onDownloadCalendar,
  onReplayOpening,
  onTouchStart,
  onTouchEnd,
  onWheel,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onWheel={onWheel}
      style={{ perspective: '1800px' }}
      className="relative inset-0 flex h-full w-full flex-col justify-between overflow-hidden bg-[#FCF6F2] px-[8%] pt-12 pb-4 select-none"
    >
      {/* Watercolor Botanical Background Canvas */}
      <img
        src={theme.assets.innerCardBg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
      />

      {/* ====================================================================
          TOP BOTANICAL HERBARIUM CHAPTER NAVIGATION PILL BAR
         ==================================================================== */}
      <nav
        aria-label="Botanical Invitation Chapters"
        className="relative z-30 mx-auto flex w-full max-w-[310px] items-center justify-between rounded-full border border-[#C47D72]/45 bg-[#FFFDFB]/90 p-1 shadow-xs backdrop-blur-xs"
      >
        {CHAPTER_TABS.map((tab) => {
          const active = activeSection === tab.index;
          return (
            <button
              key={tab.index}
              type="button"
              onClick={() => onSelectSection(tab.index)}
              className={`rounded-full px-2.5 py-1 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.14em] transition cursor-pointer ${
                active
                  ? 'bg-[#6E8770] text-[#FFFDF9] shadow-2xs'
                  : 'text-[#6E544E] hover:text-[#593A36]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ====================================================================
          MIDDLE HERBARIUM FOLIO SPREAD (3D Page-Leaf Transitions)
         ==================================================================== */}
      <div
        style={{ transformStyle: 'preserve-3d' }}
        className="relative z-20 my-2 flex-1 min-h-0 w-full"
      >
        <AnimatePresence initial={false} mode="wait">
          {/* ----------------------------------------------------------------
              CHAPTER 01 — BOTANICAL EDITORIAL ANNOUNCEMENT
             ---------------------------------------------------------------- */}
          {activeSection === 0 && (
            <motion.section
              key="blush-folio-0"
              aria-label="The Garden Wedding Invitation"
              variants={prefersReducedMotion ? undefined : herbariumPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: 'left center' }}
              className="flex h-full w-full flex-col justify-between rounded-[22px] border border-[#C47D72]/50 bg-[#FFFDFB]/88 p-4 shadow-[0_14px_34px_rgba(110,64,54,0.12)] backdrop-blur-[2px]"
            >
              {/* Top Botanical Specimen Header & Powerscourt Watercolor Vignette */}
              <div className="flex items-center justify-between border-b border-[#6E8770]/30 pb-2">
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.26em] text-[#5B735D]">
                  No. 01 · Wicklow Herbarium
                </span>
                <span className="font-lacy-serif text-[10px] italic text-[#9E5E50]">
                  {config.date.day}.{config.date.monthNumber}.{config.date.year}
                </span>
              </div>

              {/* Asymmetrical Botanical Magazine Couple Names */}
              <div className="my-auto flex flex-col py-1">
                <p className="font-engraved text-[9px] uppercase tracking-[0.28em] text-[#6E8770]">
                  {config.eventType}
                </p>

                <h1
                  aria-label={`${config.couple.partnerOneFull || config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwoFull || config.couple.partnerTwo}`}
                  className="mt-1 flex flex-col"
                >
                  <span className="text-left font-lacy-script text-[2.4rem] sm:text-[2.75rem] leading-[1.02] text-[#593A36]">
                    {config.couple.partnerOneFull || config.couple.partnerOne}
                  </span>
                  <span className="my-0.5 self-center font-lacy-serif text-xs font-bold uppercase tracking-[0.3em] text-[#6E8770]">
                    — {config.couple.conjunction} —
                  </span>
                  <span className="text-right font-lacy-script text-[2.4rem] sm:text-[2.75rem] leading-[1.02] text-[#593A36]">
                    {config.couple.partnerTwoFull || config.couple.partnerTwo}
                  </span>
                </h1>

                <p className="mt-2 border-l-2 border-[#6E8770] pl-3 text-left font-lacy-text text-[13px] sm:text-[14px] italic leading-[1.38] text-[#5D3F3B]">
                  “{config.invitationMessage}”
                </p>

                <p className="mt-1.5 text-left font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.18em] text-[#5B735D]">
                  {config.couple.hostLine}
                </p>
              </div>

              {/* Pressed Botanical Date & Estate Specimen Card */}
              <div className="rounded-[14px] border border-[#6E8770]/40 bg-[#F5F8F4] px-3 py-2 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block font-engraved text-[8.5px] uppercase tracking-[0.22em] text-[#5B735D]">
                      {config.date.dayOfWeek} · {config.date.timeDisplay}
                    </span>
                    <span className="block font-lacy-display text-sm sm:text-base font-medium text-[#593A36]">
                      {config.date.day} {config.date.month} {config.date.year}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-lacy-display text-xs sm:text-[13px] font-medium text-[#593A36]">
                      {config.venue.name}
                    </span>
                    <span className="block font-lacy-text text-[11px] italic text-[#5B735D]">
                      {config.venue.location}
                    </span>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              CHAPTER 02 — THE GARDEN CELEBRATION (2-Column Botanical Cards)
             ---------------------------------------------------------------- */}
          {activeSection === 1 && (
            <motion.section
              key="blush-folio-1"
              aria-label="The Garden Celebration Wedding Programme"
              variants={prefersReducedMotion ? undefined : herbariumPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: 'left center' }}
              className="flex h-full w-full flex-col justify-between rounded-[22px] border border-[#C47D72]/50 bg-[#FFFDFB]/90 p-4 shadow-[0_14px_34px_rgba(110,64,54,0.12)]"
            >
              <div className="text-left border-b border-[#6E8770]/30 pb-1.5">
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#5B735D]">
                  {config.sections.celebration.eyebrow}
                </span>
                <h2 className="font-lacy-script text-2xl sm:text-3xl text-[#593A36] leading-tight">
                  {config.sections.celebration.title}
                </h2>
              </div>

              <div className="my-auto grid grid-cols-1 gap-1.5 py-1 text-left">
                {config.sections.celebration.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-[11px] border border-[#E6C5BE]/65 bg-[#FCF6F2] px-3 py-1.5"
                  >
                    <div className="min-w-0 pr-2">
                      <h3 className="truncate font-lacy-display text-[13px] sm:text-[14px] font-medium text-[#593A36]">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="truncate font-lacy-text text-[10.5px] italic text-[#5B735D]">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 rounded-full bg-[#6E8770]/15 px-2.5 py-0.5 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#49614B]">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              CHAPTER 03 — POWERSCOURT HOUSE & GARDENS
             ---------------------------------------------------------------- */}
          {activeSection === 2 && (
            <motion.section
              key="blush-folio-2"
              aria-label="Powerscourt House and Gardens Destination"
              variants={prefersReducedMotion ? undefined : herbariumPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: 'left center' }}
              className="flex h-full w-full flex-col justify-between rounded-[22px] border border-[#C47D72]/50 bg-[#FFFDFB]/90 p-4 shadow-[0_14px_34px_rgba(110,64,54,0.12)]"
            >
              <div className="text-left">
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#5B735D]">
                  {config.venue.sectionEyebrow}
                </span>
                <h2 className="font-lacy-script text-2xl sm:text-3xl text-[#593A36] leading-tight">
                  {config.venue.name}
                </h2>
                <p className="font-lacy-serif text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#6E8770]">
                  {config.venue.location}
                </p>
              </div>

              <div className="relative h-[135px] sm:h-[150px] w-full overflow-hidden rounded-[16px] border-2 border-[#6E8770]/50 shadow-sm">
                <img
                  src={config.venue.illustrationUrl}
                  alt={`${config.venue.name}, ${config.venue.location}`}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="text-left">
                {config.venue.description && (
                  <p className="font-lacy-text text-[11.5px] sm:text-xs italic leading-snug text-[#5D3F3B]">
                    {config.venue.description}
                  </p>
                )}
                <p className="mt-1 font-lacy-serif text-[9px] uppercase tracking-[0.14em] text-[#9E5E50]">
                  {config.venue.fullAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={config.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blush-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.16em]"
                >
                  <MapPin className="h-3 w-3 shrink-0 text-[#6E8770]" />
                  <span>{config.venue.openMapButtonLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={onDownloadCalendar}
                  className="blush-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.16em] cursor-pointer"
                >
                  {calendarSaved ? (
                    <>
                      <Check className="h-3 w-3 shrink-0 text-[#6E8770]" />
                      <span>Calendar Event Saved (.ics)</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3 shrink-0 text-[#9E5E50]" />
                      <span>{config.venue.addToCalendarButtonLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              CHAPTER 04 — COUNTING EVERY MOMENT
             ---------------------------------------------------------------- */}
          {activeSection === 3 && (
            <motion.section
              key="blush-folio-3"
              aria-label="Until the Roses Bloom Wedding Countdown"
              variants={prefersReducedMotion ? undefined : herbariumPageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              style={{ transformOrigin: 'left center' }}
              className="flex h-full w-full flex-col justify-between rounded-[22px] border border-[#C47D72]/50 bg-[#FFFDFB]/90 p-4 text-center shadow-[0_14px_34px_rgba(110,64,54,0.12)]"
            >
              <div>
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#5B735D]">
                  {config.sections.countdown.eyebrow}
                </span>
                <h2 className="font-lacy-script text-2xl sm:text-3xl text-[#593A36]">
                  {config.sections.countdown.title}
                </h2>
              </div>

              {isArrived ? (
                <div className="my-auto flex flex-col items-center">
                  <MotherOfPearlCameoSeal className="w-16" theme={theme} />
                  <h3 className="mt-2 font-lacy-display text-2xl text-[#593A36]">
                    {config.sections.countdown.arrivedTitle}
                  </h3>
                  <p className="mt-1 font-lacy-text text-xs italic text-[#5D3F3B]">
                    {config.sections.countdown.arrivedMessage}
                  </p>
                </div>
              ) : (
                <div className="my-auto flex flex-col items-center">
                  <div className="grid w-full grid-cols-4 gap-2">
                    {countdownUnits.map((unit) => (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center rounded-[14px] border border-[#6E8770]/45 bg-[#F5F8F4] py-3 shadow-2xs"
                      >
                        <span className="font-lacy-display text-xl sm:text-2xl text-[#593A36] tabular-nums">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                        <span className="mt-1 font-lacy-serif text-[8px] font-bold uppercase tracking-[0.18em] text-[#5B735D]">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-lacy-text text-xs italic text-[#5B735D]">
                    {config.sections.countdown.quote}
                  </p>
                </div>
              )}

              <div>
                <p className="font-lacy-script text-2xl text-[#593A36]">
                  {config.sections.closing.signOff}
                </p>
                <p className="mt-0.5 font-lacy-text text-[11.5px] italic text-[#5D3F3B]">
                  “{config.sections.closing.quote}”
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* ====================================================================
          PINNED BOTTOM NAVIGATION DOCK (Guaranteed 100% Visible on Every Screen)
         ==================================================================== */}
      <div className="relative z-30 flex shrink-0 items-center justify-between gap-2 pt-1">
        {activeSection > 0 ? (
          <button
            type="button"
            onClick={onPrevSection}
            disabled={isTransitioning}
            className="rounded-full border border-[#C47D72]/45 bg-[#FFFDFB]/90 px-3.5 py-2 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.18em] text-[#5B735D] hover:text-[#593A36] transition cursor-pointer"
          >
            {config.navigation.previousSectionLabel}
          </button>
        ) : (
          <span className="inline-flex items-center gap-1 pl-2 font-engraved text-[8.5px] uppercase tracking-[0.22em] text-[#6E8770]">
            <Sparkles className="h-2.5 w-2.5" />
            <span>Powerscourt</span>
          </span>
        )}

        {activeSection < 3 ? (
          <button
            type="button"
            data-testid="blush-scroll-down-btn"
            onClick={onNextSection}
            disabled={isTransitioning}
            className="blush-nacre-button inline-flex items-center justify-center px-5 py-2 font-lacy-serif text-[10.5px] font-bold uppercase tracking-[0.22em] text-[#593A36] shadow-md cursor-pointer disabled:opacity-60"
          >
            <span>{config.navigation.scrollDownLabel}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReplayOpening}
            className="blush-nacre-button inline-flex items-center gap-1.5 px-4 py-2 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.2em] text-[#593A36] shadow-md cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-[#9E5E50]" />
            <span>{config.navigation.replayOpeningLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
