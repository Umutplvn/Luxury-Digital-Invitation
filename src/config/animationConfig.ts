/**
 * MERKEZİ ANİMASYON YAPILANDIRMASI (Central Animation Configuration)
 *
 * Davetiye açılış koreografisi, iç kart belirişi, metinlerin kağıt yüzeyinden
 * kademeli çıkışı, bölümler arası yukarı kayma geçişleri ve müzik ses geçiş
 * süreleri bu dosyadan tek merkezden yönetilir.
 */

export interface AnimationConfig {
  /** 1. Aşama: Mühür basılma ve sedef ışıltı süresi (ms) — önerilen ~700ms (0.7s) */
  sealInteractionDurationMs: number;

  /** 2. Aşama: Mührün ilk çözülme ve orta birleşim yerinin ayrılma süresi (ms) — önerilen ~500ms (0.5s) */
  unfasteningDurationMs: number;

  /** 3. Aşama: Fransız çift kapaklı (gatefold) dantel kapıların açılma süresi (ms) — önerilen ~3250ms (3.25s) */
  gatefoldOpeningDurationMs: number;

  /** Açılış videosunun oynatma hızı çarpanı (4.03s videonun ~3.75s kapı açılışına denk gelmesi için) */
  videoPlaybackRate: number;

  /** 4. Aşama: Kapılar açıldıktan sonra iç davetiyenin netleşme/belirme süresi (ms) — önerilen ~1000ms (1.0s) */
  interiorRevealDurationMs: number;

  /** 5. Aşama: İç kart tamamen sabitlendikten sonra ilk metnin belirmeye başlama gecikmesi (saniye) */
  initialTextRevealDelaySec: number;

  /** İlk açılışta metinlerin kağıt yüzeyinden kademeli belirme süresi (saniye) */
  textFadeInDurationSec: number;

  /** Metinlerin çıkış/solma süresi (saniye) */
  textFadeOutDurationSec: number;

  /** İlk ekrandaki (Bölüm 1) satırların kademeli (stagger) gecikme süreleri (saniye) */
  initialStaggerSec: {
    heading: number;
    brooch: number;
    partnerOne: number;
    conjunction: number;
    partnerTwo: number;
    topRule: number;
    message: number;
    bottomRule: number;
    families: number;
    dateMedallion: number;
    ceremonyTime: number;
    scrollPrompt: number;
  };

  /** Bölümler arası geçişte yeni gelen içeriğin başlangıç dikey mesafesi (px) */
  contentSlideEnterY: number;

  /** Bölümler arası geçişte çıkan içeriğin yukarı kayma mesafesi (px) */
  contentSlideExitY: number;

  /** Bölümler arası geçişte uygulanan hafif bulanıklık değeri (px) */
  contentTransitionBlurPx: number;

  /** Bölümler arası yukarı kayma ve saydamlık geçiş süresi (saniye) */
  sectionTransitionDurationSec: number;

  /** Geçiş sırasında tekrarlı tıklamaları engelleyen kilit süresi (ms) */
  sectionTransitionLockMs: number;

  /** Lüks ve doğal hareketler için kullanılan cubic-bezier eğrisi */
  luxuryEasing: [number, number, number, number];

  /** Arka plan müziğinin açılışta yumuşak yükselme (fade-in) süresi (ms) */
  musicFadeInDurationMs: number;

  /** Arka plan müziğinin susturulurken yumuşak kısılma (fade-out) süresi (ms) */
  musicFadeOutDurationMs: number;

  /** Arka plan müziğinin hedef ses seviyesi (0.0 - 1.0 arası, düşük ve zarif) */
  musicTargetVolume: number;
}

/**
 * Varsayılan lüks animasyon zamanlamaları.
 * Tüm bileşenler (App, InteractiveGatefoldEnvelope, InvitationSuiteDetails, ambientAudio)
 * bu değerleri referans alır.
 */
export const animationConfig: AnimationConfig = {
  // 1. Mühür etkileşimi: 0.7 saniye
  sealInteractionDurationMs: 700,

  // 2. İlk çözülme: 0.5 saniye
  unfasteningDurationMs: 500,

  // 3. Çift kapaklı dantel kapıların açılması: 3.25 saniye (3–3.5s aralığında)
  gatefoldOpeningDurationMs: 3250,

  // 4.03 saniyelik 1080p videoyu 0.5s çözülme + 3.25s kapı açılışı (~3.75s) ile eşleştiren hız
  videoPlaybackRate: 0.86,

  // 4. İç davetiyenin tamamen görünür hâle gelmesi: 1.0 saniye
  interiorRevealDurationMs: 1000,

  // 5. İç kart tamamen sabitlendikten sonra metinlerin belirmeye başlama gecikmesi
  initialTextRevealDelaySec: 0.15,

  // Metinlerin kağıt yüzeyinden yumuşakça yüzeye çıkma süresi
  textFadeInDurationSec: 1.35,

  // Metinlerin yumuşakça kaybolma süresi
  textFadeOutDurationSec: 0.95,

  // Bölüm 1 (The Wedding Invitation) kademeli metin çıkış sırası:
  // 1. Başlık -> 2. Çiftin İsimleri -> 3. Davet Mesajı -> 4. Düğün Tarihi -> 5. Tören Saati
  initialStaggerSec: {
    heading: 0.15,
    brooch: 0.42,
    partnerOne: 0.82,
    conjunction: 1.18,
    partnerTwo: 1.48,
    topRule: 1.92,
    message: 2.18,
    bottomRule: 2.58,
    families: 2.82,
    dateMedallion: 3.18,
    ceremonyTime: 3.55,
    scrollPrompt: 3.95,
  },

  // Bölümler arası yukarı doğru akış mesafeleri ve süresi
  contentSlideEnterY: 55,
  contentSlideExitY: -65,
  contentTransitionBlurPx: 2,
  sectionTransitionDurationSec: 1.2,
  sectionTransitionLockMs: 1150,

  // Zarif ve sinematik cubic-bezier eğrisi
  luxuryEasing: [0.22, 1, 0.36, 1],

  // Ses geçiş ayarları
  musicFadeInDurationMs: 3000,
  musicFadeOutDurationMs: 750,
  musicTargetVolume: 0.16,
};
