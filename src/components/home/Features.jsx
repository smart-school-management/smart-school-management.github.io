import React from 'react';
import { motion } from 'framer-motion';
import {
  HiOutlineHome, HiOutlineClipboardDocumentCheck, HiOutlineDocumentText, HiOutlineBookOpen,
  HiOutlineCreditCard, HiOutlineBanknotes, HiOutlineChartBar, HiOutlineChatBubbleLeftRight,
  HiOutlinePresentationChartLine, HiOutlineAcademicCap, HiOutlineChartPie, HiOutlineBell
} from 'react-icons/hi2';

const features = [
  { icon: HiOutlineHome, title: 'ড্যাশবোর্ড', desc: 'প্রতিষ্ঠানের সার্বিক তথ্য একনজরে — শিক্ষার্থী, আয়-ব্যয়, উপস্থিতি ও নোটিশ গ্রাফসহ।', benefit: 'রিয়েল-টাইম সিদ্ধান্ত গ্রহণ সহজ' },
  { icon: HiOutlineClipboardDocumentCheck, title: 'উপস্থিতি', desc: 'শিক্ষার্থী ও শিক্ষকের দৈনিক হাজিরা এবং স্বয়ংক্রিয় SMS অ্যালার্ট।', benefit: '৮৫% সময় সাশ্রয়' },
  { icon: HiOutlineDocumentText, title: 'পরীক্ষা', desc: 'রুটিন, মার্কশিট, রেজাল্ট ও গ্রেডশিট স্বয়ংক্রিয়ভাবে তৈরি ও প্রকাশ।', benefit: '১০০% নির্ভুল হিসাব' },
  { icon: HiOutlineBookOpen, title: 'গ্রন্থাগার', desc: 'বই ইস্যু-রিটার্ন, জরিমানা ও স্টক ব্যবস্থাপনা একসাথে।', benefit: 'হারানো বই শূন্যে নামিয়ে আনুন' },
  { icon: HiOutlineCreditCard, title: 'ফি', desc: 'মাসিক বেতন, ভর্তি ও পরীক্ষার ফি আদায়, রশিদ ও বকেয়া ট্র্যাকিং।', benefit: 'বকেয়া আদায় সহজ ও দ্রুত' },
  { icon: HiOutlineBanknotes, title: 'বেতন', desc: 'শিক্ষক-কর্মচারীর বেতন শীট, বোনাস, কর্তন ও পে-স্লিপ প্রিন্ট।', benefit: 'স্বচ্ছ ও ঝামেলাবিহীন হিসাব' },
  { icon: HiOutlineChartBar, title: 'আয়-ব্যয়', desc: 'দৈনিক-মাসিক-বার্ষিক আয়-ব্যয়ের সম্পূর্ণ হিসাব ও রিপোর্ট।', benefit: 'হিসাবরক্ষক খরচ কমান' },
  { icon: HiOutlineChatBubbleLeftRight, title: 'এসএমএস', desc: 'অভিভাবকদের কাছে হাজিরা, ফি, রেজাল্ট বা নোটিশ তাৎক্ষণিক SMS।', benefit: 'এক ক্লিকে শত শত অভিভাবককে জানান' },
  { icon: HiOutlinePresentationChartLine, title: 'উন্নয়ন কার্ড', desc: 'শিক্ষার্থীর একাডেমিক অগ্রগতি ও আচরণভিত্তিক ডিজিটাল প্রোগ্রেস কার্ড।', benefit: 'অভিভাবকের আস্থা বৃদ্ধি' },
  { icon: HiOutlineAcademicCap, title: 'শিক্ষার্থী', desc: 'ভর্তি থেকে সম্পূর্ণ তথ্য, আইডি কার্ড ও অভিভাবকের তথ্য সংরক্ষণ।', benefit: 'মুহূর্তেই তথ্য অনুসন্ধান' },
  { icon: HiOutlineChartPie, title: 'রিপোর্ট', desc: 'একাডেমিক, আর্থিক ও প্রশাসনিক বিস্তারিত গ্রাফিক্যাল রিপোর্ট।', benefit: 'PDF/Excel এক্সপোর্ট সুবিধা' },
  { icon: HiOutlineBell, title: 'নোটিশ', desc: 'প্রতিষ্ঠানের সকল নোটিশ ও ঘোষণা ডিজিটালভাবে প্রকাশ ও সংরক্ষণ।', benefit: 'তাৎক্ষণিক তথ্য প্রবাহ' }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-section-gradient">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="badge bg-brand-500/10 text-brand-700">✨ সম্পূর্ণ ফিচার তালিকা</span>
          <h2 className="section-title mt-4">
            প্রতিষ্ঠান পরিচালনার <span className="gradient-text">সব প্রয়োজন</span> একটি সফটওয়্যারে
          </h2>
          <p className="section-subtitle">প্রতিটি মডিউল তৈরি হয়েছে বাংলাদেশের শিক্ষাপ্রতিষ্ঠানের বাস্তব চাহিদা বিবেচনায়, যাতে আপনি পান সর্বোচ্চ সময় ও খরচ সাশ্রয়।</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="group card hover:border-brand-200 hover:shadow-soft transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center text-2xl group-hover:bg-gradient-to-br group-hover:from-brand-600 group-hover:to-accent-500 group-hover:text-white transition-all">
                <f.icon />
              </div>
              <h3 className="mt-4 font-bold text-lg text-slate-900">{f.title}</h3>
              <p className="mt-2 text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              <p className="mt-3 text-xs font-bold text-accent-600 flex items-center gap-1">✅ {f.benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
