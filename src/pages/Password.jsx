import { useState } from 'react'
import { Link } from 'react-router-dom'

function calculateStrength(password) {
  if (!password) return { score: 0, strength: 'None' }
  const len = password.length
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  if (len < 6) return { score: 20, strength: 'Weak' }
  if (len >= 6 && len <= 10) return { score: 60, strength: 'Medium' }
  if (len > 10 && hasNumber && hasSymbol) return { score: 100, strength: 'Strong' }
  return { score: 75, strength: 'Medium' }
}

const S = {
  body: { background: 'linear-gradient(135deg,#0a0e27 0%,#1a0f2e 100%)', color: '#ffffff', fontFamily: "'Segoe UI','Courier New',monospace", minHeight: '100vh' },
  header: { padding: '1.5rem 1rem', borderBottom: '1px solid rgba(0,255,136,0.2)', background: 'rgba(10,14,39,0.8)', backdropFilter: 'blur(10px)' },
  hdrInner: { maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' },
  h1: { fontSize: '1.8rem', background: 'linear-gradient(45deg,#00ff88,#0099ff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 1 },
  btnBack: { padding: '0.7rem 1.2rem', background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid #00ff88', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' },
  container: { maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' },
  card: { background: '#1a1f3a', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 12, padding: '2rem', marginBottom: '2rem' },
  h2: { color: '#00ff88', marginBottom: '1rem', fontSize: '1.4rem' },
  p: { color: '#a0a0a0', lineHeight: 1.7, marginBottom: '0.8rem' },
  ul: { marginLeft: '1.5rem', color: '#a0a0a0' },
  li: { marginBottom: '0.6rem', lineHeight: 1.6 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' },
  lbl: { display: 'block', marginBottom: '0.7rem', color: '#a0a0a0', fontWeight: 600, fontSize: '0.95rem' },
  inp: { flex: 1, padding: '1rem', background: 'rgba(0,255,136,0.05)', border: '2px solid #0099ff', borderRadius: 8, color: '#ffffff', fontFamily: "'Courier New',monospace", fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' },
  toggleBtn: { padding: '1rem', background: 'rgba(0,255,136,0.05)', border: '2px solid #0099ff', borderLeft: 'none', borderRadius: 8, color: '#00ff88', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 50 },
}

const barColors = { Weak: 'linear-gradient(90deg,#ff4757,#ff4757)', Medium: 'linear-gradient(90deg,#ffa502,#ffa502)', Strong: 'linear-gradient(90deg,#2ed573,#2ed573)' }
const feedbackColors = { Weak: '#ff4757', Medium: '#ffa502', Strong: '#2ed573' }

export default function Password() {
  const [pwd, setPwd] = useState('')
  const [show, setShow] = useState(false)
  const { score, strength } = calculateStrength(pwd)

  const hasNumber = /[0-9]/.test(pwd)
  const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
  const len = pwd.length

  const reqs = [
    { id: 'length', label: '● At least 6 characters', met: len >= 6 },
    { id: 'medium', label: '● 6–10 characters (medium)', met: len >= 6 && len <= 10 },
    { id: 'number', label: '● Contains a number', met: hasNumber },
    { id: 'symbol', label: '● Contains a symbol (!@#$%)', met: hasSymbol },
    { id: 'strong', label: '● 10+ chars with numbers & symbols', met: len > 10 && hasNumber && hasSymbol },
  ]

  let feedbackText = '', checklist = ''
  if (strength === 'Weak') {
    feedbackText = '🚨 This password is too weak. It can be cracked in minutes by modern computers.'
    checklist = 'Add more characters (12+) • Mix uppercase/lowercase • Include numbers and symbols'
  } else if (strength === 'Medium') {
    feedbackText = "⚠️ This password is moderate. It's better than most, but could be stronger."
    checklist = 'Add special symbols (!@#$%^&*) • Make it longer (16+) • Avoid dictionary words'
  } else if (strength === 'Strong') {
    feedbackText = '✓ Excellent! This is a strong password that will resist most attacks.'
    checklist = 'Use unique passwords for each service • Enable MFA • Store in a password manager'
  }

  const tips = [
    ['Use a Password Manager', 'Services like Bitwarden, 1Password, or LastPass securely store strong passwords. Let them generate random passwords for you.'],
    ['Use Unique Passwords', "Never reuse passwords across different services. If one site is breached, attackers can't access your other accounts."],
    ['Make Them Long', 'Longer passwords are exponentially harder to crack. Aim for 12+ characters. Every extra character makes a huge difference.'],
    ["Avoid Personal Info", "Don't use birthdays, names, or addresses. Attackers can find this info on social media and use it to guess passwords."],
    ['Enable Multi-Factor Authentication', 'Even if someone cracks your password, MFA adds a second layer of protection. Use authenticator apps instead of SMS when possible.'],
    ['Change Passwords After Breaches', 'If you hear a service was breached, change your password immediately. Check haveibeenpwned.com to see if your email was exposed.'],
  ]

  return (
    <div style={S.body}>
      <style>{`@keyframes slideIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <header style={S.header}>
        <div style={S.hdrInner}>
          <h1 style={S.h1}>Password Strength Checker</h1>
          <Link to="/" style={S.btnBack}>Back to Labs</Link>
        </div>
      </header>

      <div style={S.container}>
        {/* Info banner */}
        <div style={{ background:'linear-gradient(135deg,rgba(0,255,136,0.1),rgba(0,153,255,0.1))', border:'2px solid #0099ff', borderRadius:12, padding:'1.5rem', marginBottom:'2rem', display:'flex', alignItems:'flex-start', gap:'1rem' }}>
          <span style={{ fontSize:'2rem', color:'#0099ff', flexShrink:0 }}>ℹ</span>
          <div>
            <h3 style={{ color:'#0099ff', marginBottom:'0.5rem', fontSize:'1.1rem' }}>💡 Test Your Password Strength</h3>
            <p style={{ color:'#a0a0a0', fontSize:'0.95rem', lineHeight:1.5 }}>Enter a password to see how strong it is. This tool never stores or sends your data—it's all calculated locally in your browser.</p>
          </div>
        </div>

        <div style={S.grid}>
          <div style={S.card}>
            <h2 style={S.h2}>What is Password Strength?</h2>
            <p style={S.p}><strong>Password strength</strong> measures how resistant a password is to being guessed or cracked by attackers.</p>
            <p style={S.p}>A strong password has:</p>
            <ul style={S.ul}>
              {['Sufficient length (12+ characters ideal)','Mix of uppercase and lowercase letters','Numbers and special symbols','No recognizable words or patterns','Unique across different services'].map(t=><li key={t} style={S.li}>{t}</li>)}
            </ul>
          </div>
          <div style={S.card}>
            <h2 style={S.h2}>Why Strong Passwords Matter</h2>
            <p style={S.p}>Strong passwords protect you from:</p>
            <ul style={S.ul}>
              {[['Brute Force Attacks:','Trying many combinations quickly'],['Dictionary Attacks:','Using common words and passwords'],['Rainbow Tables:','Pre-computed password hashes'],['Social Engineering:','Guessing based on personal info'],['Credential Stuffing:','Using leaked passwords elsewhere']].map(([b,t])=><li key={b} style={S.li}><strong>{b}</strong> {t}</li>)}
            </ul>
          </div>
        </div>

        {/* Checker */}
        <div style={{ ...S.card }}>
          <h2 style={S.h2}>Password Strength Checker</h2>
          <div style={{ marginBottom:'1.5rem' }}>
            <label htmlFor="passwordInput" style={S.lbl}>Enter Password:</label>
            <div style={{ display:'flex', gap:'0.5rem' }}>
              <input id="passwordInput" type={show ? 'text' : 'password'} placeholder="Type your password here..." autoComplete="off" value={pwd} onChange={e=>setPwd(e.target.value)} style={S.inp} />
              <button style={S.toggleBtn} onClick={()=>setShow(s=>!s)} title="Show/Hide Password">{show ? '👁‍🗨' : '👁'}</button>
            </div>
          </div>

          {/* Strength bar */}
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.5rem', fontSize:'0.9rem' }}>
              <span style={{ color:'#a0a0a0' }}>Password Strength:</span>
              <span style={{ fontWeight:600, color: pwd ? feedbackColors[strength] : '#a0a0a0' }}>{pwd ? strength : 'None'}</span>
            </div>
            <div style={{ width:'100%', height:10, background:'rgba(0,0,0,0.3)', borderRadius:10, overflow:'hidden', border:'1px solid rgba(0,255,136,0.2)' }}>
              <div style={{ height:'100%', width: pwd ? `${score}%` : '0%', background: barColors[strength] || barColors.Weak, borderRadius:10, transition:'width 0.3s ease,background 0.3s ease' }} />
            </div>
          </div>

          {/* Feedback */}
          {pwd && (
            <div style={{ padding:'1rem', borderRadius:8, borderLeft:'4px solid', background:'rgba(0,0,0,0.3)', marginBottom:'1.5rem', animation:'slideIn 0.3s ease-out', borderColor: feedbackColors[strength], color: feedbackColors[strength] }}>
              <div style={{ fontWeight:600, marginBottom:'0.5rem' }}>{feedbackText}</div>
              <div style={{ marginTop:'0.8rem', paddingTop:'0.8rem', borderTop:'1px solid currentColor', opacity:0.8, fontSize:'0.85rem' }}>
                <strong>Tips:</strong> {checklist}
              </div>
            </div>
          )}

          {/* Requirements */}
          <div style={{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(0,255,136,0.2)', borderRadius:12, padding:'1.5rem' }}>
            <h3 style={{ color:'#0099ff', marginBottom:'1rem', fontSize:'1.1rem' }}>Requirements Checklist</h3>
            {reqs.map(r => (
              <div key={r.id} style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'0.8rem', padding:'0.8rem', background: r.met ? 'rgba(46,213,115,0.05)' : 'rgba(0,0,0,0.2)', borderRadius:6, borderLeft:`3px solid ${r.met ? '#2ed573' : 'rgba(0,255,136,0.2)'}`, transition:'all 0.3s' }}>
                <span style={{ color: r.met ? '#2ed573' : '#a0a0a0', fontSize:'0.9rem' }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div style={S.card}>
          <h2 style={S.h2}>Password Examples</h2>
          {[
            { head:'❌ Weak Passwords', items:[['123456','Only numbers, too short','weak'],['password','Dictionary word, very common','weak'],['qwerty123','Keyboard pattern, predictable','weak']] },
            { head:'⚠️ Medium Passwords', items:[['John1990','Personal info, lacks symbols','medium'],['MySecurePass','Good length, but no numbers or symbols','medium']] },
            { head:'✓ Strong Passwords', items:[['Tr0pic@lThund3r$torm!','Long, mixed case, numbers, symbols','strong'],['P@ssw0rd#Encrypt&Safe99','Complex mix of all character types','strong']] },
          ].map(group=>(
            <div key={group.head} style={{ marginBottom:'1.5rem' }}>
              <h3 style={{ color:'#ffffff', marginBottom:'0.5rem', fontSize:'1rem' }}>{group.head}</h3>
              {group.items.map(([pw,reason,cls])=>(
                <div key={pw}>
                  <div style={{ background:'rgba(0,0,0,0.4)', borderLeft:`4px solid ${cls==='weak'?'#ff4757':cls==='medium'?'#ffa502':'#2ed573'}`, padding:'0.8rem', borderRadius:4, fontFamily:"'Courier New',monospace", fontSize:'0.9rem', color:cls==='weak'?'#ff4757':cls==='medium'?'#ffa502':'#2ed573', marginBottom:'0.3rem' }}>{pw}</div>
                  <div style={{ color:'#a0a0a0', fontSize:'0.85rem', fontStyle:'italic', marginBottom:'0.8rem' }}>{reason}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div style={S.card}>
          <h2 style={S.h2}>Password Best Practices</h2>
          {tips.map(([title,desc],i)=>(
            <div key={title} style={{ display:'flex', gap:'1rem', marginBottom:'1rem' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:40, height:40, background:'linear-gradient(45deg,#00ff88,#0099ff)', borderRadius:'50%', flexShrink:0, fontWeight:700, color:'#0a0e27' }}>{i+1}</div>
              <div>
                <h3 style={{ color:'#ffffff', marginBottom:'0.3rem' }}>{title}</h3>
                <p style={{ color:'#a0a0a0', fontSize:'0.9rem', lineHeight:1.5 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign:'center', padding:'2rem 1rem', color:'#a0a0a0', borderTop:'1px solid rgba(0,255,136,0.2)', marginTop:'3rem', fontSize:'0.85rem' }}>
        <p>© 2026 Cyber Labs | Password Strength Training</p>
      </footer>
    </div>
  )
}
