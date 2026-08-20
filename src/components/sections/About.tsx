'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import Card3DTilt from '@/components/3d/Card3DTilt';
import {
  Code2,
  Cpu,
  Database,
  Globe2,
  Sparkles,
  Zap,
  CheckCircle2,
  Terminal,
  FileText,
} from 'lucide-react';

export default function About() {
  const { data, playSound } = usePortfolio();

  const principles = [
    {
      icon: Zap,
      title: 'Performance-First Engineering',
      desc: 'Obsessed with sub-second page loads, 60fps WebGL rendering, and zero-redundancy algorithmic execution.',
    },
    {
      icon: Cpu,
      title: 'Scalable System Architecture',
      desc: 'Designing clean modular microservices, decoupled APIs, and type-safe frontends that scale effortlessly.',
    },
    {
      icon: Database,
      title: 'Modern Full-Stack Paradigm',
      desc: 'Expertise across the complete stack: Next.js, Node.js, Python, PostgreSQL, Redis, and cloud containers.',
    },
    {
      icon: Sparkles,
      title: 'Creative 3D & Micro-Interactions',
      desc: 'Transforming traditional web experiences into memorable interactive 3D digital products.',
    },
  ];

  return (
    <section id="about" className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">// IDENTITY &amp; PHILOSOPHY</span>
        <h2 className="section-title">
          Engineering the <span className="text-gradient">Future of Web</span>
        </h2>
        <p className="section-subtitle">
          A blend of deep Computer Science principles from CDLSIET Sirsa and modern full-stack web engineering craft.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: '36px',
          alignItems: 'start',
        }}
        className="about-grid"
      >
        {/* Left Side: Story & Persona */}
        <Card3DTilt>
          <div
            className="glass-panel about-story-card"
            style={{
              padding: '32px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    background: 'var(--primary-muted)',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}
                >
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Software Developer &amp; Engineer</h3>
                  <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
                    @{data.personal.instagram} // github.com/{data.personal.github}
                  </p>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '16px', fontSize: '0.98rem' }}>
                {data.personal.bio}
              </p>

              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px', fontSize: '0.98rem' }}>
                {data.personal.subBio}
              </p>

              <div
                className="about-checklist"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  marginBottom: '24px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span>Computer Science B.Tech</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span>Next.js App Router</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span>3D WebGL &amp; Three.js</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffffff', fontSize: '0.88rem' }}>
                  <CheckCircle2 size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                  <span>Distributed Backend APIs</span>
                </div>
              </div>
            </div>

            <div
              className="about-actions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <a
                href="#contact"
                onClick={() => playSound('click')}
                className="btn-cyber-primary interactive"
                style={{ flex: 1 }}
              >
                <span>Get In Touch</span>
              </a>
              <a
                href="#terminal"
                onClick={() => playSound('click')}
                className="btn-cyber-outline interactive"
                style={{ flex: 1 }}
              >
                <Terminal size={16} />
                <span>Test Terminal</span>
              </a>
            </div>
          </div>
        </Card3DTilt>

        {/* Right Side: Core Principles */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {principles.map((p, idx) => (
            <Card3DTilt key={idx} maxTilt={8}>
              <div
                className="glass-card about-principle-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                }}
              >
                <div
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    background: idx % 2 === 0 ? 'var(--primary-muted)' : 'var(--secondary-glow)',
                    border: `1px solid ${idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}`,
                    color: idx % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                    flexShrink: 0,
                  }}
                >
                  <p.icon size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: '4px', color: '#ffffff' }}>
                    {p.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {p.desc}
                  </p>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 640px) {
          .about-story-card {
            padding: 20px 16px !important;
          }
          .about-principle-card {
            padding: 16px 14px !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 440px) {
          .about-checklist {
            grid-template-columns: 1fr !important;
          }
          .about-actions {
            flex-direction: column !important;
          }
          .about-actions a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}

