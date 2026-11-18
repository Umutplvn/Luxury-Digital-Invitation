import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import type { InvitationConfig } from '../../config/invitationConfig';
import type { LuxuryThemeSpec } from '../../config/themeRegistry';
import type { InvitationSectionIndex } from '../InvitationSuiteDetails';

interface GoldenRoseProvenceSuiteProps {
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

const DRESS_CODE_SWATCHES = [
  { name: 'Espresso Bronze', hex: '#4A2C18' },
  { name: 'Rosewood Amber', hex: '#8C5836' },
  { name: 'Champagne Gold', hex: '#C99648' },
  { name: 'Warm Sand', hex: '#E5C99B' },
  { name: 'Provence Ivory', hex: '#FBF5EA' },
];

/**
 * 06 — THE GOLDEN ROSE (Full-Bleed Continuous Scroll Provençal Villa Experience)
 * Reproduces the continuous vertical scrolling storytelling & alternating timeline
 * of the 12.5-second Webgency reference video while keeping smooth section controls.
 */
export const GoldenRoseProvenceSuite: React.FC<GoldenRoseProvenceSuiteProps> = ({
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

  useEffect(() => {
    const targetEl = sectionRefs[activeSection]?.current;
    const container = scrollContainerRef.current;
    if (targetEl && container) {
      container.scrollTo({
        top: targetEl.offsetTop - 8,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [activeSection, prefersReducedMotion]);

  return (
    <div className="relative inset-0 flex h-full w-full flex-col overflow-hidden bg-[#FBF5EA] text-[#3B2314] select-none">
      {/* ====================================================================
          CONTINUOUS SCROLLING PROVENÇAL STORY CONTAINER
         ==================================================================== */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex-1 overflow-y-auto pb-20 scroll-smooth"
      >
        {/* ------------------------------------------------------------------
            SECTION 0 — FULL-BLEED PROVENÇAL ESTATE PORTRAIT, NAMES & LETTER
           ------------------------------------------------------------------ */}
        <section ref={sectionRefs[0]} aria-label="The Wedding Invitation">
          {/* Full-Bleed Estate Portrait with Bottom Gradient Fade */}
          <div className="relative h-[285px] w-full overflow-hidden">
            <img
              src={config.venue.illustrationUrl}
              alt={config.venue.name}
              draggable={false}
              className="h-full w-full object-cover"
            />
            <div
              style={{
                background:
                  'linear-gradient(180deg, rgba(28,16,8,0.28) 0%, rgba(28,16,8,0.08) 45%, rgba(251,245,234,1) 100%)',
              }}
              className="absolute inset-0"
            />

            <div className="absolute inset-x-4 bottom-2 flex flex-col items-center text-center">
              <span className="font-lacy-serif text-xs font-semibold uppercase tracking-[0.28em] text-[#8C5836]">
                {config.eventType} · {config.date.day}.0{config.date.monthNumber}.{config.date.year.slice(-2)}
              </span>
              <h1
                aria-label={`${config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwo}`}
                className="mt-1 flex flex-col items-center"
              >
                <span className="font-lacy-display text-[2.45rem] sm:text-[2.85rem] font-normal leading-none text-[#3B2314]">
                  {config.couple.partnerOne}
                </span>
                <span className="-my-2 font-lacy-script text-3xl sm:text-4xl text-[#9E6428]">
                  {config.couple.conjunction}
                </span>
                <span className="font-lacy-display text-[2.45rem] sm:text-[2.85rem] font-normal leading-none text-[#3B2314]">
                  {config.couple.partnerTwo}
                </span>
              </h1>
              <p className="mt-1 font-lacy-text text-xs italic text-[#6E5038]">
                {config.date.fullDateDisplay} · {config.venue.name}, {config.venue.location}
              </p>
            </div>
          </div>

          {/* Warm Espresso-Burgundy & Gold Personal Letter Card (Matches wg_06.jpg) */}
          <div className="mx-5 mt-2 rounded-[20px] border border-[#DFB672]/70 bg-gradient-to-b from-[#4E2618] to-[#381A0E] px-5 py-4 text-center text-[#FBF5EA] shadow-[0_14px_32px_rgba(46,24,12,0.22)]">
            <p className="font-lacy-display text-base italic text-[#F3D292]">
              {config.couple.hostLine}
            </p>
            <p className="mt-2 font-lacy-text text-[13px] sm:text-[14px] leading-[1.45] text-[#FBF5EA]/95">
              “{config.invitationMessage}”
            </p>
            <p className="mt-2 font-engraved text-[9px] uppercase tracking-[0.24em] text-[#DFB672]">
              {config.couple.groomFamily} &amp; {config.couple.brideFamily} Families
            </p>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 1 — SCHEDULE OF EVENTS (Alternating Center-Axis Timeline)
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[1]}
          aria-label="Schedule of Events"
          className="mx-5 mt-6 rounded-[22px] border border-[#C99648]/45 bg-[#FFFDF9] p-4 text-center shadow-xs"
        >
          <span className="font-engraved text-[9px] uppercase tracking-[0.3em] text-[#8C5836]">
            {config.sections.celebration.eyebrow}
          </span>
          <h2 className="mt-0.5 font-lacy-display text-2xl font-normal text-[#3B2314]">
            {config.sections.celebration.title}
          </h2>
          <p className="font-lacy-text text-xs italic text-[#6E5038]">
            {config.sections.celebration.subtitle}
          </p>

          <div className="relative mt-4 py-2">
            <div className="absolute inset-y-2 left-1/2 w-[1.5px] -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C99648] to-transparent" />

            <div className="flex flex-col space-y-3.5">
              {config.sections.celebration.items.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={item.title}
                    className="relative grid grid-cols-[1fr_24px_1fr] items-center gap-1"
                  >
                    <div className="pr-2 text-right">
                      {isLeft ? (
                        <>
                          <span className="block font-lacy-display text-base font-medium text-[#3B2314] leading-none">
                            {item.time}
                          </span>
                          <span className="block font-lacy-serif text-xs font-bold uppercase tracking-[0.12em] text-[#8C5836]">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="block font-lacy-text text-[10.5px] italic text-[#6E5038]">
                              {item.subtitle}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="font-lacy-display text-base font-medium text-[#8C5836]">
                          {item.time}
                        </span>
                      )}
                    </div>

                    <div className="relative z-10 flex items-center justify-center">
                      <span className="h-3 w-3 rounded-full border-2 border-[#FBF5EA] bg-[#C99648] shadow-xs" />
                    </div>

                    <div className="pl-2 text-left">
                      {!isLeft ? (
                        <>
                          <span className="block font-lacy-serif text-xs font-bold uppercase tracking-[0.12em] text-[#3B2314]">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="block font-lacy-text text-[10.5px] italic text-[#6E5038]">
                              {item.subtitle}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="inline-block h-[1px] w-8 bg-[#C99648]/50" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 2 — LOCATION & DRESS CODE PALETTE (wg_09.jpg - wg_11.jpg)
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[2]}
          aria-label="Location and Dress Code"
          className="mx-5 mt-6 rounded-[22px] border border-[#C99648]/45 bg-[#FFFDF9] p-4 text-center shadow-xs"
        >
          <span className="font-engraved text-[9px] uppercase tracking-[0.3em] text-[#8C5836]">
            {config.venue.sectionEyebrow}
          </span>
          <h2 className="mt-0.5 font-lacy-display text-2xl font-normal text-[#3B2314]">
            {config.venue.name}
          </h2>
          <p className="mt-0.5 font-lacy-text text-xs italic text-[#6E5038]">
            Address: {config.venue.fullAddress}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <a
              href={config.venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="lacy-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#4A2C18]"
            >
              <MapPin className="h-3 w-3 shrink-0 text-[#8C5A28]" />
              <span>{config.venue.openMapButtonLabel}</span>
            </a>

            <button
              type="button"
              onClick={onDownloadCalendar}
              className="lacy-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#4A2C18] cursor-pointer"
            >
              {calendarSaved ? (
                <>
                  <Check className="h-3 w-3 shrink-0 text-[#8C5A28]" />
                  <span>Calendar Event Saved (.ics)</span>
                </>
              ) : (
                <>
                  <Calendar className="h-3 w-3 shrink-0 text-[#8C5A28]" />
                  <span>{config.venue.addToCalendarButtonLabel}</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 border-t border-[#C99648]/30 pt-3">
            <h3 className="font-lacy-display text-lg font-normal text-[#3B2314]">
              Dress Code
            </h3>
            <p className="mt-1 font-lacy-text text-xs italic leading-snug text-[#5E432E]">
              We kindly invite you to dress in elegant attire that reflects the
              style and spirit of our special day.
            </p>
            <div className="mt-2.5 flex items-center justify-center gap-2.5">
              {DRESS_CODE_SWATCHES.map((sw) => (
                <span
                  key={sw.name}
                  title={sw.name}
                  style={{ backgroundColor: sw.hex }}
                  className="h-6 w-6 rounded-full border border-[#8C5836]/50 shadow-2xs"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            SECTION 3 — COLON-SEPARATED COUNTDOWN ("THE CELEBRATION BEGINS IN")
           ------------------------------------------------------------------ */}
        <section
          ref={sectionRefs[3]}
          aria-label="The Celebration Begins In Countdown"
          className="mx-5 mt-6 rounded-[22px] border border-[#DFB672]/70 bg-gradient-to-b from-[#4E2618] to-[#36190D] p-5 text-center text-[#FBF5EA] shadow-[0_14px_34px_rgba(42,20,10,0.26)]"
        >
          <span className="font-engraved text-[9px] uppercase tracking-[0.28em] text-[#DFB672]">
            {config.sections.countdown.eyebrow}
          </span>
          <h2 className="mt-1 font-lacy-display text-xl font-normal text-[#FFF6E5]">
            {config.sections.countdown.title}
          </h2>

          {isArrived ? (
            <div className="my-3">
              <h3 className="font-lacy-display text-2xl text-[#FFF6E5]">
                {config.sections.countdown.arrivedTitle}
              </h3>
              <p className="mt-1 font-lacy-text text-xs italic text-[#FBF5EA]/90">
                {config.sections.countdown.arrivedMessage}
              </p>
            </div>
          ) : (
            <div className="my-4 flex items-center justify-center gap-1.5 sm:gap-2">
              {countdownUnits.map((unit, idx) => (
                <React.Fragment key={unit.label}>
                  <div className="flex flex-col items-center min-w-[54px]">
                    <motion.span
                      key={`${unit.label}-${unit.value}`}
                      className="font-lacy-display text-2xl sm:text-[1.95rem] font-normal leading-none tabular-nums text-[#FFF6E5]"
                    >
                      {String(unit.value).padStart(2, '0')}
                    </motion.span>
                    <span className="mt-1.5 font-lacy-serif text-[9px] uppercase tracking-[0.18em] text-[#DFB672]">
                      {unit.label}
                    </span>
                  </div>
                  {idx < countdownUnits.length - 1 && (
                    <span className="-mt-4 font-lacy-display text-xl text-[#DFB672]">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          <p className="font-lacy-text text-xs italic text-[#FBF5EA]/90">
            “{config.sections.closing.quote}”
          </p>

          <p className="mt-3 font-lacy-script text-2xl text-[#F3D292]">
            Hope to see you there!
          </p>
          <p className="font-lacy-display text-sm text-[#FFF6E5]">
            {config.couple.partnerOne} &amp; {config.couple.partnerTwo}
          </p>
        </section>
      </div>

      {/* ====================================================================
          STICKY BOTTOM PROVENÇAL NAVIGATION DOCK
         ==================================================================== */}
      <div className="absolute inset-x-4 bottom-3 z-30 flex items-center justify-between rounded-full border border-[#C99648]/65 bg-[#FFFDF9]/95 px-3 py-1.5 shadow-[0_10px_28px_rgba(46,24,12,0.18)] backdrop-blur-md">
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectSection?.(idx as InvitationSectionIndex)}
              aria-label={`Jump to section ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeSection === idx
                  ? 'w-5 bg-[#4E2618]'
                  : 'w-2 bg-[#C99648]/45 hover:bg-[#C99648]'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          {activeSection > 0 && (
            <button
              type="button"
              onClick={onPrevSection}
              className="font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#4E2618] cursor-pointer px-2 py-1"
            >
              {config.navigation.previousSectionLabel}
            </button>
          )}

          {activeSection < 3 ? (
            <button
              type="button"
              onClick={onNextSection}
              className="lacy-nacre-button inline-flex items-center justify-center px-4 py-1.5 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A2C18] cursor-pointer"
            >
              <span>{config.navigation.scrollDownLabel}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onReplayOpening}
              className="lacy-nacre-button inline-flex items-center gap-1 px-4 py-1.5 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.18em] text-[#4A2C18] cursor-pointer"
            >
              <RotateCcw className="h-2.5 w-2.5 text-[#8C5A28]" />
              <span>{config.navigation.replayOpeningLabel}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
