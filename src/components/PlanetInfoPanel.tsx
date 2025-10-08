import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { planetsData } from '@/lib/planetData';
import { cn } from '@/lib/utils';

interface PlanetInfoPanelProps {
  planet: typeof planetsData[0];
  onClose: () => void;
}

type Section = 'system' | 'encyclopedia' | 'structure';

const PlanetInfoPanel = ({ planet, onClose }: PlanetInfoPanelProps) => {
  const [activeSection, setActiveSection] = useState<Section>('encyclopedia');

  const menuItems: { id: Section; label: string }[] = [
    { id: 'system', label: 'PLANET SYSTEM' },
    { id: 'encyclopedia', label: 'ENCYCLOPEDIA' },
    { id: 'structure', label: 'STRUCTURE' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -400 }}
      transition={{ type: "spring", damping: 25 }}
      className="absolute left-0 top-0 bottom-0 w-[540px] z-20"
    >
      <Card className="h-full glass border-primary/30 overflow-hidden flex flex-col bg-background/95">
        {/* Header */}
        <div className="relative border-b border-primary/30 clip-path-hexagon-header">
          <div className="p-6 pb-8">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 border border-primary/50"
              onClick={onClose}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <div className="text-center">
              <h1 className="text-5xl font-display font-bold text-white tracking-wider">
                {planet.name.toUpperCase()}
              </h1>
              <p className="text-sm text-primary mt-1 tracking-widest">
                PLANET
              </p>
            </div>
          </div>
          
          {/* Hexagonal border effect */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>

        {/* Navigation Menu */}
        <div className="p-4 space-y-2 border-b border-primary/20">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full text-left px-6 py-3 rounded-lg border transition-all",
                "font-display tracking-wider text-sm",
                activeSection === item.id
                  ? "bg-primary/20 border-primary text-primary shadow-glow"
                  : "border-primary/30 text-muted-foreground hover:border-primary/50 hover:text-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeSection === 'encyclopedia' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-4 text-white">
                  ENCYCLOPEDIA
                </h2>
                
                {/* Data table */}
                <div className="space-y-2 mb-6">
                  <DataRow label="EQUATORIAL DIAMETER" value={`${(planet.radius * 12756).toFixed(0)} KM`} />
                  <DataRow label="MASS" value={`${planet.mass.toFixed(2)} × 10²⁴ KG`} />
                  <DataRow label="MEAN DIST.FROM SUN" value={`${(planet.orbitRadius * 150).toFixed(0)} M KM`} />
                  <DataRow label="ROTATION PERIOD" value="23H 56M" />
                  <DataRow label="SOLAR ORBIT PERIOD" value={`${planet.orbitSpeed.toFixed(2)} YEAR${planet.orbitSpeed > 1 ? 'S' : ''}`} />
                  <DataRow label="SURFACE GRAVITY" value="9.8 M/S²" />
                  <DataRow label="SURFACE TEMPERATURE" value="15°C" />
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed text-foreground/90">
                  {planet.description}
                </p>
              </div>

              {/* Additional sections */}
              <div className="border-t border-primary/20 pt-4">
                <h3 className="text-lg font-display font-bold mb-3 text-white">
                  SURFACE
                </h3>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {planet.funFact}
                </p>
              </div>
            </motion.div>
          )}

          {activeSection === 'structure' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-4 text-white">
                  STRUCTURE
                </h2>
                
                <p className="text-sm leading-relaxed text-foreground/90 mb-6">
                  {planet.name}'s internal structure consists of multiple layers, each with unique properties and composition.
                </p>

                {/* Structure layers */}
                <div className="space-y-4">
                  {planet.name === 'Earth' ? (
                    <>
                      <StructureLayer
                        title="CRUST"
                        subtitle="SOLID SILICATE ROCK"
                        description="MOSTLY BASALT"
                        color="hsl(var(--primary))"
                      />
                      <StructureLayer
                        title="MANTLE"
                        subtitle="SOLID SILICATE ROCK"
                        description="The Earth's mantle is a rocky shell which accounts for 84% of the planet's volume."
                        color="hsl(var(--accent))"
                      />
                      <StructureLayer
                        title="OUTER CORE"
                        subtitle="LIQUID IRON AND NICKEL"
                        description="Responsible for Earth's magnetic field."
                        color="#ff6b35"
                      />
                      <StructureLayer
                        title="INNER CORE"
                        subtitle="DENSE SOLID IRON AND NICKEL"
                        description="Despite extreme temperatures, the inner core is solid due to immense pressure."
                        color="#ff4500"
                      />
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      Detailed structural data for {planet.name} is being compiled...
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-bold mb-4 text-white">
                  PLANET SYSTEM
                </h2>
                
                <div className="space-y-4">
                  <InfoCard title="Moons" value={planet.moons.toString()} />
                  <InfoCard title="Orbital Characteristics" value={`${planet.orbitSpeed.toFixed(2)} Earth years`} />
                  <InfoCard title="Composition" value={planet.composition} />
                  
                  <div className="glass rounded-lg p-4 border border-primary/20">
                    <h3 className="text-sm font-semibold text-primary mb-2">POSITION IN SOLAR SYSTEM</h3>
                    <p className="text-xs text-foreground/80">
                      Distance from Sun: {(planet.orbitRadius * 150).toFixed(1)} million km
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const DataRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2 px-4 bg-primary/5 border-l-2 border-primary/50">
    <span className="text-xs font-semibold text-muted-foreground tracking-wider">
      {label}
    </span>
    <span className="text-sm font-bold text-primary font-mono">
      {value}
    </span>
  </div>
);

const StructureLayer = ({
  title,
  subtitle,
  description,
  color,
}: {
  title: string;
  subtitle: string;
  description: string;
  color: string;
}) => (
  <div className="glass rounded-lg p-4 border border-primary/20">
    <div className="flex items-start gap-3">
      <div
        className="w-3 h-3 rounded-full mt-1 shadow-lg"
        style={{ backgroundColor: color, boxShadow: `0 0 15px ${color}` }}
      />
      <div className="flex-1">
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-primary mb-2">{subtitle}</p>
        <p className="text-xs text-foreground/80 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <div className="glass rounded-lg p-4 border border-primary/20">
    <h3 className="text-xs text-muted-foreground mb-1">{title}</h3>
    <p className="text-lg font-bold text-primary">{value}</p>
  </div>
);

export default PlanetInfoPanel;
