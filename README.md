# Cipher Tools — Privacy Policy

Google Play ve App Store icin barindirilan gizlilik politikasi sayfasi.

Yayin: https://apps.devruler.com/cipher-tools-lab/privacy/

## Depo yapisi

- `site/` — sunucuya cikan statik icerik. Klasor yapisi URL yapisiyla birebir
  ayni: `site/cipher-tools-lab/privacy/index.html` dosyasi
  `apps.devruler.com/cipher-tools-lab/privacy/` adresinden yayinlanir.
  Baska bir uygulamanin sayfasi eklenecekse `site/` altina yeni bir klasor
  acmak yeterli.
- `index.html` — eski GitHub Pages adresindeki yonlendirme sayfasi.
  https://kubraondes.github.io/cipher-tools-privacy/ adresini yeni URL'e tasir.
  Yayindaki eski uygulama surumleri hala bu adresi actigi icin silinmemeli.

## Yayin

Sunucu: 45.87.120.58, Coolify uzerinden. Statik site olarak bu depodan
deploy edilir, publish directory `site` olarak ayarlanir. Domain Coolify'da
`apps.devruler.com` olarak tanimlidir; SSL sertifikasi Traefik tarafindan
otomatik alinir ve yenilenir.

DNS: Hostinger'daki devruler.com zone'unda `apps` icin A kaydi
45.87.120.58 adresini gosterir.

## Metin guncelleme

Kaynak metin uygulamanin `lib/l10n/app_*.arb` dosyalarindan uretilir
(`tool/gen_privacy_page.py`). Metni degistirmek icin once uygulamadaki
ceviriyi guncelleyin, sonra sayfayi yeniden uretip
`site/cipher-tools-lab/privacy/index.html` uzerine kopyalayin ve push edin.
