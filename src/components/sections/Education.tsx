'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import Card3DTilt from '@/components/3d/Card3DTilt';
import { GraduationCap, School, BookOpen, MapPin, Award, Calendar, CheckCircle } from 'lucide-react';

export default function Education() {
  const { data, playSound } = usePortfolio();

  const getIcon = (type: string) => {
    switch (type) {
      case 'college':
        return GraduationCap;
      case 'school':
        return School;
      case 'secondary':
      default:
        return BookOpen;
    }
  };

  return (
    <section id="education" className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">// ACADEMIC FOUNDATION</span>
        <h2 className="section-title">
          Education &amp; <span className="text-gradient">Academic Journey</span>
        </h2>
        <p className="section-subtitle">
          The educational milestones in Sirsa, Haryana that forged my Computer Science problem-solving capabilities.
        </p>
      </div>

      {/* Timeline List */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          maxWidth: '1000px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        {data.education.map((item, index) => {
          const IconComp = getIcon(item.iconType);
          return (
            <Card3DTilt key={item.id} maxTilt={6}>
              <div
                className="glass-panel"
                style={{
                  padding: '36px',
                  position: 'relative',
                  borderLeft: `4px solid ${
                    index === 0 ? 'var(--primary)' : index === 1 ? 'var(--secondary)' : '#10b981'
                  }`,
                }}
              >
                {/* Milestone Badge Pill */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      color: index === 0 ? 'var(--primary)' : index === 1 ? 'var(--secondary)' : '#10b981',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <IconComp size={16} />
                    <span>MILESTONE #{data.education.length - index}</span>
                  </div>

                  {item.grade && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#ffffff',
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '4px 10px',
                        borderRadius: '8px',
                      }}
                    >
                      <Award size={14} style={{ color: '#10b981' }} />
                      <span>{item.grade}</span>
                    </div>
                  )}
                </div>

                {/* Degree Title */}
                <h3
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#ffffff',
                  }}
                >
                  {item.degree}
                </h3>

                {/* Institution and Location */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '18px',
                    color: 'var(--text-muted)',
                    fontSize: '0.95rem',
                  }}
                >
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.institution}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)' }}>
                    <MapPin size={14} style={{ color: 'var(--primary)' }} />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px', fontSize: '0.96rem' }}>
                  {item.description}
                </p>

                {/* Key Highlights / Subjects */}
                {item.highlights && item.highlights.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        color: 'var(--text-dim)',
                        marginBottom: '10px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      KEY FOCUS AREAS:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {item.highlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '4px 12px',
                            borderRadius: '999px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#e5e7eb',
                            fontSize: '0.82rem',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          <CheckCircle size={12} style={{ color: 'var(--primary)' }} />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card3DTilt>
          );
        })}
      </div>
    </section>
  );
}
