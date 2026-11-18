import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import type { InvitationConfig } from '../../config/invitationConfig';
import { animationConfig } from '../../config/animationConfig';
import type { LuxuryThemeSpec } from '../../config/themeRegistry';
import type { InvitationSectionIndex } from '../InvitationSuiteDetails';

interface NoirArtDecoSuiteProps {
  config: InvitationConfig;
  theme: LuxuryThemeSpec;
  isOpened: boolean;
  activeSection: InvitationSectionIndex;
  hasCompletedInitialStagger: boolean;
  isTransitioning: boolean;
  calendarSaved: boolean;
  countdownUnits: { label: string; value: number }[];
  isArrived: boolean;
  onSelectSection?: (section: InvitationSectionIndex) => void;
  onNextSection: () => void;
  onPrevSection: () => void;
  onDownloadCalendar: () => void;
  onReplayOpening: () => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => void;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
}

/**
 * Distinct Horizontal Editorial Curtain Transition (Unique to 04 — The Noir)
 */
const editorialCurtainVariants = {
  enter: {
    x: 42,
    opacity: 0,
    scale: 0.975,
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: animationConfig.luxuryEasing,
    },
  },
  exit: {
    x: -42,
    opacity: 0,
    scale: 0.975,
    transition: {
      duration: 0.65,
      ease: animationConfig.luxuryEasing,
    },
  },
};

