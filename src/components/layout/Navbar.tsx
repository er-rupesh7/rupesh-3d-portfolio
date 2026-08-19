'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import AudioController from '@/components/ui/AudioController';
import {
  SlidersHorizontal,
  Instagram,
  Github,
  Menu,
  X,
  Code2,
  GraduationCap,
  Sparkles,
  Layers,
  Terminal as TerminalIcon,
  Mail,
  User,
} from 'lucide-react';

export default function Navbar() {
  const { data, toggleAdmin, playSound } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      style={{
        position: 'fixed',
        top: '20px',
        left: '0',
        right: '0',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'center',
        padding: '0 16px',
        pointerEvents: 'none',
      }}
    >
      <nav
        className="glass-panel"
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px',
          padding: scrolled ? '10px 22px' : '14px 28px',
          borderRadius: '20px',
          backgroundColor: scrolled ? 'rgba(9, 13, 24, 0.88)' : 'rgba(11, 16, 29, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: scrolled
            ? '0 15px 35px rgba(0, 0, 0, 0.6), 0 0 20px var(--primary-glow)'
            : '0 10px 30px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => handleNavClick('#hero')}
          onMouseEnter={() => playSound('hover')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: '#ffffff',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px var(--primary-glow)',
              color: '#000000',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
            }}
          >
            RK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              {data.personal.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--primary)',
                letterSpacing: '0.05em',
              }}
            >
              @{data.personal.instagram}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '4px 6px',
            borderRadius: '14px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
          className="desktop-nav-menu"
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
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--primary-muted)' : 'transparent',
                  border: `1px solid ${isActive ? 'var(--border-glass-hover)' : 'transparent'}`,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <item.icon size={15} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right Action Icons & Admin Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* GitHub Profile */}
          <a
            href={`https://github.com/${data.personal.github}`}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              transition: 'var(--transition-smooth)',
              textDecoration: 'none',
            }}
          >
            <Github size={18} />
          </a>

          {/* Instagram Profile */}
          <a
            href={`https://instagram.com/${data.personal.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Profile"
            onMouseEnter={() => playSound('hover')}
            onClick={() => playSound('click')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              transition: 'var(--transition-smooth)',
              textDecoration: 'none',
            }}
          >
            <Instagram size={18} />
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              background: 'var(--primary-muted)',
              border: '1px solid var(--primary)',
              color: 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 0 12px var(--primary-glow)',
              transition: 'var(--transition-smooth)',
            }}
          >
            <SlidersHorizontal size={15} />
            <span className="hidden sm:inline">Panel</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="mobile-hamburger-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              cursor: 'pointer',
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            position: 'absolute',
            top: '80px',
            left: '16px',
            right: '16px',
            padding: '20px',
            borderRadius: '20px',
            backgroundColor: 'rgba(9, 13, 24, 0.95)',
            backdropFilter: 'blur(25px)',
            border: '1px solid var(--border-glass-hover)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 25px var(--primary-glow)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.href)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                color: activeHash === item.id ? 'var(--primary)' : '#ffffff',
                backgroundColor: activeHash === item.id ? 'var(--primary-muted)' : 'rgba(255, 255, 255, 0.03)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav-menu {
            display: flex !important;
          }
        }
        @media (max-width: 899px) {
          .mobile-hamburger-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </header>
  );
}
