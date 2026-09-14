import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`admin/users${q ? `?q=${encodeURIComponent(q)}` : ''}`, { auth: true })
      .then((data) => setUsers(data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const onSearch = (e) => { e.preventDefault(); load(); };

  const saveUser = async (e) => {
    e.preventDefault();
    await api.post(`admin/users/${editing.id}`, editing, { auth: true });
    setEditing(null);
    load();
  };

  return (
    <div className="card overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-bold text-slate-900">ব্যবহারকারী তালিকা</h3>
        <form onSubmit={onSearch} className="flex gap-2">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="নাম/ইমেইল খুঁজুন..." className="input-field !py-2 w-56" />
          <button className="btn-outline !py-2">খুঁজুন</button>
        </form>
      </div>

      {loading ? <p className="text-slate-400 text-sm">লোড হচ্ছে...</p> : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="py-3 pr-4">নাম</th>
              <th className="py-3 pr-4">ইমেইল</th>
              <th className="py-3 pr-4">প্রতিষ্ঠান</th>
              <th className="py-3 pr-4">রোল</th>
              <th className="py-3 pr-4">স্ট্যাটাস</th>
              <th className="py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 pr-4 font-bold">{u.name}</td>
                <td className="py-3 pr-4">{u.email}</td>
                <td className="py-3 pr-4">{u.institute_name}</td>
                <td className="py-3 pr-4"><Badge status={u.role} /></td>
                <td className="py-3 pr-4"><Badge status={u.status} /></td>
                <td className="py-3">
                  <button onClick={() => setEditing({ ...u })} className="text-brand-600 font-semibold text-xs">সম্পাদনা</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title="ব্যবহারকারী সম্পাদনা">
        {editing && (
          <form onSubmit={saveUser} className="space-y-4">
            <div>
              <label className="label-field">নাম</label>
              <input className="input-field" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
            </div>
            <div>
              <label className="label-field">স্ট্যাটাস</label>
              <select className="input-field" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                <option value="active">সক্রিয়</option>
                <option value="pending">পেন্ডিং</option>
                <option value="suspended">সাসপেন্ড</option>
              </select>
            </div>
            <div>
              <label className="label-field">রোল</label>
              <select className="input-field" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })}>
                <option value="user">ইউজার</option>
                <option value="admin">অ্যাডমিন</option>
              </select>
            </div>
            <button className="btn-primary w-full">সংরক্ষণ করুন</button>
          </form>
        )}
      </Modal>
    </div>
  );
}