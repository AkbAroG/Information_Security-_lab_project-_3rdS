// import { useState } from 'react'
// import { Link } from 'react-router-dom'

// function generateToken() {
//   return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15)
// }

// const panelStyle = {
//   position:'relative', background:'linear-gradient(180deg,rgba(15,23,42,0.9),rgba(17,27,49,0.9))',
//   border:'1px solid rgba(148,163,184,0.14)', borderRadius:22, padding:'1.5rem',
//   boxShadow:'0 18px 60px rgba(0,0,0,0.42)', overflow:'hidden',
// }

// export default function CSRF() {
//   const [mode, setMode] = useState('vulnerable')
//   const [csrfToken, setCsrfToken] = useState('')
//   const [recipient, setRecipient] = useState('')
//   const [amount, setAmount] = useState('')
//   const [status, setStatus] = useState({ cls:'', text:'Choose a mode, enter transfer details, then execute.' })
//   const [transactions, setTransactions] = useState([])

//   function switchMode(m) {
//     setMode(m)
//     if (m === 'secure') {
//       const tok = generateToken()
//       setCsrfToken(tok)
//       setStatus({ cls:'warning', text:`Secure Mode active. CSRF token: ${tok} (required for all transfers)` })
//     } else {
//       setCsrfToken('')
//       setStatus({ cls:'', text:'Vulnerable Mode active: transfers proceed without token validation.' })
//     }
//   }

//   function executeTransfer() {
//     if (!recipient || !amount) { setStatus({ cls:'error', text:'Enter recipient email and amount.' }); return }
//     const amt = parseFloat(amount)
//     if (isNaN(amt) || amt <= 0) { setStatus({ cls:'error', text:'Amount must be a positive number.' }); return }

//     let blocked = false, message = ''
//     if (mode === 'vulnerable') {
//       message = `Transfer of $${amt} to ${recipient} executed (no token validation).`
//       setStatus({ cls:'success', text: message })
//     } else {
//       const userToken = window.prompt('Enter CSRF token to proceed:')
//       if (!userToken) { setStatus({ cls:'error', text:'Transfer cancelled.' }); return }
//       if (userToken !== csrfToken) {
//         blocked = true; message = 'Transfer blocked: invalid CSRF token provided.'
//         setStatus({ cls:'error', text: message })
//       } else {
//         message = `Transfer of $${amt} to ${recipient} executed (token validated).`
//         setStatus({ cls:'success', text: message })
//       }
//     }
//     setTransactions(prev => [{ recipient, amount: amt, mode: mode === 'vulnerable' ? 'Vulnerable' : 'Secure', blocked }, ...prev])
//     setRecipient(''); setAmount('')
//   }

//   function reset() {
//     setTransactions([]); setRecipient(''); setAmount(''); switchMode('vulnerable')
//   }

//   const statusColors = {
//     success:{ borderColor:'rgba(0,255,136,0.2)', background:'rgba(0,255,136,0.06)' },
//     error:{ borderColor:'rgba(255,91,110,0.22)', background:'rgba(255,91,110,0.08)' },
//     warning:{ borderColor:'rgba(255,191,60,0.22)', background:'rgba(255,191,60,0.08)' },
//     '':{ borderColor:'rgba(148,163,184,0.14)', background:'rgba(255,255,255,0.03)' },
//   }

//   const inputStyle = { width:'100%', border:'1px solid rgba(148,163,184,0.16)', borderRadius:14, padding:'0.95rem 1rem', color:'#f8fafc', background:'rgba(15,23,42,0.96)', font:'inherit', boxSizing:'border-box', outline:'none' }
//   const modeBtnBase = { flex:'1 1 180px', borderRadius:14, border:'1px solid rgba(148,163,184,0.14)', background:'rgba(255,255,255,0.03)', color:'#cbd5e1', padding:'0.9rem 1rem', cursor:'pointer', textAlign:'left' }
//   const modeBtnActive = { borderColor:'rgba(0,255,136,0.28)', background:'rgba(0,255,136,0.08)', boxShadow:'0 0 0 1px rgba(0,255,136,0.08),0 0 22px rgba(0,255,136,0.16)' }

