# Cloudflare Token Full Guide

## Goal

Create a Cloudflare API token for Aiagent env variables.

## Needed env

CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_API_KEYS=
NEXT_PUBLIC_CLOUDFLARE_AI_SEARCH_URL=
NEXT_PUBLIC_CLOUDFLARE_AI_CHAT_URL=

## Recommended permission

Use an API token, not Global API Key.

For AI features, open the permission group related to AI and Machine Learning, Workers AI, AI Gateway, or Account settings. Give the token the lowest permissions that work for your use case.

## Resource scope

Use Account Resources and select your Cloudflare account. Avoid broad domain permissions when the feature is account-level AI.

## Token lifetime

For testing, No expiration is easiest. For production, use 90 days or 1 year and rotate it.

## After create

Copy the token immediately. Cloudflare only shows token secret once.

## Vercel

Paste variables in Vercel Project Settings > Environment Variables, then redeploy.