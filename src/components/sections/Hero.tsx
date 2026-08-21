'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  ArrowRight,
  Terminal as TerminalIcon,
  Github,
  Instagram,
  Sparkles,
  MapPin,
  Code,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface LeetCodeProfile {
  username: string;
  realName: string;
  avatarUrl: string | null;
  ranking: number | null;
  solved: number;
  updatedAt: string;
}

export default function Hero() {
  const { data, playSound } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [leetcodeProfile, setLeetcodeProfile] = useState<LeetCodeProfile | null>(null);

  const roles = data.personal.roles || ['Software Developer', 'Full-Stack Engineer'];

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, roles]);

  useEffect(() => {
    let active = true;

    const refreshLeetCodeProfile = async () => {
      try {
        const response = await fetch('/api/leetcode');
        if (!response.ok) return;
        const profile = (await response.json()) as LeetCodeProfile;
        if (active) setLeetcodeProfile(profile);
      } catch {
        // Keep the configured portfolio fallback when LeetCode is unavailable.
      }
    };

    refreshLeetCodeProfile();
    const refreshTimer = window.setInterval(refreshLeetCodeProfile, 30 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 24px 80px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
          gap: '48px',
          alignItems: 'center',
        }}
        className="hero-grid"
      >
        {/* Left Column Content */}
        <div>
          {/* Availability Status Badge */}
          <div style={{ display: 'inline-block', marginBottom: '24px' }}>
            <div className="badge-pill">
              <span className="status-dot" />
              <span>{data.personal.status || 'Available for Software Engineering Roles'}</span>
            </div>
          </div>

          {/* Primary Semantic H1 */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.8rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
            }}
          >
            Hi, I&apos;m{' '}
            <span className="text-gradient" style={{ display: 'inline' }}>
              {data.personal.name}
            </span>
          </h1>

          {/* Typewriter Subtitle */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '10px',
              fontSize: 'clamp(1.15rem, 3vw, 1.85rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              color: 'var(--text-main)',
              marginBottom: '24px',
              minHeight: '44px',
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>Specializing in</span>
            <span
              className="text-cyber mono"
              style={{
                borderRight: '3px solid var(--primary)',
                paddingRight: '4px',
                animation: 'blink 0.9s infinite',
              }}
            >
              {displayedText}
            </span>
          </div>

          {/* Bio Description */}
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.7,
              marginBottom: '32px',
              maxWidth: '620px',
            }}
          >
            {data.personal.bio}
          </p>

          {/* Action CTAs */}
          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '40px',
            }}
          >
            <a
              href="#projects"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="btn-cyber-primary interactive"
            >
              <span>Explore Projects</span>
              <ArrowRight size={18} />
            </a>

            <a
              href="#terminal"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="btn-cyber-outline interactive"
            >
              <TerminalIcon size={18} style={{ color: 'var(--primary)' }} />
              <span>Launch 3D CLI</span>
            </a>

            <a
              href="#education"
              onClick={() => playSound('click')}
              onMouseEnter={() => playSound('hover')}
              className="btn-cyber-outline interactive"
            >
              <GraduationCap size={18} style={{ color: 'var(--secondary)' }} />
              <span>Academic Journey</span>
            </a>
          </div>

          {/* Social Badges Pill Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <a
              href={`https://github.com/${data.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              className="glass-card interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '10px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Github size={15} style={{ color: 'var(--primary)' }} />
              <span>github/{data.personal.github}</span>
            </a>

            <a
              href={`https://instagram.com/${data.personal.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              className="glass-card interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '10px',
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <Instagram size={15} style={{ color: '#ec4899' }} />
              <span>@{data.personal.instagram}</span>
            </a>

            <div
              className="glass-card"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '10px',
                color: 'var(--text-muted)',
                fontSize: '0.80rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <MapPin size={13} style={{ color: 'var(--primary)' }} />
              <span>{data.personal.location}</span>
            </div>
          </div>
        </div>

        {/* Right Column Hologram Quick Card */}
        <div className="hero-right-card" style={{ position: 'relative' }}>
          <div
            className="glass-panel hero-hud-card"
            style={{
              padding: '32px',
              borderRadius: '24px',
              border: '1px solid var(--border-glass-hover)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 30px var(--primary-glow)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Hologram Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '16px',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--primary)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.80rem', color: 'var(--primary)' }}>
                  DEVELOPER_HUD // ACTIVE
                </span>
              </div>
              <span className="badge-pill" style={{ padding: '4px 10px', fontSize: '0.72rem' }}>
                v2.4_LIVE
              </span>
            </div>

            {/* Core Stats Grid */}
            <div
              className="hero-stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                marginBottom: '20px',
              }}
            >
              <div
                className="glass-card"
                style={{ padding: '16px', borderLeft: '3px solid var(--primary)' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  ALMA MATER
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginTop: '4px' }}>
                  CDLSIET Sirsa
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>B.Tech CSE</div>
              </div>

              <div
                className="glass-card"
                style={{ padding: '16px', borderLeft: '3px solid var(--secondary)' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  SPECIALTY
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff', marginTop: '4px' }}>
                  Full-Stack & 3D
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--secondary)' }}>Next.js / WebGL</div>
              </div>

              <div
                className="glass-card"
                style={{ padding: '16px', borderLeft: '3px solid #10b981' }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  CODE HOURS
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#10b981', marginTop: '4px' }}>
                  {data.stats.codeHours}
                </div>
              </div>

              <div
                className="glass-card leetcode-stat-card"
                style={{ padding: '14px 14px 14px 16px', borderLeft: '3px solid #f59e0b' }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    LEETCODE SOLVED
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#f59e0b', marginTop: '4px' }}>
                    {leetcodeProfile ? leetcodeProfile.solved.toLocaleString() : data.stats.problemSolved}
                  </div>
                  <a
                    href="https://leetcode.com/u/3rupeshkr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leetcode-handle interactive"
                  >
                    @3rupeshkr
                  </a>
                </div>
                <a
                  href="https://leetcode.com/u/3rupeshkr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leetcode-avatar-shell interactive"
                  aria-label="Open Rupesh Kumar's LeetCode profile"
                >
                  {leetcodeProfile?.avatarUrl ? (
                    <img src={leetcodeProfile.avatarUrl} alt="Rupesh Kumar on LeetCode" />
                  ) : (
                    <span>3R</span>
                  )}
                </a>
              </div>
            </div>

            {/* Quick Education Footnote */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '14px',
                borderRadius: '12px',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: 'var(--primary)' }}>&gt; Education:</span> CDLSIET CSE • Maharaja Agarsain Sr. Sec • Shah Satnam Ji Boys&apos; School
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .leetcode-stat-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          min-width: 0;
        }
        .leetcode-handle {
          display: block;
          margin-top: 2px;
          color: var(--text-muted);
          font: 500 0.62rem var(--font-mono);
          text-decoration: none;
        }
        .leetcode-avatar-shell {
          position: relative;
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          display: grid;
          place-items: center;
          padding: 3px;
          border-radius: 18px;
          color: #090b10;
          font: 800 0.8rem var(--font-heading);
          text-decoration: none;
          background: conic-gradient(from 45deg, #f59e0b, #fff3b0, #00f0ff, #8b5cf6, #f59e0b);
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.28), inset 0 0 10px rgba(255, 255, 255, 0.5);
          transform: rotate(3deg);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .leetcode-avatar-shell:hover {
          transform: rotate(0) scale(1.06);
          box-shadow: 0 0 28px rgba(245, 158, 11, 0.48), 0 0 14px var(--primary-glow);
        }
        .leetcode-avatar-shell img,
        .leetcode-avatar-shell > span {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          border-radius: 15px;
          object-fit: cover;
          background: #111827;
        }
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-right-card {
            margin-top: 10px;
          }
        }
        @media (max-width: 640px) {
          #hero {
            padding: 100px 14px 50px !important;
          }
          .hero-cta-group {
            gap: 10px !important;
            margin-bottom: 30px !important;
          }
          .hero-cta-group a {
            width: 100% !important;
            justify-content: center !important;
          }
          .hero-hud-card {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 380px) {
          .hero-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}
