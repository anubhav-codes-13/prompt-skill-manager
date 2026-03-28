'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const items = [
  {
    q: 'What are skills?',
    a: (
      <>
        Skills are reusable instruction sets that extend what an AI coding agent can do. They're
        typically markdown or text files that tell the agent how to handle specific tasks — things
        like enforcing a commit message format, following a project's code style, or running a
        custom workflow. Each agent has its own name for them: Claude Code calls them{' '}
        <span className="text-white font-mono text-xs border border-[rgba(255,255,255,0.12)] rounded px-1.5 py-0.5">
          /skills
        </span>
        , Cursor has Rules, Copilot has Instructions — but they're all the same idea.
      </>
    ),
  },
  {
    q: 'What inspired this?',
    a: "The AI coding agent space exploded fast. Within months there were a dozen agents, each with their own way of storing and loading skills. Moving between agents meant re-doing all your configuration from scratch, and discovering good community-built skills meant digging through GitHub manually. Prompt Skill Manager was built to fix that friction — one app that speaks every agent's language, so your knowledge travels with you no matter which tool you're using that day.",
  },
  {
    q: 'Is it free?',
    a: 'Yes. Prompt Skill Manager is fully open source under the MIT license. No accounts, no telemetry, no paywalls — ever.',
  },
  {
    q: 'Which agents are supported?',
    a: 'Currently: Claude Code, Cursor, Gemini CLI, Windsurf, GitHub Copilot, Goose, OpenAI Codex, OpenCode, Kilo Code, Trae, and Antigravity. New agents are added as they gain traction — contributions welcome.',
  },
  {
    q: 'Does it work offline?',
    a: 'Almost entirely. Scanning and managing your local skills works 100% offline. The only features that need internet are: installing skills from a GitHub URL, browsing the marketplace, and fetching the GitHub star count shown in the navbar. Your skill files never leave your machine.',
  },
  {
    q: 'Where are my skills stored?',
    a: (
      <>
        Skills stay exactly where each agent expects them — Prompt Skill Manager reads and writes
        directly to the native directories (e.g.{' '}
        <span className="text-white font-mono text-xs border border-[rgba(255,255,255,0.12)] rounded px-1.5 py-0.5">
          ~/.claude/commands/
        </span>{' '}
        for Claude Code,{' '}
        <span className="text-white font-mono text-xs border border-[rgba(255,255,255,0.12)] rounded px-1.5 py-0.5">
          ~/.cursor/rules/
        </span>{' '}
        for Cursor, and so on). Nothing is copied to a proprietary database or cloud. Disabling a
        skill moves it to a{' '}
        <span className="text-white font-mono text-xs border border-[rgba(255,255,255,0.12)] rounded px-1.5 py-0.5">
          .disabled/
        </span>{' '}
        subfolder so it can be re-enabled at any time.
      </>
    ),
  },
  {
    q: 'How do I install a skill from GitHub?',
    a: "Open the app, click \"Install from GitHub\", and paste any public GitHub repository URL. The app uses GitHub's recursive tree API to scan for skill files, shows you a checklist to pick which ones you want, then downloads and places them into the correct directory for whichever agents you choose. A GitHub personal access token is optional but recommended to avoid rate limits on large repos.",
  },
  {
    q: 'Can I copy a skill to multiple agents at once?',
    a: 'Yes. Select the skill you want to share, choose "Copy to agent", and pick one or more target agents from the list. The app resolves each agent\'s skill directory automatically and handles any file-format differences. This is the fastest way to keep your best prompts in sync across your whole toolkit.',
  },
  {
    q: 'Is there a Mac version?',
    a: 'Not yet — Windows and Linux are available now. Mac support is actively being worked on and a waitlist is open on the homepage. Drop your email there and you\'ll be the first to know when it lands. The codebase is Electron-based so the port is straightforward; code signing and notarization are the main things being sorted out.',
  },
  {
    q: 'How do I contribute or request a new agent?',
    a: (
      <>
        Open an issue or pull request on the{' '}
        <a
          href="https://github.com/zunalabs/prompt-skill-manager"
          target="_blank"
          rel="noopener noreferrer"
          className="text-violet-400 underline hover:text-violet-300 transition-colors"
        >
          GitHub repository
        </a>
        . Adding a new agent typically means adding its skill directory path and file pattern to the
        agent config — usually a one-file change. The codebase is fully TypeScript and the
        contributing guide walks you through the process.
      </>
    ),
  },
  {
    q: 'Does it collect any data or telemetry?',
    a: 'None at all. There are no analytics, crash reporters, update pings, or any form of telemetry. The app makes outbound requests only when you explicitly trigger a GitHub install or marketplace browse — and only to GitHub\'s public API or mcpmarket.com. Your GitHub token (if set) is stored locally in your OS keychain and never transmitted anywhere else.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <motion.div
            key={i}
            className="rounded-2xl border overflow-hidden"
            animate={{
              borderColor: isOpen ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.06)',
              backgroundColor: isOpen ? 'rgba(139,92,246,0.05)' : 'rgba(255,255,255,0)',
            }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left"
            >
              <motion.span
                className="flex-1 font-medium text-[0.9375rem]"
                animate={{ color: isOpen ? '#ffffff' : '#94a3b8' }}
                transition={{ duration: 0.2 }}
              >
                {item.q}
              </motion.span>

              <motion.span
                className="shrink-0"
                animate={{
                  rotate: isOpen ? 180 : 0,
                  color: isOpen ? '#a78bfa' : '#3f3f46',
                }}
                transition={{ duration: 0.25 }}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M2 4l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <p className="px-5 pb-5 text-sm text-slate-500 leading-relaxed">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
