# Setup Aiagent

1. Install dependency dengan `npm install`.
2. Buat file `.env.local` dari `.env.example`.
3. Isi Supabase URL dan anon key.
4. Jalankan SQL di `supabase/schema.sql`.
5. Buat bucket storage bernama `uploads`.
6. Jalankan `npm run dev`.
7. Buka halaman `/settings` untuk melihat daftar provider key.

## Syarat generate

- Prompt motion: isi teks ide.
- Pollinations image: bisa tanpa key.
- Gemini: wajib `GEMINI_API_KEY` untuk mode production.
- Hugging Face: wajib `HUGGINGFACE_API_KEY`.
- Cloudflare: wajib account id dan token.
- ComfyUI: wajib server lokal aktif.