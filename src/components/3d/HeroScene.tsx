'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '@/context/PortfolioContext';

interface LeetCodeOrbitData {
  avatarUrl: string | null;
  difficulty: { easy: number; medium: number; hard: number };
  recentAccepted: Array<{ title: string; url: string }>;
}

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = usePortfolio();
  const theme = data.themeConfig.primaryTheme;
  const [leetcode, setLeetcode] = useState<LeetCodeOrbitData | null>(null);

  useEffect(() => {
    let active = true;
    const loadLeetCode = async () => {
      try {
        const response = await fetch('/api/leetcode');
        if (response.ok && active) setLeetcode(await response.json());
      } catch {
        // The existing Three.js core remains available as a visual fallback.
      }
    };
    loadLeetCode();
    const timer = window.setInterval(loadLeetCode, 30 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    const isCompactDevice = window.innerWidth <= 900;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCompactDevice ? 1.25 : 1.75));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Dynamic Theme Color Mapping
    const getThemeColors = () => {
      switch (theme) {
        case 'purple':
          return { primary: 0xc084fc, secondary: 0xec4899, core: 0x8b5cf6 };
        case 'emerald':
          return { primary: 0x10b981, secondary: 0x06b6d4, core: 0x059669 };
        case 'solar':
          return { primary: 0xf59e0b, secondary: 0xef4444, core: 0xd97706 };
        case 'crimson':
          return { primary: 0xff0055, secondary: 0x8b5cf6, core: 0xd90429 };
        case 'cyan':
        default:
          return { primary: 0x00f0ff, secondary: 0x7000ff, core: 0x0ea5e9 };
      }
    };

    const colors = getThemeColors();

    // 1. Central Cyber Core (Icosahedron Wireframe + Glowing Nodes)
    const coreGroup = new THREE.Group();

    // Outer Wireframe
    const icosaGeometry = new THREE.IcosahedronGeometry(5.2, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: colors.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
    coreGroup.add(icosaMesh);

    // Inner Solid Core
    const innerGeom = new THREE.IcosahedronGeometry(3.2, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: colors.core,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerMesh);

    // Orbital Rings
    const ringGeom1 = new THREE.TorusGeometry(7.5, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: colors.secondary, transparent: true, opacity: 0.5 });
    const ringMesh1 = new THREE.Mesh(ringGeom1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh1);

    const ringGeom2 = new THREE.TorusGeometry(9.0, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.35 });
    const ringMesh2 = new THREE.Mesh(ringGeom2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    coreGroup.add(ringMesh2);

    // Orbital Satellite Particles
    const satCount = 40;
    const satGeom = new THREE.BufferGeometry();
    const satPositions = new Float32Array(satCount * 3);
    for (let i = 0; i < satCount; i++) {
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 7.5 + (Math.random() - 0.5) * 0.8;
      satPositions[i * 3] = Math.cos(angle) * radius;
      satPositions[i * 3 + 1] = (Math.sin(angle) * radius) * Math.cos(Math.PI / 3);
      satPositions[i * 3 + 2] = (Math.sin(angle) * radius) * Math.sin(Math.PI / 3);
    }
    satGeom.setAttribute('position', new THREE.BufferAttribute(satPositions, 3));
    const satMat = new THREE.PointsMaterial({
      color: colors.primary,
      size: 0.35,
      transparent: true,
      opacity: 0.9,
    });
    const satellites = new THREE.Points(satGeom, satMat);
    coreGroup.add(satellites);

    // Position Core slightly to the right on desktop, center on mobile
    coreGroup.position.set(window.innerWidth > 900 ? 5.5 : 0, window.innerWidth > 900 ? 0 : -2, 0);
    scene.add(coreGroup);

    // 2. Cosmic Nebula Particle Field
    const configuredParticleCount = data.themeConfig.particlesCount || 2000;
    const particleCount = isCompactDevice
      ? Math.min(configuredParticleCount, 1100)
      : Math.min(configuredParticleCount, 2200);
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(colors.primary);
    const c2 = new THREE.Color(colors.secondary);
    const c3 = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 70;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const mixed = Math.random() < 0.6 ? (Math.random() < 0.5 ? c1 : c2) : c3;
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particleSystem = new THREE.Points(particlesGeom, particlesMat);
    scene.add(particleSystem);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colors.primary, 3, 50);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(colors.secondary, 2, 50);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      targetMouseX = (e.clientX - windowHalfX) * 0.0012;
      targetMouseY = (e.clientY - windowHalfY) * 0.0012;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      if (w > 900) {
        coreGroup.position.set(5.5, 0, 0);
      } else {
        coreGroup.position.set(0, -2, 0);
      }
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let elapsedTime = 0;
    let pageVisible = !document.hidden;
    const onVisibilityChange = () => {
      pageVisible = !document.hidden;
      if (pageVisible) clock.getDelta();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!pageVisible) return;
      elapsedTime += Math.min(clock.getDelta(), 0.05);

      // Smooth Mouse Lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate Core
      coreGroup.rotation.y = elapsedTime * 0.25 + mouseX * 2;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + mouseY * 2;
      coreGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

      // Inner Core Pulse
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.06;
      innerMesh.scale.set(scale, scale, scale);

      // Rings Rotation
      ringMesh1.rotation.z = elapsedTime * 0.4;
      ringMesh2.rotation.z = -elapsedTime * 0.3;
      satellites.rotation.z = elapsedTime * 0.5;

      // Particle Nebula Drift
      particleSystem.rotation.y = -elapsedTime * 0.03 + mouseX * 0.5;
      particleSystem.rotation.x = -mouseY * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      icosaGeometry.dispose();
      icosaMaterial.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      ringGeom1.dispose();
      ringMat1.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      particlesGeom.dispose();
      particlesMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, data.themeConfig.particlesCount]);

  const difficultyStats = leetcode
    ? [
        { label: 'EASY', value: leetcode.difficulty.easy, tone: 'easy' },
        { label: 'MEDIUM', value: leetcode.difficulty.medium, tone: 'medium' },
        { label: 'HARD', value: leetcode.difficulty.hard, tone: 'hard' },
      ]
    : [];

  return (
    <>
      <div
        ref={containerRef}
        className="hero-canvas-container"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      />
      {leetcode && (
        <div className="leetcode-space" aria-hidden="true">
          <div className="neon-orbit orbit-one" />
          <div className="space-avatar">
            {leetcode.avatarUrl ? <img src="/api/leetcode?avatar=1" alt="" /> : <span>3R</span>}
          </div>

          {difficultyStats.map((stat, index) => (
            <div
              key={stat.label}
              className={`space-orbiter difficulty-orbiter ${stat.tone}`}
              style={{ animationDelay: `${index * -7}s` }}
            >
              <span><b>{stat.value}</b>{stat.label}</span>
            </div>
          ))}

          {leetcode.recentAccepted.slice(0, 20).map((problem, index) => {
            // Keep all 20 paths distinct: 28px is four times the previous 7px gap.
            const radius = 652 - index * 28;
            const planeRatios = [0.3, 0.44, 0.6, 0.74, 0.38];
            const planeAngles = [-34, 18, 56, -9, 37];
            const planeRatio = planeRatios[index % planeRatios.length];
            const planeAngle = planeAngles[index % planeAngles.length];
            const orbitStyle = {
              '--question-orbit-radius': `${radius}px`,
              '--question-orbit-y': `${radius * planeRatio}px`,
              '--question-orbit-angle': `${planeAngle}deg`,
              '--question-orbit-duration': `${58 - index * 2.25}s`,
              '--question-orbit-delay': `${index * -3.15}s`,
            } as React.CSSProperties;

            return (
              <React.Fragment key={`${problem.title}-${index}`}>
                <div
                  className={`question-orbit-ring ring-${index % 3}`}
                  style={{
                    width: radius * 2,
                    height: radius * 2 * planeRatio,
                    transform: `translate(-50%, -50%) rotate(${planeAngle}deg)`,
                  }}
                />
                <div className="space-orbiter problem-orbiter" style={orbitStyle}>
                  <span>{problem.title}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .leetcode-space {
          position: absolute;
          left: calc(50% + 12vw);
          top: 50%;
          width: 420px;
          height: 420px;
          transform: translate(-50%, -50%);
          pointer-events: none;
          perspective: 900px;
          filter: saturate(1.15);
        }
        .space-avatar {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 5;
          width: 184px;
          height: 184px;
          padding: 4px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: conic-gradient(from 30deg, #00f0ff, #8b5cf6, #ffbf3f, #00f0ff);
          box-shadow: 0 0 22px var(--primary), 0 0 60px var(--primary-glow), inset 0 0 14px #fff;
          animation: avatar-pulse 3.5s ease-in-out infinite;
        }
        .space-avatar img,
        .space-avatar span {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          object-fit: cover;
          border-radius: 50%;
          background: #080b14;
          color: #fff;
          font: 800 1.2rem var(--font-heading);
        }
        .neon-orbit {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(0, 240, 255, 0.38);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.2), inset 0 0 12px rgba(121, 40, 202, 0.12);
          transform: translate(-50%, -50%) rotateX(66deg) rotateZ(-8deg);
        }
        .orbit-one { width: 270px; height: 270px; }
        .question-orbit-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(0, 240, 255, 0.12);
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(0, 240, 255, 0.12), inset 0 0 5px rgba(0, 240, 255, 0.06);
        }
        .question-orbit-ring.ring-1 { border-color: rgba(139, 92, 246, 0.13); }
        .question-orbit-ring.ring-2 { border-color: rgba(255, 191, 63, 0.11); }
        .space-orbiter {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 4;
          width: 0;
          height: 0;
          animation: orbit-space 21s linear infinite;
        }
        .space-orbiter > span {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 5px 8px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 999px;
          color: #fff;
          background: rgba(5, 9, 18, 0.78);
          backdrop-filter: blur(9px);
          box-shadow: 0 0 12px rgba(0,240,255,.18);
          font: 600 0.58rem var(--font-mono);
          white-space: nowrap;
        }
        .difficulty-orbiter { animation-name: orbit-inner; }
        .difficulty-orbiter > span { transform: translate(-50%, -50%); }
        .difficulty-orbiter b { font-size: .76rem; }
        .difficulty-orbiter.easy > span { color: #5ee9b5; border-color: rgba(52,211,153,.45); }
        .difficulty-orbiter.medium > span { color: #ffd166; border-color: rgba(251,191,36,.45); }
        .difficulty-orbiter.hard > span { color: #ff7b8d; border-color: rgba(248,113,113,.45); }
        .problem-orbiter {
          animation-name: orbit-question;
          animation-duration: var(--question-orbit-duration);
          animation-delay: var(--question-orbit-delay);
        }
        .problem-orbiter > span {
          max-width: 145px;
          overflow: hidden;
          text-overflow: ellipsis;
          transform: translate(-50%, -50%);
          color: rgba(225, 245, 255, .88);
          font-size: .52rem;
        }
        @keyframes orbit-question {
          0% {
            transform: rotate(var(--question-orbit-angle)) translate(var(--question-orbit-radius), 0) rotate(calc(-1 * var(--question-orbit-angle)));
          }
          25% {
            transform: rotate(var(--question-orbit-angle)) translate(0, var(--question-orbit-y)) rotate(calc(-1 * var(--question-orbit-angle)));
          }
          50% {
            transform: rotate(var(--question-orbit-angle)) translate(calc(-1 * var(--question-orbit-radius)), 0) rotate(calc(-1 * var(--question-orbit-angle)));
          }
          75% {
            transform: rotate(var(--question-orbit-angle)) translate(0, calc(-1 * var(--question-orbit-y))) rotate(calc(-1 * var(--question-orbit-angle)));
          }
          100% {
            transform: rotate(var(--question-orbit-angle)) translate(var(--question-orbit-radius), 0) rotate(calc(-1 * var(--question-orbit-angle)));
          }
        }
        @keyframes orbit-inner {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        @keyframes orbit-space {
          from { transform: rotate(0deg) translateX(202px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(202px) rotate(-360deg); }
        }
        @keyframes avatar-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.055); }
        }
        @media (max-width: 900px) {
          .leetcode-space { left: 50%; top: 56%; transform: translate(-50%, -50%) scale(.78); opacity: .72; }
          .problem-orbiter { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .space-orbiter, .space-avatar { animation-play-state: paused; }
        }
      `}</style>
    </>
  );
}
