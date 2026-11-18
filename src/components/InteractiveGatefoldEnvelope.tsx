import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { InvitationConfig } from '../config/invitationConfig';
import { animationConfig } from '../config/animationConfig';

/**
 * Davetiye kapaklarının açılış aşamaları:
 * - 'closed': Kapalı zarf/kapak görünümü ("Tap to Open" aktif)
 * - 'seal-interaction': Mühür basılma ve sedef ışıltı aşaması (~0.7s)
 * - 'unfastening': Mührün ilk çözülme ve orta birleşim yerinin ayrılma aşaması (~0.5s)
 * - 'opening-doors': Fransız çift kapaklı dantel kapıların yavaşça açılması (~3.25s)
 * - 'revealing-interior': Kapılar açıldıktan sonra sabit iç karta pürüzsüz geçiş (~1.0s)
 * - 'opened': Açılış tamamlandı; iç kart sabit ve metinler belirmeye başlar
 */
export type OpeningStage =
  | 'closed'
  | 'seal-interaction'
  | 'unfastening'
  | 'opening-doors'
  | 'revealing-interior'
  | 'opened';

interface InteractiveGatefoldEnvelopeProps {
  config: InvitationConfig;
  stage: OpeningStage;
  onTriggerOpen: () => void;
  onStartInteriorReveal: () => void;
  onOpeningComplete: () => void;
}

/**
 * Çift kapaklı (French gatefold) dantel davetiye açılış bileşeni.
 *
 * Arka plan sıçramasını (background jump) tamamen önlemek için bu bileşen,
 * sabit davetiye kartı ile birebir aynı kapsayıcı (container) içinde
 * `absolute inset-0` olarak konumlandırılır.
 */
