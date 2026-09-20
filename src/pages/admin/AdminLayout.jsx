import React from 'react';
import { Outlet } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUsers, HiOutlineKey, HiOutlineCube, HiOutlineClipboardList, HiOutlineCog } from 'react-icons/hi';
import DashboardShell from '@/layouts/DashboardShell';

const links = [
  { to: '/manage', label: 'ওভারভিউ', icon: HiOutlineHome, end: true },
  { to: '/manage/users', label: 'ব্যবহারকারী', icon: HiOutlineUsers },
  { to: '/manage/orders', label: 'অর্ডারসমূহ', icon: HiOutlineClipboardList },
  { to: '/manage/licenses', label: 'লাইসেন্স', icon: HiOutlineKey },
  { to: '/manage/packages', label: 'প্যাকেজ', icon: HiOutlineCube },
  { to: '/manage/settings', label: 'সেটিংস', icon: HiOutlineCog }
];

export default function AdminLayout() {
  return (
    <DashboardShell title="অ্যাডমিন প্যানেল" links={links}>
      <Outlet />
    </DashboardShell>
  );
}