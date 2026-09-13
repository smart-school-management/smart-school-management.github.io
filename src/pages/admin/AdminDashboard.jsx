import React, { useEffect, useState } from 'react';
import { HiOutlineClipboardList } from 'react-icons/hi';
import { HiOutlineUsers, HiOutlineKey, HiOutlineBanknotes } from 'react-icons/hi2';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('admin/dashboard', { auth: true }).then(setStats).catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card icon={HiOutlineUsers} label="মোট ব্যবহারকারী" value={stats?.total_users ?? '—'} color="brand" />
        <Card icon={HiOutlineClipboardList} label="পেন্ডিং অর্ডার" value={stats?.pending_orders ?? '—'} color="yellow" />
        <Card icon={HiOutlineKey} label="সক্রিয় লাইসেন্স" value={stats?.active_licenses ?? '—'} color="accent" />
        <Card icon={HiOutlineBanknotes} label="মোট আয় (নিশ্চিত)" value={`${stats?.total_revenue ?? 0} ৳`} color="purple" />
      </div>

      <div className="card overflow-x-auto">
        <h3 className="font-bold text-slate-900 mb-4">সাম্প্রতিক অর্ডারসমূহ</h3>
        {!stats?.recent_orders?.length ? (
          <p className="text-slate-400 text-sm">কোনো অর্ডার নেই।</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="py-3 pr-4">অর্ডার নং</th>
                <th className="py-3 pr-4">গ্রাহক</th>
                <th className="py-3 pr-4">প্যাকেজ</th>
                <th className="py-3 pr-4">পরিমাণ</th>
                <th className="py-3">স্ট্যাটাস</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent_orders.map((o) => (
                <tr key={o.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4 font-bold">{o.order_no}</td>
                  <td className="py-3 pr-4">{o.name}</td>
                  <td className="py-3 pr-4">{o.package_name}</td>
                  <td className="py-3 pr-4">{o.amount} ৳</td>
                  <td className="py-3"><Badge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value, color }) {
  const colors = { brand: 'from-brand-500 to-brand-700', accent: 'from-accent-500 to-accent-600', purple: 'from-purple-500 to-purple-700', yellow: 'from-yellow-500 to-yellow-600' };
  return (
    <div className="card flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors[color]} text-white flex items-center justify-center text-xl shrink-0`}><Icon /></div>
      <div>
        <p className="text-xs text-slate-400 font-semibold">{label}</p>
        <p className="text-xl font-extrabold text-slate-900">{value}</p>
      </div>
    </div>
  );
}