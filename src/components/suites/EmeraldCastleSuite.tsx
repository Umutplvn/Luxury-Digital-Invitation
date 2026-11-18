import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw, Compass } from 'lucide-react';
import type { InvitationConfig } from '../../config/invitationConfig';
import type { LuxuryThemeSpec } from '../../config/themeRegistry';
import type { InvitationSectionIndex } from '../InvitationSuiteDetails';

interface EmeraldCastleSuiteProps {
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

const ROMAN_NUMERALS = ['I', 'II', 'III', 'IV', 'V', 'VI'];

/**
 * 03 — THE EMERALD (Completely Redesigned Interior Architecture)
 * Theme: Sunlit Connemara Alabaster, Cashmere Stone, Lough Corrib Emerald & Burnished Brass
 * Interaction Model: Continuous Vertical Scroll Editorial Story + Smooth Section Gliding
 */
export const EmeraldCastleSuite: React.FC<EmeraldCastleSuiteProps> = ({
  config,
  activeSection,
  calendarSaved,
  countdownUnits,
  isArrived,
  onSelectSection,
  onNextSection,
  onPrevSection,
  onDownloadCalendar,
  onReplayOpening,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = [
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
    useRef<HTMLElement | null>(null),
  ];

  // Smoothly scroll to the active section whenever activeSection changes via button click
  useEffect(() => {
    const targetEl = sectionRefs[activeSection]?.current;
    const container = scrollContainerRef.current;
    if (targetEl && container) {
      container.scrollTo({
        top: targetEl.offsetTop - 12,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [activeSection, prefersReducedMotion]);

  return (
    <div className="relative inset-0 flex h-full w-full flex-col overflow-hidden bg-[#F8F5EE] text-[#143023] select-none">
      {/* Subtle Cashmere Limestone Architectural Border */}
      <div className="pointer-events-none absolute inset-2.5 z-20 rounded-[18px] border border-[#B8924C]/45" />

      {/* ====================================================================
          CONTINUOUS SCROLLING EDITORIAL STORY CONTAINER
         ==================================================================== */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 overflow-y-auto px-5 pt-12 pb-20 space-y-6 scroll-smooth"
      >
        {/* ------------------------------------------------------------------
            SECTION 0 — ARCHITECTURAL GLASSHOUSE HERO & ANNOUNCEMENT
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[0]}
          aria-label="The Royal Castle Wedding Invitation"
          className="flex flex-col items-center text-center"
        >
          {/* Arched Window into Ashford Castle on Lough Corrib */}
          <div className="relative h-[185px] w-full overflow-hidden rounded-t-[110px] rounded-b-[18px] border-2 border-[#B8924C] bg-[#123325] shadow-[0_16px_36px_rgba(18,51,37,0.22)]">
            <img
              src={config.venue.illustrationUrl}
              alt={`${config.venue.name}, ${config.venue.location}`}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div
              style={{
                background:
                  'linear-gradient(180deg, rgba(14,40,28,0.18) 0%, rgba(14,40,28,0.68) 100%)',
              }}
              className="absolute inset-0"
            />
            <div className="absolute inset-x-4 bottom-3 flex flex-col items-center text-[#FAF5E8]">
              <span className="font-engraved text-[8.5px] uppercase tracking-[0.34em] text-[#E5C98B]">
                {config.eventType}
              </span>
              <span className="mt-0.5 font-lacy-serif text-xs italic text-[#FAF5E8]/90">
                {config.venue.name} · {config.venue.location}
              </span>
            </div>
          </div>

          {/* Overlapping Connemara Alabaster Editorial Card */}
          <div className="relative -mt-4 w-[94%] rounded-[20px] border border-[#B8924C]/55 bg-[#FFFDF9] px-4 py-4 shadow-[0_12px_30px_rgba(20,48,35,0.10)]">
            <div className="mx-auto -mt-8 mb-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#B8924C] bg-[#123325] font-engraved text-[10px] font-semibold tracking-[0.14em] text-[#FAF5E8] shadow-md">
              {config.couple.monogramInitialOne}·{config.couple.monogramInitialTwo}
            </div>

            <h1
              aria-label={`${config.couple.partnerOneFull || config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwoFull || config.couple.partnerTwo}`}
              className="flex flex-col items-center"
            >
              <span className="font-lacy-display text-2xl sm:text-[1.75rem] font-normal tracking-[0.02em] text-[#123325]">
                {config.couple.partnerOneFull || config.couple.partnerOne}
              </span>
              <span className="my-0.5 font-lacy-display italic text-base text-[#9E7832]">
                {config.couple.conjunction}
              </span>
              <span className="font-lacy-display text-2xl sm:text-[1.75rem] font-normal tracking-[0.02em] text-[#123325]">
                {config.couple.partnerTwoFull || config.couple.partnerTwo}
              </span>
            </h1>

            <p className="mx-auto mt-2.5 max-w-[275px] font-lacy-text text-[13.5px] leading-[1.42] text-[#284638]">
              “{config.invitationMessage}”
            </p>

            <p className="mt-2 font-engraved text-[8.5px] font-semibold uppercase tracking-[0.2em] text-[#9E7832]">
              {config.couple.hostLine}
            </p>

            {/* 3-Column Engraved Brass Date Grid */}
            <div className="mt-3 grid grid-cols-3 items-center divide-x divide-[#B8924C]/40 rounded-[12px] border border-[#B8924C]/45 bg-[#F4EFE4] py-2">
              <span className="font-engraved text-[9px] uppercase tracking-[0.16em] text-[#284638]">
                {config.date.dayOfWeek}
              </span>
              <span className="font-engraved text-xs font-semibold tracking-[0.12em] text-[#123325]">
                {config.date.day} {config.date.month} {config.date.year}
              </span>
              <span className="font-engraved text-[9.5px] font-semibold uppercase tracking-[0.16em] text-[#9E7832]">
                {config.date.timeDisplay}
              </span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 1 — ORDER OF THE DAY (2-Column Architectural Bento Grid)
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[1]}
          aria-label="Order of the Day Castle Programme"
          className="rounded-[20px] border border-[#B8924C]/50 bg-[#FFFDF9] p-4 shadow-[0_12px_28px_rgba(20,48,35,0.08)]"
        >
          <div className="flex items-center justify-between border-b border-[#B8924C]/30 pb-2">
            <div className="text-left">
              <span className="block font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#9E7832]">
                {config.sections.celebration.eyebrow}
              </span>
              <h2 className="font-lacy-display text-xl font-normal text-[#123325]">
                {config.sections.celebration.title}
              </h2>
            </div>
            <span className="rounded-full bg-[#123325] px-2.5 py-1 font-engraved text-[8px] uppercase tracking-[0.2em] text-[#E5C98B]">
              {config.date.day} Sept
            </span>
          </div>

          <p className="mt-1.5 text-left font-lacy-text text-xs italic text-[#284638]">
            {config.sections.celebration.subtitle}
          </p>

          {/* 2-Column Bento Schedule Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-left">
            {config.sections.celebration.items.map((item, idx) => (
              <div
                key={item.title}
                className="flex flex-col justify-between rounded-[14px] border border-[#DFD5C2] bg-[#F8F5EE] p-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-[#123325] font-engraved text-[8.5px] font-semibold text-[#E5C98B]">
                    {ROMAN_NUMERALS[idx] || idx + 1}
                  </span>
                  <span className="font-engraved text-[9px] font-semibold text-[#9E7832]">
                    {item.time}
                  </span>
                </div>
                <div className="mt-2">
                  <h3 className="font-lacy-display text-[13px] font-medium leading-tight text-[#123325]">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="mt-0.5 font-lacy-text text-[10.5px] italic leading-tight text-[#3A5A4A]">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2 — THE HISTORIC DEMESNE (Ashford Castle Estate Card)
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[2]}
          aria-label="Ashford Castle Wedding Destination"
          className="rounded-[20px] border border-[#B8924C]/50 bg-[#FFFDF9] p-4 text-left shadow-[0_12px_28px_rgba(20,48,35,0.08)]"
        >
          <div className="flex items-center gap-2 text-[#9E7832]">
            <Compass className="h-3.5 w-3.5" />
            <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em]">
              {config.venue.sectionEyebrow}
            </span>
          </div>

          <h2 className="mt-1 font-lacy-display text-xl font-normal text-[#123325]">
            {config.venue.name} · {config.venue.location}
          </h2>

          {config.venue.description && (
            <p className="mt-1.5 font-lacy-text text-xs italic leading-relaxed text-[#284638]">
              {config.venue.description}
            </p>
          )}

          <p className="mt-2 font-engraved text-[9px] font-semibold uppercase tracking-[0.14em] text-[#9E7832]">
            {config.venue.fullAddress}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <a
              href={config.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="emerald-nacre-button inline-flex items-center justify-center gap-1.5 px-4 py-2 font-engraved text-[9.5px] font-semibold uppercase tracking-[0.18em]"
            >
              <MapPin className="h-3 w-3 shrink-0 text-[#DFC07B]" />
              <span>{config.venue.openMapButtonLabel}</span>
            </a>

            <button
              type="button"
              onClick={onDownloadCalendar}
              className="emerald-nacre-button inline-flex items-center justify-center gap-1.5 px-4 py-2 font-engraved text-[9.5px] font-semibold uppercase tracking-[0.18em] cursor-pointer"
            >
              {calendarSaved ? (
                <>
                  <Check className="h-3 w-3 shrink-0 text-[#DFC07B]" />
                  <span>Calendar Event Saved (.ics)</span>
                </>
              ) : (
                <>
                  <Calendar className="h-3 w-3 shrink-0 text-[#DFC07B]" />
                  <span>{config.venue.addToCalendarButtonLabel}</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3 — OUR FOREVER BEGINS (Deep Lough Corrib Emerald Feature Card)
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[3]}
          aria-label="Until the Castle Bells Ring Countdown"
          className="rounded-[22px] border-2 border-[#C9A461] bg-[#123325] p-4 text-center text-[#FAF5E8] shadow-[0_16px_38px_rgba(12,34,25,0.28)]"
        >
          <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#E5C98B]">
            {config.sections.countdown.eyebrow}
          </span>
          <h2 className="mt-0.5 font-lacy-display text-xl font-normal text-[#FAF5E8]">
            {config.sections.countdown.title}
          </h2>

          {isArrived ? (
            <div className="my-3">
              <h3 className="font-engraved text-lg text-[#E5C98B]">
                {config.sections.countdown.arrivedTitle}
              </h3>
              <p className="mt-1 font-lacy-text text-xs italic text-[#FAF5E8]/90">
                {config.sections.countdown.arrivedMessage}
              </p>
            </div>
          ) : (
            <div className="my-3 grid grid-cols-4 gap-2">
              {countdownUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="flex flex-col items-center justify-center rounded-[12px] border border-[#C9A461]/65 bg-[#0B2219] py-2.5"
                >
                  <motion.span
                    key={`${unit.label}-${unit.value}`}
                    className="font-engraved text-lg sm:text-xl text-[#FAF5E8] tabular-nums"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </motion.span>
                  <span className="mt-0.5 font-engraved text-[7.5px] uppercase tracking-[0.18em] text-[#E5C98B]">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <p className="font-lacy-text text-xs italic text-[#E5C98B]">
            {config.sections.countdown.quote}
          </p>

          <div className="mt-3 border-t border-[#C9A461]/30 pt-2.5">
            <p className="font-engraved text-xs font-semibold tracking-[0.08em] text-[#FAF5E8]">
              {config.sections.closing.signOff}
            </p>
            <p className="mt-1 font-lacy-text text-[11.5px] italic text-[#FAF5E8]/85">
              “{config.sections.closing.quote}”
            </p>
          </div>
        </section>
      </div>

      {/* ====================================================================
          STICKY BOTTOM GLASSHOUSE NAVIGATION BAR
         ==================================================================== */}
      <div className="absolute inset-x-4 bottom-3 z-30 flex items-center justify-between rounded-full border border-[#B8924C]/60 bg-[#FAF7F0]/95 px-3 py-1.5 shadow-[0_10px_28px_rgba(18,51,37,0.18)] backdrop-blur-md">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSection?.(idx as InvitationSectionIndex)}
              aria-label={`Jump to section ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeSection === idx
                  ? 'w-5 bg-[#123325]'
                  : 'w-2 bg-[#B8924C]/45 hover:bg-[#B8924C]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {activeSection > 0 && (
            <button
              type="button"
              onClick={onPrevSection}
              className="font-engraved text-[9px] font-semibold uppercase tracking-[0.18em] text-[#123325] cursor-pointer px-2 py-1"
            >
              {config.navigation.previousSectionLabel}
            </button>
          )}

          {activeSection < 3 ? (
            <button
              type="button"
              onClick={onNextSection}
              className="emerald-nacre-button inline-flex items-center justify-center px-4 py-1.5 font-engraved text-[9.5px] font-semibold uppercase tracking-[0.2em] cursor-pointer"
            >
              <span>{config.navigation.scrollDownLabel}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onReplayOpening}
              className="emerald-nacre-button inline-flex items-center gap-1 px-4 py-1.5 font-engraved text-[9.5px] font-semibold uppercase tracking-[0.18em] cursor-pointer"
            >
              <RotateCcw className="h-2.5 w-2.5 text-[#DFC07B]" />
              <span>{config.navigation.replayOpeningLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
