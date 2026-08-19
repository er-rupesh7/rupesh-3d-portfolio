'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { ArrowUp, Github, Instagram, Linkedin, Heart, Terminal, Globe, Cpu } from 'lucide-react';

export default function Footer() {
  const { data, playSound } = usePortfolio();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playSound('warp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 10,
        borderTop: '1px solid var(--border-glass)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(4, 6, 10, 0.95) 100%)',
        backdropFilter: 'blur(20px)',
        marginTop: '80px',
        padding: '60px 24px 40px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Top Tier */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  color: '#000000',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                RK
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {data.personal.name}
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Crafting immersive 3D digital universes, resilient backend architectures, and high-performance full-stack web applications.
            </p>
          </div>

          {/* System HUD Telemetry */}
          <div
            className="glass-card"
            style={{
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
            }}
          >
            <div>
              <div style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>LOCATION</div>
              <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} style={{ color: 'var(--primary)' }} />
                <span>Sirsa, Haryana</span>
              </div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'var(--border-glass)' }} />
            <div>
              <div style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>SYS TIME</div>
              <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{time || '00:00:00'}</div>
            </div>
            <div style={{ width: '1px', height: '30px', background: 'var(--border-glass)' }} />
            <div>
              <div style={{ color: 'var(--text-dim)', marginBottom: '4px' }}>STATUS</div>
              <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="status-dot" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier Social & Tech */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href={`https://github.com/${data.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              className="interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              <Github size={16} style={{ color: 'var(--primary)' }} />
              <span>github.com/{data.personal.github}</span>
            </a>

            <a
              href={`https://instagram.com/${data.personal.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              className="interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                textDecoration: 'none',
              }}
            >
              <Instagram size={16} style={{ color: '#ec4899' }} />
              <span>instagram.com/{data.personal.instagram}</span>
            </a>
          </div>

          {/* Scroll to Top Rocket Button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => playSound('hover')}
            title="Scroll to Top"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'var(--primary-muted)',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 15px var(--primary-glow)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        {/* Bottom Tier Copyright */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            color: 'var(--text-dim)',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {data.personal.name}. Built with Next.js, Three.js, TypeScript & Vercel.
          </div>
          <div>
            CDLSIET CSE • Maharaja Agarsain • Shah Satnam Ji Boys&apos; School
          </div>
        </div>
      </div>
    </footer>
  );
}
