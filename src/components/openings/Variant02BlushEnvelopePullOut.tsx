import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import type { ThemeOpeningProps } from './types';

/**
 * 02 — THE BLUSH (Romantic Botanical Couture)
 * Couple: Aoife O'Sullivan & Cian Murphy
 * Venue: Powerscourt House & Gardens, County Wicklow, Ireland
 *
 * Ornate Botanical Couture Cover:
 * - High-res 3D embossed blush-rose & pearl botanical lace relief texture (/assets/themes/blush/cover-texture.webp).
 * - Intricate engraved rose-gold foil filigree borders & corner acanthus scrollwork.
 * - Embossed botanical monogram cartouche (A · C) on the upper envelope flap.
 * - Ornamental floral & pearl wax seal with traveling rose-gold specular reflections.
 */
export const Variant02BlushEnvelopePullOut: React.FC<ThemeOpeningProps> = ({
  config,
  theme,
  stage,
  onTriggerOpen,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const isSealInteracting = stage === 'seal-interaction';
  const isUnfastening = stage === 'unfastening';
  const isFlapOpened =
    stage === 'unfastening' ||
    stage === 'opening-doors' ||
    stage === 'revealing-interior';
  const isPullingOut =
    stage === 'opening-doors' || stage === 'revealing-interior';
  const isRevealingInterior = stage === 'revealing-interior';

  const floatingPetals = [
    { id: 1, left: '18%', startY: '62%', endY: '-18%', driftX: -28, rot: 145, delay: 0.1 },
    { id: 2, left: '78%', startY: '58%', endY: '-22%', driftX: 32, rot: -160, delay: 0.25 },
    { id: 3, left: '32%', startY: '72%', endY: '-12%', driftX: 22, rot: 110, delay: 0.45 },
    { id: 4, left: '66%', startY: '68%', endY: '-15%', driftX: -24, rot: -125, delay: 0.35 },
  ];

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="blush-botanical-envelope-layer"
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
          {/* Ambient Golden-Hour Blush Studio Backdrop */}
          <motion.div
            animate={{ opacity: isPullingOut ? 0 : 1 }}
            transition={{ duration: 2.6, ease: animationConfig.luxuryEasing }}
            style={{
              background:
                'radial-gradient(ellipse at 50% 32%, #FFF9F6 0%, #F4DCD5 55%, #DCBFB7 100%)',
            }}
            className="absolute inset-0 z-0"
          />

          {/* ================================================================
              1. ENVELOPE BACK & ROSE-GOLD DAMASK LINING
             ================================================================ */}
          <motion.div
            initial={{ y: '0%', scale: 1 }}
            animate={{
              y: isPullingOut ? '110%' : '0%',
              scale: isPullingOut ? 0.95 : 1,
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            className="absolute inset-x-[3%] top-[6.5%] bottom-[4.5%] z-10 overflow-hidden rounded-[22px] shadow-[0_28px_70px_rgba(88,48,42,0.3)]"
            style={{
              background:
                'linear-gradient(180deg, #D59B8F 0%, #E8C5BD 32%, #F7E6E2 100%)',
              border: '1.5px solid rgba(196, 125, 114, 0.65)',
            }}
          >
            <svg
              viewBox="0 0 400 320"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-x-0 top-0 h-[54%] w-full opacity-90"
            >
              <defs>
                <linearGradient id="linerWash" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDF6F3" />
                  <stop offset="55%" stopColor="#F5DFDA" />
                  <stop offset="100%" stopColor="#EED4CE" />
                </linearGradient>
              </defs>
              <rect width="400" height="320" fill="url(#linerWash)" />
            </svg>
          </motion.div>

          {/* ================================================================
              2. EMERGING BOTANICAL GARDEN INVITATION CARD
             ================================================================ */}
          <motion.div
            initial={{ y: '18%', scale: 0.88 }}
            animate={{
              y: isPullingOut ? ['18%', '-6%', '0%'] : '18%',
              scale: isPullingOut ? [0.88, 0.95, 1.0] : 0.88,
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              times: [0, 0.52, 1],
              ease: animationConfig.luxuryEasing,
            }}
            className="absolute inset-0 z-20 h-full w-full overflow-hidden rounded-[22px] shadow-[0_22px_55px_rgba(84,46,38,0.28)]"
          >
            <img
              src={theme.assets.innerCardBg}
              alt=""
              aria-hidden="true"
              draggable={false}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Floating Watercolor Rose Petals During Emergence */}
          {isPullingOut &&
            !prefersReducedMotion &&
            floatingPetals.map((petal) => (
              <motion.div
                key={petal.id}
                initial={{
                  left: petal.left,
                  top: petal.startY,
                  opacity: 0,
                  scale: 0.6,
                  rotate: 0,
                }}
                animate={{
                  top: petal.endY,
                  x: [0, petal.driftX, petal.driftX * 0.6],
                  opacity: [0, 0.78, 0],
                  scale: [0.65, 1, 0.85],
                  rotate: petal.rot,
                }}
                transition={{
                  duration: 2.9,
                  delay: petal.delay,
                  ease: 'easeOut',
                }}
                className="pointer-events-none absolute z-40 h-5 w-4"
              >
                <svg viewBox="0 0 24 30" className="h-full w-full drop-shadow-xs">
                  <path
                    d="M12,1 C20,6 23,16 17,25 C12,30 4,27 2,18 C0,10 5,3 12,1 Z"
                    fill="#F2B8AD"
                    fillOpacity="0.82"
                  />
                </svg>
              </motion.div>
            ))}

          {/* ================================================================
              3. FRONT ORNATE BOTANICAL COUTURE ENVELOPE POCKET
             ================================================================ */}
          <motion.div
            initial={{ y: '0%', scale: 1 }}
            animate={{
              y: isPullingOut ? '110%' : '0%',
              scale: isPullingOut ? 0.95 : 1,
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            className="pointer-events-none absolute inset-x-[3%] top-[6.5%] bottom-[4.5%] z-30 overflow-hidden rounded-[22px]"
          >
            {/* 3D Bas-Relief Botanical Lace & Pearl Cover Texture */}
            <img
              src="/assets/themes/blush/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                clipPath:
                  'polygon(0% 16%, 50% 50%, 100% 16%, 100% 100%, 0% 100%)',
              }}
              className="absolute inset-0 z-10 h-full w-full object-cover"
            />

            {/* Golden-Hour Rose Light Bloom when seal is touched */}
            <motion.div
              animate={{
                opacity: isSealInteracting || isUnfastening ? [0.35, 0.95, 0.55] : 0.3,
                scale: isSealInteracting || isUnfastening ? [1, 1.3, 1.12] : 1,
              }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{
                background:
                  'radial-gradient(circle at 50% 48%, rgba(255, 240, 224, 0.9) 0%, rgba(236, 178, 162, 0.48) 38%, transparent 72%)',
              }}
              className="absolute inset-0 z-20"
            />

            {/* Intricate Rose-Gold Foil Filigree & Pocket Seams */}
            <svg
              viewBox="0 0 400 680"
              preserveAspectRatio="none"
              className="absolute inset-0 z-20 h-full w-full drop-shadow-[0_-10px_24px_rgba(88,46,38,0.22)]"
            >
              <defs>
                <linearGradient id="roseGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9E5E50" />
                  <stop offset="32%" stopColor="#FCE4DC" />
                  <stop offset="55%" stopColor="#C88272" />
                  <stop offset="82%" stopColor="#FFF0EB" />
                  <stop offset="100%" stopColor="#8E5042" />
                </linearGradient>
              </defs>

              <ellipse
                id="pocket-throat-occlusion"
                cx="200"
                cy="336"
                rx="185"
                ry="26"
                fill="rgba(78, 38, 30, 0.28)"
              />

              {/* Left & Right Diagonal Rose-Gold Foil Seams */}
              <polyline
                points="0,112 200,344 0,680"
                fill="none"
                stroke="url(#roseGoldFoil)"
                strokeWidth="2.4"
              />
              <polyline
                points="400,112 200,344 400,680"
                fill="none"
                stroke="url(#roseGoldFoil)"
                strokeWidth="2.4"
              />

              {/* Bottom Overlapping Couture Pocket Flap */}
              <polygon
                points="0,680 152,328 248,328 400,680"
                fill="#FDF3F0"
                fillOpacity="0.62"
                stroke="url(#roseGoldFoil)"
                strokeWidth="2.5"
              />
              <path
                d="M 18,666 L 162,344 L 238,344 L 382,666 Z"
                fill="none"
                stroke="url(#roseGoldFoil)"
                strokeWidth="1.2"
                strokeDasharray="5 3"
              />

              {/* Corner Engraved Filigree Brackets */}
              <g stroke="url(#roseGoldFoil)" strokeWidth="1.6" fill="none">
                <path d="M 16,620 L 16,664 L 64,664 M 24,634 C 24,656 36,656 52,656" />
                <path d="M 384,620 L 384,664 L 336,664 M 376,634 C 376,656 364,656 348,656" />
              </g>
            </svg>

            {/* Couple & Venue Calligraphy Plaque on Lower Envelope */}
            <div className="absolute inset-x-8 bottom-[13.5%] z-30 flex flex-col items-center rounded-[16px] border border-[#C88272]/45 bg-[#FFFDFB]/82 px-4 py-2 text-center shadow-sm backdrop-blur-[2px]">
              <span className="font-engraved text-[8.5px] uppercase tracking-[0.32em] text-[#5B735D]">
                {config.venue.name}
              </span>
              <span className="mt-0.5 font-lacy-script text-2xl sm:text-3xl text-[#593A36]">
                {config.couple.partnerOneFull || config.couple.partnerOne} &amp;{' '}
                {config.couple.partnerTwoFull || config.couple.partnerTwo}
              </span>
              <span className="font-lacy-serif text-[10px] italic text-[#8A5A50]">
                {config.date.fullDateDisplay} · {config.venue.location}
              </span>
            </div>
          </motion.div>

          {/* ================================================================
              4. TOP 3D ORNATE BOTANICAL ENVELOPE FLAP
             ================================================================ */}
          <motion.div
            initial={{ rotateX: 0, y: '0%', scale: 1 }}
            animate={{
              rotateX: isFlapOpened ? 172 : 0,
              y: isPullingOut ? '110%' : '0%',
              scale: isPullingOut ? 0.95 : 1,
            }}
            transition={{
              rotateX: {
                duration: 1.15,
                ease: animationConfig.luxuryEasing,
              },
              y: {
                duration: theme.timing.openingDurationMs / 1000,
                ease: animationConfig.luxuryEasing,
              },
              scale: {
                duration: theme.timing.openingDurationMs / 1000,
                ease: animationConfig.luxuryEasing,
              },
            }}
            style={{
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: isPullingOut ? 15 : 40,
            }}
            className="pointer-events-none absolute inset-x-[3%] top-[6.5%] h-[46%]"
          >
            {/* 3D Bas-Relief Botanical Texture Clipped to Top Triangular Flap */}
            <img
              src="/assets/themes/blush/cover-texture.webp"
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 55.5% 92%, 50% 99%, 44.5% 92%)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />

            <svg
              viewBox="0 0 400 330"
              preserveAspectRatio="none"
              className="relative z-10 h-full w-full drop-shadow-[0_16px_28px_rgba(88,46,38,0.28)]"
            >
              <path
                d="M 0,0 L 400,0 L 222,302 Q 200,328 178,302 Z"
                fill="rgba(255, 249, 246, 0.35)"
                stroke="#C47D72"
                strokeWidth="2.6"
              />
              <path
                d="M 14,10 L 386,10 L 216,286 Q 200,308 184,286 Z"
                fill="none"
                stroke="#9E5E50"
                strokeWidth="1.2"
                strokeDasharray="6 4"
              />
              {/* Scalloped Lace-Inspired Inner Border along Top Flap */}
              <path
                d="M 28,20 L 372,20 L 210,270 Q 200,288 190,270 Z"
                fill="none"
                stroke="#C47D72"
                strokeWidth="1"
                opacity="0.7"
              />
            </svg>

            {/* Embossed Botanical Monogram Cartouche on Top Flap */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
              className="absolute inset-x-10 top-[11%] z-20 flex flex-col items-center text-center"
            >
              <div className="flex flex-col items-center rounded-[18px] border border-[#C47D72]/60 bg-[#FFFDFB]/90 px-5 py-2 shadow-[0_8px_20px_rgba(110,60,50,0.14)]">
                <span className="font-engraved text-[8px] uppercase tracking-[0.34em] text-[#9E5E50]">
                  {config.eventType}
                </span>
                <span className="mt-0.5 font-lacy-script text-3xl sm:text-[2.15rem] leading-tight text-[#593A36]">
                  {config.couple.partnerOne} &amp; {config.couple.partnerTwo}
                </span>
              </div>
            </div>
          </motion.div>

          {/* ================================================================
              5. ORNAMENTAL ROSE-GOLD & PEARL WAX SEAL HOTSPOT (700ms)
             ================================================================ */}
          <AnimatePresence>
            {(stage === 'closed' || stage === 'seal-interaction') && (
              <motion.div
                key="blush-botanical-seal-hotspot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, transition: { duration: 0.28 } }}
                style={{
                  left: '50%',
                  top: '48.5%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-50 flex items-center justify-center"
              >
                <motion.div
                  animate={
                    isSealInteracting
                      ? { scale: [1, 1.5], opacity: [0.85, 0] }
                      : {
                          scale: isHovered ? [1.05, 1.2, 1.05] : [1, 1.15, 1],
                          opacity: [0.35, 0.65, 0.35],
                        }
                  }
                  transition={
                    isSealInteracting
                      ? {
                          duration: theme.timing.sealInteractionMs / 1000,
                          ease: 'easeOut',
                        }
                      : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute h-36 w-28 rounded-[50%] bg-[#F4C2B5]/65 blur-md"
                />

                <motion.div
                  animate={
                    isSealInteracting
                      ? {
                          scale: [1, 0.92, 1.05, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.15)',
                            'brightness(1.05)',
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
                  className="shimmer-overlay relative h-[16dvh] w-[12.4dvh] max-h-[144px] max-w-[110px] overflow-hidden rounded-[50%] ring-2 ring-[#E8B8AC]/80 shadow-[0_12px_26px_rgba(88,44,36,0.38)]"
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
              6. BOTTOM "TOUCH SEAL TO OPEN" BUTTON
             ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === 'closed' ? 1 : 0,
              y: stage === 'closed' ? (isHovered ? -2 : 0) : 8,
            }}
            transition={{ duration: 0.4, ease: animationConfig.luxuryEasing }}
            className="pointer-events-none absolute inset-x-0 bottom-[6.5%] z-50 flex flex-col items-center px-6 text-center"
          >
            <div className="blush-nacre-button inline-flex items-center justify-center px-6 py-2 shadow-lg">
              <span className="font-lacy-serif text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] indent-[0.14em] text-[#5D3F3B]">
                {config.envelope.tapPrompt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
