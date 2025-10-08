import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Play, Pause } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

type DateTimeControlProps = {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  isAnimating: boolean;
  onToggleAnimation: () => void;
};

const DateTimeControl = ({
  selectedDate,
  onDateChange,
  isAnimating,
  onToggleAnimation,
}: DateTimeControlProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const adjustTime = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    onDateChange(newDate);
  };

  return (
    <Card className="absolute top-6 right-6 p-4 bg-card/80 backdrop-blur-sm border-border">
      <h2 className="text-lg font-semibold mb-3 text-foreground flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        Date & Time
      </h2>
      
      <div className="space-y-3">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(selectedDate, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                if (date) {
                  onDateChange(date);
                  setIsCalendarOpen(false);
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="text-sm text-center text-muted-foreground">
          {format(selectedDate, "h:mm a")}
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => adjustTime(-30)} className="flex-1">
            -30d
          </Button>
          <Button size="sm" variant="outline" onClick={() => adjustTime(-1)} className="flex-1">
            -1d
          </Button>
          <Button size="sm" variant="outline" onClick={() => adjustTime(1)} className="flex-1">
            +1d
          </Button>
          <Button size="sm" variant="outline" onClick={() => adjustTime(30)} className="flex-1">
            +30d
          </Button>
        </div>

        <Button
          variant={isAnimating ? "destructive" : "default"}
          className="w-full"
          onClick={onToggleAnimation}
        >
          {isAnimating ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Animate
            </>
          )}
        </Button>

        <Button
          size="sm"
          variant="secondary"
          className="w-full"
          onClick={() => onDateChange(new Date())}
        >
          Reset to Today
        </Button>
      </div>
    </Card>
  );
};

export default DateTimeControl;
