import { useState } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TimeControlProps {
  currentTime: Date;
  timeSpeed: number;
  isPaused: boolean;
  onSpeedChange: (speed: number) => void;
  onPauseToggle: () => void;
  onTimeChange?: (time: Date) => void;
}

const TimeControl = ({
  currentTime,
  timeSpeed,
  isPaused,
  onSpeedChange,
  onPauseToggle,
  onTimeChange
}: TimeControlProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(currentTime.getHours());
  const [selectedMinute, setSelectedMinute] = useState(currentTime.getMinutes());
  const [selectedDate, setSelectedDate] = useState<Date>(currentTime);

  const speedOptions = [1, 16, 21, 100, 1000];

  const handleApply = () => {
    if (onTimeChange && selectedDate) {
      const newTime = new Date(selectedDate);
      newTime.setHours(selectedHour);
      newTime.setMinutes(selectedMinute);
      onTimeChange(newTime);
    }
    setIsOpen(false);
  };

  const formattedDate = format(currentTime, 'yyyy MM MMM HH:mm a').toUpperCase();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Card className="glass border-primary/30 cursor-pointer hover:border-primary/50 transition-all">
          <div className="flex items-center gap-3 px-4 py-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 border border-primary/50 hover:bg-primary/20"
              onClick={(e) => {
                e.stopPropagation();
                onPauseToggle();
              }}
            >
              {isPaused ? (
                <Play className="h-4 w-4 fill-primary text-primary" />
              ) : (
                <Pause className="h-4 w-4 text-primary" />
              )}
            </Button>
            
            <div className="font-mono text-sm tracking-wider text-primary font-semibold">
              {formattedDate}
            </div>
          </div>
        </Card>
      </PopoverTrigger>

      <PopoverContent 
        className="w-[800px] p-0 glass border-primary/30" 
        align="start"
        side="bottom"
      >
        <div className="grid grid-cols-3 gap-4 p-6">
          {/* Time Selector */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-2">TIME SELECTOR</div>
              
              {/* Analog Clock Display */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Clock face */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth="0.5"
                    opacity="0.3"
                  />
                  
                  {/* Hour markers */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30 - 90) * (Math.PI / 180);
                    const x1 = 50 + 38 * Math.cos(angle);
                    const y1 = 50 + 38 * Math.sin(angle);
                    const x2 = 50 + 42 * Math.cos(angle);
                    const y2 = 50 + 42 * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="hsl(var(--primary))"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    );
                  })}
                  
                  {/* Hour hand */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 20 * Math.cos((selectedHour % 12 * 30 - 90) * (Math.PI / 180))}
                    y2={50 + 20 * Math.sin((selectedHour % 12 * 30 - 90) * (Math.PI / 180))}
                    stroke="hsl(var(--primary))"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  
                  {/* Minute hand */}
                  <line
                    x1="50"
                    y1="50"
                    x2={50 + 30 * Math.cos((selectedMinute * 6 - 90) * (Math.PI / 180))}
                    y2={50 + 30 * Math.sin((selectedMinute * 6 - 90) * (Math.PI / 180))}
                    stroke="hsl(var(--accent))"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  
                  {/* Center dot */}
                  <circle cx="50" cy="50" r="3" fill="hsl(var(--primary))" />
                </svg>
                
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary">
                  {selectedHour >= 12 ? 'PM' : 'AM'}
                </div>
              </div>

              {/* Hour/Minute Selectors */}
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 border border-primary/30"
                    onClick={() => setSelectedHour((h) => (h - 1 + 24) % 24)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center font-mono text-xl font-bold border border-primary/30 rounded px-2 py-1">
                    {String(selectedHour).padStart(2, '0')}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 border border-primary/30"
                    onClick={() => setSelectedHour((h) => (h + 1) % 24)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 border border-primary/30"
                    onClick={() => setSelectedMinute((m) => (m - 1 + 60) % 60)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="w-12 text-center font-mono text-xl font-bold border border-primary/30 rounded px-2 py-1">
                    {String(selectedMinute).padStart(2, '0')}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 border border-primary/30"
                    onClick={() => setSelectedMinute((m) => (m + 1) % 60)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full border-accent/50 text-accent hover:bg-accent/20"
                onClick={() => {
                  const now = new Date();
                  setSelectedHour(now.getHours());
                  setSelectedMinute(now.getMinutes());
                  setSelectedDate(now);
                }}
              >
                ACTUAL TIME
              </Button>

              <div className="mt-3 text-xs text-muted-foreground border border-border/50 rounded px-3 py-2">
                GMT: AUTO (+6)
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="space-y-2">
            <div className="text-xs text-muted-foreground text-center">DATE SELECTOR</div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="pointer-events-auto border border-primary/20 rounded-lg"
              classNames={{
                months: "flex flex-col",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium text-primary",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 border border-primary/30"
                ),
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                  "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent/20",
                ),
                day: cn(
                  "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/20 border border-transparent hover:border-primary/50"
                ),
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-primary",
                day_today: "bg-accent/20 text-accent-foreground border-accent/50",
                day_outside: "text-muted-foreground opacity-30",
                day_disabled: "text-muted-foreground opacity-30",
              }}
            />
          </div>

          {/* Speed Controls & Year Selector */}
          <div className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2 text-center">SIMULATION SPEED</div>
              <div className="space-y-2">
                {speedOptions.map((speed) => (
                  <Button
                    key={speed}
                    variant={timeSpeed === speed ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full justify-center font-mono",
                      timeSpeed === speed && "bg-primary/20 border-primary text-primary"
                    )}
                    onClick={() => onSpeedChange(speed)}
                  >
                    {speed}x
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground mb-2 text-center">YEAR</div>
              <div className="space-y-1">
                {[2023, 2024, 2025, 2026, 2027].map((year) => (
                  <Button
                    key={year}
                    variant={selectedDate.getFullYear() === year ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-center font-mono",
                      selectedDate.getFullYear() === year && "bg-primary/20 border border-primary text-primary"
                    )}
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setFullYear(year);
                      setSelectedDate(newDate);
                    }}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OK Button */}
        <div className="border-t border-primary/20 p-4 flex justify-end">
          <Button
            className="bg-primary/20 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold px-12"
            onClick={handleApply}
          >
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimeControl;
