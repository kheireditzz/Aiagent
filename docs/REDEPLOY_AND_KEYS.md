# Redeploy dan API Key

## Cara redeploy di Vercel

1. Buka Vercel Dashboard.
2. Pilih project Aiagent.
3. Masuk ke tab Deployments.
4. Pilih deployment terbaru.
5. Klik Redeploy.

Jika repo GitHub sudah tersambung ke Vercel, setiap push baru ke branch main akan trigger deploy otomatis.

## Tempat mengisi API key di Vercel

1. Buka Vercel Dashboard.
2. Pilih project Aiagent.
3. Masuk ke Settings.
4. Pilih Environment Variables.
5. Tambahkan variable berikut:

NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
GEMINI_API_KEY
GEMINI_API_KEYS
HUGGINGFACE_API_KEY
HUGGINGFACE_API_KEYS
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
CLOUDFLARE_API_KEYS
COMFYUI_BASE_URL

Setelah menambah atau mengubah env, lakukan redeploy supaya key terbaca oleh aplikasi.

## Tempat melihat key asalnya

### Supabase
Project Settings > API

Ambil:
- Project URL
- anon public key

### Gemini
Google AI Studio > API keys

Ambil:
- Gemini API key

### Hugging Face
Hugging Face > Settings > Access Tokens

Ambil:
- token akses

### Cloudflare
Cloudflare Dashboard > My Profile > API Tokens

Ambil:
- API token

Cloudflare account id ada di dashboard akun atau Workers overview.

### ComfyUI
Jika lokal, pakai URL default:
COMFYUI_BASE_URL=http://127.0.0.1:8188

Untuk deploy online, ComfyUI lokal tidak bisa dipakai langsung kecuali server ComfyUI kamu bisa diakses publik.

## API key di dalam app

Halaman /settings disiapkan sebagai UI input key milik user. Untuk production, lebih aman simpan key server di Vercel Environment Variables.

## Catatan keamanan

Jangan taruh API key asli di GitHub public repo.
Jangan tulis key di file source code.
Gunakan Vercel Environment Variables untuk production.