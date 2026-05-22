# Build Checklist

## Sudah ada

- Next.js app structure
- Home page
- Login page
- Register page
- Forgot password page
- Dashboard page
- Settings API key page
- Upload page
- Generate page
- Workflow board page
- History page
- API endpoint generate
- Supabase client helper
- Supabase SQL schema
- Provider helper
- Environment example

## Wajib isi sendiri

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- GEMINI_API_KEY
- HUGGINGFACE_API_KEY jika dipakai
- CLOUDFLARE_ACCOUNT_ID jika dipakai
- CLOUDFLARE_API_TOKEN jika dipakai
- COMFYUI_BASE_URL jika punya ComfyUI lokal

## Syarat agar generate berjalan

- Pollinations image: bisa jalan tanpa API key.
- Motion prompt template: bisa jalan tanpa API key.
- Gemini production: wajib GEMINI_API_KEY.
- Hugging Face backup: wajib HUGGINGFACE_API_KEY.
- Cloudflare Workers AI: wajib account id dan token.
- ComfyUI lokal: wajib server lokal aktif.

## Command

npm install
npm run dev
npm run build
