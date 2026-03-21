import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#020209',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple radial glow top */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, transparent 70%)',
          }}
        />
        {/* Cyan glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 500,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(88,28,135,0.3)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: 100,
            padding: '8px 20px',
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#a78bfa',
            }}
          />
          <span style={{ color: '#c4b5fd', fontSize: 16, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Universal AI Agent Hub
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.02em',
          }}
        >
          <span style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #60a5fa 55%, #67e8f9 100%)', backgroundClip: 'text', color: 'transparent' }}>
            Prompt Skill Manager
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 26,
            color: '#64748b',
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.5,
            marginBottom: 56,
          }}
        >
          One desktop app to manage, discover, and install skills across 11+ AI coding assistants.
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 56, alignItems: 'flex-end' }}>
          {[
            { value: '11+', label: 'Supported Agents' },
            { value: '3', label: 'Platforms' },
            { value: 'Free', label: 'Open Source' },
            { value: 'TS', label: 'Full TypeScript' },
          ].map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 42, fontWeight: 800, background: 'linear-gradient(135deg, #818cf8 0%, #60a5fa 100%)', backgroundClip: 'text', color: 'transparent' }}>
                {s.value}
              </span>
              <span style={{ fontSize: 15, color: '#475569', fontWeight: 500 }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            fontSize: 18,
            color: '#334155',
            letterSpacing: '0.05em',
          }}
        >
          sm.idoevergreen.me
        </div>
      </div>
    ),
    { ...size }
  )
}
