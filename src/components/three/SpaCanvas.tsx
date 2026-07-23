'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingStone({
  position,
  scale,
  speed,
  distort,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.3;
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.z += 0.001 * speed;
    }
  });

  return (
    <Float
      speed={speed * 0.5}
      rotationIntensity={0.3}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.8}
          distort={distort}
          speed={speed}
          transparent
          opacity={0.85}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function WaterRipple() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#C9A84C') },
      uOpacity: { value: 0.15 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave1 = sin(pos.x * 2.0 + uTime * 0.5) * 0.1;
            float wave2 = sin(pos.y * 3.0 + uTime * 0.3) * 0.08;
            float wave3 = cos(pos.x * 1.5 + pos.y * 1.5 + uTime * 0.4) * 0.06;
            pos.z = wave1 + wave2 + wave3;
            vElevation = pos.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          uniform float uOpacity;
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;
          void main() {
            float mixStrength = (vElevation + 0.2) * 3.0;
            vec3 finalColor = mix(uColor * 0.3, uColor, mixStrength);
            float alpha = uOpacity + vElevation * 0.3;
            gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 0.25));
          }
        `}
      />
    </mesh>
  );
}

function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0003;
      particlesRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
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
        size={0.03}
        color="#C9A84C"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function SpaCanvas() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#C9A84C" />
        <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#4A90A4" />
        <pointLight position={[0, 4, 0]} intensity={0.5} color="#C9A84C" distance={10} />
        <spotLight position={[0, 8, 0]} angle={0.3} penumbra={1} intensity={0.4} color="#C9A84C" />

        {/* Floating Stones */}
        <FloatingStone position={[-3, 0.5, -1]} scale={1.2} speed={0.8} distort={0.4} color="#2A3A3A" />
        <FloatingStone position={[2.5, 1, -2]} scale={0.8} speed={1.1} distort={0.5} color="#1E2E2E" />
        <FloatingStone position={[-1.5, -0.5, 1]} scale={1.0} speed={0.9} distort={0.35} color="#3A4A4A" />
        <FloatingStone position={[4, 0, 0]} scale={0.6} speed={1.3} distort={0.45} color="#253535" />
        <FloatingStone position={[-4, 1.2, -3]} scale={0.7} speed={1.0} distort={0.3} color="#1A2A2A" />
        <FloatingStone position={[1, -1, 2]} scale={0.9} speed={0.7} distort={0.5} color="#2E3E3E" />
        <FloatingStone position={[0, 1.5, -4]} scale={1.1} speed={0.85} distort={0.4} color="#354545" />
        <FloatingStone position={[-2.5, -0.8, -2]} scale={0.5} speed={1.2} distort={0.35} color="#202E2E" />
        <FloatingStone position={[3.5, -0.3, 1.5]} scale={0.75} speed={0.95} distort={0.45} color="#283838" />

        {/* Water Ripple Surface */}
        <WaterRipple />

        {/* Floating Particles */}
        <AmbientParticles />

        {/* Environment */}
        <Environment preset="night" />

        {/* Fog for depth */}
        <fog attach="fog" args={['#0A0A0A', 8, 25]} />
      </Canvas>
    </div>
  );
}
