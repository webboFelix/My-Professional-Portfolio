'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Grid, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const GREEN = '#00ff9d';
const CYAN = '#00d4ff';

function HackerFigure() {
  const root = useRef<THREE.Group>(null);
  const shield = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (root.current) root.current.rotation.y = Math.sin(t * 0.35) * 0.25;
    if (shield.current) {
      const mat = shield.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.35;
    }
  });

  const wireMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GREEN,
        wireframe: true,
        transparent: true,
        opacity: 0.85,
        emissive: GREEN,
        emissiveIntensity: 0.35,
      }),
    []
  );

  const bodyMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0a1219',
        metalness: 0.8,
        roughness: 0.3,
        emissive: '#001a10',
        emissiveIntensity: 0.2,
      }),
    []
  );

  const shieldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: GREEN,
        emissive: GREEN,
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      }),
    []
  );

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.6}>
      <group ref={root} position={[0, -0.35, 0]} scale={1.15}>
        {/* Hood */}
        <mesh position={[0, 1.35, 0]} material={wireMat}>
          <coneGeometry args={[0.62, 1, 10, 1, true]} />
        </mesh>
        <mesh position={[0, 1.15, 0]} material={bodyMat}>
          <sphereGeometry args={[0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
        </mesh>

        {/* Torso */}
        <mesh position={[0, 0.35, 0]} material={bodyMat}>
          <boxGeometry args={[1.1, 1.2, 0.55]} />
        </mesh>
        <mesh position={[0, 0.35, 0.31]} material={wireMat}>
          <boxGeometry args={[1.12, 1.22, 0.02]} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.75, 0.45, 0.2]} rotation={[0, 0, 0.4]} material={bodyMat}>
          <boxGeometry args={[0.35, 0.9, 0.35]} />
        </mesh>
        <mesh position={[0.75, 0.45, 0.2]} rotation={[0, 0, -0.4]} material={bodyMat}>
          <boxGeometry args={[0.35, 0.9, 0.35]} />
        </mesh>

        {/* Laptop base */}
        <mesh position={[0, -0.15, 0.55]} rotation={[0.35, 0, 0]} material={bodyMat}>
          <boxGeometry args={[1.4, 0.06, 1]} />
        </mesh>
        {/* Laptop screen */}
        <mesh position={[0, 0.35, 0.35]} rotation={[-0.55, 0, 0]} material={bodyMat}>
          <boxGeometry args={[1.3, 0.9, 0.05]} />
        </mesh>
        {/* Glowing shield on screen */}
        <mesh ref={shield} position={[0, 0.38, 0.62]} rotation={[-0.55, 0, 0]} material={shieldMat}>
          <circleGeometry args={[0.22, 32]} />
        </mesh>
        <mesh position={[0, 0.38, 0.64]} rotation={[-0.55, 0, 0]}>
          <ringGeometry args={[0.28, 0.34, 32]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
        </mesh>

        {/* Chair hint */}
        <mesh position={[0, -0.55, -0.15]} material={wireMat}>
          <boxGeometry args={[1.3, 0.08, 1.1]} />
        </mesh>
      </group>
    </Float>
  );
}

function DataRing() {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.4;
  });
  return (
    <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
      <torusGeometry args={[2.2, 0.02, 8, 64]} />
      <meshBasicMaterial color={GREEN} transparent opacity={0.25} />
    </mesh>
  );
}

function SceneContent() {
  return (
    <>
      <fog attach="fog" args={['#050a0f', 6, 18]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 5, 4]} color={GREEN} intensity={2.5} distance={20} />
      <pointLight position={[-4, 2, -3]} color={CYAN} intensity={1.5} distance={15} />
      <spotLight position={[0, 8, 2]} angle={0.4} penumbra={0.5} intensity={1} color={GREEN} />

      <Stars radius={60} depth={40} count={3000} factor={3} saturation={0} fade speed={0.6} />
      <Sparkles count={80} scale={[12, 8, 12]} size={2} speed={0.4} color={GREEN} opacity={0.35} />

      <Grid
        position={[0, -1.2, 0]}
        infiniteGrid
        cellSize={0.5}
        cellThickness={0.5}
        sectionSize={3}
        sectionThickness={1}
        fadeDistance={22}
        cellColor="#00ff9d"
        sectionColor="#00d4ff"
      />

      <DataRing />
      <HackerFigure />
    </>
  );
}

export default function HackerSceneInner() {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  );
}
