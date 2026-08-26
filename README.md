# Pusulabet — Şampiyonlar Ligi Kura Tahmini

Bu repo mevcut Pusulabet Telegram botuna eklenen Şampiyonlar Ligi kura tahmin modülünü ve Telegram Mini App arayüzünü içerir.

## Mini App

Varsayılan URL: `https://pusucore.github.io/pususlig/`

Mini App, Telegram WebApp `sendData()` ile tahmini doğrudan bota gönderir; ayrı bir public API veya arka planda çalışan ek servis gerektirmez.

Kurallar:
- Fenerbahçe için 8 rakip: her torbadan 2 takım.
- Galatasaray için 8 rakip: her torbadan 2 takım.
- Aynı ülke takımları birbirleriyle eşleşemez.
- Aynı ülkeden en fazla 2 rakip seçilebilir.
- Pusulabet kullanıcı adı zorunludur.
- Her Telegram hesabı bir kez katılabilir.

## Backoffice

Yeni bölüm: `/admin/sl-draw`

Buradan:
- etkinliği Aktif/Kapalı yapabilir,
- kayıtları ve Pusulabet kullanıcı adlarını görebilir,
- `.xlsx` veya `.csv` indirebilir,
- etkinlik kayıtlarını sıfırlayabilirsin.

ŞL etkinliği aktifken `/start` mevcut kanal kontrolünden sonra Mini App'e yönlendirir. Etkinlik kapatıldığında bot önceki PP/SS akışına geri döner.

## Eski Uyandırma Servisi

`wakeUp` / “Uyandırma Servisi” kodu ve backoffice menüsü kaldırıldı. Başka mevcut etkinlik akışlarına dokunulmadı.

## Kurulum

1. Mevcut `.env` dosyanı koru. Repoya `.env` yükleme.
2. Gerekirse `.env` içine ekle:
   `SL_MINI_APP_URL=https://pusucore.github.io/pususlig/`
3. `npm install`
4. `npm start`

Veritabanı migrasyonu ilk açılışta `sl_draw_submissions` tablosunu otomatik oluşturur.