export const InteractiveGatefoldEnvelope: React.FC<InteractiveGatefoldEnvelopeProps> = ({
  config,
  stage,
  onTriggerOpen,
  onStartInteriorReveal,
  onOpeningComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const revealTriggeredRef = useRef(false);
  const completeTriggeredRef = useRef(false);
  const [useCssFallback, setUseCssFallback] = useState(false);

  /**
   * Davetiye tekrar kapatıldığında (Replay) videoyu başa sarar ve bayrakları sıfırlar.
   */
  useEffect(() => {
    const vid = videoRef.current;
    if (stage === 'closed') {
      revealTriggeredRef.current = false;
      completeTriggeredRef.current = false;
      if (vid) {
        vid.pause();
        try {
          vid.currentTime = 0;
        } catch {
          // Video metadata henüz yüklenmediyse hata yoksayılır
        }
      }
    }
  }, [stage]);

  /**
   * 0.7 saniyelik mühür etkileşimi tamamlandığında ('unfastening' aşamasında)
   * 3 boyutlu kapı açılış videosunu merkezi yapılandırmadaki hızda başlatır.
   */
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (stage === 'unfastening') {
      vid.muted = true;
      vid.playbackRate = animationConfig.videoPlaybackRate;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setUseCssFallback(false);
          })
          .catch(() => {
            // Tarayıcı video oynatmayı engellerse 3B CSS kapı yedek mekanizmasını devreye al
            setUseCssFallback(true);
          });
      }
    }
  }, [stage]);

  /**
   * Video oynatılırken gerçek zamanlı ilerlemeyi takip eder.
   * Kapılar ekran kenarlarından tamamen çıktığında (%76 ilerlemede) iç kart geçişini başlatır.
   */
  const handleVideoTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || revealTriggeredRef.current) return;

    const duration = vid.duration;
    if (Number.isFinite(duration) && duration > 0) {
      // Kapılar tamamen açıldığında (~%76) 1 saniyelik iç kart beliriş aşamasına geç
      if (vid.currentTime >= duration * 0.76) {
        revealTriggeredRef.current = true;
        onStartInteriorReveal();
      }
    }
  };

  /**
   * Video tamamen sona erdiğinde açılışın tamamlandığını bildirir.
   */
  const handleVideoEnded = () => {
    if (!revealTriggeredRef.current) {
      revealTriggeredRef.current = true;
      onStartInteriorReveal();
    }
    if (!completeTriggeredRef.current) {
      completeTriggeredRef.current = true;
      onOpeningComplete();
    }
  };

  const isSealInteracting = stage === 'seal-interaction';
  const isDoorsMoving =
    stage === 'unfastening' ||
    stage === 'opening-doors' ||
    stage === 'revealing-interior';
  const isFadingToStationaryCard = stage === 'revealing-interior';

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="gatefold-envelope-layer"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingToStationaryCard ? 0 : 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: prefersReducedMotion
                ? 0.3
                : animationConfig.interiorRevealDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            },
          }}
          transition={{
            duration: prefersReducedMotion
              ? 0.3
              : animationConfig.interiorRevealDurationMs / 1000,
            ease: animationConfig.luxuryEasing,
          }}
          onClick={stage === 'closed' ? onTriggerOpen : undefined}
          role={stage === 'closed' ? 'button' : undefined}
          tabIndex={stage === 'closed' ? 0 : -1}
          aria-label={`Open wedding invitation for ${config.couple.partnerOne} and ${config.couple.partnerTwo}`}
          onKeyDown={(e) => {
            if (stage === 'closed' && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onTriggerOpen();
            }
          }}
          style={{ perspective: '2400px' }}
          className={`absolute inset-0 z-30 h-full w-full overflow-hidden select-none ${
            stage === 'closed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* ==============================================================
              1. GERÇEKÇİ 3B KAPI AÇILIŞ VİDEO KATMANI
                 Son karesi sabit iç kart (inner-card-bg.webp) ile birebir hizalıdır.
             ============================================================== */}
          {!useCssFallback && (
            <div className="absolute inset-0 h-full w-full">
              {/* Yüksek çözünürlüklü kapalı kapak görseli (Kapalı ve mühür basılma aşamasında aktif) */}
              <img
                src="/assets/lacy/poster-full.jpg"
                alt=""
                aria-hidden="true"
                draggable={false}
                className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ${
                  isDoorsMoving ? 'opacity-0' : 'opacity-100'
                }`}
              />

              {/* Yavaşlatılmış 1080x1920 3B kapı açılış videosu */}
              <video
                ref={videoRef}
                src="/assets/lacy/gatefold-open-slow.mp4"
                poster="/assets/lacy/poster-full.jpg"
                playsInline
                muted
                preload="auto"
                onTimeUpdate={handleVideoTimeUpdate}
                onEnded={handleVideoEnded}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* ==============================================================
              2. 3B CSS PERSPEKTİF KAPI YEDEK MEKANİZMASI (CSS Fallback)
                 Tarayıcı video oynatmayı kısıtlarsa aynı sürelerle devreye girer.
             ============================================================== */}
          {useCssFallback && (
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute inset-0 h-full w-full"
            >
              {/* Sol 3B Dantel Kapak */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    stage === 'opening-doors' || stage === 'revealing-interior'
                      ? -115
                      : stage === 'unfastening'
                      ? -5
                      : 0,
                }}
                transition={{
                  duration:
                    stage === 'unfastening'
                      ? animationConfig.unfasteningDurationMs / 1000
                      : animationConfig.gatefoldOpeningDurationMs / 1000,
                  ease: animationConfig.luxuryEasing,
                }}
                style={{
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute inset-y-0 left-0 z-20 w-1/2 overflow-hidden shadow-[8px_0_26px_rgba(52,40,28,0.22)]"
              >
                <img
                  src="/assets/lacy/door-left.jpg"
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover object-right"
                />
              </motion.div>

              {/* Sağ 3B Dantel Kapak */}
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    stage === 'opening-doors' || stage === 'revealing-interior'
                      ? 115
                      : stage === 'unfastening'
                      ? 5
                      : 0,
                }}
                transition={{
                  duration:
                    stage === 'unfastening'
                      ? animationConfig.unfasteningDurationMs / 1000
                      : animationConfig.gatefoldOpeningDurationMs / 1000,
                  ease: animationConfig.luxuryEasing,
                }}
                style={{
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute inset-y-0 right-0 z-20 w-1/2 overflow-hidden shadow-[-8px_0_26px_rgba(52,40,28,0.22)]"
              >
                <img
                  src="/assets/lacy/door-right.jpg"
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover object-left"
                />
              </motion.div>
            </div>
          )}

          {/* ==============================================================
              3. ORTA SEDEF MÜHÜR ETKİLEŞİM KATMANI (~0.7s Basılma ve Işıltı)
             ============================================================== */}
          <AnimatePresence>
            {(stage === 'closed' || stage === 'seal-interaction') && (
              <motion.div
                key="interactive-seal-hotspot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                style={{
                  left: '49.1%',
                  top: '50.4%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-30 flex items-center justify-center"
              >
                {/* Mühür etrafındaki yumuşak şampanya ışıltı halesi */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? { scale: [1, 1.42], opacity: [0.75, 0] }
                      : { scale: [1, 1.14, 1], opacity: [0.25, 0.52, 0.25] }
                  }
                  transition={
                    isSealInteracting
                      ? {
                          duration: animationConfig.sealInteractionDurationMs / 1000,
                          ease: 'easeOut',
                        }
                      : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute h-36 w-28 rounded-[50%] bg-[#DFC9A6]/45 blur-md"
                />

                {/* 0.7 saniyelik mühür basılma ve sedef parlama tepkisi */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? {
                          scale: [1, 0.94, 1.03, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.1)',
                            'brightness(1.04)',
                            'brightness(1)',
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: animationConfig.sealInteractionDurationMs / 1000,
                    ease: animationConfig.luxuryEasing,
                  }}
                  className="shimmer-overlay relative h-[16.4dvh] w-[12.5dvh] max-h-[146px] max-w-[111px] overflow-hidden rounded-[50%]"
                >
                  <img
                    src="/assets/lacy/seal-cameo.png"
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="h-full w-full object-contain opacity-95"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ==============================================================
              4. ALT "TAP TO OPEN" ETKİLEŞİM BUTONU
             ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === 'closed' ? 1 : 0,
              y: stage === 'closed' ? 0 : 8,
            }}
            transition={{ duration: 0.45, ease: animationConfig.luxuryEasing }}
            className="pointer-events-none absolute inset-x-0 bottom-[8.5%] z-30 flex flex-col items-center px-6 text-center"
          >
            <div className="lacy-nacre-button inline-flex items-center justify-center px-6 py-2">
              <span className="font-lacy-serif text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] indent-[0.15em] text-[#5E4F3E]">
                {config.envelope.tapPrompt}
              </span>
            </div>
            <span className="mt-2 font-lacy-text text-xs italic tracking-wide text-[#6A5A49]/90 drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              {config.envelope.subPrompt}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
