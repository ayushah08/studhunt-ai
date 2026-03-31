import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiBook, FiCode, FiTarget, FiZap, FiSettings, FiStar } from "react-icons/fi";

const Onboarding = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    academicYear: 'Year 3',
    fieldOfInterest: '',
    goal: '', 
    preferredField: '',
    language: 'Java', 
    currentKnowledge: 'Beginner', 
    target: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSaveProfile = async () => {
    try {
      // 🚀 Token aur UserId nikalne ki koshish (Dost ki requirement) 
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId') || 1; 

      console.log("Saving profile for userId:", userId);

      // 🚀 POST /user/profile logic 
      const response = await axios.post('https://studhunt-ai.onrender.com/user/profile', {
        ...formData,
        userId: parseInt(userId) // Body mein userId bhej rahe hain 
      }, {
        headers: { 
          'Content-Type': 'application/json',
          // Authorization header agar token hai toh 
          ...(token && { 'Authorization': `Bearer ${token}` }) 
        }
      });

      if (response.status === 200 || response.status === 201) {
        alert("Profile Saved Successfully!");
        navigate('/dashboard'); 
      }
    } catch (error) {
      console.error("Profile Save Error:", error);
      // Agar error aaye toh bhi dashboard pe jaane do presentation ke liye
      alert("Note: Moving to dashboard to show UI.");
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-4 md:p-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto text-center mb-10 uppercase italic">
        <h1 className="text-2xl font-black tracking-tighter text-indigo-400">StudHunt AI</h1>
        <p className="text-slate-600 text-[9px] font-bold tracking-[0.4em] not-italic">Step 02 of 03: Profile Setup</p>
      </div>

      <div className="max-w-4xl mx-auto bg-[#1E293B] rounded-[2.5rem] border border-slate-800 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="w-full h-1 bg-slate-800 rounded-full mb-12 overflow-hidden">
          <div className="w-[66%] h-full bg-indigo-500"></div>
        </div>

        <div className="space-y-10 text-left font-bold uppercase tracking-widest text-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-slate-500 flex items-center gap-2"><FiBook/> Academic Year</label>
              <select name="academicYear" onChange={handleChange} className="w-full bg-[#0F172A] border border-slate-800 rounded-xl p-3 text-white">
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-slate-500 flex items-center gap-2"><FiStar/> Field of Interest</label>
              <input name="fieldOfInterest" onChange={handleChange} placeholder="e.g. Computer Science" className="w-full bg-[#0F172A] border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-indigo-500" />
            </div>
            <div className="space-y-3">
              <label className="text-slate-500 flex items-center gap-2"><FiTarget/> Goal</label>
              <input name="goal" onChange={handleChange} placeholder="e.g. Become Full Stack Developer" className="w-full bg-[#0F172A] border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-indigo-500" />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-slate-500 flex items-center gap-2"><FiSettings/> Preferred Field</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {['Backend', 'Frontend', 'Full Stack', 'DSA', 'Testing', 'DevOps', 'ML', 'Data Science', 'UIUX'].map(field => (
                <button key={field} type="button" onClick={() => setFormData({...formData, preferredField: field})}
                  className={`py-3 rounded-xl border text-[9px] transition-all ${formData.preferredField === field ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg' : 'bg-[#0F172A] border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                  {field}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <label className="text-slate-500 flex items-center gap-2"><FiCode/> Programming Language</label>
              <select name="language" onChange={handleChange} className="w-full bg-[#0F172A] border border-slate-800 rounded-xl p-3 text-white">
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
                <option value="C++">C++</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-slate-500">Knowledge Level</label>
              <select name="currentKnowledge" onChange={handleChange} className="w-full bg-[#0F172A] border border-slate-800 rounded-xl p-3 text-white">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-slate-500 flex items-center gap-2"><FiZap/> Your Target</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {['Internship', 'Skill Improvement', 'Interview Prep', 'Academic Excellence', 'Project Building'].map(target => (
                <button key={target} type="button" onClick={() => setFormData({...formData, target: target})}
                  className={`py-3 px-2 rounded-xl border text-[9px] ${formData.target === target ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-[#0F172A] border-slate-800 text-slate-500'}`}>
                  {target}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row gap-4">
            <button onClick={handleSaveProfile} className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 italic text-xs transition-all active:scale-95">
              SAVE PROFILE & ENTER DASHBOARD <FiArrowRight size={16}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FiArrowRight = ({size}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);

export default Onboarding;