'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthPanel(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [message,setMessage]=useState('')

  async function googleLogin(){
    if(!supabase){setMessage('Supabase belum diisi');return}
    await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:window.location.origin + '/dashboard'}})
  }

  async function emailLogin(){
    if(!supabase){setMessage('Supabase belum diisi');return}
    const res=await supabase.auth.signInWithPassword({email,password})
    if(res.error){setMessage(res.error.message);return}
    window.location.href='/dashboard'
  }

  async function register(){
    if(!supabase){setMessage('Supabase belum diisi');return}
    const res=await supabase.auth.signUp({email,password})
    if(res.error){setMessage(res.error.message);return}
    setMessage('Cek email untuk verifikasi akun')
  }

  async function resetPassword(){
    if(!supabase){setMessage('Supabase belum diisi');return}
    const res=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin + '/reset-password'})
    if(res.error){setMessage(res.error.message);return}
    setMessage('Link reset password dikirim')
  }

  return <div className="glass card"><h1>Login Aiagent</h1><p className="muted">Masuk dengan Google atau email.</p><button className="btn" onClick={googleLogin}>Login Google</button><br/><br/><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/><br/><br/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"/><br/><br/><div className="links"><button className="btn" onClick={emailLogin}>Masuk</button><button onClick={register}>Buat Akun</button><button onClick={resetPassword}>Lupa Password</button></div><p className="muted">{message}</p></div>
}
