import { animationConfig } from '../config/animationConfig';
import { invitationConfig } from '../config/invitationConfig';

/**
 * MERKEZİ SES YÖNETİCİSİ (Shared Audio Controller)
 *
 * - Birincil olarak `public/assets/audio/feeling-good.mp3` (Michael Bublé — Feeling Good)
 *   dosyasını kontrol eder ve mevcutsa oynatır.
 * - Lisanslı ses dosyası henüz eklenmemişse otomatik olarak yerleşik enstrümantal
 *   piyano kaydına (`/assets/lacy/romantic-piano.mp3`) geçiş yapar.
 * - Yalnızca kullanıcı etkileşiminden ("Tap to Open") sonra başlar.
 * - Bölümler arası geçişlerde veya davetiye tekrar oynatıldığında (Replay)
 *   kesilmez ve birden fazla ses örneği (instance) oluşturmaz.
 */
class LuxuryAmbientAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private fadeFrameId: number | null = null;
  private isPlaying = false;
  private resolvedAudioSrc: string | null = null;
  private isResolving = false;

  /**
   * Devam eden ses seviyesi geçiş (fade) animasyonunu temizler.
   */
  private clearFade(): void {
    if (this.fadeFrameId !== null) {
      window.cancelAnimationFrame(this.fadeFrameId);
      this.fadeFrameId = null;
    }
  }

  /**
   * Ses seviyesini mevcut değerinden hedef değere yumuşak bir eğriyle (ease-in-out) taşır.
   */
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

  /**
   * Birincil ses dosyasının (`feeling-good.mp3`) sunucuda gerçek bir ses dosyası olarak
   * bulunup bulunmadığını kontrol eder; yoksa yedek ses dosyasını döndürür.
   */
  private async resolveSourceUrl(): Promise<string> {
    if (this.resolvedAudioSrc) {
      return this.resolvedAudioSrc;
    }

    const primaryUrl = invitationConfig.audio.primaryAudioUrl;
    const fallbackUrl = invitationConfig.audio.fallbackAudioUrl;

    try {
      const response = await fetch(primaryUrl, { method: 'HEAD' });
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (
        response.ok &&
        (contentType.includes('audio') ||
          contentType.includes('mpeg') ||
          contentType.includes('octet-stream'))
      ) {
        this.resolvedAudioSrc = primaryUrl;
        return primaryUrl;
      }
    } catch {
      // Birincil dosya erişilemezse yedek parçaya geç
    }

    this.resolvedAudioSrc = fallbackUrl;
    return fallbackUrl;
  }

  /**
   * Müziği düşük ses seviyesinden başlatarak yumuşakça hedef seviyeye yükseltir.
   * Zaten çalıyorsa tekrar başlatmaz (çift ses oluşumunu engeller).
   */
  public start(): void {
    if (this.isPlaying || this.isResolving || typeof window === 'undefined') {
      return;
    }

    // Daha önce oluşturulmuş ses öğesi varsa doğrudan devam ettir
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
    this.resolveSourceUrl()
      .then((src) => {
        this.isResolving = false;
        const audio = new Audio(src);
     
        audio.addEventListener(
  'loadedmetadata',
  () => {
    if (src === invitationConfig.audio.primaryAudioUrl) {
      audio.currentTime = 7;
    }
  },
  { once: true }
);
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = 0;

        // Birincil dosya yüklenirken hata oluşursa yedek dosyaya geç
        audio.addEventListener(
          'error',
          () => {
            if (audio.src.indexOf(invitationConfig.audio.fallbackAudioUrl) === -1) {
              audio.src = invitationConfig.audio.fallbackAudioUrl;
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

  /**
   * Müziği yumuşak bir geçişle (fade-out) kısar ve duraklatır.
   */
  public stop(): void {
    this.isPlaying = false;
    if (!this.audioElement) return;

    this.fadeAudioTo(0, animationConfig.musicFadeOutDurationMs, () => {
      if (!this.isPlaying && this.audioElement) {
        this.audioElement.pause();
      }
    });
  }

  /**
   * Ses durumunu açar veya kapatır; yeni durumu boolean olarak döndürür.
   */
  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  /**
   * Müziğin şu anda aktif olarak çalıp çalmadığını döndürür.
   */
  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const ambientAudio = new LuxuryAmbientAudioEngine();
