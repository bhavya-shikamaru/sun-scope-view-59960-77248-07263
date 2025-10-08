import { useRef } from "react";
import { Mesh, PointLight } from "three";
import { useFrame } from "@react-three/fiber";

type SunProps = {
  onClick: () => void;
};

const Sun = ({ onClick }: SunProps) => {
  const meshRef = useRef<Mesh>(null);
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group onClick={onClick}>
      <pointLight ref={lightRef} intensity={2} distance={100} decay={2} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          emissive="hsl(var(--sun-glow))"
          emissiveIntensity={1.5}
          color="hsl(var(--sun-glow))"
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial
          color="hsl(var(--sun-glow))"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export default Sun;
