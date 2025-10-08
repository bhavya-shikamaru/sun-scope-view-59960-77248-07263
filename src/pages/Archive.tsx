import { useState } from "react";
import { Calendar as CalendarIcon, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Header from "@/components/Header";
import ImageCard from "@/components/ImageCard";
import { mockImages } from "@/lib/mockData";

const Archive = () => {
  const [date, setDate] = useState<Date>();
  const [wavelength, setWavelength] = useState<string>("all");

  const filteredImages = mockImages.filter(img => {
    if (wavelength !== "all" && !img.wavelength.toLowerCase().includes(wavelength.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Archive</h1>
          <p className="text-muted-foreground">
            Browse historical solar observations and create custom timelapses
          </p>
        </div>

        {/* Filters */}
        <div className="glass rounded-lg p-6 mb-8 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Filters</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Wavelength</label>
              <Select value={wavelength} onValueChange={setWavelength}>
                <SelectTrigger>
                  <SelectValue placeholder="All wavelengths" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All wavelengths</SelectItem>
                  <SelectItem value="h-alpha">H-alpha</SelectItem>
                  <SelectItem value="continuum">Continuum</SelectItem>
                  <SelectItem value="euv">Extreme UV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Instrument</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="All instruments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All instruments</SelectItem>
                  <SelectItem value="heliocam">HelioCam v2</SelectItem>
                  <SelectItem value="heliocam-uv">HelioCam UV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button variant="outline" size="sm">
              Clear Filters
            </Button>
            <Button variant="default" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export as Timelapse
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredImages.length} observations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Archive;
