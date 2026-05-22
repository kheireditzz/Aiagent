export async function POST(req){
  const body = await req.json().catch(function(){return {}})
  const account = process.env.CLOUDFLARE_ACCOUNT_ID
  const token = process.env.CLOUDFLARE_API_TOKEN
  const model = body.model || '@cf/meta/llama-3.2-1b-instruct'
  const prompt = body.prompt || 'Hello'
  if(!account || !token){return Response.json({error:'Cloudflare env belum diisi'},{status:400})}
  const url = 'https://api.cloudflare.com/client/v4/accounts/' + account + '/ai/run/' + model
  const r = await fetch(url,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:prompt}]})})
  const data = await r.json().catch(function(){return {}})
  return Response.json(data,{status:r.status})
}
