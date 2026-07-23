'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingTorusKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[0, 0.5, 0]} scale={1.3}>
        <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingSphere({
  position,
  scale,
  speed,
  distort,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.4;
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.z += 0.001 * speed;
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#C9A84C"
          roughness={0.15}
          metalness={0.85}
          distort={distort}
          speed={speed}
          transparent
          opacity={0.7}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function FloatingOctahedron({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.35;
      meshRef.current.rotation.x += 0.004 * speed;
      meshRef.current.rotation.y += 0.002 * speed;
    }
  });

  return (
    <Float speed={speed * 0.6} rotationIntensity={0.5} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.8}
        />
      </mesh>
    </Float>
  );
}

function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0002;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.2;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#C9A84C"
        transparent
        opacity={0.35}
        sizeAttenuation
      />
    </points>
  );
}

function GoldRing({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.5;
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.03, 32, 64]} />
        <meshStandardMaterial
          color="#C9A84C"
          metalness={1}
          roughness={0.05}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  );
}

export function DiningScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 4, 2]} intensity={0.8} color="#C9A84C" distance={12} />
        <pointLight position={[-3, 2, -2]} intensity={0.4} color="#C9A84C" distance={10} />
        <spotLight position={[0, 8, 0]} angle={0.3} penumbra={1} intensity={0.6} color="#C9A84C" />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#E8D5A3" />

        <FloatingTorusKnot />

        <FloatingSphere position={[-3.5, 0.8, -1]} scale={0.7} speed={0.9} distort={0.4} />
        <FloatingSphere position={[3, -0.3, -2]} scale={0.5} speed={1.2} distort={0.5} />
        <FloatingSphere position={[-1.5, -1, 2]} scale={0.6} speed={0.8} distort={0.35} />
        <FloatingSphere position={[4, 1.2, 1]} scale={0.4} speed={1.1} distort={0.45} />

        <FloatingOctahedron position={[-2.5, 1.5, -3]} scale={0.55} speed={0.7} />
        <FloatingOctahedron position={[2, -1.2, 1.5]} scale={0.4} speed={1.0} />
        <FloatingOctahedron position={[0, 2, -2]} scale={0.35} speed={0.85} />

        <GoldRing position={[-1, 0, -1]} scale={1.5} />
        <GoldRing position={[2.5, 1, -2.5]} scale={1.0} />

        <AmbientParticles />

        <Environment preset="night" />

        <fog attach="fog" args={['#0A0A0A', 6, 22]} />
      </Canvas>
    </div>
  );
}
