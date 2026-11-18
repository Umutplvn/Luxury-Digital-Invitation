import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import type { ThemeOpeningProps } from './types';

/**
 * 04 — THE NOIR (Reimagined Light-Toned "Fifth Avenue Pearl & Champagne" Edition)
 * Couple: Olivia Bennett & William Carter
 * Venue: The Plaza Hotel, New York City, USA
 *
 * Light-Toned Celebratory Redesign:
 * - Luminous Pearl Silk (#FAF7F2), Warm Rose-Champagne (#EFE4D6), Brushed Gold (#C59B58)
 *   and crisp Espresso-Noir Ink (#231F20) — warm, joyful, romantic New York bridal couture.
 * - Architectural Beaux-Arts & Fifth Avenue double shutters with a central mother-of-pearl
 *   and espresso-noir monogram medallion (O & W).
 */
export const Variant04NoirSlidingCover: React.FC<ThemeOpeningProps> = ({
  config,
  theme,
  stage,
  onTriggerOpen,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const isSealInteracting = stage === 'seal-interaction';
  const isUnlocked =
    stage === 'unfastening' ||
    stage === 'opening-doors' ||
    stage === 'revealing-interior';
  const isSlidingAway =
    stage === 'opening-doors' || stage === 'revealing-interior';
  const isRevealingInterior = stage === 'revealing-interior';

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="noir-pearl-champagne-shutter-layer"
          initial={{ opacity: 1 }}
          animate={{ opacity: isRevealingInterior ? 0 : 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: prefersReducedMotion
                ? 0.3
                : theme.timing.interiorRevealMs / 1000,
              ease: animationConfig.luxuryEasing,
            },
          }}
          transition={{
            duration: prefersReducedMotion
              ? 0.3
              : theme.timing.interiorRevealMs / 1000,
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
          className={`absolute inset-0 z-30 h-full w-full overflow-hidden select-none ${
            stage === 'closed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* Warm Sunlit Champagne Glow over the revealed Plaza Hotel invitation */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{
              opacity: isSlidingAway ? [0.6, 0.25, 0] : 0.6,
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(255, 250, 240, 0.75) 0%, rgba(232, 213, 196, 0.45) 75%)',
            }}
            className="pointer-events-none absolute inset-0 z-10"
          />

          {/* ================================================================
              UPPER PEARL-SILK & ROSE-CHAMPAGNE SHUTTER (Slides Upward 3.25s)
             ================================================================ */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{
              y: isSlidingAway
                ? '-105%'
                : isUnlocked
                ? '-1.8%'
                : '0%',
            }}
            transition={{
              duration: isSlidingAway
                ? theme.timing.openingDurationMs / 1000
                : theme.timing.unfasteningMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              background:
                'linear-gradient(180deg, #FAF7F2 0%, #F4EAE0 65%, #EAD9C8 100%)',
              borderBottom: '2px solid #231F20',
            }}
            className="absolute inset-x-0 top-0 z-20 h-1/2 overflow-hidden shadow-[0_22px_50px_rgba(42,32,24,0.22)]"
          >
            <img
              src="/assets/themes/noir/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-85"
            />

            {/* Fifth Avenue Beaux-Arts & Editorial Framing (Upper Panel) */}
            <svg
              viewBox="0 0 440 400"
              preserveAspectRatio="none"
              className="pointer-events-none relative z-10 h-full w-full"
            >
              <rect
                x="22"
                y="22"
                width="396"
                height="378"
                fill="none"
                stroke="#231F20"
                strokeWidth="1.8"
              />
              <rect
                x="30"
                y="30"
                width="380"
                height="370"
                fill="none"
                stroke="#C59B58"
                strokeWidth="1.2"
              />
              {/* Stepped Editorial Corner Ornaments */}
              <path
                d="M 22,68 L 68,22 M 30,82 L 82,30 M 418,68 L 372,22 M 410,82 L 358,30"
                stroke="#C59B58"
                strokeWidth="1.4"
              />
              <rect x="22" y="22" width="24" height="24" fill="none" stroke="#231F20" strokeWidth="1.5" />
              <rect x="394" y="22" width="24" height="24" fill="none" stroke="#231F20" strokeWidth="1.5" />
            </svg>

            {/* Pearl & Espresso Editorial Title Plaque */}
            <div className="pointer-events-none absolute inset-x-[13%] top-[17%] z-20 flex flex-col items-center rounded-[4px] border border-[#231F20] bg-[#FFFDFB]/95 px-5 py-3 text-center shadow-[0_12px_28px_rgba(42,32,24,0.12)]">
              <div className="pointer-events-none absolute inset-1 border border-[#C59B58]/55" />
              <span className="font-sans-luxury text-[8px] font-medium uppercase tracking-[0.38em] text-[#9E7638]">
                {config.eventType}
              </span>
              <h2 className="mt-1.5 font-lacy-display text-2xl sm:text-[1.75rem] font-normal uppercase tracking-[0.12em] text-[#231F20]">
                {config.couple.partnerOneFull || config.couple.partnerOne}
              </h2>
              <span className="my-0.5 font-lacy-script text-xl text-[#9E7638]">
                &amp;
              </span>
              <h2 className="font-lacy-display text-2xl sm:text-[1.75rem] font-normal uppercase tracking-[0.12em] text-[#231F20]">
                {config.couple.partnerTwoFull || config.couple.partnerTwo}
              </h2>
            </div>
          </motion.div>

          {/* ================================================================
              LOWER PEARL-SILK & ROSE-CHAMPAGNE SHUTTER (Slides Downward 3.25s)
             ================================================================ */}
          <motion.div
            initial={{ y: '0%' }}
            animate={{
              y: isSlidingAway
                ? '105%'
                : isUnlocked
                ? '1.8%'
                : '0%',
            }}
            transition={{
              duration: isSlidingAway
                ? theme.timing.openingDurationMs / 1000
                : theme.timing.unfasteningMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              background:
                'linear-gradient(0deg, #FAF7F2 0%, #F4EAE0 65%, #EAD9C8 100%)',
              borderTop: '2px solid #C59B58',
            }}
            className="absolute inset-x-0 bottom-0 z-20 h-1/2 overflow-hidden shadow-[0_-22px_50px_rgba(42,32,24,0.22)]"
          >
            <img
              src="/assets/themes/noir/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-85"
            />

            <svg
              viewBox="0 0 440 400"
              preserveAspectRatio="none"
              className="pointer-events-none relative z-10 h-full w-full"
            >
              <rect
                x="22"
                y="0"
                width="396"
                height="378"
                fill="none"
                stroke="#231F20"
                strokeWidth="1.8"
              />
              <rect
                x="30"
                y="0"
                width="380"
                height="370"
                fill="none"
                stroke="#C59B58"
                strokeWidth="1.2"
              />
              <path
                d="M 22,332 L 68,378 M 30,318 L 82,370 M 418,332 L 372,378 M 410,318 L 358,370"
                stroke="#C59B58"
                strokeWidth="1.4"
              />
            </svg>

            <div className="pointer-events-none absolute inset-x-[15%] top-[33%] z-20 flex flex-col items-center rounded-[4px] border border-[#C59B58] bg-[#FFFDFB]/94 px-4 py-2 text-center shadow-sm">
              <span className="font-engraved text-[9.5px] uppercase tracking-[0.32em] text-[#231F20]">
                {config.venue.name} · {config.venue.location}
              </span>
              <span className="mt-1 font-sans-luxury text-[9px] uppercase tracking-[0.26em] text-[#9E7638]">
                {config.date.fullDateDisplay} · {config.date.timeDisplay}
              </span>
            </div>
          </motion.div>

          {/* ================================================================
              CENTRAL PEARL, BRUSHED GOLD & ESPRESSO-NOIR MEDALLION CLASP
             ================================================================ */}
          <AnimatePresence>
            {(stage === 'closed' ||
              stage === 'seal-interaction' ||
              stage === 'unfastening') && (
              <motion.div
                key="noir-pearl-clasp"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.14,
                  transition: { duration: 0.35, ease: animationConfig.luxuryEasing },
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-40 flex items-center justify-center"
              >
                <motion.div
                  animate={
                    isSealInteracting || isUnlocked
                      ? { scale: [1, 1.5], opacity: [0.85, 0] }
                      : {
                          scale: isHovered ? [1.05, 1.18, 1.05] : [1, 1.14, 1],
                          opacity: [0.3, 0.58, 0.3],
                        }
                  }
                  transition={
                    isSealInteracting || isUnlocked
                      ? {
                          duration: theme.timing.sealInteractionMs / 1000,
                          ease: 'easeOut',
                        }
                      : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute h-36 w-36 rounded-full bg-[#E8D5C4]/75 blur-md"
                />

                <motion.div
                  animate={{
                    rotate: isSealInteracting || isUnlocked ? 45 : 0,
                    scale: isSealInteracting
                      ? [1, 0.94, 1.05, 1]
                      : isHovered
                      ? 1.03
                      : 1,
                  }}
                  transition={{
                    duration: isSealInteracting
                      ? theme.timing.sealInteractionMs / 1000
                      : 0.35,
                    ease: animationConfig.luxuryEasing,
                  }}
                  style={{
                    background:
                      'linear-gradient(135deg, #FFFDF9 0%, #E5C99B 45%, #C59B58 100%)',
                  }}
                  className="shimmer-overlay relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center rounded-[22px] border-2 border-[#231F20] p-[4px] shadow-[0_16px_38px_rgba(42,32,24,0.28)]"
                >
                  <div className="flex h-full w-full flex-col items-center justify-center rounded-[17px] bg-[#FFFDFB] border border-[#C59B58]">
                    <motion.div
                      animate={{
                        rotate: isSealInteracting || isUnlocked ? -45 : 0,
                      }}
                      transition={{
                        duration: theme.timing.sealInteractionMs / 1000,
                        ease: animationConfig.luxuryEasing,
                      }}
                      className="flex flex-col items-center justify-center text-center"
                    >
                      <span className="font-sans-luxury text-[7px] font-medium uppercase tracking-[0.3em] text-[#9E7638]">
                        FIFTH AVE
                      </span>
                      <span className="mt-0.5 font-lacy-display text-2xl sm:text-3xl tracking-[0.06em] text-[#231F20]">
                        {config.couple.monogramInitialOne} &amp; {config.couple.monogramInitialTwo}
                      </span>
                      <span className="mt-0.5 h-[1px] w-10 bg-[#231F20]/40" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================================================================
              BOTTOM "UNLOCK INVITATION" BUTTON
             ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === 'closed' ? 1 : 0,
              y: stage === 'closed' ? (isHovered ? -2 : 0) : 8,
            }}
            transition={{ duration: 0.4, ease: animationConfig.luxuryEasing }}
            className="pointer-events-none absolute inset-x-0 bottom-[7.5%] z-40 flex flex-col items-center px-6 text-center"
          >
            <div className="noir-nacre-button inline-flex items-center justify-center px-6 py-2 shadow-lg">
              <span className="font-sans-luxury text-[10.5px] sm:text-[11px] font-medium uppercase tracking-[0.3em] indent-[0.15em] text-[#231F20]">
                {config.envelope.tapPrompt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
