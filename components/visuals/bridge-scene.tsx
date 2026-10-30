"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function BridgeArc() {
  const group = useRef<Group>(null);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.4, -0.35, 0),
        new THREE.Vector3(-1.1, 0.55, 0.35),
        new THREE.Vector3(0, 0.95, 0),
        new THREE.Vector3(1.1, 0.55, -0.35),
        new THREE.Vector3(2.4, -0.35, 0),
      ]),
    [],
  );
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.045, 12, false), [curve]);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group ref={group}>
      <mesh geometry={tube}>
        <meshStandardMaterial color="#eef8fc" roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh position={[-2.4, -0.55, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.18, 24]} />
        <meshStandardMaterial color="#0b6b70" roughness={0.55} />
      </mesh>
      <mesh position={[2.4, -0.55, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.18, 24]} />
        <meshStandardMaterial color="#1a8a8f" roughness={0.55} />
      </mesh>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
        <mesh position={[0, 1.15, 0]}>
          <icosahedronGeometry args={[0.16, 0]} />
          <meshStandardMaterial color="#e7f6f4" roughness={0.3} metalness={0.2} />
        </mesh>
      </Float>
      <OrbitMarks />
    </group>
  );
}

function OrbitMarks() {
  const a = useRef<Mesh>(null);
  const b = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (a.current) {
      a.current.position.set(Math.cos(t * 0.55) * 1.6, 0.35 + Math.sin(t * 0.7) * 0.12, Math.sin(t * 0.55) * 1.1);
    }
    if (b.current) {
      b.current.position.set(Math.cos(t * 0.4 + 2) * 1.9, -0.05 + Math.cos(t * 0.5) * 0.1, Math.sin(t * 0.4 + 2) * 1.2);
    }
  });
  return (
    <>
      <mesh ref={a}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#a8dce0" roughness={0.4} />
      </mesh>
      <mesh ref={b}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
    </>
  );
}

export function BridgeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="h-full w-full"
      aria-hidden
    >
      <PerspectiveCamera makeDefault position={[0, 0.55, 5.2]} fov={38} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 3]} intensity={1.05} color="#eef8fc" />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#1a8a8f" />
      <BridgeArc />
    </Canvas>
  );
}

export default BridgeScene;
