'use client';

import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import dynamic from 'next/dynamic';
import * as THREE from 'three';

function FloatingDiamond() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={0.8}>
        <octahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#C9A84C"
          roughness={0.1}
          metalness={0.8}
          distort={0.1}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={0.5}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color="#E8C4C4"
          roughness={0.2}
          metalness={0.6}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function FloatingRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
      <mesh ref={meshRef} position={[-2, 0, 0]} scale={0.6}>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <MeshDistortMaterial
          color="#C9A84C"
          roughness={0.1}
          metalness={0.9}
          distort={0.05}
          speed={1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#C9A84C" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#E8C4C4" />
      <FloatingDiamond />
      <FloatingSphere />
      <FloatingRing />
      <Environment preset="studio" />
    </>
  );
}

interface Floating3DSceneProps {
  className?: string;
}

function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
    </div>
  );
}

export function Floating3DScene({ className = '' }: Floating3DSceneProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Suspense fallback={<CanvasLoader />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}