import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(null);
  const [note, setNote] = useState('');
  const [maxDevices, setMaxDevices] = useState(1);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('manage/orders', { auth: true }).then((data) => setOrders(data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openReview = (order) => {
    setReviewing(order);
    setNote('');
    setMaxDevices(order.max_devices || 1);
  };

  const act = async (status) => {
    setBusy(true);
    try {
      await api.post(`manage/orders/${reviewing.id}`, { status, admin_note: note, max_devices: maxDevices }, { auth: true });
      setReviewing(null);
      load();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card overflow-x-auto">
      <h3 className="font-bold text-slate-900 mb-4">সকল অর্ডার</h3>
      {loading ? <p className="text-slate-400 text-sm">লোড হচ্ছে...</p> : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="py-3 pr-4">অর্ডার নং</th>
              <th className="py-3 pr-4">গ্রাহক</th>
              <th className="py-3 pr-4">প্যাকেজ</th>
              <th className="py-3 pr-4">পেমেন্ট</th>
              <th className="py-3 pr-4">Trx ID</th>
              <th className="py-3 pr-4">স্ট্যাটাস</th>
              <th className="py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 pr-4 font-bold">{o.order_no}</td>
                <td className="py-3 pr-4">{o.name}<br /><span className="text-xs text-slate-400">{o.email}</span></td>
                <td className="py-3 pr-4">{o.package_name}</td>
                <td className="py-3 pr-4">{o.payment_method}</td>
                <td className="py-3 pr-4 font-mono">{o.transaction_id}</td>
                <td className="py-3 pr-4"><Badge status={o.status} /></td>
                <td className="py-3">
                  <button onClick={() => openReview(o)} className="text-brand-600 font-semibold text-xs">পর্যালোচনা</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal open={!!reviewing} onClose={() => setReviewing(null)} title={`অর্ডার পর্যালোচনা — ${reviewing?.order_no}`}>
        {reviewing && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-3">
              <p><span className="text-slate-400">নাম:</span> {reviewing.name}</p>
              <p><span className="text-slate-400">প্রতিষ্ঠান:</span> {reviewing.institute_name}</p>
              <p><span className="text-slate-400">ফোন:</span> {reviewing.phone}</p>
              <p><span className="text-slate-400">ইমেইল:</span> {reviewing.email}</p>
              <p><span className="text-slate-400">পেমেন্ট:</span> {reviewing.payment_method}</p>
              <p><span className="text-slate-400">Trx ID:</span> {reviewing.transaction_id}</p>
              <p><span className="text-slate-400">প্যাকেজ:</span> {reviewing.package_name}</p>
              <p><span className="text-slate-400">পরিমাণ:</span> {reviewing.amount} ৳</p>
            </div>
            <div>
              <label className="label-field">ম্যাক্স ডিভাইস সংখ্যা (লাইসেন্সের জন্য)</label>
              <input type="number" min={1} className="input-field" value={maxDevices} onChange={(e) => setMaxDevices(e.target.value)} />
            </div>
            <div>
              <label className="label-field">অ্যাডমিন নোট</label>
              <textarea className="input-field" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <button disabled={busy} onClick={() => act('confirmed')} className="btn-primary flex-1">✅ অনুমোদন ও লাইসেন্স ইস্যু</button>
              <button disabled={busy} onClick={() => act('rejected')} className="btn bg-red-500 text-white flex-1">❌ বাতিল করুন</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}