import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../../config/animationConfig';
import type { ThemeOpeningProps } from './types';

/**
 * 03 — THE EMERALD (Royal Heritage & Castle Elegance)
 * Couple: Saoirse O'Connor & James Fitzgerald
 * Venue: Ashford Castle, County Mayo, Ireland
 *
 * Ornate Royal Heritage Cover Upgrade:
 * - High-res 3D embossed Royal Emerald velvet & antique-gold relief texture (/assets/themes/emerald/cover-texture.webp).
 * - Four cast-gold filigree book-corner protectors with rivets & Celtic interlace.
 * - Intricate embossed cathedral arch borders, heraldic crown crest, and traveling metallic reflections.
 * - Magnificent royal wax seal with antique-gold bullion cord & dynamic cast shadows.
 */
export const Variant03EmeraldBookReveal: React.FC<ThemeOpeningProps> = ({
  config,
  theme,
  stage,
  onTriggerOpen,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const isSealInteracting = stage === 'seal-interaction';
  const isUnfastening = stage === 'unfastening';
  const isBookOpening =
    stage === 'opening-doors' || stage === 'revealing-interior';
  const isRevealingInterior = stage === 'revealing-interior';

  return (
    <AnimatePresence>
      {stage !== 'opened' && (
        <motion.div
          key="emerald-castle-folio-layer"
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
          style={{ perspective: '2600px' }}
          className={`absolute inset-0 z-30 h-full w-full overflow-hidden select-none ${
            stage === 'closed' ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {/* 3D Gilded Multi-Page Book Block Edge on Right Margin */}
          <div
            id="gilded-page-block-edge"
            style={{
              background:
                'repeating-linear-gradient(90deg, #E8CF96 0px, #B89146 1.5px, #F7E5B8 3px)',
            }}
            className="pointer-events-none absolute inset-y-[2%] right-0 z-15 w-[7px] opacity-85 shadow-[-4px_0_12px_rgba(0,0,0,0.45)]"
          />

          {/* Dynamic Castle Folio Gutter Shadow across the parchment page as the cover swings open */}
          <motion.div
            initial={{ opacity: 0.78, x: '0%' }}
            animate={{
              opacity: isBookOpening ? [0.78, 0.45, 0] : 0.78,
              x: isBookOpening ? ['0%', '-38%', '-80%'] : '0%',
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              background:
                'linear-gradient(90deg, rgba(6, 20, 14, 0.88) 0%, rgba(10, 32, 23, 0.44) 38%, transparent 100%)',
            }}
            className="pointer-events-none absolute inset-0 z-10"
          />

          {/* Left Sculpted Castle Folio Spine with 7 Raised Antique-Gold Bookbinding Hubs */}
          <motion.div
            animate={{
              x: isBookOpening ? '-100%' : '0%',
              opacity: isBookOpening ? [1, 0.85, 0] : 1,
            }}
            transition={{
              duration: theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              background:
                'linear-gradient(90deg, #061610 0%, #153E2E 42%, #0B241A 82%, #04110B 100%)',
              borderRight: '2.5px solid #C9A461',
            }}
            className="pointer-events-none absolute inset-y-0 left-0 z-40 w-[8%] shadow-[10px_0_28px_rgba(0,0,0,0.65)]"
          >
            {[12, 26, 40, 50, 60, 74, 88].map((topPct) => (
              <div
                key={topPct}
                style={{
                  top: `${topPct}%`,
                  background:
                    'linear-gradient(180deg, #8F6D2E 0%, #F5DDA4 50%, #7C5C22 100%)',
                }}
                className="absolute inset-x-0 h-[5px] shadow-[0_2px_5px_rgba(0,0,0,0.7)]"
              />
            ))}
          </motion.div>

          {/* ================================================================
              3D ROTATING EMBOSSED EMERALD & ANTIQUE-GOLD ROYAL HARDCOVER
             ================================================================ */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{
              rotateY: isBookOpening
                ? -156
                : isUnfastening
                ? -9
                : 0,
            }}
            transition={{
              duration: isUnfastening
                ? theme.timing.unfasteningMs / 1000
                : theme.timing.openingDurationMs / 1000,
              ease: animationConfig.luxuryEasing,
            }}
            style={{
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
            }}
            className="absolute inset-0 z-30 h-full w-full"
          >
            {/* OUTER FRONT COVER FACE */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                backgroundColor: '#0C261C',
              }}
              className="absolute inset-0 h-full w-full overflow-hidden shadow-[24px_0_60px_rgba(0,0,0,0.72)]"
            >
              {/* High-Res 3D Embossed Emerald Velvet & Antique-Gold Relief Texture */}
              <img
                src="/assets/themes/emerald/cover-texture.webp"
                alt=""
                aria-hidden="true"
                draggable={false}
                className="absolute inset-0 z-0 h-full w-full object-cover"
              />

              {/* Moving Specular Gold Light Sheen as the folio opens or hovers */}
              <motion.div
                animate={{
                  x: isBookOpening
                    ? ['-45%', '125%']
                    : isHovered
                    ? ['-55%', '65%']
                    : '-55%',
                  opacity: isBookOpening
                    ? [0.2, 0.58, 0]
                    : isHovered
                    ? 0.32
                    : 0.14,
                }}
                transition={{
                  duration: isBookOpening
                    ? (theme.timing.openingDurationMs * 0.85) / 1000
                    : 1.4,
                  ease: 'easeInOut',
                }}
                style={{
                  background:
                    'linear-gradient(105deg, transparent 20%, rgba(247, 228, 178, 0.42) 50%, transparent 80%)',
                }}
                className="pointer-events-none absolute inset-0 z-20"
              />

              {/* Cast-Gold Book Corners, Celtic Interlace & Royal Heraldic Filigree */}
              <svg
                viewBox="0 0 440 780"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 z-10 h-full w-full"
              >
                <defs>
                  <linearGradient id="antiqueGoldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8F6B28" />
                    <stop offset="26%" stopColor="#F5E0A6" />
                    <stop offset="52%" stopColor="#C9A461" />
                    <stop offset="78%" stopColor="#FFF0C2" />
                    <stop offset="100%" stopColor="#7E5C1E" />
                  </linearGradient>
                  {/* Cast-Gold Metal Book Corner Protector */}
                  <g id="royalBookCorner">
                    <polygon
                      points="0,0 64,0 0,64"
                      fill="url(#antiqueGoldFoil)"
                      opacity="0.92"
                    />
                    <polygon
                      points="4,4 52,4 4,52"
                      fill="#0E2B20"
                      stroke="url(#antiqueGoldFoil)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M 10,10 L 34,10 L 10,34 Z"
                      fill="url(#antiqueGoldFoil)"
                      opacity="0.85"
                    />
                    <circle cx="54" cy="10" r="2.5" fill="#FFF0C2" />
                    <circle cx="10" cy="54" r="2.5" fill="#FFF0C2" />
                  </g>
                </defs>

                {/* Four Cast-Gold Metal Book Corners */}
                <use href="#royalBookCorner" transform="translate(36, 16)" />
                <use href="#royalBookCorner" transform="translate(424, 16) scale(-1, 1)" />
                <use href="#royalBookCorner" transform="translate(36, 764) scale(1, -1)" />
                <use href="#royalBookCorner" transform="translate(424, 764) scale(-1, -1)" />

                {/* Outer Double Royal Filigree Borders */}
                <rect
                  x="42"
                  y="22"
                  width="376"
                  height="736"
                  rx="10"
                  fill="none"
                  stroke="url(#antiqueGoldFoil)"
                  strokeWidth="2.6"
                />
                <rect
                  x="52"
                  y="32"
                  width="356"
                  height="716"
                  rx="8"
                  fill="none"
                  stroke="url(#antiqueGoldFoil)"
                  strokeWidth="1.2"
                  strokeDasharray="6 4"
                />

                {/* Tudor-Gothic Pointed Castle Arch & Inner Filigree */}
                <path
                  d="M 72,724 L 72,255 Q 72,126 230,92 Q 388,126 388,255 L 388,724 Z"
                  fill="rgba(9, 29, 21, 0.58)"
                  stroke="url(#antiqueGoldFoil)"
                  strokeWidth="2.2"
                />
                <path
                  d="M 82,714 L 82,258 Q 82,138 230,104 Q 378,138 378,258 L 378,714 Z"
                  fill="none"
                  stroke="url(#antiqueGoldFoil)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.85"
                />

                {/* Royal Heraldic Crown & Celtic Knot Crest at Arch Apex */}
                <g transform="translate(230, 82)" stroke="url(#antiqueGoldFoil)" fill="none">
                  <path d="M -52,18 Q -26,-12 0,6 Q 26,-12 52,18" strokeWidth="1.8" />
                  <polygon points="0,-16 10,0 0,16 -10,0" fill="url(#antiqueGoldFoil)" />
                  <circle cx="-26" cy="2" r="3.5" fill="#F5E0A6" />
                  <circle cx="26" cy="2" r="3.5" fill="#F5E0A6" />
                </g>
              </svg>

              {/* Top & Bottom Foil-Stamped Castle Cover Typography */}
              <div className="pointer-events-none absolute inset-x-[15%] top-[16.5%] z-20 flex flex-col items-center rounded-[14px] border border-[#C9A461]/55 bg-[#0A2118]/85 px-4 py-3 text-center shadow-[0_12px_28px_rgba(0,0,0,0.65)] backdrop-blur-[2px]">
                <span className="font-engraved text-[9px] uppercase tracking-[0.34em] text-[#E5C98B]">
                  {config.eventType}
                </span>
                <h2 className="mt-1.5 font-engraved text-xl sm:text-2xl font-normal tracking-[0.06em] text-[#FAF0D7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {config.couple.partnerOneFull || config.couple.partnerOne}
                </h2>
                <span className="my-0.5 font-lacy-serif italic text-base text-[#E5C98B]">
                  &amp;
                </span>
                <h2 className="font-engraved text-xl sm:text-2xl font-normal tracking-[0.06em] text-[#FAF0D7] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  {config.couple.partnerTwoFull || config.couple.partnerTwo}
                </h2>
              </div>

              <div className="pointer-events-none absolute inset-x-[15%] bottom-[16%] z-20 flex flex-col items-center rounded-[12px] border border-[#C9A461]/45 bg-[#0A2118]/82 px-3 py-2 text-center">
                <span className="font-engraved text-[9.5px] uppercase tracking-[0.28em] text-[#E5C98B]">
                  {config.venue.name} · {config.venue.location}
                </span>
                <span className="mt-0.5 font-lacy-serif text-xs italic text-[#F4E6C6]/90">
                  {config.date.fullDateDisplay}
                </span>
              </div>

              {/* Right gilded parchment page-edge rim */}
              <div
                style={{
                  background:
                    'linear-gradient(180deg, #9E7B38 0%, #F4E0AD 50%, #8A6828 100%)',
                }}
                className="pointer-events-none absolute inset-y-0 right-0 z-30 w-[5px]"
              />
            </div>

            {/* INNER FRONT COVER PARCHMENT ENDPAPER */}
            <div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background:
                  'radial-gradient(ellipse at 50% 50%, #F5EFE2 0%, #E5D8BE 70%, #C9B48C 100%)',
                borderLeft: '6px solid #C9A461',
              }}
              className="absolute inset-0 h-full w-full overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.45)]"
            >
              <div className="absolute inset-6 rounded-[12px] border border-[#B58E44]/45" />
            </div>
          </motion.div>

          {/* ================================================================
              MAGNIFICENT ROYAL WAX SEAL & GOLD BULLION CORD HOTSPOT (700ms)
             ================================================================ */}
          <AnimatePresence>
            {(stage === 'closed' || stage === 'seal-interaction') && (
              <motion.div
                key="emerald-wax-seal-hotspot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
                style={{
                  left: '52.5%',
                  top: '51%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-50 flex items-center justify-center"
              >
                {/* Double Antique-Gold Bullion Cords & Heraldic Rosette Behind Seal */}
                <div
                  style={{
                    background:
                      'linear-gradient(90deg, transparent 0%, #C9A461 25%, #FFF0C2 50%, #C9A461 75%, transparent 100%)',
                  }}
                  className="absolute h-[3px] w-56 shadow-md"
                />
                <div className="absolute h-36 w-28 rounded-[50%] border-2 border-dashed border-[#E5C67E]/75" />

                <motion.div
                  animate={
                    isSealInteracting
                      ? { scale: [1, 1.52], opacity: [0.9, 0] }
                      : {
                          scale: isHovered ? [1.06, 1.2, 1.06] : [1, 1.16, 1],
                          opacity: [0.35, 0.68, 0.35],
                        }
                  }
                  transition={
                    isSealInteracting
                      ? {
                          duration: theme.timing.sealInteractionMs / 1000,
                          ease: 'easeOut',
                        }
                      : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }
                  }
                  className="absolute h-40 w-32 rounded-[50%] bg-[#E5C67E]/50 blur-md"
                />

                <motion.div
                  animate={
                    isSealInteracting
                      ? {
                          scale: [1, 0.93, 1.06, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.2)',
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
                  className="shimmer-overlay relative h-[16.8dvh] w-[12.8dvh] max-h-[148px] max-w-[114px] overflow-hidden rounded-[50%] p-1.5 ring-2 ring-[#F5E0A6] bg-[#0B241A] shadow-[0_16px_36px_rgba(0,0,0,0.78)]"
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
              BOTTOM "BREAK WAX SEAL" BUTTON
             ================================================================ */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: stage === 'closed' ? 1 : 0,
              y: stage === 'closed' ? (isHovered ? -2 : 0) : 8,
            }}
            transition={{ duration: 0.4, ease: animationConfig.luxuryEasing }}
            className="pointer-events-none absolute inset-x-0 bottom-[6.8%] z-50 flex flex-col items-center px-6 text-center"
          >
            <div className="emerald-nacre-button inline-flex items-center justify-center px-6 py-2 shadow-xl">
              <span className="font-engraved text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.3em] indent-[0.15em] text-[#F4E6C6]">
                {config.envelope.tapPrompt}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
