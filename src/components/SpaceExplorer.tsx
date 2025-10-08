import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Orbit, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { planetsData } from '@/lib/planetData';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SolarSystem3D from './SolarSystem3D';
import TimeControl from './TimeControl';
import PlanetInfoPanel from './PlanetInfoPanel';

const SpaceExplorer = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<typeof planetsData[0] | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeSpeed, setTimeSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showInstructions, setShowInstructions] = useState(() => {
    const stored = localStorage.getItem('hideInstructions');
    return stored !== 'true';
  });
  const { toast } = useToast();

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    localStorage.setItem('hideInstructions', 'true');
  };

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlanetSelect = (planet: typeof planetsData[0]) => {
    setSelectedPlanet(planet);
  };

  const handleTimeChange = (newTime: Date) => {
    setCurrentTime(newTime);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Solar System Canvas */}
      <SolarSystem3D 
        onPlanetSelect={handlePlanetSelect}
        selectedPlanet={selectedPlanet}
        timeSpeed={isPaused ? 0 : timeSpeed}
      />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Orbit className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: '20s' }} />
            <h1 className="text-3xl font-display font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Solar System Explorer
            </h1>
          </div>
          
          {/* Time Control Panel */}
          <div className="flex items-center gap-4">
            <TimeControl
              currentTime={currentTime}
              timeSpeed={timeSpeed}
              isPaused={isPaused}
              onSpeedChange={setTimeSpeed}
              onPauseToggle={() => setIsPaused(!isPaused)}
              onTimeChange={handleTimeChange}
            />

            <Badge variant="outline" className="glass px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              Free Exploration
            </Badge>
          </div>
        </div>
      </div>

      {/* Planet Selection Buttons */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass rounded-full p-2 flex gap-2">
          {planetsData.map((planet) => (
            <Button
              key={planet.name}
              variant={selectedPlanet?.name === planet.name ? "default" : "ghost"}
              size="sm"
              onClick={() => handlePlanetSelect(planet)}
              className="rounded-full"
              style={{
                backgroundColor: selectedPlanet?.name === planet.name 
                  ? planet.color + '40' 
                  : undefined
              }}
            >
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: planet.color }}
              />
              {planet.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Planet Info Panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <PlanetInfoPanel
            planet={selectedPlanet}
            onClose={() => setSelectedPlanet(null)}
          />
        )}
      </AnimatePresence>

      {/* Instructions */}
      {!selectedPlanet && showInstructions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute left-6 bottom-6 z-10"
        >
          <div className="glass p-4 max-w-xs rounded-lg border border-primary/30 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCloseInstructions}
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-card hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Controls:</span> Click and drag to rotate • Scroll to zoom • Click planets or use bottom bar to explore
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SpaceExplorer;
