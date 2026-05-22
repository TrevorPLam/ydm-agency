'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const count = 600
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [])

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.08
    pointsRef.current.rotation.x += delta * 0.03
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#0080FF"
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function MorphingCore() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x += delta * 0.05
  })

  return (
    <Float speed={1.0} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.0, 1]} />
        <MeshDistortMaterial
          color="#0080FF"
          emissive="#0060CC"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.1}
          distort={0.2}
          speed={1.5}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, -0.2, 3.8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ 
          antialias: false, 
          powerPreference: 'high-performance',
          alpha: true 
        }}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.25} />
        <pointLight position={[5, 5, 5]} intensity={0.9} color="#0080FF" />
        <pointLight position={[-3, -2, 3]} intensity={0.4} color="#004499" />
        <ParticleField />
        <MorphingCore />
      </Canvas>
    </div>
  )
}
