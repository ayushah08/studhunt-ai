import React from 'react';
import { Link } from 'react-router-dom';
// Nayi Library Imports
import { HiOutlineSparkles, HiOutlineArrowRight, HiOutlineLightningBolt } from "react-icons/hi";
import { FiLayout, FiBookOpen, FiFileText, FiShield, FiUser, FiStar, FiGlobe, FiCpu, FiMessageSquare } from "react-icons/fi";

const LandingPage = () => {
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* --- 1. NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter text-indigo-400 cursor-pointer">StudHunt AI</div>
          
          <div className="hidden md:flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <button onClick={() => scrollToSection('features')} className="hover:text-white transition cursor-pointer">Features</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition cursor-pointer">How it Works</button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-white transition cursor-pointer">Testimonials</button>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex gap-4 items-center text-slate-400">
                <FiShield size={18} className="hover:text-indigo-400 transition cursor-pointer" />
                <Link to="/register" className="border border-slate-700 rounded-full p-1.5 hover:border-indigo-500 transition flex items-center justify-center">
                  <FiUser size={18}/>
                </Link>
             </div>
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-6xl mx-auto uppercase">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-1.5 rounded-full text-[10px] font-bold text-indigo-400 mb-8 tracking-widest uppercase animate-pulse">
          <HiOutlineSparkles className="w-3 h-3" />
          V2.0 NOW LIVE — POWERED BY GPT-4o
        </div>
        
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
          Your AI-Powered <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-500 to-purple-500">
            Student Companion
          </span>
        </h1>
        
        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-sm md:text-base leading-relaxed tracking-normal font-medium lowercase">
          Roadmaps, Study Tools, Resume Builder & Community — All in One. <br />
          Designed for the Academic Architect of the future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 font-black tracking-widest">
          <Link to="/Register" className="bg-indigo-500 hover:bg-indigo-600 px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-500/20 group text-sm">
            Get Started Free <HiOutlineArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
          <Link to="/Login" className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 px-8 py-3 rounded-xl font-bold transition text-sm">
            Login to Portal
          </Link>
        </div>

        {/* Dashboard Mockup Placeholder */}
        <div className="relative mx-auto max-w-5xl group mt-10">
          <div className="absolute -inset-1 bg-indigo-500 rounded-[2rem] blur opacity-10"></div>
          <div className="relative bg-[#1E293B] rounded-[2rem] border border-slate-700/50 p-3 shadow-2xl overflow-hidden">
             <div className="bg-[#0F172A] rounded-[1.5rem] aspect-[16/9] flex flex-col items-center justify-center border border-slate-800 relative">
                <div className="text-slate-900 font-black text-6xl md:text-9xl select-none opacity-20 uppercase tracking-tighter">StudHunt</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 3. FEATURE STACK --- */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20">
        <h2 className="text-3xl font-bold mb-12 border-b border-slate-800 pb-8 uppercase tracking-tighter">Engineered for Excellence</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 font-medium">
          <div className="md:col-span-8 bg-[#1E293B]/40 border border-slate-800 p-10 rounded-[2.5rem] relative group hover:border-indigo-500/50 transition duration-500">
             <FiLayout className="text-indigo-500 mb-6" size={32} />
             <h3 className="text-2xl font-bold mb-3 tracking-tight uppercase">AI Roadmap Generator</h3>
             <p className="text-slate-400 text-sm leading-relaxed lowercase tracking-normal">Define your goal, and our AI constructs a personalized learning path.</p>
          </div>

          <div className="md:col-span-4 bg-[#1E293B]/40 border border-slate-800 p-10 rounded-[2.5rem] hover:border-green-500/50 transition duration-500">
             <FiBookOpen className="text-green-500 mb-8" size={32} />
             <h3 className="text-2xl font-bold mb-3 tracking-tight uppercase">Academic Buddy</h3>
             <p className="text-slate-400 text-sm leading-relaxed lowercase tracking-normal">A 24/7 AI tutor that helps solve complex problems.</p>
          </div>

          <div className="md:col-span-4 bg-[#1E293B]/40 border border-slate-800 p-10 rounded-[2.5rem] hover:border-orange-500/50 transition duration-500 text-left">
             <FiFileText className="text-orange-500 mb-8" size={32} />
             <h3 className="text-2xl font-bold mb-3 tracking-tight uppercase">Resume Builder</h3>
             <p className="text-slate-400 text-sm leading-relaxed lowercase tracking-normal text-left">Generate ATS-optimized resumes effortlessly.</p>
          </div>

          <div className="md:col-span-8 bg-[#1E293B]/40 border border-slate-800 p-10 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 hover:border-purple-500/50 transition duration-500">
             <div className="max-w-sm text-left uppercase">
                <h3 className="text-2xl font-bold mb-3 tracking-tight uppercase">Interactive AI Chatbot</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed lowercase tracking-normal">Converse, summarize, and prep for exams.</p>
                <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 group underline underline-offset-8">Try Demo <HiOutlineArrowRight size={14}/></button>
             </div>
             <div className="bg-[#0F172A] p-5 rounded-2xl border border-slate-800 w-full max-w-[280px] shadow-2xl">
                <div className="flex gap-2 items-center text-[10px] text-slate-500 italic lowercase tracking-normal">
                   <HiOutlineLightningBolt size={14} className="text-indigo-400 animate-pulse"/>
                   <span>StudHunt AI is thinking...</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- 4. STEPS SECTION --- */}
      <section id="about" className="py-32 bg-[#0F172A] text-center px-6 scroll-mt-20">
        <h2 className="text-4xl font-bold mb-20 tracking-tight uppercase italic">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-5xl mx-auto relative uppercase">
           {[
             { num: "01", title: "Sync Data", desc: "Upload your syllabus." },
             { num: "02", title: "Generate Path", desc: "Get AI-optimized roadmap." },
             { num: "03", title: "Execute & Grow", desc: "Track and build." }
           ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-slate-800 flex items-center justify-center mb-8 bg-[#0F172A] text-slate-700 font-black text-xl shadow-lg">
                  {step.num}
                </div>
                <h4 className="font-bold text-lg mb-3 tracking-wider uppercase italic">{step.title}</h4>
                <p className="text-slate-500 text-[10px] leading-relaxed lowercase font-bold">{step.desc}</p>
              </div>
           ))}
        </div>
      </section>

      {/* --- 5. TESTIMONIALS --- */}
      <section id="testimonials" className="py-32 px-6 max-w-7xl mx-auto text-center scroll-mt-20">
        <h2 className="text-4xl font-bold mb-20 tracking-tight uppercase italic">Loved by Students</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
           {[
             { name: "Alex Carter", text: "StudHunt transformed my research process." },
             { name: "Sarah Jenkins", text: "The Resume Builder is a game changer." },
             { name: "David Liu", text: "Found a community that actually helps." }
           ].map((t, i) => (
             <div key={i} className="bg-[#1E293B]/20 border border-slate-800 p-10 rounded-[2.5rem] uppercase">
                <div className="flex gap-1 text-orange-500/60 mb-6 font-bold"><FiStar size={12}/><FiStar size={12}/><FiStar size={12}/></div>
                <p className="text-slate-300 text-[11px] italic mb-10 leading-relaxed font-bold lowercase tracking-normal">"{t.text}"</p>
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 border border-slate-700"><FiUser size={20} /></div>
                   <div className="text-[10px] font-black text-indigo-400 tracking-widest">{t.name}</div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* --- 6. FOOTER --- */}
      <footer className="border-t border-slate-800/60 py-16 px-6 text-center italic uppercase font-black tracking-widest">
         <div className="flex justify-center gap-8 mb-10 text-slate-600">
            <FiGlobe size={20} className="hover:text-white transition cursor-pointer" />
            <FiCpu size={20} className="hover:text-white transition cursor-pointer" />
            <FiMessageSquare size={20} className="hover:text-white transition cursor-pointer" />
         </div>
         <div className="text-2xl font-bold text-indigo-400 mb-3 tracking-tighter">StudHunt AI</div>
         <p className="text-[9px] text-slate-600 tracking-[0.3em] font-bold lowercase">© 2026 Built for Architects.</p>
      </footer>
    </div>
  );
};

export default LandingPage;