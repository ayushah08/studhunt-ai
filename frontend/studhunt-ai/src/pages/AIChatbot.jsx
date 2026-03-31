import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FiMessageSquare, FiSend, FiUser, FiCpu, FiBook, 
  FiMic, FiZap, FiChevronLeft, FiTerminal, FiTarget 
} from "react-icons/fi";

const AIChatbot = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("study"); // Default mode as per friend's note
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new message arrives
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 🚀 AI CHAT LOGIC (Dost ki API: POST /chat)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user', time: new Date().toLocaleTimeString() };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const token = localStorage.getItem('token');
      
      const res = await axios.post('https://studhunt-ai.onrender.com/chat', {
        message: input,
        mode: mode // study, interview, or roadmap
      }, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });

      if (res.data.status === "success") {
        const aiMessage = { 
          text: res.data.response, 
          sender: 'ai', 
          mode: res.data.mode,
          time: new Date().toLocaleTimeString() 
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error("Chat Error:", err);
      const errorMessage = { text: "System Overload! Architecture sync failed.", sender: 'ai', isError: true };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B101E] text-white flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="bg-[#0F172A] border-b border-slate-800 p-6 flex justify-between items-center sticky top-0 z-50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white">
            <FiChevronLeft size={24} />
          </button>
          <div className="text-left">
            <h1 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-2">
              <FiCpu className="text-indigo-500" /> StudHunt <span className="text-indigo-400">AI Buddy</span>
            </h1>
            <p className="text-[9px] font-black text-green-500 uppercase tracking-[0.3em] animate-pulse">● Neural Engine Active</p>
          </div>
        </div>

        {/* --- MODE SELECTOR (As per friend's requirement) --- */}
        <div className="flex bg-[#1E293B] p-1.5 rounded-2xl border border-slate-800 gap-2">
          {[
            { id: 'study', icon: <FiBook />, label: 'Study' },
            { id: 'interview', icon: <FiTerminal />, label: 'Interview' },
            { id: 'roadmap', icon: <FiTarget />, label: 'Roadmap' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all
                ${mode === m.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </header>

      {/* --- CHAT MESSAGES AREA --- */}
      <main className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 max-w-5xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-4 py-20">
            <FiMessageSquare size={80} />
            <p className="font-black uppercase tracking-[0.5em] text-sm italic">Initiate Neural Link</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border shadow-lg
                ${msg.sender === 'user' ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-700 text-indigo-400'}`}>
                {msg.sender === 'user' ? <FiUser /> : <FiCpu />}
              </div>
              
              <div className="flex flex-col gap-2">
                <div className={`p-5 rounded-3xl text-sm font-medium leading-relaxed text-left shadow-xl
                  ${msg.sender === 'user' ? 'bg-[#1E293B] text-white rounded-tr-none' : 'bg-[#1E293B] border border-slate-800 text-slate-200 rounded-tl-none italic'}`}>
                  {msg.text}
                </div>
                <p className={`text-[8px] font-black uppercase tracking-widest text-slate-600 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time} {msg.mode && `• MODE: ${msg.mode}`}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-[#1E293B] border border-slate-800 px-6 py-4 rounded-full flex gap-2 items-center">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* --- INPUT AREA --- */}
      <footer className="p-6 md:p-10 bg-gradient-to-t from-[#0B101E] via-[#0B101E] to-transparent">
        <form onSubmit={handleSendMessage} className="max-w-5xl mx-auto relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask me anything in ${mode} mode...`}
            className="w-full bg-[#1E293B] border border-slate-800 rounded-[2rem] py-6 pl-8 pr-32 text-sm focus:outline-none focus:border-indigo-500 transition-all shadow-2xl placeholder:text-slate-600 font-bold"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
             <button type="button" className="p-3 text-slate-500 hover:text-indigo-400 transition-colors"><FiMic size={20}/></button>
             <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-90"
             >
               <FiSend size={20} />
             </button>
          </div>
        </form>
        <p className="mt-4 text-[9px] text-slate-700 font-black uppercase tracking-[0.4em] italic text-center">Powered by StudHunt Neural Architecture</p>
      </footer>
    </div>
  );
};

export default AIChatbot;