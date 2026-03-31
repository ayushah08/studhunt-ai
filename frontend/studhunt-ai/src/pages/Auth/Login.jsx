import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiArrowRight, FiGlobe } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Attempting Login...");
      
      const response = await axios.post('https://studhunt-ai.onrender.com/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // 🔍 DEBUG: Check backend response
      console.log("Backend Response Data:", response.data);

      if (response.status === 200 || response.status === 201) {
        
        // 🚀 Dost ke variables check karke save karo
        const token = response.data.token || response.data.accessToken || response.data; 
        const userId = response.data.userId || response.data.id || 1;

        // 🚀 USERNAME SAVE LOGIC: Agar backend se username nahi mil raha toh email ka pehla part use kar lo
        const displayName = response.data.username || formData.email.split('@')[0];
        localStorage.setItem('username', displayName);

        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            
            alert("Login Successful! Unlocking Dashboard...");
            navigate('/dashboard'); 
        } else {
            alert("Backend ne Token nahi bheja! Console check karo.");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Agar password galat hai toh backend ka message dikhao
      alert("Error: " + (error.response?.data?.message || "Login Fail! Credentials check karo."));
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans text-[10px] font-bold uppercase tracking-widest">
      <div className="bg-[#1E293B] w-full max-w-4xl rounded-[2.5rem] overflow-hidden flex shadow-2xl border border-slate-800">
        
        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-900 to-[#0F172A] p-16 flex-col justify-center relative italic">
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter">StudHunt AI</h1>
          <p className="text-slate-400 text-sm not-italic lowercase tracking-normal">Welcome back, Architect.</p>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-black text-white mb-8 italic">Sign In</h2>
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="text-slate-500 ml-1">Email Address</label>
              <div className="relative mt-2">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 lowercase font-medium tracking-normal" />
              </div>
            </div>
            <div>
              <label className="text-slate-500 ml-1">Password</label>
              <div className="relative mt-2">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full bg-[#0F172A] border border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 font-medium tracking-normal" />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 italic shadow-lg active:scale-95 transition-all">
              Access Portal <FiArrowRight />
            </button>
            <p className="text-center text-slate-500 mt-8">
              New here? <Link to="/register" className="text-indigo-400 font-black">Register Account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;