import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import type { ThemeOpeningProps } from './types';

/**
 * 01 — THE IVORY (Quality & Lighting Benchmark)
 * Theme: Classic Ivory, Mother-of-Pearl & Champagne Gold
 * Opening: French Chantilly Lace Gatefold with Cinematic Studio Lighting
 *
 * Lighting & Material Choreography:
 * - Diffused directional champagne studio key-light from upper-center.
 * - Traveling pearlescent specular reflection across the mother-of-pearl cameo seal.
 * - Delicate vertical champagne light seam parting along the center gatefold crease on unfasten.
 * - Parting left/right ambient occlusion door shadows as the lace gatefold doors swing open.
 * - Seamless soft-focus-to-sharp handoff to the stationary ivory cotton interior card.
 */
export const Variant01IvoryGatefold: React.FC<ThemeOpeningProps> = ({
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
  const [isHovered, setIsHovered] = useState(false);

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
          // Ignore if metadata not yet loaded
        }
      }
    }
  }, [stage]);

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
            setUseCssFallback(true);
          });
      }
    }
  }, [stage]);

  const handleVideoTimeUpdate = () => {
    const vid = videoRef.current;
    if (!vid || revealTriggeredRef.current) return;

    const duration = vid.duration;
    if (Number.isFinite(duration) && duration > 0) {
      if (vid.currentTime >= duration * 0.76) {
        revealTriggeredRef.current = true;
        onStartInteriorReveal?.();
      }
    }
  };

  const handleVideoEnded = () => {
    if (!revealTriggeredRef.current) {
      revealTriggeredRef.current = true;
      onStartInteriorReveal?.();
    }
    if (!completeTriggeredRef.current) {
      completeTriggeredRef.current = true;
      onOpeningComplete?.();
    }
  };

  const isSealInteracting = stage === 'seal-interaction';
  const isUnfastening = stage === 'unfastening';
  const isOpeningDoors = stage === 'opening-doors';
  const isDoorsMoving =
    stage === 'unfastening' ||
    stage === 'opening-doors' ||
    stage === 'revealing-interior';
  const isFadingToStationaryCard = stage === 'revealing-interior';

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="ivory-gatefold-layer"
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
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
          className={`group absolute inset-0 z-30 h-full w-full overflow-hidden select-none ${
            stage === 'closed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* ==============================================================
              1. 3D GATEFOLD VIDEO LAYER & HIGH-RES CLOSED COVER POSTER
             ============================================================== */}
          {!useCssFallback && (
            <div className="absolute inset-0 h-full w-full">
              <img
                src="/assets/lacy/poster-full.jpg"
                alt=""
                aria-hidden="true"
                draggable={false}
                className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-300 ${
                  isDoorsMoving ? 'opacity-0' : 'opacity-100'
                }`}
              />

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
              2. 3D CSS GATEFOLD FALLBACK WITH LAYERED PAPER THICKNESS
             ============================================================== */}
          {useCssFallback && (
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="absolute inset-0 h-full w-full"
            >
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    stage === 'opening-doors' || stage === 'revealing-interior'
                      ? -118
                      : stage === 'unfastening'
                      ? -6
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
                className="absolute inset-y-0 left-0 z-20 w-1/2 overflow-hidden border-r border-[#D6BE9C]/60 shadow-[14px_0_36px_rgba(52,40,28,0.28)]"
              >
                <img
                  src="/assets/lacy/door-left.jpg"
                  alt=""
                  draggable={false}
                  className="h-full w-full object-cover object-right"
                />
              </motion.div>

              <motion.div
                initial={{ rotateY: 0 }}
                animate={{
                  rotateY:
                    stage === 'opening-doors' || stage === 'revealing-interior'
                      ? 118
                      : stage === 'unfastening'
                      ? 6
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
                className="absolute inset-y-0 right-0 z-20 w-1/2 overflow-hidden border-l border-[#D6BE9C]/60 shadow-[-14px_0_36px_rgba(52,40,28,0.28)]"
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
              3. CINEMATIC STUDIO LIGHTING, CENTER SEAM GLOW & PARTING SHADOWS
             ============================================================== */}
          {/* Soft Directional Champagne Studio Key-Light */}
          <motion.div
            animate={{
              opacity: isOpeningDoors
                ? [0.42, 0.68, 0.18]
                : isHovered
                ? 0.48
                : 0.34,
            }}
            transition={{
              duration: isOpeningDoors ? 3.1 : 0.6,
              ease: 'easeInOut',
            }}
            style={{
              background:
                'radial-gradient(ellipse at 50% 24%, rgba(255, 251, 242, 0.55) 0%, rgba(236, 214, 178, 0.22) 48%, rgba(48, 36, 24, 0.18) 100%)',
            }}
            className="pointer-events-none absolute inset-0 z-20 mix-blend-soft-light"
          />

          {/* Vertical Champagne Light Seam Parting Along the Center Gatefold Crease */}
          <AnimatePresence>
            {(isSealInteracting || isUnfastening || isOpeningDoors) &&
              !prefersReducedMotion && (
                <motion.div
                  key="ivory-center-seam-light"
                  initial={{ opacity: 0, scaleY: 0.35, scaleX: 0.5 }}
                  animate={
                    isOpeningDoors
                      ? {
                          opacity: [0.85, 0.45, 0],
                          scaleY: [1, 1.05, 1.1],
                          scaleX: [1.5, 18, 36],
                        }
                      : {
                          opacity: 0.85,
                          scaleY: 0.92,
                          scaleX: isUnfastening ? 2.4 : 1,
                        }
                  }
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: isOpeningDoors ? 2.6 : 0.55,
                    ease: animationConfig.luxuryEasing,
                  }}
                  style={{
                    left: '49.1%',
                    background:
                      'linear-gradient(180deg, transparent 4%, rgba(255, 248, 232, 0.92) 30%, rgba(235, 206, 158, 0.96) 50%, rgba(255, 248, 232, 0.92) 70%, transparent 96%)',
                  }}
                  className="pointer-events-none absolute inset-y-0 z-25 w-[3px] -translate-x-1/2 blur-[2px]"
                />
              )}
          </AnimatePresence>

          {/* Parting Ambient Occlusion Door Shadows During Gatefold Reveal */}
          {isDoorsMoving && !prefersReducedMotion && (
            <>
              <motion.div
                initial={{ x: '0%', opacity: 0.38 }}
                animate={{
                  x: isOpeningDoors ? '-100%' : '-3%',
                  opacity: isOpeningDoors ? [0.38, 0.25, 0] : 0.38,
                }}
                transition={{
                  duration: animationConfig.gatefoldOpeningDurationMs / 1000,
                  ease: animationConfig.luxuryEasing,
                }}
                style={{
                  background:
                    'linear-gradient(270deg, rgba(48, 36, 24, 0.32) 0%, rgba(48, 36, 24, 0.08) 45%, transparent 100%)',
                }}
                className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2"
              />
              <motion.div
                initial={{ x: '0%', opacity: 0.38 }}
                animate={{
                  x: isOpeningDoors ? '100%' : '3%',
                  opacity: isOpeningDoors ? [0.38, 0.25, 0] : 0.38,
                }}
                transition={{
                  duration: animationConfig.gatefoldOpeningDurationMs / 1000,
                  ease: animationConfig.luxuryEasing,
                }}
                style={{
                  background:
                    'linear-gradient(90deg, rgba(48, 36, 24, 0.32) 0%, rgba(48, 36, 24, 0.08) 45%, transparent 100%)',
                }}
                className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/2"
              />
            </>
          )}

          {/* ==============================================================
              4. MOTHER-OF-PEARL CAMEO SEAL WITH TRAVELING SPECULAR CAUSTICS
             ============================================================== */}
          <AnimatePresence>
            {(stage === 'closed' || stage === 'seal-interaction') && (
              <motion.div
                key="interactive-seal-hotspot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.06, transition: { duration: 0.28 } }}
                style={{
                  left: '49.1%',
                  top: '50.4%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-30 flex items-center justify-center"
              >
                {/* Soft Champagne Halo */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? { scale: [1, 1.52], opacity: [0.85, 0] }
                      : {
                          scale: isHovered ? [1.04, 1.18, 1.04] : [1, 1.14, 1],
                          opacity: isHovered
                            ? [0.38, 0.65, 0.38]
                            : [0.24, 0.5, 0.24],
                        }
                  }
                  transition={
                    isSealInteracting
                      ? {
                          duration: animationConfig.sealInteractionDurationMs / 1000,
                          ease: 'easeOut',
                        }
                      : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute h-40 w-32 rounded-[50%] bg-[#E5CFA8]/50 blur-md"
                />

                {/* Cameo Seal with Tactile Compression & Traveling Light Sweep */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? {
                          scale: [1, 0.93, 1.04, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.14)',
                            'brightness(1.06)',
                            'brightness(1)',
                          ],
                        }
                      : {
                          scale: isHovered ? 1.025 : 1,
                        }
                  }
                  transition={{
                    duration: isSealInteracting
                      ? animationConfig.sealInteractionDurationMs / 1000
                      : 0.35,
                    ease: animationConfig.luxuryEasing,
                  }}
                  className="shimmer-overlay relative h-[16.4dvh] w-[12.5dvh] max-h-[146px] max-w-[111px] overflow-hidden rounded-[50%] drop-shadow-[0_10px_22px_rgba(52,38,22,0.28)]"
                >
                  <img
                    src="/assets/lacy/seal-cameo.png"
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="h-full w-full object-contain opacity-95"
                  />

                  {/* Traveling Specular Highlight Sweep Triggered on Seal Touch */}
                  {isSealInteracting && (
                    <motion.div
                      initial={{ x: '-140%', rotate: 24 }}
                      animate={{ x: '220%', rotate: 24 }}
                      transition={{
                        duration: animationConfig.sealInteractionDurationMs / 1000,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        background:
                          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.85) 50%, transparent 100%)',
                      }}
                      className="pointer-events-none absolute -inset-y-1/2 left-0 w-1/2"
                    />
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ==============================================================
              5. BOTTOM GILDED MOTHER-OF-PEARL "TAP TO OPEN" PILL
             ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === 'closed' ? 1 : 0,
              y: stage === 'closed' ? (isHovered ? -2 : 0) : 8,
              scale: stage === 'closed' && isHovered ? 1.02 : 1,
            }}
            transition={{ duration: 0.4, ease: animationConfig.luxuryEasing }}
            className="pointer-events-none absolute inset-x-0 bottom-[8.5%] z-30 flex flex-col items-center px-6 text-center"
          >
            <div className="lacy-nacre-button shimmer-overlay relative inline-flex items-center justify-center overflow-hidden px-6 py-2">
              <span className="font-lacy-serif text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] indent-[0.15em] text-[#5E4F3E]">
                {config.envelope.tapPrompt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
