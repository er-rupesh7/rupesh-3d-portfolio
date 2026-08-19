'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import Card3DTilt from '@/components/3d/Card3DTilt';
import confetti from 'canvas-confetti';
import {
  ExternalLink,
  Github,
  Sparkles,
  Star,
  Layers,
  ArrowUpRight,
  X,
  Code2,
  CheckCircle,
} from 'lucide-react';
import { ProjectItem } from '@/data/defaultData';

export default function Projects() {
  const { data, playSound } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full-Stack', '3D & WebGL', 'Cloud & Systems', 'AI & Tools'];

  const filteredProjects =
    activeCategory === 'All'
      ? data.projects
      : data.projects.filter((p) => p.category === activeCategory);

  const handleLaunchDemo = (url?: string) => {
    if (!url) return;
    playSound('success');
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00f0ff', '#7000ff', '#ff007b', '#10b981'],
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="projects" className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">// INNOVATION PORTFOLIO</span>
        <h2 className="section-title">
          Featured <span className="text-gradient">Engineering Projects</span>
        </h2>
        <p className="section-subtitle">
          Production applications, distributed cloud services, 3D WebGL experiences, and full-stack software built by Rupesh.
        </p>
      </div>

      {/* Filter Tabs */}
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

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '32px',
        }}
      >
        {filteredProjects.map((project) => (
          <Card3DTilt key={project.id} maxTilt={10}>
            <div
              className="glass-panel"
              style={{
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                position: 'relative',
              }}
            >
              <div>
                {/* Visual Gradient Banner / Header */}
                <div
                  style={{
                    height: '140px',
                    borderRadius: '14px',
                    background: project.imageGradient,
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        background: 'rgba(0, 0, 0, 0.45)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      {project.category}
                    </span>

                    {project.starsCount && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: 'rgba(0, 0, 0, 0.45)',
                          backdropFilter: 'blur(8px)',
                          color: '#facc15',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        <Star size={12} fill="#facc15" />
                        <span>{project.starsCount}</span>
                      </div>
                    )}
                  </div>

                  {project.metrics && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: '#ffffff',
                        background: 'rgba(0, 0, 0, 0.5)',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        display: 'inline-block',
                        maxWidth: 'fit-content',
                      }}
                    >
                      ⚡ {project.metrics}
                    </div>
                  )}
                </div>

                {/* Project Title */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#ffffff',
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    marginBottom: '14px',
                  }}
                >
                  {project.tagline}
                </p>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '24px',
                  }}
                >
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#e5e7eb',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {project.liveUrl && (
                  <button
                    onClick={() => handleLaunchDemo(project.liveUrl)}
                    onMouseEnter={() => playSound('hover')}
                    className="btn-cyber-primary interactive"
                    style={{ flex: 1, padding: '10px 18px', fontSize: '0.88rem' }}
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight size={16} />
                  </button>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  onMouseEnter={() => playSound('hover')}
                  className="btn-cyber-outline interactive"
                  style={{
                    flex: project.liveUrl ? undefined : 1,
                    padding: '10px 18px',
                    fontSize: '0.88rem',
                  }}
                >
                  <Github size={16} />
                  <span>Code</span>
                </a>

                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedProject(project);
                  }}
                  title="View Details"
                  className="interactive"
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    cursor: 'pointer',
                  }}
                >
                  <Code2 size={16} />
                </button>
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            backgroundColor: 'rgba(4, 6, 12, 0.85)',
            backdropFilter: 'blur(16px)',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '650px',
              width: '100%',
              padding: '36px',
              borderRadius: '24px',
              position: 'relative',
              backgroundColor: 'rgba(10, 14, 26, 0.96)',
              border: '1px solid var(--border-glass-hover)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px var(--primary-glow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '16px' }}>
              <span className="badge-pill">{selectedProject.category}</span>
            </div>

            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '20px' }}>
              {selectedProject.tagline}
            </p>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '24px', fontSize: '0.98rem' }}>
              {selectedProject.longDescription || selectedProject.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                TECH STACK &amp; ARCHITECTURE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedProject.tags.map((t, idx) => (
                  <span key={idx} className="badge-pill" style={{ fontSize: '0.78rem' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px' }}>
              {selectedProject.liveUrl && (
                <button
                  onClick={() => handleLaunchDemo(selectedProject.liveUrl)}
                  className="btn-cyber-primary interactive"
                  style={{ flex: 1 }}
                >
                  <ExternalLink size={16} />
                  <span>Launch Live</span>
                </button>
              )}
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cyber-outline interactive"
                style={{ flex: 1 }}
              >
                <Github size={16} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
