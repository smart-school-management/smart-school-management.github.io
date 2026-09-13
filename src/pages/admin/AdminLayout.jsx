import React from 'react';
import { Outlet } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUsers, HiOutlineKey, HiOutlineCube, HiOutlineClipboardDocumentList, HiOutlineCog } from 'react-icons/hi';
import DashboardShell from '@/layouts/DashboardShell';

const links = [
  { to: '/admin', label: 'ওভারভিউ', icon: HiOutlineHome, end: true },
  { to: '/admin/users', label: 'ব্যবহারকারী', icon: HiOutlineUsers },
  { to: '/admin/orders', label: 'অর্ডারসমূহ', icon: HiOutlineClipboardDocumentList },
  { to: '/admin/licenses', label: 'লাইসেন্স', icon: HiOutlineKey },
  { to: '/admin/packages', label: 'প্যাকেজ', icon: HiOutlineCube },
  { to: '/admin/settings', label: 'সেটিংস', icon: HiOutlineCog }
];

export default function AdminLayout() {
  return (
    <DashboardShell title="অ্যাডমিন প্যানেল" links={links}>
      <Outlet />
    </DashboardShell>
  );
}