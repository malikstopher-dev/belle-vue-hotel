'use client';

import React, { useState, useRef, useEffect, useCallback, Suspense, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { siteConfig } from '@/config/site';

/* ─────────────────────────── Data ─────────────────────────── */

const categories = ['All', 'Rooms', 'Restaurant', 'Pool', 'Events', 'Lobby'] as const;
type Category = (typeof categories)[number];

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: Exclude<Category, 'All'>;
  aspect: string;
  span: string;
}

const galleryImages: GalleryImage[] = [
  { id: 1, src: '/images/rooms/standard-1.jpg', alt: 'Standard Room - Elegant Comfort', category: 'Rooms', aspect: 'aspect-[4/3]', span: 'md:col-span-1 md:row-span-1' },
  { id: 2, src: '/images/rooms/standard-2.jpg', alt: 'Standard Room - City View', category: 'Rooms', aspect: 'aspect-[3/4]', span: 'md:col-span-1 md:row-span-2' },
  { id: 3, src: '/images/rooms/deluxe-1.jpg', alt: 'Deluxe Room - Premium Suite', category: 'Rooms', aspect: 'aspect-square', span: 'md:col-span-1 md:row-span-1' },
  { id: 4, src: '/images/rooms/deluxe-2.jpg', alt: 'Deluxe Room - Ocean Breeze', category: 'Rooms', aspect: 'aspect-[16/9]', span: 'md:col-span-2 md:row-span-1' },
  { id: 5, src: '/images/rooms/executive-1.jpg', alt: 'Executive Suite - Grand', category: 'Rooms', aspect: 'aspect-[4/3]', span: 'md:col-span-1 md:row-span-1' },
  { id: 6, src: '/images/rooms/junior-suite-1.jpg', alt: 'Junior Suite - Luxurious', category: 'Rooms', aspect: 'aspect-[3/4]', span: 'md:col-span-1 md:row-span-2' },
  { id: 7, src: '/images/restaurant/dining-1.jpg', alt: 'Fine Dining Experience', category: 'Restaurant', aspect: 'aspect-[16/9]', span: 'md:col-span-2 md:row-span-1' },
  { id: 8, src: '/images/restaurant/terrace-1.jpg', alt: 'Terrace Dining Under Stars', category: 'Restaurant', aspect: 'aspect-[4/3]', span: 'md:col-span-1 md:row-span-1' },
  { id: 9, src: '/images/pool/pool-1.jpg', alt: 'Infinity Pool at Sunset', category: 'Pool', aspect: 'aspect-[16/9]', span: 'md:col-span-2 md:row-span-1' },
  { id: 10, src: '/images/lobby/lobby-1.jpg', alt: 'Grand Lobby Entrance', category: 'Lobby', aspect: 'aspect-[4/3]', span: 'md:col-span-1 md:row-span-1' },
  { id: 11, src: '/images/exterior/exterior-1.jpg', alt: 'Hotel Belle Vie Exterior', category: 'Lobby', aspect: 'aspect-[3/4]', span: 'md:col-span-1 md:row-span-2' },
  { id: 12, src: '/images/experiences/sunset-cruise.jpg', alt: 'Sunset Cruise Experience', category: 'Events', aspect: 'aspect-square', span: 'md:col-span-1 md:row-span-1' },
  { id: 13, src: '/images/experiences/city-tour.jpg', alt: 'Kinshasa City Tour', category: 'Events', aspect: 'aspect-[4/3]', span: 'md:col-span-1 md:row-span-1' },
  { id: 14, src: '/images/rooms/standard-1.jpg', alt: 'Standard Room Panorama', category: 'Rooms', aspect: 'aspect-[16/9]', span: 'md:col-span-2 md:row-span-1' },
  { id: 15, src: '/images/restaurant/dining-1.jpg', alt: 'Chef\'s Table Experience', category: 'Restaurant', aspect: 'aspect-[3/4]', span: 'md:col-span-1 md:row-span-2' },
  { id: 16, src: '/images/pool/pool-1.jpg', alt: 'Poolside Lounge', category: 'Pool', aspect: 'aspect-square', span: 'md:col-span-1 md:row-span-1' },
];

