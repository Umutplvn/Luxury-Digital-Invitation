import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Check, RotateCcw } from 'lucide-react';
import type { InvitationConfig } from '../config/invitationConfig';
import { animationConfig } from '../config/animationConfig';
import {
  LacyDiamondGemSvg,
  LacyGoldRuleDivider,
  LacyNacreTitlePlaque,
  LacyPearlBrooch,
  MotherOfPearlCameoSeal,
} from './CoutureArtAssets';
import { downloadWeddingIcs } from '../utils/calendar';

/**
 * Sabit kart içindeki 4 bölümün indeks tipi:
 * 0 = The Wedding Invitation
 * 1 = The Celebration (Düğün Programı)
 * 2 = The Destination (Mekân ve Konum)
 * 3 = Until We Say I Do (Final Geri Sayım Sayfası)
 */
export type InvitationSectionIndex = 0 | 1 | 2 | 3;

interface CountdownRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isArrived: boolean;
}

/**
 * Belirtilen IANA saat dilimi (ör. "Europe/Rome") ve yerel tarih/saat bileşenleri için
 * kesin UTC milisaniye zaman damgasını hesaplar.
 */
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
    // Saat dilimi ayrıştırılamazsa yapılandırmadaki ISO tarihini kullan
    const parsed = new Date(isoStartDateTime).getTime();
    return Number.isNaN(parsed) ? Date.now() : parsed;
  }
}

/**
 * Hedef düğün zamanına kalan süreyi (Gün, Saat, Dakika, Saniye) hesaplar.
 * Düğün zamanı geldiğinde veya geçtiğinde `isArrived: true` döndürür.
 */
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
  /** Kapılar tamamen açılıp iç kart sabitlendikten sonra true olur */
  isOpened: boolean;
  /** Aktif bölüm indeksi (0 = Invitation, 1 = Celebration, 2 = Destination, 3 = Countdown) */
  activeSection: InvitationSectionIndex;
  /** İlk açılış kademeli metin animasyonunun tamamlanıp tamamlanmadığı */
  hasCompletedInitialStagger: boolean;
  /** Bölüm değiştirme işleyicisi */
  onChangeSection: (nextSection: InvitationSectionIndex) => void;
  /** Açılış animasyonunu baştan oynatmak için çağrılır */
  onReplayOpening: () => void;
}

/**
 * Sedef konum çerçevesinin (venue-arch-frame.webp) iç kemer açıklığını
 * kırpan 13 noktalı poligon maskesi.
 */
const LACY_VENUE_ARCH_CLIP =
  'polygon(50% 0, 68% 5%, 84% 14%, 100% 29%, 100% 91%, 96% 97%, 86% 100%, 14% 100%, 4% 97%, 0 91%, 0 29%, 16% 14%, 32% 5%)';

/**
 * Bölümler arasında yukarı doğru kayma ve saydamlık geçişi sağlayan
 * Framer Motion varyantları (Merkezi animationConfig değerlerini kullanır).
 */
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

/**
 * SABİT DAVETİYE KARTI VE 4 ANİMASYONLU İÇERİK BÖLÜMÜ
 *
 * Bu bileşen tek bir fiziksel davetiye kartı gibi davranır:
 * - Fildişi pamuklu kağıt dokusu, Chantilly dantel kenarlar, inciler ve altın kemer çerçeve
 *   tamamen SABİT kalır; bölümler değişirken asla hareket etmez veya yeniden yüklenmez.
 * - Yalnızca kemer çerçevesinin iç güvenli alanındaki (safe-area) metin ve içerik katmanı
 *   yukarı doğru süzülerek (slide-up + fade) Bölüm 1, Bölüm 2, Bölüm 3 ve Bölüm 4 (Final Geri Sayım)
 *   arasında geçiş yapar.
 */
