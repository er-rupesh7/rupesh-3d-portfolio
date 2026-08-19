'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = usePortfolio();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 22px',
        borderRadius: '14px',
        backgroundColor: 'rgba(11, 15, 25, 0.92)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--primary)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px var(--primary-glow)',
        color: '#ffffff',
        fontFamily: 'var(--font-heading)',
        fontSize: '0.9rem',
        fontWeight: 500,
        animation: 'slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Sparkles size={18} style={{ color: 'var(--primary)' }} />
      <span>{toastMessage}</span>
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateY(20px) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
