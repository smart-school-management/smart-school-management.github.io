import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineKey, HiOutlineDeviceTablet, HiOutlineClipboardList, HiOutlineCalendar } from 'react-icons/hi2';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';

export default function DashboardHome() {
  const { user } = useAuth();
  const [licenses, setLicenses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('license', { auth: true }).catch(() => []),
      api.get('orders', { auth: true }).catch(() => [])
    ]).then(([lic, ord]) => {
      setLicenses(lic || []);
      setOrders(ord || []);
      setLoading(false);
    });
  }, []);

  const activeLicense = licenses.find((l) => l.status === 'active');
  const totalDevices = activeLicense ? activeLicense.devices?.length || 0 : 0;
  const maxDevices = activeLicense?.max_devices || 0;

  return (
    <div className="space-y-6">
      <div className="card bg-cta-gradient text-white">
        <h2 className="text-xl font-extrabold">স্বাগতম, {user?.name}! 👋</h2>
        <p className="text-white/85 mt-1 text-sm">{user?.institute_name}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={HiOutlineKey} label="সক্রিয় লাইসেন্স" value={licenses.filter((l) => l.status === 'active').length} color="brand" />
        <StatCard icon={HiOutlineDeviceTablet} label="ব্যবহৃত ডিভাইস" value={`${totalDevices}/${maxDevices || '-'}`} color="accent" />
        <StatCard icon={HiOutlineClipboardList} label="মোট অর্ডার" value={orders.length} color="purple" />
        <StatCard icon={HiOutlineCalendar} label="একাউন্ট স্ট্যাটাস" value={<Badge status={user?.status} />} color="yellow" raw />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">সাম্প্রতিক লাইসেন্স</h3>
            <Link to="/dashboard/license" className="text-sm text-brand-600 font-semibold">সব দেখুন →</Link>
          </div>
          {loading ? <p className="text-slate-400 text-sm">লোড হচ্ছে...</p> : licenses.length === 0 ? (
            <p className="text-slate-400 text-sm">এখনও কোনো সক্রিয় লাইসেন্স নেই। পেমেন্ট নিশ্চিত হলে এখানে দেখাবে।</p>
          ) : (
            <div className="space-y-3">
              {licenses.slice(0, 3).map((l) => (
                <div key={l.id} className="flex items-center justify-between border border-slate-100 rounded-xl p-3">
                  <div>
                    <p className="font-mono font-bold text-sm text-slate-800">{l.license_key}</p>
                    <p className="text-xs text-slate-400">{l.package_name}</p>
                  </div>
                  <Badge status={l.status} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900">সাম্প্রতিক অর্ডার</h3>
            <Link to="/dashboard/orders" className="text-sm text-brand-600 font-semibold">সব দেখুন →</Link>
          </div>
          {loading ? <p className="text-slate-400 text-sm">লোড হচ্ছে...</p> : orders.length === 0 ? (
            <p className="text-slate-400 text-sm">কোনো অর্ডার পাওয়া যায়নি।</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 3).map((o) => (
                <div key={o.id} className="flex items-center justify-between border border-slate-100 rounded-xl p-3">
                  <div>
                    <p className="font-bold text-sm text-slate-800">{o.order_no}</p>
                    <p className="text-xs text-slate-400">{o.package_name} — {o.amount} ৳</p>
                  </div>
                  <Badge status={o.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, raw }) {
  const colors = {
    brand: 'from-brand-500 to-brand-700',
    accent: 'from-accent-500 to-accent-600',
    purple: 'from-purple-500 to-purple-700',
    yellow: 'from-yellow-500 to-yellow-600'
  };
  return (
    <div className="card flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors[color]} text-white flex items-center justify-center text-xl shrink-0`}>
        <Icon />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-semibold">{label}</p>
        <div className="text-xl font-extrabold text-slate-900">{raw ? value : value}</div>
      </div>
    </div>
  );
}