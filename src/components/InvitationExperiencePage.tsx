import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getInvitationConfigForTheme } from '../config/invitationConfig';
import { LUXURY_THEMES, type ThemeId } from '../config/themeRegistry';
import { animationConfig } from '../config/animationConfig';
import {
  InvitationSuiteDetails,
  type InvitationSectionIndex,
} from './InvitationSuiteDetails';
import {
  FloatingAtelierControls,
  AtelierPreloader,
} from './FloatingAtelierControls';
import { ambientAudio } from '../utils/ambientAudio';
import { CinematicLightingLayer } from './CinematicLightingLayer';
import type { OpeningStage } from './openings/types';
import { Variant01IvoryGatefold } from './openings/Variant01IvoryGatefold';
import { Variant02BlushEnvelopePullOut } from './openings/Variant02BlushEnvelopePullOut';
import { Variant03EmeraldBookReveal } from './openings/Variant03EmeraldBookReveal';
import { Variant04NoirSlidingCover } from './openings/Variant04NoirSlidingCover';
import { Variant05ChateauBlueTrifold } from './openings/Variant05ChateauBlueTrifold';
import { Variant06GoldenRoseEnvelope } from './openings/Variant06GoldenRoseEnvelope';

interface InvitationExperiencePageProps {
  themeId: ThemeId;
  onNavigateToCollection?: () => void;
}

