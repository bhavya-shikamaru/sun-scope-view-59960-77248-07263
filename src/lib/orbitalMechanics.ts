// Simplified Keplerian orbital elements for planets (J2000 epoch)
// Semi-major axis in AU, orbital period in Earth days, longitude at epoch

type OrbitalElements = {
  semiMajorAxis: number; // AU
  orbitalPeriod: number; // Earth days
  longitudeAtEpoch: number; // degrees
  inclination: number; // degrees (simplified to 0 for this demo)
};

const planetOrbitalElements: Record<string, OrbitalElements> = {
  Mercury: { semiMajorAxis: 0.387, orbitalPeriod: 87.97, longitudeAtEpoch: 252.25, inclination: 0 },
  Venus: { semiMajorAxis: 0.723, orbitalPeriod: 224.7, longitudeAtEpoch: 181.98, inclination: 0 },
  Earth: { semiMajorAxis: 1.0, orbitalPeriod: 365.26, longitudeAtEpoch: 100.46, inclination: 0 },
  Mars: { semiMajorAxis: 1.524, orbitalPeriod: 686.98, longitudeAtEpoch: 355.45, inclination: 0 },
  Jupiter: { semiMajorAxis: 5.203, orbitalPeriod: 4332.59, longitudeAtEpoch: 34.35, inclination: 0 },
  Saturn: { semiMajorAxis: 9.537, orbitalPeriod: 10759.22, longitudeAtEpoch: 49.95, inclination: 0 },
  Uranus: { semiMajorAxis: 19.191, orbitalPeriod: 30688.5, longitudeAtEpoch: 313.23, inclination: 0 },
  Neptune: { semiMajorAxis: 30.069, orbitalPeriod: 60182, longitudeAtEpoch: 304.88, inclination: 0 },
};

// J2000 epoch: January 1, 2000, 12:00 TT
const J2000_EPOCH = new Date('2000-01-01T12:00:00Z');

export function calculatePlanetPosition(
  planetName: string,
  date: Date,
  scaleFactor: number = 8
): [number, number, number] {
  const elements = planetOrbitalElements[planetName];
  if (!elements) return [0, 0, 0];

  // Calculate days since J2000 epoch
  const daysSinceEpoch = (date.getTime() - J2000_EPOCH.getTime()) / (1000 * 60 * 60 * 24);

  // Calculate mean anomaly (how far along the orbit)
  const meanAnomaly = ((daysSinceEpoch / elements.orbitalPeriod) * 360) % 360;

  // True anomaly approximation (simplified circular orbit)
  const trueAnomaly = meanAnomaly + elements.longitudeAtEpoch;

  // Convert to radians
  const angleRad = (trueAnomaly * Math.PI) / 180;

  // Calculate position (scale AU to scene units)
  const distance = elements.semiMajorAxis * scaleFactor;
  const x = Math.cos(angleRad) * distance;
  const z = Math.sin(angleRad) * distance;
  const y = 0; // Simplified to ecliptic plane

  return [x, y, z];
}

export function getAllPlanetPositions(date: Date, scaleFactor: number = 8): Record<string, [number, number, number]> {
  const positions: Record<string, [number, number, number]> = {};
  
  Object.keys(planetOrbitalElements).forEach((planetName) => {
    positions[planetName] = calculatePlanetPosition(planetName, date, scaleFactor);
  });

  return positions;
}
