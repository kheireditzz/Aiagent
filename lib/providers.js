export function pollinationsUrl(text){return 'https://image.pollinations.ai/prompt/' + encodeURIComponent(text || 'ai')}
export function motionPrompt(text){return 'Motion prompt: ' + (text || 'cinematic scene')}
export const providers=['gemini','pollinations','huggingface','cloudflare','comfyui']
