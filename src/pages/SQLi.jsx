import { useState } from 'react'
import { Link } from 'react-router-dom'

const sqlInjectionPatterns = [
  /'\s*OR\s*'?[\d\w]*'?\s*=\s*'?[\d\w]*'?/i,
  /'\s*OR\s*[\d\w]*\s*=\s*[\d\w]*/i,
  /--\s*$/i,
  /\/\*|\*\//i,
  /UNION\s+SELECT/i,
  /WAITFOR\s+DELAY/i,
  /EXEC\s*\(/i,
  /;\s*DROP/i,
  /;\s*DELETE/i,
  /xp_/i,
]

function checkForSQLInjection(input) {
  return sqlInjectionPatterns.some(p => p.test(input))
}

function escapeHtml(unsafe) {
  return unsafe.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;')
}

export default function SQLi() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [result, setResult] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const isSQLi = checkForSQLInjection(username) || checkForSQLInjection(password)
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`

    if (isSQLi) {
      setResult({ type:'warning', box:' SQL INJECTION ATTACK DETECTED!', queryLabel:'Detected Query:', query, explanation:`<strong> Analysis:</strong><br>This input contains SQL injection patterns that would bypass authentication in a vulnerable application. The system detected and blocked the attack. In a real vulnerable system, this could grant unauthorized access or expose sensitive data.` })
    } else if (!username.trim() || !password.trim()) {
      setResult({ type:'info', box:' Login failed: Empty username or password', queryLabel:'Query Executed:', query, explanation:`<strong> Info:</strong><br>Valid input format detected, but credentials are invalid. In a real system, this would query the database and return "No matching user found."` })
    } else {
      setResult({ type:'info', box:' Login failed: Invalid credentials', queryLabel:'Query Executed:', query, explanation:`<strong>✓ Safe Input:</strong><br>This input does not contain known SQL injection patterns. The query executed safely, but the credentials don't match any user in the simulated database.` })
    }
  }

  const s = {
    body:{ background:'linear-gradient(135deg,#0a0e27 0%,#1a0f2e 100%)', color:'#ffffff', fontFamily:"'Segoe UI','Courier New',monospace", minHeight:'100vh' },
    header:{ padding:'1.5rem 1rem', borderBottom:'1px solid rgba(0,255,136,0.2)', background:'rgba(10,14,39,0.8)', backdropFilter:'blur(10px)' },
    hdrInner:{ maxWidth:800, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' },
    h1:{ fontSize:'1.8rem', background:'linear-gradient(45deg,#00ff88,#0099ff)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:1 },
    btnBack:{ padding:'0.7rem 1.2rem', background:'rgba(0,255,136,0.1)', color:'#00ff88', border:'1px solid #00ff88', borderRadius:6, textDecoration:'none', fontWeight:600, fontSize:'0.9rem' },
    container:{ maxWidth:800, margin:'2rem auto', padding:'0 1rem' },
    warnBanner:{ background:'linear-gradient(135deg,rgba(255,71,87,0.1),rgba(255,107,107,0.1))', border:'2px solid #ff4757', borderRadius:12, padding:'1.5rem', marginBottom:'2rem', display:'flex', alignItems:'flex-start', gap:'1rem' },
    warnIcon:{ fontSize:'2rem', color:'#ff4757', flexShrink:0 },
    warnH3:{ color:'#ff4757', marginBottom:'0.5rem', fontSize:'1.1rem' },
    warnP:{ color:'#a0a0a0', fontSize:'0.95rem', lineHeight:1.5 },
    grid:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginBottom:'2rem' },
    card:{ background:'#1a1f3a', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'2rem', transition:'all 0.3s' },
    cardH2:{ color:'#00ff88', marginBottom:'1rem', fontSize:'1.4rem' },
    cardP:{ color:'#a0a0a0', lineHeight:1.7, marginBottom:'0.8rem' },
    cardUl:{ marginLeft:'1.5rem', color:'#a0a0a0' },
    cardLi:{ marginBottom:'0.6rem', lineHeight:1.6 },
    training:{ background:'#1a1f3a', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'2rem', marginBottom:'2rem' },
    frmWrap:{ maxWidth:600, margin:'0 auto 2rem' },
    frmGrp:{ marginBottom:'1.5rem' },
    lbl:{ display:'block', marginBottom:'0.7rem', color:'#a0a0a0', fontWeight:600, fontSize:'0.95rem' },
    inp:{ width:'100%', padding:'1rem', background:'rgba(0,255,136,0.05)', border:'1px solid #0099ff', borderRadius:8, color:'#ffffff', fontFamily:"'Courier New',monospace", fontSize:'0.95rem', minHeight:44, outline:'none', boxSizing:'border-box' },
    btn:{ width:'100%', minHeight:44, padding:'0.9rem 1rem', background:'linear-gradient(45deg,#00ff88,#00cc66)', color:'#0a0e27', border:'none', borderRadius:8, fontWeight:600, fontSize:'1rem', cursor:'pointer', textTransform:'uppercase', letterSpacing:1 },
    resultSec:{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:8, padding:'1.5rem', marginTop:'1.5rem' },
    resultBox:{ borderLeft:'4px solid', padding:'1rem', borderRadius:6, fontFamily:"'Courier New',monospace", wordBreak:'break-all', lineHeight:1.6, fontSize:'0.9rem', marginTop:'0.5rem', animation:'slideIn 0.3s ease-out' },
    queryDisplay:{ background:'rgba(0,0,0,0.6)', border:'1px dashed #0099ff', borderRadius:6, padding:'1rem', marginTop:'1rem', fontFamily:"'Courier New',monospace", fontSize:'0.85rem', color:'#0099ff', overflowX:'auto' },
    explanation:{ background:'rgba(0,153,255,0.05)', borderLeft:'4px solid #0099ff', padding:'1rem', borderRadius:6, marginTop:'1.5rem', color:'#a0a0a0', lineHeight:1.6 },
    payloadsTitle:{ color:'#0099ff', marginBottom:'1rem' },
    payloadItem:{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(255,71,87,0.3)', borderRadius:6, padding:'1rem', fontFamily:"'Courier New',monospace", fontSize:'0.85rem', color:'#ff4757', marginBottom:'1rem' },
    payloadLabel:{ color:'#a0a0a0', fontSize:'0.8rem', marginBottom:'0.2rem' },
    codeSection:{ background:'rgba(0,0,0,0.3)', border:'1px dashed #0099ff', borderRadius:8, padding:'1rem', marginTop:'1rem', fontFamily:"'Courier New',monospace", fontSize:'0.85rem', color:'#0099ff', overflowX:'auto' },
  }

  const boxColor = result?.type === 'warning' ? { borderColor:'#ff4757', color:'#ff4757', background:'rgba(0,0,0,0.5)' } : { borderColor:'#0099ff', color:'#0099ff', background:'rgba(0,0,0,0.5)' }

  return (
    <div style={s.body}>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <header style={s.header}>
        <div style={s.hdrInner}>
          <h1 style={s.h1}>SQL Injection Training Simulator</h1>
          <Link to="/" style={s.btnBack}>Back to Labs</Link>
        </div>
      </header>

      <div style={s.container}>
        <div style={s.warnBanner}>
          <span style={s.warnIcon}>⚠</span>
          <div>
            <h3 style={s.warnH3}> Safe Learning Environment</h3>
            <p style={s.warnP}>This is a controlled simulation for educational purposes only. No real database connection is made. All results are simulated to teach how SQL injection works.</p>
          </div>
        </div>

        <div style={s.grid}>
          <div style={s.card}>
            <h2 style={s.cardH2}>What is SQL Injection?</h2>
            <p style={s.cardP}><strong>SQL Injection (SQLi)</strong> is a code injection vulnerability that allows attackers to interfere with database queries.</p>
            <p style={s.cardP}>By inserting malicious SQL code into input fields, attackers can:</p>
            <ul style={s.cardUl}>
              {['Extract sensitive data from databases','Modify or delete database records','Bypass authentication systems','Execute administrative operations','Compromise entire systems'].map(t=><li key={t} style={s.cardLi}>{t}</li>)}
            </ul>
          </div>
          <div style={s.card}>
            <h2 style={s.cardH2}>Why SQL Injection Matters</h2>
            <p style={s.cardP}>SQLi is ranked in the <strong>OWASP Top 10</strong> because:</p>
            <ul style={s.cardUl}>
              {['One of the most common web vulnerabilities','Can affect any application using SQL databases','Often leads to complete data breach','Can escalate to server compromise','Affects millions of users daily','Easy to exploit with automated tools'].map(t=><li key={t} style={s.cardLi}>{t}</li>)}
            </ul>
          </div>
        </div>

        <div style={s.training}>
          <h2 style={s.cardH2}>Interactive SQL Injection Simulation</h2>
          <p style={{ color:'#a0a0a0', marginBottom:'1.5rem' }}>Try logging in. The system will simulate a vulnerable backend that checks for common SQL injection patterns.</p>

          <div style={s.frmWrap}>
            <form onSubmit={handleSubmit}>
              <div style={s.frmGrp}>
                <label htmlFor="username" style={s.lbl}>Username:</label>
                <input id="username" type="text" placeholder="Enter username" autoComplete="off" style={s.inp} value={username} onChange={e=>setUsername(e.target.value)} />
              </div>
              <div style={s.frmGrp}>
                <label htmlFor="password" style={s.lbl}>Password:</label>
                <input id="password" type="text" placeholder="Enter password" autoComplete="off" style={s.inp} value={password} onChange={e=>setPassword(e.target.value)} />
              </div>
              <button type="submit" style={s.btn}>Attempt Login</button>
            </form>
          </div>

          {result && (
            <div style={s.resultSec}>
              <h3 style={{ marginBottom:'1rem', fontSize:'1.1rem' }}>Simulation Result:</h3>
              <div style={{ ...s.resultBox, ...boxColor }}>{result.box}</div>
              <div style={s.queryDisplay}><strong>{result.queryLabel}</strong><br />{escapeHtml(result.query)}</div>
              <div style={s.explanation} dangerouslySetInnerHTML={{ __html: result.explanation }} />
            </div>
          )}

          <div style={{ marginTop:'2.5rem' }}>
            <h3 style={s.payloadsTitle}>Common SQL Injection Payloads to Try:</h3>
            {[
              { label:"Classic Authentication Bypass:", payload:"' OR '1'='1" },
              { label:"Alternative Bypass (Comment Syntax):", payload:"' OR 1=1 --" },
              { label:"UNION-based Injection:", payload:"' UNION SELECT NULL, NULL --" },
              { label:"Time-based Blind SQLi:", payload:"' WAITFOR DELAY '00:00:05' --" },
              { label:"Boolean-based Blind:", payload:"' AND '1'='1" },
            ].map(p=>(
              <div key={p.label} style={s.payloadItem}>
                <div style={s.payloadLabel}>{p.label}</div>
                {p.payload}
              </div>
            ))}
          </div>
        </div>

        <div style={s.grid}>
          <div style={s.card}>
            <h2 style={s.cardH2}>How Attacks Work</h2>
            <p style={s.cardP}><strong>Normal Query:</strong></p>
            <div style={s.codeSection}>SELECT * FROM users<br />WHERE username='admin' AND password='pass123';</div>
            <p style={{ ...s.cardP, marginTop:'1rem' }}><strong>With SQLi Payload:</strong></p>
            <div style={s.codeSection}>SELECT * FROM users<br />WHERE username='' OR '1'='1' AND password='anything';</div>
            <p style={{ marginTop:'1rem', color:'#ff4757' }}>The injected '1'='1' always evaluates to TRUE, bypassing authentication!</p>
          </div>
          <div style={s.card}>
            <h2 style={s.cardH2}>Prevention Strategies</h2>
            <ul style={s.cardUl}>
              {[['Parameterized Queries:','Use prepared statements with placeholders'],['Input Validation:','Whitelist allowed characters and formats'],['Principle of Least Privilege:','Use limited database user accounts'],['Error Handling:',"Don't expose database errors to users"],['WAF Protection:','Use Web Application Firewall'],['Regular Patching:','Keep frameworks and databases updated']].map(([b,t])=><li key={b} style={s.cardLi}><strong>{b}</strong> {t}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ ...s.card, marginBottom:'2rem' }}>
          <h2 style={s.cardH2}>Secure Code Example (Python with Flask)</h2>
          <div style={s.codeSection}>
            #  VULNERABLE CODE<br />
            query = "SELECT * FROM users WHERE username='" + username + "'"<br /><br />
            # ✓ SECURE CODE<br />
            cursor.execute(<br />
            &nbsp;&nbsp;"SELECT * FROM users WHERE username = %s",<br />
            &nbsp;&nbsp;(username,)<br />
            )
          </div>
          <p style={{ color:'#a0a0a0', marginTop:'1rem', fontSize:'0.9rem' }}>Parameterized queries separate SQL code from data, preventing injection.</p>
        </div>

        <div style={s.card}>
          <h2 style={s.cardH2}>Testing Tips</h2>
          <ul style={s.cardUl}>
            {['Try entering a standard username and password first to see "normal" behavior','Then try the common payloads listed above','Observe how the system detects and responds to injection attempts','Notice the difference between simulated vulnerable and protected queries','Study the explanations for each result to understand the attack mechanism'].map(t=><li key={t} style={s.cardLi}>{t}</li>)}
          </ul>
        </div>
      </div>

      <footer style={{ textAlign:'center', padding:'2rem 1rem', color:'#a0a0a0', borderTop:'1px solid rgba(0,255,136,0.2)', marginTop:'3rem', fontSize:'0.85rem' }}>
        <p>© 2026 Cyber Labs | SQL Injection Training Simulation</p>
      </footer>
    </div>
  )
}
