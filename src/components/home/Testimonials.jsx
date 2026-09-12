import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi2';
import { api } from '@/api/client';

const fallback = [
  { name: 'মোঃ রফিকুল ইসলাম', designation: 'প্রধান শিক্ষক', institute: 'আদর্শ উচ্চ বিদ্যালয়', message: 'সফটওয়্যারটি ব্যবহার করার পর থেকে আমাদের ফি আদায় ও রেজাল্ট তৈরির কাজ কয়েক গুণ দ্রুত হয়েছে। সময় ও খরচ দুটোই বেঁচে যাচ্ছে।', rating: 5 },
  { name: 'সাবিনা ইয়াসমিন', designation: 'অধ্যক্ষ', institute: 'গ্রীন ভ্যালি কলেজ', message: 'অভিভাবকদের সাথে যোগাযোগ এখন অনেক সহজ। এক ক্লিকে সবাইকে SMS পাঠানো যায়, যা আগে অসম্ভব ছিল।', rating: 5 },
  { name: 'আব্দুল করিম', designation: 'পরিচালক', institute: 'ইউনাইটেড কোচিং সেন্টার', message: 'বেতন ও আয়-ব্যয়ের হিসাব এখন সম্পূর্ণ স্বচ্ছ। আলাদা হিসাবরক্ষক রাখার প্রয়োজন পড়ছে না।', rating: 5 }
];

export default function Testimonials() {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    api
      .get('testimonials')
      .then((data) => {
        if (Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="reviews" className="py-20 bg-section-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge bg-brand-500/10 text-brand-700">💬 গ্রাহক মতামত</span>
          <h2 className="section-title mt-4">আমাদের গ্রাহকরা যা বলছেন</h2>
          <p className="section-subtitle">সারা দেশের শত শত শিক্ষাপ্রতিষ্ঠান ইতিমধ্যে আস্থা রেখেছে আমাদের সফটওয়্যারে।</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card relative"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                  <HiStar key={idx} />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed">"{t.message}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold">
                  {t.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.designation}, {t.institute}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
