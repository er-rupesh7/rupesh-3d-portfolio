'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import Card3DTilt from '@/components/3d/Card3DTilt';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Instagram,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  PhoneCall,
  ExternalLink,
} from 'lucide-react';

export default function Contact() {
  const { data, playSound, showToast } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.personal.email);
    setCopiedEmail(true);
    playSound('success');
    showToast('Email copied: ' + data.personal.email);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(data.personal.phone);
    setCopiedPhone(true);
    playSound('success');
    showToast('Phone number copied: ' + data.personal.phone);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    playSound('click');

    const subject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from Rupesh Kumar 3D Portfolio`
    );
    const mailtoUrl = `mailto:${data.personal.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setIsSubmitting(false);
      playSound('success');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#7000ff', '#ff007b', '#10b981'],
      });
      showToast('Opening mail client to send payload to ' + data.personal.email);
      // Trigger native email client or webmail
      window.location.href = mailtoUrl;
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <section id="contact" className="section-wrapper">
      <div className="section-header">
        <span className="section-tag">// TRANSMISSION HUB</span>
        <h2 className="section-title">
          Initiate <span className="text-gradient">Collaboration</span>
        </h2>
        <p className="section-subtitle">
          Have an engineering opportunity, a software project, or want to discuss modern web architecture? Let&apos;s connect.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: '36px',
          alignItems: 'start',
        }}
        className="contact-grid"
      >
        {/* Left Side: Contact Information & Direct Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Email Quick Copy & Direct Send Card */}
          <Card3DTilt maxTilt={8}>
            <div
              className="glass-panel"
              style={{
                padding: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderLeft: '4px solid #10b981',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid #10b981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#10b981' }}>
                    DIRECT EMAIL DISPATCH
                  </div>
                  <a
                    href={`mailto:${data.personal.email}`}
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      textDecoration: 'none',
                    }}
                  >
                    {data.personal.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={copyEmail}
                  onMouseEnter={() => playSound('hover')}
                  title="Copy Email"
                  className="interactive"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: copiedEmail ? '#10b981' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                  }}
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </Card3DTilt>

          {/* Phone & WhatsApp Card */}
          <Card3DTilt maxTilt={8}>
            <div
              className="glass-panel"
              style={{
                padding: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                borderLeft: '4px solid var(--primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--primary-muted)',
                    border: '1px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    flexShrink: 0,
                  }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--primary)' }}>
                    PHONE &amp; WHATSAPP
                  </div>
                  <a
                    href={`tel:${data.personal.phone.replace(/\s+/g, '')}`}
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      textDecoration: 'none',
                    }}
                  >
                    {data.personal.phone}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={copyPhone}
                  onMouseEnter={() => playSound('hover')}
                  title="Copy Phone"
                  className="interactive"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: copiedPhone ? '#10b981' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                  }}
                >
                  {copiedPhone ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </Card3DTilt>

          {/* Instagram Spotlight Card */}
          <Card3DTilt maxTilt={8}>
            <a
              href={`https://instagram.com/${data.personal.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderLeft: '4px solid #ec4899',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f59e0b, #ec4899, #8b5cf6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                    boxShadow: '0 0 15px rgba(236, 72, 153, 0.4)',
                  }}
                >
                  <Instagram size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#ec4899' }}>
                    DIRECT INSTAGRAM
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    @{data.personal.instagram}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Message for quick chats &amp; collaborations
                  </div>
                </div>
              </div>
            </a>
          </Card3DTilt>

          {/* GitHub Spotlight Card */}
          <Card3DTilt maxTilt={8}>
            <a
              href={`https://github.com/${data.personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => playSound('hover')}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div
                className="glass-panel"
                style={{
                  padding: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderLeft: '4px solid var(--secondary)',
                }}
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--secondary-glow)',
                    border: '1px solid var(--secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    flexShrink: 0,
                  }}
                >
                  <Github size={22} />
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--secondary)' }}>
                    GITHUB REPOSITORIES
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                    github.com/{data.personal.github}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Explore open source code &amp; experiments
                  </div>
                </div>
              </div>
            </a>
          </Card3DTilt>

          {/* Location & Academic Base Card */}
          <div
            className="glass-card"
            style={{
              padding: '18px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <MapPin size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>
                {data.personal.location}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                CDLSIET Panniwala Mota • Sirsa, Haryana
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Holographic Interactive Form */}
        <div
          className="glass-panel"
          style={{
            padding: '36px',
            borderRadius: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <MessageSquare size={20} style={{ color: 'var(--primary)' }} />
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Direct Message Transmission</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                Target: {data.personal.email}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-dim)',
                    marginBottom: '8px',
                  }}
                >
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Alex Hunter"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    color: 'var(--text-dim)',
                    marginBottom: '8px',
                  }}
                >
                  YOUR EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. alex@example.com"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-dim)',
                  marginBottom: '8px',
                }}
              >
                SUBJECT
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Software Engineering Opportunity / Web Project"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--text-dim)',
                  marginBottom: '8px',
                }}
              >
                YOUR MESSAGE *
              </label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Share project details or inquiries..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              onMouseEnter={() => playSound('hover')}
              className="btn-cyber-primary interactive"
              style={{ width: '100%', marginTop: '8px' }}
            >
              {isSubmitting ? (
                <span>Dispatching Payload...</span>
              ) : (
                <>
                  <span>Send Message Directly</span>
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
