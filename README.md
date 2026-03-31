🚀 StudHunt AI

"Banner" (https://capsule-render.vercel.app/api?type=waving&color=0:667eea,100:764ba2&height=200&section=header&text=StudHunt%20AI&fontSize=40&fontColor=ffffff&animation=fadeIn)

<p align="center">
  🧠 AI-powered student platform for learning, planning & growth
</p>---

🏆 Tech Stack

"Java" (https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
"Spring Boot" (https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
"PostgreSQL" (https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
"React" (https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
"FastAPI" (https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
"Render" (https://img.shields.io/badge/Render-430098?style=for-the-badge&logo=render&logoColor=white)
"Gemini AI" (https://img.shields.io/badge/Gemini-AI-black?style=for-the-badge&logo=google&logoColor=white)

---

📊 Project Stats

"GitHub Stats" (https://github-readme-stats.vercel.app/api?username=ayushah08&show_icons=true&theme=tokyonight)
"GitHub Streak" (https://streak-stats.demolab.com/?user=ayushah08&theme=tokyonight)

---

🧠 Overview

StudHunt AI is a full-stack AI platform designed to help students:

- 📚 Generate personalized learning roadmaps
- 🤖 Ask AI-powered academic questions
- 📝 Convert notes → summaries, MCQs, and key points
- 📄 Build resumes instantly
- 🌐 Engage with a student community

---

🏗️ Architecture

Frontend (React)
        ↓
Spring Boot Backend
        ↓
AI Service (FastAPI + Gemini)

---

🔥 Features

🤖 AI Chat

- Smart explanations
- Interview preparation
- Concept breakdowns

🗺️ Roadmap Generator

- Beginner → Advanced learning path
- Structured and goal-based

📝 Study Material AI

- Upload notes/files
- Generate:
  - Summary
  - MCQs
  - Important questions

📄 Resume Builder

- AI-generated resumes
- PDF export

👤 Profile System

- Personalized student data
- Goal-based recommendations

🌐 Community

- Post and interact
- Share knowledge

---

🔑 API Documentation

🔐 Auth

POST /auth/register  
POST /auth/login

👤 Profile

POST /user/profile  
GET /user/profile/{userId}

🤖 AI APIs

POST /chat  
POST /roadmap/generate  
POST /resume  
POST /resume/pdf  
POST /study-material

🌐 Community

GET /community/posts  
POST /community/post  
DELETE /community/posts/{id}  
DELETE /community/posts

---

📦 Example Requests

Chat

{
  "message": "Explain DBMS",
  "mode": "study"
}

---

Roadmap

{
  "prompt": "Java backend developer roadmap"
}

---

🚀 Setup

git clone https://github.com/ayushah08/studhunt-ai.git
cd studhunt-ai
./mvnw clean install
./mvnw spring-boot:run

---

🎯 Hackathon Pitch

💡 Problem:
Students struggle with structured learning, planning, and too many scattered resources.

🚀 Solution:
StudHunt AI provides:

- AI-powered roadmap generation
- Smart learning assistant
- Resume building tools
- Community support

🔥 Impact:
A single platform replacing:

- Multiple learning tools
- Resume builders
- Roadmap blogs
- Doubt-solving platforms

---

⚠️ Notes

- ⏳ First request may be slow (Render cold start)
- ⚡ Gemini free tier → limited usage
- 🔐 Backend securely handles AI requests

---

⭐ Support

If you like this project, give it a ⭐ on GitHub

"Footer" (https://capsule-render.vercel.app/api?type=waving&color=0:764ba2,100:667eea&height=120&section=footer)

---