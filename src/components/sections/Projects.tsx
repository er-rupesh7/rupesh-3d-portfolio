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

  const categories = ['All', 'Frontend', 'Full-Stack', '3D & WebGL', 'Cloud & Systems', 'AI & Tools'];

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
        className="projects-filter-pills"
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
              className="interactive project-filter-btn"
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

      {/* Projects Grid */}
      <div
        className="projects-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '24px',
        }}
      >
        {filteredProjects.map((project) => (
          <Card3DTilt key={project.id} maxTilt={10}>
            <div
              className="glass-panel project-card"
              style={{
                padding: '24px',
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
                    height: '130px',
                    borderRadius: '12px',
                    background: project.imageGradient,
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '14px',
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
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                      }}
                    >
                      {project.category}
                    </span>
                    {project.featured && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '8px',
                          background: 'rgba(0, 240, 255, 0.25)',
                          color: '#00f0ff',
                          fontSize: '0.70rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                        }}
                      >
                        <Star size={11} fill="#00f0ff" />
                        <span>FEATURED</span>
                      </span>
                    )}
                  </div>

                  <div style={{ color: '#ffffff', fontWeight: 800, fontSize: '1.25rem' }}>
                    {project.title}
                  </div>
                </div>

                <p
                  style={{
                    color: 'var(--primary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    marginBottom: '10px',
                  }}
                >
                  {project.tagline}
                </p>

                <p
                  style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.90rem',
                    lineHeight: 1.6,
                    marginBottom: '18px',
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
                    marginBottom: '20px',
                  }}
                >
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-main)',
                        fontSize: '0.74rem',
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
                  gap: '10px',
                  paddingTop: '16px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                {project.liveUrl && (
                  <button
                    onClick={() => handleLaunchDemo(project.liveUrl)}
                    className="btn-cyber-primary interactive"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      fontSize: '0.85rem',
                    }}
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </button>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  title="Source Code"
                  className="btn-cyber-outline interactive"
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.85rem',
                    flex: project.liveUrl ? undefined : 1,
                  }}
                >
                  <Github size={15} />
                  {!project.liveUrl && <span>Code Repo</span>}
                </a>

                <button
                  onClick={() => {
                    playSound('click');
                    setSelectedProject(project);
                  }}
                  title="View Details"
                  className="interactive"
                  style={{
                    padding: '10px 12px',
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
          className="project-modal-backdrop"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: 'rgba(4, 6, 12, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glass-panel project-modal-panel"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '32px',
              borderRadius: '24px',
              position: 'relative',
              backgroundColor: 'rgba(10, 14, 26, 0.98)',
              border: '1px solid var(--border-glass-hover)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px var(--primary-glow)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close Project Details"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
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
                zIndex: 10,
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '14px' }}>
              <span className="badge-pill">{selectedProject.category}</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '6px', paddingRight: '40px' }}>
              {selectedProject.title}
            </h3>

            <p style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '18px' }}>
              {selectedProject.tagline}
            </p>

            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px', fontSize: '0.94rem' }}>
              {selectedProject.longDescription || selectedProject.description}
            </p>

            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                TECH STACK &amp; ARCHITECTURE
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedProject.tags.map((t, idx) => (
                  <span key={idx} className="badge-pill" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="project-modal-actions" style={{ display: 'flex', gap: '12px' }}>
              {selectedProject.liveUrl && (
                <button
                  onClick={() => handleLaunchDemo(selectedProject.liveUrl)}
                  className="btn-cyber-primary interactive"
                  style={{ flex: 1 }}
                >
                  <ExternalLink size={15} />
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
                <Github size={15} />
                <span>GitHub Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .project-card {
            padding: 18px 14px !important;
          }
          .project-modal-panel {
            padding: 22px 16px !important;
            border-radius: 18px !important;
          }
          .project-filter-btn {
            padding: 6px 12px !important;
            font-size: 0.78rem !important;
          }
        }
        @media (max-width: 440px) {
          .project-modal-actions {
            flex-direction: column !important;
          }
          .project-modal-actions button,
          .project-modal-actions a {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
