'use client'
import {useState} from 'react'

export default function CloudflareSearchPanel(){
  const [q,setQ]=useState('')
  const [answer,setAnswer]=useState('')
  const [busy,setBusy]=useState(false)
  const [msg,setMsg]=useState('')
  const searchUrl=process.env.NEXT_PUBLIC_CLOUDFLARE_AI_SEARCH_URL
  const chatUrl=process.env.NEXT_PUBLIC_CLOUDFLARE_AI_CHAT_URL

  async function runSearch(){
    if(!searchUrl){setMsg('Isi NEXT_PUBLIC_CLOUDFLARE_AI_SEARCH_URL di env');return}
    if(!q.trim())return
    setBusy(true);setMsg('')
    try{
      const r=await fetch(searchUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({query:q})})
      const data=await r.json().catch(()=>({}))
      setAnswer(JSON.stringify(data,null,2))
    }catch(e){setMsg(e.message)}
    setBusy(false)
  }

  async function runChat(){
    if(!chatUrl){setMsg('Isi NEXT_PUBLIC_CLOUDFLARE_AI_CHAT_URL di env');return}
    if(!q.trim())return
    setBusy(true);setMsg('')
    try{
      const r=await fetch(chatUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:q}]})})
      const data=await r.json().catch(()=>({}))
      setAnswer(JSON.stringify(data,null,2))
    }catch(e){setMsg(e.message)}
    setBusy(false)
  }

  return <div className="glass card"><h1>Cloudflare AI Search</h1><p className="muted">Hubungkan endpoint Cloudflare Search AI dari dashboard Cloudflare kamu.</p><textarea value={q} onChange={e=>setQ(e.target.value)} placeholder="Tulis pertanyaan atau pencarian..."/><br/><br/><div className="links"><button className="btn" onClick={runSearch} disabled={busy}>Search</button><button onClick={runChat} disabled={busy}>Chat Completion</button></div><p className="muted">{busy?'Loading...':msg}</p>{answer&&<pre className="glass card" style={{whiteSpace:'pre-wrap',overflow:'auto'}}>{answer}</pre>}</div>
}
