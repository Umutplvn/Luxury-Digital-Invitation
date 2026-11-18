import { useState, useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from 'framer-motion';
import { invitationConfig } from './config/invitationConfig';
import { animationConfig } from './config/animationConfig';
import {
  InteractiveGatefoldEnvelope,
  type OpeningStage,
} from './components/InteractiveGatefoldEnvelope';
import {
  InvitationSuiteDetails,
  type InvitationSectionIndex,
} from './components/InvitationSuiteDetails';
import {
  FloatingAtelierControls,
  AtelierPreloader,
} from './components/FloatingAtelierControls';
import { ambientAudio } from './utils/ambientAudio';

/**
 * Açılışta arka plan sıçramasını ve geç yüklenmeyi önlemek için
 * önceden belleğe (decode) alınacak kritik görsellerin listesi.
 */
const CRITICAL_IMAGE_ASSETS = [
  '/assets/lacy/poster-full.jpg',
  '/assets/lacy/inner-card-bg.webp',
  '/assets/lacy/seal-cameo.png',
  '/assets/lacy/date-medallion.webp',
  '/assets/lacy/day-time-plaque.webp',
  '/assets/lacy/title-plaque.webp',
  '/assets/lacy/venue-arch-frame.webp',
  '/assets/lacy/villa-balbiano-como.jpg',
];

/**
 * ANA UYGULAMA BİLEŞENİ (Root Invitation Application)
 *
 * Tek bir sabit davetiye kartı (Stationary Card) mimarisi kullanır:
 * - Kapalı dantel kapaklar (InteractiveGatefoldEnvelope) ve iç davetiye (InvitationSuiteDetails)
 *   birebir aynı boyut ve konumdaki kart kapsayıcısı içinde yer alır.
 * - Doğal sayfa kaydırması (native scroll) tamamen kapalıdır; böylece kaydırma çubuğu
 *   görünüp kaybolmaz ve arka plan asla yerinden oynamaz.
 */
export function App() {
  const prefersReducedMotion = useReducedMotion();

  // Görsel ve font ön yükleme durumu
  const [isLoading, setIsLoading] = useState(true);

  // Davetiyenin açılış aşaması
  const [stage, setStage] = useState<OpeningStage>('closed');

  // Sabit kart içindeki aktif bölüm (0: Invitation, 1: Celebration, 2: Destination, 3: Countdown)
  const [activeSection, setActiveSection] = useState<InvitationSectionIndex>(0);

  // İlk açılıştaki kademeli metin belirişinin tamamlanıp tamamlanmadığı
  const [hasCompletedInitialStagger, setHasCompletedInitialStagger] = useState(false);

  // Arka plan müziği çalma durumu ve kullanıcının manuel susturma tercihi
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [userMutedManually, setUserMutedManually] = useState(false);

  // Aktif animasyon zamanlayıcılarının referans listesi
  const timersRef = useRef<number[]>([]);

  /**
   * Bekleyen tüm aşama zamanlayıcılarını temizler.
   */
  const clearStageTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  /**
   * İlk yüklemede kritik görselleri ve web yazı tiplerini belleğe hazırlar;
   * böylece kapılar açıldığında görsel yeniden yükleme veya kayma yaşanmaz.
   */
  useEffect(() => {
    let isMounted = true;

    const preloadAssets = async () => {
      const imagePromises = CRITICAL_IMAGE_ASSETS.map(
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
        window.setTimeout(resolve, prefersReducedMotion ? 250 : 650);
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
  }, [prefersReducedMotion, clearStageTimers]);

  /**
   * Kapılar tamamen açıldığında iç kart geçişini ('revealing-interior') başlatır
   * ve `interiorRevealDurationMs` (1.0s) sonunda metinlerin belirmesini sağlar.
   */
  const handleStartInteriorReveal = useCallback(() => {
    setStage((current) => {
      if (current === 'revealing-interior' || current === 'opened') {
        return current;
      }
      return 'revealing-interior';
    });

    const tComplete = window.setTimeout(() => {
      setStage('opened');
    }, animationConfig.interiorRevealDurationMs);

    timersRef.current.push(tComplete);
  }, []);

  /**
   * Video sona erdiğinde açılışın tamamlandığını garanti altına alır.
   */
  const handleOpeningComplete = useCallback(() => {
    const tFinal = window.setTimeout(() => {
      setStage('opened');
    }, 150);
    timersRef.current.push(tFinal);
  }, []);

  /**
   * Davetiyenin açılış animasyonunu başlatır.
   *
   * 1. Önce 0.7s mühür basılma ve ışıltı animasyonunu çalıştırır.
   * 2. Ardından 0.5s ilk çözülme ve ~3.25s kapakların açılmasını sağlar.
   * 3. İç kart 1.0s boyunca tamamen görünür ve sabit hâle geldikten sonra
   *    davetiye yazılarını görünür hâle getirir.
   */
  const handleTriggerOpen = () => {
    // Davetiye zaten açılıyorsa işlemi tekrar başlatma.
    if (stage !== 'closed') return;

    // Önceki animasyon zamanlayıcılarını temizle.
    clearStageTimers();

    // Kullanıcı etkileşimiyle birlikte arka plan müziğini başlat.
    if (
      invitationConfig.audio.enabled &&
      invitationConfig.audio.autoStartOnOpen &&
      !userMutedManually &&
      !ambientAudio.getPlayingState()
    ) {
      ambientAudio.start();
      setIsMusicPlaying(true);
    }

    // Azaltılmış hareket (reduced motion) tercihi varsa doğrudan yumuşak geçiş yap.
    if (prefersReducedMotion) {
      setStage('revealing-interior');
      const t = window.setTimeout(() => {
        setStage('opened');
      }, 350);
      timersRef.current.push(t);
      return;
    }

    const {
      sealInteractionDurationMs,
      unfasteningDurationMs,
      gatefoldOpeningDurationMs,
      interiorRevealDurationMs,
    } = animationConfig;

    // 1. Aşama: Mühür basılma ve sedef ışıltı (~0.7s)
    setStage('seal-interaction');

    // 2. Aşama: İlk çözülme (~0.5s)
    const tUnfasten = window.setTimeout(() => {
      setStage('unfastening');
    }, sealInteractionDurationMs);

    // 3. Aşama: Çift kapaklı dantel kapıların yavaşça açılması (~3.25s)
    const tOpenDoors = window.setTimeout(() => {
      setStage('opening-doors');
    }, sealInteractionDurationMs + unfasteningDurationMs);

    // 4. Aşama: Güvenlik zamanlayıcısı — video olayı daha erken tetiklenmezse iç kart belirişine geç (~1.0s)
    const revealStartMs =
      sealInteractionDurationMs + unfasteningDurationMs + gatefoldOpeningDurationMs;

    const tRevealInterior = window.setTimeout(() => {
      handleStartInteriorReveal();
    }, revealStartMs);

    // 5. Aşama: İç kart tamamen sabitlendikten sonra metinlerin belirmeye başlaması
    const tOpened = window.setTimeout(() => {
      setStage('opened');
    }, revealStartMs + interiorRevealDurationMs);

    timersRef.current.push(tUnfasten, tOpenDoors, tRevealInterior, tOpened);
  };

  /**
   * Bölümler arası geçişi günceller ve ilk kademeli açılış modunu tamamlandı olarak işaretler.
   */
  const handleChangeSection = useCallback((nextSection: InvitationSectionIndex) => {
    setHasCompletedInitialStagger(true);
    setActiveSection(nextSection);
  }, []);

  /**
   * Davetiyeyi tekrar kapalı zarf durumuna döndürür ve 1. bölüme sıfırlar (Replay).
   * Arka plan müziği çalmaya devam eder; yeni ses örneği oluşturulmaz.
   */
  const handleReplayOpening = useCallback(() => {
    clearStageTimers();
    setActiveSection(0);
    setHasCompletedInitialStagger(false);
    setStage('closed');
  }, [clearStageTimers]);

  /**
   * Arka plan müziğini yumuşak geçişle açar veya kapatır (Mute/Unmute).
   */
  const handleToggleMusic = () => {
    const nextState = ambientAudio.toggle();
    setIsMusicPlaying(nextState);
    setUserMutedManually(!nextState);
  };

  return (
    <div className="fixed inset-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-[#D9CEC5] text-[#5C4E40]">
      {/* Masaüstü görünüm için yumuşak ipek ve taş dokulu stüdyo arka plan aydınlatması */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(247, 242, 234, 0.85) 0%, rgba(227, 217, 204, 0.75) 55%, rgba(208, 195, 180, 0.95) 100%)',
        }}
      />

      {/* İlk yükleme perdesi */}
      <AtelierPreloader isLoading={isLoading} config={invitationConfig} />

      {/* Sağ üst köşedeki ses ve tekrar oynatma kontrolleri */}
      <FloatingAtelierControls
        config={invitationConfig}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        isOpened={stage === 'opened'}
        onReplayOpening={handleReplayOpening}
      />

      {/* ====================================================================
          TEK SABİT DAVETİYE KARTI KAPSAYICISI (Single Stationary Card Container)
          Hem açılan kapaklar hem de iç davetiye bölümleri bu sabit kapsayıcıyı paylaşır.
          Böylece kapılar açıldığında veya bölümler değiştiğinde kart boyutu,
          konumu, dantel çerçevesi ve kağıt dokusu 1 piksel bile hareket etmez.
         ==================================================================== */}
      <main className="relative z-10 h-[100dvh] w-full max-w-[480px] sm:h-[min(94dvh,880px)] sm:aspect-[9/16] sm:rounded-[24px] overflow-hidden bg-[#EFEAE3] shadow-[0_32px_90px_-12px_rgba(58,44,30,0.38),0_12px_28px_-6px_rgba(58,44,30,0.22)]">
        {/* Sabit İç Davetiye Kartı ve 4 Animasyonlu İçerik Bölümü */}
        <InvitationSuiteDetails
          config={invitationConfig}
          isOpened={stage === 'opened'}
          activeSection={activeSection}
          hasCompletedInitialStagger={hasCompletedInitialStagger}
          onChangeSection={handleChangeSection}
          onReplayOpening={handleReplayOpening}
        />

        {/* Yavaş ve Sinematik Çift Kapaklı Dantel Açılış Katmanı */}
        <InteractiveGatefoldEnvelope
          config={invitationConfig}
          stage={stage}
          onTriggerOpen={handleTriggerOpen}
          onStartInteriorReveal={handleStartInteriorReveal}
          onOpeningComplete={handleOpeningComplete}
        />
      </main>
    </div>
  );
}

export default App;
