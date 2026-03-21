'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Faq from './Faq'
import { AgentIcon } from './AgentIcon'
import ScrollReveal from './ScrollReveal'
import { ShootingStars } from './ShootingStars'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import ElectricBorder from './ElectricBorder'
import FloatingParticles from './FloatingParticles'
import Magnetic from './Magnetic'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
})

// Word-stagger: splits text into individual animated words
function StaggerWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.07 }}
          className={`inline-block ${className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </>
  )
}

// Count-up number animation
function CountUp({ to, suffix = '', duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const ease = 1 - Math.pow(1 - t, 3) // ease-out-cubic
      setCount(Math.round(ease * to))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, to, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const agents = [
  'Claude Code',
  'Cursor',
  'Gemini CLI',
  'Windsurf',
  'GitHub Copilot',
  'Goose',
  'OpenAI Codex',
  'OpenCode',
  'Kilo Code',
  'Trae',
  'Antigravity',
]

const features = [
  {
    gradient: 'from-violet-600/20 to-purple-700/10',
    iconColor: 'text-violet-400',
    glowColor: 'rgba(139,92,246,0.12)',
    accentColor: 'rgba(139,92,246,0.08)',
    span: 'lg:col-span-2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Unified view',
    description:
      'See every skill installed across all your agents in one place. No more hunting through config directories.',
  },
  {
    gradient: 'from-blue-600/20 to-cyan-600/10',
    iconColor: 'text-blue-400',
    glowColor: 'rgba(96,165,250,0.12)',
    accentColor: 'rgba(96,165,250,0.06)',
    span: '',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 3v10M10 13l-3-3M10 13l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M3 16h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Install from GitHub',
    description:
      'Paste any GitHub repo URL and install skills with one click. Works with public repos and custom registries.',
  },
  {
    gradient: 'from-cyan-600/20 to-teal-600/10',
    iconColor: 'text-cyan-400',
    glowColor: 'rgba(34,211,238,0.1)',
    accentColor: 'rgba(34,211,238,0.05)',
    span: '',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10h6M13 10l-2.5-2.5M13 10l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Copy between agents',
    description:
      'Found the perfect skill for Claude Code? Push it to Cursor or Copilot in seconds — no manual file copying.',
  },
  {
    gradient: 'from-fuchsia-600/20 to-pink-600/10',
    iconColor: 'text-fuchsia-400',
    glowColor: 'rgba(192,132,252,0.1)',
    accentColor: 'rgba(192,132,252,0.06)',
    span: 'lg:col-span-2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M4 10h12M10 4v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Enable / disable',
    description:
      'Toggle any skill on or off without deleting it. Experiment freely and roll back without losing your setup.',
  },
]

const testimonials = [
  {
    quote: "This solves a real annoyance. Having one place to manage and push skills across agents is a workflow I didn't know I needed.",
    source: 'Product Hunt',
    name: 'Alex Rivers',
    avatar: 'https://i.pravatar.cc/150?u=alex',
  },
  {
    quote: "The fragmentation problem across agents is real. The unified view approach makes sense — this is exactly what we needed.",
    source: 'Hacker News',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    quote: "The skills discoverability problem is real — I end up rediscovering the same prompt patterns across projects.",
    source: 'Hacker News',
    name: 'Marcus Thorne',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
  },
  {
    quote: "As someone using agents but not at home with NPM, I like this. Simple, direct, does what it says.",
    source: 'Hacker News',
    name: 'Elena Garcia',
    avatar: 'https://i.pravatar.cc/150?u=elena',
  },
  {
    quote: "Every time I want to test the same skill in Cursor or another agent, it's manual file copying and adjusting paths.",
    source: 'Product Hunt',
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/150?u=james',
  },
  {
    quote: "We need a unified skill marketplace for different agents — good work, this is a step in the right direction.",
    source: 'Hacker News',
    name: 'Lila Okafor',
    avatar: 'https://i.pravatar.cc/150?u=lila',
  },
]

const WindowsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 88 88" fill="currentColor" aria-hidden>
    <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.066 41.344-47.318-6.63-.066-34.893z"/>
  </svg>
)

const MacIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.65 13.2c-.02-2 1.65-2.96 1.73-3.01-0.94-1.37-2.4-1.56-2.91-1.58-1.24-.13-2.42.73-3.05.73-.63 0-1.6-.71-2.63-.69-1.35.02-2.6.79-3.29 2-1.41 2.43-.36 6.03 1 8 .66.97 1.45 2.06 2.48 2.02 1-.04 1.37-.64 2.58-.64 1.21 0 1.55.64 2.6.62 1.08-.02 1.76-0.98 2.41-1.95.76-1.1 1.07-2.17 1.08-2.23-.02-.01-2.07-.79-2.1-3.27Z"/>
    <path d="M14.92 6.82c.54-.65.9-1.56.8-2.46-.77.03-1.7.51-2.25 1.16-.5.58-.94 1.52-.82 2.41.86.07 1.72-.44 2.27-1.11Z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor" aria-hidden>
    <path d="M7.5 0C3.36 0 0 3.36 0 7.5c0 3.31 2.15 6.12 5.13 7.11.38.07.52-.16.52-.36v-1.27c-2.1.46-2.54-.99-2.54-.99-.34-.87-.84-1.1-.84-1.1-.69-.47.05-.46.05-.46.76.05 1.16.78 1.16.78.67 1.15 1.77.82 2.2.63.07-.49.26-.82.48-1.01-1.68-.19-3.44-.84-3.44-3.73 0-.82.29-1.5.78-2.02-.08-.19-.34-.96.07-2 0 0 .64-.2 2.08.77a7.26 7.26 0 0 1 1.9-.26c.64 0 1.29.09 1.9.26 1.44-.97 2.08-.77 2.08-.77.41 1.04.15 1.81.07 2 .49.53.78 1.2.78 2.02 0 2.9-1.77 3.54-3.45 3.73.27.23.51.69.51 1.39v2.06c0 .2.13.44.52.36A7.51 7.51 0 0 0 15 7.5C15 3.36 11.64 0 7.5 0Z" />
  </svg>
)

const PHIcon = () => (
  <svg width="14" height="14" viewBox="0 0 58 58" xmlns="http://www.w3.org/2000/svg">
    <circle cx="29" cy="29" r="29" fill="#DA552F"/>
    <path d="M33.138 29.24h-8.284v-8.772h8.284a4.386 4.386 0 1 1 0 8.772m0-14.62H19.006v29.24h5.848v-8.772h8.284c5.652 0 10.234-4.582 10.234-10.234S38.79 14.62 33.138 14.62" fill="#fff"/>
  </svg>
)

const HNIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="14" viewBox="4 4 188 188" width="14">
    <path d="m4 4h188v188h-188z" fill="#f60"/>
    <path d="m73.2521756 45.01 22.7478244 47.39130083 22.7478244-47.39130083h19.56569631l-34.32352071 64.48661468v41.49338532h-15.98v-41.49338532l-34.32352071-64.48661468z" fill="#fff"/>
  </svg>
)

// ── Mobile-responsive Nav ─────────────────────────────────────────────────
function MobileNav() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'What is it?', href: '#what-is-it' },
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Download', href: '#cta' },
    {
      label: 'GitHub',
      href: 'https://github.com/zunalabs/prompt-skill-manager',
      external: true,
    },
  ]

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] backdrop-blur-2xl"
      style={{ background: 'rgba(2,2,9,0.88)' }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <img
            src="/prompt-skill-manger-1.0.jpg"
            alt="Prompt Skill Manager"
            className="h-7 w-7 rounded-lg object-cover flex-shrink-0"
          />
          <span className="font-heading text-base tracking-tight text-white">
            Prompt Skill Manager
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.slice(0, 3).map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-slate-500 hover:text-slate-200 transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/zunalabs/prompt-skill-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-violet-400 transition-colors duration-200"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
          <a
            href="#cta"
            className="text-xs font-semibold px-3.5 py-1.5 rounded-lg text-white transition-all duration-200 hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}
          >
            Download
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            transition={{ duration: 0.22 }}
            className="block w-5 h-[1.5px] bg-slate-300 origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
            transition={{ duration: 0.18 }}
            className="block w-5 h-[1.5px] bg-slate-300 origin-center"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            transition={{ duration: 0.22 }}
            className="block w-5 h-[1.5px] bg-slate-300 origin-center"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden border-t border-white/[0.04]"
        style={{ background: 'rgba(2,2,9,0.96)' }}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -12 }}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.22, delay: i * 0.04 }}
              className="flex items-center gap-3 py-3 text-sm text-slate-400 hover:text-white transition-colors border-b border-white/[0.04] last:border-0"
            >
              {l.label === 'Download' && (
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-md text-white"
                  style={{ background: 'linear-gradient(135deg, #6d28d9, #7c3aed)' }}
                >
                  Free
                </span>
              )}
              {l.label}
            </motion.a>
          ))}
        </nav>
      </motion.div>
    </header>
  )
}

// ── What is it? ───────────────────────────────────────────────────────────
function WhatIsIt() {
  const [tab, setTab] = useState<'skills' | 'prompts'>('skills')

  return (
    <section id="what-is-it" className="border-t border-white/[0.04] py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full blur-[140px]"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] mb-6"
              style={{ background: 'rgba(88,28,135,0.2)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }} />
              The Essentials
            </span>
            <h2
              className="font-extrabold tracking-tight mb-4 text-white"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.1 }}
            >
              Two things that will change<br />
              <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                how you work with AI
              </span>
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Skills teach your agents new tricks. Prompts store your best thinking.
              Together, they make you dramatically faster — every single day.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab switcher */}
        <ScrollReveal delay={80}>
          <div className="flex items-center justify-center mb-14">
            <div
              className="flex p-1 rounded-2xl gap-1"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {(['skills', 'prompts'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5"
                  style={{
                    background: tab === t
                      ? t === 'skills'
                        ? 'linear-gradient(135deg, rgba(109,40,217,0.7), rgba(124,58,237,0.7))'
                        : 'linear-gradient(135deg, rgba(37,99,235,0.6), rgba(96,165,250,0.6))'
                      : 'transparent',
                    color: tab === t ? '#ffffff' : '#475569',
                    boxShadow: tab === t ? '0 0 24px rgba(139,92,246,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
                  }}
                >
                  {t === 'skills' ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
                      <path d="M7 0L3.5 7h3.5L5.5 14 13 7H9L7 0z"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <rect x="1" y="3" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                      <path d="M3 6.5h4M3 9h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <path d="M5 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.4"/>
                    </svg>
                  )}
                  {t === 'skills' ? 'Skills' : 'Prompts'}
                  {tab === t && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-md font-semibold"
                      style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
                    >
                      {t === 'skills' ? '11 agents' : 'new'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Content panels */}
        <AnimatePresence mode="wait">
          {tab === 'skills' ? (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Left — skill file mockup */}
              <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0a12', border: '1px solid rgba(139,92,246,0.15)', boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}>
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04]" style={{ background: 'rgba(139,92,246,0.06)' }}>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                  </div>
                  <span className="text-[11px] text-violet-400/60 font-mono ml-1">~/.claude/commands/</span>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    { cmd: '/commit', desc: 'Write conventional commit messages automatically', color: '#a78bfa', bg: 'rgba(167,139,250,0.08)' },
                    { cmd: '/review', desc: 'Deep code review: security, perf & readability', color: '#60a5fa', bg: 'rgba(96,165,250,0.08)' },
                    { cmd: '/docs', desc: 'Generate inline documentation from any function', color: '#34d399', bg: 'rgba(52,211,153,0.08)' },
                    { cmd: '/refactor', desc: 'Suggest clean-code improvements', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)' },
                    { cmd: '/test', desc: 'Write unit tests for selected code', color: '#f87171', bg: 'rgba(248,113,113,0.08)' },
                  ].map((skill, i) => (
                    <motion.div
                      key={skill.cmd}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-default"
                      style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold font-mono text-sm"
                        style={{ background: skill.bg, color: skill.color }}
                      >
                        /
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-white font-mono">{skill.cmd}</div>
                        <div className="text-[11px] text-slate-600 truncate">{skill.desc}</div>
                      </div>
                      <div
                        className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                        style={{ background: skill.bg, color: skill.color }}
                      >
                        skill
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — explanation */}
              <div className="space-y-7">
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                    Slash commands that give<br />your AI agent superpowers
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Skills are markdown instruction files in your agent's config folder. Type{' '}
                    <code className="text-violet-400 bg-violet-400/10 px-1.5 py-0.5 rounded text-xs font-mono">/commit</code>{' '}
                    in Claude Code or Cursor and the agent follows your exact rules — every time, consistently.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { color: 'rgba(167,139,250,0.15)', textColor: '#a78bfa', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Just markdown files', desc: 'No plugins. Skills are plain .md files in a folder your agent already watches.' },
                    { color: 'rgba(96,165,250,0.15)', textColor: '#60a5fa', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Reused across every session', desc: 'Write once and it\'s available in every project, every conversation, forever.' },
                    { color: 'rgba(52,211,153,0.15)', textColor: '#34d399', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M7.5 5h1.5M7.5 11h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Copy across all 11 agents', desc: 'Got a great Claude Code skill? One click copies it to Cursor, Windsurf, Copilot — done.' },
                    { color: 'rgba(251,191,36,0.12)', textColor: '#fbbf24', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 13L13 3M10 3h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Share with your team', desc: 'Commit them to your repo. Every developer gets the same AI behaviour automatically.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                        style={{ background: item.color, color: item.textColor }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">{item.title}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="prompts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Left — prompt library mockup */}
              <div className="rounded-2xl overflow-hidden" style={{ background: '#0a0a12', border: '1px solid rgba(96,165,250,0.15)', boxShadow: '0 0 40px rgba(96,165,250,0.06)' }}>
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.04]" style={{ background: 'rgba(59,130,246,0.05)' }}>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                    </div>
                    <span className="text-[11px] text-blue-400/60 ml-1">Prompt Library</span>
                  </div>
                  <div className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
                    + New
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {[
                    { title: 'Code Review Checklist', preview: 'Review for readability, edge cases, security issues, and performance bottlenecks...', tags: ['code', 'review'], color: 'rgba(139,92,246,0.07)' },
                    { title: 'Git Commit Message', preview: 'Write a conventional commit. Format: type(scope): description. Types: feat, fix, docs...', tags: ['git'], color: 'rgba(96,165,250,0.07)' },
                    { title: 'Debug Helper', preview: 'Analyze this error: explain what caused it, how to fix it, and how to prevent it next time...', tags: ['debug', 'fix'], color: 'rgba(248,113,113,0.07)' },
                    { title: 'System Prompt', preview: 'You are an expert software engineer. Be concise, direct, and write clean, readable code...', tags: ['system'], color: 'rgba(52,211,153,0.07)' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="group rounded-xl p-3 cursor-default"
                      style={{ background: card.color, border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-zinc-200">{card.title}</span>
                        <div
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}
                        >
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.4"/></svg>
                          Copy
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-600 line-clamp-1 leading-relaxed">{card.preview}</p>
                      <div className="flex gap-1 mt-2">
                        {card.tags.map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>{tag}</span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right — explanation */}
              <div className="space-y-7">
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight">
                    Your best thinking,<br />always one click away
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Prompts are the clever instructions you keep retyping into AI chats — the ones that actually work.
                    Stop rewriting them from memory. Store once, find instantly, paste anywhere.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { color: 'rgba(167,139,250,0.15)', textColor: '#a78bfa', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Write once, reuse forever', desc: 'Never write "You are an expert..." from scratch again. Save what works.' },
                    { color: 'rgba(96,165,250,0.15)', textColor: '#60a5fa', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Search by title, tag or content', desc: 'Tag prompts like "git", "review", "debug" and find any prompt in under a second.' },
                    { color: 'rgba(52,211,153,0.15)', textColor: '#34d399', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 4V3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.5"/></svg>, title: 'One-click copy to clipboard', desc: 'Hit copy, switch to your AI tool, paste. No hunting through Notion or sticky notes.' },
                    { color: 'rgba(251,191,36,0.12)', textColor: '#fbbf24', icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>, title: 'Works with any AI — not just agents', desc: 'ChatGPT, Claude, Gemini, Perplexity — prompts work everywhere you chat with AI.' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.09, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                        style={{ background: item.color, color: item.textColor }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white mb-0.5">{item.title}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default function Home() {
  const [downloads, setDownloads] = useState<number | null>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.addEventListener('mousemove', handleMouseMove)
    return () => el.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  useEffect(() => {
    fetch('/api/downloads')
      .then((r) => r.json())
      .then((d) => setDownloads(d.total))
      .catch(() => {})
  }, [])

  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const id = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(id)
  }, [isPaused])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Prompt Skill Manager',
    'operatingSystem': 'macOS, Windows, Linux',
    'applicationCategory': 'DeveloperApplication',
    'description': 'Universal AI agent skills manager for Claude Code, Cursor, Copilot, and more.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Organization',
      'name': 'Zunalabs',
      'url': 'https://github.com/zunalabs'
    }
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What are skills?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': "Skills are reusable instruction sets that extend what an AI coding agent can do. They're typically markdown or text files that tell the agent how to handle specific tasks like enforcing commit message formats or following code styles."
        }
      },
      {
        '@type': 'Question',
        'name': 'Which agents are supported?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Currently supported agents include Claude Code, Cursor, Gemini CLI, Windsurf, GitHub Copilot, Goose, OpenAI Codex, OpenCode, Kilo Code, Trae, and Antigravity.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is it free?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Prompt Skill Manager is fully open source under the MIT license with no accounts or telemetry.'
        }
      }
    ]
  }

  const YOUTUBE_VIDEO_ID = 'touNnaNVqo8'

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden" style={{ background: '#020209' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Nav ── */}
      <MobileNav />

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative overflow-hidden min-h-[100svh] flex items-center grain-overlay">
        {/* Orb 1 — purple, top-right */}
        <div
          className="pointer-events-none absolute -top-20 -right-40 w-[800px] h-[800px] rounded-full blur-[160px] animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)' }}
        />
        {/* Orb 2 — cyan, bottom-left */}
        <div
          className="pointer-events-none absolute bottom-0 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] animate-orb-slow"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)' }}
        />
        {/* Center glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)' }}
        />
        {/* Grid overlay */}
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-100" />
        {/* Cursor spotlight — follows mouse */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] transition-[background] duration-75"
          style={{
            background: `radial-gradient(700px circle at ${cursor.x}px ${cursor.y}px, rgba(139,92,246,0.07), transparent 40%)`,
          }}
        />
        {/* 3D Particles Background */}
        <FloatingParticles />

        <ShootingStars minDelay={800} maxDelay={3000} starWidth={14} />

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-[10] pt-32 pb-24 w-full">

          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <span
              className="inline-flex items-center gap-2 mb-10 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300"
              style={{ background: 'rgba(88,28,135,0.25)', border: '1px solid rgba(139,92,246,0.35)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#a78bfa', boxShadow: '0 0 6px #a78bfa' }}
              />
              Project Deep Dive · 2026{downloads != null && ` · ${downloads.toLocaleString()} downloads`}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-extrabold leading-[1.08] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
            {...fadeUp(0.06)}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 55%, #67e8f9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Prompt Skill Manager
            </span>
            <br />
            <span className="text-white">Universal AI Agent Hub</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed"
            {...fadeUp(0.14)}
          >
            A cross-platform Electron desktop app providing a single unified interface to manage,
            discover, and install skills across 11+ AI coding assistants.
          </motion.p>

          {/* Divider */}
          <motion.div
            className="w-full max-w-sm h-px mx-auto mb-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)' }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.22 }}
          />

          {/* Stats row */}
          <motion.div
            className="flex flex-wrap items-end justify-center gap-x-10 gap-y-5 mb-14"
            {...fadeUp(0.28)}
          >
            {[
              { value: 11, suffix: '+', label: 'Supported Agents' },
              { value: 2,  suffix: '',  label: 'Apps in Monorepo' },
              { value: 3,  suffix: '',  label: 'Platforms' },
              { value: -1, suffix: 'TS', label: 'Full TypeScript', isText: true },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className="font-extrabold leading-none tabular-nums"
                  style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    background: 'linear-gradient(135deg, #818cf8 0%, #60a5fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.isText ? s.suffix : <CountUp to={s.value} suffix={s.suffix} />}
                </span>
                <span className="text-xs text-slate-500 font-medium">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            id="download"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10"
            {...fadeUp(0.36)}
          >
            {/* Windows */}
            <Magnetic>
              <ElectricBorder color="#a78bfa" speed={0.8} chaos={0.1} borderRadius={16}>
                <a
                  href="https://github.com/zunalabs/prompt-skill-manager/releases/latest/download/Prompt-Skill-Manager-Setup.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white overflow-hidden btn-shimmer transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #6366f1 100%)',
                  }}
                >
                  <WindowsIcon />
                  Download for Windows
                </a>
              </ElectricBorder>
            </Magnetic>

            {/* Linux */}
            <Magnetic>
              <a
                href="https://github.com/zunalabs/prompt-skill-manager/releases/latest/download/Prompt-Skill-Manager-linux-x86_64.AppImage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-300 hover:text-white border border-white/[0.08] hover:border-violet-400/40 px-7 py-4 rounded-2xl transition-all duration-200 hover:bg-violet-500/[0.06]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <Image src="/linux.svg" alt="Linux" width={15} height={15} />
                Download for Linux
              </a>
            </Magnetic>

            {/* Mac — coming soon */}
            <span className="inline-flex items-center gap-2.5 text-sm text-slate-700 border border-slate-800/50 px-7 py-4 rounded-2xl cursor-not-allowed">
              <MacIcon />
              Mac — coming soon
            </span>
          </motion.div>

          {/* Product Hunt badge */}
          <motion.div className="flex justify-center mb-6" {...fadeUp(0.42)}>
            <a
              href="https://www.producthunt.com/products/ai-skills-manager?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-ai-skills-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <img
                alt="AI Prompt Skill Manager - One place for all your AI skills | Product Hunt"
                width={250}
                height={54}
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1102479&theme=dark&t=1773999174865"
              />
            </a>
          </motion.div>

          {/* SmartScreen note */}
          <motion.p className="text-[11px] text-slate-600 mb-16" {...fadeUp(0.46)}>
            Windows may show a SmartScreen warning — click &ldquo;More info&rdquo; → &ldquo;Run anyway&rdquo;.{' '}
            <a
              href="https://github.com/zunalabs/prompt-skill-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-slate-400 transition-colors"
            >
              Source code is public.
            </a>
          </motion.p>

          {/* App screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.52 }}
            className="relative"
          >
            {/* Glow behind screenshot */}
            <div
              className="pointer-events-none absolute -inset-6 rounded-3xl"
              style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(139,92,246,0.3), transparent 65%)' }}
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
              className="relative"
            >
              <ElectricBorder color="#7c3aed" speed={0.5} chaos={0.07} borderRadius={18} style={{ display: 'block', width: '100%' }}>
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{ background: '#0d0d18', boxShadow: '0 40px 100px rgba(0,0,0,0.9)' }}
                >
                  {/* Window chrome */}
                  <div
                    className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.04]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
                    <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
                    <div className="flex-1 mx-4">
                      <div
                        className="w-44 h-5 mx-auto rounded-md text-[10px] flex items-center justify-center text-slate-600 border border-white/[0.04]"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        Prompt Skill Manager
                      </div>
                    </div>
                  </div>
                  <img
                    src="/prompt-skill-manger-1.0.jpg"
                    alt="Prompt Skill Manager app screenshot"
                    className="w-full block"
                  />
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
                  />
                </div>
              </ElectricBorder>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* ── What is it? ── */}
      <WhatIsIt />

      {/* ── Agent Marquee ── */}
      <section
        className="border-t border-white/[0.04] py-16 overflow-hidden relative"
        style={{ background: 'rgba(139,92,246,0.015)' }}
      >
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-violet-400/50 font-semibold mb-10 text-center">
            Works with {agents.length} coding agents
          </p>
        </ScrollReveal>
        <div className="relative">
          {/* Left fade mask */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32"
            style={{ background: 'linear-gradient(to right, #020209, transparent)' }}
          />
          {/* Right fade mask */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32"
            style={{ background: 'linear-gradient(to left, #020209, transparent)' }}
          />
          <div className="flex">
            <div className="animate-marquee flex shrink-0 gap-6">
              {[...agents, ...agents].map((agent, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-2.5 px-5 shrink-0 group"
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-violet-500/10 group-hover:border-violet-500/30 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'rgba(139,92,246,0.06)' }}
                  >
                    <AgentIcon agent={agent} size={26} />
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap group-hover:text-slate-300 transition-colors duration-200">{agent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <div className="container px-6">
        <div className="glow-divider" />
      </div>

      {/* ── Demo Video ── */}
      {YOUTUBE_VIDEO_ID && (
        <section id="demo" className="border-t border-white/[0.04] py-24 relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.04) 0%, transparent 70%)' }}
          />
          <div className="max-w-4xl mx-auto px-6 relative">
            <ScrollReveal>
              <p className="text-center text-[11px] uppercase tracking-[0.25em] text-violet-400/50 font-semibold mb-4">
                See it in action
              </p>
              <h2 className="font-heading text-[1.75rem] sm:text-[2.25rem] text-center mb-10 tracking-tight">
                Watch the demo
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div
                className="relative rounded-2xl overflow-hidden card-neon"
                style={{
                  aspectRatio: '16/9',
                  background: '#0a0a14',
                  boxShadow: '0 0 0 1px rgba(139,92,246,0.15), 0 24px 64px rgba(0,0,0,0.7), 0 0 60px rgba(139,92,246,0.08)',
                }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?rel=0&modestbranding=1`}
                  title="Prompt Skill Manager demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 0 }}
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      <div className="container px-6">
        <div className="glow-divider" />
      </div>

      {/* ── What It Does — 6-card grid ── */}
      <section id="features" className="border-t border-white/[0.04] py-28 relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto px-6 relative">
          <ScrollReveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: '#7c3aed' }}>
              What it does
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-[2.5rem] mb-4 tracking-tight">
              One App to Rule All Skills
            </h2>
            <p className="text-sm text-slate-400 mb-14 max-w-md leading-relaxed">
              Every AI coding assistant stores skills in its own hidden folder with its own format. Prompt Skill Manager unifies them all into a single, beautiful interface.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                iconBg: 'linear-gradient(135deg, #1e3a5f 0%, #1a2d4a 100%)',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2.2"/>
                    <path d="M17.5 17.5L23 23" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.2)"/>
                  </svg>
                ),
                title: 'Unified Discovery',
                desc: 'Scans all agent skill directories on startup — Claude Code, Cursor, Copilot, Windsurf, Gemini CLI, and more — and displays them in one place.',
              },
              {
                iconBg: 'linear-gradient(135deg, #1a3d2e 0%, #14532d 100%)',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <path d="M16 4L8 16h8l-4 8 12-14h-8L16 4z" fill="white" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'Enable / Disable',
                desc: 'Toggle skills on and off without deleting them. Disabled skills are safely moved to a .disabled/ subfolder and can be re-enabled anytime.',
              },
              {
                iconBg: 'linear-gradient(135deg, #1e2d4a 0%, #162040 100%)',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4L24 9v10L14 24 4 19V9L14 4z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
                    <path d="M14 4v20M4 9l10 5 10-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: 'GitHub Install',
                desc: "Paste any GitHub repository URL. The app discovers available skills via GitHub's recursive tree API and lets you select which ones to install.",
              },
              {
                iconBg: 'linear-gradient(135deg, #3d1a0f 0%, #4a1a0a 100%)',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <rect x="8" y="10" width="13" height="14" rx="2" stroke="white" strokeWidth="2"/>
                    <path d="M8 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" stroke="white" strokeWidth="2"/>
                    <path d="M11 16h7M11 20h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'Copy Between Agents',
                desc: 'Found a great Claude Code skill? Copy it to Cursor or Windsurf in one click. The app handles all path resolution automatically.',
              },
              {
                iconBg: 'linear-gradient(135deg, #0f2d3d 0%, #0a2433 100%)',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <path d="M4 5h3l2.5 12h10L22 9H8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="11.5" cy="22" r="1.5" fill="white"/>
                    <circle cx="19.5" cy="22" r="1.5" fill="white"/>
                  </svg>
                ),
                title: 'Marketplace',
                desc: 'Browse community-published skill packs from mcpmarket.com directly within the app. Search, preview, and install in a single flow.',
              },
              {
                iconBg: 'linear-gradient(135deg, #2d1a3d 0%, #1f1228 100%)',
                icon: (
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                    <circle cx="11" cy="12" r="5" stroke="white" strokeWidth="2"/>
                    <path d="M15 15l8 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M20 18l2 2M18 20l2 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ),
                title: 'GitHub Token',
                desc: 'Stores a personal access token locally to lift GitHub API rate limits during skill discovery and installation — no server involved.',
              },
            ].map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 70}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl p-6 h-full cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300"
                    style={{ background: f.iconBg }}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-[15px] font-bold text-white mb-2.5">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-200">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prompt Library ── */}
      <section className="border-t border-white/[0.04] py-28 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)' }}
        />

        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Header */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                New
              </span>
              <p className="text-[11px] uppercase tracking-[0.25em] text-violet-400/50 font-semibold">
                Prompt Library
              </p>
            </div>
            <h2 className="font-heading text-[1.75rem] sm:text-[2.5rem] text-center mb-4 tracking-tight">
              Your personal prompt vault
            </h2>
            <p className="text-center text-sm text-slate-500 mb-16 max-w-md mx-auto leading-relaxed">
              Write once, reuse everywhere. Store your best prompts with tags and collections — find any prompt in seconds and copy it straight to your agent.
            </p>
          </ScrollReveal>

          {/* Two-column: mockup left, feature list right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* Left — prompt card mockup */}
            <ScrollReveal delay={80}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ background: '#0c0c0e', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
              >
                {/* Top bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="text-[11px] text-slate-600 flex-1">Prompt Library</div>
                  <div
                    className="text-[10px] px-2 py-0.5 rounded-md font-medium"
                    style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}
                  >
                    + New Prompt
                  </div>
                </div>

                {/* Prompt cards */}
                <div className="p-4 space-y-3">
                  {[
                    { title: 'Code Review Checklist', preview: 'Review this code for: readability, edge cases, security issues, and performance bottlenecks. Provide specific suggestions...', tags: ['code', 'review'], color: 'rgba(139,92,246,0.08)' },
                    { title: 'Git Commit Message', preview: 'Write a conventional commit message for the following changes. Format: type(scope): description...', tags: ['git', 'commit'], color: 'rgba(96,165,250,0.08)' },
                    { title: 'Explain Like I\'m 5', preview: 'Explain the following concept in simple terms a beginner can understand, using analogies where helpful...', tags: ['explain', 'learning'], color: 'rgba(52,211,153,0.08)' },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="group rounded-xl p-3.5"
                      style={{ background: card.color, border: '1px solid rgba(255,255,255,0.05)' }}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-zinc-200">{card.title}</span>
                        <div
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 flex-shrink-0"
                          style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}
                        >
                          <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M3 3V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.4"/></svg>
                          Copy
                        </div>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-relaxed line-clamp-2">{card.preview}</p>
                      <div className="flex gap-1 mt-2.5">
                        {card.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(139,92,246,0.1)', color: '#a78bfa' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right — feature bullets */}
            <ScrollReveal delay={160}>
              <div className="space-y-7">
                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    ),
                    color: 'rgba(139,92,246,0.15)',
                    textColor: '#a78bfa',
                    title: 'Create & store prompts',
                    desc: 'Write any prompt — system instructions, templates, workflows — and store it with a title and description so you never lose it.',
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 5h12M2 8h8M2 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    ),
                    color: 'rgba(96,165,250,0.15)',
                    textColor: '#60a5fa',
                    title: 'Tag and organise',
                    desc: 'Add tags like "git", "review", "coding" and group related prompts into collections — find exactly what you need in seconds.',
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M10 10l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    ),
                    color: 'rgba(52,211,153,0.15)',
                    textColor: '#34d399',
                    title: 'Search instantly',
                    desc: 'Real-time search across titles, content, and tags. No folders to dig through — just type and find.',
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M5 4V3a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1" stroke="currentColor" strokeWidth="1.5"/></svg>
                    ),
                    color: 'rgba(251,191,36,0.12)',
                    textColor: '#fbbf24',
                    title: 'One-click copy',
                    desc: 'Copy any prompt to clipboard instantly. Paste it straight into Claude Code, Cursor, or any agent — no re-typing, ever.',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
                      style={{ background: item.color, color: item.textColor }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{item.title}</p>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="container px-6">
        <div className="glow-divider" />
      </div>

      {/* ── Testimonials — Smooth Carousel ── */}
      <section className="border-t border-white/[0.04] py-24 overflow-hidden relative">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(6,182,212,0.04) 0%, transparent 70%)' }}
        />
        <ScrollReveal>
          <p className="text-[11px] uppercase tracking-[0.25em] text-violet-400/50 font-semibold mb-14 text-center">
            What people are saying
          </p>
        </ScrollReveal>

        <div
          className="max-w-4xl mx-auto px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card area */}
          <div className="relative overflow-hidden rounded-3xl" style={{ minHeight: 260 }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  opacity: activeTestimonial === i ? 1 : 0,
                  y: activeTestimonial === i ? 0 : 16,
                  pointerEvents: activeTestimonial === i ? 'auto' : 'none',
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center"
              >
                <div
                  className="w-full rounded-3xl p-8 md:p-10"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex flex-col gap-5 max-w-2xl mx-auto text-center">
                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, si) => (
                        <svg key={si} className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-light italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {/* Author */}
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-9 h-9 rounded-full border border-violet-500/20 object-cover"
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{t.name}</p>
                        <div className="flex items-center gap-1.5 opacity-50">
                          {t.source === 'Product Hunt' ? <PHIcon /> : <HNIcon />}
                          <span className="text-[10px] uppercase tracking-widest">{t.source}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center justify-center gap-5 mt-8">
            <button
              onClick={() => setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/40 transition-all"
              aria-label="Previous"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: activeTestimonial === i ? 20 : 6,
                    height: 6,
                    background: activeTestimonial === i ? 'rgba(139,92,246,0.8)' : 'rgba(255,255,255,0.12)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveTestimonial((i) => (i + 1) % testimonials.length)}
              className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-violet-500/40 transition-all"
              aria-label="Next"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-white/[0.04] py-24 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 80% at 20% 50%, rgba(139,92,246,0.04) 0%, transparent 70%)' }}
        />
        <div className="max-w-2xl mx-auto px-6 relative">
          <ScrollReveal>
            <h2 className="font-heading text-[1.75rem] sm:text-[2.25rem] text-center mb-14 tracking-tight">
              FAQ
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <Faq />
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA — Cinematic ── */}
      <section id="cta" className="border-t border-white/[0.04] py-32 relative overflow-hidden">
        {/* Large purple orb */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)' }}
        />
        {/* Cyan accent */}
        <div
          className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[300px] rounded-full blur-[100px]"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
        />
        {/* Horizontal glow line */}
        <div
          className="pointer-events-none absolute left-0 right-0 top-1/2 h-px animate-glow-line"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.4) 50%, transparent 100%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-[11px] uppercase tracking-[0.25em] text-violet-400/50 font-semibold mb-5">
              Start now
            </p>
            <h2 className="font-heading text-[2rem] sm:text-[2.75rem] md:text-[3.5rem] mb-6 tracking-tight leading-tight">
              Take control of your
              <br />
              <span className="text-gradient-bright animate-gradient">AI skills.</span>
            </h2>
            <p className="text-sm text-slate-500 mb-12 max-w-sm mx-auto">
              Free and open source. Windows and Linux available now. Mac coming soon.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
              <ElectricBorder color="#a78bfa" speed={0.8} chaos={0.1} borderRadius={16}>
                <a
                  href="https://github.com/zunalabs/prompt-skill-manager/releases/latest/download/Prompt-Skill-Manager-Setup.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white overflow-hidden btn-shimmer transition-all duration-300 hover:scale-105 hover:brightness-110"
                  style={{
                    background: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 40%, #6366f1 100%)',
                  }}
                >
                  <WindowsIcon />
                  Download for Windows
                </a>
              </ElectricBorder>

              <a
                href="https://github.com/zunalabs/prompt-skill-manager/releases/latest/download/Prompt-Skill-Manager-linux-x86_64.AppImage"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-medium text-slate-300 hover:text-white border border-white/[0.08] hover:border-violet-400/40 px-7 py-4 rounded-2xl transition-all duration-200 hover:bg-violet-500/[0.06]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <Image src="/linux.svg" alt="Linux" width={15} height={15} />
                Download for Linux
              </a>

              <span className="inline-flex items-center gap-2.5 text-sm text-slate-700 border border-slate-800/50 px-7 py-4 rounded-2xl cursor-not-allowed">
                <MacIcon />
                Mac — coming soon
              </span>
            </div>

            <p className="text-[11px] text-slate-700">
              Windows may show a SmartScreen warning — click &ldquo;More info&rdquo; → &ldquo;Run anyway&rdquo;.{' '}
              <a
                href="https://github.com/zunalabs/prompt-skill-manager"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-500 transition-colors"
              >
                Source code is public.
              </a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/[0.04] py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/prompt-skill-manger-1.0.jpg"
              alt=""
              className="h-6 w-6 rounded-lg object-cover opacity-70"
            />
            <span className="font-heading text-sm text-slate-400">Prompt Skill Manager</span>
            <span className="text-slate-600 text-sm">
              by{' '}
              <a
                href="https://github.com/orgs/zunalabs/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors"
              >
                Zunalabs
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/zunalabs/prompt-skill-manager"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-600 hover:text-violet-400 transition-colors"
            >
              GitHub
            </a>
            <a href="/LICENSE" className="text-sm text-slate-600 hover:text-slate-400 transition-colors">
              MIT License
            </a>
            <span className="text-sm text-slate-700">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
