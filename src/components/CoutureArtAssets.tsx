import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { animationConfig } from '../config/animationConfig';
import { LUXURY_THEMES, type LuxuryThemeSpec } from '../config/themeRegistry';

export const LacyDiamondGemSvg: React.FC<{
  className?: string;
  style?: React.CSSProperties;
}> = ({ className = 'h-3.5 w-3.5', style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
    style={style}
  >
    <path
      d="M12 1.6C13.1 7 17 10.9 22.4 12 17 13.1 13.1 17 12 22.4 10.9 17 7 13.1 1.6 12 7 10.9 10.9 7 12 1.6Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
    <path
      d="M12 8.5C12.35 10.15 13.85 11.65 15.5 12 13.85 12.35 12.35 13.85 12 15.5 11.65 13.85 10.15 12.35 8.5 12 10.15 11.65 11.65 10.15 12 8.5Z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  </svg>
);

export const LacyPearlBrooch: React.FC<{
  delay?: number;
  isStarted?: boolean;
  theme?: LuxuryThemeSpec;
}> = ({
  delay = animationConfig.initialStaggerSec.brooch,
  isStarted = true,
  theme = LUXURY_THEMES.ivory,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.88 }}
      animate={isStarted ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
      transition={{
        duration: animationConfig.textFadeInDurationSec,
        delay: prefersReducedMotion ? 0 : delay,
        ease: animationConfig.luxuryEasing,
      }}
      className="relative mx-auto flex h-4 w-28 items-center justify-center select-none"
      aria-hidden="true"
    >
      <motion.span
        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={isStarted ? { scaleX: 1, opacity: 0.9 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: animationConfig.textFadeInDurationSec,
          delay: prefersReducedMotion ? 0 : delay + 0.1,
          ease: animationConfig.luxuryEasing,
        }}
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accentHex}, transparent)`,
        }}
        className="h-[1.2px] w-full"
      />
      <span
        style={{ color: theme.accentHex }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <LacyDiamondGemSvg className="h-3.5 w-3.5" />
      </span>
      <span
        className={`${theme.pearlBeadClass} absolute left-1/2 top-[38%] h-3 w-3 -translate-x-1/2 -translate-y-1/2`}
      />
    </motion.div>
  );
};

export const LacyGoldRuleDivider: React.FC<{
  delay?: number;
  isStarted?: boolean;
  widthClass?: string;
  theme?: LuxuryThemeSpec;
}> = ({
  delay = 0,
  isStarted = true,
  widthClass = 'w-40 sm:w-44',
  theme = LUXURY_THEMES.ivory,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      style={{ color: theme.accentHex }}
      className={`mx-auto flex items-center justify-center gap-1.5 select-none ${widthClass}`}
      aria-hidden="true"
    >
      <motion.span
        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={isStarted ? { scaleX: 1, opacity: 0.86 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: 1.2,
          delay: prefersReducedMotion ? 0 : delay,
          ease: animationConfig.luxuryEasing,
        }}
        style={{
          transformOrigin: 'right center',
          background: `linear-gradient(90deg, transparent, ${theme.accentHex}, ${theme.accentHex})`,
        }}
        className="h-[1.2px] flex-1"
      />
      <motion.span
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.4, rotate: -45 }}
        animate={
          isStarted
            ? { opacity: 1, scale: 1, rotate: 0 }
            : { opacity: 0, scale: 0.4, rotate: -45 }
        }
        transition={{
          duration: 0.9,
          delay: prefersReducedMotion ? 0 : delay + 0.18,
          ease: animationConfig.luxuryEasing,
        }}
        className="flex shrink-0 items-center justify-center"
      >
        <LacyDiamondGemSvg className="h-3.5 w-3.5" />
      </motion.span>
      <motion.span
        initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={isStarted ? { scaleX: 1, opacity: 0.86 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: 1.2,
          delay: prefersReducedMotion ? 0 : delay,
          ease: animationConfig.luxuryEasing,
        }}
        style={{
          transformOrigin: 'left center',
          background: `linear-gradient(270deg, transparent, ${theme.accentHex}, ${theme.accentHex})`,
        }}
        className="h-[1.2px] flex-1"
      />
    </div>
  );
};

export const LacyNacreTitlePlaque: React.FC<{
  title: string;
  eyebrow?: string;
  theme?: LuxuryThemeSpec;
}> = ({ title, eyebrow, theme = LUXURY_THEMES.ivory }) => {
  return (
    <div className="flex flex-col items-center text-center select-none">
      {eyebrow && (
        <span
          className={`${theme.embossedAccentClass} mb-1 font-engraved text-[10px] sm:text-[11px] font-normal uppercase tracking-[0.28em] indent-[0.14em]`}
        >
          {eyebrow}
        </span>
      )}
      <div className="relative mx-auto flex w-[196px] sm:w-[220px] aspect-[703/276] items-center justify-center">
        <img
          src={theme.assets.titlePlaque}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full object-contain drop-shadow-[0_6px_14px_rgba(114,99,81,0.16)]"
        />
        <span
          className={`${theme.embossedAccentClass} relative z-10 px-6 font-lacy-display text-base sm:text-lg font-medium tracking-[0.03em] leading-tight text-center`}
        >
          {title}
        </span>
      </div>
    </div>
  );
};

export const MotherOfPearlCameoSeal: React.FC<{
  className?: string;
  theme?: LuxuryThemeSpec;
}> = ({ className = 'w-14 sm:w-16', theme = LUXURY_THEMES.ivory }) => (
  <div className={`relative select-none ${className}`}>
    <img
      src={theme.assets.sealCameo}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="h-auto w-full drop-shadow-[0_6px_14px_rgba(68,52,34,0.22)]"
    />
  </div>
);
