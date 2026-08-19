'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePortfolio } from '@/context/PortfolioContext';

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = usePortfolio();
  const theme = data.themeConfig.primaryTheme;

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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
    const particleCount = data.themeConfig.particlesCount || 2000;
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

    window.addEventListener('mousemove', onMouseMove);

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
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

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

  return (
    <div
      ref={containerRef}
      className="hero-canvas-container"
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
