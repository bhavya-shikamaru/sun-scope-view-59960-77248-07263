export interface PlanetData {
  name: string;
  radius: number; // In Earth radii
  mass: number; // In Earth masses
  orbitRadius: number; // AU from Sun
  orbitSpeed: number; // Years for full orbit
  rotationSpeed: number; // Hours for full rotation
  color: string;
  composition: string;
  moons: number;
  description: string;
  funFact: string;
}

export const planetsData: PlanetData[] = [
  {
    name: "Sun",
    radius: 109,
    mass: 333000,
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 609.12,
    color: "#FDB813",
    composition: "Hydrogen (73%), Helium (25%), heavier elements (2%)",
    moons: 0,
    description: "The Sun is the star at the center of our Solar System. It's a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field.",
    funFact: "The Sun accounts for 99.86% of the mass in the Solar System!"
  },
  {
    name: "Mercury",
    radius: 0.383,
    mass: 0.055,
    orbitRadius: 0.39,
    orbitSpeed: 0.24,
    rotationSpeed: 1407.6,
    color: "#8C7853",
    composition: "Rocky planet with large iron core",
    moons: 0,
    description: "Mercury is the smallest planet in the Solar System and the closest to the Sun. It has extreme temperature variations due to its lack of atmosphere.",
    funFact: "A year on Mercury is just 88 Earth days, but a day on Mercury is 176 Earth days long!"
  },
  {
    name: "Venus",
    radius: 0.949,
    mass: 0.815,
    orbitRadius: 0.72,
    orbitSpeed: 0.62,
    rotationSpeed: 5832.5,
    color: "#FFC649",
    composition: "Rocky planet with thick CO2 atmosphere",
    moons: 0,
    description: "Venus is Earth's twin in size but vastly different in environment. Its thick atmosphere traps heat, making it the hottest planet in our solar system.",
    funFact: "Venus rotates backwards compared to most planets - the Sun rises in the west!"
  },
  {
    name: "Earth",
    radius: 1,
    mass: 1,
    orbitRadius: 1,
    orbitSpeed: 1,
    rotationSpeed: 23.9,
    color: "#4A90E2",
    composition: "Rocky planet with nitrogen-oxygen atmosphere",
    moons: 1,
    description: "Earth is the only known planet to harbor life. Its atmosphere, liquid water, and magnetic field create perfect conditions for biological diversity.",
    funFact: "Earth is the only planet not named after a Greek or Roman god!"
  },
  {
    name: "Mars",
    radius: 0.532,
    mass: 0.107,
    orbitRadius: 1.52,
    orbitSpeed: 1.88,
    rotationSpeed: 24.6,
    color: "#E27B58",
    composition: "Rocky planet with thin CO2 atmosphere",
    moons: 2,
    description: "Mars, the Red Planet, has the largest volcano and deepest canyon in the Solar System. Evidence suggests it once had liquid water on its surface.",
    funFact: "Mars has the tallest mountain in the solar system: Olympus Mons, nearly 3 times the height of Mount Everest!"
  },
  {
    name: "Jupiter",
    radius: 11.21,
    mass: 317.8,
    orbitRadius: 5.2,
    orbitSpeed: 11.86,
    rotationSpeed: 9.9,
    color: "#C88B3A",
    composition: "Gas giant: hydrogen and helium",
    moons: 95,
    description: "Jupiter is the largest planet in our Solar System. Its Great Red Spot is a storm that has been raging for at least 400 years.",
    funFact: "Jupiter's magnetic field is 20,000 times stronger than Earth's!"
  },
  {
    name: "Saturn",
    radius: 9.45,
    mass: 95.2,
    orbitRadius: 9.54,
    orbitSpeed: 29.46,
    rotationSpeed: 10.7,
    color: "#FAD5A5",
    composition: "Gas giant: hydrogen and helium with spectacular rings",
    moons: 146,
    description: "Saturn is famous for its magnificent ring system made of ice and rock particles. It's the least dense planet - it would float in water!",
    funFact: "Saturn's rings are only about 30 feet thick but extend 175,000 miles from the planet!"
  },
  {
    name: "Uranus",
    radius: 4.01,
    mass: 14.5,
    orbitRadius: 19.19,
    orbitSpeed: 84.01,
    rotationSpeed: 17.2,
    color: "#4FD0E7",
    composition: "Ice giant: water, methane, and ammonia",
    moons: 27,
    description: "Uranus rotates on its side, making it unique among planets. Its blue-green color comes from methane in its atmosphere.",
    funFact: "Uranus has the coldest planetary atmosphere in the solar system, reaching -224°C (-371°F)!"
  },
  {
    name: "Neptune",
    radius: 3.88,
    mass: 17.1,
    orbitRadius: 30.07,
    orbitSpeed: 164.8,
    rotationSpeed: 16.1,
    color: "#4166F5",
    composition: "Ice giant: water, methane, and ammonia",
    moons: 14,
    description: "Neptune is the windiest planet in the Solar System, with winds reaching 1,200 mph. It radiates more heat than it receives from the Sun.",
    funFact: "Neptune was the first planet discovered through mathematical predictions rather than observation!"
  }
];
