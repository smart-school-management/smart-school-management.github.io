import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import { APP_NAME } from '@/config';

const navLinks = [
  { href: '#features', label: 'ফিচারসমূহ' },
  { href: '#pricing', label: 'প্যাকেজ ও মূল্য' },
  { href: '#reviews', label: 'গ্রাহক মতামত' },
  { href: '#demo', label: 'ডেমো ও যোগাযোগ' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollOrNavigate = (href) => {
    setOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo width={40} height={40}/>

          <span
            className={`font-extrabold text-lg leading-tight transition-colors ${
              scrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            {APP_NAME}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollOrNavigate(link.href)}
              className={`font-semibold text-sm transition-colors ${
                scrolled ? 'text-slate-700 hover:text-brand-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to={isAuthenticated ? (isAdmin ? '/manage' : '/dashboard') : '/login'}
            className={scrolled ? 'btn-outline !py-2.5 !px-5' : 'btn-white !py-2.5 !px-5'}
          >
            {isAuthenticated ? 'ড্যাশবোর্ডে যান' : 'লগইন'}
          </Link>
          <Link to="/buy" className="btn-primary !py-2.5 !px-5">
            🚀 এখনই কিনুন
          </Link>
        </div>

        <button
          className={`lg:hidden text-2xl ${scrolled ? 'text-slate-800' : 'text-white'}`}
          onClick={() => setOpen(!open)}
          aria-label="মেনু"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white shadow-xl mt-2 mx-4 rounded-2xl p-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollOrNavigate(link.href)}
              className="text-left font-semibold text-slate-700 hover:text-brand-600"
            >
              {link.label}
            </button>
          ))}
          <hr />
          <Link to={isAuthenticated ? (isAdmin ? '/manage' : '/dashboard') : '/login'} className="btn-outline w-full" onClick={() => setOpen(false)}>
            {isAuthenticated ? 'ড্যাশবোর্ডে যান' : 'লগইন'}
          </Link>
          <Link to="/buy" className="btn-primary w-full" onClick={() => setOpen(false)}>
            🚀 এখনই কিনুন
          </Link>
        </div>
      )}
    </header>
  );
}
