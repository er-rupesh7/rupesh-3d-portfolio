'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import Card3DTilt from '@/components/3d/Card3DTilt';
import { Sparkles, Code2, Layout, Server, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const { data, playSound } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Database & Cloud', 'Tools & AI'];

  const filteredSkills =
    activeCategory === 'All'
      ? data.skills
      : data.skills.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Languages':
        return Code2;
      case 'Frontend':
        return Layout;
      case 'Backend':
        return Server;
      case 'Database & Cloud':
        return Database;
      case 'Tools & AI':
      default:
        return Wrench;
    }
  };

  return (
    <section id="skills" className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">// TECH UNIVERSE</span>
        <h2 className="section-title">
          Skills &amp; <span className="text-gradient">Technical Arsenal</span>
        </h2>
        <p className="section-subtitle">
          Core technologies, frameworks, and engineering tools leveraged to build resilient, state-of-the-art software systems.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div
        className="skills-filter-pills"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '36px',
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                playSound('tab');
                setActiveCategory(cat);
              }}
              onMouseEnter={() => playSound('hover')}
              className="interactive skills-filter-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '10px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#000000' : '#ffffff',
                backgroundColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                boxShadow: isActive ? '0 0 16px var(--primary-glow)' : 'none',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)',
              }}
            >
              <span>{cat}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        className="skills-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '16px',
        }}
      >
        {filteredSkills.map((skill) => {
          const IconComp = getCategoryIcon(skill.category);
          return (
            <Card3DTilt key={skill.id} maxTilt={8}>
              <div
                className="glass-card skill-card"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'var(--primary-muted)',
                        border: '1px solid var(--border-glass-hover)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--primary)',
                      }}
                    >
                      <IconComp size={16} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: '#ffffff' }}>
                      {skill.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.80rem',
                      color: 'var(--primary)',
                      fontWeight: 600,
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Progress Track */}
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${skill.level}%`,
                      borderRadius: '999px',
                      background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                      boxShadow: '0 0 10px var(--primary-glow)',
                      transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  <span>{skill.category}</span>
                  {skill.featured && (
                    <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Sparkles size={11} /> Featured
                    </span>
                  )}
                </div>
              </div>
            </Card3DTilt>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .skill-card {
            padding: 16px 14px !important;
          }
          .skills-filter-btn {
            padding: 6px 12px !important;
            font-size: 0.78rem !important;
          }
        }
      `}</style>
    </section>
  );
}

