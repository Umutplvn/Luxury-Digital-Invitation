import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import type { InvitationConfig } from '../config/invitationConfig';

interface FloatingAtelierControlsProps {
  config: InvitationConfig;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  isOpened: boolean;
  onReplayOpening: () => void;
}

/**
 * Sağ üst köşede yer alan zarif ses açma/kapatma (Mute/Unmute) ve
 * davetiye açılışını tekrar oynatma (Replay) kontrol çubuğu.
 */
export const FloatingAtelierControls: React.FC<FloatingAtelierControlsProps> = ({
  config,
  isMusicPlaying,
  onToggleMusic,
  isOpened,
  onReplayOpening,
}) => {
  return (
    <div className="fixed right-3 top-3 sm:right-6 sm:top-5 z-50 flex items-center gap-1.5">
      {/* Açılış tamamlandıktan sonra görünen "Replay" butonu */}
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
            className="lacy-nacre-button inline-flex items-center gap-1.5 px-3 py-1.5 font-lacy-serif text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#5E4F3E] cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-[#8F6B42]" />
            <span>Replay</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Arka plan müziği açma/kapatma kontrolü */}
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
          className="lacy-nacre-button inline-flex items-center gap-1.5 px-3 py-1.5 font-lacy-serif text-[9.5px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-[#5E4F3E] cursor-pointer"
        >
          {isMusicPlaying ? (
            <>
              <Volume2 className="h-3 w-3 text-[#8F6B42]" />
              <span>Music On</span>
              <span className="flex items-end gap-[2px] h-2.5" aria-hidden="true">
                <motion.span
                  animate={{ height: ['35%', '100%', '45%'] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[1.5px] bg-[#8F6B42] rounded-full"
                />
                <motion.span
                  animate={{ height: ['90%', '35%', '100%'] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[1.5px] bg-[#8F6B42] rounded-full"
                />
                <motion.span
                  animate={{ height: ['45%', '85%', '30%'] }}
                  transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[1.5px] bg-[#8F6B42] rounded-full"
                />
              </span>
            </>
          ) : (
            <>
              <VolumeX className="h-3 w-3 text-[#8C7965]" />
              <span>Music Off</span>
            </>
          )}
        </button>
      )}
    </div>
  );
};

/**
 * Sayfa ilk yüklendiğinde görsellerin ve yazı tiplerinin hazır olmasını
 * beklerken gösterilen zarif açılış perdesi (Preloader).
 */
export const AtelierPreloader: React.FC<{
  isLoading: boolean;
  config: InvitationConfig;
}> = ({ isLoading, config }) => {
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#EFEAE3] px-6 text-center select-none"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <img
              src="/assets/lacy/seal-cameo.png"
              alt=""
              aria-hidden="true"
              className="h-24 w-auto drop-shadow-[0_8px_18px_rgba(92,72,48,0.2)]"
            />
            <p className="mt-4 font-engraved text-[10px] uppercase tracking-[0.34em] text-[#7D6340]">
              {config.couple.partnerOne} &amp; {config.couple.partnerTwo}
            </p>
            <div className="mt-3 h-[1.5px] w-28 overflow-hidden rounded-full bg-[#D9CEC5]">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full bg-gradient-to-r from-[#D8C5A8] via-[#8F6B42] to-[#D8C5A8]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
