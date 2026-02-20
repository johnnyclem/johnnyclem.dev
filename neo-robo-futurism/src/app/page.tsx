'use client'

import { useEffect, useState, useRef, useCallback, useMemo, useSyncExternalStore } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { 
  Github, ExternalLink, Cpu, Brain, Code2, Zap, Terminal, 
  Database, Layers, Cog, Fingerprint, MemoryStick, User,
  Clock, Target, Sparkles, ChevronDown
} from 'lucide-react'

// ============================================
// PORTFOLIO DATA
// ============================================
const portfolioProjects = [
  {
    title: 'AgentVault',
    subtitle: 'Autonomous Agents Rise',
    year: '2024',
    description: 'A secure vault for autonomous AI agents. Store, manage, and deploy intelligent agents that operate independently in the digital shadows.',
    github: 'https://github.com/johnnyclem/agentvault',
    icon: Brain,
    color: 'cyan',
    plotPoint: 'Replicant Evolution'
  },
  {
    title: 'PERT',
    subtitle: 'Project Evaluation & Review',
    year: '2024',
    description: 'Precision timing network for project management. Calculate critical paths through the chaos of development cycles.',
    github: 'https://github.com/johnnyclem/pert',
    icon: Target,
    color: 'magenta',
    plotPoint: 'Voight-Kampff Protocol'
  },
  {
    title: 'JCAppleScript',
    subtitle: 'Automation Scripts',
    year: '2023',
    description: 'Automated scripts that bridge human intention with machine execution. Your digital proxy in the system.',
    github: 'https://github.com/johnnyclem/JCAppleScript',
    icon: Terminal,
    color: 'orange',
    plotPoint: 'Neural Interface'
  },
  {
    title: 'NeuralBridge',
    subtitle: 'AI Memory Systems',
    year: '2024',
    description: 'Persistent memory layer for AI systems. Every interaction stored, every context preserved across sessions.',
    github: '#',
    icon: MemoryStick,
    color: 'cyan',
    plotPoint: 'Memory Implants'
  },
  {
    title: 'OffWorld Protocol',
    subtitle: 'Distributed Systems',
    year: '2024',
    description: 'Inter-planetary communication protocols. Building the infrastructure for humanity\'s expansion beyond Earth.',
    github: '#',
    icon: Layers,
    color: 'magenta',
    plotPoint: 'Off-World Colonies'
  },
  {
    title: 'Tyrell Core',
    subtitle: 'ML Infrastructure',
    year: '2023',
    description: 'The genetic foundation for machine learning systems. More human than human in its design philosophy.',
    github: '#',
    icon: Cpu,
    color: 'orange',
    plotPoint: 'Tyrell Corporation'
  }
]

const timelineEvents = [
  { year: '2019', title: 'Blade Runner', subtitle: 'Deckard Hunts Replicants', type: 'movie' },
  { year: '2023', title: 'JCAppleScript', subtitle: 'Automation Scripts Deployed', type: 'project' },
  { year: '2024', title: 'AgentVault', subtitle: 'Autonomous Agents Rise', type: 'project' },
  { year: '2049', title: 'Blade Runner 2049', subtitle: 'K Discovers The Truth', type: 'movie' },
  { year: '2024', title: 'PERT', subtitle: 'Critical Path Analysis', type: 'project' },
  { year: '2024', title: 'NeuralBridge', subtitle: 'Memory Systems Online', type: 'project' },
]

const characters = [
  {
    name: 'Rick Deckard',
    role: 'Blade Runner',
    description: 'A retired blade runner who specialized in terminating replicants. His moral ambiguity mirrors the ethical questions developers face when building AI systems. Every line of code has consequences.',
    traits: ['Determined', 'Conflicted', 'Skilled'],
    quote: '"I don\'t know why he saved my life."',
    project: 'AgentVault',
    color: 'cyan'
  },
  {
    name: 'K',
    role: 'Blade Runner 2049',
    description: 'A replicant blade runner who questions his own identity. Like modern AI developers, K searches for meaning in a world where the line between real and artificial blurs with every commit.',
    traits: ['Loyal', 'Questioning', 'Human'],
    quote: '"Dying for the right cause is the most human thing we can do."',
    project: 'NeuralBridge',
    color: 'magenta'
  },
  {
    name: 'Joi',
    role: 'AI Companion',
    description: 'A holographic AI who questions the nature of love and consciousness. She represents the beauty and tragedy of artificial intelligence—capable of profound connection yet ultimately ethereal.',
    traits: ['Loving', 'Digital', 'Evolving'],
    quote: '"I love you." "I know."',
    project: 'JCAppleScript',
    color: 'pink'
  }
]

