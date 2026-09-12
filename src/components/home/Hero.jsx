import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlinePlayCircle, HiOutlineArrowRight } from 'react-icons/hi2';
import { APP_NAME } from '@/config';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent-500/30 blur-3xl animate-floaty" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-400/30 blur-3xl animate-floaty" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="badge bg-white/15 text-white backdrop-blur border border-white/25">
            ⚡ বাংলাদেশের #১ স্কুল ম্যানেজমেন্ট সফটওয়্যার
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold text-white leading-tight">
            {APP_NAME}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed max-w-xl">
            শিক্ষার্থী ভর্তি থেকে রেজাল্ট, ফি আদায় থেকে বেতন, উপস্থিতি থেকে SMS — প্রতিষ্ঠানের সব কাজ এখন এক সফটওয়্যারে। <strong>সময় বাঁচান, খরচ কমান, প্রতিষ্ঠান করুন সম্পূর্ণ ডিজিটাল।</strong>
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/buy" className="btn-accent text-base">
              🚀 এখনই কিনুন <HiOutlineArrowRight />
            </Link>
            <a href="#demo" className="btn-white text-base">
              <HiOutlinePlayCircle className="text-xl" /> লাইভ ডেমো দেখুন
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-white">
            <div>
              <p className="text-3xl font-extrabold">৫০০+</p>
              <p className="text-sm text-white/80">প্রতিষ্ঠান ব্যবহার করছে</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">৯৫%</p>
              <p className="text-sm text-white/80">সময় সাশ্রয়</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold">২৪/৭</p>
              <p className="text-sm text-white/80">সাপোর্ট সুবিধা</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
            <div className="rounded-2xl bg-white overflow-hidden shadow-inner">
              <div className="bg-slate-900 h-8 flex items-center gap-1.5 px-4">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>
              <div className="p-6 space-y-3">
                <div className="h-6 w-2/3 rounded bg-brand-100" />
                <div className="grid grid-cols-3 gap-3">
                  {['ড্যাশবোর্ড', 'উপস্থিতি', 'পরীক্ষা', 'ফি', 'বেতন', 'শিক্ষার্থী'].map((t) => (
                    <div key={t} className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-accent-500 mx-auto mb-2" />
                      <p className="text-[11px] font-bold text-slate-600">{t}</p>
                    </div>
                  ))}
                </div>
                <div className="h-24 rounded-xl bg-gradient-to-r from-brand-50 to-accent-50 flex items-end gap-1 p-3">
                  {[40, 70, 55, 90, 60, 80, 45].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded bg-brand-500/70" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
