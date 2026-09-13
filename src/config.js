// কেন্দ্রীয় কনফিগারেশন — প্রয়োজনে .env ফাইলে পরিবর্তন করুন
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tcp.freevar.com/ssms/api';
export const SUPPORT_PHONE = import.meta.env.VITE_SUPPORT_PHONE || '+8801847406830';
export const SUPPORT_WHATSAPP = `https://wa.me/${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`;

export const APP_NAME = 'স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম';
export const COMPANY_NAME = 'NeedleCode IT Services';
export const COMPANY_URL = 'https://needlecode.com';
export const COPYRIGHT_START_YEAR = 2026;

export const TOKEN_STORAGE_KEY = 'smss_auth_token';
export const USER_STORAGE_KEY = 'smss_auth_user';
