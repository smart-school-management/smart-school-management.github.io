import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    api.get('admin/settings', { auth: true }).then((data) => setSettings(data || {})).finally(() => setLoading(false));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await api.put('admin/settings', settings, { auth: true });
      setStatus({ ok: true, msg: 'সেটিংস সংরক্ষিত হয়েছে।' });
    } catch (err) {
      setStatus({ ok: false, msg: err.message });
    }
  };

  if (loading) return <p className="text-slate-400">লোড হচ্ছে...</p>;

  const fields = [
    ['support_phone', 'সাপোর্ট ফোন/হোয়াটসঅ্যাপ নম্বর'],
    ['bkash_number', 'bKash নম্বর'],
    ['rocket_number', 'Rocket নম্বর'],
    ['nagad_number', 'Nagad নম্বর'],
    ['bank_details', 'ব্যাংক একাউন্ট তথ্য'],
    ['support_email', 'সাপোর্ট ইমেইল']
  ];

  return (
    <form onSubmit={save} className="card max-w-2xl space-y-4">
      <h3 className="font-bold text-slate-900">সাইট সেটিংস</h3>
      {fields.map(([key, label]) => (
        <div key={key}>
          <label className="label-field">{label}</label>
          <input className="input-field" value={settings[key] || ''} onChange={(e) => setSettings({ ...settings, [key]: e.target.value })} />
        </div>
      ))}
      {status && <p className={`text-sm font-semibold ${status.ok ? 'text-accent-600' : 'text-red-500'}`}>{status.msg}</p>}
      <button className="btn-primary w-full">সংরক্ষণ করুন</button>
    </form>
  );
}