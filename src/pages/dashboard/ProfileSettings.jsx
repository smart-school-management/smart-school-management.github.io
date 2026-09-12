import React, { useState } from 'react';
import { useAuth, ApiError } from '@/context/AuthContext';
import { api } from '@/api/client';

export default function ProfileSettings() {
  const { user, updateLocalUser } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || '', phone: user?.phone || '', institute_name: user?.institute_name || '',
    eiin: user?.eiin || '', address: user?.address || ''
  });
  const [pwd, setPwd] = useState({ current_password: '', new_password: '', confirm_password: '' });
  const [profileStatus, setProfileStatus] = useState(null);
  const [pwdStatus, setPwdStatus] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const saveProfile = async (e) => {
    e.preventDefault();
    setLoading1(true);
    setProfileStatus(null);
    try {
      const data = await api.put('auth/profile', profile, { auth: true });
      updateLocalUser(data);
      setProfileStatus({ ok: true, msg: 'প্রোফাইল সফলভাবে হালনাগাদ হয়েছে।' });
    } catch (err) {
      setProfileStatus({ ok: false, msg: err instanceof ApiError ? err.message : 'সমস্যা হয়েছে।' });
    } finally {
      setLoading1(false);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (pwd.new_password !== pwd.confirm_password) {
      setPwdStatus({ ok: false, msg: 'নতুন পাসওয়ার্ড দুটি মিলছে না।' });
      return;
    }
    setLoading2(true);
    setPwdStatus(null);
    try {
      await api.put('auth/password', pwd, { auth: true });
      setPwdStatus({ ok: true, msg: 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।' });
      setPwd({ current_password: '', new_password: '', confirm_password: '' });
    } catch (err) {
      setPwdStatus({ ok: false, msg: err instanceof ApiError ? err.message : 'সমস্যা হয়েছে।' });
    } finally {
      setLoading2(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form onSubmit={saveProfile} className="card space-y-4">
        <h3 className="font-bold text-slate-900">প্রোফাইল তথ্য</h3>
        <div>
          <label className="label-field">নাম</label>
          <input className="input-field" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
        </div>
        <div>
          <label className="label-field">মোবাইল নম্বর</label>
          <input className="input-field" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
        </div>
        <div>
          <label className="label-field">প্রতিষ্ঠানের নাম</label>
          <input className="input-field" value={profile.institute_name} onChange={(e) => setProfile({ ...profile, institute_name: e.target.value })} />
        </div>
        <div>
          <label className="label-field">EIIN</label>
          <input className="input-field" value={profile.eiin} onChange={(e) => setProfile({ ...profile, eiin: e.target.value })} />
        </div>
        <div>
          <label className="label-field">ঠিকানা</label>
          <input className="input-field" value={profile.address} onChange={(e) => setProfile({ ...profile, address: e.target.value })} />
        </div>
        <div>
          <label className="label-field">ইমেইল (পরিবর্তনযোগ্য নয়)</label>
          <input className="input-field bg-slate-50" value={user?.email} disabled />
        </div>
        {profileStatus && <p className={`text-sm font-semibold ${profileStatus.ok ? 'text-accent-600' : 'text-red-500'}`}>{profileStatus.msg}</p>}
        <button disabled={loading1} className="btn-primary w-full">{loading1 ? 'সংরক্ষণ হচ্ছে...' : 'প্রোফাইল আপডেট করুন'}</button>
      </form>

      <form onSubmit={savePassword} className="card space-y-4">
        <h3 className="font-bold text-slate-900">পাসওয়ার্ড পরিবর্তন</h3>
        <div>
          <label className="label-field">বর্তমান পাসওয়ার্ড</label>
          <input required type="password" className="input-field" value={pwd.current_password} onChange={(e) => setPwd({ ...pwd, current_password: e.target.value })} />
        </div>
        <div>
          <label className="label-field">নতুন পাসওয়ার্ড</label>
          <input required minLength={6} type="password" className="input-field" value={pwd.new_password} onChange={(e) => setPwd({ ...pwd, new_password: e.target.value })} />
        </div>
        <div>
          <label className="label-field">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
          <input required minLength={6} type="password" className="input-field" value={pwd.confirm_password} onChange={(e) => setPwd({ ...pwd, confirm_password: e.target.value })} />
        </div>
        {pwdStatus && <p className={`text-sm font-semibold ${pwdStatus.ok ? 'text-accent-600' : 'text-red-500'}`}>{pwdStatus.msg}</p>}
        <button disabled={loading2} className="btn-primary w-full">{loading2 ? 'পরিবর্তন হচ্ছে...' : 'পাসওয়ার্ড পরিবর্তন করুন'}</button>
      </form>
    </div>
  );
}