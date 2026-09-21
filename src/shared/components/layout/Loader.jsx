import React, { useState, useEffect, useRef } from 'react';

const BOOT_LINES = [
  '> INITIALIZING HSB.EXE v1.0...',
  '> LOADING CREATIVE ENGINE............. OK',
  '> MOUNTING WORK EXPERIENCE............ OK',
  '> COMPILING PROJECT MODULES........... OK',
  '> RENDERING PIXELS.................... OK',
  '> ESTABLISHING USER INTERFACE......... OK',
  '> ALL SYSTEMS OPERATIONAL.',
  '> WELCOME TO MY PORTFOLIO.',
];

export default function Loader({ onFinished }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress]         = useState(0);
  const [phase, setPhase]               = useState('typing'); // 'typing' | 'done' | 'exit'
  const [curtainUp, setCurtainUp]       = useState(false);
  const [hidden, setHidden]             = useState(false);
  const lineRef = useRef(0);

  /* ── Disable scroll while loading ── */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* ── Typewriter: reveal lines one by one ── */
  useEffect(() => {
    if (phase !== 'typing') return;

    let timeoutId;
    let isCancelled = false;
    const totalLines  = BOOT_LINES.length;
    const lineDelay   = 260; // ms between lines

    const scheduleNextLine = (idx) => {
      if (isCancelled) return;
      if (idx >= totalLines) {
        setPhase('done');
        return;
      }
      timeoutId = setTimeout(() => {
        if (isCancelled) return;
        setVisibleLines(BOOT_LINES.slice(0, idx + 1));
        setProgress(Math.round(((idx + 1) / totalLines) * 100));
        scheduleNextLine(idx + 1);
      }, lineDelay);
    };

    scheduleNextLine(0);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [phase]);

  /* ── After all lines: brief pause then curtain exit ── */
  useEffect(() => {
    if (phase !== 'done') return;
    const t1 = setTimeout(() => {
      setPhase('exit');
      setCurtainUp(true);
    }, 600);
    return () => clearTimeout(t1);
  }, [phase]);

  /* ── After curtain: unmount ── */
  useEffect(() => {
    if (!curtainUp) return;
    const t = setTimeout(() => {
      setHidden(true);
      if (onFinished) onFinished();
    }, 850);
    return () => clearTimeout(t);
  }, [curtainUp, onFinished]);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden select-none"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Curtain panels (split-screen reveal) ── */}
      {/* Top half */}
      <div
        className="absolute left-0 top-0 w-full bg-[#fcf9f0] border-b-[4px] border-black z-20"
        style={{
          height: '50%',
          transition: curtainUp ? 'transform 0.8s cubic-bezier(0.76,0,0.24,1)' : 'none',
          transform: curtainUp ? 'translateY(-100%)' : 'translateY(0)',
        }}
      >
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(#1c1c17 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
      </div>

      {/* Bottom half */}
      <div
        className="absolute left-0 bottom-0 w-full bg-[#fcf9f0] border-t-[4px] border-black z-20"
        style={{
          height: '50%',
          transition: curtainUp ? 'transform 0.8s cubic-bezier(0.76,0,0.24,1)' : 'none',
          transform: curtainUp ? 'translateY(100%)' : 'translateY(0)',
        }}
      >
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(#1c1c17 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
      </div>

      {/* ── Terminal card (always above curtain) ── */}
      <div
        className="absolute inset-0 flex items-center justify-center z-30"
        style={{
          transition: curtainUp ? 'opacity 0.25s ease, transform 0.25s ease' : 'none',
          opacity:    curtainUp ? 0 : 1,
          transform:  curtainUp ? 'scale(0.94)' : 'scale(1)',
        }}
      >
        <div
          className="w-full max-w-lg mx-4 border-4 border-black bg-[#1c1c17] overflow-hidden"
          style={{ boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}
        >
          {/* Window chrome bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#a8d1b7] border-b-4 border-black">
            <div className="flex gap-2 items-center">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ba1a1a] border-2 border-black inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffda49] border-2 border-black inline-block" />
              <span className="w-3.5 h-3.5 rounded-full bg-[#416651] border-2 border-black inline-block" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-black">
              HSB.EXE — TERMINAL
            </span>
            <span className="text-[11px] font-black text-black/50">v1.0</span>
          </div>

          {/* Terminal body */}
          <div className="p-5 min-h-[230px] relative">
            {/* Scanline effect */}
            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.18) 3px, rgba(0,0,0,0.18) 4px)',
              }}
            />

            {/* Typed lines */}
            <div className="relative z-20 space-y-1">
              {visibleLines.map((line, i) => (
                <p
                  key={i}
                  className="text-[13px] font-mono leading-snug"
                  style={{
                    color: line.startsWith('> WELCOME') || line.startsWith('> ALL SYSTEMS')
                      ? '#a8d1b7'
                      : line.includes('OK')
                      ? '#a8d1b7'
                      : '#fcf9f0',
                    opacity: 1,
                  }}
                >
                  {line}
                </p>
              ))}

              {/* Blinking cursor on last line */}
              {phase === 'typing' && (
                <span
                  className="inline-block w-2.5 h-4 bg-[#ffda49] align-middle"
                  style={{ animation: 'blink 1s step-start infinite' }}
                />
              )}
            </div>
          </div>

          {/* Progress bar strip at bottom */}
          <div className="border-t-4 border-black px-5 py-3 bg-[#1c1c17]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#fcf9f0]/50">
                LOADING
              </span>
              <span className="text-[10px] font-black text-[#ffda49]">
                {progress}%
              </span>
            </div>
            <div className="w-full h-3 border-2 border-[#fcf9f0]/30 bg-[#fcf9f0]/5 relative overflow-hidden">
              <div
                className="h-full bg-[#ffda49]"
                style={{
                  width: `${progress}%`,
                  transition: 'width 0.2s ease-out',
                }}
              />
              {/* Shimmer stripe */}
              <div
                className="absolute inset-y-0 w-8"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                  left: `${progress - 5}%`,
                  transition: 'left 0.2s ease-out',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Global blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
