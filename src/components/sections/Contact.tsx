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
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

export default function Contact() {
  const { data, playSound, showToast } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
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

  const handleWhatsAppSend = () => {
    const name = formData.name.trim() || 'Visitor';
    const message = formData.message.trim() || 'Hello Rupesh, I would like to connect with you regarding an opportunity.';
    const email = formData.email.trim() ? ` (Email: ${formData.email.trim()})` : '';
    const text = `Hi Rupesh, my name is ${name}.${email}\n\n${message}`;

    const cleanPhone = data.personal.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;

    playSound('click');
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    playSound('click');

    try {
      // Step 1: Pre-flight Rate Limit Check (5-day limit by IP & Email)
      const checkRes = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check', email: formData.email }),
      });

      const checkData = await checkRes.json();

      if (checkData.isRateLimited) {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setStatusMessage(checkData.message);
        showToast(`Limit Active: Wait ${checkData.remainingTime}`);
        return;
      }

      // Step 2: Client-side Direct Submission to Web3Forms
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
        process.env.WEB3FORMS_ACCESS_KEY ||
        'b09c40d2-bfa0-4b81-ac04-5476576be605';

      const formPayload = new FormData();
      formPayload.append('access_key', accessKey);
      formPayload.append('name', formData.name.trim());
      formPayload.append('email', formData.email.trim());
      formPayload.append('subject', formData.subject?.trim() || `Portfolio Inquiry from ${formData.name.trim()}`);
      formPayload.append('message', formData.message.trim());
      formPayload.append('from_name', 'Rupesh Kumar 3D Portfolio');
      formPayload.append('botcheck', '');

      const web3Res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formPayload,
      });

      const web3Data = await web3Res.json();

      if (web3Data.success) {
        // Step 3: Record the successful transmission in the rate limit registry
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'record',
              email: formData.email,
              name: formData.name,
            }),
          });
        } catch {
          // ignore recording error if network blips
        }

        setIsSubmitting(false);
        setSubmitStatus('success');
        setStatusMessage('Your transmission has been delivered directly to Rupesh!');
        playSound('success');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#7000ff', '#ff007b', '#10b981'],
        });
        showToast('Transmission delivered to ' + data.personal.email);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setIsSubmitting(false);
        setSubmitStatus('error');
        setStatusMessage(
          web3Data.message ||
            'Email gateway encountered an issue. You can message Rupesh directly via WhatsApp below.'
        );
        showToast(web3Data.message || 'Failed to dispatch message.');
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setStatusMessage('Network error dispatching message. You can message Rupesh directly via WhatsApp below.');
      showToast('Could not reach transmission server.');
    }
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
          className="glass-panel contact-form-panel"
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

            {/* Status Feedback Notification */}
            {submitStatus === 'success' && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#10b981',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                }}
              >
                <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                <span>{statusMessage}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  maxWidth: '100%',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ wordBreak: 'break-word', overflowWrap: 'anywhere' }}>{statusMessage}</span>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  Tip: You can also message Rupesh directly using the green WhatsApp button below.
                </div>
              </div>
            )}


            {/* Dual Action Dispatch Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
              <button
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => playSound('hover')}
                className="btn-cyber-primary interactive"
                style={{ width: '100%' }}
              >
                {isSubmitting ? (
                  <span>Dispatching Transmission...</span>
                ) : (
                  <>
                    <span>Send Message to Email</span>
                    <Send size={16} />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleWhatsAppSend}
                onMouseEnter={() => playSound('hover')}
                className="interactive"
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid #25d366',
                  color: '#25d366',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                }}
              >
                <MessageCircle size={18} />
                <span>Send via WhatsApp (+91 94663 27537)</span>
              </button>

              {/* Rate Limit Security Protocol Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  marginTop: '4px',
                  color: 'var(--text-dim)',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  textAlign: 'center',
                }}
              >
                <ShieldCheck size={13} style={{ color: 'var(--primary)' }} />
                <span>Security Protocol: Limit 1 transmission per person/IP every 5 days</span>
              </div>
            </div>
          </form>
        </div>
      </div>



      <style jsx>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .contact-card {
            padding: 16px 12px !important;
          }
          .contact-form-panel {
            padding: 20px 16px !important;
          }
        }
        @media (max-width: 420px) {
          .contact-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .contact-card > div:last-child {
            width: 100% !important;
            margin-top: 8px !important;
          }
          .contact-card button {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}

