import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenu, HiX, HiOutlineLogout } from 'react-icons/hi';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';
import { APP_NAME } from '@/config';

export default function DashboardShell({ title, links, children }) {
  const [open, setOpen] = useState(false);
  const [openTitle, setOpenTitle] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.hash.substring(1);

    const activeLink = links.find((link) => {
      if (link.end) return currentPath === link.to;
      return ( currentPath === link.to || location.pathname.startsWith(`${link.to}/`) );
    });

    const currentTitle = activeLink?.label || title;

    setOpenTitle(currentTitle);
    document.title = `${currentTitle} | ${title}`;
  }, [location.pathname, title, links]);

  const onLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-row">
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-64 bg-slate-900 text-white transform transition-transform duration-300 flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="shrink-0 h-16 flex items-center gap-2 px-5 border-b border-white/10">
          <Logo width={36} height={36} onClick={() => { navigate('/'); }}/>
          <span className="font-bold text-sm leading-tight">{title}</span>
        </div>
        <nav className="flex-1 overflow-auto p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={(e) => {setOpen(false); setOpenTitle(link.label || e.target?.innerText || '');}}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <link.icon className="text-lg" /> {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="shrink-0 right-0 p-4 border-t border-white/10 bg-slate-900 text-white">
          <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-300 hover:bg-red-500/10 w-full">
            <HiOutlineLogout className="text-lg" /> লগআউট
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-h-screen flex flex-col h-full max-h-full">
        <header className="shrink-0 h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <div className='flex justify-start items-center gap-2'>
            <button className="lg:hidden text-2xl text-slate-700" onClick={() => setOpen(true)}>
              <HiMenu />
            </button>
          <h1 className="font-bold text-slate-800">{openTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-800">{user?.name}</p>
              <p className="text-xs text-slate-400">{user?.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-white font-bold">
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>
        <main className="flex-1 relative"><div className='absolute inset-0 w-full h-full max-w-full max-h-full overflow-auto'><div className='p-4 sm:p-6'>{children}</div></div></main>
      </div>
    </div>
  );
}