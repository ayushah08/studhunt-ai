import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiGrid, FiMap, FiBookOpen, FiFileText, FiUsers, FiMessageSquare, 
  FiSearch, FiBell, FiUser, FiPlus, FiHelpCircle, FiLogOut, 
  FiCheckCircle, FiClock, FiTarget, FiSend, FiCode 
} from "react-icons/fi";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // 🛡️ Auth Check: Agar token nahi hai toh login pe bhej do
      if (!token || !userId) {
        navigate('/login');
        return;
      }

      try {
        // 1. Fetch User Profile (Dost ki API: /user/profile/{userId})
        const profileRes = await axios.get(`https://studhunt-ai.onrender.com/user/profile/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setProfile(profileRes.data);

        // 2. Fetch Community Posts
        const postsRes = await axios.get('https://studhunt-ai.onrender.com/community/posts');
        setPosts(postsRes.data.slice(0, 3)); 

        setLoading(false);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <div className="min-h-screen bg-[#0B101E] flex items-center justify-center text-indigo-400 font-black italic">SYNCHRONIZING ARCHITECT DATA...</div>;

  return (
    <div className="min-h-screen bg-[#0B101E] text-white flex font-sans selection:bg-indigo-500/30">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col p-6 sticky top-0 h-screen">
        <div className="text-xl font-black italic tracking-tighter text-white mb-10 uppercase">StudHunt AI</div>

        {/* 👤 User Mini Profile - DYNAMIC NAME HERE */}
        <div className="flex items-center gap-3 mb-10 p-2 bg-[#1E293B]/50 rounded-2xl border border-slate-800/50">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shadow-lg font-black text-indigo-400">
             {profile.username?.charAt(0).toUpperCase() || <FiUser />}
          </div>
          <div className="text-left overflow-hidden">
            <p className="text-[11px] font-black uppercase tracking-widest text-white truncate">
                {profile.username || "Architect"} 
            </p>
            <p className="text-[9px] text-slate-500 font-bold uppercase truncate">{profile.academicYear || "User"}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 uppercase tracking-[0.15em] text-[10px] font-bold">
          <button className="w-full flex items-center gap-3 p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 shadow-lg">
            <FiGrid size={16}/> Overview
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-white transition group">
            <FiMap size={16} className="group-hover:text-indigo-400"/> Roadmaps
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-white transition group">
            <FiMessageSquare size={16} className="group-hover:text-indigo-400"/> AI Chatbot
          </button>
          <button className="w-full flex items-center gap-3 p-3 text-slate-500 hover:text-white transition group">
            <FiUsers size={16} className="group-hover:text-indigo-400"/> Community
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-800 space-y-4">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest italic flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/20 transition-all active:scale-95">
            New Project <FiPlus />
          </button>
          <div className="space-y-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-left px-2 mt-4">
            <button className="flex items-center gap-3 hover:text-white w-full"><FiHelpCircle size={14}/> Help Center</button>
            <button onClick={handleSignOut} className="flex items-center gap-3 hover:text-red-400 text-slate-600 w-full transition-colors font-black"><FiLogOut size={14}/> Sign Out</button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-96 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" />
            <input type="text" placeholder="Search roadmap nodes..." className="w-full bg-[#1E293B]/50 border border-slate-800 rounded-xl py-2 pl-12 pr-4 text-xs focus:outline-none focus:border-indigo-500 transition" />
          </div>
          <div className="flex items-center gap-6">
            <FiBell className="text-slate-500 hover:text-white cursor-pointer" size={18} />
            {/* Header Profile Circle - DYNAMIC INITIAL */}
            <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-indigo-500/50 flex items-center justify-center italic font-black text-xs shadow-lg shadow-indigo-500/20">
                {profile.username?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* 👋 Welcome Section - DYNAMIC NAME HERE */}
        <section className="mb-10 text-left">
          <h2 className="text-4xl font-black mb-3 tracking-tighter italic uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
            Welcome, {profile.username || "Architect"}!
          </h2>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] max-w-2xl leading-relaxed">
            Architecting <span className="text-indigo-400">{profile.preferredField || "your future"}</span> path. 
            Currently in <span className="text-indigo-400">{profile.academicYear}</span> aiming for <span className="text-indigo-400">{profile.target}</span>.
          </p>
        </section>

        {/* --- DYNAMIC PROFILE STATS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
           {[
             { label: "Current Goal", value: profile.goal, icon: <FiTarget className="text-orange-400" /> },
             { label: "Main Language", value: profile.language, icon: <FiCode className="text-green-400" /> },
             { label: "Expertise", value: profile.currentKnowledge, icon: <FiCheckCircle className="text-blue-400" /> },
             { label: "Roadmap Target", value: profile.target, icon: <FiMap className="text-purple-400" /> }
           ].map((stat, i) => (
             <div key={i} className="bg-[#1E293B] border border-slate-800 p-5 rounded-[1.5rem] flex items-center gap-4 hover:border-indigo-500/30 transition-all duration-500 shadow-xl group">
                <div className="p-3 bg-[#0F172A] rounded-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <div className="text-left overflow-hidden">
                   <p className="text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">{stat.label}</p>
                   <p className="text-[10px] font-black italic truncate text-white uppercase">{stat.value || "Calculating..."}</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          <div className="md:col-span-8 bg-[#1E293B] border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="flex justify-between items-start mb-10">
                <div>
                   <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase px-3 py-1 rounded-full border border-indigo-500/20 tracking-widest italic">Live Architecture</span>
                   <h3 className="text-2xl font-black mt-3 italic tracking-tight">{profile.preferredField || "Skill"} Mastery</h3>
                </div>
                <div className="text-right">
                   <p className="text-3xl font-black text-indigo-400 italic">42%</p>
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Efficiency</p>
                </div>
             </div>
             
             <div className="space-y-8 relative">
                <div className="flex gap-4 relative z-10">
                   <div className="w-3 h-3 rounded-full bg-green-500 mt-1 shadow-[0_0_10px_#22c55e]"></div>
                   <div className="flex-1 pb-4 border-l border-slate-800 ml-[-1.1rem] pl-8">
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Identity Authentication</p>
                      <p className="text-[10px] text-slate-500 font-medium">Successfully completed as {profile.username}</p>
                   </div>
                </div>
                <div className="flex gap-4 relative z-10">
                   <div className="w-3 h-3 rounded-full bg-orange-500 mt-1 shadow-[0_0_10px_#f97316] animate-pulse"></div>
                   <div className="flex-1 pb-4 border-l border-slate-800 ml-[-1.1rem] pl-8">
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Mastering {profile.language || "Stack"}</p>
                      <p className="text-[10px] text-indigo-400 font-black italic">AI Suggestion: Master {profile.language} Logic</p>
                   </div>
                </div>
             </div>
             <button className="mt-8 bg-indigo-600 hover:bg-indigo-700 w-full py-4 rounded-2xl font-black text-[10px] italic tracking-[0.3em] shadow-xl transition-all active:scale-[0.98] uppercase">
                Resume {profile.preferredField} Path
             </button>
          </div>

          <div className="md:col-span-4 space-y-6">
             <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-[2rem] p-6 shadow-xl border-l-4 border-l-indigo-500">
                <FiMessageSquare className="text-indigo-400 mb-6" size={24}/>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Architect Insight</p>
                <h4 className="text-[11px] font-bold leading-relaxed italic text-indigo-100 uppercase">
                  "Hey {profile.username?.split(' ')[0]}, your goal for {profile.target} is within reach. Focus on {profile.preferredField} projects."
                </h4>
             </div>
             
             <div className="bg-[#1E293B] border border-slate-800 rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
                <div className="flex justify-between mb-8 items-center">
                   <FiClock className="text-green-400" size={20}/>
                   <span className="text-green-400 text-[9px] font-black tracking-widest bg-green-500/10 px-2 py-1 rounded-md">LIVE SYNC</span>
                </div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Study Velocity</p>
                <h4 className="text-2xl font-black italic tracking-tighter">18.4 NODES/HR</h4>
             </div>
          </div>

          {/* Community Section */}
          <div className="md:col-span-12 bg-[#1E293B] border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-black italic uppercase tracking-widest flex items-center gap-3">
                    <FiUsers className="text-indigo-400"/> Network Activity
                </h3>
                <button className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:underline italic">Broadcast Message →</button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {posts.length > 0 ? posts.map((post, i) => (
                  <div key={i} className="bg-[#0F172A] border border-slate-800 p-6 rounded-[2rem] hover:border-indigo-500/30 transition group flex flex-col justify-between">
                     <div>
                       <div className="flex items-center gap-3 mb-4">
                          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center font-black text-[9px] border border-slate-700">{post.userEmail?.charAt(0).toUpperCase()}</div>
                          <p className="text-[9px] font-black text-slate-400 truncate w-32 lowercase tracking-normal">{post.userEmail}</p>
                       </div>
                       <p className="text-[10px] text-slate-300 italic font-medium leading-relaxed mb-4 line-clamp-3">"{post.content}"</p>
                     </div>
                     <div className="flex gap-2">
                        <span className="bg-indigo-500/10 text-indigo-400 text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-tighter">#PeerReview</span>
                     </div>
                  </div>
                )) : (
                  <p className="text-slate-600 text-[10px] italic font-bold uppercase tracking-widest">Fetching global network nodes...</p>
                )}
             </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-slate-800 text-[9px] uppercase tracking-[0.5em] font-black italic">
          AI Architecture Engine v2.0 • Node: {profile.userId || "001"} • Architect: {profile.username || "Guest"}
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;