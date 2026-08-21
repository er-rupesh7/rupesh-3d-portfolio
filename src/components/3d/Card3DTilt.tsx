'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface Card3DTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export default function Card3DTilt({
  children,
  className = '',
  maxTilt = 12,
  scale = 1.02,
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -maxTilt;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * maxTilt;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
      card.style.transition = 'transform 0.1s ease-out';
      if (glareRef.current) {
        glareRef.current.style.opacity = '0.25';
        glareRef.current.style.left = `${x}px`;
        glareRef.current.style.top = `${y}px`;
      }
      frameRef.current = null;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
      }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute w-64 h-64 rounded-full"
          style={{
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.2s ease',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%)',
            mixBlendMode: 'overlay',
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
}
