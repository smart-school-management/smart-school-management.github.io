import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiCheckCircle, HiOutlinePhone } from 'react-icons/hi2';
import Logo from '@/components/ui/Logo';
import { FaWhatsapp } from 'react-icons/fa';
import { api, ApiError } from '@/api/client';
import { SUPPORT_PHONE, SUPPORT_WHATSAPP } from '@/config';

const initial = {
  name: '', institute_name: '', eiin: '', address: '', phone: '', email: '', password: '',
  package_id: '', payment_method: 'bKash', transaction_id: ''
};

export default function Buy() {
  const navigate = useNavigate();
  const { packageSlug } = useParams();
  const [packages, setPackages] = useState([]);
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.get('packages').then(setPackages).catch(() => { });
    api.get('settings').then(setSettings).catch(() => { });
    document.title = `প্যাকেজ ক্রয়ের ফর্ম | স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম | Smart School Management System`;
  }, []);

  useEffect(() => {
    if (packageSlug && packages.length) {
      const found = packages.find((p) => p.slug === packageSlug || String(p.id) === packageSlug);
      if (found) setForm((f) => ({ ...f, package_id: found.id }));
    }
  }, [packageSlug, packages]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const data = await api.post('orders', form);
      setSuccess(data);
    } catch (err) {
      if (err instanceof ApiError && err.errors) setErrors(err.errors);
      else setErrors({ _general: err.message });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    const value = String(text ?? '').trim();

    if (!value) return;

    try {
      // Modern browsers: HTTPS / localhost
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return;
      }

      // Fallback for older browsers / non-secure contexts
      const textarea = document.createElement('textarea');

      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      textarea.style.opacity = '0';

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const copied = document.execCommand('copy');

      document.body.removeChild(textarea);

      if (!copied) {
        throw new Error('Copy command failed');
      }
      // Show toast only after successful copy
      setToast({
        type: 'success',
        message: 'নম্বরটি কপি হয়েছে!'
      });
    } catch (error) {
      setToast({
        type: 'error',
        message: 'কপি করা যায়নি!'
      });
      console.error('Failed to copy:', error);
    }

    setTimeout(() => { setToast(null); }, 4000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-section-gradient flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
          <div className="h-20 w-20 rounded-full bg-accent-500/10 text-accent-600 text-5xl flex items-center justify-center mx-auto mb-6">
            <HiCheckCircle />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">অর্ডারটি সফলভাবে জমা হয়েছে!</h1>
          <p className="mt-3 text-slate-600 leading-relaxed">
            অর্ডার নম্বর: <strong>{success.order_no}</strong><br />
            আপনার প্রোফাইল তথ্যসহ একটি নিশ্চিতকরণ ইমেইল <strong>{form.email}</strong> ঠিকানায় পাঠানো হয়েছে। আমরা আপনার পেমেন্ট যাচাই করছি — যাচাই সম্পন্ন হলে লাইসেন্স কী ইমেইলে পাঠানো হবে।
          </p>
          <p className="mt-4 text-sm text-slate-500">দ্রুত নিশ্চিতকরণ চাইলে সরাসরি কল বা হোয়াটসঅ্যাপে যোগাযোগ করুন:</p>
          <div className="mt-4 flex justify-center gap-3">
            <a href={`tel:${SUPPORT_PHONE}`} className="btn-outline"><HiOutlinePhone /> {SUPPORT_PHONE}</a>
            <a href={SUPPORT_WHATSAPP} target="_blank" rel="noreferrer" className="btn bg-green-500 text-white"><FaWhatsapp /> WhatsApp</a>
          </div>
          <div className="mt-8 flex gap-3 justify-center">
            <Link to="/login" className="btn-primary">লগইন করুন</Link>
            <Link to="/" className="btn-outline">হোমে ফিরুন</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-gradient py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Logo width={40} height={40}/>
          </Link>
          <h1 className="section-title">প্যাকেজ ক্রয়ের ফর্ম</h1>
          <p className="section-subtitle">নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন এবং পেমেন্ট সম্পন্ন করার পর ট্রানজেকশন আইডি দিন।</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <form onSubmit={onSubmit} className="lg:col-span-3 card space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">প্রতিষ্ঠান ও ব্যক্তিগত তথ্য</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">আপনার পূর্ণ নাম *</label>
                <input required name="name" value={form.name} onChange={onChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">প্রতিষ্ঠানের নাম *</label>
                <input required name="institute_name" value={form.institute_name} onChange={onChange} className="input-field" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">EIIN / প্রতিষ্ঠান কোড</label>
                <input name="eiin" value={form.eiin} onChange={onChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">মোবাইল নম্বর *</label>
                <input required name="phone" value={form.phone} onChange={onChange} className="input-field" placeholder="01XXXXXXXXX" />
              </div>
            </div>

            <div>
              <label className="label-field">প্রতিষ্ঠানের ঠিকানা *</label>
              <input required name="address" value={form.address} onChange={onChange} className="input-field" />
            </div>

            <hr className='border border-b-1 border-b-gray-200' />

            <h3 className="font-bold text-slate-900 text-lg pt-2">ড্যাশবোর্ড লগইনের জন্য</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">ইমেইল *</label>
                <input required type="email" name="email" value={form.email} onChange={onChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">একাউন্ট পাসওয়ার্ড *</label>
                <input required minLength={6} type="password" name="password" value={form.password} onChange={onChange} className="input-field" />
              </div>
            </div>

            <hr className='border border-b-1 border-b-gray-200' />

            <h3 className="font-bold text-slate-900 text-lg pt-2">প্যাকেজ ও পেমেন্ট তথ্য</h3>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">প্যাকেজ নির্বাচন করুন *</label>
                <select required name="package_id" value={form.package_id} onChange={onChange} className="input-field">
                  <option value="">-- প্যাকেজ বেছে নিন --</option>
                  {packages.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} — {p.price}{p.period ? ` ${p.period}` : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="label-field">পেমেন্ট মাধ্যম *</label>
                <select required name="payment_method" value={form.payment_method} onChange={onChange} className="input-field">
                  <option value="bKash">বিকাশ (bKash)</option>
                  <option value="Rocket">রকেট (Rocket)</option>
                  <option value="Nagad">নগদ (Nagad)</option>
                  <option value="Bank">ব্যাংক ট্রান্সফার</option>
                </select>
              </div>
            </div>

            {form.package_id && form.payment_method && (() => {
              const selectedPackage = packages.find(
                (p) => String(p.id) === String(form.package_id)
              );

              const paymentInfo = {
                bKash: {
                  name: 'বিকাশ (bKash)',
                  type: 'পারসোনাল নম্বর',
                  number: settings?.bkash_number || '01705697337',
                },
                Rocket: {
                  name: 'রকেট (Rocket)',
                  type: 'মার্চেন্ট নম্বর',
                  number: settings?.rocket_number || '01705697337',
                },
                Nagad: {
                  name: 'নগদ (Nagad)',
                  type: 'পারসোনাল নম্বর',
                  number: settings?.nagad_number || '01521261218',
                },
                Bank: {
                  name: 'ব্যাংক ট্রান্সফার',
                  type: '',
                  number: settings?.bank_details || 'DBBL A/C: 1381510173266',
                },
              };

              const payment = paymentInfo[form.payment_method];

              return (
                <div className="card bg-slate-600 text-white">
                  <h3 className="font-bold mb-2">ম্যানুয়ালি পেমেন্ট করুন</h3>

                  {payment && (
                    <p className="text-sm text-white mb-4">
                      {payment.name} {payment.type && `${payment.type} `}
                      <strong title="কপি করতে ক্লিক করুন" className='inline-block px-2 py-1 border border-slate-300 cursor-default' onClick={copyToClipboard}>{payment.number}</strong>
                      {' '}এ tk. {selectedPackage?.price || '0'} পাঠান।
                    </p>
                  )}

                  <p className="text-sm text-slate-200 mb-1">
                    পেমেন্ট করার পর প্রাপ্ত ট্রানজেকশন আইডি নিচে লিখুন।
                  </p>
                </div>
              );
            })()}

            <div>
              <label className="label-field">ট্রানজেকশন আইডি *</label>
              <input required name="transaction_id" value={form.transaction_id} onChange={onChange} className="input-field" placeholder="TrxID" />
            </div>

            {errors._general && <p className="text-red-500 text-sm font-semibold">{errors._general}</p>}
            {Object.entries(errors).filter(([k]) => k !== '_general').map(([k, v]) => (
              <p key={k} className="text-red-500 text-xs">{Array.isArray(v) ? v[0] : v}</p>
            ))}

            <button type="submit" disabled={loading} className="btn-primary w-full text-base">
              {loading ? 'জমা হচ্ছে...' : '✅ অর্ডার নিশ্চিত করুন'}
            </button>
          </form>

          <div className="hidden lg:block lg:col-span-2 space-y-6">
            <div className="card bg-blue-700 text-white">
              <h3 className="font-bold text-white mb-4">💳 প্রথমে পেমেন্ট করুন</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>bKash (Personal/Send Money)</span>
                  <strong>{settings?.bkash_number || '01705697337'}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Rocket (Merchant)</span>
                  <strong>{settings?.rocket_number || '01705697337'}</strong>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span>Nagad (Personal/Send Money)</span>
                  <strong>{settings?.nagad_number || '01521261218'}</strong>
                </div>
                <div className="flex justify-between">
                  <span>ব্যাংক ট্রান্সফার</span>
                  <strong className="text-right">{settings?.bank_details || 'DBBL A/C: 1381510173266'}</strong>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4">টাকা পাঠানোর পর প্রাপ্ত ট্রানজেকশন আইডি ফর্মে লিখুন। পেমেন্ট ম্যানুয়ালি যাচাই করে লাইসেন্স ইমেইলে পাঠানো হবে।</p>
            </div>

            <div className="card bg-slate-900 text-white">
              <h3 className="font-bold mb-2">⚡ দ্রুত নিশ্চিতকরণ প্রয়োজন?</h3>
              <p className="text-sm text-slate-300 mb-4">সরাসরি কল অথবা হোয়াটসঅ্যাপে মেসেজ পাঠান, আমরা দ্রুত সাড়া দেব।</p>
              <a href={SUPPORT_WHATSAPP} target="_blank" rel="noreferrer" className="btn bg-green-500 text-white w-full">
                <FaWhatsapp /> {SUPPORT_PHONE}
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm mt-12">
        <Link to="/" className="text-slate-400 hover:text-slate-600 m-0">← হোম পেইজে ফিরে যান</Link>
      </p>

      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999] flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl text-sm font-semibold transition-all ${
            toast.type === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white'
          }`}
          role="alert"
        >
          <span className="text-lg">
            {toast.type === 'success' ? '✓' : '✕'}
          </span>

          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
