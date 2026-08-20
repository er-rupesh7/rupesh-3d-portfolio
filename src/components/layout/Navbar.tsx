'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import AudioController from '@/components/ui/AudioController';
import {
  SlidersHorizontal,
  Instagram,
  Github,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  Layers,
  Terminal as TerminalIcon,
  Mail,
  User,
  ExternalLink,
  Shield,
  CircleDot,
  Radio,
} from 'lucide-react';

export default function Navbar() {
  const { data, toggleAdmin, playSound } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('hero');
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'terminal', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveHash(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'About', href: '#about', id: 'about', icon: User },
    { label: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { label: 'Skills', href: '#skills', id: 'skills', icon: Sparkles },
    { label: 'Projects', href: '#projects', id: 'projects', icon: Layers },
    { label: 'Terminal', href: '#terminal', id: 'terminal', icon: TerminalIcon },
    { label: 'Contact', href: '#contact', id: 'contact', icon: Mail },
  ];

  const handleNavClick = (href: string) => {
    playSound('click');
    setMobileMenuOpen(false);
  };

  const handleToggleMenu = () => {
    playSound('click');
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header
        className="navbar-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 16px',
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <nav
          className="glass-panel navbar-bar"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            width: '100%',
            maxWidth: '1200px',
            padding: scrolled ? '8px 16px' : '12px 20px',
            borderRadius: '16px',
            backgroundColor: scrolled ? 'rgba(8, 12, 22, 0.92)' : 'rgba(10, 15, 28, 0.75)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--border-glass)',
            boxShadow: scrolled
              ? '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px var(--primary-glow)'
              : '0 10px 30px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            onClick={() => handleNavClick('#hero')}
            onMouseEnter={() => playSound('hover')}
            className="navbar-brand"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#ffffff',
              minWidth: 0,
              flexShrink: 0,
            }}
          >
            <div
              className="navbar-logo-badge"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px var(--primary-glow)',
                color: '#000000',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.95rem',
                flexShrink: 0,
              }}
            >
              RK
            </div>
            <div className="navbar-brand-info" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
              <span
                className="navbar-brand-name"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: '0.98rem',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {data.personal.name}
              </span>
              <span
                className="navbar-brand-handle"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.70rem',
                  color: 'var(--primary)',
                  letterSpacing: '0.04em',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                @{data.personal.instagram}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div
            className="desktop-nav-menu"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '4px 6px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeHash === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  onMouseEnter={() => playSound('hover')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '7px 12px',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'var(--primary-muted)' : 'transparent',
                    border: `1px solid ${isActive ? 'var(--border-glass-hover)' : 'transparent'}`,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <item.icon size={14} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Right Action Icons & Admin Button */}
          <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            {/* Desktop Social Links */}
            <a
              href={`https://github.com/${data.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub Profile (@er-rupesh7)"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="navbar-icon-btn hide-on-mobile"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                transition: 'var(--transition-smooth)',
                textDecoration: 'none',
              }}
            >
              <Github size={17} />
            </a>

            <a
              href={`https://instagram.com/${data.personal.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram Profile (@3rupeshkr)"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
              className="navbar-icon-btn hide-on-mobile"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                transition: 'var(--transition-smooth)',
                textDecoration: 'none',
              }}
            >
              <Instagram size={17} />
            </a>

            {/* Audio FX Controller */}
            <AudioController />

            {/* Admin / Control Panel Trigger */}
            <button
              onClick={() => {
                playSound('click');
                toggleAdmin();
              }}
              title="Control Panel (Ctrl + E)"
              className="navbar-admin-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 12px',
                borderRadius: '10px',
                background: 'var(--primary-muted)',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 0 12px var(--primary-glow)',
                transition: 'var(--transition-smooth)',
                whiteSpace: 'nowrap',
              }}
            >
              <SlidersHorizontal size={14} />
              <span className="admin-btn-label">Panel</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={handleToggleMenu}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              className="mobile-hamburger-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: mobileMenuOpen ? 'var(--primary-muted)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${mobileMenuOpen ? 'var(--primary)' : 'rgba(255, 255, 255, 0.12)'}`,
                color: mobileMenuOpen ? 'var(--primary)' : '#ffffff',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 998,
            backgroundColor: 'rgba(3, 6, 12, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        />
      )}

      {/* Mobile Glassmorphic Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          className="glass-panel mobile-drawer-panel"
          style={{
            position: 'fixed',
            top: '74px',
            left: '12px',
            right: '12px',
            zIndex: 999,
            padding: '16px',
            borderRadius: '20px',
            backgroundColor: 'rgba(9, 13, 24, 0.97)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid var(--border-glass-hover)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px var(--primary-glow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: 'calc(100vh - 90px)',
            overflowY: 'auto',
            animation: 'slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Drawer Top Header / Active Indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px 12px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="status-dot" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--primary)' }}>
                NAVIGATION // ACTIVE
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              Sirsa, Haryana
            </span>
          </div>

          {/* Navigation Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {navItems.map((item) => {
              const isActive = activeHash === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    color: isActive ? 'var(--primary)' : '#ffffff',
                    backgroundColor: isActive ? 'var(--primary-muted)' : 'rgba(255, 255, 255, 0.03)',
                    border: `1px solid ${isActive ? 'var(--border-glass-hover)' : 'transparent'}`,
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.98rem',
                    fontWeight: isActive ? 700 : 500,
                    textDecoration: 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                        color: isActive ? '#000000' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <item.icon size={16} />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.70rem',
                        color: 'var(--primary)',
                        background: 'rgba(0, 240, 255, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      VIEWING
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Drawer Footer Social & Admin Actions */}
          <div
            style={{
              marginTop: '10px',
              paddingTop: '14px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <a
                href={`https://github.com/${data.personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
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
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>GitHub</span>
              </a>

              <a
                href={`https://instagram.com/${data.personal.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
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
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Instagram</span>
              </a>
            </div>

            <button
              onClick={() => {
                playSound('click');
                setMobileMenuOpen(false);
                toggleAdmin();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px',
                borderRadius: '12px',
                background: 'var(--primary-muted)',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 0 15px var(--primary-glow)',
                width: '100%',
              }}
            >
              <Shield size={16} />
              <span>Open Control Panel</span>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (min-width: 960px) {
          .desktop-nav-menu {
            display: flex !important;
          }
          .hide-on-mobile {
            display: inline-flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }

        @media (max-width: 959px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: inline-flex !important;
          }
        }

        @media (max-width: 640px) {
          .navbar-header {
            padding: 8px 10px !important;
          }
          .navbar-bar {
            padding: 8px 12px !important;
            border-radius: 14px !important;
          }
          .navbar-brand-name {
            font-size: 0.9rem !important;
          }
          .navbar-brand-handle {
            display: none !important;
          }
          .admin-btn-label {
            display: none !important;
          }
          .navbar-admin-btn {
            padding: 8px !important;
          }
          .hide-on-mobile {
            display: none !important;
          }
        }

        @media (max-width: 360px) {
          .navbar-header {
            padding: 6px 6px !important;
          }
          .navbar-bar {
            padding: 6px 8px !important;
            gap: 6px !important;
          }
          .navbar-logo-badge {
            width: 32px !important;
            height: 32px !important;
            font-size: 0.85rem !important;
          }
          .navbar-brand-name {
            font-size: 0.82rem !important;
          }
        }
      `}</style>
    </>
  );
}

