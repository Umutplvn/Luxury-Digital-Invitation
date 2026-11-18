import { animationConfig } from '../config/animationConfig';
import { invitationConfig } from '../config/invitationConfig';

/**
 * SHARED MULTI-THEME AUDIO ENGINE
 *
 * - Resolves each invitation's local song file (`primaryAudioUrl` in `/assets/audio/local-tracks/`)
 *   via HEAD check; if unavailable in a public environment without commercial sync rights,
 *   automatically falls back to the royalty-free instrumental composition (`fallbackAudioUrl`).
 * - Starts only after user interaction ("Tap to Open" / "Music On").
 * - Does not restart or duplicate audio during section transitions or Replay.
 * - Cleanly stops/switches audio when navigating between different invitations or back to the showcase.
 */
class LuxuryAmbientAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private fadeFrameId: number | null = null;
  private isPlaying = false;
  private currentPrimaryUrl: string = invitationConfig.audio.primaryAudioUrl;
  private currentFallbackUrl: string = invitationConfig.audio.fallbackAudioUrl;
  private resolvedUrlCache = new Map<string, string>();
  private isResolving = false;

  private clearFade(): void {
    if (this.fadeFrameId !== null) {
      window.cancelAnimationFrame(this.fadeFrameId);
      this.fadeFrameId = null;
    }
  }

  private fadeAudioTo(targetVol: number, durationMs: number, onComplete?: () => void): void {
    this.clearFade();
    const audio = this.audioElement;
    if (!audio) {
      onComplete?.();
      return;
    }

    const startVol = audio.volume;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / Math.max(1, durationMs));
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const nextVol = Math.max(0, Math.min(1, startVol + (targetVol - startVol) * eased));
      audio.volume = nextVol;

      if (progress < 1) {
        this.fadeFrameId = window.requestAnimationFrame(tick);
      } else {
        this.fadeFrameId = null;
        onComplete?.();
      }
    };

    this.fadeFrameId = window.requestAnimationFrame(tick);
  }

  private async resolveSourceUrl(primaryUrl: string, fallbackUrl: string): Promise<string> {
    if (this.resolvedUrlCache.has(primaryUrl)) {
      return this.resolvedUrlCache.get(primaryUrl)!;
    }

    try {
      const response = await fetch(primaryUrl, { method: 'HEAD' });
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (
        response.ok &&
        (contentType.includes('audio') ||
          contentType.includes('mpeg') ||
          contentType.includes('octet-stream'))
      ) {
        this.resolvedUrlCache.set(primaryUrl, primaryUrl);
        return primaryUrl;
      }
    } catch {
      // Fallback to licensed/royalty-free track if local file is absent
    }

    this.resolvedUrlCache.set(primaryUrl, fallbackUrl);
    return fallbackUrl;
  }

  public configureTrack(primaryUrl: string, fallbackUrl: string): void {
    if (
      this.currentPrimaryUrl === primaryUrl &&
      this.currentFallbackUrl === fallbackUrl
    ) {
      return;
    }

    this.currentPrimaryUrl = primaryUrl;
    this.currentFallbackUrl = fallbackUrl;

    if (this.audioElement) {
      this.clearFade();
      this.audioElement.pause();
      this.audioElement.src = '';
      this.audioElement = null;
      this.isPlaying = false;
    }
  }

  public start(primaryUrl?: string, fallbackUrl?: string): void {
    if (typeof window === 'undefined') return;

    if (primaryUrl && fallbackUrl) {
      this.configureTrack(primaryUrl, fallbackUrl);
    }

    if (this.isPlaying || this.isResolving) {
      return;
    }

    if (this.audioElement) {
      this.clearFade();
      this.isPlaying = true;
      this.audioElement
        .play()
        .then(() => {
          this.fadeAudioTo(
            animationConfig.musicTargetVolume,
            animationConfig.musicFadeInDurationMs
          );
        })
        .catch(() => {
          this.isPlaying = false;
        });
      return;
    }

    this.isResolving = true;
    const pUrl = this.currentPrimaryUrl;
    const fUrl = this.currentFallbackUrl;

    this.resolveSourceUrl(pUrl, fUrl)
      .then((src) => {
        this.isResolving = false;
        const audio = new Audio(src);

        audio.addEventListener(
          'loadedmetadata',
          () => {
            if (src.includes('feeling-good.mp3')) {
              audio.currentTime = 7;
            }
          },
          { once: true }
        );

        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = 0;

        audio.addEventListener(
          'error',
          () => {
            if (audio.src.indexOf(fUrl) === -1) {
              audio.src = fUrl;
              if (this.isPlaying) {
                audio.play().catch(() => {});
              }
            }
          },
          { once: true }
        );

        this.audioElement = audio;
        this.isPlaying = true;

        audio
          .play()
          .then(() => {
            this.fadeAudioTo(
              animationConfig.musicTargetVolume,
              animationConfig.musicFadeInDurationMs
            );
          })
          .catch(() => {
            this.isPlaying = false;
          });
      })
      .catch(() => {
        this.isResolving = false;
      });
  }

  public stop(): void {
    this.isPlaying = false;
    if (!this.audioElement) return;

    this.fadeAudioTo(0, animationConfig.musicFadeOutDurationMs, () => {
      if (!this.isPlaying && this.audioElement) {
        this.audioElement.pause();
      }
    });
  }

  public toggle(primaryUrl?: string, fallbackUrl?: string): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start(primaryUrl, fallbackUrl);
      return true;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new LuxuryAmbientAudioEngine();
