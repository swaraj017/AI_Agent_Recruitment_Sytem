# 🚀 JobPlatform – AI Powered Recruitment System

JobPlatform is a full-stack MERN-based recruitment system where:

- HR can post job openings
- Candidates can apply for jobs
- AI automatically shortlists candidates
- An AI Agent handles resume evaluation and candidate interaction
- No human bias
- No manual shortlisting
- Fully automated intelligent screening process

This platform eliminates traditional manual screening and replaces it with a semantic AI-powered evaluation engine.

---

# 🤖 AI-Based Hiring Workflow

## Step 1: HR Posts Job
HR creates a job with:
- Required skills
- Experience requirements
- Role description

## Step 2: Candidates Apply
Users upload resumes and apply to jobs.

## Step 3: AI Resume Ranking
The system automatically:
- Converts Job Description into embedding
- Converts Resume into embedding
- Calculates semantic similarity
- Extracts skills
- Detects experience
- Generates final weighted score

## Step 4: AI Shortlisting
Candidates are shortlisted based on intelligent scoring.

## Step 5: AI Agent Interaction (No Human Bias)

The AI Agent:
- Reads the entire resume
- Understands candidate background
- Conducts automated conversation
- Evaluates responses
- Maintains structured scoring
- Works without human interruption

This ensures:
- Zero bias
- Consistent evaluation
- Fair candidate assessment
- Scalable recruitment process

---

# 🚀 AI Resume Ranking System (MERN ATS)

An AI-powered Resume Ranking system built using **Node.js + Transformers** that semantically matches resumes with job descriptions.

---

## 🔥 Overview

This system automatically ranks resumes based on:

- Semantic similarity (AI-based understanding)
- Required skills match
- Experience indicators
- Weighted scoring model

It works like a modern AI-powered Applicant Tracking System (ATS).

---

## 🧠 AI Technology

### 📦 Library Used

`@xenova/transformers`

- JavaScript implementation of HuggingFace Transformers
- Runs locally in Node.js
- No external API required
- No paid AI service needed

---

### 🤖 Model Used

`Xenova/all-MiniLM-L6-v2`

- Lightweight transformer model
- Converts text → 384-dimensional embedding vector
- Optimized for semantic similarity
- Fast and production-ready
- Ideal for backend systems

---

## ⚙️ How It Works

1. Convert Job Description → Embedding vector  
2. Convert Resume → Embedding vector  
3. Calculate Cosine Similarity  
4. Extract required skills from JD  
5. Calculate skill match score  
6. Detect experience signals  
7. Compute final weighted score  

---

## 🧮 Scoring Formula

Final Score =
(50% Semantic Similarity) +
(30% Skill Match) +
(20% Experience Score)



Score is returned as a percentage (0–100).

---



## 🏆 Why This Is Better Than TF-IDF
Traditional (TF-IDF)	This System
Keyword matching only	Understands meaning
No context awareness	Semantic understanding
Weak filtering	Intelligent ranking

## 🚀 Installation
npm install @xenova/transformers

## 📌 Features

AI-based semantic ranking

Skill extraction from job description

Experience detection

Weighted ATS-style scoring

Fast & scalable

Works offline after first model load

Bias-free candidate evaluation

AI-driven automated shortlisting


## 🔮Future Improvements

Dynamic skill extraction

Years of experience detection

Keyword stuffing detection

Batch embedding optimization

Store embeddings in database for faster ranking

Real-time AI interview scoring

AI behavioral analysis module


## 👨‍💻 Built With

Node.js

Express

MongoDB

Transformers (MiniLM)

MERN Stack Architecture

## 💡 Summary
JobPlatform demonstrates how modern AI and transformer-based embeddings can revolutionize recruitment by:

Replacing keyword filtering with semantic understanding

Automating candidate shortlisting

Enabling AI-driven interviews

Removing human bias from early-stage hiring

Creating a scalable, intelligent hiring ecosystem