const stats = [
  { label: 'Photos', value: '120+', icon: '📸' },
  { label: 'Categories', value: '6', icon: '🏷️' },
  { label: '360° Views', value: '360°', icon: '🔄' },
];

/* ─────────────────────────── Gold Particles ─────────────────────────── */

function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.1,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += (Math.random() - 0.5) * 0.02;
        p.opacity = Math.max(0.1, Math.min(0.8, p.opacity));

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity * 0.15})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ─────────────────────────── 3D Gallery Scene ─────────────────────────── */

function FloatingFrame({ position, rotation, index }: { position: [number, number, number]; rotation: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.15 + index * 0.5;
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.08;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + index * 0.7) * 0.15;
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.15 + index * 0.5;
      edgesRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.08;
      edgesRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + index * 0.7) * 0.15;
    }
  });

  const frameGeometry = useMemo(() => {
    const w = 1.2 + (index % 3) * 0.3;
    const h = 0.8 + (index % 2) * 0.2;
    const shape = new THREE.Shape();
    shape.moveTo(-w / 2, -h / 2);
    shape.lineTo(w / 2, -h / 2);
    shape.lineTo(w / 2, h / 2);
    shape.lineTo(-w / 2, h / 2);
    shape.lineTo(-w / 2, -h / 2);

    const hole = new THREE.Path();
    const inset = 0.06;
    hole.moveTo(-w / 2 + inset, -h / 2 + inset);
    hole.lineTo(w / 2 - inset, -h / 2 + inset);
    hole.lineTo(w / 2 - inset, h / 2 - inset);
    hole.lineTo(-w / 2 + inset, h / 2 - inset);
    hole.lineTo(-w / 2 + inset, -h / 2 + inset);
    shape.holes.push(hole);

    const points = shape.getPoints(64);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [index]);

  const edgesGeometry = useMemo(() => {
    const w = 1.2 + (index % 3) * 0.3;
    const h = 0.8 + (index % 2) * 0.2;
    const outer = new THREE.BoxGeometry(w, h, 0.02);
    const inner = new THREE.BoxGeometry(w - 0.12, h - 0.12, 0.03);
    return new THREE.EdgesGeometry(outer);
  }, [index]);

  return (
    <Float speed={0.8 + index * 0.1} rotationIntensity={0.15} floatIntensity={0.2}>
      <group ref={meshRef as any} position={position} rotation={rotation}>
        <mesh>
          <planeGeometry args={[1.2 + (index % 3) * 0.3, 0.8 + (index % 2) * 0.2]} />
          <meshStandardMaterial
            color="#0A0A0A"
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments ref={edgesRef as any} geometry={edgesGeometry}>
          <lineBasicMaterial color="#C9A84C" transparent opacity={0.6} />
        </lineSegments>
      </group>
    </Float>
  );
}

function GalleryScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const frames = useMemo(() => [
    { position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
    { position: [2.2, 0.5, -1] as [number, number, number], rotation: [0.1, 0.4, 0.05] as [number, number, number] },
    { position: [-2, -0.3, -0.5] as [number, number, number], rotation: [-0.05, -0.3, -0.03] as [number, number, number] },
    { position: [1, -0.8, -2] as [number, number, number], rotation: [0.08, 0.6, 0.1] as [number, number, number] },
    { position: [-1.5, 0.7, -1.5] as [number, number, number], rotation: [-0.1, -0.5, 0.05] as [number, number, number] },
    { position: [0.5, 0.3, -3] as [number, number, number], rotation: [0.05, 0.2, -0.05] as [number, number, number] },
    { position: [-0.8, -0.5, -2.5] as [number, number, number], rotation: [-0.08, 0.3, 0.08] as [number, number, number] },
    { position: [1.8, -0.2, -1.8] as [number, number, number], rotation: [0.12, -0.4, -0.06] as [number, number, number] },
  ], []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-3, 3, 3]} intensity={0.4} color="#C9A84C" />
      <pointLight position={[3, -3, 3]} intensity={0.2} color="#E8C4C4" />
      {frames.map((frame, i) => (
        <FloatingFrame key={i} position={frame.position} rotation={frame.rotation} index={i} />
      ))}
      <Environment preset="studio" />
    </group>
  );
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
        <span className="text-xs text-gold-500/60 tracking-widest uppercase">Loading 3D Experience</span>
      </div>
    </div>
  );
}

