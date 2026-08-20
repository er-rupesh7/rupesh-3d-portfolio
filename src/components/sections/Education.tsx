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
                className="glass-panel edu-card"
                style={{
                  padding: '32px',
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
                    gap: '10px',
                    marginBottom: '14px',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.80rem',
                      color: index === 0 ? 'var(--primary)' : index === 1 ? 'var(--secondary)' : '#10b981',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <IconComp size={15} />
                    <span>MILESTONE #{data.education.length - index}</span>
                  </div>

                  {item.grade && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.80rem',
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
                  className="edu-degree-title"
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    marginBottom: '8px',
                    color: '#ffffff',
                    lineHeight: 1.3,
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
                    gap: '12px',
                    marginBottom: '16px',
                    color: 'var(--text-muted)',
                    fontSize: '0.92rem',
                  }}
                >
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{item.institution}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)' }}>
                    <MapPin size={13} style={{ color: 'var(--primary)' }} />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '18px', fontSize: '0.94rem' }}>
                  {item.description}
                </p>

                {/* Key Highlights / Subjects */}
                {item.highlights && item.highlights.length > 0 && (
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-dim)',
                        marginBottom: '8px',
                        letterSpacing: '0.05em',
                      }}
                    >
                      KEY FOCUS AREAS:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.highlights.map((hl, hIdx) => (
                        <div
                          key={hIdx}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '4px 10px',
                            borderRadius: '999px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#e5e7eb',
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          <CheckCircle size={11} style={{ color: 'var(--primary)' }} />
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

      <style jsx>{`
        @media (max-width: 640px) {
          .edu-card {
            padding: 20px 16px !important;
          }
          .edu-degree-title {
            font-size: 1.15rem !important;
          }
        }
      `}</style>
    </section>
  );
}

