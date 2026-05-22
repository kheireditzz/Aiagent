import { getPoolStatus } from '../../../../lib/keyPool'

export async function GET(){
  return Response.json({
    gemini: getPoolStatus('gemini'),
    huggingface: getPoolStatus('huggingface'),
    cloudflare: getPoolStatus('cloudflare')
  })
}
