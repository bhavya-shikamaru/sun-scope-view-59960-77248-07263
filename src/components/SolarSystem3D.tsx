import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { planetsData } from '@/lib/planetData';

interface PlanetProps {
  data: typeof planetsData[0];
  onClick: () => void;
  isSelected: boolean;
  timeSpeed: number;
}

// Create procedural noise texture for more realistic surfaces
const createNoiseTexture = (size = 512, roughness = 0.5) => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(size, size);
  
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255 * roughness;
    imageData.data[i] = value;
    imageData.data[i + 1] = value;
    imageData.data[i + 2] = value;
    imageData.data[i + 3] = 255;
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return texture;
};

const Planet = ({ data, onClick, isSelected, timeSpeed }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Mesh>(null);

  // Scale factors for visibility
  const radiusScale = data.name === 'Sun' ? 3 : data.radius * 2;
  const orbitRadiusScale = data.orbitRadius * 15;

  // Generate textures for better realism
  const bumpMap = createNoiseTexture(512, 0.3);
  const roughnessMap = createNoiseTexture(256, 0.6);

  // Create realistic planet material
  const createPlanetMaterial = () => {
    const baseProps = {
      roughness: data.name === 'Sun' ? 0.1 : 0.8,
      metalness: data.name === 'Sun' ? 0 : 0.3,
      bumpMap: data.name !== 'Sun' ? bumpMap : undefined,
      bumpScale: data.name !== 'Sun' ? 0.05 : undefined,
      roughnessMap: data.name !== 'Sun' ? roughnessMap : undefined,
    };

    if (data.name === 'Sun') {
      return (
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={2}
          {...baseProps}
        />
      );
    } else if (data.name === 'Earth') {
      return (
        <meshStandardMaterial
          color="#2b5876"
          {...baseProps}
          roughness={0.6}
          metalness={0.1}
        />
      );
    } else if (data.name === 'Mars') {
      return (
        <meshStandardMaterial
          color="#c1440e"
          {...baseProps}
          roughness={0.9}
          metalness={0.05}
        />
      );
    } else if (data.name === 'Jupiter') {
      return (
        <meshStandardMaterial
          color="#c88b3a"
          {...baseProps}
          roughness={0.4}
          metalness={0.2}
        />
      );
    } else if (data.name === 'Saturn') {
      return (
        <meshStandardMaterial
          color="#e6d4a5"
          {...baseProps}
          roughness={0.5}
          metalness={0.2}
        />
      );
    } else if (data.name === 'Venus') {
      return (
        <meshStandardMaterial
          color="#ffc649"
          {...baseProps}
          roughness={0.3}
          metalness={0.1}
        />
      );
    } else if (data.name === 'Uranus') {
      return (
        <meshStandardMaterial
          color="#4FD0E7"
          {...baseProps}
          roughness={0.4}
          metalness={0.3}
        />
      );
    } else if (data.name === 'Neptune') {
      return (
        <meshStandardMaterial
          color="#4166F5"
          {...baseProps}
          roughness={0.4}
          metalness={0.3}
        />
      );
    } else {
      return (
        <meshStandardMaterial
          color={data.color}
          {...baseProps}
        />
      );
    }
  };

  // Create ring system for Saturn and Uranus
  const hasRings = data.name === 'Saturn' || data.name === 'Uranus';
  const ringInnerRadius = radiusScale * (data.name === 'Saturn' ? 1.2 : 1.5);
  const ringOuterRadius = radiusScale * (data.name === 'Saturn' ? 2.2 : 2.0);
  const ringOpacity = data.name === 'Saturn' ? 0.8 : 0.3;
  const ringColor = data.name === 'Saturn' ? '#c9b896' : '#4FD0E7';

  useFrame((state) => {
    if (orbitRef.current && data.orbitSpeed > 0) {
      // Orbit around the sun with time speed multiplier
      orbitRef.current.rotation.y += (0.001 / data.orbitSpeed) * timeSpeed;
    }
    if (meshRef.current) {
      // Planet rotation with time speed multiplier
      meshRef.current.rotation.y += 0.001 * timeSpeed;
    }
    if (atmosphereRef.current) {
      // Slightly slower atmosphere rotation for visual effect
      atmosphereRef.current.rotation.y += 0.0005 * timeSpeed;
    }
    if (ringsRef.current) {
      // Very slow ring rotation
      ringsRef.current.rotation.z += 0.0001 * timeSpeed;
    }
  });

  // Check if planet should have atmosphere glow
  const hasAtmosphere = ['Earth', 'Venus', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'].includes(data.name);

  return (
    <group ref={orbitRef}>
      <group position={[orbitRadiusScale, 0, 0]}>
        {/* Main planet mesh */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <sphereGeometry args={[radiusScale, 64, 64]} />
          {createPlanetMaterial()}
        </mesh>

        {/* Atmospheric glow for gas giants and planets with atmosphere */}
        {hasAtmosphere && (
          <mesh ref={atmosphereRef}>
            <sphereGeometry args={[radiusScale * 1.05, 32, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        )}

        {/* Rings for Saturn and Uranus */}
        {hasRings && (
          <mesh
            ref={ringsRef}
            rotation={[Math.PI / 2.2, 0, 0]}
          >
            <ringGeometry args={[ringInnerRadius, ringOuterRadius, 128]} />
            <meshStandardMaterial
              color={ringColor}
              transparent
              opacity={ringOpacity}
              side={THREE.DoubleSide}
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
        )}

        {/* Sun corona effect */}
        {data.name === 'Sun' && (
          <>
            <mesh>
              <sphereGeometry args={[radiusScale * 1.1, 32, 32]} />
              <meshBasicMaterial
                color="#FDB813"
                transparent
                opacity={0.3}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[radiusScale * 1.2, 32, 32]} />
              <meshBasicMaterial
                color="#FF6B35"
                transparent
                opacity={0.1}
                side={THREE.BackSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </>
        )}
      </group>
      
      {/* Selection ring */}
      {isSelected && (
        <mesh position={[orbitRadiusScale, 0, 0]}>
          <ringGeometry args={[radiusScale * (hasRings ? 2.5 : 1.2), radiusScale * (hasRings ? 2.6 : 1.3), 32]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Orbit line */}
      {data.orbitRadius > 0 && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[orbitRadiusScale - 0.1, orbitRadiusScale + 0.1, 64]} />
          <meshBasicMaterial 
            color="#38bdf8" 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      )}
    </group>
  );
};

interface SolarSystem3DProps {
  onPlanetSelect: (planet: typeof planetsData[0]) => void;
  selectedPlanet: typeof planetsData[0] | null;
  timeSpeed: number;
}

const SolarSystem3D = ({ onPlanetSelect, selectedPlanet, timeSpeed }: SolarSystem3DProps) => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas 
        camera={{ position: [0, 50, 100], fov: 60 }}
        style={{ background: 'linear-gradient(180deg, #0a1628 0%, #1a2f4a 50%, #2a4a6a 100%)' }}
      >
        <color attach="background" args={['#0f2042']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={3} color="#FDB813" />
        <hemisphereLight intensity={0.3} color="#4a90e2" groundColor="#1a2f4a" />
        
        <Stars 
          radius={300} 
          depth={50} 
          count={8000} 
          factor={5} 
          saturation={0} 
          fade 
          speed={0.5} 
        />
        
        {/* Grid overlay */}
        <gridHelper args={[500, 50, '#38bdf8', '#1e3a5f']} rotation={[0, 0, 0]} />
        
        {planetsData.map((planet) => (
          <Planet
            key={planet.name}
            data={planet}
            onClick={() => onPlanetSelect(planet)}
            isSelected={selectedPlanet?.name === planet.name}
            timeSpeed={timeSpeed}
          />
        ))}
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          minDistance={10}
          maxDistance={200}
          zoomSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default SolarSystem3D;
