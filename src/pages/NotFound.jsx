import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-8xl font-black">৪০৪</h1>
        <p className="text-xl mt-4">দুঃখিত, পেজটি খুঁজে পাওয়া যায়নি।</p>
        <Link to="/" className="btn-white mt-8 inline-flex">হোম পেইজে ফিরুন</Link>
      </div>
    </div>
  );
}