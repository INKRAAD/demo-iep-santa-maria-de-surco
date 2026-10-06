import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useLoader, type ThreeElements } from '@react-three/fiber'
import { Float, RoundedBox, Sparkles } from '@react-three/drei'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import emblemUrl from '../assets/logo/logo-emblema.svg'

const INDIGO = '#3C4984'
const CORAL = '#EF5155'
const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4)

/** Emblema oficial extruido a partir del SVG vectorizado (libro coral detrás, Virgen + SMS en índigo delante). */
function Emblem({ onReady }: { onReady: () => void }) {
  const data = useLoader(SVGLoader, emblemUrl)
  const group = useRef<THREE.Group>(null)
  const book = useRef<THREE.Mesh>(null)
  const figure = useRef<THREE.Mesh>(null)
  const t0 = useRef<number | null>(null)

  const { coralGeo, blueGeo, scale } = useMemo(() => {
    const coral: THREE.BufferGeometry[] = []
    const blue: THREE.BufferGeometry[] = []
    for (const path of data.paths) {
      const isCoral = path.color.r > path.color.b
      for (const shape of path.toShapes()) {
        const g = new THREE.ExtrudeGeometry(shape, {
          depth: isCoral ? 46 : 70,
          bevelEnabled: true,
          bevelThickness: 8,
          bevelSize: 4,
          bevelSegments: 3,
          curveSegments: 6,
        })
        ;(isCoral ? coral : blue).push(g)
      }
    }
    const coralGeo = mergeGeometries(coral)!
    const blueGeo = mergeGeometries(blue)!
    const box = new THREE.Box3().setFromBufferAttribute(blueGeo.getAttribute('position') as THREE.BufferAttribute)
    box.union(new THREE.Box3().setFromBufferAttribute(coralGeo.getAttribute('position') as THREE.BufferAttribute))
    const c = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    coralGeo.translate(-c.x, -c.y, 0)
    blueGeo.translate(-c.x, -c.y, 60)
    coral.forEach((g) => g.dispose())
    blue.forEach((g) => g.dispose())
    return { coralGeo, blueGeo, scale: 3.7 / size.y }
  }, [data])

  useEffect(() => () => { coralGeo.dispose(); blueGeo.dispose() }, [coralGeo, blueGeo])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    if (t0.current === null) { t0.current = state.clock.elapsedTime; onReady() }
    const t = state.clock.elapsedTime - t0.current
    // Intro: el libro se "abre" y la figura avanza
    const open = ease(t / 1.6)
    if (book.current) book.current.scale.x = 0.08 + 0.92 * open
    if (figure.current) {
      figure.current.position.z = (1 - ease((t - 0.3) / 1.4)) * -2.2
      ;(figure.current.material as THREE.MeshPhysicalMaterial).opacity = ease((t - 0.2) / 0.8)
    }
    const scrollP = Math.min(window.scrollY / window.innerHeight, 1.2)
    const px = state.pointer.x
    const py = state.pointer.y
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, Math.sin(t * 0.45) * 0.22 + px * 0.35 + scrollP * 0.9, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -py * 0.18 + scrollP * 0.25, 0.06)
    g.position.y = Math.sin(t * 0.9) * 0.08 + scrollP * 0.6
  })

  return (
    <group ref={group}>
      <group scale={[scale, -scale, scale]}>
        <mesh ref={book} geometry={coralGeo} castShadow>
          <meshPhysicalMaterial color={CORAL} roughness={0.35} metalness={0.05} clearcoat={0.7} clearcoatRoughness={0.25} />
        </mesh>
        <mesh ref={figure} geometry={blueGeo} castShadow>
          <meshPhysicalMaterial color={INDIGO} roughness={0.3} metalness={0.08} clearcoat={0.8} clearcoatRoughness={0.2} transparent />
        </mesh>
      </group>
    </group>
  )
}

function Pencil(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh><cylinderGeometry args={[0.13, 0.13, 1.5, 6]} /><meshStandardMaterial color={CORAL} roughness={0.45} flatShading /></mesh>
      <mesh position={[0, 0.83, 0]}><cylinderGeometry args={[0.135, 0.135, 0.16, 16]} /><meshStandardMaterial color="#C9CDDD" metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0, 1.0, 0]}><cylinderGeometry args={[0.13, 0.13, 0.2, 16]} /><meshStandardMaterial color="#F7A9AB" roughness={0.7} /></mesh>
      <mesh position={[0, -0.92, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.13, 0.34, 6]} /><meshStandardMaterial color="#F2D2A9" roughness={0.8} flatShading /></mesh>
      <mesh position={[0, -1.05, 0]} rotation={[Math.PI, 0, 0]}><coneGeometry args={[0.045, 0.1, 6]} /><meshStandardMaterial color={INDIGO} /></mesh>
    </group>
  )
}

