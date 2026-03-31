import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  FiMap, FiZap, FiCpu, FiTarget, FiBook, FiLayout, 
  FiArrowRight, FiLoader, FiCheckCircle, FiEdit3 
} from "react-icons/fi";

const Roadmap = () => {
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. INPUT FIELDS STATE
  const [formData, setFormData] = useState({
    academicYear: "",
    fieldOfInterest: "",
    goal: "",
    preferredField: "",
    language: "",
    currentKnowledge: "",
    target: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. AI Roadmap Generate Logic
  const generateAIRoadmap = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setRoadmapData(null); // Purana data clear karo

    const token = localStorage.getItem('token');
    
    try {
      console.log("Sending Data to AI:", formData); // Console mein check karne ke liye

      const res = await axios.post('https://studhunt-ai.onrender.com/roadmap/generate', 
        JSON.stringify(formData), // Data ko stringify karna safer hota hai
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // 🚀 Ye header zaroori hai
          }
        }
      );

      console.log("Full Backend Response:", res.data);

      // Agar backend se response aage-piche ho raha ho toh dono handle honge
      const result = res.data.roadmap || res.data; 
      
      if (result) {
        setRoadmapData(result); 
      } else {
        alert("Bhai, AI ne khali response bheja hai!");
      }

    } catch (err) {
      console.error("Generation Error Details:", err.response || err);
      alert(err.response?.data?.message || "AI Architecture Sync Failed! Check Internet or Backend.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B101E] text-white p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      
      {/* --- HEADER --- */}
      <div className="max-w-7xl mx-auto mb-10 flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3">
            <FiMap className="text-indigo-500" /> AI Roadmap <span className="text-slate-600">Generator</span>
          </h1>
        </div>
        <button onClick={() => navigate('/dashboard')} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-white transition-all italic border-b border-indigo-500/30 pb-1">Back to Dashboard</button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* --- LEFT: INPUT FORM (Full Dynamic) --- */}
        <div className="lg:col-span-4">
          <form onSubmit={generateAIRoadmap} className="bg-[#1E293B] border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-5">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400 mb-6 flex items-center gap-2">
              <FiEdit3 /> Input Parameters
            </h3>
            
            <div className="space-y-4">
              {[
                { name: "academicYear", label: "Academic Year", placeholder: "e.g. 2nd Year" },
                { name: "fieldOfInterest", label: "Field of Interest", placeholder: "e.g. Computer Science" },
                { name: "goal", label: "Main Goal", placeholder: "e.g. Full Stack Developer" },
                { name: "preferredField", label: "Preferred Field", placeholder: "e.g. Backend" },
                { name: "language", label: "Tech Language", placeholder: "e.g. Java / Python" },
                { name: "currentKnowledge", label: "Current Knowledge", placeholder: "e.g. Basic Java" },
                { name: "target", label: "Target", placeholder: "e.g. Internship / Job" }
              ].map((field) => (
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">{field.label}</label>
                  <input 
                    type="text" 
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="bg-[#0F172A] border border-slate-800 rounded-xl py-3 px-4 text-xs focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700 font-bold"
                  />
                </div>
              ))}
            </div>

            <button 
              type="submit"
              disabled={isGenerating}
              className={`w-full mt-6 py-4 rounded-xl font-black italic tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl uppercase
                ${isGenerating ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'}`}
            >
              {isGenerating ? <><FiLoader className="animate-spin" /> Architecting...</> : <><FiZap /> Generate Path</>}
            </button>
          </form>
        </div>

        {/* --- RIGHT: AI OUTPUT --- */}
        <div className="lg:col-span-8 min-h-[700px]">
          {!roadmapData && !isGenerating ? (
            <div className="h-full border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-700 bg-[#1E293B]/10">
               <FiCpu size={50} className="opacity-10 mb-4" />
               <p className="font-black uppercase tracking-[0.4em] text-[10px] italic">Ready to Initialize AI Path</p>
            </div>
          ) : isGenerating ? (
            <div className="h-full bg-[#1E293B]/30 border border-slate-800 rounded-[3rem] p-12 flex flex-col items-center justify-center space-y-6 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-pulse"></div>
               <div className="w-16 h-16 border-4 border-indigo-500/10 border-t-indigo-500 rounded-full animate-spin"></div>
               <div className="text-center">
                  <h3 className="text-xl font-black italic uppercase tracking-widest text-indigo-400 mb-2">Analyzing Requirements...</h3>
                  <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest animate-bounce">Architecting Personalized Nodes</p>
               </div>
            </div>
          ) : (
            <div className="bg-[#1E293B] border border-slate-800 rounded-[3rem] p-10 md:p-14 shadow-2xl animate-in fade-in duration-700 overflow-y-auto max-h-[85vh]">
               <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
                  <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center text-green-400 shadow-lg"><FiCheckCircle size={24}/></div>
                  <div className="text-left">
                    <h4 className="text-xl font-black italic uppercase tracking-tight">Strategy Generated</h4>
                    <p className="text-[9px] text-slate-500 font-black tracking-widest uppercase">Target Optimized for {formData.target}</p>
                  </div>
               </div>

               {/* AI CONTENT AREA */}
               <div className="text-left">
                  <div className="whitespace-pre-wrap text-slate-300 font-bold leading-relaxed text-sm italic">
                    {roadmapData}
                  </div>
               </div>

               <div className="mt-10 flex gap-4">
                  <button className="flex-1 bg-indigo-600 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all italic shadow-xl shadow-indigo-600/10">Save to Profile</button>
                  <button className="flex-1 bg-slate-800 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all italic">Export PDF</button>
               </div>
            </div>
          )}
        </div>

      </div>

      <footer className="mt-12 text-center text-slate-800 text-[9px] uppercase font-black italic tracking-[0.5em]">
        StudHunt AI Architecture • Presentation Mode Active
      </footer>
    </div>
  );
};

export default Roadmap;