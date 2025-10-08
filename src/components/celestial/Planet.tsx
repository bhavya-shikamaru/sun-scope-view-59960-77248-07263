import { useRef, useEffect } from "react";
import { Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import type { CelestialBody } from "../SolarSystem";

type PlanetProps = CelestialBody & {
  onClick: () => void;
  targetPosition?: [number, number, number];
};

const Planet = ({ name, radius, distance, speed, color, onClick, targetPosition }: PlanetProps) => {
  const meshRef = useRef<Mesh>(null);

  useEffect(() => {
    if (meshRef.current && targetPosition) {
      meshRef.current.position.set(...targetPosition);
    }
  }, [targetPosition]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;

      // Smoothly interpolate to target position
      if (targetPosition) {
        const targetVec = new Vector3(...targetPosition);
        meshRef.current.position.lerp(targetVec, 0.1);
      }
    }
  });

  return (
    <>
      {/* Orbit ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 128]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* Planet */}
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
      </mesh>
    </>
  );
};

export default Planet;
