import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import type { InvitationConfig } from '../../config/invitationConfig';
import { animationConfig } from '../../config/animationConfig';
import type { LuxuryThemeSpec } from '../../config/themeRegistry';
import type { InvitationSectionIndex } from '../InvitationSuiteDetails';

interface ChateauRegencySuiteProps {
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
 * Distinct Depth-Scale & Blur-Morph Transition (Unique to 05 — The Château Blue)
 */
const porcelainMorphVariants = {
  enter: {
    scale: 0.9,
    opacity: 0,
    filter: 'blur(6px)',
  },
  center: {
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: animationConfig.luxuryEasing,
    },
  },
  exit: {
    scale: 1.06,
    opacity: 0,
    filter: 'blur(5px)',
    transition: {
      duration: 0.65,
      ease: animationConfig.luxuryEasing,
    },
  },
};

export const ChateauRegencySuite: React.FC<ChateauRegencySuiteProps> = ({
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
      className="relative inset-0 flex h-full w-full flex-col justify-between overflow-hidden bg-[#6E8FAD] px-5 pt-12 pb-4 select-none"
    >
      {/* Wedgwood Blue & Porcelain Relief Background */}
      <img
        src={theme.assets.innerCardBg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
      />

      {/* Top Cameo Medallion Chapter Selector */}
      <nav
        aria-label="Palace Invitation Chapters"
        className="relative z-30 mx-auto flex items-center gap-2 rounded-full border border-[#C4A265] bg-[#FAFBFD]/95 px-3 py-1 shadow-sm"
      >
        {(['I · Royal', 'II · Breakfast', 'III · Palace', 'IV · Summer'] as const).map(
          (label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => onSelectSection?.(idx as InvitationSectionIndex)}
              className={`rounded-full px-2 py-0.5 font-engraved text-[8.5px] font-semibold uppercase tracking-[0.14em] transition cursor-pointer ${
                activeSection === idx
                  ? 'bg-[#6E8FAD] text-[#FAFBFD]'
                  : 'text-[#466380] hover:text-[#213448]'
              }`}
            >
              {label}
            </button>
          )
        )}
      </nav>

      {/* Stacked Porcelain Storybook Sheet Container */}
      <div className="relative z-20 my-2 flex-1 min-h-0 w-full">
        {/* Decorative Underlying Porcelain Sheet Stack for Physical Depth */}
        <div className="pointer-events-none absolute inset-1.5 translate-y-1.5 rotate-[0.8deg] rounded-[24px] border border-[#C4A265]/50 bg-[#EEF4FA]/80 shadow-md" />

        <AnimatePresence initial={false} mode="wait">
          {/* ----------------------------------------------------------------
              SHEET 0 — BRITISH ARISTOCRATIC PALACE INVITATION
             ---------------------------------------------------------------- */}
          {activeSection === 0 && (
            <motion.section
              key="chateau-sheet-0"
              aria-label="Summer Palace Wedding Invitation"
              variants={prefersReducedMotion ? undefined : porcelainMorphVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex h-full w-full flex-col justify-between rounded-[24px] border-2 border-[#C4A265] bg-[#FAFBFD]/96 p-4 text-center shadow-[0_18px_40px_rgba(32,50,70,0.18)]"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-9 w-14 items-center justify-center rounded-[50%] border-2 border-[#C4A265] bg-[#6E8FAD] shadow-xs">
                  <span className="font-engraved text-[9.5px] font-semibold tracking-[0.16em] text-[#FAFBFD]">
                    {config.couple.monogramInitialOne}&amp;{config.couple.monogramInitialTwo}
                  </span>
                </div>
                <span className="mt-1.5 font-engraved text-[9px] uppercase tracking-[0.28em] text-[#8C6B32]">
                  {config.eventType}
                </span>
              </div>

              <div className="my-auto flex flex-col items-center">
                <p className="font-lacy-serif text-[10px] font-semibold uppercase tracking-[0.18em] text-[#466380]">
                  {config.couple.hostLine}
                </p>

                <h1
                  aria-label={`${config.couple.partnerOneFull || config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwoFull || config.couple.partnerTwo}`}
                  className="mt-1.5 flex flex-col items-center"
                >
                  <span className="chateau-debossed-name font-lacy-display text-2xl sm:text-[1.8rem] font-normal leading-tight">
                    {config.couple.partnerOneFull || config.couple.partnerOne}
                  </span>
                  <span className="font-lacy-script text-2xl text-[#8C6B32]">
                    {config.couple.conjunction}
                  </span>
                  <span className="chateau-debossed-name font-lacy-display text-2xl sm:text-[1.8rem] font-normal leading-tight">
                    {config.couple.partnerTwoFull || config.couple.partnerTwo}
                  </span>
                </h1>

                <p className="mx-auto mt-2 max-w-[270px] font-lacy-text text-[13px] italic leading-snug text-[#2B4056]">
                  “{config.invitationMessage}”
                </p>
              </div>

              <div className="rounded-[16px] border border-[#C4A265]/75 bg-[#F0F5FA] px-3 py-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-lacy-serif text-[10px] font-bold uppercase tracking-[0.16em] text-[#466380]">
                    {config.date.dayOfWeek}
                  </span>
                  <span className="rounded-full bg-[#6E8FAD] px-2.5 py-0.5 font-engraved text-xs font-semibold text-[#FAFBFD]">
                    {config.date.day} {config.date.month} {config.date.year}
                  </span>
                  <span className="font-lacy-serif text-[10px] font-bold uppercase tracking-[0.16em] text-[#8C6B32]">
                    {config.date.timeDisplay}
                  </span>
                </div>
                <p className="mt-1 font-lacy-display text-xs font-medium text-[#213448]">
                  {config.venue.name}, {config.venue.location}
                </p>
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              SHEET 1 — THE WEDDING BREAKFAST
             ---------------------------------------------------------------- */}
          {activeSection === 1 && (
            <motion.section
              key="chateau-sheet-1"
              aria-label="The Wedding Breakfast Programme"
              variants={prefersReducedMotion ? undefined : porcelainMorphVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex h-full w-full flex-col justify-between rounded-[24px] border-2 border-[#C4A265] bg-[#FAFBFD]/96 p-4 text-center shadow-[0_18px_40px_rgba(32,50,70,0.18)]"
            >
              <div>
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#8C6B32]">
                  {config.sections.celebration.eyebrow}
                </span>
                <h2 className="chateau-debossed-name font-lacy-display text-xl sm:text-2xl font-normal">
                  {config.sections.celebration.title}
                </h2>
                <p className="font-lacy-text text-[11px] italic text-[#466380]">
                  {config.sections.celebration.subtitle}
                </p>
              </div>

              <div className="my-auto flex flex-col space-y-1.5">
                {config.sections.celebration.items.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-[12px] border border-[#6E8FAD]/30 bg-[#F2F6FA] px-3 py-1.5 text-left"
                  >
                    <div className="min-w-0 pr-2">
                      <h3 className="truncate font-lacy-display text-[13px] sm:text-[14px] font-medium text-[#213448]">
                        {item.title}
                      </h3>
                      {item.subtitle && (
                        <p className="truncate font-lacy-text text-[10.5px] italic text-[#466380]">
                          {item.subtitle}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-engraved text-[9.5px] font-semibold text-[#8C6B32]">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              SHEET 2 — BLENHEIM PALACE, OXFORDSHIRE
             ---------------------------------------------------------------- */}
          {activeSection === 2 && (
            <motion.section
              key="chateau-sheet-2"
              aria-label="Blenheim Palace Oxfordshire Destination"
              variants={prefersReducedMotion ? undefined : porcelainMorphVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex h-full w-full flex-col justify-between rounded-[24px] border-2 border-[#C4A265] bg-[#FAFBFD]/96 p-4 text-center shadow-[0_18px_40px_rgba(32,50,70,0.18)]"
            >
              <div>
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#8C6B32]">
                  {config.venue.sectionEyebrow}
                </span>
                <h2 className="chateau-debossed-name font-lacy-display text-xl sm:text-2xl font-normal">
                  {config.venue.name}
                </h2>
                <p className="font-lacy-serif text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#466380]">
                  {config.venue.location}
                </p>
              </div>

              <div className="relative h-[136px] sm:h-[148px] w-full overflow-hidden rounded-[16px] border-2 border-[#C4A265] bg-[#6E8FAD] p-1">
                <img
                  src={config.venue.illustrationUrl}
                  alt={`${config.venue.name}, ${config.venue.location}`}
                  draggable={false}
                  className="h-full w-full rounded-[12px] object-cover"
                />
              </div>

              <div>
                {config.venue.description && (
                  <p className="font-lacy-text text-[11.5px] italic leading-snug text-[#2B4056]">
                    {config.venue.description}
                  </p>
                )}
                <p className="mt-1 font-lacy-serif text-[9px] font-semibold uppercase tracking-[0.14em] text-[#8C6B32]">
                  {config.venue.fullAddress}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={config.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chateau-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.16em]"
                >
                  <MapPin className="h-3 w-3 shrink-0 text-[#8C6B32]" />
                  <span>{config.venue.openMapButtonLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={onDownloadCalendar}
                  className="chateau-nacre-button inline-flex items-center justify-center gap-1.5 px-3 py-2 font-lacy-serif text-[9.5px] font-bold uppercase tracking-[0.16em] cursor-pointer"
                >
                  {calendarSaved ? (
                    <>
                      <Check className="h-3 w-3 shrink-0 text-[#8C6B32]" />
                      <span>Calendar Event Saved (.ics)</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3 shrink-0 text-[#8C6B32]" />
                      <span>{config.venue.addToCalendarButtonLabel}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.section>
          )}

          {/* ----------------------------------------------------------------
              SHEET 3 — UNTIL OUR WEDDING DAY
             ---------------------------------------------------------------- */}
          {activeSection === 3 && (
            <motion.section
              key="chateau-sheet-3"
              aria-label="An English Summer Awaits Countdown"
              variants={prefersReducedMotion ? undefined : porcelainMorphVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative flex h-full w-full flex-col justify-between rounded-[24px] border-2 border-[#C4A265] bg-[#FAFBFD]/96 p-4 text-center shadow-[0_18px_40px_rgba(32,50,70,0.18)]"
            >
              <div>
                <span className="font-engraved text-[8.5px] uppercase tracking-[0.28em] text-[#8C6B32]">
                  {config.sections.countdown.eyebrow}
                </span>
                <h2 className="chateau-debossed-name font-lacy-display text-xl sm:text-2xl font-normal">
                  {config.sections.countdown.title}
                </h2>
              </div>

              {isArrived ? (
                <div className="my-auto">
                  <h3 className="chateau-debossed-name font-lacy-display text-2xl">
                    {config.sections.countdown.arrivedTitle}
                  </h3>
                  <p className="mt-1.5 font-lacy-text text-xs italic text-[#2B4056]">
                    {config.sections.countdown.arrivedMessage}
                  </p>
                </div>
              ) : (
                <div className="my-auto flex flex-col items-center">
                  <div className="grid w-full grid-cols-2 gap-2.5">
                    {countdownUnits.map((unit) => (
                      <div
                        key={unit.label}
                        className="flex flex-col items-center justify-center rounded-[50%] border-2 border-[#C4A265] bg-[#6E8FAD] py-3.5 text-[#FAFBFD] shadow-sm"
                      >
                        <span className="font-lacy-display text-xl sm:text-2xl tabular-nums leading-none">
                          {String(unit.value).padStart(2, '0')}
                        </span>
                        <span className="mt-1 font-engraved text-[8px] uppercase tracking-[0.2em] text-[#F5E6C8]">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 font-lacy-text text-xs italic text-[#2B4056]">
                    {config.sections.countdown.quote}
                  </p>
                </div>
              )}

              <div>
                <p className="font-lacy-script text-2xl text-[#213448]">
                  {config.sections.closing.signOff}
                </p>
                <p className="mt-0.5 font-lacy-text text-[11.5px] italic text-[#2B4056]">
                  “{config.sections.closing.quote}”
                </p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Pinned Bottom Porcelain Navigation Bar */}
      <div className="relative z-30 flex shrink-0 items-center justify-between gap-2 pt-1">
        {activeSection > 0 ? (
          <button
            type="button"
            onClick={onPrevSection}
            disabled={isTransitioning}
            className="rounded-full border border-[#C4A265] bg-[#FAFBFD] px-3.5 py-2 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.18em] text-[#213448] cursor-pointer"
          >
            {config.navigation.previousSectionLabel}
          </button>
        ) : (
          <span className="pl-2 font-engraved text-[8.5px] uppercase tracking-[0.22em] text-[#8C6B32]">
            OXFORDSHIRE
          </span>
        )}

        {activeSection < 3 ? (
          <button
            type="button"
            onClick={onNextSection}
            disabled={isTransitioning}
            className="chateau-nacre-button inline-flex items-center justify-center px-5 py-2 font-lacy-serif text-[10.5px] font-bold uppercase tracking-[0.22em] cursor-pointer disabled:opacity-60"
          >
            <span>{config.navigation.scrollDownLabel}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onReplayOpening}
            className="chateau-nacre-button inline-flex items-center gap-1.5 px-4 py-2 font-lacy-serif text-[10px] font-bold uppercase tracking-[0.2em] cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-[#8C6B32]" />
            <span>{config.navigation.replayOpeningLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
};
