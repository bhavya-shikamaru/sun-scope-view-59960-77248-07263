import { Link } from "react-router-dom";
import { ArrowRight, RefreshCw, Eye, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import { mockImages } from "@/lib/mockData";
import heroSun from "@/assets/hero-sun.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroSun})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="container relative z-10 text-center space-y-6 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient">
            The Sun, now.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Live multi-wavelength imaging, archives, and timelapse tools — for students, hobbyists, and educators.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="shadow-glow">
              <Link to="/archive">
                View Live Feed <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/learn">
                <BookOpen className="mr-2 h-4 w-4" /> Learn More
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Data provided for educational use. See the safety & credits page.
          </p>
        </div>
      </section>

      {/* Live Grid Section */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Observations</h2>
            <p className="text-muted-foreground">
              Live captures from multiple observatories. Click any tile to explore.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Auto-refresh: 30s
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockImages.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>
      </section>

      {/* Educational Spotlights */}
      <section className="bg-secondary/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Understanding Solar Observations</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="glass rounded-lg p-6 space-y-3">
              <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">What is H-alpha?</h3>
              <p className="text-muted-foreground">
                H-alpha reveals the Sun's chromosphere — the layer just above the visible surface. 
                At 656.3 nanometers, this deep red wavelength highlights filaments, prominences, 
                and solar flares, showing us the dynamic magnetic structures that drive space weather.
              </p>
            </div>
            
            <div className="glass rounded-lg p-6 space-y-3">
              <div className="h-12 w-12 rounded-full bg-destructive flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-destructive-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Safety First</h3>
              <p className="text-muted-foreground">
                Never view the Sun directly without proper solar filters designed for solar observation. 
                The images on HelioView are captured with specialized equipment and are safe to view. 
                We provide data, not viewing advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>HelioView — Educational solar observation platform</p>
          <p className="mt-2">
            <Link to="/learn" className="hover:text-foreground transition-colors">Safety</Link>
            {" · "}
            <Link to="/api" className="hover:text-foreground transition-colors">API</Link>
            {" · "}
            <Link to="/learn" className="hover:text-foreground transition-colors">Credits</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
