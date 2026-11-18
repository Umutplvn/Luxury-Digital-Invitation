# Ses Dosyası Kurulumu (Audio Asset Setup)

Bu klasör, davetiyenin arka plan müziği olan **Michael Bublé — Feeling Good** parçası için ayrılmıştır.

## Kullanım Talimatı

1. Lisanslı ses dosyanızı **`feeling-good.mp3`** adıyla bu klasöre (`public/assets/audio/feeling-good.mp3`) yerleştirin.
2. Uygulama açılışta önce `/assets/audio/feeling-good.mp3` dosyasını kontrol eder.
3. Dosya mevcutsa otomatik olarak bu parçayı düşük ses seviyesinde başlatıp yumuşak bir geçişle (`fade-in`) yükseltir.
4. Dosya henüz eklenmemişse, uygulama kesintisiz çalışmaya devam etmek için yerleşik yedek piyano kaydını (`/assets/lacy/romantic-piano.mp3`) kullanır.