//   return (
//     <div style={{ minHeight:'100vh', fontFamily:"Inter,'Segoe UI',system-ui,sans-serif", color:'#f8fafc', background:'radial-gradient(circle at top left,rgba(35,183,255,0.14),transparent 28%),radial-gradient(circle at 80% 10%,rgba(0,255,136,0.12),transparent 26%),linear-gradient(135deg,#0b1220 0%,#0b1020 55%,#070b18 100%)', overflowX:'hidden' }}>
//       <main style={{ width:'min(calc(100% - 2rem),1100px)', margin:'0 auto', padding:'2rem 0 3rem' }}>
//         <header style={{ display:'flex', justifyContent:'space-between', gap:'1rem', alignItems:'center', marginBottom:'1.5rem', flexWrap:'wrap' }}>
//           <div>
//             <div style={{ display:'inline-flex', alignItems:'center', padding:'0.45rem 0.8rem', marginBottom:'1rem', borderRadius:999, border:'1px solid rgba(0,255,136,0.18)', background:'rgba(0,255,136,0.06)', color:'#00ff88', fontSize:'0.82rem', letterSpacing:'0.08em', textTransform:'uppercase' }}>Safe Request Forgery Simulation</div>
//             <h1 style={{ fontSize:'clamp(1.9rem,4vw,3.4rem)', lineHeight:1.05, marginBottom:'0.7rem' }}><span style={{ background:'linear-gradient(90deg,#00ff88,#23b7ff)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>CSRF</span> Attack Simulation</h1>
//             <p style={{ color:'#94a3b8', maxWidth:'62ch', lineHeight:1.7 }}>CSRF tricks an authenticated user into performing unwanted actions by forging requests on their behalf. Proper token validation can prevent these attacks.</p>
//           </div>
//           <Link to="/" style={{ textDecoration:'none', color:'#07111f', background:'linear-gradient(135deg,#00ff88,#7dffb4)', padding:'0.85rem 1.1rem', borderRadius:14, fontWeight:700, display:'inline-flex', alignItems:'center' }}>Back Home</Link>
//         </header>

