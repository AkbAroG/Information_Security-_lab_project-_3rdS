import { useState } from 'react'
import { Link } from 'react-router-dom'

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;')
}

const S = {
  body:{ background:'linear-gradient(135deg,#0a0e27 0%,#1a0f2e 100%)', color:'#ffffff', fontFamily:"'Segoe UI','Courier New',monospace", minHeight:'100vh' },
  header:{ padding:'1.5rem 1rem', borderBottom:'1px solid rgba(0,255,136,0.2)', background:'rgba(10,14,39,0.8)', backdropFilter:'blur(10px)' },
  hdrInner:{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' },
  h1:{ fontSize:'1.8rem', background:'linear-gradient(45deg,#00ff88,#0099ff)', WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', letterSpacing:1 },
  btnBack:{ padding:'0.7rem 1.2rem', background:'rgba(0,255,136,0.1)', color:'#00ff88', border:'1px solid #00ff88', borderRadius:6, textDecoration:'none', fontWeight:600, fontSize:'0.9rem' },
  container:{ maxWidth:1200, margin:'2rem auto', padding:'0 1rem' },
  warnBanner:{ background:'linear-gradient(135deg,rgba(255,71,87,0.1),rgba(255,107,107,0.1))', border:'2px solid #ff4757', borderRadius:12, padding:'1.5rem', marginBottom:'2rem', display:'flex', alignItems:'flex-start', gap:'1rem' },
  training:{ background:'#1a1f3a', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'2rem', marginBottom:'2rem' },
  card:{ background:'#1a1f3a', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'2rem' },
  grid:{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem', marginBottom:'2rem' },
  lbl:{ display:'block', marginBottom:'0.7rem', color:'#a0a0a0', fontWeight:600, fontSize:'0.95rem' },
  inp:{ width:'100%', padding:'1rem', background:'rgba(0,255,136,0.05)', border:'1px solid #0099ff', borderRadius:8, color:'#ffffff', fontFamily:"'Courier New',monospace", fontSize:'0.95rem', outline:'none', boxSizing:'border-box', marginBottom:'1.5rem' },
  inpFocus:{ borderColor:'#00ff88', boxShadow:'0 0 15px rgba(0,255,136,0.3)', background:'rgba(0,255,136,0.1)' },
  outSec:{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:8, padding:'1.5rem', marginTop:'1.5rem' },
  outDisplay:{ background:'rgba(0,0,0,0.5)', borderLeft:'3px solid #00ff88', padding:'1rem', borderRadius:6, fontFamily:"'Courier New',monospace", wordBreak:'break-all', color:'#00ff88', minHeight:50, fontSize:'0.9rem', lineHeight:1.5 },
  codeSection:{ background:'rgba(0,0,0,0.3)', border:'1px dashed #0099ff', borderRadius:8, padding:'1rem', marginTop:'1rem', fontFamily:"'Courier New',monospace", fontSize:'0.85rem', color:'#0099ff', overflowX:'auto' },
  explanation:{ background:'rgba(0,153,255,0.05)', borderLeft:'4px solid #0099ff', padding:'1rem', borderRadius:6, marginTop:'1.5rem', color:'#a0a0a0', lineHeight:1.6 },
  ul:{ marginLeft:'1.5rem', color:'#a0a0a0' },
  li:{ marginBottom:'0.6rem', lineHeight:1.6 },
  h2:{ color:'#00ff88', marginBottom:'1rem', fontSize:'1.4rem' },
  p:{ color:'#a0a0a0', lineHeight:1.7, marginBottom:'0.8rem' },
}

export default function XSS() {
  const [input, setInput] = useState('')

  const encoded = input
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#039;')

  return (
    <div style={S.body}>
      <header style={S.header}>
        <div style={S.hdrInner}>
          <h1 style={S.h1}>XSS Training Simulator</h1>
          <Link to="/" style={S.btnBack}>Back to Labs</Link>
        </div>
      </header>

      <div style={S.container}>
        <div style={S.warnBanner}>
          <span style={{ fontSize:'2rem', color:'#ff4757', flexShrink:0 }}>⚠</span>
          <div>
            <h3 style={{ color:'#ff4757', marginBottom:'0.5rem', fontSize:'1.1rem' }}> Safe Learning Environment</h3>
            <p style={{ color:'#a0a0a0', fontSize:'0.95rem', lineHeight:1.5 }}>This is a controlled simulation for educational purposes only. All inputs are displayed safely without execution to prevent harm.</p>
          </div>
        </div>

        <div style={S.grid}>
          <div style={S.card}>
            <h2 style={S.h2}>What is XSS?</h2>
            <p style={S.p}><strong>Cross-Site Scripting (XSS)</strong> is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users.</p>
            <p style={S.p}>When a website improperly handles user input, an attacker can inject JavaScript code that gets executed in the victim's browser.</p>
            <ul style={S.ul}>{['Takes control of user sessions','Steals sensitive information','Performs unwanted actions','Spreads malware'].map(t=><li key={t} style={S.li}>{t}</li>)}</ul>
          </div>
          <div style={S.card}>
            <h2 style={S.h2}>Why XSS Matters</h2>
            <p style={S.p}>XSS is one of the <strong>OWASP Top 10</strong> vulnerabilities because it:</p>
            <ul style={S.ul}>{['Is extremely common in web applications','Can affect millions of users simultaneously','Allows complete user account compromise','Can be exploited remotely with no authentication','Is relatively easy to exploit for attackers'].map(t=><li key={t} style={S.li}>{t}</li>)}</ul>
          </div>
        </div>

        <div style={S.training}>
          <h2 style={S.h2}>Interactive XSS Simulation</h2>
          <p style={{ ...S.p, marginBottom:'1.5rem' }}>Try typing various inputs below. Notice how the output is displayed safely without executing any scripts:</p>

          <div style={{ marginBottom:'1.5rem' }}>
            <label htmlFor="xss-input" style={S.lbl}>Try Input (Type your test input here):</label>
            <input
              id="xss-input" type="text"
              placeholder="Examples: <script>alert('test')</script> or <img src=x onerror='alert(1)'>"
              autoComplete="off"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={S.inp}
            />
          </div>

          <div style={S.outSec}>
            <h3 style={{ color:'#0099ff', marginBottom:'1rem', fontSize:'1rem' }}>Raw Text Output (Safe Display):</h3>
            <div style={{ ...S.outDisplay, color: input ? '#00ff88' : '#a0a0a0' }}>
              {input || '< Your input will appear here >'}
            </div>
            <p style={{ color:'#a0a0a0', fontSize:'0.85rem', marginTop:'0.5rem' }}>✓ Scripts are displayed as text, not executed</p>
          </div>

          <div style={S.outSec}>
            <h3 style={{ color:'#0099ff', marginBottom:'1rem', fontSize:'1rem' }}>HTML Encoded (What the browser sees):</h3>
            <div style={S.codeSection}>{input ? encoded : '<-- Type above to see encoding -->'}</div>
          </div>

          <div style={S.explanation}>
            <strong> Why is this safe?</strong><br />
            We use <code>textContent</code> instead of <code>innerHTML</code>. This prevents the browser from interpreting any HTML or JavaScript tags. The dangerous code is displayed as plain text instead of being executed. This is one of the primary defenses against XSS attacks.
          </div>
        </div>

        <div style={{ ...S.card, marginBottom:'2rem' }}>
          <h2 style={S.h2}>Try These Examples:</h2>
          <ul style={S.ul}>
            {[
              ["<script>alert('XSS')</script>","Script injection"],
              ['<img src=x onerror="alert(1)">','Event handler injection'],
              ["<svg onload=\"alert('vulnerable')\">","SVG injection"],
              ["javascript:alert('XSS')","JavaScript protocol"],
              ['<iframe src="javascript:alert(1)">','Iframe injection'],
            ].map(([code,desc])=>(
              <li key={code} style={S.li}><code>{code}</code> - {desc}</li>
            ))}
          </ul>
          <p style={{ color:'#a0a0a0', marginTop:'1rem', fontSize:'0.9rem' }}>In a real vulnerable application, these would execute. Here, they're shown safely as text.</p>
        </div>

        <div style={S.grid}>
          <div style={S.card}>
            <h2 style={S.h2}>How to Prevent XSS</h2>
            <ul style={S.ul}>{[['Input Validation:','Validate and sanitize all user inputs'],['Output Encoding:','Encode data before displaying it'],['Content Security Policy (CSP):','Restrict script execution'],['Use Frameworks:','Modern frameworks handle escaping automatically'],['X-XSS-Protection Header:','Enable browser protections']].map(([b,t])=><li key={b} style={S.li}><strong>{b}</strong> {t}</li>)}</ul>
          </div>
          <div style={S.card}>
            <h2 style={S.h2}>Types of XSS</h2>
            <ul style={S.ul}>{[['Stored XSS:','Malicious code stored in database and served to all users'],['Reflected XSS:','Malicious code in URL, reflected back to user'],['DOM-based XSS:','Vulnerability in client-side JavaScript code'],['Blind XSS:','Injection without immediate feedback']].map(([b,t])=><li key={b} style={S.li}><strong>{b}</strong> {t}</li>)}</ul>
          </div>
        </div>
      </div>

      <footer style={{ textAlign:'center', padding:'2rem 1rem', color:'#a0a0a0', borderTop:'1px solid rgba(0,255,136,0.2)', marginTop:'3rem', fontSize:'0.85rem' }}>
        <p>© 2026 Cyber Labs | XSS Training Simulation</p>
      </footer>
    </div>
  )
}
