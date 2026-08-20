'use client';

import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import {
  X,
  User,
  GraduationCap,
  Sparkles,
  Layers,
  Palette,
  Download,
  Upload,
  RotateCcw,
  Plus,
  Trash2,
  Save,
  Check,
  Globe,
  Github,
  Instagram,
  Volume2,
  Sliders,
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  KeyRound,
  LogOut,
} from 'lucide-react';
import { EducationItem, SkillItem, ProjectItem } from '@/data/defaultData';

const REQUIRED_PASSKEY = 'AEZAKAMi@01';
const AUTH_SESSION_KEY = 'rupesh_admin_authenticated';

export default function AdminPanelModal() {
  const {
    data,
    isAdminOpen,
    setIsAdminOpen,
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
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    playSound,
    showToast,
  } = usePortfolio();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'education' | 'skills' | 'projects' | 'theme' | 'backup'>('profile');

  // Check existing session auth on mount
  useEffect(() => {
    try {
      const isAuth = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
      setIsAuthenticated(isAuth);
    } catch {
      // Ignore sessionStorage restriction
    }
  }, []);

  // Local form states
  const [personalForm, setPersonalForm] = useState(data.personal);

  useEffect(() => {
    setPersonalForm(data.personal);
  }, [data.personal]);

  const [newEdu, setNewEdu] = useState<Omit<EducationItem, 'id'>>({
    degree: '',
    institution: '',
    location: '',
    period: '',
    grade: '',
    description: '',
    highlights: [],
    iconType: 'college',
  });
  const [newSkill, setNewSkill] = useState<Omit<SkillItem, 'id'>>({
    name: '',
    category: 'Frontend',
    level: 85,
    featured: true,
  });
  const [newProject, setNewProject] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    tagline: '',
    description: '',
    tags: ['Next.js', 'TypeScript'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/er-rupesh7/',
    liveUrl: '',
    featured: true,
    imageGradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
  });

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === REQUIRED_PASSKEY) {
      setIsAuthenticated(true);
      setAuthError(null);
      setPasswordInput('');
      try {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      } catch {}
      playSound('success');
      showToast('Security clearance verified! Welcome Rupesh.');
    } else {
      setAuthError('ACCESS DENIED // Invalid security passkey');
      playSound('click');
      showToast('Incorrect password. Access denied.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch {}
    playSound('warp');
    showToast('Admin session locked');
  };

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    updatePersonal(personalForm);
    playSound('success');
  };

  const handleCreateEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!newEdu.degree || !newEdu.institution) {
      showToast('Please provide degree and institution');
      return;
    }
    addEducation(newEdu);
    playSound('success');
    setNewEdu({
      degree: '',
      institution: '',
      location: '',
      period: '',
      grade: '',
      description: '',
      highlights: [],
      iconType: 'college',
    });
  };

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!newSkill.name) {
      showToast('Skill name required');
      return;
    }
    addSkill(newSkill);
    playSound('success');
    setNewSkill({ name: '', category: 'Frontend', level: 85, featured: true });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    if (!newProject.title) {
      showToast('Project title required');
      return;
    }
    addProject(newProject);
    playSound('success');
    setNewProject({
      title: '',
      tagline: '',
      description: '',
      tags: ['Next.js', 'TypeScript'],
      category: 'Full-Stack',
      githubUrl: 'https://github.com/er-rupesh7/',
      liveUrl: '',
      featured: true,
      imageGradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAuthenticated) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importConfigJson(content);
        if (success) {
          playSound('success');
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: 'rgba(3, 5, 10, 0.9)',
        backdropFilter: 'blur(20px)',
      }}
      onClick={() => setIsAdminOpen(false)}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: isAuthenticated ? '1000px' : '480px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '24px',
          backgroundColor: 'rgba(9, 13, 25, 0.98)',
          border: '1px solid var(--border-glass-hover)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9), 0 0 40px var(--primary-glow)',
          overflow: 'hidden',
          transition: 'max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '20px 28px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: isAuthenticated ? 'var(--primary)' : 'rgba(239, 68, 68, 0.2)',
                border: `1px solid ${isAuthenticated ? 'var(--primary)' : '#ef4444'}`,
                color: isAuthenticated ? '#000000' : '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
              }}
            >
              {isAuthenticated ? <Unlock size={18} /> : <Lock size={18} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                Rupesh&apos;s Command Center
              </h2>
              <p style={{ fontSize: '0.78rem', color: isAuthenticated ? 'var(--primary)' : '#ef4444', fontFamily: 'var(--font-mono)' }}>
                {isAuthenticated ? 'SECURITY CLEARANCE: LEVEL 5 (UNLOCKED)' : 'SECURITY GATE: AUTHENTICATION REQUIRED'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                title="Lock Session"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  color: '#ef4444',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={13} />
                <span>Lock</span>
              </button>
            )}

            <button
              onClick={() => {
                playSound('click');
                setIsAdminOpen(false);
              }}
              title="Close Panel"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* SECURITY AUTHENTICATION SCREEN */}
        {!isAuthenticated ? (
          <div style={{ padding: '36px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  margin: '0 auto 16px',
                  borderRadius: '20px',
                  background: 'rgba(239, 68, 68, 0.12)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  boxShadow: '0 0 25px rgba(239, 68, 68, 0.3)',
                }}
              >
                <ShieldAlert size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
                Restricted Access Portal
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                Enter the master encryption passkey to edit portfolio data, academic records, skills, and projects.
              </p>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="admin-label">MASTER PASSKEY</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    autoFocus
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (authError) setAuthError(null);
                    }}
                    placeholder="Enter security passkey..."
                    className="admin-input"
                    style={{
                      paddingLeft: '40px',
                      borderColor: authError ? '#ef4444' : undefined,
                    }}
                  />
                  <KeyRound
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '12px',
                      color: authError ? '#ef4444' : 'var(--primary)',
                    }}
                  />
                </div>
                {authError && (
                  <div
                    style={{
                      color: '#ef4444',
                      fontSize: '0.78rem',
                      fontFamily: 'var(--font-mono)',
                      marginTop: '6px',
                    }}
                  >
                    {authError}
                  </div>
                )}
              </div>

              <button type="submit" className="btn-cyber-primary" style={{ width: '100%' }}>
                <ShieldCheck size={18} />
                <span>Verify &amp; Unlock Panel</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED CMS CONTROLS */
          <>
            {/* Tab Switcher */}
            <div
              style={{
                display: 'flex',
                gap: '6px',
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                overflowX: 'auto',
              }}
            >
              {[
                { id: 'profile', label: 'Personal & Socials', icon: User },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'skills', label: 'Skills', icon: Sparkles },
                { id: 'projects', label: 'Projects', icon: Layers },
                { id: 'theme', label: 'Theme & 3D', icon: Palette },
                { id: 'backup', label: 'JSON Backup', icon: Download },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playSound('tab');
                      setActiveTab(tab.id as any);
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#000000' : '#ffffff',
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      border: `1px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <tab.icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content Body */}
            <div
              style={{
                padding: '28px',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSavePersonal} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="admin-grid">
                    <div>
                      <label className="admin-label">FULL NAME</label>
                      <input
                        type="text"
                        value={personalForm.name}
                        onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="admin-label">HEADLINE / TITLE</label>
                      <input
                        type="text"
                        value={personalForm.headline}
                        onChange={(e) => setPersonalForm({ ...personalForm, headline: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="admin-label">INSTAGRAM HANDLE</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          value={personalForm.instagram}
                          onChange={(e) => setPersonalForm({ ...personalForm, instagram: e.target.value })}
                          className="admin-input"
                          style={{ paddingLeft: '36px' }}
                        />
                        <Instagram size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#ec4899' }} />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">GITHUB USERNAME</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type="text"
                          value={personalForm.github}
                          onChange={(e) => setPersonalForm({ ...personalForm, github: e.target.value })}
                          className="admin-input"
                          style={{ paddingLeft: '36px' }}
                        />
                        <Github size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--primary)' }} />
                      </div>
                    </div>
                    <div>
                      <label className="admin-label">EMAIL ADDRESS (VERIFIED)</label>
                      <input
                        type="email"
                        value={personalForm.email}
                        onChange={(e) => setPersonalForm({ ...personalForm, email: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <div>
                      <label className="admin-label">PHONE NUMBER</label>
                      <input
                        type="text"
                        value={personalForm.phone}
                        onChange={(e) => setPersonalForm({ ...personalForm, phone: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="admin-label">LOCATION &amp; REGION</label>
                    <input
                      type="text"
                      value={personalForm.location}
                      onChange={(e) => setPersonalForm({ ...personalForm, location: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="admin-label">AVAILABILITY STATUS</label>
                    <input
                      type="text"
                      value={personalForm.status}
                      onChange={(e) => setPersonalForm({ ...personalForm, status: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="admin-label">PRIMARY BIO SUMMARY</label>
                    <textarea
                      rows={3}
                      value={personalForm.bio}
                      onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div>
                    <label className="admin-label">SUB-BIO &amp; PHILOSOPHY</label>
                    <textarea
                      rows={2}
                      value={personalForm.subBio}
                      onChange={(e) => setPersonalForm({ ...personalForm, subBio: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <button type="submit" className="btn-cyber-primary" style={{ width: 'fit-content' }}>
                    <Save size={16} />
                    <span>Save Profile Changes</span>
                  </button>
                </form>
              )}

              {/* EDUCATION TAB */}
              {activeTab === 'education' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Educational Milestones</h3>
                    {data.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="glass-card"
                        style={{
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{edu.degree}</div>
                          <div style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>
                            {edu.institution} • {edu.location}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteEducation(edu.id)}
                          title="Delete entry"
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Milestone */}
                  <form
                    onSubmit={handleCreateEducation}
                    className="glass-panel"
                    style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
                  >
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>
                      + ADD NEW EDUCATION MILESTONE
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="admin-grid">
                      <input
                        type="text"
                        placeholder="Degree (e.g. B.Tech Computer Science)"
                        value={newEdu.degree}
                        onChange={(e) => setNewEdu({ ...newEdu, degree: e.target.value })}
                        className="admin-input"
                      />
                      <input
                        type="text"
                        placeholder="Institution (e.g. CDLSIET)"
                        value={newEdu.institution}
                        onChange={(e) => setNewEdu({ ...newEdu, institution: e.target.value })}
                        className="admin-input"
                      />
                      <input
                        type="text"
                        placeholder="Location (e.g. Panniwala Mota, Sirsa, Haryana)"
                        value={newEdu.location}
                        onChange={(e) => setNewEdu({ ...newEdu, location: e.target.value })}
                        className="admin-input"
                      />
                      <input
                        type="text"
                        placeholder="Grade / Distinction"
                        value={newEdu.grade}
                        onChange={(e) => setNewEdu({ ...newEdu, grade: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Detailed description of courses & focus areas..."
                      value={newEdu.description}
                      onChange={(e) => setNewEdu({ ...newEdu, description: e.target.value })}
                      className="admin-input"
                    />
                    <button type="submit" className="btn-cyber-primary" style={{ width: 'fit-content' }}>
                      <Plus size={16} />
                      <span>Add Education Milestone</span>
                    </button>
                  </form>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <form
                    onSubmit={handleCreateSkill}
                    className="glass-panel"
                    style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}
                  >
                    <input
                      type="text"
                      placeholder="Skill Name (e.g. Docker, Rust)"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="admin-input"
                      style={{ flex: 1, minWidth: '160px' }}
                    />
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                      className="admin-input"
                      style={{ width: '180px' }}
                    >
                      <option value="Languages">Languages</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database & Cloud">Database &amp; Cloud</option>
                      <option value="Tools & AI">Tools &amp; AI</option>
                    </select>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 80 })}
                      className="admin-input"
                      style={{ width: '90px' }}
                    />
                    <button type="submit" className="btn-cyber-primary">
                      <Plus size={16} />
                      <span>Add Skill</span>
                    </button>
                  </form>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                    {data.skills.map((skill) => (
                      <div
                        key={skill.id}
                        className="glass-card"
                        style={{
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{skill.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            {skill.category} • {skill.level}%
                          </div>
                        </div>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <form
                    onSubmit={handleCreateProject}
                    className="glass-panel"
                    style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
                  >
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}>
                      + ADD NEW PROJECT
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="admin-grid">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="admin-input"
                      />
                      <input
                        type="text"
                        placeholder="Tagline / Short Summary"
                        value={newProject.tagline}
                        onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                        className="admin-input"
                      />
                      <input
                        type="text"
                        placeholder="GitHub Repo URL"
                        value={newProject.githubUrl}
                        onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                        className="admin-input"
                      />
                      <input
                        type="text"
                        placeholder="Live Demo URL (optional)"
                        value={newProject.liveUrl}
                        onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                        className="admin-input"
                      />
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Project description..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="admin-input"
                    />
                    <button type="submit" className="btn-cyber-primary" style={{ width: 'fit-content' }}>
                      <Plus size={16} />
                      <span>Add Project</span>
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="glass-card"
                        style={{
                          padding: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '16px',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, color: '#ffffff' }}>{proj.title}</div>
                          <div style={{ color: 'var(--primary)', fontSize: '0.82rem' }}>
                            {proj.category} • {proj.githubUrl}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          style={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            color: '#ef4444',
                            padding: '8px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* THEME & 3D SETTINGS TAB */}
              {activeTab === 'theme' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <label className="admin-label">NEON COLOR THEME ACCENT</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
                      {[
                        { id: 'cyan', label: 'Cyber Cyan', color: '#00f0ff' },
                        { id: 'purple', label: 'Neon Purple', color: '#c084fc' },
                        { id: 'emerald', label: 'Emerald Matrix', color: '#10b981' },
                        { id: 'solar', label: 'Solar Gold', color: '#f59e0b' },
                        { id: 'crimson', label: 'Crimson Fire', color: '#ff0055' },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            playSound('click');
                            updateThemeConfig({ primaryTheme: t.id as any });
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 18px',
                            borderRadius: '12px',
                            background: data.themeConfig.primaryTheme === t.id ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                            border: `2px solid ${data.themeConfig.primaryTheme === t.id ? t.color : 'rgba(255, 255, 255, 0.1)'}`,
                            color: '#ffffff',
                            cursor: 'pointer',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 600,
                          }}
                        >
                          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: t.color }} />
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="admin-label">
                      3D COSMOS PARTICLE DENSITY: {data.themeConfig.particlesCount}
                    </label>
                    <input
                      type="range"
                      min={500}
                      max={4000}
                      step={100}
                      value={data.themeConfig.particlesCount}
                      onChange={(e) => updateThemeConfig({ particlesCount: parseInt(e.target.value) })}
                      style={{ width: '100%', marginTop: '8px' }}
                    />
                  </div>

                  <div>
                    <label className="admin-label">CYBER AUDIO FX</label>
                    <div style={{ marginTop: '8px' }}>
                      <button
                        onClick={() => updateThemeConfig({ soundEnabled: !data.themeConfig.soundEnabled })}
                        className="btn-cyber-outline"
                      >
                        <Volume2 size={18} />
                        <span>{data.themeConfig.soundEnabled ? 'Audio FX Enabled' : 'Audio FX Disabled'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* BACKUP & SYNC TAB */}
              {activeTab === 'backup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="glass-panel" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                      Export Configuration to JSON
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      Download your customized portfolio settings, skills, and projects as a standalone JSON file to back up or use across environments.
                    </p>
                    <button onClick={exportConfigJson} className="btn-cyber-primary">
                      <Download size={16} />
                      <span>Download portfolio-config.json</span>
                    </button>
                  </div>

                  <div className="glass-panel" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                      Import Configuration JSON
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      Upload a previously saved JSON config to instantly restore all profile data.
                    </p>
                    <label className="btn-cyber-outline" style={{ display: 'inline-flex', cursor: 'pointer' }}>
                      <Upload size={16} />
                      <span>Upload JSON File</span>
                      <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  <div className="glass-panel" style={{ padding: '24px', borderLeft: '4px solid #ef4444' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: '#ef4444' }}>
                      Reset All to Defaults
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
                      Reset all changes back to Rupesh Kumar&apos;s default state (CDLSIET, Maharaja Agarsain, Shah Satnam Ji).
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all portfolio data to default?')) {
                          resetToDefaults();
                        }
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '10px',
                        background: 'rgba(239, 68, 68, 0.2)',
                        border: '1px solid #ef4444',
                        color: '#ef4444',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <RotateCcw size={16} />
                      <span>Reset to Defaults</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .admin-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--text-dim);
          margin-bottom: 6px;
          letter-spacing: 0.05em;
        }
        .admin-input {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-family: var(--font-body);
          font-size: 0.9rem;
          outline: none;
        }
        .admin-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 10px var(--primary-glow);
        }
        @media (max-width: 768px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .admin-input {
            padding: 8px 12px !important;
            font-size: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
}

