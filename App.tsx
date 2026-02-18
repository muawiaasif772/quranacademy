import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Pricing from './pages/Pricing';
import BookTrial from './pages/BookTrial';
import Tutors from './pages/Tutors';
import HowItWorks from './pages/HowItWorks';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Reviews } from './pages/Reviews';
import { COURSES } from './data';
import { CheckCircle2, ArrowRight, ShieldCheck, Clock, BarChart } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const CourseDetail: React.FC = () => {
  const { pathname } = useLocation();
  const slug = pathname.split('/').pop();
  const course = COURSES.find(c => c.slug === slug);

  if (!course) return (
    <div className="py-40 text-center bg-[#FFFDF6] dark:bg-[#0D0D0D]">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-6">Course Not Found</h1>
      <Link to="/courses" className="text-[#074E3C] font-black uppercase tracking-widest text-sm hover:underline">Return to catalog</Link>
    </div>
  );

  return (
    <div className="bg-[#FFFDF6] dark:bg-[#0D0D0D] pt-32 pb-24 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-10">
            <div className="inline-flex items-center space-x-3 bg-[#f3f9f7] dark:bg-[#161616] px-4 py-2 rounded-full border border-[#074E3C22]">
              <span className="w-2 h-2 rounded-full bg-[#074E3C]"></span>
              <span className="text-xs font-black uppercase tracking-widest text-[#074E3C]">{course.level} PROGRAM</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tighter">
              {course.title}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {course.longDescription}
            </p>
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">What You'll Master</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.features.map((f, i) => (
                  <div key={i} className="flex items-center space-x-3 bg-white dark:bg-[#161616] p-5 rounded-3xl border-2 border-[#074E3C11] shadow-xl hover:border-[#074E3C44] transition-all">
                    <CheckCircle2 className="text-[#074E3C] shrink-0" size={20} />
                    <span className="font-bold text-slate-700 dark:text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-[#074E3C22] rounded-[4rem] blur-3xl opacity-50"></div>
            <div className="relative rounded-[4rem] overflow-hidden border-[12px] border-white dark:border-[#161616] shadow-2xl">
              <img src={course.image} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-[2s]" alt={course.title} />
              <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/10 backdrop-blur-2xl rounded-[3rem] border border-white/20 text-center">
                <Link to="/book-free-trial" className="w-full bg-[#074E3C] text-white py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center space-x-3">
                  <span>Start Free Trial</span>
                  <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:slug" element={<CourseDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/book-free-trial" element={<BookTrial />} />
          <Route path="/tutors" element={<Tutors />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/register" element={<BookTrial />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;