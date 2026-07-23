'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function WireframeRoom() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main room wireframe */}
      <mesh>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Inner room wireframe */}
      <mesh scale={0.85}>
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Bed shape */}
      <mesh position={[0, -0.7, 0.3]} scale={[1.2, 0.3, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Pillow */}
      <mesh position={[0, -0.5, 0.9]}>
        <boxGeometry args={[0.6, 0.12, 0.3]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Side table left */}
      <mesh position={[-1.3, -0.6, 0.3]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Side table right */}
      <mesh position={[1.3, -0.6, 0.3]}>
        <boxGeometry args={[0.3, 0.5, 0.3]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Lamp */}
      <mesh position={[-1.3, 0.1, 0.3]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Lamp shade */}
      <mesh position={[-1.3, 0.4, 0.3]}>
        <coneGeometry args={[0.2, 0.2, 8]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* TV on wall */}
      <mesh position={[0, 0.3, -1.48]}>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial
          color="#C9A84C"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Floor accent lines */}
      {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
        <mesh key={i} position={[x, -0.99, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.01, 2.5]} />
          <meshStandardMaterial
            color="#C9A84C"
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}

      {/* Gold metallic accent edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(3.01, 2.01, 3.01)]} />
        <lineBasicMaterial color="#C9A84C" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

function GoldenParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 200;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 10,
      speed: Math.random() * 0.3 + 0.1,
      offset: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.02 + 0.005,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(time * p.speed + p.offset) * 0.3,
        p.y + Math.cos(time * p.speed * 0.5 + p.offset) * 0.5,
        p.z + Math.sin(time * p.speed * 0.7 + p.offset) * 0.3
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time + p.offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#C9A84C"
        emissive="#C9A84C"
        emissiveIntensity={0.5}
        metalness={1}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [4, 3, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <color attach="background" args={['#0A0A0A']} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-3, 2, -3]} intensity={0.8} color="#C9A84C" />
      <pointLight position={[3, -1, 3]} intensity={0.4} color="#C9A84C" />

      {/* Subtle fog */}
      <fog attach="fog" args={['#0A0A0A', 8, 20]} />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <WireframeRoom />
      </Float>

      <GoldenParticles />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0A0A0A"
          metalness={0.8}
          roughness={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Canvas>
  );
}
