import { Link } from "react-router-dom";
import { Download, Eye, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImageCardProps {
  id: string;
  title: string;
  timestamp: string;
  wavelength: string;
  image: string;
  instrument?: string;
}

const ImageCard = ({ id, title, timestamp, wavelength, image, instrument }: ImageCardProps) => {
  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      timeZoneName: 'short'
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gradient-card shadow-md card-hover">
      <Link to={`/viewer/${id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-card-foreground line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>{formatTime(timestamp)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="text-xs">
            {wavelength}
          </Badge>
          
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              asChild
            >
              <Link to={`/viewer/${id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                // Download logic would go here
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {instrument && (
          <p className="text-xs text-muted-foreground">
            {instrument}
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
