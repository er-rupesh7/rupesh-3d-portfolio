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
          className="footer-top-tier"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '420px', width: '100%' }}>
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
                  flexShrink: 0,
                }}
              >
                RK
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#ffffff',
                }}
              >
                {data.personal.name}
              </h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              Crafting immersive 3D digital universes, resilient backend architectures, and high-performance full-stack web applications.
            </p>
          </div>

          {/* System HUD Telemetry */}
          <div
            className="glass-card footer-telemetry"
            style={{
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.80rem',
            }}
          >
            <div>
              <div style={{ color: 'var(--text-dim)', marginBottom: '3px', fontSize: '0.72rem' }}>LOCATION</div>
              <div style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Globe size={13} style={{ color: 'var(--primary)' }} />
                <span>Sirsa, Haryana</span>
              </div>
            </div>
            <div className="telemetry-divider" style={{ width: '1px', height: '26px', background: 'var(--border-glass)' }} />
            <div>
              <div style={{ color: 'var(--text-dim)', marginBottom: '3px', fontSize: '0.72rem' }}>SYS TIME</div>
              <div style={{ color: 'var(--primary)', fontWeight: 600 }}>{time || '00:00:00'}</div>
            </div>
            <div className="telemetry-divider" style={{ width: '1px', height: '26px', background: 'var(--border-glass)' }} />
            <div>
              <div style={{ color: 'var(--text-dim)', marginBottom: '3px', fontSize: '0.72rem' }}>STATUS</div>
              <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span className="status-dot" />
                <span>ONLINE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Tier Social & Tech */}
        <div
          className="footer-mid-tier"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <div className="footer-social-links" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
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
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                textDecoration: 'none',
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
              className="interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                textDecoration: 'none',
              }}
            >
              <Instagram size={15} style={{ color: '#ec4899' }} />
              <span>@{data.personal.instagram}</span>
            </a>
          </div>

          {/* Scroll to Top Rocket Button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => playSound('hover')}
            title="Scroll to Top"
            className="footer-top-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '10px',
              background: 'var(--primary-muted)',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 15px var(--primary-glow)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <span>Back to Top</span>
            <ArrowUp size={15} />
          </button>
        </div>

        {/* Bottom Tier Copyright */}
        <div
          className="footer-bottom-tier"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--text-dim)',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {data.personal.name}. Built with Next.js, Three.js, TypeScript &amp; Vercel.
          </div>
          <div>
            CDLSIET CSE • Maharaja Agarsain • Shah Satnam Ji Boys&apos; School
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .footer-telemetry {
            width: 100% !important;
            justify-content: space-between !important;
            padding: 12px 14px !important;
            gap: 10px !important;
          }
          .footer-social-links {
            width: 100% !important;
          }
          .footer-social-links a {
            flex: 1 !important;
            justify-content: center !important;
          }
          .footer-top-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          .footer-bottom-tier {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </footer>
  );
}

