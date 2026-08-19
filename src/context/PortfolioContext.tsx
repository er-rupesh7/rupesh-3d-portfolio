'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PortfolioData, initialPortfolioData, EducationItem, SkillItem, ProjectItem } from '../data/defaultData';

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonal: (personal: Partial<PortfolioData['personal']>) => void;
  updateStats: (stats: Partial<PortfolioData['stats']>) => void;
  updateThemeConfig: (config: Partial<PortfolioData['themeConfig']>) => void;
  // Education CRUD
  addEducation: (item: Omit<EducationItem, 'id'>) => void;
  updateEducation: (id: string, item: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  // Skills CRUD
  addSkill: (item: Omit<SkillItem, 'id'>) => void;
  updateSkill: (id: string, item: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  // Projects CRUD
  addProject: (item: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, item: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  // Admin & UI State
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  toggleAdmin: () => void;
  // Utilities
  resetToDefaults: () => void;
  exportConfigJson: () => void;
  importConfigJson: (jsonData: string) => boolean;
  playSound: (type: 'click' | 'hover' | 'success' | 'warp' | 'tab') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = 'rupesh_3d_portfolio_v1_data';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
      }
    } catch (e) {
      console.warn('Failed to parse saved portfolio data:', e);
    }
  }, []);

  // Sync to localStorage and theme root
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      // Update data-theme on html / body
      document.documentElement.setAttribute('data-theme', data.themeConfig.primaryTheme);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [data, isClient]);

  // Keyboard shortcut Ctrl+E / Cmd+E to toggle Admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  const playSound = (type: 'click' | 'hover' | 'success' | 'warp' | 'tab') => {
    if (!data.themeConfig.soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'warp') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.2);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'tab') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const updatePersonal = (personal: Partial<PortfolioData['personal']>) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...personal },
    }));
    showToast('Profile updated successfully');
  };

  const updateStats = (stats: Partial<PortfolioData['stats']>) => {
    setData((prev) => ({
      ...prev,
      stats: { ...prev.stats, ...stats },
    }));
    showToast('Stats updated');
  };

  const updateThemeConfig = (config: Partial<PortfolioData['themeConfig']>) => {
    setData((prev) => ({
      ...prev,
      themeConfig: { ...prev.themeConfig, ...config },
    }));
    showToast('Settings & visual theme updated');
  };

  // Education
  const addEducation = (item: Omit<EducationItem, 'id'>) => {
    const newItem: EducationItem = { ...item, id: `edu-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      education: [newItem, ...prev.education],
    }));
    showToast('Education milestone added');
  };

  const updateEducation = (id: string, item: Partial<EducationItem>) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...item } : edu)),
    }));
    showToast('Education entry updated');
  };

  const deleteEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
    showToast('Education entry removed');
  };

  // Skills
  const addSkill = (item: Omit<SkillItem, 'id'>) => {
    const newItem: SkillItem = { ...item, id: `sk-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      skills: [...prev.skills, newItem],
    }));
    showToast('Skill added');
  };

  const updateSkill = (id: string, item: Partial<SkillItem>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...item } : s)),
    }));
    showToast('Skill updated');
  };

  const deleteSkill = (id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
    showToast('Skill removed');
  };

  // Projects
  const addProject = (item: Omit<ProjectItem, 'id'>) => {
    const newItem: ProjectItem = { ...item, id: `proj-${Date.now()}` };
    setData((prev) => ({
      ...prev,
      projects: [newItem, ...prev.projects],
    }));
    showToast('Project added');
  };

  const updateProject = (id: string, item: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...item } : p)),
    }));
    showToast('Project updated');
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    showToast('Project removed');
  };

  const resetToDefaults = () => {
    setData(initialPortfolioData);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    showToast('Reset all data to Rupesh Kumar defaults');
  };

  const exportConfigJson = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rupesh-portfolio-config-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Configuration exported as JSON');
    } catch {
      showToast('Export failed');
    }
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.personal && parsed.education && parsed.skills && parsed.projects) {
        setData(parsed);
        showToast('Configuration imported successfully!');
        return true;
      } else {
        showToast('Invalid JSON structure');
        return false;
      }
    } catch {
      showToast('Invalid JSON file format');
      return false;
    }
  };

  const toggleAdmin = () => {
    setIsAdminOpen((prev) => !prev);
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updatePersonal,
        updateStats,
        updateThemeConfig,
        addEducation,
        updateEducation,
        deleteEducation,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        isAdminOpen,
        setIsAdminOpen,
        toggleAdmin,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        playSound,
        activeSection,
        setActiveSection,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
