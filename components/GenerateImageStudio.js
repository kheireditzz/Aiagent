'use client'
import {useMemo,useState} from 'react'

const styles=['Realistic','Anime','Cinematic','3D Render','iOS Glass','Product Poster','Neon Cyber','Minimal Luxury']
const ratios=[['9:16','720','1280'],['1:1','1024','1024'],['16:9','1280','720'],['4:5','1024','1280']]

export default function GenerateImageStudio(){
  const [prompt,setPrompt]=useState('')
  const [style,setStyle]=useState('Cinematic')
  const [ratio,setRatio]=useState('9:16')
  const [image,setImage]=useState('')
  const [loading,setLoading]=useState(false)
  const [msg,setMsg]=useState('')
  const size=useMemo(()=>ratios.find(r=>r[0]===ratio)||ratios[0],[ratio])

  function finalPrompt(){
    return `${prompt}, ${style} style, ultra detailed, professional lighting, clean composition, high quality`
  }

  async function generate(){
    if(!prompt.trim()){setMsg('Prompt masih kosong');return}
    setLoading(true);setMsg('Generate gambar...')
    const p=encodeURIComponent(finalPrompt())
    const url=`https://image.pollinations.ai/prompt/${p}?width=${size[1]}&height=${size[2]}&nologo=true&enhance=true&seed=${Date.now()}`
    setImage(url)
    setTimeout(()=>{setLoading(false);setMsg('Gambar siap')},900)
  }

  function copyPrompt(){navigator.clipboard.writeText(finalPrompt());setMsg('Prompt disalin')}

  return <div className="studioGrid"><div className="glass card studioPanel"><span className="pill">FREE IMAGE GENERATOR</span><h1>Generate Gambar AI</h1><p className="muted">Buat gambar dari prompt memakai Pollinations. Cocok untuk poster, thumbnail, produk, karakter, dan konten 9:16.</p><label>Prompt utama</label><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Contoh: pria memakai hoodie hitam di kota neon, cinematic, detail tajam"/><div className="grid cols"><div><label>Style</label><select value={style} onChange={e=>setStyle(e.target.value)}>{styles.map(s=><option key={s}>{s}</option>)}</select></div><div><label>Ratio</label><select value={ratio} onChange={e=>setRatio(e.target.value)}>{ratios.map(r=><option key={r[0]}>{r[0]}</option>)}</select></div></div><br/><div className="links"><button className="btn" onClick={generate} disabled={loading}>{loading?'Loading':'Generate Gambar'}</button><button onClick={copyPrompt}>Copy Prompt</button></div><p className="notice">{msg}</p></div><div className="glass card previewPanel"><div className="nav"><b>Preview</b><span className="pill">{ratio}</span></div>{image?<img className="resultImage" src={image} alt="Generated result"/>:<div className="emptyPreview"><h2>Belum ada gambar</h2><p className="muted">Isi prompt lalu klik Generate.</p></div>}{image&&<div className="links"><a className="link btn" href={image} target="_blank">Buka Gambar</a><a className="link" href={image} download>Download</a></div>}</div></div>
}
