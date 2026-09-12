import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineClock, HiOutlineBanknotes, HiOutlineChatBubbleLeftRight, HiOutlineShieldCheck } from 'react-icons/hi2';

const rows = [
  { task: 'দৈনিক হাজিরা (৫০ জন শিক্ষার্থী)', before: '১৫-২০ মিনিট', after: '২-৩ মিনিট', save: '৮৫%' },
  { task: 'পরীক্ষার ফলাফল তৈরি', before: '২-৩ দিন', after: '১-২ ঘণ্টা', save: '৯০%' },
  { task: 'ফি রশিদ তৈরি ও হিসাব', before: 'প্রতিদিন ১-২ ঘণ্টা', after: '১০-১৫ মিনিট', save: '৮০%' },
  { task: 'বেতন শীট প্রস্তুত', before: '১ দিন', after: '৩০ মিনিট', save: '৯৫%' },
  { task: 'অভিভাবকদের তথ্য জানানো', before: 'ফোন কল/চিঠি', after: 'তাৎক্ষণিক SMS', save: '৯৯%' }
];

const highlights = [
  { icon: HiOutlineClock, title: 'সময় সাশ্রয়', desc: 'মাসে ৪০+ কর্মঘণ্টা বাঁচান, প্রশাসনিক কাজে দিন এক নতুন গতি।' },
  { icon: HiOutlineBanknotes, title: 'খরচ সাশ্রয়', desc: 'কাগজ, রেজিস্টার ও বাড়তি জনবলের খরচ কমিয়ে আনুন উল্লেখযোগ্যভাবে।' },
  { icon: HiOutlineChatBubbleLeftRight, title: 'সহজ যোগাযোগ', desc: 'অভিভাবকদের কাছে এক ক্লিকে SMS পাঠিয়ে সম্পর্ক করুন মজবুত।' },
  { icon: HiOutlineShieldCheck, title: 'নির্ভুল ও নিরাপদ', desc: 'স্বয়ংক্রিয় হিসাব ও ব্যাকআপে থাকুন সম্পূর্ণ নিশ্চিন্ত।' }
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge bg-accent-500/10 text-accent-600">💹 বিনিয়োগের প্রকৃত ফলাফল</span>
          <h2 className="section-title mt-4">সময় ও খরচ সাশ্রয়ের বাস্তব হিসাব</h2>
          <p className="section-subtitle">
            ম্যানুয়াল পদ্ধতির তুলনায় {`স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম`} ব্যবহার করলে আপনার প্রতিষ্ঠান কতটা সময় ও খরচ বাঁচাতে পারে দেখুন।
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card text-center hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="h-14 w-14 mx-auto rounded-2xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white text-2xl mb-4">
                <h.icon />
              </div>
              <h3 className="font-bold text-lg text-slate-900">{h.title}</h3>
              <p className="text-slate-500 text-sm mt-2">{h.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-card">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-slate-900 text-white text-left">
                <th className="px-5 py-4">কার্যক্রম</th>
                <th className="px-5 py-4">ম্যানুয়াল পদ্ধতি</th>
                <th className="px-5 py-4">সফটওয়্যার দিয়ে</th>
                <th className="px-5 py-4 text-right">সাশ্রয়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={r.task} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-5 py-4 font-semibold text-slate-800">{r.task}</td>
                  <td className="px-5 py-4 text-red-500">{r.before}</td>
                  <td className="px-5 py-4 text-accent-600 font-semibold">{r.after}</td>
                  <td className="px-5 py-4 text-right font-extrabold text-brand-700">{r.save}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
