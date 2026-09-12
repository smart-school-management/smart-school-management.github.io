import React from 'react';

const styles = {
  active: 'bg-accent-500/10 text-accent-700',
  confirmed: 'bg-accent-500/10 text-accent-700',
  approved: 'bg-accent-500/10 text-accent-700',
  pending: 'bg-yellow-500/10 text-yellow-700',
  inactive: 'bg-slate-500/10 text-slate-600',
  deactivated: 'bg-slate-500/10 text-slate-600',
  rejected: 'bg-red-500/10 text-red-600',
  revoked: 'bg-red-500/10 text-red-600',
  expired: 'bg-red-500/10 text-red-600',
  suspended: 'bg-red-500/10 text-red-600',
  admin: 'bg-brand-500/10 text-brand-700',
  user: 'bg-slate-500/10 text-slate-600'
};

export default function Badge({ status, children }) {
  const cls = styles[status] || 'bg-slate-500/10 text-slate-600';
  return <span className={`badge ${cls}`}>{children || status}</span>;
}