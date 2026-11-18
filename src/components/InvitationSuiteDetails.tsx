import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import type { InvitationConfig } from '../config/invitationConfig';
import { animationConfig } from '../config/animationConfig';
import { LUXURY_THEMES, type LuxuryThemeSpec } from '../config/themeRegistry';
import {
  LacyDiamondGemSvg,
  LacyGoldRuleDivider,
  LacyNacreTitlePlaque,
  LacyPearlBrooch,
  MotherOfPearlCameoSeal,
} from './CoutureArtAssets';
import { downloadWeddingIcs } from '../utils/calendar';
import { BlushBotanicalSuite } from './suites/BlushBotanicalSuite';
import { EmeraldCastleSuite } from './suites/EmeraldCastleSuite';
import { NoirArtDecoSuite } from './suites/NoirArtDecoSuite';
import { ChateauRegencySuite } from './suites/ChateauRegencySuite';
import { GoldenRoseProvenceSuite } from './suites/GoldenRoseProvenceSuite';

export type InvitationSectionIndex = 0 | 1 | 2 | 3;

interface CountdownRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isArrived: boolean;
}

function resolveWeddingTargetUtcMs(config: InvitationConfig): number {
  const {
    yearNumber,
    monthNumber,
    dayNumber,
    hour24,
    minuteNumber,
    timezone,
    isoStartDateTime,
  } = config.date;

  try {
    const approxUtc = Date.UTC(
      yearNumber,
      monthNumber - 1,
      dayNumber,
      hour24,
      minuteNumber,
      0
    );

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezone || 'Europe/Rome',
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const parts = Object.fromEntries(
      formatter.formatToParts(new Date(approxUtc)).map((p) => [p.type, p.value])
    );

    const zonedAsUtc = Date.UTC(
      Number(parts.year),
      Number(parts.month) - 1,
      Number(parts.day),
      Number(parts.hour) % 24,
      Number(parts.minute),
      Number(parts.second)
    );

    const offsetMs = zonedAsUtc - approxUtc;
    return approxUtc - offsetMs;
  } catch {
    const parsed = new Date(isoStartDateTime).getTime();
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }
}

function calculateRemainingTime(targetUtcMs: number): CountdownRemaining {
  const diffMs = targetUtcMs - Date.now();
  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isArrived: true,
    };
  }

  return {
    days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diffMs / (1000 * 60)) % 60),
    seconds: Math.floor((diffMs / 1000) % 60),
    isArrived: false,
  };
}

interface InvitationSuiteDetailsProps {
  config: InvitationConfig;
  isOpened: boolean;
  activeSection: InvitationSectionIndex;
  hasCompletedInitialStagger: boolean;
  onChangeSection: (nextSection: InvitationSectionIndex) => void;
  onReplayOpening: () => void;
  theme?: LuxuryThemeSpec;
}

const LACY_VENUE_ARCH_CLIP =
  'polygon(50% 0, 68% 5%, 84% 14%, 100% 29%, 100% 91%, 96% 97%, 86% 100%, 14% 100%, 4% 97%, 0 91%, 0 29%, 16% 14%, 32% 5%)';

const contentVariants = {
  enter: {
    y: animationConfig.contentSlideEnterY,
    opacity: 0,
    filter: `blur(${animationConfig.contentTransitionBlurPx}px)`,
  },
  center: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: animationConfig.sectionTransitionDurationSec,
      delay: 0.1,
      ease: animationConfig.luxuryEasing,
    },
  },
  exit: {
    y: animationConfig.contentSlideExitY,
    opacity: 0,
    filter: `blur(${animationConfig.contentTransitionBlurPx}px)`,
    transition: {
      duration: animationConfig.textFadeOutDurationSec,
      ease: animationConfig.luxuryEasing,
    },
  },
};

