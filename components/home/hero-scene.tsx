"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Orb({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.2;
    ref.current.rotation.y += delta * 0.32;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.5} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      className="absolute inset-0"
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 3, 4]} intensity={1.1} />
      <Orb position={[-2.8, 1.4, -1]} color="#22d3ee" />
      <Orb position={[2.7, -1.2, -1.6]} color="#3b82f6" />
      <Orb position={[0, 1.7, -2.4]} color="#34d399" />
    </Canvas>
  );
}

