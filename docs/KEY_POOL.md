# API Key Pool

Sistem ini mendukung banyak API key per provider memakai environment variable.

## Format

Gunakan koma untuk memisahkan key.

GEMINI_API_KEYS=key1,key2,key3
HUGGINGFACE_API_KEYS=key1,key2
CLOUDFLARE_API_KEYS=key1,key2

## Endpoint status

GET /api/keys/status

Response menampilkan total key, key aktif, key cooldown, dan jumlah pemakaian sementara.

## Cara kerja aman

- Sistem memilih key aktif.
- Jika satu key mencapai limit, tandai cooldown sampai waktu reset.
- Sistem memakai key lain yang masih aktif.
- Setelah waktu reset lewat, key bisa dipakai lagi.

## Batasan penting

Sistem ini tidak membuat limit menjadi unlimited.
Sistem ini tidak membuat key baru otomatis.
Sistem ini tidak menghindari aturan provider.
Untuk kapasitas besar, gunakan plan resmi atau beberapa provider dengan aturan yang jelas.

## Provider fallback

Urutan yang disarankan:

1. Gemini untuk prompt motion.
2. Pollinations untuk image gratis.
3. Hugging Face untuk backup image.
4. Cloudflare Workers AI untuk backend tambahan.
5. ComfyUI lokal untuk server sendiri.