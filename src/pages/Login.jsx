import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEnvelope, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import Logo from '@/components/ui/Logo';
import { useAuth, ApiError } from '@/context/AuthContext';
import { APP_NAME } from '@/config';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=>{
    document.title = `লগিন | স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম | Smart School Management System`;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(form.email.trim(), form.password);
      navigate(user.role === 'admin' ? '/manage' : '/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'লগইন ব্যর্থ হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <Logo width={48} height={48}/>
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h1 className="text-2xl font-extrabold text-slate-900 text-center">{APP_NAME}</h1>
          <p className="text-center text-slate-500 mt-1 text-sm">আপনার একাউন্টে লগইন করুন</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="label-field">ইমেইল</label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div>
              <label className="label-field">পাসওয়ার্ড</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                  {showPass ? <HiOutlineEyeSlash /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            একাউন্ট নেই? <Link to="/buy" className="text-brand-600 font-bold">সফটওয়্যার কিনুন</Link>
          </p>
          <p className="text-center text-sm mt-2">
            <Link to="/" className="text-slate-400 hover:text-slate-600">← হোম পেইজে ফিরে যান</Link>
          </p>
        </div>
      </div>
    </div>
  );
}