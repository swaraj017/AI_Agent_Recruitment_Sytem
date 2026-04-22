import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans selection:bg-white selection:text-black">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-zinc-900 relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center font-bold text-black">
            R
          </div>
          <span className="text-xl font-semibold tracking-tight">RecruitAI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#product" className="hover:text-white transition-colors">Product</a>
          <a href="#agents" className="hover:text-white transition-colors">Agents</a>
          <a href="#enterprise" className="hover:text-white transition-colors">Enterprise</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/signin" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
            Log in
          </Link>
          <Link to="/signup" className="px-4 py-2 bg-white hover:bg-zinc-200 text-black rounded-md transition-colors">
            Start building
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center pt-28 pb-20 relative overflow-hidden px-4">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-60" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-white mr-2 shadow-[0_0_10px_rgba(255,255,255,1)]"></span>
            Agent Engine 2.0 is now live
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05] mb-6 text-white"
          >
            Automate hiring with <br className="hidden sm:block" />
            <span className="text-zinc-500">invisible AI agents.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Deploy autonomous agents to source, screen, and schedule top tier talent. 
            Transform your entire recruitment lifecycle from months to days.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-4 flex-col sm:flex-row w-full sm:w-auto"
          >
            <Link 
              to="/signup" 
              className="px-8 py-3.5 bg-white hover:bg-zinc-200 text-black font-medium text-sm rounded-lg transition-all w-full sm:w-auto text-center shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              Start for free
            </Link>
            <button className="px-8 py-3.5 border border-zinc-800 hover:bg-zinc-900 text-white font-medium text-sm rounded-lg transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
              Explore Demo
            </button>
          </motion.div>
        </div>

        {/* Dashboard Mockup UI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto mt-24 relative z-10"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-20 blur-xl"></div>
          
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl relative">
            <div className="rounded-xl border border-zinc-900 bg-[#050505] overflow-hidden flex flex-col md:flex-row h-[400px]">
              
              {/* Sidebar Mockup */}
              <div className="w-56 border-r border-zinc-900 p-6 hidden md:block">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center text-black font-bold text-[10px]">R</div>
                  <div className="h-4 w-20 bg-zinc-800 rounded"></div>
                </div>
                <div className="space-y-5">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-sm ${i === 0 ? 'bg-white' : 'bg-zinc-800/50'}`}></div>
                      <div className={`h-3 rounded ${i === 0 ? 'w-20 bg-white' : 'w-24 bg-zinc-800/60'}`}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content Mockup */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="h-6 w-32 bg-white rounded mb-2"></div>
                    <div className="h-4 w-48 bg-zinc-800 rounded"></div>
                  </div>
                  <div className="h-9 w-28 bg-white rounded-md hidden sm:block"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="border border-zinc-900 rounded-lg p-5 bg-zinc-950/30">
                      <div className="h-3 w-16 bg-zinc-700 rounded mb-4"></div>
                      <div className="h-7 w-12 bg-white rounded"></div>
                    </div>
                  ))}
                </div>

                <div className="flex-1 border border-zinc-900 rounded-lg p-6 bg-zinc-950/30 relative overflow-hidden">
                   {/* Mock candidate row */}
                   <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-4">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-zinc-800 hidden sm:block"></div>
                       <div>
                         <div className="h-4 w-32 bg-zinc-200 rounded mb-2"></div>
                         <div className="h-3 w-20 bg-zinc-700 rounded"></div>
                       </div>
                     </div>
                     <div className="px-3 py-1 rounded bg-white text-black text-[10px] sm:text-xs font-semibold tracking-wide">98% MATCH</div>
                   </div>
                   {/* Mock candidate row */}
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-full bg-zinc-800 hidden sm:block"></div>
                       <div>
                         <div className="h-4 w-28 bg-zinc-200 rounded mb-2"></div>
                         <div className="h-3 w-24 bg-zinc-700 rounded"></div>
                       </div>
                     </div>
                     <div className="px-3 py-1 rounded border border-zinc-800 text-zinc-400 text-[10px] sm:text-xs font-semibold tracking-wide bg-zinc-950">IN REVIEW</div>
                   </div>

                   {/* Overlay shadow for fade effect */}
                   <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section id="product" className="py-24 px-4 relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
            Everything you need to hire at scale.
          </h2>
          <p className="text-lg text-zinc-400 font-light">
            Our platform provides agents that handle the heavy lifting. You just interview the best.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Feature 1 */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-zinc-900 bg-zinc-950 p-8 rounded-2xl hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black mb-6 shadow-lg shadow-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">Automated Screening</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Our AI instantly parses resumes, scores candidates based on custom criteria, and filters out noise so you only see top matches.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-zinc-900 bg-zinc-950 p-8 rounded-2xl hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black mb-6 shadow-lg shadow-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">Smart Scheduling</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Agents coordinate directly with candidates via email to find interview slots that work for your team, removing endless back-and-forth.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-zinc-900 bg-zinc-950 p-8 rounded-2xl hover:border-zinc-700 transition-colors"
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-black mb-6 shadow-lg shadow-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-3 text-white">Instant Feedback</h3>
            <p className="text-zinc-400 leading-relaxed font-light">
              Keep candidates happy with automated, personalized feedback loops ensuring a flawless candidate experience from day one.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* How it Works / Steps */}
      <section id="agents" className="py-24 px-4 w-full border-t border-zinc-900 bg-[#050505] relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              How the Agent Engine works.
            </h2>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                step: "01",
                title: "Define your ideal candidate",
                desc: "Upload a job description and configure your scoring metrics. The agent learns what you're looking for instantly."
              },
              {
                step: "02",
                title: "Agent reviews applications",
                desc: "As hundreds of applications pour in, our agent reads every single one in seconds, providing a match percentage."
              },
              {
                step: "03",
                title: "Interview the best",
                desc: "The agent automatically schedules interviews with the top 5% of candidates. You just show up and hire."
              }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col md:flex-row gap-6 md:gap-16 items-start border-b border-zinc-900 pb-16 last:border-0 last:pb-0 group"
              >
                <motion.div 
                  className="text-5xl md:text-7xl font-light text-zinc-800 tracking-tighter group-hover:text-white transition-colors duration-500"
                >
                  {s.step}
                </motion.div>
                <div className="flex-1 pt-2">
                  <h3 className="text-2xl font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-500">{s.title}</h3>
                  <p className="text-lg text-zinc-400 max-w-2xl font-light leading-relaxed group-hover:translate-x-2 transition-transform duration-500 delay-75">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[600px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 relative">
            Ready to build your team?
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-light relative">
            Join hundreds of companies hiring top talent faster with RecruitAI.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block relative">
            <Link 
              to="/signup" 
              className="inline-flex px-10 py-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-lg transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
            >
              Start your free trial
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black pt-16 pb-8 px-4 w-full relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 bg-white rounded flex items-center justify-center font-bold text-black text-xs">
                R
              </div>
              <span className="text-xl font-semibold tracking-tight text-white">RecruitAI</span>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
              The autonomous artificial intelligence platform for modern talent acquisition teams.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">Agents</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Screening</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Scheduling</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <p>© 2026 RecruitAI Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
