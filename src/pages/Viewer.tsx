import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, ZoomIn, ZoomOut, Grid3x3, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { mockImages } from "@/lib/mockData";
import { useState } from "react";

const Viewer = () => {
  const { id } = useParams();
  const image = mockImages.find(img => img.id === id);
  
  const [brightness, setBrightness] = useState([100]);
  const [contrast, setContrast] = useState([100]);
  const [showGrid, setShowGrid] = useState(false);
  const [showScale, setShowScale] = useState(false);

  if (!image) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Image not found</h1>
          <Button asChild>
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container py-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Gallery
          </Link>
        </Button>

        <div className="grid lg:grid-cols-[1fr_400px] gap-6">
          {/* Main Image Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{image.title}</h1>
                <Badge variant="secondary" className="mt-2">{image.wavelength}</Badge>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="relative aspect-square bg-card rounded-lg overflow-hidden shadow-lg">
              <img 
                src={image.image} 
                alt={image.title}
                className="w-full h-full object-cover"
                style={{
                  filter: `brightness(${brightness[0]}%) contrast(${contrast[0]}%)`
                }}
              />
              {showGrid && (
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border border-accent/30" />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Controls */}
            <div className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download Original
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Download Processed
              </Button>
            </div>
          </div>

          {/* Right Panel - Metadata & Controls */}
          <div className="space-y-6">
            {/* Metadata */}
            <div className="glass rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-semibold">Metadata</h2>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instrument:</span>
                  <span className="font-medium">{image.instrument}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wavelength:</span>
                  <span className="font-medium">{image.wavelength}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="font-medium">
                    {new Date(image.timestamp).toLocaleString()}
                  </span>
                </div>
                {image.exposure_ms && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Exposure:</span>
                    <span className="font-medium">{image.exposure_ms}ms</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium uppercase">{image.format}</span>
                </div>
                {image.license && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">License:</span>
                    <span className="font-medium">{image.license}</span>
                  </div>
                )}
              </div>
              {image.notes && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium mb-1">Notes:</p>
                    <p className="text-sm text-muted-foreground">{image.notes}</p>
                  </div>
                </>
              )}
            </div>

            {/* Image Processing */}
            <div className="glass rounded-lg p-6 space-y-6">
              <h2 className="text-lg font-semibold">Image Processing</h2>
              <Separator />
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Brightness: {brightness[0]}%</Label>
                  <Slider 
                    value={brightness}
                    onValueChange={setBrightness}
                    min={50}
                    max={150}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contrast: {contrast[0]}%</Label>
                  <Slider 
                    value={contrast}
                    onValueChange={setContrast}
                    min={50}
                    max={150}
                    step={1}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="grid" className="cursor-pointer">Show Grid</Label>
                  <Switch id="grid" checked={showGrid} onCheckedChange={setShowGrid} />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="scale" className="cursor-pointer">Show Scale</Label>
                  <Switch id="scale" checked={showScale} onCheckedChange={setShowScale} />
                </div>
              </div>

              <Button variant="outline" className="w-full" size="sm">
                <Grid3x3 className="mr-2 h-4 w-4" /> Reset All
              </Button>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="glass rounded-lg p-6 space-y-3">
              <h3 className="text-sm font-semibold">Keyboard Shortcuts</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>+/-</span>
                  <span>Zoom in/out</span>
                </div>
                <div className="flex justify-between">
                  <span>Arrow keys</span>
                  <span>Pan image</span>
                </div>
                <div className="flex justify-between">
                  <span>O</span>
                  <span>Toggle overlays</span>
                </div>
                <div className="flex justify-between">
                  <span>R</span>
                  <span>Reset view</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
