"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Html } from "@react-three/drei"
import { useRef, useMemo, useState } from "react"
import { Vector3 } from "three"
import type * as THREE from "three"
import Image from "next/image"

const techStacks = [
  { name: "JavaScript", color: "#f7df1e", icon: "/icons/js.svg" },
  { name: "Python", color: "#3776ab", icon: "/icons/python.svg" },
  { name: "TypeScript", color: "#3178c6", icon: "/icons/typescript.svg" },
  { name: "React", color: "#61dafb", icon: "/icons/react.svg" },
  { name: "Node.js", color: "#339933", icon: "/icons/nodejs.svg" },
  { name: "C++", color: "#00599c", icon: "/icons/cpp.svg" },
  { name: "Next.js", color: "#000000", icon: "/icons/next.svg" },
  { name: "Tailwind CSS", color: "#06b6d4", icon: "/icons/tail.svg" },
  { name: "GitHub", color: "#181717", icon: "/icons/github.svg" },
  { name: "C#", color: "#239120", icon: "/icons/cs.svg" },
  { name: "Rust", color: "#000000", icon: "/icons/Rust.svg" },
]

function fibonacciSphere(samples: number, radius = 5) {
  const points = []
  const phi = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = phi * i
    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY
    points.push(new Vector3(x * radius, y * radius, z * radius))
  }

  return points
}



function TechIcon({
  position,
  tech,
  onHover,
  onLeave,
  isHovered,
}: {
  position: Vector3
  tech: (typeof techStacks)[0]
  onHover: () => void
  onLeave: () => void
  isHovered: boolean
}) {
  const meshRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (meshRef.current) {
      const cameraPos = new Vector3()
      cameraPos.copy(camera.position)
      meshRef.current.lookAt(cameraPos)
    }
  })

  return (
    <group
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      onPointerOver={onHover}
      onPointerOut={onLeave}
      scale={isHovered ? 1.8 : 1.2}
    >
      <mesh>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>

      <Html center distanceFactor={6} position={[0, 0, 0.01]} style={{ pointerEvents: "none", userSelect: "none" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "white",
            padding: "8px",
            boxShadow: isHovered ? "0 0 20px rgba(255,255,255,0.8)" : "0 2px 10px rgba(0,0,0,0.1)",
            border: isHovered ? `3px solid ${tech.color}` : "2px solid rgba(0,0,0,0.1)",
          }}
        >
          <Image 
            src={tech.icon || "/placeholder.svg"} 
            alt={tech.name} 
            width={80} 
            height={80}
          />
        </div>
      </Html>

      {isHovered && (
        <>
          <mesh>
            <circleGeometry args={[0.8, 32]} />
            <meshBasicMaterial color={tech.color} transparent opacity={0.3} />
          </mesh>
          <mesh>
            <circleGeometry args={[1.0, 32]} />
            <meshBasicMaterial color={tech.color} transparent opacity={0.15} />
          </mesh>
        </>
      )}
    </group>
  )
}

function TechGlobe() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const iconPositions = useMemo(() => fibonacciSphere(techStacks.length, 5), [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003
    }
  })

  return (
    <>
      <Html center position={[0, 0, 0]}>
        <div style={{ color: "#ffffff", fontSize: "14px", fontWeight: "bold", pointerEvents: "none" }}>
          drag me :)
        </div>
      </Html>
      <group ref={groupRef}>
        {techStacks.map((tech, index) => (
          <TechIcon
            key={tech.name}
            position={iconPositions[index]}
            tech={tech}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </group>
    </>
  )
}

export default function Component() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.6} />
        <TechGlobe />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} minDistance={10} maxDistance={25} />
      </Canvas>
    </div>
  )
}