export const InvitationSuiteDetails: React.FC<InvitationSuiteDetailsProps> = ({
  config,
  isOpened,
  activeSection,
  hasCompletedInitialStagger,
  onChangeSection,
  onReplayOpening,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Saat dilimi duyarlı hedef UTC milisaniye değeri
  const targetUtcMs = useMemo(() => resolveWeddingTargetUtcMs(config), [config]);

  // Canlı geri sayım durumu (her saniye güncellenir)
  const [countdown, setCountdown] = useState<CountdownRemaining>(() =>
    calculateRemainingTime(targetUtcMs)
  );

  // Geçiş sırasında tekrarlı tıklamaları ve kaydırmaları engelleyen kilit durumu
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Takvim (.ics) indirme geri bildirimi
  const [calendarSaved, setCalendarSaved] = useState(false);

  // Dokunmatik (touch swipe) başlangıç Y koordinatı ve zamanlayıcı referansları
  const touchStartYRef = useRef<number | null>(null);
  const lockTimerRef = useRef<number | null>(null);

  /**
   * Geri sayım sayacını her 1 saniyede bir günceller.
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      setCountdown(calculateRemainingTime(targetUtcMs));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetUtcMs]);

  /**
   * Bileşen kaldırıldığında (unmount) kilit zamanlayıcısını temizler.
   */
  useEffect(() => {
    return () => {
      if (lockTimerRef.current !== null) {
        window.clearTimeout(lockTimerRef.current);
      }
    };
  }, []);

  /**
   * Belirtilen hedef bölüme (0, 1, 2 veya 3) güvenli ve kilitli geçiş yapar.
   * Geçiş devam ederken yapılan tekrarlı tıklamaları yoksayar.
   */
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

  /**
   * Bir sonraki bölüme ("Scroll Down ↓") geçişi tetikler.
   */
  const handleNextSection = useCallback(() => {
    if (activeSection === 0) navigateToSection(1);
    else if (activeSection === 1) navigateToSection(2);
    else if (activeSection === 2) navigateToSection(3);
  }, [activeSection, navigateToSection]);

  /**
   * Bir önceki bölüme ("↑ Previous") dönüşü tetikler.
   */
  const handlePrevSection = useCallback(() => {
    if (activeSection === 3) navigateToSection(2);
    else if (activeSection === 2) navigateToSection(1);
    else if (activeSection === 1) navigateToSection(0);
  }, [activeSection, navigateToSection]);

  /**
   * Mobil cihazlarda yukarı/aşağı parmak kaydırma (swipe) hareketiyle
   * bölümler arasında doğal geçiş yapılmasını sağlar.
   */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isOpened || isTransitioning) return;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isOpened || isTransitioning || touchStartYRef.current === null) return;
    const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
    touchStartYRef.current = null;

    // 45px üzeri yukarı kaydırma -> sonraki bölüm; aşağı kaydırma -> önceki bölüm
    if (deltaY > 45 && activeSection < 3) {
      handleNextSection();
    } else if (deltaY < -45 && activeSection > 0) {
      handlePrevSection();
    }
  };

  /**
   * Masaüstünde fare tekerleği (wheel) ile bölümler arası yumuşak geçişi destekler.
   */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!isOpened || isTransitioning) return;
    if (e.deltaY > 32 && activeSection < 3) {
      handleNextSection();
    } else if (e.deltaY < -32 && activeSection > 0) {
      handlePrevSection();
    }
  };

  /**
   * Takvim (.ics) dosyasını indirir ve kullanıcıya onay durumu gösterir.
   */
  const handleDownloadCalendar = () => {
    downloadWeddingIcs(config);
    setCalendarSaved(true);
    window.setTimeout(() => setCalendarSaved(false), 3000);
  };

  /**
   * Kapılar ilk açıldığında Bölüm 1'deki her bir metin satırının kağıt yüzeyinden
   * kademeli olarak (staggered) belirmesini sağlayan animasyon yardımcı fonksiyonu.
   */
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

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      className="relative inset-0 h-full w-full overflow-hidden select-none"
    >
      {/* ====================================================================
          SABİT DAVETİYE KARTI ZEMİNİ (Stationary Card Background)
          Bu görsel tüm deneyim boyunca sabit kalır; asla hareket etmez veya yeniden boyutlanmaz.
         ==================================================================== */}
      <img
        src="/assets/lacy/inner-card-bg.webp"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover select-none"
      />

      {/* ====================================================================
          İÇ KEMER GÜVENLİ ALANI (Inner Arch Content Safe Area)
          Üst kemer kavislerini (%14.8 üst boşluk), alt kenar çizgisini (%11.2 alt boşluk)
          ve yan dantel işlemelerini (%12 yatay boşluk) koruyarak metinlerin
          çerçeve çizgileriyle çakışmasını kesin olarak engeller.
         ==================================================================== */}
      <div className="absolute inset-x-[12%] top-[14.8%] bottom-[11.2%] z-10 overflow-hidden">
        <AnimatePresence initial={false} mode="sync">
          {/* ================================================================
              BÖLÜM 1 — THE WEDDING INVITATION
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
              {/* 1. Üst Başlık ve İnci Broş */}
              <div className="flex flex-col items-center">
                <motion.p
                  {...getInitialRevealProps(s.heading)}
                  className="lacy-embossed-gold font-engraved text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.32em] indent-[0.16em]"
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
                  />
                </div>
              </div>

              {/* 2. Çiftin İsimleri: Isabella & Alexander */}
              <div className="flex flex-col items-center">
                <h1
                  aria-label={`${config.couple.partnerOne} ${config.couple.conjunction} ${config.couple.partnerTwo}`}
                  className="flex flex-col items-center"
                >
                  <motion.span
                    {...getInitialRevealProps(s.partnerOne)}
                    className="lacy-debossed-name block font-lacy-display text-[2.45rem] sm:text-[2.95rem] font-normal leading-[1.08] tracking-[-0.02em] px-2"
                  >
                    {config.couple.partnerOne}
                  </motion.span>

                  <motion.span
                    {...getInitialRevealProps(s.conjunction)}
                    className="lacy-embossed-gold -my-0.5 block font-lacy-display italic text-[1.75rem] sm:text-[2.05rem] font-normal leading-none px-2"
                  >
                    {config.couple.conjunction}
                  </motion.span>

                  <motion.span
                    {...getInitialRevealProps(s.partnerTwo)}
                    className="lacy-debossed-name block font-lacy-display text-[2.45rem] sm:text-[2.95rem] font-normal leading-[1.08] tracking-[-0.02em] px-2"
                  >
                    {config.couple.partnerTwo}
                  </motion.span>
                </h1>
              </div>

              {/* 3. Davet Mesajı ve Aile İsimleri */}
              <div className="flex w-full flex-col items-center">
                <LacyGoldRuleDivider
                  delay={
                    hasCompletedInitialStagger
                      ? 0
                      : animationConfig.initialTextRevealDelaySec + s.topRule
                  }
                  isStarted={isOpened}
                />

                <motion.p
                  {...getInitialRevealProps(s.message)}
                  className="lacy-debossed-ink mx-auto my-2.5 max-w-[260px] sm:max-w-[295px] font-lacy-text text-[14px] sm:text-[15.5px] font-normal leading-[1.38]"
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
                />

                <motion.p
                  {...getInitialRevealProps(s.families)}
                  className="lacy-embossed-gold mt-2 font-lacy-serif text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] indent-[0.11em]"
                >
                  {config.couple.brideFamily} &amp; {config.couple.groomFamily} Families
                </motion.p>
              </div>

              {/* 4. Düğün Tarihi & 5. Tören Saati (Sedef Madalyon Künyesi) */}
              <div className="flex w-full flex-col items-center">
                <div className="grid w-full max-w-[300px] grid-cols-[1fr_auto_1fr] items-center gap-2">
                  {/* Sol Kanat: Gün Adı (Saturday) */}
                  <motion.div
                    {...getInitialRevealProps(s.dateMedallion)}
                    className="flex justify-end"
                  >
                    <span className="lacy-debossed-ink font-lacy-serif text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] indent-[0.09em] whitespace-nowrap">
                      {config.date.dayOfWeek}
                    </span>
                  </motion.div>

                  {/* Orta: Sedef ve Altın Tarih Madalyonu (19 June 2027) */}
                  <motion.div
                    {...getInitialRevealProps(s.dateMedallion)}
                    className="relative flex w-[76px] sm:w-[88px] aspect-[597/892] items-center justify-center"
                  >
                    <img
                      src="/assets/lacy/date-medallion.webp"
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                      className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(114,99,81,0.18)]"
                    />
                    <span
                      style={{ top: '37.5%' }}
                      className="lacy-debossed-name absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-lacy-display text-[1.95rem] sm:text-[2.25rem] font-normal leading-none"
                    >
                      {config.date.day}
                    </span>
                    <span
                      style={{ top: '62%' }}
                      className="lacy-debossed-ink absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-lacy-serif text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] indent-[0.1em]"
                    >
                      {config.date.month}
                    </span>
                    <span
                      style={{ top: '82%' }}
                      className="lacy-debossed-ink absolute left-1/2 -translate-x-1/2 -translate-y-1/2 font-lacy-serif text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] indent-[0.12em]"
                    >
                      {config.date.year}
                    </span>
                  </motion.div>

                  {/* Sağ Kanat: Tören Saati (4:00 PM) */}
                  <motion.div
                    {...getInitialRevealProps(s.ceremonyTime)}
                    className="flex justify-start"
                  >
                    <span className="lacy-debossed-ink font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] indent-[0.1em] whitespace-nowrap">
                      {config.date.timeDisplay}
                    </span>
                  </motion.div>
                </div>

                {/* Tam Tarih Satırı: Saturday, 19 June 2027 */}
                <motion.p
                  {...getInitialRevealProps(s.ceremonyTime)}
                  className="lacy-debossed-ink mt-1.5 font-lacy-text text-xs sm:text-[13px] italic"
                >
                  {config.date.fullDateDisplay} · {config.venue.name}, {config.venue.location}
                </motion.p>
              </div>

              {/* Alt Etkileşim: Scroll Down ↓ */}
              <motion.div
                {...getInitialRevealProps(s.scrollPrompt)}
                className="flex flex-col items-center"
              >
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={isTransitioning}
                  className="lacy-nacre-button inline-flex items-center justify-center px-6 py-2 font-lacy-serif text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] indent-[0.12em] text-[#5E4F3E] cursor-pointer disabled:opacity-60"
                >
                  <span>{config.navigation.scrollDownLabel}</span>
                </button>
              </motion.div>
            </motion.section>
          )}

          {/* ================================================================
              BÖLÜM 2 — THE CELEBRATION (Düğün Programı)
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
              {/* Üst Sedef Başlık Plakası: The Celebration */}
              <LacyNacreTitlePlaque
                eyebrow={config.sections.celebration.eyebrow}
                title={config.sections.celebration.title}
              />

              {/* 5 Adımlı Düğün Programı Akışı */}
              <div className="my-auto flex w-full max-w-[290px] flex-col items-center space-y-2 sm:space-y-2.5">
                {config.sections.celebration.items.map((item, idx) => (
                  <div key={item.title} className="flex w-full flex-col items-center">
                    {idx > 0 && (
                      <div className="mb-1.5 flex justify-center">
                        <LacyDiamondGemSvg className="h-2.5 w-2.5 text-[#B28A5D]" />
                      </div>
                    )}
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="lacy-embossed-gold font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                        {item.time}
                      </span>
                      <span className="text-[#B28A5D] text-xs">—</span>
                      <h3 className="lacy-debossed-name font-lacy-display text-[15.5px] sm:text-[17.5px] font-normal leading-snug">
                        {item.title}
                      </h3>
                    </div>
                    {item.subtitle && (
                      <p className="font-lacy-text text-[11.5px] sm:text-xs italic text-[#6E5E4E]">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Alt Gezinme: Scroll Down ↓ ve Önceki Bölüm */}
              <div className="flex flex-col items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={isTransitioning}
                  className="lacy-nacre-button inline-flex items-center justify-center px-6 py-2 font-lacy-serif text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.24em] indent-[0.12em] text-[#5E4F3E] cursor-pointer disabled:opacity-60"
                >
                  <span>{config.navigation.scrollDownLabel}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={isTransitioning}
                  className="font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.22em] text-[#7D6A56] transition hover:text-[#4E4032] cursor-pointer py-0.5"
                >
                  {config.navigation.previousSectionLabel}
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              BÖLÜM 3 — THE DESTINATION (Düğün Mekânı ve Konum)
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
              {/* Üst Başlık: Güvenli Alan İçinde, Kemer Çizgisine Değmez */}
              <div className="flex flex-col items-center">
                <span className="lacy-embossed-gold font-engraved text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.3em] indent-[0.15em]">
                  {config.venue.sectionEyebrow}
                </span>
                <h2 className="lacy-debossed-name mt-0.5 font-lacy-display text-xl sm:text-2xl font-normal leading-tight">
                  {config.venue.sectionTitle}
                </h2>
              </div>

              {/* Sedef ve Altın Kemerli Mekân Çerçevesi & Villa Balbiano İllüstrasyonu */}
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
                  src="/assets/lacy/venue-arch-frame.webp"
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_8px_18px_rgba(114,99,81,0.2)]"
                />

                {/* Alt Sedef Plakada Mekân Adı: Villa Balbiano */}
                <div
                  style={{
                    left: '25%',
                    right: '23.5%',
                    top: '79.8%',
                    bottom: '10%',
                  }}
                  className="pointer-events-none absolute flex flex-col items-center justify-center px-1 text-center"
                >
                  <span className="lacy-embossed-gold font-lacy-display text-[12.5px] sm:text-[14.5px] font-medium leading-none tracking-[0.02em]">
                    {config.venue.name}
                  </span>
                </div>
              </div>

              {/* Mekân Detayları: Lake Como, Italy & Tarih/Saat */}
              <div className="flex flex-col items-center">
                <p className="lacy-debossed-ink font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] indent-[0.12em]">
                  {config.venue.location}
                </p>
                <p className="lacy-embossed-gold mt-0.5 font-lacy-serif text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {config.date.fullDateDisplay} · {config.date.timeDisplay}
                </p>
              </div>

              {/* Harita ve Takvim Etkileşim Butonları */}
              <div className="flex w-full max-w-[260px] flex-col items-center gap-1.5">
                <a
                  href={config.venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lacy-nacre-button inline-flex w-full items-center justify-center gap-2 px-5 py-1.5 font-lacy-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5E4F3E]"
                >
                  <MapPin className="h-3 w-3 text-[#8F6B42]" />
                  <span>{config.venue.openMapButtonLabel}</span>
                </a>

                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="lacy-nacre-button inline-flex w-full items-center justify-center gap-2 px-5 py-1.5 font-lacy-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-[#5E4F3E] cursor-pointer"
                >
                  {calendarSaved ? (
                    <>
                      <Check className="h-3 w-3 text-[#8F6B42]" />
                      <span>Calendar Event Saved (.ics)</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="h-3 w-3 text-[#8F6B42]" />
                      <span>{config.venue.addToCalendarButtonLabel}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Alt Gezinme: Final Geri Sayım Sayfasına Geçiş (Scroll Down ↓) ve Önceki Bölüm */}
              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={isTransitioning}
                  className="lacy-nacre-button inline-flex items-center justify-center px-6 py-1.5 font-lacy-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.24em] indent-[0.12em] text-[#5E4F3E] cursor-pointer disabled:opacity-60"
                >
                  <span>{config.navigation.scrollDownLabel}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={isTransitioning}
                  className="font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#7D6A56] transition hover:text-[#4E4032] cursor-pointer py-0.5"
                >
                  {config.navigation.previousSectionLabel}
                </button>
              </div>
            </motion.section>
          )}

          {/* ================================================================
              BÖLÜM 4 — FINAL COUNTDOWN PAGE ("Until We Say I Do")
              Davetiyenin son sinematik sahnesi: canlı Gün, Saat, Dakika, Saniye
              geri sayımı ve romantik kapanış mesajı.
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
              {/* Üst Sedef Başlık Plakası: Until We Say I Do */}
              <LacyNacreTitlePlaque
                eyebrow={config.sections.countdown.eyebrow}
                title={config.sections.countdown.title}
              />

              {/* Canlı 4'lü Geri Sayım Plakaları veya "Today Is The Day" Mesajı */}
              {countdown.isArrived ? (
                <div className="my-auto flex flex-col items-center px-3">
                  <MotherOfPearlCameoSeal className="w-16 sm:w-20" />
                  <h3 className="lacy-debossed-name mt-3 font-lacy-display text-2xl sm:text-3xl font-normal">
                    {config.sections.countdown.arrivedTitle}
                  </h3>
                  <p className="mt-2 max-w-[265px] font-lacy-text text-sm sm:text-[15px] italic leading-relaxed text-[#5E4F3E]">
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
                          src="/assets/lacy/day-time-plaque.webp"
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
                          className="lacy-debossed-name relative z-10 font-lacy-display text-[1.6rem] sm:text-[1.85rem] font-normal leading-none tabular-nums"
                        >
                          {String(unit.value).padStart(2, '0')}
                        </motion.span>
                        <span className="lacy-embossed-gold relative z-10 mt-1 font-lacy-serif text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.22em] indent-[0.11em]">
                          {unit.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-2.5 max-w-[270px] font-lacy-text text-xs sm:text-[13.5px] italic leading-snug text-[#655646]">
                    {config.sections.countdown.quote}
                  </p>
                </div>
              )}

              {/* Alt Kapanış Bloğu: Çift İsimleri, Kapanış Mesajı ve Gezinme */}
              <div className="flex w-full flex-col items-center">
                <LacyGoldRuleDivider widthClass="w-36" />

                <p className="lacy-debossed-name mt-2 font-lacy-display text-lg sm:text-xl font-normal">
                  {config.couple.partnerOne}{' '}
                  <span className="lacy-embossed-gold italic">{config.couple.conjunction}</span>{' '}
                  {config.couple.partnerTwo}
                </p>

                <p className="mt-1 max-w-[265px] font-lacy-text text-[12px] sm:text-[13px] italic leading-snug text-[#5E4F3E]">
                  “{config.sections.closing.quote}”
                </p>

                <div className="mt-2.5 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handlePrevSection}
                    disabled={isTransitioning}
                    className="font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#7D6A56] transition hover:text-[#4E4032] cursor-pointer"
                  >
                    {config.navigation.previousSectionLabel}
                  </button>
                  <span className="h-2.5 w-px bg-[#B28A5D]/40" />
                  <button
                    type="button"
                    onClick={onReplayOpening}
                    className="inline-flex items-center gap-1 font-lacy-serif text-[9.5px] font-semibold uppercase tracking-[0.2em] text-[#7D6A56] transition hover:text-[#4E4032] cursor-pointer"
                  >
                    <RotateCcw className="h-2.5 w-2.5 text-[#8F6B42]" />
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
