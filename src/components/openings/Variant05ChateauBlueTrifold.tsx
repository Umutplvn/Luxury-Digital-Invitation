import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import type { ThemeOpeningProps } from './types';

/**
 * 05 — THE CHÂTEAU BLUE (Aristocratic Porcelain & Regency Estate)
 * Couple: Charlotte Whitmore & Henry Ashford
 * Venue: Blenheim Palace, Oxfordshire, England
 *
 * Ornate Aristocratic Porcelain Cover Upgrade:
 * - High-res 3D Wedgwood powder-blue & porcelain-white bas-relief texture (/assets/themes/chateau-blue/cover-texture.webp).
 * - Intricate Regency antique-gold borders, corner porcelain rosettes & blue-and-white cameo friezes.
 * - Engraved British aristocratic crest & monogram cartouche on the overlapping right wing.
 * - Lustrous satin-silk ribbon and multi-loop tailored bow with antique-gold stitched edges.
 */
export const Variant05ChateauBlueTrifold: React.FC<ThemeOpeningProps> = ({
  config,
  theme,
  stage,
  onTriggerOpen,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const isSealInteracting = stage === 'seal-interaction';
  const isUnfastening = stage === 'unfastening';
  const isUnfolding =
    stage === 'opening-doors' || stage === 'revealing-interior';
  const isRevealingInterior = stage === 'revealing-interior';

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="chateau-blue-ribbon-trifold-layer"
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
          style={{ perspective: '2500px' }}
          className={`absolute inset-0 z-30 h-full w-full overflow-hidden select-none ${
            stage === 'closed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* ================================================================
              SECOND FOLDED PANEL (LEFT WEDGWOOD PORCELAIN REGENCY WING)
             ================================================================ */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: isUnfolding ? -154 : 0,
            }}
            transition={{
              duration: (theme.timing.openingDurationMs * 0.65) / 1000,
              delay: isUnfolding
                ? (theme.timing.openingDurationMs * 0.35) / 1000
                : 0,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              backgroundColor: '#527292',
              borderRight: '2.5px solid #C4A265',
            }}
            className="absolute inset-y-0 left-0 z-20 w-[56%] overflow-hidden shadow-[14px_0_36px_rgba(24,38,54,0.42)]"
          >
            {/* 3D Wedgwood Blue & Porcelain Relief Texture (Left Wing) */}
            <img
              src="/assets/themes/chateau-blue/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 z-0 h-full w-full object-cover object-left"
            />

            {/* Regency Porcelain & Antique-Gold Engraved Borders on Left Wing */}
            <svg
              viewBox="0 0 260 780"
              preserveAspectRatio="none"
              className="pointer-events-none relative z-10 h-full w-full"
            >
              <rect
                x="18"
                y="24"
                width="224"
                height="732"
                rx="12"
                fill="none"
                stroke="#C4A265"
                strokeWidth="2.2"
              />
              <rect
                x="28"
                y="34"
                width="204"
                height="712"
                rx="8"
                fill="none"
                stroke="#FAFBFD"
                strokeWidth="1.2"
                strokeDasharray="5 4"
                opacity="0.88"
              />
            </svg>

            <span className="chateau-pearl-bead absolute left-6 top-8 z-20 h-3 w-3" />
            <span className="chateau-pearl-bead absolute left-6 bottom-8 z-20 h-3 w-3" />

            {/* Moving Crease Shadow cast by the Right Wing overlapping on top */}
            <motion.div
              animate={{
                opacity: isUnfolding ? 0 : 0.48,
              }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              style={{
                background:
                  'linear-gradient(270deg, rgba(18, 30, 44, 0.72) 0%, transparent 100%)',
              }}
              className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20"
            />
          </motion.div>

          {/* ================================================================
              FIRST FOLDED PANEL (RIGHT OVERLAPPING REGENCY TRIFOLD WING)
             ================================================================ */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: isUnfolding
                ? 154
                : isUnfastening
                ? 7
                : 0,
            }}
            transition={{
              duration: isUnfastening
                ? theme.timing.unfasteningMs / 1000
                : (theme.timing.openingDurationMs * 0.68) / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              backgroundColor: '#5A7A9A',
              borderLeft: '3px solid #C4A265',
            }}
            className="absolute inset-y-0 right-0 z-30 w-[56%] overflow-hidden shadow-[-18px_0_44px_rgba(18,32,48,0.5)]"
          >
            {/* 3D Wedgwood Blue & Porcelain Relief Texture (Right Wing) */}
            <img
              src="/assets/themes/chateau-blue/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              className="absolute inset-0 z-0 h-full w-full object-cover object-right"
            />

            {/* Porcelain & Antique-Gold Regency Frame on Right Wing */}
            <svg
              viewBox="0 0 260 780"
              preserveAspectRatio="none"
              className="pointer-events-none relative z-10 h-full w-full"
            >
              <defs>
                <linearGradient id="regencyGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9A793E" />
                  <stop offset="35%" stopColor="#F5E1B0" />
                  <stop offset="65%" stopColor="#C4A265" />
                  <stop offset="100%" stopColor="#8C6B32" />
                </linearGradient>
                <g id="porcelainCornerRosette">
                  <circle cx="0" cy="0" r="14" fill="#4B6988" stroke="url(#regencyGoldFoil)" strokeWidth="1.8" />
                  <circle cx="0" cy="0" r="9" fill="none" stroke="#FAFBFD" strokeWidth="1.2" strokeDasharray="2 2" />
                  <circle cx="0" cy="0" r="3.5" fill="#FAFBFD" />
                </g>
              </defs>

              <rect
                x="18"
                y="24"
                width="224"
                height="732"
                rx="12"
                fill="none"
                stroke="url(#regencyGoldFoil)"
                strokeWidth="2.4"
              />
              <rect
                x="28"
                y="34"
                width="204"
                height="712"
                rx="8"
                fill="none"
                stroke="#FAFBFD"
                strokeWidth="1.3"
                strokeDasharray="5 4"
                opacity="0.9"
              />

              {/* Four Corner Porcelain & Gold Rosettes */}
              <use href="#porcelainCornerRosette" transform="translate(28, 34)" />
              <use href="#porcelainCornerRosette" transform="translate(232, 34)" />
              <use href="#porcelainCornerRosette" transform="translate(28, 746)" />
              <use href="#porcelainCornerRosette" transform="translate(232, 746)" />
            </svg>

            {/* Aristocratic Porcelain & Gold Cartouche on Right Wing */}
            <div className="pointer-events-none absolute inset-x-5 top-[15.5%] z-20 flex flex-col items-center rounded-[18px] border-2 border-[#C4A265] bg-[#FAFBFD]/94 px-4 py-3 text-center shadow-[0_12px_28px_rgba(24,38,54,0.32)]">
              <div className="pointer-events-none absolute inset-1 rounded-[14px] border border-[#6E8FAD]/45" />
              <span className="font-engraved text-[8px] uppercase tracking-[0.3em] text-[#8C6B32]">
                {config.eventType}
              </span>
              <h2 className="mt-1 font-lacy-display text-lg sm:text-xl font-normal text-[#213448]">
                {config.couple.partnerOneFull || config.couple.partnerOne}
              </h2>
              <span className="font-lacy-script text-xl text-[#8C6B32]">&amp;</span>
              <h2 className="font-lacy-display text-lg sm:text-xl font-normal text-[#213448]">
                {config.couple.partnerTwoFull || config.couple.partnerTwo}
              </h2>
            </div>

            <div className="pointer-events-none absolute inset-x-5 bottom-[15.5%] z-20 flex flex-col items-center rounded-[14px] border border-[#C4A265]/85 bg-[#FAFBFD]/92 px-3 py-2 text-center shadow-md">
              <span className="font-engraved text-[8.5px] uppercase tracking-[0.24em] text-[#213448]">
                {config.venue.name} · {config.venue.location}
              </span>
              <span className="mt-0.5 font-lacy-serif text-[11px] italic text-[#466380]">
                {config.date.fullDateDisplay}
              </span>
            </div>

            {/* Inner Porcelain-White Damask Lining Revealed as Wing Rotates Past 90deg */}
            <div
              id="chateau-inner-porcelain-lining"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background:
                  'linear-gradient(135deg, #FAFBFD 0%, #EBF2F9 100%)',
                borderRight: '3px solid #C4A265',
              }}
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          </motion.div>

          {/* ================================================================
              PORCELAIN-SILK RIBBON BOW & WEDGWOOD CAMEO SEAL RELEASE
             ================================================================ */}
          <AnimatePresence>
            {(stage === 'closed' ||
              stage === 'seal-interaction' ||
              stage === 'unfastening') && (
              <motion.div
                key="chateau-silk-ribbon-seal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.06,
                  transition: { duration: 0.38, ease: animationConfig.luxuryEasing },
                }}
                className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center"
              >
                {/* Left & Right Retracting Porcelain-Silk Ribbon Strands with Antique-Gold Selvedge */}
                <motion.div
                  animate={{
                    x: isUnfastening ? '-65%' : '0%',
                    opacity: isUnfastening ? 0.25 : 1,
                  }}
                  transition={{
                    duration: theme.timing.unfasteningMs / 1000,
                    ease: animationConfig.luxuryEasing,
                  }}
                  style={{
                    background:
                      'linear-gradient(180deg, #E2EBF5 0%, #FFFFFF 48%, #CFDCEB 100%)',
                    borderTop: '2px solid #C4A265',
                    borderBottom: '2px solid #C4A265',
                  }}
                  className="absolute left-0 right-1/2 top-1/2 h-10 -translate-y-1/2 shadow-[0_8px_22px_rgba(20,34,50,0.35)]"
                />

                <motion.div
                  animate={{
                    x: isUnfastening ? '65%' : '0%',
                    opacity: isUnfastening ? 0.25 : 1,
                  }}
                  transition={{
                    duration: theme.timing.unfasteningMs / 1000,
                    ease: animationConfig.luxuryEasing,
                  }}
                  style={{
                    background:
                      'linear-gradient(180deg, #E2EBF5 0%, #FFFFFF 48%, #CFDCEB 100%)',
                    borderTop: '2px solid #C4A265',
                    borderBottom: '2px solid #C4A265',
                  }}
                  className="absolute left-1/2 right-0 top-1/2 h-10 -translate-y-1/2 shadow-[0_8px_22px_rgba(20,34,50,0.35)]"
                />

                {/* Tactile Multi-Loop Satin-Silk Bow Behind Cameo */}
                <motion.svg
                  animate={{
                    scaleX: isUnfastening ? 1.35 : 1,
                    scaleY: isUnfastening ? 0.72 : 1,
                    opacity: isUnfastening ? 0 : 1,
                  }}
                  transition={{
                    duration: theme.timing.unfasteningMs / 1000,
                    ease: 'easeOut',
                  }}
                  viewBox="0 0 260 150"
                  className="absolute h-36 w-60 drop-shadow-[0_10px_22px_rgba(20,34,50,0.35)]"
                >
                  <path
                    d="M 130,75 C 72,18 18,34 26,75 C 34,116 84,100 130,75 Z"
                    fill="#FAFBFD"
                    stroke="#C4A265"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M 130,75 C 188,18 242,34 234,75 C 226,116 176,100 130,75 Z"
                    fill="#FAFBFD"
                    stroke="#C4A265"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M 120,80 L 76,144 L 100,138 L 128,86 Z"
                    fill="#E6EEF7"
                    stroke="#C4A265"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M 140,80 L 184,144 L 160,138 L 132,86 Z"
                    fill="#E6EEF7"
                    stroke="#C4A265"
                    strokeWidth="1.4"
                  />
                </motion.svg>

                {/* Cameo Seal Shimmer Halo */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? { scale: [1, 1.5], opacity: [0.88, 0] }
                      : {
                          scale: isHovered ? [1.05, 1.18, 1.05] : [1, 1.15, 1],
                          opacity: [0.3, 0.62, 0.3],
                        }
                  }
                  transition={
                    isSealInteracting
                      ? {
                          duration: theme.timing.sealInteractionMs / 1000,
                          ease: 'easeOut',
                        }
                      : { duration: 3.3, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute h-36 w-28 rounded-[50%] bg-[#F5E6C8]/60 blur-md"
                />

                {/* Sculpted Wedgwood & Antique-Gold Cameo Seal */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? {
                          scale: [1, 0.93, 1.05, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.16)',
                            'brightness(1.06)',
                            'brightness(1)',
                          ],
                        }
                      : { scale: isHovered ? 1.03 : 1 }
                  }
                  transition={{
                    duration: isSealInteracting
                      ? theme.timing.sealInteractionMs / 1000
                      : 0.35,
                    ease: animationConfig.luxuryEasing,
                  }}
                  className="shimmer-overlay relative h-[16.4dvh] w-[12.6dvh] max-h-[146px] max-w-[112px] overflow-hidden rounded-[50%] p-1 ring-2 ring-[#C4A265] bg-[#FAFBFD] shadow-[0_14px_32px_rgba(22,36,52,0.48)]"
                >
                  <img
                    src={theme.assets.sealCameo}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================================================================
              BOTTOM "UNTIE SILK RIBBON" BUTTON
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
            <div className="chateau-nacre-button inline-flex items-center justify-center px-6 py-2 shadow-lg">
              <span className="font-lacy-serif text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] indent-[0.15em] text-[#213448]">
                {config.envelope.tapPrompt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
