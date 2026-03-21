'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Faq from './Faq'
import { AgentIcon } from './AgentIcon'
import ScrollReveal from './ScrollReveal'
import { ShootingStars } from './ShootingStars'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import ElectricBorder from './ElectricBorder'

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
  },
  {
    quote: "The fragmentation problem across agents is real. The unified view approach makes sense — this is exactly what we needed.",
    source: 'Hacker News',
  },
  {
    quote: "The skills discoverability problem is real — I end up rediscovering the same prompt patterns across projects.",
    source: 'Hacker News',
  },
  {
    quote: "As someone using agents but not at home with NPM, I like this. Simple, direct, does what it says.",
    source: 'Hacker News',
  },
  {
    quote: "Every time I want to test the same skill in Cursor or another agent, it's manual file copying and adjusting paths.",
    source: 'Product Hunt',
  },
  {
    quote: "We need a unified skill marketplace for different agents — good work, this is a step in the right direction.",
    source: 'Hacker News',
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
      <header
        className="sticky top-0 z-50 border-b border-white/[0.04] backdrop-blur-2xl"
        style={{ background: 'rgba(2,2,9,0.80)' }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/prompt-skill-manger-1.0.jpg"
              alt="Prompt Skill Manager"
              className="h-7 w-7 rounded-lg object-cover flex-shrink-0"
            />
            <span className="font-heading text-base tracking-tight text-white">
              Prompt Skill Manager
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <a
              href="https://github.com/zunalabs/prompt-skill-manager"
              className="text-slate-500 hover:text-violet-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
          </nav>
        </div>
      </header>

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
        {/* Shooting stars */}
        <ShootingStars minDelay={800} maxDelay={3000} starWidth={14} />

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 text-center relative z-[10] pt-32 pb-20 w-full">

          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <div
              className="inline-flex items-center gap-2 mb-10 rounded-full px-4 py-1.5 text-xs font-medium text-violet-300 relative overflow-hidden"
              style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <div className="absolute inset-0 badge-shimmer pointer-events-none" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot inline-block relative z-10" />
              <span className="relative z-10">
                Open source · Free forever · 11 agents{downloads != null && ` · ${downloads.toLocaleString()} downloads`}
              </span>
            </div>
          </motion.div>

          {/* Headline — word-stagger with blur reveal */}
          <h1 className="font-heading tracking-tight leading-[1.02] mb-7 text-[3.2rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.5rem]">
            <StaggerWords text="One place for" className="text-white" delay={0.08} />
            <br />
            {/* Each gradient word is its own self-contained gradient span */}
            {'all your AI skills.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.28 + i * 0.07 }}
                className="inline-block text-gradient-bright"
                style={{ marginRight: '0.25em' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg text-slate-400 max-w-lg mx-auto mb-12 leading-relaxed"
            {...fadeUp(0.16)}
          >
            Install, manage, and share skills across every major coding agent — Claude Code, Cursor, Copilot, and more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            id="download"
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
            {...fadeUp(0.24)}
          >
            {/* Windows */}
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

            {/* Linux */}
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

            {/* Mac — coming soon */}
            <span className="inline-flex items-center gap-2.5 text-sm text-slate-700 border border-slate-800/50 px-7 py-4 rounded-2xl cursor-not-allowed">
              <MacIcon />
              Mac — coming soon
            </span>
          </motion.div>

          {/* Stats strip — count-up on view */}
          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap mb-10"
            {...fadeUp(0.32)}
          >
            {[
              { countTo: 11, suffix: '', label: 'agents supported' },
              { countTo: 0, suffix: '$0', label: 'cost, ever' },
              { countTo: 100, suffix: '%', label: 'local storage' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-violet-300 stat-glow">
                  {s.suffix === '$0' ? '$0' : <CountUp to={s.countTo} suffix={s.suffix} />}
                </span>
                <span className="text-xs text-slate-600">{s.label}</span>
                {i < 2 && <span className="text-slate-800 ml-4">·</span>}
              </div>
            ))}
          </motion.div>

          {/* Product Hunt badge */}
          <motion.div className="flex justify-center mb-14" {...fadeUp(0.36)}>
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
          <motion.p className="text-[11px] text-slate-600 mb-10" {...fadeUp(0.38)}>
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="relative"
          >
            {/* Blur glow behind screenshot */}
            <div
              className="pointer-events-none absolute -inset-8 rounded-3xl opacity-50"
              style={{ background: 'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(139,92,246,0.35), transparent 65%)' }}
            />
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
              className="relative"
            >
              {/* macOS app window frame — wrapped in electric border */}
              <ElectricBorder color="#7c3aed" speed={0.5} chaos={0.08} borderRadius={18} style={{ display: 'block', width: '100%' }}>
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
                        className="w-40 h-5 mx-auto rounded-md text-[10px] flex items-center justify-center text-slate-600 border border-white/[0.04]"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        Prompt Skill Manager
                      </div>
                    </div>
                  </div>
                  {/* Screenshot */}
                  <img
                    src="/prompt-skill-manger-1.0.jpg"
                    alt="Prompt Skill Manager app screenshot"
                    className="w-full block"
                  />
                  {/* Top reflection line */}
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
                  />
                </div>
              </ElectricBorder>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="flex flex-col items-center gap-2 mt-16 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.8, duration: 1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-slate-600">
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          </motion.div>

        </div>
      </section>

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

      {/* ── Demo Video ── */}
      {YOUTUBE_VIDEO_ID && (
        <section className="border-t border-white/[0.04] py-24 relative overflow-hidden">
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

      {/* ── Features — Bento Grid ── */}
      <section className="border-t border-white/[0.04] py-28 relative overflow-hidden">
        {/* Background orb */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
        />
        <div className="max-w-5xl mx-auto px-6 relative">
          <ScrollReveal>
            <p className="text-center text-[11px] uppercase tracking-[0.25em] text-violet-400/50 font-semibold mb-4">
              Features
            </p>
            <h2 className="font-heading text-[1.75rem] sm:text-[2.5rem] text-center mb-4 tracking-tight">
              Everything you need
            </h2>
            <p className="text-center text-sm text-slate-500 mb-16 max-w-sm mx-auto">
              Stop managing skills manually. Prompt Skill Manager handles it all.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 80}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`group relative rounded-3xl p-7 h-full overflow-hidden cursor-default ${f.span}`}
                  style={{
                    background: 'rgba(255,255,255,0.018)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Hover colored glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${f.glowColor}, transparent)` }}
                  />

                  {/* Decorative oversized icon at bottom-right */}
                  <div
                    className={`pointer-events-none absolute bottom-4 right-4 opacity-[0.04] scale-150 ${f.iconColor}`}
                  >
                    <div className="w-20 h-20">
                      {f.icon}
                    </div>
                  </div>

                  {/* Icon pill */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center mb-5 border border-white/[0.05] ${f.iconColor} bg-gradient-to-br ${f.gradient} group-hover:scale-110 transition-transform duration-300`}
                  >
                    {f.icon}
                  </div>

                  <h3 className="relative z-10 text-[15px] font-semibold mb-2.5 text-white">
                    {f.title}
                  </h3>
                  <p className="relative z-10 text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors duration-200">
                    {f.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — Dual Marquee ── */}
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

        <div className="relative flex flex-col gap-4">
          {/* Left fade mask */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-40"
            style={{ background: 'linear-gradient(to right, #020209, transparent)' }}
          />
          {/* Right fade mask */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-40"
            style={{ background: 'linear-gradient(to left, #020209, transparent)' }}
          />

          {/* Row 1 — forward */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex shrink-0 gap-4" style={{ animationDuration: '40s' }}>
              {[...testimonials.slice(0, 3), ...testimonials.slice(0, 3), ...testimonials.slice(0, 3), ...testimonials.slice(0, 3)].map((t, i) => (
                <div
                  key={i}
                  className="w-72 shrink-0 rounded-2xl p-5 flex flex-col gap-3"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(139,92,246,0.1)',
                  }}
                >
                  <span className="text-2xl text-violet-500/20 font-serif leading-none">&ldquo;</span>
                  <p className="text-slate-300 text-[13px] leading-relaxed flex-1">{t.quote}</p>
                  <div className="flex items-center gap-2">
                    {t.source === 'Product Hunt' ? <PHIcon /> : <HNIcon />}
                    <span className="text-xs text-slate-600">{t.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 — reverse */}
          <div className="flex overflow-hidden">
            <div className="animate-marquee-reverse flex shrink-0 gap-4" style={{ animationDuration: '44s' }}>
              {[...testimonials.slice(3, 6), ...testimonials.slice(3, 6), ...testimonials.slice(3, 6), ...testimonials.slice(3, 6)].map((t, i) => (
                <div
                  key={i}
                  className="w-72 shrink-0 rounded-2xl p-5 flex flex-col gap-3"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(139,92,246,0.1)',
                  }}
                >
                  <span className="text-2xl text-violet-500/20 font-serif leading-none">&ldquo;</span>
                  <p className="text-slate-300 text-[13px] leading-relaxed flex-1">{t.quote}</p>
                  <div className="flex items-center gap-2">
                    {t.source === 'Product Hunt' ? <PHIcon /> : <HNIcon />}
                    <span className="text-xs text-slate-600">{t.source}</span>
                  </div>
                </div>
              ))}
            </div>
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
      <section className="border-t border-white/[0.04] py-32 relative overflow-hidden">
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
