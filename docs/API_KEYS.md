# API Key Setup

## Required for full system

- Supabase URL
- Supabase anon key
- Gemini API key

## Optional provider

- Hugging Face API key
- Cloudflare account id
- Cloudflare API token
- ComfyUI local URL

## Where to put keys

For local development create `.env.local` from `.env.example`.

For Vercel open Project Settings, then Environment Variables, then paste each key.

## Generate rules

Prompt generation needs text input.
Image generation through Pollinations can run without API key.
Hugging Face needs key.
Cloudflare Workers AI needs account id and token.
ComfyUI needs local server running.

Never put real API keys inside public code files.