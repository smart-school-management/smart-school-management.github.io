import React from 'react';

export default function LoadingSpinner({ fullScreen = false, text = 'লোড হচ্ছে...' }) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-12 w-12 rounded-full border-4 border-brand-100 border-t-brand-600 animate-spin" />
      <p className="text-slate-500 font-medium">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {content}
      </div>
    );
  }
  return content;
}
