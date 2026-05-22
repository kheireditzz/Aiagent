'use client'
import {useEffect,useState} from 'react'
import {supabase} from '../lib/supabaseClient'

export default function GeminiChat(){
  const [keys,setKeys]=useState([])
  const [active,setActive]=useState('')
  const [model,setModel]=useState('gemini-1.5-flash')
  const [input,setInput]=useState('')
  const [busy,setBusy]=useState(false)
  const [msg,setMsg]=useState('')
  const [chats,setChats]=useState([])

  async function load(){
    if(!supabase){setMsg('Supabase belum siap');return}
    const u=(await supabase.auth.getUser()).data.user
    if(!u){setMsg('Login dulu');return}
    const r=await supabase.from('provider_settings').select('id,label,value_text,provider').eq('user_id',u.id).eq('provider','gemini')
    if(r.error){setMsg(r.error.message);return}
    setKeys(r.data||[])
    if((r.data||[])[0]) setActive((r.data||[])[0].value_text)
  }

  useEffect(()=>{load();const old=localStorage.getItem('gemini_chat_history');if(old)setChats(JSON.parse(old))},[])
  useEffect(()=>{localStorage.setItem('gemini_chat_history',JSON.stringify(chats))},[chats])

  async function send(){
    if(!active){setMsg('Masukkan Gemini key dulu di Settings');return}
    if(!input.trim())return
    const userText=input.trim()
    setInput('')
    setBusy(true)
    setChats(v=>[...v,{role:'user',text:userText}])
    try{
      const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+model+':generateContent?key='+active,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({contents:[{parts:[{text:userText}]}]})})
      const data=await res.json()
      if(!res.ok){throw new Error(data.error?.message||'Request gagal')}
      const text=data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada jawaban'
      setChats(v=>[...v,{role:'assistant',text:text}])
      setMsg('Berhasil')
    }catch(e){setMsg(e.message)}
    setBusy(false)
  }

  function clear(){setChats([]);localStorage.removeItem('gemini_chat_history')}

  return <div className="glass card"><h1>Gemini Chatbot</h1><p className="muted">Pakai key Gemini dari Settings. Chat history disimpan lokal di browser.</p><div className="grid cols"><select value={active} onChange={e=>setActive(e.target.value)}>{keys.map(k=><option key={k.id} value={k.value_text}>{k.label||k.provider}</option>)}</select><select value={model} onChange={e=>setModel(e.target.value)}><option value="gemini-1.5-flash">Gemini Flash</option><option value="gemini-1.5-pro">Gemini Pro</option></select></div><br/><div className="glass card" style={{minHeight:240}}>{chats.length===0&&<p className="muted">Belum ada chat.</p>}{chats.map((c,i)=><p key={i}><b>{c.role}:</b> {c.text}</p>)}</div><br/><textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Tulis pesan..."/><br/><br/><div className="links"><button className="btn" onClick={send} disabled={busy}>{busy?'Loading':'Kirim'}</button><button onClick={clear}>Bersihkan</button><button onClick={load}>Refresh Key</button></div><p className="muted">{msg}</p></div>
}
