'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthPanel(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(false)

  useEffect(()=>{checkSession()},[])

  async function checkSession(){
    if(!supabase)return
    const res=await supabase.auth.getUser()
    if(res.data.user){window.location.href='/dashboard'}
  }

  function needEnv(){
    if(!supabase){setMessage('Supabase env belum diisi di Vercel. Isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY lalu redeploy.');return true}
    return false
  }

  async function googleLogin(){
    if(needEnv())return
    setLoading(true)
    const res=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin + '/dashboard'}})
    if(res.error)setMessage(res.error.message)
    setLoading(false)
  }

  async function emailLogin(){
    if(needEnv())return
    if(!email || !password){setMessage('Email dan password wajib diisi');return}
    setLoading(true)
    const res=await supabase.auth.signInWithPassword({email,password})
    if(res.error){setMessage(res.error.message);setLoading(false);return}
    window.location.href='/dashboard'
  }

  async function register(){
    if(needEnv())return
    if(!email || !password){setMessage('Isi email dan password dulu');return}
    setLoading(true)
    const res=await supabase.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin + '/dashboard'}})
    if(res.error)setMessage(res.error.message)
    else setMessage('Akun dibuat. Kalau Supabase email confirmation aktif, cek email dulu.')
    setLoading(false)
  }

  async function resetPassword(){
    if(needEnv())return
    if(!email){setMessage('Isi email dulu untuk reset password');return}
    setLoading(true)
    const res=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin + '/reset-password'})
    if(res.error)setMessage(res.error.message)
    else setMessage('Link reset password dikirim ke email')
    setLoading(false)
  }

  return <div className="authShell"><div className="authInfo glass card"><span className="pill">AIAGENT</span><h1>Workflow AI Dashboard</h1><p className="muted">Login dulu untuk akses Gemini chat, Cloudflare AI, API key manager, upload, MCPE server, dan riwayat.</p><div className="miniGrid"><span>⚡ Workers AI</span><span>🔐 API Key Stock</span><span>💬 Gemini Chat</span><span>🧱 MCPE Server</span></div></div><div className="glass card authCard"><h1>Masuk</h1><p className="muted">Pakai Google atau email. Simpel, karena hidup sudah cukup banyak form.</p><button className="btn bigBtn" onClick={googleLogin} disabled={loading}>Login dengan Google</button><div className="divider"><span>atau email</span></div><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"/><br/><br/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"/><br/><br/><div className="links"><button className="btn" onClick={emailLogin} disabled={loading}>{loading?'Loading':'Masuk'}</button><button onClick={register} disabled={loading}>Buat Akun</button><button onClick={resetPassword} disabled={loading}>Lupa Password</button></div>{message&&<p className="notice">{message}</p>}</div></div>
}
