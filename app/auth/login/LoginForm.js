'use client';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const LoginForm = () => {
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
      setError('ورود ناموفق. اطلاعات را بررسی کنید.');
    } else {
      window.location.href = '/admin';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? '...' : 'Login'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
