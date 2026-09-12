import React from 'react';
import { Outlet } from 'react-router-dom';
import { HiOutlineHome, HiOutlineKey, HiOutlineClipboardList, HiOutlineUserCircle } from 'react-icons/hi';
import DashboardShell from '@/layouts/DashboardShell';

const links = [
  { to: '/dashboard', label: 'ওভারভিউ', icon: HiOutlineHome, end: true },
  { to: '/dashboard/license', label: 'লাইসেন্স', icon: HiOutlineKey },
  { to: '/dashboard/orders', label: 'অর্ডার হিস্টোরি', icon: HiOutlineClipboardList },
  { to: '/dashboard/profile', label: 'প্রোফাইল সেটিংস', icon: HiOutlineUserCircle }
];

export default function DashboardLayout() {
  return (
    <DashboardShell title="গ্রাহক ড্যাশবোর্ড" links={links}>
      <Outlet />
    </DashboardShell>
  );
}