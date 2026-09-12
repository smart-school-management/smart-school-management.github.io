import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Features from '@/components/home/Features';
import Pricing from '@/components/home/Pricing';
import Testimonials from '@/components/home/Testimonials';
import DemoContact from '@/components/home/DemoContact';
import CallToAction from '@/components/home/CallToAction';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Testimonials />
        <DemoContact />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}