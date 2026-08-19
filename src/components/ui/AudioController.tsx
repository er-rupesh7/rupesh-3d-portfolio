'use client';

import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

export default function AudioController() {
  const { data, updateThemeConfig, playSound } = usePortfolio();
  const enabled = data.themeConfig.soundEnabled;

  const toggleSound = () => {
    const nextState = !enabled;
    updateThemeConfig({ soundEnabled: nextState });
    if (nextState) {
      setTimeout(() => playSound('warp'), 50);
    }
  };

  return (
    <button
      onClick={toggleSound}
      title={enabled ? 'Mute Cyber Audio FX' : 'Enable Cyber Audio FX'}
      aria-label={enabled ? 'Mute Audio FX' : 'Enable Audio FX'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: enabled ? 'var(--primary-muted)' : 'rgba(255, 255, 255, 0.04)',
        border: `1px solid ${enabled ? 'var(--primary)' : 'rgba(255, 255, 255, 0.1)'}`,
        color: enabled ? 'var(--primary)' : 'var(--text-muted)',
        cursor: 'pointer',
        transition: 'var(--transition-smooth)',
      }}
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
}
