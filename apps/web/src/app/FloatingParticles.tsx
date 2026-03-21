'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1500 }) {
  const points = useRef<THREE.Points>(null!)
  
  // Use useMemo to avoid recalculating on every render
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Slow rotation
    points.current.rotation.y = time * 0.05
    points.current.rotation.x = time * 0.03
    
    // Pulse effect
    const s = 1 + Math.sin(time * 0.5) * 0.05
    points.current.scale.set(s, s, s)
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#a78bfa"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function FloatingParticles() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={isMobile ? 600 : 1500} />
      </Canvas>
    </div>
  )
}
