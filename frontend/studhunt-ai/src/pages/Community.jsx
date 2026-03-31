import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiSend, FiMessageSquare, FiZap, FiPlus, 
  FiClock, FiTrendingUp, FiActivity, FiShield, FiCpu 
} from "react-icons/fi";

const Community = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId') || 1;
  const username = localStorage.getItem('username') || "Architect";

  // 1. FETCH ALL POSTS
  const fetchPosts = async () => {
    try {
      const res = await axios.get('https://studhunt-ai.onrender.com/community/posts');
      setPosts(res.data.reverse()); 
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 2. CREATE POST
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    try {
      await axios.post('https://studhunt-ai.onrender.com/community/post', {
        userId: parseInt(userId),
        content: newPost
      });
      setNewPost("");
      fetchPosts(); 
    } catch (err) {
      alert("Transmission Failed!");
    }
  };

  // 3. REACT WITH 6 EMOJIS
  const handleReact = async (postId, type) => {
    try {
      // type will be LIKE, LAUGH, ANGRY, SAD, SMILE, or PARTY
      await axios.post(`https://studhunt-ai.onrender.com/community/react/${postId}?type=${type}`);
      fetchPosts(); 
    } catch (err) {
      console.error("React Error:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0B101E] flex flex-col items-center justify-center text-indigo-400 font-black italic uppercase tracking-[0.5em] animate-pulse">
      <FiZap size={40} className="mb-4" />
      SYNCHRONIZING NETWORK NODES...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B101E] text-white flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* --- TOP NAVIGATION --- */}
      <header className="bg-[#0F172A]/90 border-b border-slate-800 p-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4 text-left">
          <button onClick={() => navigate('/dashboard')} className="p-3 bg-[#1E293B] border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all text-slate-400 hover:text-white">
            <FiArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <FiZap className="text-indigo-500" /> Peer <span className="text-indigo-400">Network</span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="hidden md:block text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Node: {username}</span>
           <div className="w-12 h-12 rounded-2xl bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center italic font-black text-xs shadow-lg shadow-indigo-500/20">
                {username.charAt(0).toUpperCase()}
           </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- LEFT: BROADCAST & FEED (8 Columns) --- */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* BROADCAST BOX */}
          <section className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[60px]"></div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 flex items-center gap-2 italic">
              <FiPlus /> New Transmission
            </h2>
            <form onSubmit={handleCreatePost} className="space-y-6">
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your architectural progress or ask a node..."
                className="w-full bg-[#0F172A] border border-slate-800 rounded-3xl py-6 px-8 text-sm focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 font-medium h-32 resize-none"
              />
              <div className="flex justify-between items-center">
                 <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest italic">Encrypted Connection: Stable</p>
                 <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black uppercase italic tracking-widest flex items-center gap-3 shadow-xl shadow-indigo-600/20 transition-all">
                  <FiSend /> Broadcast
                 </button>
              </div>
            </form>
          </section>

          {/* FEED */}
          <div className="space-y-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl text-left hover:border-slate-700 transition-all">
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#0F172A] border border-slate-800 flex items-center justify-center font-black text-indigo-400">
                     {post.userEmail?.charAt(0).toUpperCase() || "A"}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white">{post.userEmail}</p>
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2 mt-1">
                      <FiClock /> {new Date(post.createdAt || Date.now()).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0F172A]/50 border border-slate-800/50 p-6 rounded-3xl mb-8">
                  <p className="text-base font-medium text-slate-300 leading-relaxed italic">
                    "{post.content}"
                  </p>
                </div>

                {/* 🚀 6 REACTION BUTTONS SYSTEM */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-800/50">
                  {[
                    { emoji: "❤️", type: "LIKE" },
                    { emoji: "😂", type: "LAUGH" },
                    { emoji: "😡", type: "ANGRY" },
                    { emoji: "😭", type: "SAD" },
                    { emoji: "🙂", type: "SMILE" },
                    { emoji: "🥳", type: "PARTY" }
                  ].map((react) => (
                    <button 
                      key={react.type}
                      onClick={() => handleReact(post.id, react.type)}
                      className="w-11 h-11 bg-[#0F172A] border border-slate-800 rounded-xl flex items-center justify-center text-lg hover:border-indigo-500 hover:bg-indigo-500/10 transition-all active:scale-90"
                    >
                      {react.emoji}
                    </button>
                  ))}
                  
                  <div className="ml-auto flex items-center gap-4">
                     <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">
                        <FiMessageSquare /> {post.commentsCount || 0}
                     </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: SIDEBAR WIDGETS (4 Columns) --- */}
        <div className="lg:col-span-4 space-y-8 hidden lg:block">
          
          {/* LIVE NETWORK STATS */}
          <section className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl text-left relative overflow-hidden">
             <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8 flex items-center gap-2">
                <FiActivity className="text-green-500"/> Network Velocity
             </h3>
             <div className="space-y-6">
                <div>
                   <p className="text-2xl font-black italic tracking-tighter text-white">4,281</p>
                   <p className="text-[8px] font-black uppercase text-slate-600 tracking-widest">Active Architects</p>
                </div>
                <div>
                   <p className="text-2xl font-black italic tracking-tighter text-indigo-400">12.8k</p>
                   <p className="text-[8px] font-black uppercase text-slate-600 tracking-widest">Nodes Exchanged</p>
                </div>
             </div>
          </section>

          {/* TRENDING TOPICS (Static) */}
          <section className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl text-left">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-6 flex items-center gap-2">
                <FiTrendingUp className="text-indigo-400"/> Trending Tags
             </h3>
             <div className="flex flex-wrap gap-2">
                {['#java_mastery', '#spring_ai', '#dsa_roadmap', '#react_nodes', '#dbms_help'].map(tag => (
                   <span key={tag} className="text-[9px] font-black uppercase bg-[#0F172A] border border-slate-800 px-3 py-1.5 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer">
                      {tag}
                   </span>
                ))}
             </div>
          </section>

          {/* SYSTEM GUIDELINES */}
          <section className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-8 rounded-[2.5rem] shadow-2xl text-left">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 flex items-center gap-2">
                <FiShield /> Safety Protocol
             </h3>
             <ul className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                <li className="flex gap-2"><span>01.</span> Be respectful to fellow nodes.</li>
                <li className="flex gap-2"><span>02.</span> No unauthorized spamming.</li>
                <li className="flex gap-2"><span>03.</span> Sync knowledge, grow together.</li>
             </ul>
          </section>

          {/* SYSTEM INFO */}
          <div className="p-8 text-center opacity-30">
             <FiCpu size={30} className="mx-auto mb-4" />
             <p className="text-[8px] font-black uppercase tracking-[0.5em]">Neural Link v2.0.4</p>
          </div>
        </div>

      </main>

      <footer className="mt-10 py-10 text-center text-slate-800 text-[9px] uppercase font-black italic tracking-[0.6em]">
        StudHunt Core Infrastructure • Community Protocol
      </footer>
    </div>
  );
};

export default Community;