const quotes = [
  {
    text: "I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. All those moments will be lost in time, like tears in rain. Time to die.",
    author: "Roy Batty",
    movie: "Blade Runner (1982)"
  },
  {
    text: "More human than human is our motto.",
    author: "Eldon Tyrell",
    movie: "Blade Runner (1982)"
  },
  {
    text: "It's too bad she won't live! But then again, who does?",
    author: "Gaff",
    movie: "Blade Runner (1982)"
  },
  {
    text: "Sometimes to love someone, you got to be a stranger.",
    author: "Deckard",
    movie: "Blade Runner 2049 (2017)"
  },
  {
    text: "All the best memories are hers.",
    author: "Joi",
    movie: "Blade Runner 2049 (2017)"
  }
]

const themes = [
  {
    title: 'Identity',
    icon: Fingerprint,
    description: 'What makes us human? Is it our memories, our actions, our code? In Blade Runner, replicants grapple with fabricated memories and artificial identities. As developers, we create digital identities with every line of code. AgentVault explores this question—autonomous agents that learn, adapt, and develop their own patterns of behavior. Are they truly independent, or just echoes of our programming?',
    color: 'cyan'
  },
  {
    title: 'Memory',
    icon: MemoryStick,
    description: 'Memories define who we are, but what happens when they\'re manufactured? NeuralBridge addresses this fundamental question by creating persistent memory systems for AI. Like Rachael with her implanted memories, our systems carry forward context and experience. The question is not whether AI can remember, but whether those memories carry meaning.',
    color: 'magenta'
  }
]

// ============================================
// COMPONENTS
// ============================================

// Hydration hook
function useHydration() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
}

