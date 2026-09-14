import React from 'react';
import { Link } from 'react-router-dom';

export default function CallToAction() {
  return (
    <section className="py-20 bg-cta-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          আজই আপনার প্রতিষ্ঠানকে করুন <br className="hidden md:block" /> সম্পূর্ণ ডিজিটাল
        </h2>
        <p className="mt-5 text-white/85 text-lg max-w-2xl mx-auto">
          bKash, Rocket ও Bank ট্রান্সফারের মাধ্যমে সহজেই কিনুন এবং সময়, খরচ ও শ্রম — তিনটিই বাঁচান।
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/buy" className="btn-white text-base">🚀 এখনই কিনুন</Link>
          <a href="#demo" className="btn bg-white/10 text-white border-2 border-white/40 hover:bg-white/20 text-base">🎬 ফ্রি ডেমো দেখুন</a>
        </div>
      </div>
    </section>
  );
}