/* ─────────────────────────── Lightbox ─────────────────────────── */

interface LightboxProps {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ image, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative max-w-5xl w-full mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <p className="text-cream text-lg md:text-xl font-display">{image.alt}</p>
            <p className="text-gold-500/80 text-sm mt-1 tracking-wider uppercase">{image.category}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 md:top-0 md:right-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cream hover:bg-white/20 hover:border-gold-500/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cream hover:bg-white/20 hover:border-gold-500/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cream hover:bg-white/20 hover:border-gold-500/50 transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────── Counter ─────────────────────────── */

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─────────────────────────── Page ─────────────────────────── */

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, 80]);

  const filteredImages = useMemo(() =>
    activeCategory === 'All'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
  }, [filteredImages.length]);
  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
  }, [filteredImages.length]);

  return (
    <main className="relative bg-luxury-black min-h-screen overflow-hidden">
      {/* ── Back to Home ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link href="/">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 hover:border-gold-500/40 transition-all duration-500 group">
            <svg className="w-4 h-4 text-gold-500 group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm text-cream/80 tracking-wider uppercase font-light group-hover:text-gold-500 transition-colors duration-300">
              Home
            </span>
          </div>
        </Link>
      </motion.div>

      {/* ── Brand Badge ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="fixed top-6 right-6 z-50 hidden md:block"
      >
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          <div className="w-6 h-6 border border-gold-500/50 rotate-45 flex items-center justify-center">
            <span className="text-[8px] text-gold-500 font-display font-bold -rotate-45">BV</span>
          </div>
          <span className="text-xs text-cream/60 tracking-widest uppercase">{siteConfig.name}</span>
        </div>
      </motion.div>

      {/* ── Hero Section ── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <GoldParticles />

        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-black/60 to-luxury-black" />

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="inline-block mb-6 px-5 py-2 rounded-full text-[11px] font-medium tracking-[0.3em] uppercase bg-gold-500/10 text-gold-400 border border-gold-500/20">
              Visual Stories
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium text-cream leading-[0.9] tracking-tight"
          >
            <span className="block">Visual</span>
            <span className="block mt-2 bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
              Stories
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 text-lg md:text-xl text-luxury-silver max-w-xl mx-auto font-light leading-relaxed"
          >
            A curated collection of moments that define luxury at Hotel Belle Vie Kinshasa
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex items-center justify-center gap-2 text-gold-500/60"
          >
            <span className="text-xs tracking-[0.3em] uppercase">Scroll to Explore</span>
            <motion.svg
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent" />
      </motion.section>

      {/* ── 3D Gallery Scene ── */}
      <section ref={threeRef} className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              style={{ background: 'transparent' }}
            >
              <GalleryScene />
            </Canvas>
          </Suspense>
        </div>

        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-luxury-black via-transparent to-luxury-black" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <p className="text-sm text-gold-500/50 tracking-[0.4em] uppercase mb-3">Immersive Experience</p>
            <h2 className="font-display text-3xl md:text-5xl text-cream/90 font-medium">
              360° Gallery
            </h2>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section ref={statsRef} className="relative py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <GlassCard variant="subtle" padding="md" className="text-center group">
                  <div className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-gold-500 mb-2">
                    {stat.label === 'Photos' && <AnimatedCounter target={120} suffix="+" />}
                    {stat.label === 'Categories' && <AnimatedCounter target={6} />}
                    {stat.label === '360° Views' && '360°'}
                  </div>
                  <p className="text-xs md:text-sm text-luxury-silver tracking-wider uppercase">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge="Collection"
            title="Our Gallery"
            subtitle="Every corner tells a story of elegance and refinement"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-16">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-5 md:px-7 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-500 ${
                  activeCategory === category
                    ? 'bg-gold-500 text-black shadow-gold'
                    : 'bg-white/5 text-cream/60 hover:bg-white/10 border border-white/10 hover:border-gold-500/30'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gold-500 rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="break-inside-avoid group cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className={`relative ${image.aspect} rounded-xl overflow-hidden border border-white/5 hover:border-gold-500/30 transition-all duration-500`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-cream text-sm font-medium truncate">{image.alt}</p>
                      <p className="text-gold-500/70 text-[10px] tracking-widest uppercase mt-1">{image.category}</p>
                    </div>

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section ref={ctaRef} className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-luxury-charcoal/50 to-luxury-black" />
        <GoldParticles />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20">
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span className="text-xs text-gold-500 tracking-widest uppercase">Follow Our Journey</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream font-medium leading-tight">
              Follow Us on{' '}
              <span className="bg-gradient-to-r from-gold-400 via-gold-300 to-gold-500 bg-clip-text text-transparent">
                Instagram
              </span>
            </h2>

            <p className="mt-6 text-lg text-luxury-silver max-w-2xl mx-auto font-light">
              Discover daily moments of luxury, behind-the-scenes glimpses, and the stories that make Hotel Belle Vie unforgettable.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="lg">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Follow @belleviehotel
                  </span>
                </Button>
              </a>
              <Link href="/">
                <Button variant="luxury" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative bg-luxury-dark border-t border-white/5">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative">
                  <div className="w-10 h-10 border border-gold-500/50 rotate-45 group-hover:border-gold-500 transition-colors duration-500" />
                  <div className="absolute inset-1 border border-gold-500/30 rotate-45 group-hover:border-gold-500/50 transition-colors duration-500" />
                  <span className="absolute inset-0 flex items-center justify-center font-display text-gold-500 text-lg font-bold">
                    BV
                  </span>
                </div>
                <div>
                  <div className="font-display text-xl text-cream tracking-wider">{siteConfig.name}</div>
                  <div className="text-[10px] text-gold-500/70 tracking-[0.3em] uppercase">Kinshasa</div>
                </div>
              </Link>
              <p className="text-sm text-luxury-silver leading-relaxed mb-6">
                Where luxury meets serenity. An intimate sanctuary in the heart of Kinshasa, crafting unforgettable moments since 2020.
              </p>
              <div className="flex gap-3">
                {[siteConfig.social.instagram, siteConfig.social.facebook, siteConfig.social.twitter, siteConfig.social.whatsapp].map((href, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-luxury-silver hover:text-gold-500 hover:border-gold-500/50 transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      {i === 0 && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />}
                      {i === 1 && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                      {i === 2 && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                      {i === 3 && <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cream tracking-wider uppercase mb-6">Hotel</h3>
              <ul className="space-y-3">
                {['About Us', 'Rooms & Suites', 'Dining', 'Spa & Wellness', 'Gallery'].map((label) => (
                  <li key={label}>
                    <Link href="/" className="text-sm text-luxury-silver hover:text-gold-500 transition-colors duration-300">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cream tracking-wider uppercase mb-6">Services</h3>
              <ul className="space-y-3">
                {['Airport Transfer', 'City Tours', 'Events & Meetings', 'Concierge', 'Business Center'].map((label) => (
                  <li key={label}>
                    <Link href="/" className="text-sm text-luxury-silver hover:text-gold-500 transition-colors duration-300">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-cream tracking-wider uppercase mb-6">Contact</h3>
              <ul className="space-y-3 text-sm text-luxury-silver">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 text-gold-500/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{siteConfig.contact.address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-500/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{siteConfig.contact.phone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gold-500/60 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{siteConfig.contact.email}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-luxury-silver/60">© {new Date().getFullYear()} Belle Vie Hotel. All rights reserved.</p>
              <div className="flex gap-6">
                {['Privacy Policy', 'Terms of Service', 'Cancellation Policy'].map((label) => (
                  <Link key={label} href="/" className="text-xs text-luxury-silver/60 hover:text-gold-500 transition-colors duration-300">{label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredImages[lightboxIndex] && (
          <Lightbox
            image={filteredImages[lightboxIndex]}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
