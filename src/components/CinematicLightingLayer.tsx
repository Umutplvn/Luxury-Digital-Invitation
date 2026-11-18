import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ThemeId } from '../config/themeRegistry';
import { animationConfig } from '../config/animationConfig';
import type { OpeningStage } from './openings/types';
import type { InvitationSectionIndex } from './InvitationSuiteDetails';

interface CinematicLightingLayerProps {
  themeId: ThemeId;
  stage: OpeningStage;
  activeSection: InvitationSectionIndex;
}

/**
 * STAGE-REACTIVE PHYSICALLY INSPIRED STUDIO LIGHTING & MATERIAL LAYER
 *
 * Models directional key lighting, ambient fill, paper-edge ambient occlusion,
 * fine stationery micro-grain, and stage-synchronized specular reflections
 * tailored to each of the six luxury editions.
 */
export const CinematicLightingLayer: React.FC<CinematicLightingLayerProps> = ({
  themeId,
  stage,
  activeSection,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isOpened = stage === 'opened';
  const isRevealing = stage === 'revealing-interior' || stage === 'opened';
  const isOpening =
    stage === 'unfastening' ||
    stage === 'opening-doors' ||
    stage === 'revealing-interior';

  const profiles: Record<
    ThemeId,
    {
      keyLights: string[];
      sealFocusLight: string;
      ambientVignette: string;
      innerRimBevel: string;
      sweepGradient: string;
      grainOpacity: number;
    }
  > = {
    ivory: {
      keyLights: [
        'radial-gradient(ellipse at 50% 16%, rgba(255, 252, 246, 0.42) 0%, rgba(235, 212, 175, 0.12) 48%, transparent 78%)',
        'radial-gradient(ellipse at 47% 20%, rgba(255, 252, 246, 0.38) 0%, rgba(235, 212, 175, 0.11) 50%, transparent 78%)',
        'radial-gradient(ellipse at 53% 18%, rgba(255, 252, 246, 0.40) 0%, rgba(235, 212, 175, 0.12) 48%, transparent 78%)',
        'radial-gradient(ellipse at 50% 22%, rgba(255, 252, 246, 0.42) 0%, rgba(235, 212, 175, 0.13) 50%, transparent 80%)',
      ],
      sealFocusLight:
        'radial-gradient(circle at 50% 50%, rgba(255, 250, 238, 0.45) 0%, rgba(52, 38, 24, 0.18) 80%)',
      ambientVignette:
        'inset 0 0 46px rgba(68, 50, 32, 0.15), inset 0 0 14px rgba(68, 50, 32, 0.08)',
      innerRimBevel:
        'inset 0 1px 0 rgba(255, 255, 255, 0.78), inset 0 -1px 0 rgba(178, 138, 93, 0.32)',
      sweepGradient:
        'linear-gradient(110deg, transparent 20%, rgba(255, 251, 242, 0.46) 50%, transparent 80%)',
      grainOpacity: 0.026,
    },
    blush: {
      keyLights: [
        'radial-gradient(ellipse at 46% 15%, rgba(255, 249, 244, 0.44) 0%, rgba(242, 198, 184, 0.14) 50%, transparent 80%)',
        'radial-gradient(ellipse at 52% 19%, rgba(255, 249, 244, 0.40) 0%, rgba(190, 208, 190, 0.12) 50%, transparent 80%)',
        'radial-gradient(ellipse at 48% 17%, rgba(255, 249, 244, 0.42) 0%, rgba(242, 198, 184, 0.14) 50%, transparent 80%)',
        'radial-gradient(ellipse at 50% 21%, rgba(255, 249, 244, 0.44) 0%, rgba(242, 198, 184, 0.15) 52%, transparent 82%)',
      ],
      sealFocusLight:
        'radial-gradient(circle at 50% 48%, rgba(255, 244, 236, 0.5) 0%, rgba(88, 48, 40, 0.16) 80%)',
      ambientVignette:
        'inset 0 0 42px rgba(96, 54, 46, 0.13), inset 0 0 12px rgba(96, 54, 46, 0.07)',
      innerRimBevel:
        'inset 0 1px 0 rgba(255, 252, 250, 0.82), inset 0 -1px 0 rgba(196, 125, 114, 0.28)',
      sweepGradient:
        'linear-gradient(110deg, transparent 20%, rgba(255, 245, 240, 0.48) 50%, transparent 80%)',
      grainOpacity: 0.03,
    },
    emerald: {
      keyLights: [
        'radial-gradient(ellipse at 50% 18%, rgba(255, 245, 218, 0.28) 0%, rgba(201, 164, 97, 0.10) 52%, transparent 82%)',
        'radial-gradient(ellipse at 48% 22%, rgba(255, 245, 218, 0.25) 0%, rgba(201, 164, 97, 0.09) 52%, transparent 82%)',
        'radial-gradient(ellipse at 52% 19%, rgba(255, 245, 218, 0.27) 0%, rgba(201, 164, 97, 0.10) 52%, transparent 82%)',
        'radial-gradient(ellipse at 50% 24%, rgba(255, 245, 218, 0.28) 0%, rgba(201, 164, 97, 0.11) 52%, transparent 82%)',
      ],
      sealFocusLight:
        'radial-gradient(circle at 52% 51%, rgba(244, 220, 158, 0.36) 0%, rgba(4, 16, 11, 0.42) 82%)',
      ambientVignette:
        'inset 0 0 56px rgba(5, 18, 12, 0.45), inset 0 0 18px rgba(5, 18, 12, 0.25)',
      innerRimBevel:
        'inset 0 0 0 1px rgba(201, 164, 97, 0.35), inset 0 1px 0 rgba(255, 244, 214, 0.35)',
      sweepGradient:
        'linear-gradient(110deg, transparent 22%, rgba(244, 224, 172, 0.34) 50%, transparent 78%)',
      grainOpacity: 0.032,
    },
    noir: {
      keyLights: [
        'radial-gradient(ellipse at 50% 18%, rgba(240, 213, 155, 0.19) 0%, rgba(214, 178, 110, 0.06) 48%, transparent 78%)',
        'radial-gradient(ellipse at 47% 22%, rgba(240, 213, 155, 0.17) 0%, rgba(214, 178, 110, 0.05) 48%, transparent 78%)',
        'radial-gradient(ellipse at 53% 20%, rgba(240, 213, 155, 0.18) 0%, rgba(214, 178, 110, 0.06) 48%, transparent 78%)',
        'radial-gradient(ellipse at 50% 24%, rgba(240, 213, 155, 0.20) 0%, rgba(214, 178, 110, 0.07) 50%, transparent 80%)',
      ],
      sealFocusLight:
        'radial-gradient(circle at 50% 50%, rgba(240, 213, 155, 0.32) 0%, rgba(0, 0, 0, 0.65) 80%)',
      ambientVignette:
        'inset 0 0 68px rgba(0, 0, 0, 0.72), inset 0 0 22px rgba(0, 0, 0, 0.45)',
      innerRimBevel:
        'inset 0 0 0 1px rgba(214, 178, 110, 0.34), inset 0 1px 0 rgba(245, 224, 178, 0.3)',
      sweepGradient:
        'linear-gradient(110deg, transparent 24%, rgba(240, 213, 155, 0.26) 50%, transparent 76%)',
      grainOpacity: 0.025,
    },
    'chateau-blue': {
      keyLights: [
        'radial-gradient(ellipse at 50% 15%, rgba(255, 255, 255, 0.45) 0%, rgba(206, 222, 238, 0.14) 52%, transparent 80%)',
        'radial-gradient(ellipse at 48% 19%, rgba(255, 255, 255, 0.42) 0%, rgba(206, 222, 238, 0.13) 52%, transparent 80%)',
        'radial-gradient(ellipse at 52% 17%, rgba(255, 255, 255, 0.44) 0%, rgba(196, 162, 101, 0.10) 52%, transparent 80%)',
        'radial-gradient(ellipse at 50% 21%, rgba(255, 255, 255, 0.45) 0%, rgba(206, 222, 238, 0.14) 52%, transparent 80%)',
      ],
      sealFocusLight:
        'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.48) 0%, rgba(28, 44, 64, 0.22) 80%)',
      ambientVignette:
        'inset 0 0 46px rgba(34, 54, 76, 0.17), inset 0 0 14px rgba(34, 54, 76, 0.08)',
      innerRimBevel:
        'inset 0 1px 0 rgba(255, 255, 255, 0.85), inset 0 0 0 1px rgba(196, 162, 101, 0.32)',
      sweepGradient:
        'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.48) 50%, transparent 80%)',
      grainOpacity: 0.026,
    },
    'golden-rose': {
      keyLights: [
        'radial-gradient(ellipse at 50% 16%, rgba(255, 246, 220, 0.42) 0%, rgba(229, 184, 105, 0.14) 50%, transparent 80%)',
        'radial-gradient(ellipse at 48% 20%, rgba(255, 246, 220, 0.38) 0%, rgba(229, 184, 105, 0.12) 50%, transparent 80%)',
        'radial-gradient(ellipse at 52% 18%, rgba(255, 246, 220, 0.40) 0%, rgba(229, 184, 105, 0.13) 50%, transparent 80%)',
        'radial-gradient(ellipse at 50% 22%, rgba(255, 246, 220, 0.42) 0%, rgba(229, 184, 105, 0.14) 50%, transparent 80%)',
      ],
      sealFocusLight:
        'radial-gradient(circle at 50% 48%, rgba(255, 242, 200, 0.55) 0%, rgba(36, 18, 8, 0.32) 80%)',
      ambientVignette:
        'inset 0 0 48px rgba(58, 34, 16, 0.20), inset 0 0 14px rgba(58, 34, 16, 0.10)',
      innerRimBevel:
        'inset 0 0 0 1px rgba(201, 150, 72, 0.35), inset 0 1px 0 rgba(255, 248, 232, 0.65)',
      sweepGradient:
        'linear-gradient(110deg, transparent 20%, rgba(255, 242, 204, 0.46) 50%, transparent 80%)',
      grainOpacity: 0.028,
    },
  };

  const profile = profiles[themeId] || profiles.ivory;
  const activeKeyLight =
    stage === 'seal-interaction'
      ? profile.sealFocusLight
      : profile.keyLights[activeSection] || profile.keyLights[0];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none"
    >
      {/* 1. Stage-Reactive Directional Studio Key-Light */}
      <motion.div
        key={`light-${stage}-${activeSection}`}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isOpening ? 0.95 : 1 }}
        transition={{ duration: 0.85, ease: 'easeOut' }}
        style={{ background: activeKeyLight }}
        className="absolute inset-0 transition-all duration-700"
      />

      {/* 2. Fine Stationery Cotton/Velvet Micro-Surface Grain */}
      <div
        style={{
          opacity: profile.grainOpacity,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        className="absolute inset-0 mix-blend-overlay"
      />

      {/* 3. Physical Paper Edge Ambient Occlusion & Inner Rim Bevel */}
      <div
        style={{
          boxShadow: `${profile.ambientVignette}, ${profile.innerRimBevel}`,
        }}
        className="absolute inset-0 sm:rounded-[24px]"
      />

      {/* 4. Synchronized Specular Light Sweep on Opening Reveal & Section Change */}
      {!prefersReducedMotion && (
        <motion.div
          key={`sweep-${isRevealing ? 'open' : 'closed'}-${activeSection}`}
          initial={{ x: '-135%', opacity: 0 }}
          animate={
            isRevealing || isOpened
              ? { x: ['-125%', '145%'], opacity: [0, 0.82, 0] }
              : { x: '-135%', opacity: 0 }
          }
          transition={{
            duration: isOpened ? 1.65 : 2.25,
            delay: 0.04,
            ease: animationConfig.luxuryEasing,
          }}
          style={{ background: profile.sweepGradient }}
          className="absolute -inset-y-12 left-0 w-2/3"
        />
      )}
    </div>
  );
};
