# Lacy Deluxe — Lüks Etkileşimli Dijital Düğün Davetiyesi (Geliştirici Kılavuzu)

Bu proje, **React**, **TypeScript**, **Vite**, **Tailwind CSS** ve **Framer Motion** kullanılarak geliştirilmiş, fiziksel bir lüks düğün davetiyesi hissiyatı sunan etkileşimli dijital davetiye uygulamasıdır.

---

## 1. Mimari Prensip: Tek Sabit Kart, Üç Animasyonlu Bölüm

Uygulama, geleneksel çok sayfalı veya aşağı kaydırılan bir web sitesi gibi değil, **tek bir sabit fiziksel davetiye kartı** olarak çalışır:

1. **Sabit Arka Plan (`inner-card-bg.webp`)**: Fildişi pamuklu kağıt dokusu, Chantilly dantel işlemeleri, inciler ve kabartma altın kemer çerçevesi tüm deneyim boyunca sabit kalır; kapaklar açıldıktan sonra veya bölümler arasında geçiş yapılırken **1 piksel bile hareket etmez**.
2. **İç Güvenli Alan (`Safe Area`)**: Tüm başlıklar, metinler ve etkileşim butonları kemer çerçevesinin iç güvenli alanında (`inset-x-[12%] top-[14.8%] bottom-[11.2%]`) konumlandırılır. Böylece hiçbir metin üst kemer kavislerine veya dantel kenarlara temas etmez.
3. **3 İçerik Bölümü (`InvitationSuiteDetails.tsx`)**:
   - **Bölüm 1 — The Wedding Invitation**: Çiftin isimleri (*Isabella & Alexander*), davet mesajı, aile isimleri, sedef tarih madalyonu (*Saturday, 19 June 2027 · 4:00 PM*) ve `Scroll Down ↓` butonu.
   - **Bölüm 2 — The Celebration**: 5 adımlı düğün programı akışı (*4:00 PM Wedding Ceremony* – *9:00 PM Evening Celebration*) ve `Scroll Down ↓` / `↑ Previous` gezinme butonları.
   - **Bölüm 3 — The Destination**: *Villa Balbiano, Lake Como, Italy* mimari illüstrasyonu, sedef konum çerçevesi, `Open in Google Maps` ve `Add to Calendar` (`.ics`) butonları ile kapanış mesajı.

---

## 2. İçerik Düzenleme (`src/config/invitationConfig.ts`)

Davetiyedeki tüm İngilizce metinler, tarih/saat bilgileri, düğün programı ve Google Haritalar bağlantısı tek bir dosyadan yönetilir:

- **Dosya Yolu**: `src/config/invitationConfig.ts`
- `couple`: Gelin ve damat isimleri, aile soyadları
- `date`: Tarih, gün, saat ve `.ics` takvim etkinliği için ISO zaman damgaları
- `venue`: Mekân adı, şehir/ülke, açık adres ve `mapUrl`
- `sections.celebration.items`: Düğün programı saatleri ve başlıkları
- `sections.closing`: Kapanış davet mesajı

---

## 3. Animasyon Zamanlamalarını Ayarlama (`src/config/animationConfig.ts`)

Tüm açılış ve geçiş süreleri `src/config/animationConfig.ts` dosyasında merkezîleştirilmiştir:

| Parametre | Varsayılan | Açıklama |
| :--- | :--- | :--- |
| `sealInteractionDurationMs` | `700` ms | Mühür basılma ve sedef ışıltı süresi (~0.7s) |
| `unfasteningDurationMs` | `500` ms | Mührün ilk çözülme süresi (~0.5s) |
| `gatefoldOpeningDurationMs` | `3250` ms | Çift kapaklı dantel kapıların açılma süresi (~3.25s) |
| `videoPlaybackRate` | `0.86` | Açılış videosunun oynatma hızı çarpanı |
| `interiorRevealDurationMs` | `1000` ms | İç davetiye kartının netleşme süresi (~1.0s) |
| `initialTextRevealDelaySec` | `0.15` s | İç kart sabitlendikten sonra ilk metnin başlama gecikmesi |
| `textFadeInDurationSec` | `1.35` s | Metinlerin kağıt yüzeyinden belirme süresi |
| `textFadeOutDurationSec` | `0.95` s | Bölüm geçişinde çıkan metnin solma süresi |
| `contentSlideEnterY` | `55` px | Yeni bölümün aşağıdan yukarı giriş mesafesi |
| `contentSlideExitY` | `-65` px | Mevcut bölümün yukarı kayarak çıkış mesafesi |
| `sectionTransitionDurationSec` | `1.2` s | Bölümler arası yukarı akış süresi |
| `musicFadeInDurationMs` | `3000` ms | Müziğin açılışta yumuşak yükselme süresi |
| `musicTargetVolume` | `0.16` | Müziğin hedef ses seviyesi |

---

## 4. Arka Plan Müziği Kurulumu (`Michael Bublé — Feeling Good`)

1. Lisanslı **Michael Bublé — Feeling Good** ses dosyanızı aşağıdaki yola yerleştirin:
   ```text
   public/assets/audio/feeling-good.mp3
   ```
2. Uygulama (`src/utils/ambientAudio.ts`), ziyaretçi davetiyeyi açmak için dokunduğunda önce `/assets/audio/feeling-good.mp3` dosyasını kontrol eder.
3. Dosya mevcutsa düşük ses seviyesinden başlayarak yumuşakça (`fade-in`) çalmaya başlar ve bölümler arasında kesintisiz devam eder.
4. Dosya henüz eklenmemişse, uygulama otomatik olarak yerleşik enstrümantal piyano kaydını (`/assets/lacy/romantic-piano.mp3`) yedek olarak kullanır.

---

## 5. Yerel Geliştirme ve Derleme Komutları

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# TypeScript kontrolü ve üretim (production) derlemesi
npm run build

# Kod kalitesi (linter) kontrolü
npm run lint
```