export const InvitationExperiencePage: React.FC<InvitationExperiencePageProps> = ({
  themeId,
  onNavigateToCollection,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const theme = LUXURY_THEMES[themeId] || LUXURY_THEMES.ivory;
  const activeConfig = getInvitationConfigForTheme(theme.id);

  const [isLoading, setIsLoading] = useState(true);
  const [stage, setStage] = useState<OpeningStage>('closed');
  const [activeSection, setActiveSection] = useState<InvitationSectionIndex>(0);
  const [hasCompletedInitialStagger, setHasCompletedInitialStagger] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [userMutedManually, setUserMutedManually] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearStageTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setStage('closed');
    setActiveSection(0);
    setHasCompletedInitialStagger(false);
    clearStageTimers();

    if (typeof document !== 'undefined') {
      document.title = `${activeConfig.couple.partnerOne} & ${activeConfig.couple.partnerTwo} — ${activeConfig.venue.name} | ${theme.name}`;
    }

    ambientAudio.configureTrack(
      activeConfig.audio.primaryAudioUrl,
      activeConfig.audio.fallbackAudioUrl
    );
    setIsMusicPlaying(ambientAudio.getPlayingState());

    const criticalAssets = [
      theme.assets.innerCardBg,
      theme.assets.sealCameo,
      activeConfig.venue.illustrationUrl,
      ...(theme.id === 'ivory'
        ? [
            '/assets/lacy/poster-full.jpg',
            theme.assets.dateMedallion,
            theme.assets.dayTimePlaque,
            theme.assets.titlePlaque,
            theme.assets.venueArchFrame,
          ]
        : []),
    ];

    const preloadAssets = async () => {
      const imagePromises = criticalAssets.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            if (typeof img.decode === 'function') {
              img.decode().then(resolve).catch(resolve);
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      );

      const fontPromise =
        typeof document !== 'undefined' && document.fonts
          ? document.fonts.ready.catch(() => {})
          : Promise.resolve();

      const minWaitPromise = new Promise<void>((resolve) => {
        window.setTimeout(resolve, prefersReducedMotion ? 180 : 420);
      });

      await Promise.all([Promise.all(imagePromises), fontPromise, minWaitPromise]);

      if (isMounted) {
        setIsLoading(false);
      }
    };

    preloadAssets();

    return () => {
      isMounted = false;
      clearStageTimers();
    };
  }, [theme, activeConfig, prefersReducedMotion, clearStageTimers]);

  const handleStartInteriorReveal = useCallback(() => {
    setStage((current) => {
      if (current === 'revealing-interior' || current === 'opened') {
        return current;
      }
      return 'revealing-interior';
    });

    const tComplete = window.setTimeout(() => {
      setStage('opened');
    }, theme.timing.interiorRevealMs);

    timersRef.current.push(tComplete);
  }, [theme.timing.interiorRevealMs]);

  const handleOpeningComplete = useCallback(() => {
    const tFinal = window.setTimeout(() => {
      setStage('opened');
    }, 150);
    timersRef.current.push(tFinal);
  }, []);

  const handleTriggerOpen = () => {
    if (stage !== 'closed') return;

    clearStageTimers();

    if (
      activeConfig.audio.enabled &&
      activeConfig.audio.autoStartOnOpen &&
      !userMutedManually &&
      !ambientAudio.getPlayingState()
    ) {
      ambientAudio.start(
        activeConfig.audio.primaryAudioUrl,
        activeConfig.audio.fallbackAudioUrl
      );
      setIsMusicPlaying(true);
    }

    if (prefersReducedMotion) {
      setStage('revealing-interior');
      const t = window.setTimeout(() => {
        setStage('opened');
      }, 350);
      timersRef.current.push(t);
      return;
    }

    const {
      sealInteractionMs,
      unfasteningMs,
      openingDurationMs,
      interiorRevealMs,
    } = theme.timing;

    setStage('seal-interaction');

    const tUnfasten = window.setTimeout(() => {
      setStage('unfastening');
    }, sealInteractionMs);

    const tOpenDoors = window.setTimeout(() => {
      setStage('opening-doors');
    }, sealInteractionMs + unfasteningMs);

    const revealStartMs = sealInteractionMs + unfasteningMs + openingDurationMs;

    const tRevealInterior = window.setTimeout(() => {
      handleStartInteriorReveal();
    }, revealStartMs);

    const tOpened = window.setTimeout(() => {
      setStage('opened');
    }, revealStartMs + interiorRevealMs);

    timersRef.current.push(tUnfasten, tOpenDoors, tRevealInterior, tOpened);
  };

  const handleChangeSection = useCallback((nextSection: InvitationSectionIndex) => {
    setHasCompletedInitialStagger(true);
    setActiveSection(nextSection);
  }, []);

  const handleReplayOpening = useCallback(() => {
    clearStageTimers();
    setActiveSection(0);
    setHasCompletedInitialStagger(false);
    setStage('closed');
  }, [clearStageTimers]);

  const handleToggleMusic = () => {
    const nextState = ambientAudio.toggle(
      activeConfig.audio.primaryAudioUrl,
      activeConfig.audio.fallbackAudioUrl
    );
    setIsMusicPlaying(nextState);
    setUserMutedManually(!nextState);
  };

  const handleReturnToShowcase = useCallback(() => {
    ambientAudio.stop();
    setIsMusicPlaying(false);
    onNavigateToCollection?.();
  }, [onNavigateToCollection]);

  const renderThemeOpening = () => {
    const commonProps = {
      config: activeConfig,
      theme,
      stage,
      onTriggerOpen: handleTriggerOpen,
      onStartInteriorReveal: handleStartInteriorReveal,
      onOpeningComplete: handleOpeningComplete,
    };

    switch (theme.id) {
      case 'ivory':
        return <Variant01IvoryGatefold {...commonProps} />;
      case 'blush':
        return <Variant02BlushEnvelopePullOut {...commonProps} />;
      case 'emerald':
        return <Variant03EmeraldBookReveal {...commonProps} />;
      case 'noir':
        return <Variant04NoirSlidingCover {...commonProps} />;
      case 'chateau-blue':
        return <Variant05ChateauBlueTrifold {...commonProps} />;
      case 'golden-rose':
        return <Variant06GoldenRoseEnvelope {...commonProps} />;
    }
  };

  // Subtle Luxury Product Camera Choreography
  const cameraScale = prefersReducedMotion
    ? 1
    : stage === 'seal-interaction'
    ? 1.015
    : stage === 'unfastening'
    ? 1.008
    : 1;

  // Optical Depth-of-Field Interior Handoff
  const isInteriorEmerging =
    stage === 'opening-doors' ||
    stage === 'revealing-interior' ||
    stage === 'opened';

  return (
    <div
      style={{ backgroundColor: theme.studioBgColor }}
      className="fixed inset-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden text-[#5C4E40]"
    >
      {/* Studio Ambient Lighting */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: theme.studioRadialGradient }}
      />

      {/* Preloader */}
      <AtelierPreloader isLoading={isLoading} config={activeConfig} theme={theme} />

      {/* Floating Controls */}
      <FloatingAtelierControls
        config={activeConfig}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isOpened={stage === 'opened'}
        onReplayOpening={handleReplayOpening}
        theme={theme}
        onBackToCollection={onNavigateToCollection ? handleReturnToShowcase : undefined}
      />

      {/* Single Stationary Card Container with Subtle Product Camera Motion */}
      <motion.main
        animate={{ scale: cameraScale }}
        transition={{
          duration: stage === 'seal-interaction' ? 0.65 : 1.15,
          ease: animationConfig.luxuryEasing,
        }}
        style={{
          backgroundColor: theme.cardBgColor,
          boxShadow: theme.cardShadow.replace(/_/g, ' '),
        }}
        className="relative z-10 h-[100dvh] w-full max-w-[480px] sm:h-[min(94dvh,880px)] sm:aspect-[9/16] sm:rounded-[24px] overflow-hidden"
      >
        {/* Interior Card with Optical Depth-of-Field Emerge */}
        <motion.div
          animate={{
            scale: prefersReducedMotion || isInteriorEmerging ? 1 : 0.982,
            filter:
              prefersReducedMotion || stage === 'revealing-interior' || stage === 'opened'
                ? 'blur(0px) brightness(1)'
                : stage === 'opening-doors'
                ? 'blur(0.6px) brightness(0.98)'
                : 'blur(2px) brightness(0.93)',
          }}
          transition={{
            duration: 1.35,
            ease: animationConfig.luxuryEasing,
          }}
          className="relative h-full w-full"
        >
          <InvitationSuiteDetails
            config={activeConfig}
            isOpened={stage === 'opened'}
            activeSection={activeSection}
            hasCompletedInitialStagger={hasCompletedInitialStagger}
            onChangeSection={handleChangeSection}
            onReplayOpening={handleReplayOpening}
            theme={theme}
          />
        </motion.div>

        <CinematicLightingLayer
          themeId={theme.id}
          stage={stage}
          activeSection={activeSection}
        />

        {renderThemeOpening()}
      </motion.main>
    </div>
  );
};
