import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sun, Globe } from "lucide-react";

type PlanetSelectorProps = {
  selectedBody: string;
  onSelect: (body: string) => void;
  planets: string[];
};

const PlanetSelector = ({ selectedBody, onSelect, planets }: PlanetSelectorProps) => {
  return (
    <Card className="absolute top-6 left-6 p-4 bg-card/80 backdrop-blur-sm border-border">
      <h2 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
        <Sun className="w-5 h-5 text-primary" />
        Solar System
      </h2>
      <div className="space-y-2">
        {planets.map((planet) => (
          <Button
            key={planet}
            variant={selectedBody === planet ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(planet)}
            className="w-full justify-start"
          >
            {planet === "Sun" ? (
              <Sun className="w-4 h-4 mr-2" />
            ) : (
              <Globe className="w-4 h-4 mr-2" />
            )}
            {planet}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default PlanetSelector;
