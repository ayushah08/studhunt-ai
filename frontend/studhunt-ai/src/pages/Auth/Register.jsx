import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiLock, FiShield, FiArrowRight, FiGlobe, FiLinkedin } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();

  // --- 1. STATE ---
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // --- 2. THE MISSING FUNCTION (Isse error solve hoga) ---
const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Bhai, passwords match nahi ho rahe!");
      return;
    }

    try {
      const response = await axios.post('https://studhunt-ai.onrender.com/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 || response.status === 201) {
        // 🚀 YE RAHI WO LINE: Username save ho raha hai
        localStorage.setItem('username', response.data.username || formData.username); 

        // Token aur userId save karna mat bhulna
        if (response.data.token) localStorage.setItem('token', response.data.token);
        if (response.data.userId) localStorage.setItem('userId', response.data.userId);

        alert("Registration Successful!");
        navigate('/onboarding'); 
      }
    } catch (error) {
      console.error("Backend Error:", error);
      alert(error.response?.data?.message || "Server error!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans selection:bg-indigo-500/30">
      <div className="bg-[#1E293B] w-full max-w-5xl rounded-[2.5rem] overflow-hidden flex shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-500">
        
        {/* LEFT SIDE (Branding) */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-900 via-[#0F172A] to-[#0F172A] p-16 flex-col justify-between relative overflow-hidden text-left">
          <div className="z-10 uppercase font-black italic tracking-tighter text-white">
            <h1 className="text-4xl mb-6">StudHunt AI</h1>
            <p className="text-slate-400 text-sm font-bold tracking-widest lowercase not-italic">Architecting academic excellence.</p>
          </div>
          <div className="bg-[#1e293b66] backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 z-10 shadow-xl">
            <p className="italic text-slate-300 text-sm mb-6 leading-relaxed font-bold tracking-widest">"The best way to predict your academic future is to design it."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-black text-white">AC</div>
              <div className="text-left">
                <p className="text-xs font-bold text-white uppercase italic font-black">Alex Carter</p>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-tighter">PHD ARCHITECT</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-white mb-2 tracking-tight uppercase italic text-left">Welcome to the Lab</h2>
          <form onSubmit={handleRegister} className="space-y-5 text-left font-bold uppercase tracking-widest text-[10px] mt-8">
            <div className="space-y-2">
              <label className="text-slate-500 ml-1">Username</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="alex_architect" className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3.5 pl-12 text-white focus:outline-none focus:border-indigo-500 transition shadow-inner font-medium tracking-normal lowercase" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-slate-500 ml-1">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="alex@univ.edu" className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3.5 pl-12 text-white focus:outline-none focus:border-indigo-500 transition shadow-inner font-medium tracking-normal lowercase" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="space-y-2">
                <label className="text-slate-500 ml-1">Password</label>
                <div className="relative"><FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" /><input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3.5 pl-10 text-white focus:outline-none focus:border-indigo-500 font-medium" /></div>
              </div>
              <div className="space-y-2">
                <label className="text-slate-500 ml-1">Confirm</label>
                <div className="relative"><FiShield className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" /><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3.5 pl-10 text-white focus:outline-none focus:border-indigo-500 font-medium" /></div>
              </div>
            </div>

            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl mt-6 flex items-center justify-center gap-2 italic tracking-[0.2em] shadow-xl active:scale-[0.98]">
              Initialize Account <FiArrowRight />
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-8 font-bold italic tracking-widest lowercase">Already have an account? <Link to="/login" className="text-indigo-400 font-black uppercase not-italic">Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;