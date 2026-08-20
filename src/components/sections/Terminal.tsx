'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Copy } from 'lucide-react';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  time: string;
}

export default function Terminal() {
  const { data, updateThemeConfig, playSound, showToast, setIsAdminOpen } = usePortfolio();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>
            ╔══════════════════════════════════════════════════════════════╗
          </p>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>
            ║ &nbsp;RUPESH KUMAR // 3D CYBER TERMINAL v2.4 (CDLSIET CSE) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;║
          </p>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>
            ╚══════════════════════════════════════════════════════════════╝
          </p>
          <p style={{ color: '#ffffff', marginTop: '6px' }}>
            Type <span style={{ color: 'var(--primary)', fontWeight: 700 }}>help</span> to see available commands or click the shortcut tags below.
          </p>
        </div>
      ),
      time: '00:00:01',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getTimeString = () => {
    return new Date().toTimeString().split(' ')[0];
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    playSound('click');
    const time = getTimeString();

    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    let outputNode: React.ReactNode = null;

    if (cmd === 'help') {
      outputNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Available Commands:</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>about</span> — View Rupesh Kumar summary &amp; background</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>education</span> — View academic milestones (CDLSIET, Maharaja Agarsain, Shah Satnam Ji)</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>skills</span> — List technical stack and proficiencies</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>projects</span> — Display featured engineering projects</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>socials</span> — View verified Instagram (@3rupeshkr) and GitHub (er-rupesh7)</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>theme [cyan|purple|emerald|solar|crimson]</span> — Switch terminal/portfolio theme</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>contact</span> — Show email, phone, and direct links</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>matrix</span> — Initiate digital stream</p>
          <p>• <span style={{ color: '#ffffff', fontWeight: 600 }}>clear</span> — Clear terminal output</p>
        </div>
      );
    } else if (cmd === 'about') {
      outputNode = (
        <div>
          <p style={{ color: '#ffffff', fontWeight: 700 }}>{data.personal.name} — {data.personal.headline}</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{data.personal.bio}</p>
          <p style={{ color: 'var(--primary)', marginTop: '6px' }}>Location: {data.personal.location}</p>
        </div>
      );
    } else if (cmd === 'education') {
      outputNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Academic Milestones:</p>
          {data.education.map((edu, idx) => (
            <div key={idx} style={{ paddingLeft: '8px', borderLeft: '2px solid var(--primary)' }}>
              <p style={{ color: '#ffffff', fontWeight: 600 }}>{edu.degree}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{edu.institution} ({edu.location})</p>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'skills') {
      outputNode = (
        <div>
          <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '6px' }}>Skills &amp; Tech Stack:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {data.skills.map((s) => (
              <span
                key={s.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  color: '#ffffff',
                }}
              >
                {s.name} ({s.level}%)
              </span>
            ))}
          </div>
        </div>
      );
    } else if (cmd === 'projects') {
      outputNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 600 }}>Featured Projects:</p>
          {data.projects.map((p, idx) => (
            <div key={idx}>
              <p style={{ color: '#ffffff', fontWeight: 600 }}>
                {idx + 1}. {p.title} <span style={{ color: 'var(--text-dim)' }}>[{p.category}]</span>
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{p.tagline}</p>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'socials') {
      outputNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p>Instagram: <a href={`https://instagram.com/${data.personal.instagram}`} target="_blank" rel="noreferrer" style={{ color: '#ec4899' }}>instagram.com/{data.personal.instagram}</a></p>
          <p>GitHub: <a href={`https://github.com/${data.personal.github}`} target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>github.com/{data.personal.github}</a></p>
        </div>
      );
    } else if (cmd.startsWith('theme')) {
      const parts = cmd.split(' ');
      const themeName = parts[1] as 'cyan' | 'purple' | 'emerald' | 'solar' | 'crimson';
      if (['cyan', 'purple', 'emerald', 'solar', 'crimson'].includes(themeName)) {
        updateThemeConfig({ primaryTheme: themeName });
        outputNode = <p style={{ color: '#10b981' }}>Theme changed to &quot;{themeName}&quot; successfully!</p>;
      } else {
        outputNode = <p style={{ color: '#ef4444' }}>Unknown theme. Try: theme cyan, theme purple, theme emerald, theme solar, or theme crimson.</p>;
      }
    } else if (cmd === 'matrix') {
      outputNode = (
        <div style={{ color: '#10b981', fontFamily: 'var(--font-mono)' }}>
          <p>01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100</p>
          <p>System matrix initialized: CDLSIET CSE Neural Stream Active.</p>
        </div>
      );
    } else if (cmd === 'contact') {
      outputNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <p>Email: <a href={`mailto:${data.personal.email}`} style={{ color: 'var(--primary)' }}>{data.personal.email}</a></p>
          <p>Phone: <a href={`tel:${data.personal.phone.replace(/\s+/g, '')}`} style={{ color: '#ffffff' }}>{data.personal.phone}</a></p>
          <p>Location: <span style={{ color: '#ffffff' }}>{data.personal.location}</span></p>
        </div>
      );
    } else if (cmd === 'admin' || cmd === 'panel' || cmd === 'login') {
      outputNode = <p style={{ color: '#10b981' }}>Opening Secured Command Center... Enter master passkey to authenticate.</p>;
      setTimeout(() => {
        setIsAdminOpen(true);
      }, 400);
    } else if (cmd === 'sudo') {
      outputNode = <p style={{ color: '#f59e0b' }}>User &quot;guest&quot; is not in the sudoers file. This incident will be reported to Rupesh.</p>;
    } else {
      outputNode = (
        <p style={{ color: '#ef4444' }}>
          Command not found: &quot;{rawCmd}&quot;. Type <span style={{ color: 'var(--primary)', fontWeight: 700 }}>help</span> for available commands.
        </p>
      );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: outputNode, time }]);
    setInput('');
  };

  const executeShortcut = (cmd: string) => {
    handleCommand(cmd);
  };

  return (
    <section id="terminal" className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">// INTERACTIVE CLI</span>
        <h2 className="section-title">
          Interactive <span className="text-gradient">3D Cyber Terminal</span>
        </h2>
        <p className="section-subtitle">
          An interactive command-line interface simulator. Query credentials, inspect education records, or switch themes.
        </p>
      </div>

      {/* Terminal Shell Window */}
      <div
        className="glass-panel"
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--border-glass-hover)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px var(--primary-glow)',
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <TerminalIcon size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <span className="terminal-title-text">rupesh@cdlsiet-engine:~ (zsh)</span>
          </div>

          <div style={{ width: '30px' }} />
        </div>

        {/* Output Buffer */}
        <div
          className="terminal-buffer"
          style={{
            padding: '20px',
            minHeight: '280px',
            maxHeight: '400px',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            background: 'rgba(5, 7, 14, 0.95)',
          }}
        >
          {history.map((entry, idx) => (
            <div key={idx} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', marginBottom: '4px', flexWrap: 'wrap' }}>
                <span style={{ color: '#10b981' }}>rupesh@portfolio</span>
                <span style={{ color: 'var(--text-dim)' }}>:~$</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{entry.command}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-dim)', fontSize: '0.72rem' }}>{entry.time}</span>
              </div>
              <div style={{ color: 'var(--text-muted)', paddingLeft: '10px', wordBreak: 'break-word' }}>{entry.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />

          {/* Active Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(input);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--primary)',
              marginTop: '10px',
            }}
          >
            <span className="terminal-prompt-full" style={{ color: '#10b981', flexShrink: 0 }}>rupesh@portfolio</span>
            <span style={{ color: 'var(--text-dim)', flexShrink: 0 }}>:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type 'help', 'skills', 'theme purple'..."
              style={{
                flex: 1,
                minWidth: 0,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
              }}
            />
            <button
              type="submit"
              aria-label="Submit command"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <CornerDownLeft size={16} />
            </button>
          </form>
        </div>

        {/* Quick Command Chips */}
        <div
          style={{
            padding: '10px 16px',
            background: 'rgba(255, 255, 255, 0.02)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-dim)' }}>
            QUICK:
          </span>
          {['help', 'education', 'skills', 'projects', 'socials', 'theme purple', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeShortcut(cmd)}
              onMouseEnter={() => playSound('hover')}
              className="interactive"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--primary)',
                cursor: 'pointer',
              }}
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .terminal-buffer {
            padding: 14px 10px !important;
            font-size: 0.80rem !important;
          }
          .terminal-prompt-full {
            display: none !important;
          }
          .terminal-title-text {
            font-size: 0.72rem !important;
          }
        }
      `}</style>
    </section>
  );
}

