import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense, useState, useEffect } from "react";
import Sun from "./celestial/Sun";
import Planet from "./celestial/Planet";
import CameraController from "./celestial/CameraController";
import PlanetSelector from "./PlanetSelector";
import DateTimeControl from "./DateTimeControl";
import { getAllPlanetPositions } from "@/lib/orbitalMechanics";

export type CelestialBody = {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  position?: [number, number, number];
};

const planets: CelestialBody[] = [
  { name: "Mercury", radius: 0.4, distance: 4, speed: 4.7, color: "hsl(var(--mercury-color))" },
  { name: "Venus", radius: 0.9, distance: 6, speed: 3.5, color: "hsl(var(--venus-color))" },
  { name: "Earth", radius: 1, distance: 8, speed: 3.0, color: "hsl(var(--earth-color))" },
  { name: "Mars", radius: 0.5, distance: 10, speed: 2.4, color: "hsl(var(--mars-color))" },
  { name: "Jupiter", radius: 2.5, distance: 15, speed: 1.3, color: "hsl(var(--jupiter-color))" },
  { name: "Saturn", radius: 2, distance: 20, speed: 1.0, color: "hsl(var(--saturn-color))" },
  { name: "Uranus", radius: 1.5, distance: 25, speed: 0.7, color: "hsl(var(--uranus-color))" },
  { name: "Neptune", radius: 1.4, distance: 30, speed: 0.5, color: "hsl(var(--neptune-color))" },
];

const SolarSystem = () => {
  const [selectedBody, setSelectedBody] = useState<string>("Sun");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const [calculatedPositions, setCalculatedPositions] = useState<Record<string, [number, number, number]>>({});

  useEffect(() => {
    const positions = getAllPlanetPositions(selectedDate);
    setCalculatedPositions(positions);
  }, [selectedDate]);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setSelectedDate((prev) => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    }, 50); // Update every 50ms (fast animation)

    return () => clearInterval(interval);
  }, [isAnimating]);

  const getTargetPosition = (): [number, number, number] => {
    if (selectedBody === "Sun") return [0, 0, 0];
    return calculatedPositions[selectedBody] || [0, 0, 0];
  };

  return (
    <div className="relative w-full h-screen bg-background">
      <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          <Sun onClick={() => setSelectedBody("Sun")} />
          
          {planets.map((planet) => (
            <Planet
              key={planet.name}
              {...planet}
              onClick={() => setSelectedBody(planet.name)}
              targetPosition={calculatedPositions[planet.name]}
            />
          ))}

          <CameraController 
            target={getTargetPosition()} 
            selectedBody={selectedBody}
            distance={selectedBody === "Sun" ? 40 : 8}
          />
          
          <OrbitControls 
            enablePan={false} 
            maxDistance={100} 
            minDistance={5}
            enabled={false}
          />
        </Suspense>
      </Canvas>

      <PlanetSelector
        selectedBody={selectedBody}
        onSelect={setSelectedBody}
        planets={["Sun", ...planets.map((p) => p.name)]}
      />

      <DateTimeControl
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        isAnimating={isAnimating}
        onToggleAnimation={() => setIsAnimating(!isAnimating)}
      />
    </div>
  );
};

export default SolarSystem;
