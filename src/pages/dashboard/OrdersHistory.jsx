import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';

export default function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('orders', { auth: true }).then((data) => {
      setOrders(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="card overflow-x-auto">
      <h3 className="font-bold text-slate-900 mb-4">আমার সকল অর্ডার</h3>
      {loading ? (
        <p className="text-slate-400 text-sm">লোড হচ্ছে...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-400 text-sm">কোনো অর্ডার পাওয়া যায়নি।</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="py-3 pr-4">অর্ডার নং</th>
              <th className="py-3 pr-4">প্যাকেজ</th>
              <th className="py-3 pr-4">পেমেন্ট মাধ্যম</th>
              <th className="py-3 pr-4">ট্রানজেকশন আইডি</th>
              <th className="py-3 pr-4">পরিমাণ</th>
              <th className="py-3 pr-4">স্ট্যাটাস</th>
              <th className="py-3">তারিখ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 pr-4 font-bold text-slate-800">{o.order_no}</td>
                <td className="py-3 pr-4">{o.package_name}</td>
                <td className="py-3 pr-4">{o.payment_method}</td>
                <td className="py-3 pr-4 font-mono">{o.transaction_id}</td>
                <td className="py-3 pr-4">{o.amount} ৳</td>
                <td className="py-3 pr-4"><Badge status={o.status} /></td>
                <td className="py-3 text-slate-400">{o.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}