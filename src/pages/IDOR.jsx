import { useState } from 'react'
import { Link } from 'react-router-dom'

const profiles = {
  1:{ id:1, name:'Alice', role:'User', email:'alice@cyberlab.local', department:'Training', notes:'Regular user account used for safe access-control testing.' },
  2:{ id:2, name:'Bob', role:'User', email:'bob@cyberlab.local', department:'Operations', notes:'Second regular account for object-reference practice.' },
  3:{ id:3, name:'Admin', role:'Sensitive', email:'admin@cyberlab.local', department:'Security', notes:'Privileged profile containing sensitive internal access.' },
}

const panel = { position:'relative', background:'linear-gradient(180deg,rgba(15,23,42,0.9),rgba(17,27,49,0.9))', border:'1px solid rgba(148,163,184,0.14)', borderRadius:22, padding:'1.5rem', boxShadow:'0 18px 60px rgba(0,0,0,0.42)', overflow:'hidden' }
const overlay = { position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,255,136,0.08),transparent 45%,rgba(35,183,255,0.08))', pointerEvents:'none' }
const inputSt = { width:'100%', border:'1px solid rgba(148,163,184,0.16)', borderRadius:14, padding:'0.95rem 1rem', color:'#f8fafc', background:'rgba(15,23,42,0.96)', font:'inherit', boxSizing:'border-box', outline:'none' }
const modeBtnBase = { flex:'1 1 180px', borderRadius:14, border:'1px solid rgba(148,163,184,0.14)', background:'rgba(255,255,255,0.03)', color:'#cbd5e1', padding:'0.9rem 1rem', cursor:'pointer', textAlign:'left' }
const modeBtnActive = { borderColor:'rgba(0,255,136,0.28)', background:'rgba(0,255,136,0.08)', boxShadow:'0 0 0 1px rgba(0,255,136,0.08),0 0 22px rgba(0,255,136,0.16)' }
const statusColors = { success:{ borderColor:'rgba(0,255,136,0.2)', background:'rgba(0,255,136,0.06)' }, error:{ borderColor:'rgba(255,91,110,0.22)', background:'rgba(255,91,110,0.08)' }, '':{ borderColor:'rgba(148,163,184,0.14)', background:'rgba(255,255,255,0.03)' } }

