'use client'

import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform float uScroll;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Create wave pattern
    float wave1 = sin(uv.x * 8.0 + uTime * 0.5) * 0.1;
    float wave2 = cos(uv.y * 6.0 - uTime * 0.3) * 0.1;
    float combined = wave1 + wave2;
    
    // Base dark blue color
    vec3 color1 = vec3(0.0, 0.0, 0.1);
    vec3 color2 = vec3(0.0, 0.2, 0.5);
    vec3 color3 = vec3(0.0, 0.5, 0.8);
    
    // Mix colors based on position and wave
    vec3 finalColor = mix(color1, color2, uv.y + combined);
    finalColor = mix(finalColor, color3, uv.x * 0.3 + combined * 0.5);
    
    // React to scroll: shift brightness and color intensity
    float scrollEffect = 0.5 + 0.5 * uScroll;
    finalColor *= scrollEffect;
    
    // Add subtle glow
    float glow = 1.0 - distance(uv, vec2(0.5));
    finalColor += vec3(0.0, 0.3, 0.6) * glow * 0.2 * scrollEffect;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
      const scrollProgress = Math.min(1, window.scrollY / window.innerHeight)
      materialRef.current.uniforms.uScroll.value = scrollProgress
    }
  })
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial 
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0.5 }
        }}
      />
    </mesh>
  )
}

function MagneticButton({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)` 
    }
    const handleMouseLeave = () => {
      el.style.transform = ''
    }
    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])
  return (
    <a ref={ref} href={href} className={`magnetic-button touch-feedback inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white rounded-full font-medium transition-all ${className}`}>
      {children}
    </a>
  )
}

export function HeroSection() {
  return (
    <section className="relative h-screen flex overflow-hidden bg-black">
      {/* Left text */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[var(--font-orbitron)] font-bold leading-none tracking-tight">
          <span className="block animate-heroWeight">Web Design</span>
          <span className="block animate-heroWeight-delay-1">That Builds</span>
          <span className="block text-[var(--accent)] animate-heroWeight-delay-2">Your Business</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-md font-inter">
          No templates. No AI slop. Just human-crafted websites.
        </p>
        <div className="mt-10 flex gap-4 flex-wrap">
          <MagneticButton href="/contact">
            Start with a real conversation
          </MagneticButton>
          <MagneticButton href="#work" className="bg-transparent border border-[var(--border-subtle)] hover:border-[var(--accent)]">
            See real work
          </MagneticButton>
        </div>
      </div>
      
      {/* Right shader */}
      <div className="hidden lg:block w-1/2 relative">
        <Canvas className="absolute inset-0">
          <ShaderPlane />
        </Canvas>
      </div>
    </section>
  )
}