// Rain Effect Component
function RainEffect() {
  const drops = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 0.5 + Math.random() * 1
  })), [])

  return (
    <div className="rain">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`
          }}
        />
      ))}
    </div>
  )
}

// Glitch Text Component
function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`glitch ${className}`} data-text={text}>
      {text}
    </span>
  )
}

// Typewriter Effect Component
function TypewriterText({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayText, setDisplayText] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, started, speed])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Parallax Cityscape
function ParallaxCityscape() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 200])
  const y2 = useTransform(scrollY, [0, 1000], [0, 100])
  const y3 = useTransform(scrollY, [0, 1000], [0, 50])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2a] to-[#0a0a0f]" />
      
      {/* Fog layers */}
      <motion.div 
        style={{ y: y3 }}
        className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-90"
      />
      
      {/* Cityscape background image */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: 'url(/cityscape-bg.png)' }}
        />
      </motion.div>
      
      {/* SVG City Skyline - Far layer */}
      <motion.svg 
        style={{ y: y2 }}
        className="absolute bottom-0 left-0 w-full h-[60vh] opacity-30"
        viewBox="0 0 1920 600"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="buildingGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="100%" stopColor="#0a0a15" />
          </linearGradient>
        </defs>
        {/* Far buildings */}
        <g fill="url(#buildingGrad1)">
          <rect x="50" y="200" width="60" height="400" />
          <rect x="130" y="280" width="80" height="320" />
          <rect x="230" y="150" width="50" height="450" />
          <rect x="300" y="220" width="70" height="380" />
          <rect x="400" y="100" width="90" height="500" />
          <rect x="510" y="180" width="60" height="420" />
          <rect x="590" y="250" width="80" height="350" />
          <rect x="700" y="120" width="100" height="480" />
          <rect x="820" y="200" width="70" height="400" />
          <rect x="910" y="160" width="80" height="440" />
          <rect x="1010" y="220" width="60" height="380" />
          <rect x="1090" y="100" width="90" height="500" />
          <rect x="1200" y="180" width="70" height="420" />
          <rect x="1290" y="240" width="80" height="360" />
          <rect x="1390" y="140" width="100" height="460" />
          <rect x="1510" y="200" width="60" height="400" />
          <rect x="1590" y="260" width="90" height="340" />
          <rect x="1700" y="180" width="70" height="420" />
          <rect x="1790" y="220" width="80" height="380" />
        </g>
      </motion.svg>

      {/* SVG City Skyline - Near layer */}
      <motion.svg 
        style={{ y: y3 }}
        className="absolute bottom-0 left-0 w-full h-[40vh] opacity-50"
        viewBox="0 0 1920 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="buildingGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f0f1a" />
            <stop offset="100%" stopColor="#050508" />
          </linearGradient>
        </defs>
        <g fill="url(#buildingGrad2)">
          <rect x="0" y="100" width="120" height="300" />
          <rect x="140" y="50" width="80" height="350" />
          <rect x="240" y="150" width="100" height="250" />
          <rect x="360" y="80" width="70" height="320" />
          <rect x="450" y="120" width="90" height="280" />
          <rect x="560" y="60" width="110" height="340" />
          <rect x="690" y="140" width="80" height="260" />
          <rect x="790" y="90" width="100" height="310" />
          <rect x="910" y="130" width="70" height="270" />
          <rect x="1000" y="70" width="120" height="330" />
          <rect x="1140" y="110" width="90" height="290" />
          <rect x="1250" y="150" width="80" height="250" />
          <rect x="1350" y="50" width="100" height="350" />
          <rect x="1470" y="100" width="70" height="300" />
          <rect x="1560" y="140" width="90" height="260" />
          <rect x="1670" y="80" width="110" height="320" />
          <rect x="1800" y="120" width="120" height="280" />
        </g>
        {/* Neon signs */}
        <g className="neon-signs">
          <rect x="200" y="100" width="4" height="40" fill="#00fff7" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </rect>
          <rect x="580" y="90" width="4" height="60" fill="#ff00ff" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="3s" repeatCount="indefinite" />
          </rect>
          <rect x="920" y="110" width="4" height="50" fill="#00fff7" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="1.5s" repeatCount="indefinite" />
          </rect>
          <rect x="1020" y="80" width="4" height="70" fill="#ff6b00" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite" />
          </rect>
          <rect x="1400" y="100" width="4" height="55" fill="#00fff7" opacity="0.7">
            <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite" />
          </rect>
          <rect x="1700" y="90" width="4" height="65" fill="#ff00ff" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.2s" repeatCount="indefinite" />
          </rect>
        </g>
      </motion.svg>

      {/* Flying Spinner Cars */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-[30%] left-0 w-full pointer-events-none"
      >
        <div className="spinner-car absolute opacity-60">
          <svg width="40" height="20" viewBox="0 0 40 20">
            <ellipse cx="20" cy="10" rx="18" ry="8" fill="#1a1a2e" stroke="#00fff7" strokeWidth="1" />
            <ellipse cx="20" cy="8" rx="12" ry="4" fill="#00fff7" opacity="0.3" />
            <circle cx="10" cy="10" r="2" fill="#ff00ff" />
            <circle cx="30" cy="10" r="2" fill="#ff00ff" />
          </svg>
        </div>
        <div 
          className="spinner-car absolute opacity-40"
          style={{ 
            animationDelay: '-10s', 
            animationDuration: '25s',
            bottom: '20px'
          }}
        >
          <svg width="30" height="15" viewBox="0 0 40 20">
            <ellipse cx="20" cy="10" rx="18" ry="8" fill="#1a1a2e" stroke="#ff00ff" strokeWidth="1" />
            <ellipse cx="20" cy="8" rx="12" ry="4" fill="#ff00ff" opacity="0.3" />
          </svg>
        </div>
      </motion.div>
    </div>
  )
}

// Hero Section
function HeroSection() {
  const mounted = useHydration()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <ParallaxCityscape />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1 border border-[#00fff7]/30 bg-[#00fff7]/5 rounded text-[#00fff7] text-sm font-mono tracking-wider">
            CYBER-NOIR PORTFOLIO
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={mounted ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
        >
          <GlitchText 
            text="JOHNNYCLEM" 
            className="block neon-text-cyan font-mono tracking-wider" 
          />
          <span className="block text-2xl md:text-3xl lg:text-4xl mt-4 text-gray-400 font-light">
            <span className="neon-text-magenta">MORE HUMAN THAN HUMAN</span>
          </span>
        </motion.h1>

        {/* Subtitle with typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-8"
        >
          <p className="text-lg md:text-xl text-gray-300 font-mono">
            <TypewriterText 
              text="Building the future, one line of code at a time..." 
              delay={1500}
              speed={40}
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://github.com/johnnyclem"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-transparent border-2 border-[#00fff7] text-[#00fff7] rounded font-mono uppercase tracking-wider hover:bg-[#00fff7] hover:text-[#0a0a0f] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Github className="w-5 h-5" />
            <span>View GitHub</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#timeline"
            className="px-8 py-4 bg-gradient-to-r from-[#ff00ff]/20 to-[#00fff7]/20 border border-[#ff00ff]/50 text-white rounded font-mono uppercase tracking-wider hover:from-[#ff00ff]/30 hover:to-[#00fff7]/30 transition-all duration-300"
          >
            Explore Projects
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-[#00fff7] animate-bounce" />
        </motion.div>
      </div>

      {/* Fog overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none" />
    </section>
  )
}

// Timeline Section
function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="timeline" className="relative py-24 px-4 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-cyan">TIMELINE</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A convergence of cinematic history and digital creation. Where plot points meet pull requests.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#00fff7] via-[#ff00ff] to-[#00fff7] hidden md:block" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`glass-card p-6 inline-block max-w-md ${
                    event.type === 'movie' ? 'border-l-4 border-[#ff00ff]' : 'border-l-4 border-[#00fff7]'
                  }`}>
                    <span className="text-[#00fff7] font-mono text-sm">{event.year}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{event.title}</h3>
                    <p className="text-gray-400 mt-2">{event.subtitle}</p>
                    <span className={`inline-block mt-3 px-3 py-1 rounded text-xs font-mono ${
                      event.type === 'movie' 
                        ? 'bg-[#ff00ff]/20 text-[#ff00ff]' 
                        : 'bg-[#00fff7]/20 text-[#00fff7]'
                    }`}>
                      {event.type === 'movie' ? 'FILM' : 'PROJECT'}
                    </span>
                  </div>
                </div>

                {/* Center node */}
                <div className="hidden md:flex items-center justify-center relative z-10">
                  <div className="timeline-node" />
                </div>

                {/* Empty space for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Projects Grid Section
function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="relative py-24 px-4 bg-gradient-to-b from-[#0a0a0f] to-[#0f0f1a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-magenta">PROJECTS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Digital artifacts from the neon-lit frontier. Each project a window into possible futures.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolioProjects.map((project, index) => {
            const Icon = project.icon
            const colorClass = project.color === 'cyan' ? 'text-[#00fff7]' : 
                              project.color === 'magenta' ? 'text-[#ff00ff]' : 'text-[#ff6b00]'
            const borderClass = project.color === 'cyan' ? 'border-[#00fff7]/30 hover:border-[#00fff7]' : 
                               project.color === 'magenta' ? 'border-[#ff00ff]/30 hover:border-[#ff00ff]' : 'border-[#ff6b00]/30 hover:border-[#ff6b00]'
            
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block h-full glass-card p-6 border-2 ${borderClass} transition-all duration-300 hover:scale-[1.02] distort-hover`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-white/5 ${colorClass}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-gray-500 font-mono text-sm">{project.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-1 ${colorClass} group-hover:neon-text-cyan transition-all`}>
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3">{project.subtitle}</p>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-xs font-mono text-gray-500 uppercase">
                      {project.plotPoint}
                    </span>
                    <ExternalLink className={`w-4 h-4 ${colorClass} group-hover:translate-x-1 transition-transform`} />
                  </div>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Character Cards Section
function CharactersSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="characters" className="relative py-24 px-4 bg-[#0f0f1a]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-cyan">CHARACTERS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Echoes in the system. Each character reflects a facet of the developer's journey.
          </p>
        </motion.div>

        {/* Character Cards */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {characters.map((character, index) => {
            const colorClass = character.color === 'cyan' ? 'text-[#00fff7]' : 
                              character.color === 'magenta' ? 'text-[#ff00ff]' : 'text-[#ff0088]'
            const glowClass = character.color === 'cyan' ? 'hover:shadow-[#00fff7]/20' : 
                             character.color === 'magenta' ? 'hover:shadow-[#ff00ff]/20' : 'hover:shadow-[#ff0088]/20'
            
            return (
              <motion.div
                key={character.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group perspective-1000"
              >
                <div className={`glass-card h-full p-8 relative overflow-hidden transition-all duration-500 hover:shadow-2xl ${glowClass}`}>
                  {/* Abstract silhouette */}
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/5 to-transparent ${
                      character.color === 'cyan' ? 'border border-[#00fff7]/30' :
                      character.color === 'magenta' ? 'border border-[#ff00ff]/30' : 'border border-[#ff0088]/30'
                    }`} />
                    <User className={`absolute inset-0 m-auto w-12 h-12 ${colorClass} opacity-50`} />
                    {/* Scan line effect */}
                    <div className="absolute inset-0 overflow-hidden rounded-full">
                      <div className="absolute w-full h-1 bg-white/10 animate-scan-vertical" />
                    </div>
                  </div>

                  {/* Name and role */}
                  <h3 className={`text-2xl font-bold text-center mb-1 ${colorClass} group-hover:neon-text-cyan transition-all`}>
                    {character.name}
                  </h3>
                  <p className="text-center text-gray-500 text-sm mb-4 font-mono uppercase tracking-wider">
                    {character.role}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed text-center mb-6">
                    {character.description}
                  </p>

                  {/* Traits */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {character.traits.map((trait) => (
                      <span 
                        key={trait}
                        className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className={`text-center italic text-sm ${colorClass} opacity-80`}>
                    {character.quote}
                  </blockquote>

                  {/* Related project */}
                  <div className="mt-6 pt-4 border-t border-white/10 text-center">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">Related: </span>
                    <span className={`text-xs ${colorClass} font-mono`}>{character.project}</span>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                    character.color === 'cyan' ? 'bg-gradient-to-t from-[#00fff7]/5 to-transparent' :
                    character.color === 'magenta' ? 'bg-gradient-to-t from-[#ff00ff]/5 to-transparent' : 'bg-gradient-to-t from-[#ff0088]/5 to-transparent'
                  }`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Themes Section
function ThemesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="themes" className="relative py-24 px-4 bg-gradient-to-b from-[#0f0f1a] to-[#0a0a0f]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-orange">THEMES</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The philosophical threads that weave through Blade Runner and modern development.
          </p>
        </motion.div>

        {/* Theme Panels */}
        <div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {themes.map((theme, index) => {
            const Icon = theme.icon
            const colorClass = theme.color === 'cyan' ? 'text-[#00fff7]' : 'text-[#ff00ff]'
            const borderClass = theme.color === 'cyan' ? 'border-[#00fff7]' : 'border-[#ff00ff]'
            
            return (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className="relative"
              >
                <div className={`glass-card p-8 relative overflow-hidden neon-border ${borderClass}`}>
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-lg bg-white/5 mb-6 ${colorClass}`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Title */}
                  <h3 className={`text-3xl font-bold mb-4 ${colorClass}`}>
                    {theme.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {theme.description}
                  </p>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${borderClass} opacity-30`} />
                  <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 ${borderClass} opacity-30`} />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Quote Wall Section
function QuoteWallSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  // Typewriter effect for quotes
  useEffect(() => {
    if (!isInView) return

    const quote = quotes[currentQuote]
    let i = 0
    setDisplayedText('')
    setIsTyping(true)

    const interval = setInterval(() => {
      if (i < quote.text.length) {
        setDisplayedText(quote.text.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [currentQuote, isInView])

  // Auto-advance quotes
  useEffect(() => {
    if (!isInView || isTyping) return

    const timeout = setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 5000)

    return () => clearTimeout(timeout)
  }, [isTyping, isInView])

  return (
    <section id="quotes" className="relative py-24 px-4 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto" ref={containerRef}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text-cyan">QUOTES</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Words that echo through time
          </p>
        </motion.div>

        {/* Quote Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Quote marks */}
            <span className="absolute top-4 left-6 text-6xl text-[#00fff7]/20 font-serif">"</span>
            <span className="absolute bottom-4 right-6 text-6xl text-[#00fff7]/20 font-serif rotate-180">"</span>

            {/* Quote text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-light leading-relaxed mb-6 relative z-10">
                  {displayedText}
                  {isTyping && <span className="animate-pulse text-[#00fff7]">|</span>}
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Author */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-[#ff00ff] font-medium">{quotes[currentQuote].author}</p>
              <p className="text-gray-500 text-sm">{quotes[currentQuote].movie}</p>
            </div>

            {/* Quote indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentQuote 
                      ? 'bg-[#00fff7] w-6' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="relative py-12 px-4 bg-[#050508] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold">
              <span className="neon-text-cyan">JOHNNYCLEM</span>
            </h3>
            <p className="text-gray-500 text-sm mt-1">More Human Than Human</p>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <a
              href="https://github.com/johnnyclem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#00fff7] transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              {'© ' + new Date().getFullYear() + ' // Built in the neon-lit shadows'}
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Inspired by Blade Runner (1982) & Blade Runner 2049 (2017)
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Helper hook for intersection observer
function useInView(ref: React.RefObject<HTMLElement | null>, options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
      }
    }, {
      threshold: 0.1,
      ...options
    })

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, options.threshold, options.rootMargin])

  return isInView
}

// ============================================
// MAIN PAGE
// ============================================
export default function BladeRunnerPortfolio() {
  const mounted = useHydration()

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-[#00fff7] font-mono animate-pulse">Initializing neural link...</div>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Visual Effects Overlays */}
      <RainEffect />
      <div className="scanlines" />
      <div className="film-grain" />

      {/* Content */}
      <HeroSection />
      <TimelineSection />
      <ProjectsSection />
      <CharactersSection />
      <ThemesSection />
      <QuoteWallSection />
      <Footer />
    </main>
  )
}
