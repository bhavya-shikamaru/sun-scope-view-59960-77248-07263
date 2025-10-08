import { Shield, Eye, Telescope, Waves, Sun, Zap } from "lucide-react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Learn = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container py-8 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Education Hub</h1>
          <p className="text-muted-foreground">
            Learn about solar observation, wavelengths, and how to safely study our star
          </p>
        </div>

        {/* Safety Warning */}
        <Card className="border-destructive mb-8 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-destructive">Safety First</CardTitle>
                <CardDescription>Critical information for solar observation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">
              Never look directly at the Sun without proper solar filters designed specifically for solar observation.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Regular sunglasses, even very dark ones, are NOT safe for solar viewing</li>
              <li>• Camera viewfinders and telescopes require specialized solar filters</li>
              <li>• Only use filters marked ISO 12312-2 for direct solar viewing</li>
              <li>• All images on HelioView are captured with professional equipment and are safe to view on screen</li>
            </ul>
            <p className="text-sm text-destructive font-medium">
              We provide educational data and images. For observation advice, consult professional astronomy organizations.
            </p>
          </CardContent>
        </Card>

        {/* Understanding Wavelengths */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Understanding Solar Wavelengths</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-red-500/20 flex items-center justify-center mb-2">
                  <Waves className="h-5 w-5 text-red-500" />
                </div>
                <CardTitle>H-alpha (656.3 nm)</CardTitle>
                <CardDescription>The chromosphere revealer</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  H-alpha observations show the Sun's chromosphere — the layer just above the visible surface. 
                  At this deep red wavelength, we can see:
                </p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Solar prominences and filaments</li>
                  <li>• Active regions and plages</li>
                  <li>• Solar flares as they erupt</li>
                  <li>• The dynamic magnetic field structure</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
                <CardTitle>Continuum (540 nm)</CardTitle>
                <CardDescription>White light observations</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Continuum or white light observations show the Sun's photosphere — the visible surface. 
                  This reveals:
                </p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Sunspots and their structure</li>
                  <li>• Granulation patterns</li>
                  <li>• Faculae near the limb</li>
                  <li>• The overall solar disk</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                </div>
                <CardTitle>Extreme UV (193 Å)</CardTitle>
                <CardDescription>Corona and active regions</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  Extreme ultraviolet imaging requires space-based telescopes and shows the Sun's corona 
                  at extremely high temperatures:
                </p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Coronal loops and structures</li>
                  <li>• Coronal mass ejections (CMEs)</li>
                  <li>• Active region heating</li>
                  <li>• Plasma at ~1-2 million Kelvin</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader>
                <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center mb-2">
                  <Telescope className="h-5 w-5 text-accent" />
                </div>
                <CardTitle>Multi-wavelength Analysis</CardTitle>
                <CardDescription>Combining observations</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>
                  By comparing images across different wavelengths, scientists can:
                </p>
                <ul className="mt-2 space-y-1 ml-4">
                  <li>• Map solar features across atmospheric layers</li>
                  <li>• Track energy flow from photosphere to corona</li>
                  <li>• Predict space weather events</li>
                  <li>• Understand magnetic field evolution</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="glass rounded-lg p-6">
            <AccordionItem value="item-1">
              <AccordionTrigger>How often are images updated?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Our live feed updates approximately every 30 seconds when solar conditions permit and 
                instruments are operational. Archive images span back to the start of the HelioCam 
                project in 2024.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I use these images for my research or presentation?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Yes! Most images are licensed under CC-BY-4.0, meaning you can use them with proper 
                attribution. Check the metadata panel on each image for specific licensing information.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What equipment is used to capture these images?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Images are captured using the HelioCam series of solar telescopes, featuring dedicated 
                H-alpha, continuum, and UV imaging systems. Each instrument uses specialized filters 
                and detectors optimized for solar observation.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How can I contribute my own solar images?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                We welcome community contributions! Use the Upload page to submit your images. All uploads 
                go through a review process to ensure quality and proper metadata. You'll need to provide 
                information about your equipment, filters, and observation conditions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>What's the difference between filaments and prominences?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                They're the same structures! When we see them against the solar disk, we call them 
                filaments (they appear dark). When they extend beyond the limb and we see them against 
                the dark sky, we call them prominences (they appear bright). Both are clouds of cooler, 
                denser plasma suspended in the corona by magnetic fields.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Instrument Glossary */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Instrument Glossary</h2>
          
          <Card>
            <CardContent className="p-6">
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-foreground mb-1">HelioCam v2</dt>
                  <dd className="text-muted-foreground">
                    Primary H-alpha and continuum solar telescope with 100mm aperture and dedicated 
                    0.7Å H-alpha filter system.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground mb-1">HelioCam UV</dt>
                  <dd className="text-muted-foreground">
                    Extreme ultraviolet imaging system capturing multiple wavelengths including 193Å, 
                    304Å, and 171Å.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground mb-1">Exposure Time</dt>
                  <dd className="text-muted-foreground">
                    Duration the detector collects light, measured in milliseconds. Typical solar 
                    exposures range from 5-50ms depending on wavelength and seeing conditions.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-foreground mb-1">Limb</dt>
                  <dd className="text-muted-foreground">
                    The apparent edge of the solar disk as seen from Earth. Features at the limb 
                    can appear dramatically different due to viewing angle.
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Learn;
