export interface SolarImage {
  id: string;
  title: string;
  timestamp: string;
  wavelength: string;
  instrument: string;
  exposure_ms?: number;
  image: string;
  format: string;
  license?: string;
  notes?: string;
}

export const mockImages: SolarImage[] = [
  {
    id: "s-2025-001",
    title: "H-alpha 2025-07-10 06:21 UT",
    timestamp: "2025-07-10T06:21:00Z",
    wavelength: "H-alpha 656.3 nm",
    instrument: "HelioCam v2",
    exposure_ms: 25,
    image: new URL("../assets/sample-halpha.jpg", import.meta.url).href,
    format: "jpeg",
    license: "CC-BY-4.0",
    notes: "Prominence at NE limb"
  },
  {
    id: "s-2025-002",
    title: "Continuum 2025-07-10 06:21 UT",
    timestamp: "2025-07-10T06:21:00Z",
    wavelength: "Continuum 540 nm",
    instrument: "HelioCam v2",
    exposure_ms: 15,
    image: new URL("../assets/sample-continuum.jpg", import.meta.url).href,
    format: "jpeg",
    license: "CC-BY-4.0"
  },
  {
    id: "s-2025-003",
    title: "Extreme UV 2025-07-10 06:18 UT",
    timestamp: "2025-07-10T06:18:00Z",
    wavelength: "EUV 193 Å",
    instrument: "HelioCam UV",
    exposure_ms: 8,
    image: new URL("../assets/sample-uv.jpg", import.meta.url).href,
    format: "jpeg",
    license: "CC-BY-4.0",
    notes: "Active regions visible in corona"
  },
  {
    id: "s-2025-004",
    title: "H-alpha 2025-07-10 05:45 UT",
    timestamp: "2025-07-10T05:45:00Z",
    wavelength: "H-alpha 656.3 nm",
    instrument: "HelioCam v2",
    image: new URL("../assets/sample-halpha.jpg", import.meta.url).href,
    format: "jpeg"
  },
  {
    id: "s-2025-005",
    title: "Continuum 2025-07-10 05:30 UT",
    timestamp: "2025-07-10T05:30:00Z",
    wavelength: "Continuum 540 nm",
    instrument: "HelioCam v2",
    image: new URL("../assets/sample-continuum.jpg", import.meta.url).href,
    format: "jpeg"
  },
  {
    id: "s-2025-006",
    title: "Extreme UV 2025-07-10 05:15 UT",
    timestamp: "2025-07-10T05:15:00Z",
    wavelength: "EUV 193 Å",
    instrument: "HelioCam UV",
    image: new URL("../assets/sample-uv.jpg", import.meta.url).href,
    format: "jpeg"
  }
];
