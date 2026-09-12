import React, { useState } from 'react';
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { api, ApiError } from '@/api/client';
import { SUPPORT_PHONE, SUPPORT_WHATSAPP } from '@/config';

const initial = { name: '', phone: '', email: '', institute_name: '', message: '', type: 'demo' };

export default function DemoContact() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.post('contact', form);
      setStatus({ ok: true, msg: 'ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।' });
      setForm(initial);
    } catch (err) {
      setStatus({ ok: false, msg: err instanceof ApiError ? err.message : 'দুঃখিত, একটি সমস্যা হয়েছে।' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="badge bg-accent-500/10 text-accent-600">🎬 ফ্রি ডেমো ও যোগাযোগ</span>
          <h2 className="section-title mt-4">লাইভ ডেমো দেখতে চান?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            নিচের ফর্মটি পূরণ করুন — আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করে সম্পূর্ণ সফটওয়্যারটি ফ্রি ডেমোর মাধ্যমে দেখাবে। দ্রুত সাড়া পেতে সরাসরি কল বা হোয়াটসঅ্যাপেও যোগাযোগ করতে পারেন।
          </p>

          <div className="mt-8 space-y-4">
            <a href={`tel:${SUPPORT_PHONE}`} className="flex items-center gap-4 card hover:shadow-soft transition">
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-xl"><HiOutlinePhone /></div>
              <div>
                <p className="text-sm text-slate-500">সরাসরি কল করুন</p>
                <p className="font-bold text-slate-900">{SUPPORT_PHONE}</p>
              </div>
            </a>
            <a href={SUPPORT_WHATSAPP} target="_blank" rel="noreferrer" className="flex items-center gap-4 card hover:shadow-soft transition">
              <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl"><FaWhatsapp /></div>
              <div>
                <p className="text-sm text-slate-500">হোয়াটসঅ্যাপে মেসেজ দিন</p>
                <p className="font-bold text-slate-900">{SUPPORT_PHONE}</p>
              </div>
            </a>
            <a href="mailto:support@needlecode.com" className="flex items-center gap-4 card hover:shadow-soft transition">
              <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl"><HiOutlineEnvelope /></div>
              <div>
                <p className="text-sm text-slate-500">ইমেইল করুন</p>
                <p className="font-bold text-slate-900">support@needlecode.com</p>
              </div>
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="card">
          <h3 className="text-xl font-bold text-slate-900 mb-6">ডেমো রিকোয়েস্ট ফর্ম</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label-field">পূর্ণ নাম *</label>
              <input required name="name" value={form.name} onChange={onChange} className="input-field" placeholder="আপনার নাম" />
            </div>
            <div>
              <label className="label-field">মোবাইল নম্বর *</label>
              <input required name="phone" value={form.phone} onChange={onChange} className="input-field" placeholder="01XXXXXXXXX" />
            </div>
          </div>
          <div className="mt-4">
            <label className="label-field">ইমেইল</label>
            <input type="email" name="email" value={form.email} onChange={onChange} className="input-field" placeholder="you@example.com" />
          </div>
          <div className="mt-4">
            <label className="label-field">প্রতিষ্ঠানের নাম *</label>
            <input required name="institute_name" value={form.institute_name} onChange={onChange} className="input-field" placeholder="আপনার প্রতিষ্ঠানের নাম" />
          </div>
          <div className="mt-4">
            <label className="label-field">বার্তা</label>
            <textarea name="message" value={form.message} onChange={onChange} rows="3" className="input-field" placeholder="আপনার প্রয়োজনীয়তা লিখুন..." />
          </div>

          {status && (
            <p className={`mt-4 text-sm font-semibold ${status.ok ? 'text-accent-600' : 'text-red-500'}`}>{status.msg}</p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full mt-6">
            {loading ? 'পাঠানো হচ্ছে...' : 'ডেমো রিকোয়েস্ট পাঠান'}
          </button>
        </form>
      </div>
    </section>
  );
}
