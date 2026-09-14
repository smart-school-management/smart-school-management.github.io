import React, { useEffect, useState } from 'react';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';

export default function AdminLicenses() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('admin/licenses', { auth: true }).then((data) => setLicenses(data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    await api.post(`admin/licenses/${id}`, { status }, { auth: true });
    load();
  };

  return (
    <div className="card overflow-x-auto">
      <h3 className="font-bold text-slate-900 mb-4">সকল লাইসেন্স</h3>
      {loading ? <p className="text-slate-400 text-sm">লোড হচ্ছে...</p> : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="py-3 pr-4">লাইসেন্স কী</th>
              <th className="py-3 pr-4">গ্রাহক</th>
              <th className="py-3 pr-4">প্যাকেজ</th>
              <th className="py-3 pr-4">ডিভাইস</th>
              <th className="py-3 pr-4">স্ট্যাটাস</th>
              <th className="py-3">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {licenses.map((l) => (
              <tr key={l.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 pr-4 font-mono text-xs">{l.license_key}</td>
                <td className="py-3 pr-4">{l.name}<br /><span className="text-xs text-slate-400">{l.email}</span></td>
                <td className="py-3 pr-4">{l.package_name}</td>
                <td className="py-3 pr-4">{l.device_count}/{l.max_devices}</td>
                <td className="py-3 pr-4"><Badge status={l.status} /></td>
                <td className="py-3 space-x-2 whitespace-nowrap">
                  {l.status !== 'active' && <button onClick={() => changeStatus(l.id, 'active')} className="text-accent-600 text-xs font-bold">সক্রিয়</button>}
                  {l.status === 'active' && <button onClick={() => changeStatus(l.id, 'inactive')} className="text-yellow-600 text-xs font-bold">নিষ্ক্রিয়</button>}
                  <button onClick={() => changeStatus(l.id, 'revoked')} className="text-red-600 text-xs font-bold">বাতিল</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}