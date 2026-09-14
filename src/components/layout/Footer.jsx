import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaWhatsapp, FaEnvelope, FaPhoneAlt, FaYoutube } from 'react-icons/fa';
import { APP_NAME, COMPANY_NAME, COMPANY_URL, COPYRIGHT_START_YEAR, SUPPORT_PHONE, SUPPORT_WHATSAPP } from '@/config';

export default function Footer() {
  const scrollOrNavigate = (event) => {
    event.preventDefault();
    const href = event.target.href;
    if (window.location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const hash = (new URL(href)).hash;
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const year = new Date().getFullYear();
  const yearRange = year > COPYRIGHT_START_YEAR ? `${COPYRIGHT_START_YEAR}–${year}` : `${COPYRIGHT_START_YEAR}`;

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            
            <span className="font-extrabold text-white text-lg">{APP_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            বাংলাদেশের শিক্ষাপ্রতিষ্ঠানের জন্য সম্পূর্ণ বাংলা ভাষার ডিজিটাল ম্যানেজমেন্ট সমাধান। সময় বাঁচান, খরচ কমান, প্রতিষ্ঠান করুন আধুনিক।
          </p>
          <div className="flex gap-3 mt-5">
            <a href={SUPPORT_WHATSAPP} target="_blank" rel="noreferrer" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent-500 transition"><FaWhatsapp /></a>
            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-600 transition"><FaFacebook /></a>
            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 transition"><FaYoutube /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">দ্রুত লিংক</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#features" onClick={(e) => scrollOrNavigate(e)} className="hover:text-white">ফিচারসমূহ</a></li>
            <li><a href="#pricing" onClick={(e) => scrollOrNavigate(e)}  className="hover:text-white">প্যাকেজ ও মূল্য</a></li>
            <li><a href="#reviews" onClick={(e) => scrollOrNavigate(e)}  className="hover:text-white">গ্রাহক মতামত</a></li>
            <li><a href="#demo" onClick={(e) => scrollOrNavigate(e)}  className="hover:text-white">ডেমো ও যোগাযোগ</a></li>
            <li><Link to="/buy" className="hover:text-white">এখনই কিনুন</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">অ্যাকাউন্ট</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-white">গ্রাহক লগইন</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">ইউজার ড্যাশবোর্ড</Link></li>
            <li><Link to="/admin" className="hover:text-white">অ্যাডমিন প্যানেল</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4">যোগাযোগ</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><FaPhoneAlt className="text-accent-500" /> <a target="_blank" href={`tel:${SUPPORT_PHONE}`}>{SUPPORT_PHONE}</a></li>
            <li className="flex items-center gap-2"><FaEnvelope className="text-accent-500" /> <a target="_blank" href="mailto:support@needlecode.com">support@needlecode.com</a></li>
            <li className="flex items-center gap-2"><FaWhatsapp className="text-accent-500" /> <a target="_blank" href={`https://wa.me/8801847406830/`}>হোয়াটসঅ্যাপে মেসেজ দিন</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6">
        <p className="text-center text-sm text-slate-500">
          © {yearRange} <a href={COMPANY_URL} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white font-semibold">{COMPANY_NAME}</a> — সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