export const InvitationSuiteDetails: React.FC<InvitationSuiteDetailsProps> = ({
  config,
  isOpened,
  activeSection,
  hasCompletedInitialStagger,
  onChangeSection,
  onReplayOpening,
  theme = LUXURY_THEMES.ivory,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const targetUtcMs = useMemo(() => resolveWeddingTargetUtcMs(config), [config]);

  const [countdown, setCountdown] = useState<CountdownRemaining>(() =>
    calculateRemainingTime(targetUtcMs)
  );

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [calendarSaved, setCalendarSaved] = useState(false);

  const touchStartYRef = useRef<number | null>(null);
  const lockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setCountdown(calculateRemainingTime(targetUtcMs));
    const interval = window.setInterval(() => {
      setCountdown(calculateRemainingTime(targetUtcMs));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetUtcMs]);

  useEffect(() => {
    return () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
    };
  }, []);

  const navigateToSection = useCallback(
    (targetIndex: InvitationSectionIndex) => {
      if (!isOpened || isTransitioning || targetIndex === activeSection) {
        return;
      }

      setIsTransitioning(true);
      onChangeSection(targetIndex);

      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
      lockTimerRef.current = window.setTimeout(() => {
        setIsTransitioning(false);
      }, animationConfig.sectionTransitionLockMs);
    },
    [isOpened, isTransitioning, activeSection, onChangeSection]
  );

  const handleNextSection = useCallback(() => {
    if (activeSection === 0) navigateToSection(1);
    else if (activeSection === 1) navigateToSection(2);
    else if (activeSection === 2) navigateToSection(3);
  }, [activeSection, navigateToSection]);

  const handlePrevSection = useCallback(() => {
    if (activeSection === 3) navigateToSection(2);
    else if (activeSection === 2) navigateToSection(1);
    else if (activeSection === 1) navigateToSection(0);
  }, [activeSection, navigateToSection]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isOpened || isTransitioning) return;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isOpened || isTransitioning || touchStartYRef.current === null) return;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    touchStartYRef.current = null;

    if (deltaY > 45 && activeSection < 3) {
      handleNextSection();
    } else if (deltaY < -45 && activeSection > 0) {
      handlePrevSection();
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isOpened || isTransitioning) return;
    if (e.deltaY > 32 && activeSection < 3) {
      handleNextSection();
    } else if (e.deltaY < -32 && activeSection > 0) {
      handlePrevSection();
    }
  };

  const handleDownloadCalendar = () => {
    downloadWeddingIcs(config);
    setCalendarSaved(true);
    window.setTimeout(() => setCalendarSaved(false), 3000);
  };

  const getInitialRevealProps = (staggerDelaySec: number) => {
    if (prefersReducedMotion || hasCompletedInitialStagger) {
      return {
        initial: { opacity: 1, y: 0, filter: 'blur(0px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      };
    }

    const totalDelay =
      animationConfig.initialTextRevealDelaySec + staggerDelaySec;

    return {
      initial: { opacity: 0.02, y: 14, filter: 'blur(4px)' },
      animate: isOpened
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0.02, y: 14, filter: 'blur(4px)' },
      transition: {
        duration: animationConfig.textFadeInDurationSec,
        delay: totalDelay,
        ease: animationConfig.luxuryEasing,
      },
    };
  };

  const s = animationConfig.initialStaggerSec;

  const countdownUnits = [
    { label: config.sections.countdown.labels.days, value: countdown.days },
    { label: config.sections.countdown.labels.hours, value: countdown.hours },
    { label: config.sections.countdown.labels.minutes, value: countdown.minutes },
    { label: config.sections.countdown.labels.seconds, value: countdown.seconds },
  ];

  const sharedSuiteProps = {
    config,
    theme,
    isOpened,
    activeSection,
    hasCompletedInitialStagger,
    isTransitioning,
    calendarSaved,
    countdownUnits,
    isArrived: countdown.isArrived,
    onSelectSection: navigateToSection,
    onNextSection: handleNextSection,
    onPrevSection: handlePrevSection,
    onDownloadCalendar: handleDownloadCalendar,
    onReplayOpening,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onWheel: handleWheel,
  };

  if (theme.id === 'blush') {
    return <BlushBotanicalSuite {...sharedSuiteProps} />;
  }

  if (theme.id === 'emerald') {
    return <EmeraldCastleSuite {...sharedSuiteProps} />;
  }

  if (theme.id === 'noir') {
    return <NoirArtDecoSuite {...sharedSuiteProps} />;
  }

  if (theme.id === 'chateau-blue') {
    return <ChateauRegencySuite {...sharedSuiteProps} />;
  }

  if (theme.id === 'golden-rose') {
    return <GoldenRoseProvenceSuite {...sharedSuiteProps} />;
  }

  /* ==========================================================================
     ORIGINAL IVORY (& DEFAULT SHARED) SUITE LAYOUT
     ========================================================================== */
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative inset-0 h-full w-full overflow-hidden select-none"
    >
      {/* Stationary Card Background */}
      <img
        src={theme.assets.innerCardBg}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
      />

      {/* Inner Arch Content Safe Area */}
      <div className="absolute inset-x-[12%] top-[14.8%] bottom-[11.2%] z-10 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          {/* ================================================================
              SECTION 0 — THE WEDDING INVITATION
             ================================================================ */}
          {activeSection === 0 && (
            <motion.section
              key="section-0-invitation"
              aria-label="The Wedding Invitation"
              variants={prefersReducedMotion ? undefined : contentVariants}
              initial={hasCompletedInitialStagger ? 'enter' : false}
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-between py-1 text-center"
            >
              {/* 1. Heading & Pearl Brooch */}
              <div className="flex flex-col items-center">
                <motion.p
                  {...getInitialRevealProps(s.heading)}
                  className={`${theme.embossedAccentClass} font-engraved text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.32em] indent-[0.16em]`}
                >
                  {config.eventType}
                </motion.p>
                <div className="mt-1.5">
                  <LacyPearlBrooch
                    delay={
                      hasCompletedInitialStagger
                        ? 0
                        : animationConfig.initialTextRevealDelaySec + s.brooch
                    }
                    isStarted={isOpened}
                    theme={theme}
                  />
                </div>
              </div>

              {/* 2. Couple Names */}
              <div className="flex flex-col items-center">
                <h1
                  aria-label={`${config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwo}`}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    {...getInitialRevealProps(s.partnerOne)}
                    className={`${theme.debossedNameClass} block font-lacy-display text-[2.45rem] sm:text-[2.95rem] font-normal leading-[1.08] tracking-[-0.02em] px-2`}
                  >
                    {config.couple.partnerOne}
                  </motion.span>

                  <motion.span
                    {...getInitialRevealProps(s.conjunction)}
                    className={`${theme.embossedAccentClass} -my-0.5 block font-lacy-display italic text-[1.75rem] sm:text-[2.05rem] font-normal leading-none px-2`}
                  >
                    {config.couple.conjunction}
                  </motion.span>

                  <motion.span
                    {...getInitialRevealProps(s.partnerTwo)}
                    className={`${theme.debossedNameClass} block font-lacy-display text-[2.45rem] sm:text-[2.95rem] font-normal leading-[1.08] tracking-[-0.02em] px-2`}
                  >
                    {config.couple.partnerTwo}
                  </motion.span>
                </h1>
              </div>

              {/* 3. Invitation Message & Families */}
              <div className="flex w-full flex-col items-center">
                <LacyGoldRuleDivider
                  delay={
                    hasCompletedInitialStagger
                      ? 0
                      : animationConfig.initialTextRevealDelaySec + s.topRule
                  }
                  isStarted={isOpened}
                  theme={theme}
                />

                <motion.p
                  {...getInitialRevealProps(s.message)}
                  className={`${theme.debossedInkClass} mx-auto my-2.5 max-w-[260px] sm:max-w-[295px] font-lacy-text text-[14px] sm:text-[15.5px] font-normal leading-[1.38]`}
                >
                  “{config.invitationMessage}”
                </motion.p>

                <LacyGoldRuleDivider
                  delay={
                    hasCompletedInitialStagger
                      ? 0
                      : animationConfig.initialTextRevealDelaySec + s.bottomRule
                  }
                  isStarted={isOpened}
                  theme={theme}
                />

                <motion.p
                  {...getInitialRevealProps(s.families)}
                  className={`${theme.embossedAccentClass} mt-2 font-lacy-serif text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] indent-[0.11em]`}
                >
                  {config.couple.brideFamily} &amp; {config.couple.groomFamily} Families
                </motion.p>
              </div>

              {/* 4. Wedding Date & 5. Ceremony Time (Medallion) */}
              <div className="flex w-full flex-col items-center">
                <div className="grid w-full max-w-[300px] grid-cols-[1fr_auto_1fr] items-center gap-2">
                  <motion.div
                    {...getInitialRevealProps(s.dateMedallion)}
                    className="flex justify-end"
                  >
                    <span
                      className={`${theme.debossedInkClass} font-lacy-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] indent-[0.09em] whitespace-nowrap`}
                    >
                      {config.date.dayOfWeek}
                    </span>
                  </motion.div>

                  <motion.div
                    {...getInitialRevealProps(s.dateMedallion)}
                    className="relative flex w-[76px] sm:w-[88px] aspect-[597/892] items-center justify-center"
                  >
                    <img
                      src={theme.assets.dateMedallion}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(114,99,81,0.18)]"
                    />
                    <span
                      style={{ top: '37.5%' }}
                      className={`${theme.debossedNameClass} absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-lacy-display text-[1.95rem] sm:text-[2.25rem] font-normal leading-none`}
                    >
                      {config.date.day}
                    </span>
                    <span
                      style={{ top: '62%' }}
                      className={`${theme.debossedInkClass} absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-lacy-serif text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] indent-[0.1em]`}
                    >
                      {config.date.month}
                    </span>
                    <span
                      style={{ top: '82%' }}
                      className={`${theme.debossedInkClass} absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-lacy-serif text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] indent-[0.12em]`}
                    >
                      {config.date.year}
                    </span>
                  </motion.div>

                  <motion.div
                    {...getInitialRevealProps(s.ceremonyTime)}
                    className="flex justify-start"
                  >
                    <span
                      className={`${theme.debossedInkClass} font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] indent-[0.1em] whitespace-nowrap`}
                    >
                      {config.date.timeDisplay}
                    </span>
                  </motion.div>
                </div>

                <motion.p
                  {...getInitialRevealProps(s.ceremonyTime)}
                  className={`${theme.debossedInkClass} mt-1.5 font-lacy-text text-xs sm:text-[13px] italic`}
                >
                  {config.date.fullDateDisplay} · {config.venue.name}, {config.venue.location}
                </motion.p>
              </div>

              {/* Scroll Down ↓ */}
              <motion.div
                {...getInitialRevealProps(s.scrollPrompt)}
                className="flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={isTransitioning}
                  className={`${theme.nacreButtonClass} inline-flex items-center justify-center px-6 py-2 font-lacy-serif text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] indent-[0.12em] cursor-pointer disabled:opacity-60`}
                >
                  <span>{config.navigation.scrollDownLabel}</span>
                </button>
              </motion.div>
            </motion.section>
          )}

          {/* ================================================================
              SECTION 1 — THE CELEBRATION (Wedding Programme)
             ================================================================ */}
          {activeSection === 1 && (
            <motion.section
              key="section-1-celebration"
              aria-label="The Celebration Wedding Programme"
              variants={prefersReducedMotion ? undefined : contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-between py-1 text-center"
            >
              <LacyNacreTitlePlaque
                eyebrow={config.sections.celebration.eyebrow}
                title={config.sections.celebration.title}
                theme={theme}
              />

              <div className="my-auto flex w-full max-w-[290px] flex-col items-center space-y-2 sm:space-y-2.5">
                {config.sections.celebration.items.map((item, idx) => (
                  <div key={item.title} className="flex w-full flex-col items-center">
                    {idx > 0 && (
                      <div className="mb-1.5 flex justify-center" style={{ color: theme.accentHex }}>
                        <LacyDiamondGemSvg className="h-2.5 w-2.5" />
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-2">
                      <span
                        className={`${theme.embossedAccentClass} font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]`}
                      >
                        {item.time}
                      </span>
                      <span className="text-xs" style={{ color: theme.accentHex }}>
                        —
                      </span>
                      <h3
                        className={`${theme.debossedNameClass} font-lacy-display text-[15.5px] sm:text-[17.5px] font-normal leading-snug`}
                      >
                        {item.title}
                      </h3>
                    </div>
                    {item.subtitle && (
                      <p
                        style={{ color: theme.secondaryTextHex }}
                        className="font-lacy-text text-[11.5px] sm:text-xs italic"
                      >
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={isTransitioning}
                  className={`${theme.nacreButtonClass} inline-flex items-center justify-center px-6 py-2 font-lacy-serif text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] indent-[0.12em] cursor-pointer disabled:opacity-60`}
                >
                  <span>{config.navigation.scrollDownLabel}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={isTransitioning}
                  style={{ color: theme.subtleLinkHex }}
                  className="font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.22em] transition cursor-pointer py-0.5"
                >
                  {config.navigation.previousSectionLabel}
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              SECTION 2 — THE DESTINATION (Wedding Location)
             ================================================================ */}
          {activeSection === 2 && (
            <motion.section
              key="section-2-destination"
              aria-label="The Destination Wedding Location"
              variants={prefersReducedMotion ? undefined : contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-between py-1 text-center"
            >
              <div className="flex flex-col items-center">
                <span
                  className={`${theme.embossedAccentClass} font-engraved text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.3em] indent-[0.15em]`}
                >
                  {config.venue.sectionEyebrow}
                </span>
                <h2
                  className={`${theme.debossedNameClass} mt-0.5 font-lacy-display text-xl sm:text-2xl font-normal leading-tight`}
                >
                  {config.venue.sectionTitle}
                </h2>
              </div>

              <div className="relative -my-1 w-[172px] sm:w-[196px] aspect-[2/3] select-none">
                <div
                  style={{
                    left: '13.4%',
                    top: '17.7%',
                    width: '73.4%',
                    height: '59.6%',
                    clipPath: LACY_VENUE_ARCH_CLIP,
                  }}
                  className="absolute overflow-hidden bg-[#EAE0D0]"
                >
                  <img
                    src={config.venue.illustrationUrl}
                    alt={`${config.venue.name}, ${config.venue.location}`}
                    draggable={false}
                    className="h-full w-full object-cover"
                  />
                </div>

                <img
                  src={theme.assets.venueArchFrame}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_8px_18px_rgba(114,99,81,0.2)]"
                />

                <div
                  style={{
                    left: '25%',
                    right: '23.5%',
                    top: '79.8%',
                    bottom: '10%',
                  }}
                  className="pointer-events-none absolute flex flex-col items-center justify-center px-1 text-center"
                >
                  <span
                    className={`${theme.embossedAccentClass} font-lacy-display text-[12.5px] sm:text-[14.5px] font-medium leading-none tracking-[0.02em]`}
                  >
                    {config.venue.name}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <p
                  className={`${theme.debossedInkClass} font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] indent-[0.12em]`}
                >
                  {config.venue.location}
                </p>
                <p
                  className={`${theme.embossedAccentClass} mt-0.5 font-lacy-serif text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em]`}
                >
                  {config.date.fullDateDisplay} · {config.date.timeDisplay}
                </p>
              </div>

              <div className="flex w-full max-w-[260px] flex-col items-center gap-1.5">
                <a
                  href={config.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${theme.nacreButtonClass} inline-flex w-full items-center justify-center gap-2 px-5 py-1.5 font-lacy-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em]`}
                >
                  <MapPin className="h-3 w-3" style={{ color: theme.accentDeepHex }} />
                  <span>{config.venue.openMapButtonLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className={`${theme.nacreButtonClass} inline-flex w-full items-center justify-center gap-2 px-5 py-1.5 font-lacy-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] cursor-pointer`}
                >
                  {calendarSaved ? (
                    <>
                      <Check className="h-3 w-3" style={{ color: theme.accentDeepHex }} />
                      <span>Calendar Event Saved (.ics)</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3" style={{ color: theme.accentDeepHex }} />
                      <span>{config.venue.addToCalendarButtonLabel}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={isTransitioning}
                  className={`${theme.nacreButtonClass} inline-flex items-center justify-center px-6 py-1.5 font-lacy-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] indent-[0.12em] cursor-pointer disabled:opacity-60`}
                >
                  <span>{config.navigation.scrollDownLabel}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={isTransitioning}
                  style={{ color: theme.subtleLinkHex }}
                  className="font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] transition cursor-pointer py-0.5"
                >
                  {config.navigation.previousSectionLabel}
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              SECTION 3 — FINAL COUNTDOWN PAGE ("Until We Say I Do")
             ================================================================ */}
          {activeSection === 3 && (
            <motion.section
              key="section-3-countdown"
              aria-label="Until We Say I Do Wedding Countdown"
              variants={prefersReducedMotion ? undefined : contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex flex-col items-center justify-between py-1 text-center"
            >
              <LacyNacreTitlePlaque
                eyebrow={config.sections.countdown.eyebrow}
                title={config.sections.countdown.title}
                theme={theme}
              />

              {countdown.isArrived ? (
                <div className="my-auto flex flex-col items-center px-3">
                  <MotherOfPearlCameoSeal className="w-16 sm:w-20" theme={theme} />
                  <h3
                    className={`${theme.debossedNameClass} mt-3 font-lacy-display text-2xl sm:text-3xl font-normal`}
                  >
                    {config.sections.countdown.arrivedTitle}
                  </h3>
                  <p
                    className={`${theme.debossedInkClass} mt-2 max-w-[265px] font-lacy-text text-sm sm:text-[15px] italic leading-relaxed`}
                  >
                    {config.sections.countdown.arrivedMessage}
                  </p>
                </div>
              ) : (
                <div className="my-auto flex w-full max-w-[295px] flex-col items-center">
                  <div className="grid w-full grid-cols-2 gap-2 sm:gap-2.5">
                    {countdownUnits.map((unit) => (
                      <div
                        key={unit.label}
                        className="relative flex aspect-[419/332] w-full flex-col items-center justify-center select-none"
                      >
                        <img
                          src={theme.assets.dayTimePlaque}
                          alt=""
                          aria-hidden="true"
                          draggable={false}
                          className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(114,99,81,0.16)]"
                        />
                        <motion.span
                          key={`${unit.label}-${unit.value}`}
                          initial={prefersReducedMotion ? false : { opacity: 0.55, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: animationConfig.luxuryEasing }}
                          className={`${theme.debossedNameClass} relative z-10 font-lacy-display text-[1.6rem] sm:text-[1.85rem] font-normal leading-none tabular-nums`}
                        >
                          {String(unit.value).padStart(2, '0')}
                        </motion.span>
                        <span
                          className={`${theme.embossedAccentClass} relative z-10 mt-1 font-lacy-serif text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.22em] indent-[0.11em]`}
                        >
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p
                    style={{ color: theme.secondaryTextHex }}
                    className="mt-2.5 max-w-[270px] font-lacy-text text-xs sm:text-[13.5px] italic leading-snug"
                  >
                    {config.sections.countdown.quote}
                  </p>
                </div>
              )}

              <div className="flex w-full flex-col items-center">
                <LacyGoldRuleDivider widthClass="w-36" theme={theme} />

                <p
                  className={`${theme.debossedNameClass} mt-2 font-lacy-display text-lg sm:text-xl font-normal`}
                >
                  {config.couple.partnerOne}{' '}
                  <span className={`${theme.embossedAccentClass} italic`}>
                    {config.couple.conjunction}
                  </span>{' '}
                  {config.couple.partnerTwo}
                </p>

                <p
                  className={`${theme.debossedInkClass} mt-1 max-w-[265px] font-lacy-text text-[12px] sm:text-[13px] italic leading-snug`}
                >
                  “{config.sections.closing.quote}”
                </p>

                <div className="mt-2.5 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrevSection}
                    disabled={isTransitioning}
                    style={{ color: theme.subtleLinkHex }}
                    className="font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] transition cursor-pointer"
                  >
                    {config.navigation.previousSectionLabel}
                  </button>
                  <span
                    className="h-2.5 w-px opacity-40"
                    style={{ backgroundColor: theme.accentHex }}
                  />
                  <button
                    type="button"
                    onClick={onReplayOpening}
                    style={{ color: theme.subtleLinkHex }}
                    className="inline-flex items-center gap-1 font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] transition cursor-pointer"
                  >
                    <RotateCcw className="h-2.5 w-2.5" style={{ color: theme.accentDeepHex }} />
                    <span>{config.navigation.replayOpeningLabel}</span>
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