export default function IDOR() {
  const [mode, setMode] = useState('vulnerable')
  const [userId, setUserId] = useState('')
  const [status, setStatus] = useState({ cls:'', text:'Choose a mode, enter an ID, then view a profile.' })
  const [profile, setProfile] = useState(null)
  const [profileMsg, setProfileMsg] = useState('No profile loaded yet.')

  function switchMode(m) {
    setMode(m)
    setStatus({ cls:'', text: m==='vulnerable' ? 'Vulnerable Mode active: any entered ID will be shown if it exists.' : 'Secure Mode active: Admin profile access is blocked.' })
  }

  function viewProfile() {
    const id = Number(userId.trim())
    if (!Number.isInteger(id) || id < 1 || id > 3) {
      setStatus({ cls:'error', text:'Enter a valid user ID between 1 and 3.' })
      setProfile(null); setProfileMsg('Invalid ID. Use 1, 2, or 3.'); return
    }
    if (mode === 'secure' && id === 3) {
      setStatus({ cls:'error', text:'Access denied: Admin profile is blocked in Secure Mode.' })
      setProfile(null); setProfileMsg('Secure Mode blocked access to User ID 3.'); return
    }
    const p = profiles[id]
    setStatus({ cls:'success', text: mode==='vulnerable' ? `Vulnerable Mode returned ${p.name}'s profile.` : `Secure Mode returned ${p.name}'s profile.` })
    setProfile(p)
  }

  function reset() { setUserId(''); switchMode('vulnerable'); setProfile(null); setProfileMsg('No profile loaded yet.') }

  return (
    <div style={{ minHeight:'100vh', fontFamily:"Inter,'Segoe UI',system-ui,sans-serif", color:'#f8fafc', background:'radial-gradient(circle at top left,rgba(35,183,255,0.14),transparent 28%),radial-gradient(circle at 80% 10%,rgba(0,255,136,0.12),transparent 26%),linear-gradient(135deg,#0b1220 0%,#0b1020 55%,#070b18 100%)', overflowX:'hidden' }}>
      <main style={{ width:'min(calc(100% - 2rem),1100px)', margin:'0 auto', padding:'2rem 0 3rem' }}>
        <header style={{ display:'flex', justifyContent:'space-between', gap:'1rem', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap' }}>
          <div>
            <div style={{ display:'inline-flex', alignItems:'center', padding:'0.45rem 0.8rem', marginBottom:'1rem', borderRadius:999, border:'1px solid rgba(0,255,136,0.18)', background:'rgba(0,255,136,0.06)', color:'#00ff88', fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase' }}>Safe Access Control Simulation</div>
            <h1 style={{ fontSize:'clamp(1.9rem,4vw,3.4rem)', lineHeight:1.05, marginBottom:'0.7rem' }}><span style={{ background:'linear-gradient(90deg,#00ff88,#23b7ff)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>IDOR</span> Access Control Lab</h1>
            <p style={{ color:'#94a3b8', maxWidth:'62ch', lineHeight:1.7 }}>IDOR happens when an application exposes direct object references, like user IDs, without properly checking whether the current user is allowed to access that object.</p>
          </div>
          <Link to="/" style={{ textDecoration:'none', color:'#07111f', background:'linear-gradient(135deg,#00ff88,#7dffb4)', padding:'0.85rem 1.1rem', borderRadius:14, fontWeight:700 }}>Back Home</Link>
        </header>

        <section style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'1.25rem', marginTop:'1.5rem' }}>
          <div style={panel}>
            <div style={overlay} />
            <div style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ marginBottom:'0.85rem' }}>What IDOR Looks Like</h2>
              <div style={{ marginBottom:'1rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(148,163,184,0.12)' }}>
                <p style={{ color:'#94a3b8', lineHeight:1.75 }}>If an app lets you change a value like <strong>userId=2</strong> to <strong>userId=3</strong> and view another person's data without authorization checks, that is an IDOR issue.</p>
              </div>
              <h3 style={{ marginBottom:'0.85rem' }}>Lab Controls</h3>
              <div style={{ display:'grid', gap:'1rem', marginTop:'1rem' }}>
                <div style={{ display:'grid', gap:'0.65rem' }}>
                  <label htmlFor="userId" style={{ fontWeight:700, color:'#cbd5e1' }}>Enter User ID (1–3)</label>
                  <input id="userId" type="number" min="1" max="3" placeholder="e.g. 1" value={userId} onChange={e=>setUserId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&viewProfile()} style={inputSt} />
                </div>
                <div style={{ display:'grid', gap:'0.65rem' }}>
                  <label style={{ fontWeight:700, color:'#cbd5e1' }}>Mode</label>
                  <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
                    <button onClick={()=>switchMode('vulnerable')} style={{ ...modeBtnBase, ...(mode==='vulnerable'?modeBtnActive:{}) }} type="button"><strong style={{ display:'block', color:'#f8fafc', marginBottom:'0.2rem' }}>Vulnerable Mode</strong>Shows any profile</button>
                    <button onClick={()=>switchMode('secure')} style={{ ...modeBtnBase, ...(mode==='secure'?modeBtnActive:{}) }} type="button"><strong style={{ display:'block', color:'#f8fafc', marginBottom:'0.2rem' }}>Secure Mode</strong>Blocks Admin (ID 3)</button>
                  </div>
                </div>
                <div style={{ display:'flex', gap:'0.75rem' }}>
                  <button onClick={viewProfile} style={{ border:0, borderRadius:14, padding:'0.95rem 1.2rem', font:'inherit', fontWeight:800, cursor:'pointer', color:'#07111f', background:'linear-gradient(135deg,#00ff88,#7dffb4)' }} type="button">View Profile</button>
                  <button onClick={reset} style={{ border:'1px solid rgba(35,183,255,0.22)', borderRadius:14, padding:'0.95rem 1.2rem', font:'inherit', fontWeight:800, cursor:'pointer', color:'#23b7ff', background:'rgba(35,183,255,0.1)' }} type="button">Reset</button>
                </div>
                <div style={{ marginTop:'1rem', padding:'0.9rem 1rem', borderRadius:14, border:'1px solid', color:'#f8fafc', ...statusColors[status.cls] }}>{status.text}</div>
              </div>
              <p style={{ marginTop:'1rem', color:'#94a3b8', fontSize:'0.92rem' }}>Use the lab to compare broken access control behavior with a basic authorization check.</p>
            </div>
          </div>

          <div style={panel}>
            <div style={overlay} />
            <div style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ marginBottom:'0.85rem' }}>Profile Viewer</h2>
              <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(148,163,184,0.12)', borderRadius:18, padding:'1.2rem' }}>
                {profile ? (
                  <>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' }}>
                      <div>
                        <div style={{ fontSize:'1.25rem', color:'#f8fafc' }}>{profile.name}</div>
                        <div style={{ color:'#94a3b8', fontSize:'0.92rem', marginTop:'0.2rem' }}>Profile for User ID {profile.id}</div>
                      </div>
                      <div style={{ display:'inline-flex', alignItems:'center', padding:'0.35rem 0.7rem', borderRadius:999, fontSize:'0.78rem', letterSpacing:'0.06em', textTransform:'uppercase', border:'1px solid', ...(profile.role==='Sensitive' ? { color:'#ff5b6e', borderColor:'rgba(255,91,110,0.22)', background:'rgba(255,91,110,0.08)' } : { borderColor:'rgba(148,163,184,0.14)', color:'#cbd5e1', background:'rgba(255,255,255,0.03)' }) }}>{profile.role}</div>
                    </div>
                    <div style={{ display:'grid', gridTemplateColumns:'110px 1fr', gap:'0.7rem 1rem', marginTop:'1rem' }}>
                      {[['ID',profile.id],['Name',profile.name],['Role',profile.role],['Email',profile.email],['Department',profile.department],['Notes',profile.notes]].map(([k,v])=>(
                        <>
                          <div key={k} style={{ color:'#cbd5e1', fontWeight:700 }}>{k}</div>
                          <div key={k+'v'} style={{ color:'#94a3b8' }}>{v}</div>
                        </>
                      ))}
                    </div>
                  </>
                ) : (
                  <div style={{ color:'#94a3b8', padding:'0.4rem 0' }}>{profileMsg}</div>
                )}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,minmax(0,1fr))', gap:'1rem', marginTop:'1rem' }}>
                {[['Alice','User ID 1 — regular account profile.'],['Bob','User ID 2 — regular account profile.'],['Admin','User ID 3 — sensitive account profile.']].map(([n,d])=>(
                  <div key={n} style={{ borderRadius:16, padding:'1rem', border:'1px solid rgba(148,163,184,0.12)', background:'rgba(255,255,255,0.03)' }}>
                    <h3 style={{ marginBottom:'0.35rem', fontSize:'1rem' }}>{n}</h3>
                    <p style={{ color:'#94a3b8', fontSize:'0.92rem' }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <footer style={{ color:'#94a3b8', marginTop:'1.5rem', fontSize:'0.9rem', textAlign:'center' }}>IDOR simulation lab.</footer>
      </main>
    </div>
  )
}
