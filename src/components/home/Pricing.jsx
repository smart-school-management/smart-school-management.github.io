import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi2';
import { api } from '@/api/client';

const fallbackPackages = [
  {
    id: 'basic', name: 'বেসিক', price: '৳ ৫,০০০', period: '/ বছর', popular: false,
    features: ['শিক্ষার্থী ব্যবস্থাপনা', 'উপস্থিতি ব্যবস্থাপনা', 'পরীক্ষা ও রেজাল্ট', 'ফি ব্যবস্থাপনা', '১টি ডিভাইস লাইসেন্স', 'ইমেইল সাপোর্ট']
  },
  {
    id: 'standard', name: 'স্ট্যান্ডার্ড', price: '৳ ৯,৫০০', period: '/ বছর', popular: true,
    features: ['বেসিকের সকল ফিচার', 'বেতন ব্যবস্থাপনা', 'আয়-ব্যয় হিসাব', 'এসএমএস সিস্টেম', '৩টি ডিভাইস লাইসেন্স', 'প্রায়োরিটি সাপোর্ট']
  },
  {
    id: 'premium', name: 'প্রিমিয়াম', price: '৳ ১৮,০০০', period: '/ বছর', popular: false,
    features: ['স্ট্যান্ডার্ডের সকল ফিচার', 'মাল্টি-ব্র্যাঞ্চ সাপোর্ট', 'উন্নয়ন কার্ড ও রিপোর্ট', 'গ্রন্থাগার ব্যবস্থাপনা', 'আনলিমিটেড ডিভাইস', '২৪/৭ ফোন সাপোর্ট']
  }
];

export default function Pricing() {
  const [packages, setPackages] = useState(fallbackPackages);

  useEffect(() => {
    api
      .get('packages')
      .then((data) => {
        if (Array.isArray(data) && data.length) setPackages(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge bg-accent-500/10 text-accent-600">💵 মূল্য পরিকল্পনা</span>
          <h2 className="section-title mt-4">আপনার প্রতিষ্ঠানের জন্য উপযুক্ত প্যাকেজ বেছে নিন</h2>
          <p className="section-subtitle">প্রতিটি প্যাকেজেই রয়েছে ফ্রি সেটআপ সহায়তা ও নিয়মিত আপডেট। bKash, Rocket ও ব্যাংকের মাধ্যমে সহজেই কিনুন।</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id || pkg.slug || pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                pkg.popular || pkg.is_popular
                  ? 'bg-cta-gradient text-white shadow-2xl scale-105 z-10'
                  : 'bg-white border border-slate-200 shadow-card'
              }`}
            >
              {(pkg.popular || pkg.is_popular) && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 badge bg-yellow-400 text-slate-900">
                  🔥 সবচেয়ে জনপ্রিয়
                </span>
              )}
              <h3 className={`text-xl font-extrabold ${pkg.popular || pkg.is_popular ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</h3>
              <div className="mt-4 flex items-end gap-1">
                <span className="text-4xl font-black">{pkg.price}</span>
                <span className={`text-sm mb-1 ${pkg.popular || pkg.is_popular ? 'text-white/80' : 'text-slate-500'}`}>{pkg.period || pkg.billing_type}</span>
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {(pkg.features || []).map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm">
                    <HiCheckCircle className={`text-lg mt-0.5 shrink-0 ${pkg.popular || pkg.is_popular ? 'text-accent-300' : 'text-accent-500'}`} />
                    <span className={pkg.popular || pkg.is_popular ? 'text-white/90' : 'text-slate-600'}>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link
                to={`/buy/${pkg.slug || pkg.id}`}
                className={`mt-8 text-center ${pkg.popular || pkg.is_popular ? 'btn-white' : 'btn-primary'}`}
              >
                এই প্যাকেজে কিনুন
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-slate-500 mt-10 text-sm">
          🎁 প্রতিষ্ঠানের আকার অনুযায়ী কাস্টম কোটেশন প্রয়োজন? <Link to="/buy" className="text-brand-600 font-semibold underline">আমাদের সাথে যোগাযোগ করুন</Link>
        </p>
      </div>
    </section>
  );
}
