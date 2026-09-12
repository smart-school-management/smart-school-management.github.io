import React, { useEffect, useState } from 'react';
import { HiOutlineClipboardDocument, HiOutlineCheck } from 'react-icons/hi2';
import { api } from '@/api/client';
import Badge from '@/components/ui/Badge';

export default function LicensePage() {
  const [licenses, setLicenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    api.get('license', { auth: true }).then((data) => {
      setLicenses(data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const copy = (key) => {
    navigator.clipboard.writeText(key);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  if (loading) return <p className="text-slate-400">লোড হচ্ছে...</p>;

  if (!licenses.length) {
    return (
      <div className="card text-center py-16">
        <p className="text-5xl mb-4">🔑</p>
        <h3 className="font-bold text-slate-800 text-lg">এখনো কোনো লাইসেন্স সক্রিয় হয়নি</h3>
        <p className="text-slate-500 text-sm mt-2">পেমেন্ট নিশ্চিত হওয়ার পর আপনার লাইসেন্স কী এখানে প্রদর্শিত হবে।</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {licenses.map((lic) => (
        <div key={lic.id} className="card">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <p className="text-sm text-slate-400">প্যাকেজ</p>
              <h3 className="font-extrabold text-lg text-slate-900">{lic.package_name}</h3>
            </div>
            <Badge status={lic.status} />
          </div>

          <div className="flex items-center gap-3 bg-slate-900 rounded-xl px-4 py-3 mb-4">
            <code className="text-accent-400 font-mono font-bold flex-1 overflow-x-auto whitespace-nowrap">{lic.license_key}</code>
            <button onClick={() => copy(lic.license_key)} className="text-white/70 hover:text-white shrink-0">
              {copied === lic.license_key ? <HiOutlineCheck className="text-accent-400" /> : <HiOutlineClipboardDocument />}
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-sm mb-4">
            <div>
              <p className="text-slate-400">ইস্যু তারিখ</p>
              <p className="font-semibold text-slate-800">{lic.issued_at || '—'}</p>
            </div>
            <div>
              <p className="text-slate-400">মেয়াদ শেষ</p>
              <p className="font-semibold text-slate-800">{lic.expires_at || 'আজীবন'}</p>
            </div>
            <div>
              <p className="text-slate-400">ডিভাইস ব্যবহার</p>
              <p className="font-semibold text-slate-800">{lic.devices?.length || 0} / {lic.max_devices}</p>
            </div>
          </div>

          {lic.devices && lic.devices.length > 0 && (
            <div>
              <p className="text-sm font-bold text-slate-700 mb-2">সক্রিয় ডিভাইসসমূহ</p>
              <div className="space-y-2">
                {lic.devices.map((d) => (
                  <div key={d.id} className="flex items-center justify-between border border-slate-100 rounded-lg px-3 py-2 text-sm">
                    <div>
                      <p className="font-semibold text-slate-800">{d.device_name || 'অজানা ডিভাইস'}</p>
                      <p className="text-xs text-slate-400">{d.platform} • সর্বশেষ সক্রিয়: {d.last_seen_at}</p>
                    </div>
                    <Badge status={d.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}