export const NoirArtDecoSuite: React.FC<NoirArtDecoSuiteProps> = ({
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
      className="relative inset-0 flex h-full w-full flex-col justify-between overflow-hidden bg-[#FAF7F2] px-5 pt-12 pb-4 text-[#231F20] select-none"
    >
      {/* Pearl Silk Texture Background */}
      <img
        src={theme.assets.innerCardBg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-90 select-none"
      />

      {/* Double Architectural Editorial Frame */}
      <div className="pointer-events-none absolute inset-2.5 z-10 border border-[#231F20]/70" />
      <div className="pointer-events-none absolute inset-3.5 z-10 border border-[#C59B58]/60" />

      {/* ====================================================================
          TOP NEW YORK BRIDAL MAGAZINE MASTHEAD & SCENE SWITCHER
         ==================================================================== */}
      <header className="relative z-30 flex items-center justify-between border-b border-[#231F20] pb-2">
        <span className="font-sans-luxury text-[8.5px] font-medium uppercase tracking-[0.32em] text-[#9E7638]">
          FIFTH AVE · NYC
        </span>
        <div className="flex items-center gap-1">
          {(['01', '02', '03', '04'] as const).map((num, idx) => (
            <button
              key={num}
              type="button"
              onClick={() => onSelectSection?.(idx as InvitationSectionIndex)}
              className={`px-2 py-0.5 font-sans-luxury text-[9px] font-medium uppercase tracking-[0.2em] transition cursor-pointer ${
                activeSection === idx
                  ? 'bg-[#231F20] text-[#FAF7F2]'
                  : 'text-[#5C5048] hover:text-[#231F20]'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </header>

      {/* ====================================================================
          MIDDLE EDITORIAL SPREAD (Horizontal Curtain Transitions)
         ==================================================================== */}
      <div className="relative z-20 my-2 flex-1 min-h-0 w-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          {/* ----------------------------------------------------------------
              SCENE 0 — FIFTH AVENUE BRIDAL COVER EDITORIAL
             ---------------------------------------------------------------- */}
          {activeSection === 0 && (
            <motion.section
              key="noir-editorial-0"
              aria-label="Black-Tie Evening Wedding Invitation"
              variants={prefersReducedMotion ? undefined : editorialCurtainVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex h-full w-full flex-col justify-between bg-[#FFFDFB]/92 p-4 border border-[#C59B58]/50 shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-[#E5D5C3] pb-2">
                <span className="font-sans-luxury text-[8.5px] font-medium uppercase tracking-[0.32em] text-[#9E7638]">
                  {config.eventType}
                </span>
                <span className="border border-[#231F20] px-2 py-0.5 font-sans-luxury text-[8px] font-medium uppercase tracking-[0.2em] text-[#231F20]">
                  {config.couple.monogramInitialOne} | {config.couple.monogramInitialTwo}
                </span>
              </div>

              {/* Editorial Couple Names & Sunlit Plaza Thumbnail */}
              <div className="my-auto flex flex-col items-center text-center py-1">
                <h1
                  aria-label={`${config.couple.partnerOneFull || config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwoFull || config.couple.partnerTwo}`}
                  className="flex flex-col items-center"
                >
                  <span className="font-lacy-display text-2xl sm:text-[1.85rem] font-normal uppercase tracking-[0.14em] text-[#231F20]">
                    {config.couple.partnerOneFull || config.couple.partnerOne}
                  </span>
                  <span className="my-0.5 font-lacy-script text-2xl text-[#9E7638]">
                    {config.couple.conjunction}
                  </span>
                  <span className="font-lacy-display text-2xl sm:text-[1.85rem] font-normal uppercase tracking-[0.14em] text-[#231F20]">
                    {config.couple.partnerTwoFull || config.couple.partnerTwo}
                  </span>
                </h1>

                <p className="mx-auto mt-2.5 max-w-[280px] font-lacy-text text-[13px] sm:text-[14px] leading-[1.42] text-[#3D3532]">
                  “{config.invitationMessage}”
                </p>

                <p className="mt-2 font-sans-luxury text-[8.5px] font-medium uppercase tracking-[0.26em] text-[#9E7638]">
                  {config.couple.hostLine}
                </p>
              </div>

              {/* Warm Rose-Champagne & Espresso Marquee Date Bar */}
              <div className="border border-[#231F20] bg-[#F4EAE0] p-2.5 text-center">
                <div className="grid grid-cols-3 items-center divide-x divide-[#231F20]/30 border-b border-[#231F20]/25 pb-1.5">
                  <span className="font-sans-luxury text-[9px] uppercase tracking-[0.2em] text-[#5C5048]">
                    {config.date.dayOfWeek}
                  </span>
                  <span className="font-engraved text-xs sm:text-sm font-semibold tracking-[0.14em] text-[#231F20]">
                    {config.date.month.slice(0, 3).toUpperCase()} {config.date.day} · {config.date.year}
                  </span>
                  <span className="font-sans-luxury text-[9px] font-medium uppercase tracking-[0.2em] text-[#9E7638]">
                    {config.date.timeDisplay}
                  </span>
                </div>
                <p className="mt-1.5 font-sans-luxury text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#231F20]">
                  {config.venue.name} · {config.venue.location}
                </p>
                <p className="font-lacy-text text-[11px] italic text-[#5C5048]">
                  {config.date.fullDateDisplay}
                </p>
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              SCENE 1 — THE EVENING ITINERARY (Pearl & Champagne Editorial Grid)
             ---------------------------------------------------------------- */}
          {activeSection === 1 && (
            <motion.section
              key="noir-editorial-1"
              aria-label="The Evening Itinerary Programme"
              variants={prefersReducedMotion ? undefined : editorialCurtainVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex h-full w-full flex-col justify-between bg-[#FFFDFB]/94 p-4 border border-[#C59B58]/50 shadow-xs"
            >
              <div className="border-b border-[#231F20] pb-1.5 text-left">
                <span className="font-sans-luxury text-[8.5px] uppercase tracking-[0.34em] text-[#9E7638]">
                  {config.sections.celebration.eyebrow}
                </span>
                <h2 className="mt-0.5 font-lacy-display text-xl sm:text-2xl font-normal uppercase tracking-[0.12em] text-[#231F20]">
                  {config.sections.celebration.title}
                </h2>
                <p className="font-sans-luxury text-[9px] uppercase tracking-[0.2em] text-[#5C5048]">
                  {config.sections.celebration.subtitle}
                </p>
              </div>

              <div className="my-auto flex flex-col divide-y divide-[#E5D5C3]">
                {config.sections.celebration.items.map((item) => (
                  <div
                    key={item.title}
                    className="grid grid-cols-[72px_1fr] items-baseline gap-2 py-1.5 text-left"
                  >
                    <span className="font-sans-luxury text-[9.5px] font-semibold uppercase tracking-[0.14em] text-[#9E7638]">
                      {item.time}
                    </span>
                    <div>
                      <h3 className="font-lacy-display text-[13px] sm:text-[14px] font-medium uppercase tracking-[0.05em] text-[#231F20] leading-tight">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="font-lacy-text text-[11px] italic text-[#5C5048]">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              SCENE 2 — THE PLAZA HOTEL, NEW YORK CITY
             ---------------------------------------------------------------- */}
          {activeSection === 2 && (
            <motion.section
              key="noir-editorial-2"
              aria-label="The Plaza Hotel New York Destination"
              variants={prefersReducedMotion ? undefined : editorialCurtainVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex h-full w-full flex-col justify-between bg-[#FFFDFB]/94 p-4 border border-[#C59B58]/50 text-left shadow-xs"
            >
              <div>
                <span className="font-sans-luxury text-[8.5px] uppercase tracking-[0.34em] text-[#9E7638]">
                  {config.venue.sectionEyebrow}
                </span>
                <h2 className="mt-0.5 font-lacy-display text-xl sm:text-2xl font-normal uppercase tracking-[0.12em] text-[#231F20]">
                  {config.venue.name}
                </h2>
                <p className="font-sans-luxury text-[9.5px] font-medium uppercase tracking-[0.24em] text-[#5C5048]">
                  {config.venue.location}
                </p>
              </div>

              <div className="relative h-[138px] sm:h-[152px] w-full overflow-hidden border border-[#231F20] bg-[#F4EAE0] p-1">
                <img
                  src={config.venue.illustrationUrl}
                  alt={`${config.venue.name}, ${config.venue.location}`}
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                {config.venue.description && (
                  <p className="font-lacy-text text-[11.5px] sm:text-xs italic leading-snug text-[#3D3532]">
                    {config.venue.description}
                  </p>
                )}
                <p className="mt-1 font-sans-luxury text-[8.5px] font-medium uppercase tracking-[0.18em] text-[#9E7638]">
                  {config.venue.fullAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={config.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="noir-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-sans-luxury text-[9px] font-medium uppercase tracking-[0.18em]"
                >
                  <MapPin className="h-3 w-3 shrink-0 text-[#9E7638]" />
                  <span>{config.venue.openMapButtonLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={onDownloadCalendar}
                  className="noir-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-sans-luxury text-[9px] font-medium uppercase tracking-[0.18em] cursor-pointer"
                >
                  {calendarSaved ? (
                    <>
                      <Check className="h-3 w-3 shrink-0 text-[#9E7638]" />
                      <span>Calendar Event Saved (.ics)</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3 shrink-0 text-[#9E7638]" />
                      <span>{config.venue.addToCalendarButtonLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              SCENE 3 — UNTIL FIFTH AVENUE GLOWS (Light Pearl & Champagne Countdown)
             ---------------------------------------------------------------- */}
          {activeSection === 3 && (
            <motion.section
              key="noir-editorial-3"
              aria-label="Countdown to Midnight in Manhattan"
              variants={prefersReducedMotion ? undefined : editorialCurtainVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex h-full w-full flex-col justify-between bg-[#FFFDFB]/94 p-4 border border-[#C59B58]/50 text-center shadow-xs"
            >
              <div>
                <span className="font-sans-luxury text-[8.5px] uppercase tracking-[0.32em] text-[#9E7638]">
                  {config.sections.countdown.eyebrow}
                </span>
                <h2 className="mt-1 font-lacy-display text-xl sm:text-2xl font-normal uppercase tracking-[0.12em] text-[#231F20]">
                  {config.sections.countdown.title}
                </h2>
              </div>

              {isArrived ? (
                <div className="my-auto">
                  <h3 className="font-lacy-display text-2xl uppercase text-[#231F20]">
                    {config.sections.countdown.arrivedTitle}
                  </h3>
                  <p className="mt-1.5 font-lacy-text text-xs italic text-[#3D3532]">
                    {config.sections.countdown.arrivedMessage}
                  </p>
                </div>
              ) : (
                <div className="my-auto flex flex-col items-center">
                  <div className="grid w-full grid-cols-2 gap-2.5">
                    {countdownUnits.map((unit) => (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center border border-[#231F20] bg-[#F4EAE0] py-3 shadow-2xs"
                      >
                        <span className="font-lacy-display text-2xl sm:text-[1.75rem] text-[#231F20] tabular-nums leading-none">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                        <span className="mt-1 font-sans-luxury text-[8px] font-medium uppercase tracking-[0.24em] text-[#9E7638]">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-lacy-text text-xs italic text-[#5C5048]">
                    {config.sections.countdown.quote}
                  </p>
                </div>
              )}

              <div className="border-t border-[#E5D5C3] pt-2">
                <p className="font-sans-luxury text-[10px] font-medium uppercase tracking-[0.22em] text-[#231F20]">
                  {config.sections.closing.signOff}
                </p>
                <p className="mt-0.5 font-lacy-text text-[11.5px] italic text-[#3D3532]">
                  “{config.sections.closing.quote}”
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* ====================================================================
          PINNED BOTTOM EDITORIAL NAVIGATION BAR
         ==================================================================== */}
      <div className="relative z-30 flex shrink-0 items-center justify-between gap-2 pt-1">
        {activeSection > 0 ? (
          <button
            type="button"
            onClick={onPrevSection}
            disabled={isTransitioning}
            className="border border-[#231F20]/40 bg-[#FFFDFB] px-3.5 py-2 font-sans-luxury text-[9.5px] font-medium uppercase tracking-[0.2em] text-[#231F20] cursor-pointer"
          >
            {config.navigation.previousSectionLabel}
          </button>
        ) : (
          <span className="font-sans-luxury text-[8.5px] uppercase tracking-[0.24em] text-[#9E7638]">
            THE PLAZA · NYC
          </span>
        )}

        {activeSection < 3 ? (
          <button
            type="button"
            onClick={onNextSection}
            disabled={isTransitioning}
            className="noir-nacre-button inline-flex items-center justify-center px-5 py-2 font-sans-luxury text-[9.5px] font-medium uppercase tracking-[0.24em] cursor-pointer disabled:opacity-60"
          >
            <span>{config.navigation.scrollDownLabel}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReplayOpening}
            className="noir-nacre-button inline-flex items-center gap-1.5 px-4 py-2 font-sans-luxury text-[9.5px] font-medium uppercase tracking-[0.22em] cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-[#9E7638]" />
            <span>{config.navigation.replayOpeningLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