function Books(props: ThreeElements['group']) {
  const cols = [INDIGO, CORAL, '#E9ECF7']
  return (
    <group {...props}>
      {cols.map((c, i) => (
        <group key={i} position={[i === 1 ? 0.08 : 0, i * 0.24, 0]} rotation={[0, i * 0.18, 0]}>
          <RoundedBox args={[1.15, 0.22, 0.82]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color={c} roughness={0.5} />
          </RoundedBox>
          <mesh position={[0.03, 0, 0]}><boxGeometry args={[1.1, 0.16, 0.84]} /><meshStandardMaterial color="#FFFDF8" roughness={0.9} /></mesh>
        </group>
      ))}
    </group>
  )
}

function Plane(props: ThreeElements['group']) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const v = new Float32Array([
      0, 0, 0.9, -0.55, 0, -0.6, 0, -0.08, -0.45,
      0, 0, 0.9, 0, -0.08, -0.45, 0.55, 0, -0.6,
      0, 0, 0.9, 0, -0.08, -0.45, 0, -0.3, -0.5,
    ])
    g.setAttribute('position', new THREE.BufferAttribute(v, 3))
    g.computeVertexNormals()
    return g
  }, [])
  return (
    <group {...props}>
      <mesh geometry={geo}><meshStandardMaterial color="#ffffff" side={THREE.DoubleSide} roughness={0.6} /></mesh>
    </group>
  )
}

function Cap(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <mesh rotation={[0, Math.PI / 4, 0]}><boxGeometry args={[1.1, 0.06, 1.1]} /><meshStandardMaterial color={INDIGO} roughness={0.5} /></mesh>
      <mesh position={[0, -0.2, 0]}><cylinderGeometry args={[0.38, 0.42, 0.36, 24]} /><meshStandardMaterial color="#262F5E" roughness={0.6} /></mesh>
      <mesh position={[0, 0.05, 0]}><sphereGeometry args={[0.05, 12, 12]} /><meshStandardMaterial color={CORAL} /></mesh>
      <mesh position={[0.5, -0.18, 0.2]}><cylinderGeometry args={[0.025, 0.025, 0.42, 8]} /><meshStandardMaterial color={CORAL} /></mesh>
      <mesh position={[0.5, -0.42, 0.2]}><sphereGeometry args={[0.06, 12, 12]} /><meshStandardMaterial color={CORAL} /></mesh>
    </group>
  )
}

function Globe(props: ThreeElements['group']) {
  const ref = useRef<THREE.Group>(null)
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.4 })
  return (
    <group {...props}>
      <group ref={ref} rotation={[0.4, 0, 0.2]}>
        <mesh><sphereGeometry args={[0.42, 32, 32]} /><meshStandardMaterial color="#5B6AAE" roughness={0.4} /></mesh>
        <mesh><sphereGeometry args={[0.425, 12, 8]} /><meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.45} /></mesh>
      </group>
      <mesh rotation={[Math.PI / 2, 0.4, 0]}><torusGeometry args={[0.55, 0.025, 8, 48, Math.PI * 1.3]} /><meshStandardMaterial color={CORAL} metalness={0.3} roughness={0.3} /></mesh>
    </group>
  )
}

function Ruler(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <RoundedBox args={[1.5, 0.28, 0.05]} radius={0.02} smoothness={2}><meshStandardMaterial color="#F6E7B8" roughness={0.6} /></RoundedBox>
      {Array.from({ length: 11 }).map((_, i) => (
        <mesh key={i} position={[-0.68 + i * 0.136, 0.08, 0.03]}><boxGeometry args={[0.012, i % 5 === 0 ? 0.12 : 0.07, 0.01]} /><meshBasicMaterial color={INDIGO} /></mesh>
      ))}
    </group>
  )
}

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, state.pointer.x * 0.25, 0.04)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, state.pointer.y * 0.15, 0.04)
  })
  return <group ref={ref}>{children}</group>
}

export default function HeroScene({ active, onReady }: { active: boolean; onReady: () => void }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#ffffff', '#C9CDE8', 0.8]} />
      <directionalLight position={[4, 6, 8]} intensity={2.2} />
      <directionalLight position={[-6, -2, -4]} intensity={1.2} color={CORAL} />
      <pointLight position={[0, 0, 4]} intensity={6} distance={10} color="#ffffff" />
      <Suspense fallback={null}>
        <Rig>
          <Emblem onReady={onReady} />
          <Float speed={1.6} rotationIntensity={0.6} floatIntensity={0.9}><Pencil position={[-2.2, 1.35, -0.4]} rotation={[0.3, 0.2, 0.75]} /></Float>
          <Float speed={1.3} rotationIntensity={0.4} floatIntensity={0.7}><Books position={[2.0, -1.65, -0.3]} rotation={[0.35, -0.5, 0.08]} scale={0.85} /></Float>
          <Float speed={2} rotationIntensity={0.8} floatIntensity={1.1}><Plane position={[1.95, 1.6, 0.4]} rotation={[0.4, -0.9, 0.2]} scale={0.9} /></Float>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}><Cap position={[-2.1, -1.5, 0.2]} rotation={[0.45, 0.4, -0.15]} scale={0.85} /></Float>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.6}><Globe position={[2.15, 0.15, -1.4]} scale={0.8} /></Float>
          <Float speed={1.7} rotationIntensity={0.7} floatIntensity={0.9}><Ruler position={[-2.2, 0.0, -1.5]} rotation={[0.2, 0.5, -0.4]} scale={0.8} /></Float>
          <Sparkles count={40} scale={[7, 5, 3]} size={3} speed={0.35} color={CORAL} opacity={0.8} />
          <Sparkles count={30} scale={[7, 5, 3]} size={2.5} speed={0.3} color={INDIGO} opacity={0.6} />
        </Rig>
      </Suspense>
    </Canvas>
  )
}
