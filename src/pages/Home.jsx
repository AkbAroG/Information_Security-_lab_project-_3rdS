import { Link } from 'react-router-dom'

const labs = [
  { title: 'XSS Lab', desc: 'Practice finding and understanding cross-site scripting flaws in a controlled environment.', path: '/xss', tag: 'Client-side', meta: 'Browser security' },
  { title: 'SQL Injection Simulator', desc: 'Explore unsafe query handling and learn how injection weaknesses are identified.', path: '/sqli', tag: 'Database', meta: 'Query abuse' },
  { title: 'IDOR Access Control Lab', desc: 'Test broken access control scenarios and study how object references can be exposed.', path: '/idor', tag: 'Access control', meta: 'Authorization' },
  { title: 'CSRF Attack Simulation', desc: 'See how forged requests can trick users into performing unwanted actions.', path: '/csrf', tag: 'Session-based', meta: 'Request forgery' },
  { title: 'Password Strength Checker', desc: 'Evaluate password quality and learn what makes credentials resilient to attack.', path: '/password', tag: 'Defensive', meta: 'Credential hygiene' },
]

export default function Home() {
  return (
    <main style={{ width:'min(1200px,calc(100% - 2rem))', margin:'0 auto', padding:'3rem 0 4rem', position:'relative' }}>
      <style>{`
        body {
          font-family: Inter,"Segoe UI",system-ui,sans-serif;
          color:#f5f8ff;
          background:
            radial-gradient(circle at top,rgba(35,183,255,0.15),transparent 32%),
            radial-gradient(circle at 20% 20%,rgba(0,255,136,0.12),transparent 22%),
            linear-gradient(135deg,#070b18 0%,#0b1020 55%,#070b18 100%);
          overflow-x:hidden; min-height:100vh;
        }
        body::before {
          content:""; position:fixed; inset:0; pointer-events:none;
          background-image:linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px);
          background-size:60px 60px;
          -webkit-mask-image:linear-gradient(to bottom,rgba(0,0,0,0.5),transparent 90%);
          mask-image:linear-gradient(to bottom,rgba(0,0,0,0.5),transparent 90%);
          opacity:0.45;
        }
        .lab-card {
          grid-column:span 6; position:relative; overflow:hidden; border-radius:20px;
          padding:1.5rem; background:linear-gradient(180deg,rgba(17,26,52,0.94),rgba(11,18,38,0.88));
          border:1px solid rgba(125,166,255,0.12); box-shadow:0 18px 60px rgba(0,0,0,0.45);
          transition:transform 220ms ease,border-color 220ms ease,box-shadow 220ms ease;
          min-height:230px; display:flex; flex-direction:column; justify-content:space-between;
        }
        .lab-card::before {
          content:""; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(0,255,136,0.08),transparent 40%,rgba(35,183,255,0.08));
          opacity:0; transition:opacity 220ms ease;
        }
        .lab-card:hover { transform:translateY(-8px); border-color:rgba(0,255,136,0.32); box-shadow:0 24px 70px rgba(0,0,0,0.55),0 0 0 1px rgba(0,255,136,0.1),0 0 40px rgba(35,183,255,0.08); }
        .lab-card:hover::before { opacity:1; }
        .btn-open-lab {
          align-self:flex-start; position:relative; z-index:1;
          display:inline-flex; align-items:center; gap:0.5rem;
          padding:0.92rem 1.25rem; border-radius:14px; text-decoration:none;
          font-weight:700; color:#07111f;
          background:linear-gradient(135deg,#00ff88,#7dffb4);
          transition:transform 220ms ease,box-shadow 220ms ease,filter 220ms ease;
        }
        .btn-open-lab:hover { transform:translateY(-1px); box-shadow:0 0 24px rgba(0,255,136,0.28); filter:brightness(1.05); }
        .tag { padding:0.35rem 0.65rem; border-radius:999px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); }
        @media(max-width:900px){ .lab-card{ grid-column:span 12; } }
      `}</style>

      <section style={{ padding:'2rem 0 2.5rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'0.55rem', padding:'0.55rem 0.9rem', border:'1px solid rgba(0,255,136,0.22)', borderRadius:'999px', background:'rgba(0,255,136,0.06)', color:'#00ff88', fontSize:'0.85rem', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'1.25rem' }}>
          Safe simulations • Hands-on practice • Modern web security
        </div>
        <h1 style={{ fontSize:'clamp(2.4rem,6vw,4.8rem)', lineHeight:0.98, letterSpacing:'-0.03em', marginBottom:'0.9rem', maxWidth:'12ch' }}>
          Information Security <span style={{ background:'linear-gradient(90deg,#00ff88,#23b7ff)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>Demo Lab</span>
        </h1>
        <p style={{ maxWidth:'58ch', color:'#96a2c0', fontSize:'1.05rem', lineHeight:1.7 }}>Learn cybersecurity through safe simulations</p>
      </section>

      <section style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:'1.25rem', marginTop:'2rem' }} aria-label="Training labs">
        {labs.map(lab => (
          <article className="lab-card" key={lab.path}>
            <div style={{ position:'relative', zIndex:1 }}>
              <h2 style={{ fontSize:'1.35rem', marginBottom:'0.45rem' }}>{lab.title}</h2>
              <p style={{ color:'#96a2c0', lineHeight:1.55, marginBottom:'1.25rem', position:'relative', zIndex:1 }}>{lab.desc}</p>
            </div>
            <div>
              <Link className="btn-open-lab" to={lab.path}>Open Lab</Link>
              <div style={{ position:'relative', zIndex:1, display:'flex', justifyContent:'space-between', alignItems:'center', gap:'1rem', marginTop:'0.75rem', color:'rgba(245,248,255,0.72)', fontSize:'0.88rem' }}>
                <span className="tag">{lab.tag}</span><span>{lab.meta}</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer style={{ padding:'2.5rem 0 0', color:'#96a2c0', fontSize:'0.9rem', textAlign:'center' }}>
        <p>2026 IS Lab — secure training for web security fundamentals.</p>
      </footer>
    </main>
  )
}
