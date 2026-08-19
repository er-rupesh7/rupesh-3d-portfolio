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
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '48px',
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
              className="interactive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '12px',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#000000' : '#ffffff',
                backgroundColor: isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${isActive ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                boxShadow: isActive ? '0 0 20px var(--primary-glow)' : 'none',
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
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {filteredSkills.map((skill) => {
          const IconComp = getCategoryIcon(skill.category);
          return (
            <Card3DTilt key={skill.id} maxTilt={8}>
              <div
                className="glass-card"
                style={{
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
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
                    <span style={{ fontWeight: 600, fontSize: '1rem', color: '#ffffff' }}>
                      {skill.name}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
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
                    fontSize: '0.74rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  <span>{skill.category}</span>
                  {skill.featured && (
                    <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Sparkles size={12} /> Featured
                    </span>
                  )}
                </div>
              </div>
            </Card3DTilt>
          );
        })}
      </div>
    </section>
  );
}
