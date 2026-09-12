import React, { useEffect, useState } from 'react';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi2';
import { api } from '@/api/client';
import Modal from '@/components/ui/Modal';

const empty = { name: '', slug: '', price: '', period: '/ বছর', max_devices: 1, is_popular: 0, is_active: 1, features: '' };

export default function AdminPackages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    api.get('admin/packages', { auth: true }).then((data) => setPackages(data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openNew = () => setEditing({ ...empty });
  const openEdit = (pkg) => setEditing({ ...pkg, features: (pkg.features || []).join('\n') });

  const save = async (e) => {
    e.preventDefault();
    const payload = { ...editing, features: editing.features.split('\n').map((f) => f.trim()).filter(Boolean) };
    if (editing.id) await api.put(`admin/packages/${editing.id}`, payload, { auth: true });
    else await api.post('admin/packages', payload, { auth: true });
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    if (!confirm('প্যাকেজটি মুছে ফেলতে চান?')) return;
    await api.del(`admin/packages/${id}`, { auth: true });
    load();
  };

  return (
    <div className="card overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">প্যাকেজ ব্যবস্থাপনা</h3>
        <button onClick={openNew} className="btn-primary !py-2"><HiOutlinePlus /> নতুন প্যাকেজ</button>
      </div>

      {loading ? <p className="text-slate-400 text-sm">লোড হচ্ছে...</p> : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="py-3 pr-4">নাম</th>
              <th className="py-3 pr-4">মূল্য</th>
              <th className="py-3 pr-4">ম্যাক্স ডিভাইস</th>
              <th className="py-3 pr-4">জনপ্রিয়</th>
              <th className="py-3 pr-4">সক্রিয়</th>
              <th className="py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 pr-4 font-bold">{p.name}</td>
                <td className="py-3 pr-4">{p.price} {p.period}</td>
                <td className="py-3 pr-4">{p.max_devices}</td>
                <td className="py-3 pr-4">{p.is_popular ? '✅' : '—'}</td>
                <td className="py-3 pr-4">{p.is_active ? '✅' : '❌'}</td>
                <td className="py-3 space-x-3">
                  <button onClick={() => openEdit(p)} className="text-brand-600"><HiOutlinePencil /></button>
                  <button onClick={() => remove(p.id)} className="text-red-500"><HiOutlineTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'প্যাকেজ সম্পাদনা' : 'নতুন প্যাকেজ'} wide>
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="label-field">নাম</label><input required className="input-field" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><label className="label-field">স্লাগ</label><input required className="input-field" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></div>
              <div><label className="label-field">মূল্য (৳)</label><input required className="input-field" value={editing.price} onChange={(e) => setEditing({ ...editing, price: e.target.value })} /></div>
              <div><label className="label-field">সময়কাল</label><input className="input-field" value={editing.period} onChange={(e) => setEditing({ ...editing, period: e.target.value })} /></div>
              <div><label className="label-field">ম্যাক্স ডিভাইস</label><input type="number" min={1} className="input-field" value={editing.max_devices} onChange={(e) => setEditing({ ...editing, max_devices: e.target.value })} /></div>
              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={!!editing.is_popular} onChange={(e) => setEditing({ ...editing, is_popular: e.target.checked ? 1 : 0 })} /> জনপ্রিয়</label>
                <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" checked={!!editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked ? 1 : 0 })} /> সক্রিয়</label>
              </div>
            </div>
            <div>
              <label className="label-field">ফিচার তালিকা (প্রতি লাইনে একটি)</label>
              <textarea rows={6} className="input-field" value={editing.features} onChange={(e) => setEditing({ ...editing, features: e.target.value })} />
            </div>
            <button className="btn-primary w-full">সংরক্ষণ করুন</button>
          </form>
        )}
      </Modal>
    </div>
  );
}
