import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import type { ThemeOpeningProps } from './types';

/**
 * 06 — THE GOLDEN ROSE (Grand Romantic Opulence)
 * Couple: Julian Moreau & Genevieve Laurent
 * Venue: Château de Tourreau, Provence, France
 *
 * Grand Romantic Opulence Cover Upgrade:
 * - High-res 3D sculpted golden-rose bas-relief texture (/assets/themes/golden-rose/cover-texture.webp)
 *   masked onto each of the four triangular envelope flaps.
 * - Intricate gold-foil baroque corner brackets & multi-layered botanical filigree.
 * - Richly detailed central heirloom wax seal with an embossed golden-rose wreath rim.
 * - Synchronized 3D four-flap unfolding & parting over a warm Provençal sunbeam bloom.
 */
export const Variant06GoldenRoseEnvelope: React.FC<ThemeOpeningProps> = ({
  config,
  theme,
  stage,
  onTriggerOpen,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const isSealInteracting = stage === 'seal-interaction';
  const isUnfastening = stage === 'unfastening';
  const isPartingFlaps =
    stage === 'opening-doors' || stage === 'revealing-interior';
  const isRevealingInterior = stage === 'revealing-interior';

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="golden-rose-four-flap-envelope"
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
          style={{ perspective: '2400px' }}
          className={`absolute inset-0 z-30 h-full w-full overflow-hidden select-none ${
            stage === 'closed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* Ambient Golden Spotlight Sweep across the revealed Provence estate card */}
          <motion.div
            initial={{ opacity: 0.58 }}
            animate={{
              opacity: isPartingFlaps ? [0.58, 0.25, 0] : 0.58,
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              background:
                'radial-gradient(circle at 50% 48%, rgba(255, 240, 195, 0.45) 0%, rgba(32, 16, 8, 0.76) 78%)',
            }}
            className="pointer-events-none absolute inset-0 z-10"
          />

          {/* ================================================================
              1. LEFT TRIANGULAR ENVELOPE FLAP (3D Bas-Relief Golden Roses)
             ================================================================ */}
          <motion.div
            initial={{ x: '0%', rotateY: 0 }}
            animate={{
              x: isPartingFlaps ? '-106%' : isUnfastening ? '-2.4%' : '0%',
              rotateY: isPartingFlaps ? -28 : isUnfastening ? -6 : 0,
            }}
            transition={{
              duration: isPartingFlaps
                ? theme.timing.openingDurationMs / 1000
                : theme.timing.unfasteningMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 z-20 h-full w-full"
          >
            {/* 3D Sculpted Golden-Rose Bas-Relief Texture Clipped to Left Flap */}
            <img
              src="/assets/themes/golden-rose/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                clipPath: 'polygon(0% 0%, 53% 49.5%, 0% 100%)',
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <svg
              viewBox="0 0 400 720"
              preserveAspectRatio="none"
              className="relative z-10 h-full w-full drop-shadow-[14px_0_32px_rgba(12,6,2,0.78)]"
            >
              <defs>
                <linearGradient id="gr24kFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9A6824" />
                  <stop offset="30%" stopColor="#FFF0BA" />
                  <stop offset="55%" stopColor="#DFAD56" />
                  <stop offset="82%" stopColor="#FFF5D4" />
                  <stop offset="100%" stopColor="#865618" />
                </linearGradient>
                <filter id="goldenGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <g id="sculptedGoldRose">
                  <path d="M-24,-10 C-10,-30 18,-26 26,-6 C30,16 10,30 -12,26 C-28,20 -30,2 -24,-10 Z" />
                  <path d="M-15,6 C-22,-8 -6,-22 10,-15 C22,-10 20,10 5,18 C-8,22 -13,12 -15,6 Z" />
                  <path d="M-8,-3 C-2,-12 10,-9 11,2 C12,10 -2,13 -8,6 Z" />
                  <circle cx="0" cy="0" r="4" fill="#FFF5D4" />
                  <path d="M-28,14 Q-44,26 -34,42 M-36,26 L-24,24" strokeWidth="1.2" />
                  <path d="M18,-20 Q34,-30 40,-12 M26,-22 L22,-12" strokeWidth="1.2" />
                </g>
              </defs>

              <polygon
                points="0,0 212,356 0,720"
                fill="rgba(54, 30, 14, 0.25)"
                stroke="url(#gr24kFoil)"
                strokeWidth="2.8"
              />
              <polygon
                points="0,16 196,356 0,704"
                fill="none"
                stroke="url(#gr24kFoil)"
                strokeWidth="1.1"
                strokeDasharray="6 4"
                opacity="0.78"
              />

              {/* Ornate Baroque Corner Filigree & Illuminated Golden Roses */}
              <g
                filter="url(#goldenGlow)"
                stroke="url(#gr24kFoil)"
                strokeWidth="1.45"
                fill="none"
                opacity="0.95"
              >
                <use href="#sculptedGoldRose" transform="translate(68, 220)" />
                <use href="#sculptedGoldRose" transform="translate(64, 442) scale(1.08)" />
                <path d="M 14,50 L 14,14 L 50,14 M 14,670 L 14,706 L 50,706" strokeWidth="2.2" />
              </g>
            </svg>
          </motion.div>

          {/* ================================================================
              2. RIGHT TRIANGULAR ENVELOPE FLAP (3D Bas-Relief Golden Roses)
             ================================================================ */}
          <motion.div
            initial={{ x: '0%', rotateY: 0 }}
            animate={{
              x: isPartingFlaps ? '106%' : isUnfastening ? '2.4%' : '0%',
              rotateY: isPartingFlaps ? 28 : isUnfastening ? 6 : 0,
            }}
            transition={{
              duration: isPartingFlaps
                ? theme.timing.openingDurationMs / 1000
                : theme.timing.unfasteningMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 z-20 h-full w-full"
          >
            <img
              src="/assets/themes/golden-rose/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                clipPath: 'polygon(100% 0%, 47% 49.5%, 100% 100%)',
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <svg
              viewBox="0 0 400 720"
              preserveAspectRatio="none"
              className="relative z-10 h-full w-full drop-shadow-[-14px_0_32px_rgba(12,6,2,0.78)]"
            >
              <polygon
                points="400,0 188,356 400,720"
                fill="rgba(54, 30, 14, 0.25)"
                stroke="url(#gr24kFoil)"
                strokeWidth="2.8"
              />
              <polygon
                points="400,16 204,356 400,704"
                fill="none"
                stroke="url(#gr24kFoil)"
                strokeWidth="1.1"
                strokeDasharray="6 4"
                opacity="0.78"
              />

              <g
                filter="url(#goldenGlow)"
                stroke="url(#gr24kFoil)"
                strokeWidth="1.45"
                fill="none"
                opacity="0.95"
              >
                <use href="#sculptedGoldRose" transform="translate(332, 220) scale(-1, 1)" />
                <use href="#sculptedGoldRose" transform="translate(336, 442) scale(-1.08, 1.08)" />
                <path d="M 386,50 L 386,14 L 350,14 M 386,670 L 386,706 L 350,706" strokeWidth="2.2" />
              </g>
            </svg>
          </motion.div>

          {/* ================================================================
              3. BOTTOM TRIANGULAR ENVELOPE FLAP (Sunbeam & Botanical Filigree)
             ================================================================ */}
          <motion.div
            initial={{ y: '0%', rotateX: 0 }}
            animate={{
              y: isPartingFlaps ? '106%' : isUnfastening ? '2.4%' : '0%',
              rotateX: isPartingFlaps ? -24 : isUnfastening ? -5 : 0,
            }}
            transition={{
              duration: isPartingFlaps
                ? theme.timing.openingDurationMs / 1000
                : theme.timing.unfasteningMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 z-30 h-full w-full"
          >
            <img
              src="/assets/themes/golden-rose/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                clipPath: 'polygon(0% 100%, 50% 46.6%, 100% 100%)',
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <svg
              viewBox="0 0 400 720"
              preserveAspectRatio="none"
              className="relative z-10 h-full w-full drop-shadow-[0_-16px_34px_rgba(12,6,2,0.72)]"
            >
              <defs>
                <radialGradient id="grBottomSunbeam" cx="50%" cy="46%" r="54%">
                  <stop offset="0%" stopColor="#FFF8E2" stopOpacity="0.92" />
                  <stop offset="28%" stopColor="#F2BC66" stopOpacity="0.72" />
                  <stop offset="68%" stopColor="#6E3E1B" stopOpacity="0.48" />
                  <stop offset="100%" stopColor="#32190B" stopOpacity="0.6" />
                </radialGradient>
              </defs>

              <polygon
                points="0,720 200,336 400,720"
                fill="url(#grBottomSunbeam)"
                stroke="url(#gr24kFoil)"
                strokeWidth="2.8"
              />
              <polygon
                points="16,720 200,356 384,720"
                fill="none"
                stroke="url(#gr24kFoil)"
                strokeWidth="1.1"
                strokeDasharray="6 4"
                opacity="0.78"
              />

              {/* Glowing Golden Botanical Sprigs & Baroque Scrollwork on Bottom Flap */}
              <g
                filter="url(#goldenGlow)"
                stroke="#FFE8AD"
                strokeWidth="1.5"
                fill="none"
                opacity="0.95"
              >
                <path d="M 134,638 Q 158,568 182,512" />
                <ellipse cx="144" cy="602" rx="10" ry="4.5" transform="rotate(-35 144 602)" fill="#FFE8AD" />
                <ellipse cx="164" cy="578" rx="9" ry="4" transform="rotate(25 164 578)" fill="#FFE8AD" />
                <ellipse cx="160" cy="550" rx="9" ry="4" transform="rotate(-30 160 550)" fill="#FFE8AD" />
                <ellipse cx="176" cy="528" rx="8" ry="3.5" transform="rotate(20 176 528)" fill="#FFE8AD" />

                <path d="M 266,638 Q 242,568 218,512" />
                <ellipse cx="256" cy="602" rx="10" ry="4.5" transform="rotate(35 256 602)" fill="#FFE8AD" />
                <ellipse cx="236" cy="578" rx="9" ry="4" transform="rotate(-25 236 578)" fill="#FFE8AD" />
                <ellipse cx="240" cy="550" rx="9" ry="4" transform="rotate(30 240 550)" fill="#FFE8AD" />
                <ellipse cx="224" cy="528" rx="8" ry="3.5" transform="rotate(-20 224 528)" fill="#FFE8AD" />
              </g>
            </svg>
          </motion.div>

          {/* ================================================================
              4. TOP TRIANGULAR ENVELOPE FLAP (Ornate Provence Estate Cartouche)
             ================================================================ */}
          <motion.div
            initial={{ y: '0%', rotateX: 0 }}
            animate={{
              y: isPartingFlaps ? '-106%' : isUnfastening ? '-2.4%' : '0%',
              rotateX: isPartingFlaps ? 26 : isUnfastening ? 6 : 0,
            }}
            transition={{
              duration: isPartingFlaps
                ? theme.timing.openingDurationMs / 1000
                : theme.timing.unfasteningMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 z-30 h-full w-full"
          >
            <img
              src="/assets/themes/golden-rose/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 50% 48.3%)',
              }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            <svg
              viewBox="0 0 400 720"
              preserveAspectRatio="none"
              className="relative z-10 h-full w-full drop-shadow-[0_16px_34px_rgba(18,8,3,0.68)]"
            >
              <polygon
                points="0,0 400,0 200,348"
                fill="rgba(138, 76, 44, 0.42)"
                stroke="url(#gr24kFoil)"
                strokeWidth="2.8"
              />
              <polygon
                points="16,0 384,0 200,328"
                fill="none"
                stroke="url(#gr24kFoil)"
                strokeWidth="1.1"
                strokeDasharray="6 4"
                opacity="0.82"
              />
            </svg>

            {/* Ornate Gold-Framed Couple Cartouche on Top Flap */}
            <div className="pointer-events-none absolute inset-x-12 top-[7.5%] z-20 flex flex-col items-center rounded-[16px] border border-[#F5D08A]/75 bg-[#361C0E]/88 px-4 py-2 text-center shadow-[0_10px_24px_rgba(18,8,3,0.6)] backdrop-blur-[2px]">
              <span className="font-engraved text-[8px] uppercase tracking-[0.32em] text-[#F5D08A]">
                {config.venue.name} · {config.venue.location}
              </span>
              <span className="mt-0.5 font-lacy-display text-lg sm:text-xl text-[#FFF6E5]">
                {config.couple.partnerOne} &amp; {config.couple.partnerTwo}
              </span>
            </div>
          </motion.div>

          {/* ================================================================
              5. RICHLY DETAILED HEIRLOOM WAX SEAL & GOLDEN WREATH RIM
             ================================================================ */}
          <AnimatePresence>
            {(stage === 'closed' ||
              stage === 'seal-interaction' ||
              stage === 'unfastening') && (
              <motion.div
                key="golden-rose-wax-seal-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 1.18,
                  transition: { duration: 0.42, ease: animationConfig.luxuryEasing },
                }}
                style={{
                  left: '50%',
                  top: '48%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-50 flex flex-col items-center justify-center"
              >
                {/* Volumetric Golden Light Bloom Behind & Below the Wax Seal */}
                <motion.div
                  animate={
                    isSealInteracting || isUnfastening
                      ? { scale: [1, 1.6, 1.4], opacity: [0.9, 1, 0.75] }
                      : {
                          scale: isHovered ? [1.06, 1.18, 1.06] : [1, 1.12, 1],
                          opacity: isHovered ? [0.8, 0.98, 0.8] : [0.72, 0.94, 0.72],
                        }
                  }
                  transition={
                    isSealInteracting
                      ? { duration: 0.7, ease: 'easeOut' }
                      : { duration: 3.0, repeat: Infinity, ease: 'easeInOut' }
                  }
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,248,220,0.98) 0%, rgba(255,212,128,0.82) 38%, rgba(229,164,76,0) 72%)',
                  }}
                  className="absolute top-8 h-48 w-48 rounded-full blur-md"
                />

                {/* Outer Gold Filigree Wreath Ring Around Wax Seal */}
                <svg
                  viewBox="0 0 160 160"
                  className="absolute h-36 w-36 sm:h-40 sm:w-40 drop-shadow-[0_8px_20px_rgba(24,10,3,0.75)]"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r="72"
                    fill="none"
                    stroke="#F7D58B"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                </svg>

                {/* Sculpted Organic Ivory-Pearl & Gold Botanical Wax Seal */}
                <motion.div
                  animate={
                    isSealInteracting
                      ? { scale: [1, 0.93, 1.06, 1], rotate: [0, -3, 2, 0] }
                      : { scale: isHovered ? 1.035 : 1 }
                  }
                  transition={{
                    duration: isSealInteracting
                      ? theme.timing.sealInteractionMs / 1000
                      : 0.35,
                    ease: animationConfig.luxuryEasing,
                  }}
                  className="shimmer-overlay relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center overflow-hidden rounded-full shadow-[0_18px_42px_rgba(24,10,3,0.78)]"
                  style={{
                    background:
                      'radial-gradient(circle at 36% 30%, #FFFDF9 0%, #F4EAE0 48%, #DECBB8 82%, #BEA58E 100%)',
                    border: '3px solid #F5D08A',
                  }}
                >
                  <div className="flex h-[82%] w-[82%] flex-col items-center justify-center rounded-full border-2 border-dashed border-[#C5A47E] shadow-inner">
                    <span className="font-engraved text-[7px] uppercase tracking-[0.26em] text-[#9E7848]">
                      PROVENCE
                    </span>
                    <span className="font-lacy-script text-2xl sm:text-3xl text-[#7A5934]">
                      {config.couple.monogramInitialOne} &amp; {config.couple.monogramInitialTwo}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ================================================================
              6. BOTTOM "CLICK TO OPEN" PROMPT
             ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === 'closed' ? 1 : 0,
              y: stage === 'closed' ? (isHovered ? -2 : 0) : 8,
            }}
            transition={{ duration: 0.4, ease: animationConfig.luxuryEasing }}
            className="pointer-events-none absolute inset-x-0 bottom-[7.5%] z-50 flex flex-col items-center px-6 text-center"
          >
            <div className="lacy-nacre-button inline-flex items-center justify-center px-6 py-2 shadow-xl">
              <span className="font-lacy-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] indent-[0.14em] text-[#4A2C18]">
                {config.envelope.tapPrompt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
