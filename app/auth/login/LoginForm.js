'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 10, boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#e2e8f0', fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
};

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (err) {
      setError('ورود ناموفق. ایمیل یا رمز عبور اشتباه است.');
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#020617',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-vazirmatn, sans-serif)',
    }}>
      {/* Ambient blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #9d00ff 0%, transparent 65%)', filter: 'blur(100px)', opacity: 0.15 }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #00f3ff 0%, transparent 65%)', filter: 'blur(80px)', opacity: 0.12 }} />
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 420, margin: '0 16px',
        background: 'rgba(6,12,40,0.85)', border: '1px solid rgba(0,243,255,0.12)',
        backdropFilter: 'blur(28px)', borderRadius: 20, padding: 40,
        boxShadow: '0 0 80px rgba(0,243,255,0.04)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12, margin: '0 auto 12px',
            background: '#00f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 900, color: '#020617', fontFamily: 'monospace',
          }}>MA</div>
          <h1 style={{ color: '#e2e8f0', fontSize: 20, fontWeight: 800, margin: 0, marginBottom: 4 }}>
            پنل مدیریت
          </h1>
          <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>با حساب کاربری خود وارد شوید</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              ایمیل
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@ahmadi98.ir"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(0,243,255,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              رمز عبور
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="حداقل ۱۲ کاراکتر"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'rgba(0,243,255,0.4)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>

          {error && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,59,59,0.08)', border: '1px solid rgba(255,59,59,0.15)', color: '#f87171', fontSize: 13 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 4, padding: '13px', borderRadius: 10, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? 'rgba(0,243,255,0.5)' : '#00f3ff',
              color: '#020617', fontWeight: 800, fontSize: 14,
              boxShadow: loading ? 'none' : '0 0 20px rgba(0,243,255,0.3)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'در حال ورود…' : 'ورود به سیستم'}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
          <a href="/" style={{ color: '#475569', fontSize: 12, textDecoration: 'none' }}>← بازگشت به سایت</a>
        </div>
      </div>
    </div>
  );
}
