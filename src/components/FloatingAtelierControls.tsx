import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw, ArrowLeft } from 'lucide-react';
import type { InvitationConfig } from '../config/invitationConfig';
import { LUXURY_THEMES, type LuxuryThemeSpec } from '../config/themeRegistry';

interface FloatingAtelierControlsProps {
  config: InvitationConfig;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isOpened: boolean;
  onReplayOpening: () => void;
  theme?: LuxuryThemeSpec;
  onBackToCollection?: () => void;
}

export const FloatingAtelierControls: React.FC<FloatingAtelierControlsProps> = ({
  config,
  isMusicPlaying,
  onToggleMusic,
  isOpened,
  onReplayOpening,
  theme = LUXURY_THEMES.ivory,
  onBackToCollection,
}) => {
  return (
    <>
      {onBackToCollection && (
        <div className="fixed left-3 top-3 sm:left-6 sm:top-5 z-50 flex items-center">
          <button
            type="button"
            onClick={onBackToCollection}
            aria-label="Back to Invitation Collection"
            title="Back to Invitation Collection"
            className={`${theme.nacreButtonClass} inline-flex items-center gap-1.5 px-3 py-1.5 font-lacy-serif text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] cursor-pointer`}
          >
            <ArrowLeft className="h-3 w-3" style={{ color: theme.accentDeepHex }} />
            <span>Collection</span>
          </button>
        </div>
      )}

      <div className="fixed right-3 top-3 sm:right-6 sm:top-5 z-50 flex items-center gap-1.5">
        <AnimatePresence>
          {isOpened && (
            <motion.button
              key="replay-btn"
              type="button"
              initial={{ opacity: 0, scale: 0.9, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -6 }}
              transition={{ duration: 0.35 }}
              onClick={onReplayOpening}
              aria-label="Replay invitation opening animation"
              title="Replay Invitation Opening"
              className={`${theme.nacreButtonClass} inline-flex items-center gap-1.5 px-3 py-1.5 font-lacy-serif text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] cursor-pointer`}
            >
              <RotateCcw className="h-3 w-3" style={{ color: theme.accentDeepHex }} />
              <span>Replay</span>
            </motion.button>
          )}
        </AnimatePresence>

        {config.audio.enabled && (
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'Mute background music' : 'Play background music'}
            aria-pressed={isMusicPlaying}
            title={
              isMusicPlaying
                ? `${config.audio.trackArtist} — ${config.audio.trackTitle} (Mute)`
                : `${config.audio.trackArtist} — ${config.audio.trackTitle} (Unmute)`
            }
            className={`${theme.nacreButtonClass} inline-flex items-center gap-1.5 px-3 py-1.5 font-lacy-serif text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] cursor-pointer`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="h-3 w-3" style={{ color: theme.accentDeepHex }} />
                <span>Music On</span>
                <span className="flex items-end gap-[2px] h-2.5" aria-hidden="true">
                  <motion.span
                    animate={{ height: ['35%', '100%', '45%'] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ backgroundColor: theme.accentDeepHex }}
                    className="w-[1.5px] rounded-full"
                  />
                  <motion.span
                    animate={{ height: ['90%', '35%', '100%'] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ backgroundColor: theme.accentDeepHex }}
                    className="w-[1.5px] rounded-full"
                  />
                  <motion.span
                    animate={{ height: ['45%', '85%', '30%'] }}
                    transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ backgroundColor: theme.accentDeepHex }}
                    className="w-[1.5px] rounded-full"
                  />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="h-3 w-3 opacity-75" style={{ color: theme.accentDeepHex }} />
                <span>Music Off</span>
              </>
            )}
          </button>
        )}
      </div>
    </>
  );
};

export const AtelierPreloader: React.FC<{
  isLoading: boolean;
  config: InvitationConfig;
  theme?: LuxuryThemeSpec;
}> = ({ isLoading, config, theme = LUXURY_THEMES.ivory }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="atelier-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{ backgroundColor: theme.preloaderBg }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center select-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <img
              src={theme.assets.sealCameo}
              alt=""
              aria-hidden="true"
              className="h-24 w-auto drop-shadow-[0_8px_18px_rgba(92,72,48,0.2)]"
            />
            <p
              style={{ color: theme.preloaderText }}
              className="mt-4 font-engraved text-[10px] uppercase tracking-[0.34em]"
            >
              {config.couple.partnerOne} &amp; {config.couple.partnerTwo}
            </p>
            <div
              style={{ backgroundColor: theme.preloaderTrack }}
              className="mt-3 h-[1.5px] w-28 overflow-hidden rounded-full"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full w-full bg-gradient-to-r ${theme.preloaderFill}`}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