//         <section style={{ display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:'1.25rem', marginTop:'1.5rem' }}>
//           <div style={panelStyle}>
//             <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,255,136,0.08),transparent 45%,rgba(35,183,255,0.08))', pointerEvents:'none' }} />
//             <div style={{ position:'relative', zIndex:1 }}>
//               <h2 style={{ marginBottom:'0.85rem' }}>Understanding CSRF</h2>
//               <div style={{ marginBottom:'1rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(148,163,184,0.12)' }}>
//                 <p style={{ color:'#94a3b8', lineHeight:1.75, marginBottom:'1rem' }}>A CSRF attack exploits your trust in a website. If you're logged into your bank, and you visit a malicious site in another tab, that site can make your browser send forged requests to your bank (like transferring funds) without your knowledge.</p>
//               </div>
//               <h3 style={{ marginBottom:'0.85rem' }}>Lab Controls</h3>
//               <div style={{ display:'grid', gap:'1rem', marginTop:'1rem' }}>
//                 <div style={{ display:'grid', gap:'0.65rem' }}>
//                   <label style={{ fontWeight:700, color:'#cbd5e1' }} htmlFor="recipient">Recipient</label>
//                   <input id="recipient" type="email" placeholder="attacker@evil.com" value={recipient} onChange={e=>setRecipient(e.target.value)} style={inputStyle} />
//                 </div>
//                 <div style={{ display:'grid', gap:'0.65rem' }}>
//                   <label style={{ fontWeight:700, color:'#cbd5e1' }} htmlFor="amount">Amount ($)</label>
//                   <input id="amount" type="number" min="0" placeholder="1000" value={amount} onChange={e=>setAmount(e.target.value)} onKeyDown={e=>e.key==='Enter'&&executeTransfer()} style={inputStyle} />
//                 </div>
//                 <div style={{ display:'grid', gap:'0.65rem' }}>
//                   <label style={{ fontWeight:700, color:'#cbd5e1' }}>Mode</label>
//                   <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
//                     <button onClick={()=>switchMode('vulnerable')} style={{ ...modeBtnBase, ...(mode==='vulnerable'?modeBtnActive:{}) }} type="button"><strong style={{ display:'block', color:'#f8fafc', marginBottom:'0.2rem' }}>Vulnerable Mode</strong>No CSRF token</button>
//                     <button onClick={()=>switchMode('secure')} style={{ ...modeBtnBase, ...(mode==='secure'?modeBtnActive:{}) }} type="button"><strong style={{ display:'block', color:'#f8fafc', marginBottom:'0.2rem' }}>Secure Mode</strong>Token validation</button>
//                   </div>
//                 </div>
//                 <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
//                   <button onClick={executeTransfer} style={{ border:0, borderRadius:14, padding:'0.95rem 1.2rem', font:'inherit', fontWeight:800, cursor:'pointer', color:'#07111f', background:'linear-gradient(135deg,#00ff88,#7dffb4)' }} type="button">Execute Transfer</button>
//                   <button onClick={reset} style={{ border:'1px solid rgba(35,183,255,0.22)', borderRadius:14, padding:'0.95rem 1.2rem', font:'inherit', fontWeight:800, cursor:'pointer', color:'#23b7ff', background:'rgba(35,183,255,0.1)' }} type="button">Clear History</button>
//                 </div>
//                 <div style={{ marginTop:'1rem', padding:'0.9rem 1rem', borderRadius:14, border:'1px solid', color:'#f8fafc', ...statusColors[status.cls] }}>{status.text}</div>
//               </div>
//               <p style={{ marginTop:'1rem', color:'#94a3b8', fontSize:'0.92rem' }}>In Vulnerable Mode, the request is processed without token validation. In Secure Mode, a CSRF token is required and must match.</p>
//             </div>
//           </div>

//           <div style={panelStyle}>
//             <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(0,255,136,0.08),transparent 45%,rgba(35,183,255,0.08))', pointerEvents:'none' }} />
//             <div style={{ position:'relative', zIndex:1 }}>
//               <h2 style={{ marginBottom:'0.85rem' }}>Transaction Log</h2>
//               {transactions.length === 0
//                 ? <div style={{ color:'#94a3b8', padding:'0.4rem 0' }}>No transactions yet.</div>
//                 : transactions.map((tx,i) => (
//                     <div key={i} style={{ border:'1px solid rgba(148,163,184,0.12)', borderRadius:14, padding:'1rem', marginBottom:'0.75rem', background:'rgba(255,255,255,0.03)' }}>
//                       <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'0.5rem' }}>
//                         <div style={{ fontWeight:800, fontSize:'1.1rem', color: tx.blocked ? '#ff5b6e' : '#00ff88' }}>$ {tx.amount}</div>
//                         <div style={{ fontSize:'0.8rem', letterSpacing:'0.05em', textTransform:'uppercase', padding:'0.25rem 0.5rem', borderRadius:4, border:'1px solid', ...(tx.blocked ? { color:'#ff5b6e', borderColor:'rgba(255,91,110,0.22)', background:'rgba(255,91,110,0.08)' } : { borderColor:'rgba(148,163,184,0.14)', background:'rgba(255,255,255,0.04)', color:'#f8fafc' }) }}>{tx.blocked ? 'Blocked' : 'Executed'}</div>
//                       </div>
//                       <div style={{ color:'#94a3b8', fontSize:'0.9rem' }}>To: <strong>{tx.recipient}</strong> | Mode: <strong>{tx.mode}</strong></div>
//                     </div>
//                   ))
//               }
//             </div>
//           </div>
//         </section>

//         <footer style={{ color:'#94a3b8', marginTop:'1.5rem', fontSize:'0.9rem', textAlign:'center' }}>CSRF simulation lab.</footer>
//       </main>
//     </div>
//   )
// }
