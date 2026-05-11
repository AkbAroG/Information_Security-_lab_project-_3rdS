import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SQLi from './pages/SQLi'
import XSS from './pages/XSS'
import CSRF from './pages/CSRF'
import IDOR from './pages/IDOR'
import Password from './pages/Password'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sqli" element={<SQLi />} />
      <Route path="/xss" element={<XSS />} />
      <Route path="/csrf" element={<CSRF />} />
      <Route path="/idor" element={<IDOR />} />
      <Route path="/password" element={<Password />} />
    </Routes>
  )
}
