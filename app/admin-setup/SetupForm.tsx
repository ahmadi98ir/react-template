'use client';
import { useState } from 'react';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 16px', borderRadius: 10, boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
  color: '#e2e8f0', fontSize: 14, outline: 'none', transition: 'border-color 0.2s',
};

export default function SetupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 12) {
      setError('رمز عبور باید حداقل ۱۲ کاراکتر باشد.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'خطا در ایجاد حساب.');
      } else {
        setDone(true);
      }
    } catch {
      setError('خطای شبکه. دوباره تلاش کنید.');
    } finally {
      setLoading(false);
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
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, #9d00ff 0%, transparent 65%)', filter: 'blur(100px)', opacity: 0.15 }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #00f3ff 0%, transparent 65%)', filter: 'blur(80px)', opacity: 0.12 }} />
      </div>

      <div style={{
        position: 'relative', width: '100%', maxWidth: 440, margin: '0 16px',
        background: 'rgba(6,12,40,0.9)', border: '1px solid rgba(0,243,255,0.15)',
        backdropFilter: 'blur(28px)', borderRadius: 20, padding: 40,
        boxShadow: '0 0 80px rgba(0,243,255,0.05)',
      }}>
        {done ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <h2 style={{ color: '#00f3ff', fontSize: 20, fontWeight: 800, marginBottom: 8, marginTop: 0 }}>
              حساب ادمین ایجاد شد!
            </h2>
            <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>
              اکنون می‌توانید با ایمیل <strong style={{ color: '#94a3b8' }}>{email}</strong> وارد شوید.
            </p>
            <a href="/auth/login" style={{
              display: 'inline-block', padding: '12px 32px', borderRadius: 10,
              background: '#00f3ff', color: '#020617', fontWeight: 800, fontSize: 14,
              textDecoration: 'none', boxShadow: '0 0 20px rgba(0,243,255,0.3)',
            }}>
              رفتن به صفحه ورود →
            </a>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12, margin: '0 auto 12px',
                background: 'linear-gradient(135deg,#9d00ff,#00f3ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>⚙️</div>
              <h1 style={{ color: '#e2e8f0', fontSize: 20, fontWeight: 800, margin: 0, marginBottom: 6 }}>
                راه‌اندازی اولیه
              </h1>
              <p style={{ color: '#475569', fontSize: 13, margin: 0 }}>
                اولین حساب ادمین را ایجاد کنید
              </p>
            </div>

            <div style={{
              padding: '10px 14px', borderRadius: 8, marginBottom: 24,
              background: 'rgba(157,0,255,0.08)', border: '1px solid rgba(157,0,255,0.2)',
              color: '#a78bfa', fontSize: 12,
            }}>
              ⚠️ این صفحه فقط یک بار در دسترس است. بعد از ایجاد حساب، غیرفعال می‌شود.
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  نام
                </label>
                <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="مهدی احمدی"
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,243,255,0.4)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ایمیل *
                </label>
                <input type="email" required style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@ahmadi98.ir"
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,243,255,0.4)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'} />
              </div>
              <div>
                <label style={{ display: 'block', color: '#64748b', fontSize: 11, fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  رمز عبور * <span style={{ color: '#334155', fontWeight: 400, textTransform: 'none' }}>(حداقل ۱۲ کاراکتر)</span>
                </label>
                <input type="password" required style={inputStyle} value={password} onChange={e => setPassword(e.target.value)} placeholder="حداقل ۱۲ کاراکتر قوی"
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(0,243,255,0.4)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'} />
                {password.length > 0 && (
                  <div style={{ marginTop: 6, display: 'flex', gap: 4 }}>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} style={{
                        flex: 1, height: 3, borderRadius: 2,
                        background: password.length >= (i + 1) * 3
                          ? (password.length < 12 ? '#f59e0b' : '#00f3ff')
                          : 'rgba(255,255,255,0.06)',
                        transition: 'background 0.2s',
                      }} />
                    ))}
                  </div>
                )}
              </div>

              {error && (
                <div style={{ padding: '10px 14px', borderRadius: 8, background: 'rgba(255,59,59,0.08)', border: '1px solid rgba(255,59,59,0.15)', color: '#f87171', fontSize: 13 }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading} style={{
                marginTop: 4, padding: '13px', borderRadius: 10, border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                background: loading ? 'rgba(0,243,255,0.4)' : '#00f3ff',
                color: '#020617', fontWeight: 800, fontSize: 14,
                boxShadow: loading ? 'none' : '0 0 20px rgba(0,243,255,0.3)',
                transition: 'all 0.2s',
              }}>
                {loading ? 'در حال ایجاد…' : 'ایجاد حساب ادمین'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
