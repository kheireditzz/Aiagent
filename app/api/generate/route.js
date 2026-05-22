export async function POST(req){
  const body = await req.json().catch(function(){return {}})
  const text = body.text || 'ai image'
  if(body.mode === 'image'){
    return Response.json({ imageUrl: 'https://image.pollinations.ai/prompt/' + encodeURIComponent(text) })
  }
  return Response.json({ result: 'Motion prompt: ' + text })
}
