import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    FiGrid, FiMap, FiBookOpen, FiFileText, FiUsers, FiMessageSquare,
    FiSearch, FiBell, FiUser, FiPlus, FiHelpCircle, FiLogOut,
    FiCheckCircle, FiClock, FiTarget, FiZap, FiCode, FiTrendingUp
} from "react-icons/fi";

const Dashboard = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const storedName = localStorage.getItem('username') || "Architect";

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                navigate('/login');
                return;
            }

            try {
                const profileRes = await axios.get(`https://studhunt-ai.onrender.com/user/profile/${userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProfile(profileRes.data);

                const postsRes = await axios.get('https://studhunt-ai.onrender.com/community/posts');
                setPosts(postsRes.data.slice(0, 3));
                setLoading(false);
            } catch (err) {
                console.error("Fetch Error:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleSignOut = () => {
        localStorage.clear();
        navigate('/');
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0B101E] flex flex-col items-center justify-center text-indigo-400 font-black italic uppercase tracking-[0.5em] animate-pulse">
            <FiZap size={40} className="mb-4" />
            SYNCHRONIZING ARCHITECT DATA...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0B101E] text-white flex font-sans selection:bg-indigo-500/30">

            {/* --- SIDEBAR --- */}
            <aside className="w-72 bg-[#0F172A] border-r border-slate-800 flex flex-col p-8 sticky top-0 h-screen">
                <div className="text-2xl font-black italic tracking-tighter text-white mb-12 uppercase">
                    StudHunt <span className="text-indigo-500 font-black italic tracking-tighter text-white mb-12 uppercase">AI</span>
                </div>

                <div className="flex items-center gap-4 mb-12 p-4 bg-[#1E293B] rounded-3xl border border-slate-800 shadow-2xl">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center border border-indigo-400 shadow-lg font-black text-white text-xl">
                        {storedName.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left overflow-hidden">
                        <p className="text-sm font-black uppercase tracking-widest text-white truncate w-32">{storedName}</p>
                        <p className="text-[10px] text-indigo-400 font-bold uppercase">{profile.academicYear || "Architect"}</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-4 uppercase tracking-[0.2em] text-[11px] font-black">
                    <button className="w-full flex items-center gap-4 p-4 bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-500/20">
                        <FiGrid size={18} /> Overview
                    </button>
                    <button
                        onClick={() => navigate('/roadmap')} // 🚀 Ye onClick line add karo
                        className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-white transition-all hover:bg-slate-800/50 rounded-2xl"
                    >
                        <FiMap size={18} /> Roadmaps
                    </button>
                    {/* AI Chatbot Button in Sidebar */}
                    <button
                        onClick={() => navigate('/chatbot')} // 🚀 Ye navigation line add kar di hai
                        className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-white transition-all hover:bg-slate-800/50 rounded-2xl group"
                    >
                        <FiMessageSquare size={18} className="group-hover:text-indigo-400 transition-colors" />
                        <span className="font-black uppercase tracking-[0.2em]">AI Chatbot</span>
                    </button>
                    <button onClick={() => navigate('/community')} className="w-full flex items-center gap-4 p-4 text-slate-500 hover:text-white transition-all hover:bg-slate-800/50 rounded-2xl">
                        <FiUsers size={18} /> Community
                    </button>
                </nav>

                <div className="pt-8 border-t border-slate-800">
                    <button onClick={handleSignOut} className="w-full flex items-center gap-4 p-4 text-slate-600 hover:text-red-400 font-black uppercase text-[11px] tracking-[0.2em] transition-colors italic">
                        <FiLogOut size={16} /> System Sign Out
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-1 p-12 overflow-y-auto">

                <header className="flex justify-between items-center mb-16">
                    <div className="relative w-[500px] group">
                        <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                        <input type="text" placeholder="Search architect nodes..." className="w-full bg-[#1E293B] border border-slate-800 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-indigo-500 outline-none transition-all shadow-inner" />
                    </div>
                    <div className="flex items-center gap-8 text-slate-400">
                        <FiBell size={24} className="hover:text-white cursor-pointer transition-colors" />
                        <div className="w-14 h-14 rounded-2xl bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center italic font-black text-lg shadow-2xl shadow-indigo-500/40">
                            {storedName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* --- DYNAMIC HERO SECTION --- */}
                <section className="mb-16 text-left relative">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500 opacity-10 blur-[80px] pointer-events-none"></div>
                    <h2 className="text-6xl font-black mb-4 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                        Welcome back, {storedName}!
                    </h2>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.3em] max-w-3xl leading-relaxed">
                        Status: <span className="text-green-400">Online</span> • Path: <span className="text-indigo-400">{profile.preferredField || "Analyzing"} Architect</span> • Goal: <span className="text-indigo-400">{profile.target || "Mastery"}</span>
                    </p>
                </section>

                {/* --- DYNAMIC XP BAR (New Added) --- */}
                <div className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] mb-12 shadow-2xl relative overflow-hidden">
                    <div className="flex justify-between items-end mb-4">
                        <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-1">Knowledge Level</p>
                            <h3 className="text-2xl font-black italic tracking-widest text-indigo-400 uppercase">{profile.currentKnowledge || "Basic"} ARCHITECT</h3>
                        </div>
                        <p className="text-sm font-black italic text-slate-500 tracking-widest">LEVEL 14 • 2,450 / 3,000 XP</p>
                    </div>
                    <div className="w-full h-3 bg-[#0F172A] rounded-full overflow-hidden border border-slate-800">
                        <div className="w-[74%] h-full bg-gradient-to-r from-indigo-600 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
                    </div>
                </div>

                {/* --- STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                    {[
                        { label: "Target", value: profile.target, icon: <FiTarget size={24} className="text-orange-400" /> },
                        { label: "Main Language", value: profile.language, icon: <FiCode size={24} className="text-green-400" /> },
                        { label: "Velocity", value: "18.4 Nodes/hr", icon: <FiTrendingUp size={24} className="text-blue-400" /> },
                        { label: "Interest", value: profile.preferredField, icon: <FiZap size={24} className="text-purple-400" /> }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6 shadow-2xl hover:border-indigo-500/50 transition-all duration-500 group">
                            <div className="p-4 bg-[#0F172A] rounded-2xl group-hover:scale-110 transition-transform shadow-inner">{stat.icon}</div>
                            <div className="text-left overflow-hidden">
                                <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                                <p className="text-xs font-black italic truncate text-white uppercase tracking-tight">{stat.value || "Syncing"}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- COMMUNITY POSTS --- */}
                <div className="md:col-span-12 bg-[#1E293B] border border-slate-800 rounded-[3rem] p-12 shadow-2xl">
                    <div className="flex justify-between items-center mb-12">
                        <h3 className="text-2xl font-black italic uppercase tracking-widest flex items-center gap-4">
                            <FiUsers className="text-indigo-400" size={28} /> Global Network Activity
                        </h3>
                        <span className="text-[10px] font-black text-green-400 uppercase tracking-widest animate-pulse">● Live Stream</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {posts.length > 0 ? posts.map((post, i) => (
                            <div key={i} className="bg-[#0F172A] border border-slate-800 p-8 rounded-[2.5rem] hover:border-indigo-500/30 transition-all duration-500 flex flex-col justify-between group shadow-xl">
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-black text-xs border border-slate-700 text-indigo-400 uppercase">
                                            {post.userEmail?.charAt(0)}
                                        </div>
                                        <p className="text-[10px] font-black text-slate-500 truncate w-32 lowercase tracking-normal">{post.userEmail}</p>
                                    </div>
                                    <p className="text-sm text-slate-300 italic font-medium leading-relaxed mb-6">"{post.content}"</p>
                                </div>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-800/50">
                                    <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter italic">#ArchitectNote</span>
                                    <FiMessageSquare className="text-slate-600 group-hover:text-indigo-400" />
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-3 py-10 text-slate-700 text-sm font-black uppercase tracking-[0.4em] italic animate-pulse">Scanning global nodes...</div>
                        )}
                    </div>
                </div>

                <footer className="mt-20 py-10 border-t border-slate-800/50 text-center text-slate-700 text-[10px] uppercase font-black italic tracking-[0.6em]">
                    StudHunt AI Core v2.0.4 • Architect Verified: {storedName}
                </footer>
            </main>
        </div>
    );
};

export default Dashboard;