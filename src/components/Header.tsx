import { Link, useLocation } from "react-router-dom";
import { Sun, Search, Upload, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="rounded-full bg-gradient-accent p-2 transition-transform group-hover:scale-110">
            <Sun className="h-5 w-5 text-accent-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">HelioView</span>
        </Link>
        
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search images, dates, instruments..." 
              className="pl-10"
            />
          </div>
        </div>
        
        <nav className="flex items-center gap-2">
          <Button 
            variant={isActive("/") ? "default" : "ghost"} 
            size="sm" 
            asChild
          >
            <Link to="/">Live</Link>
          </Button>
          <Button 
            variant={isActive("/archive") ? "default" : "ghost"} 
            size="sm" 
            asChild
          >
            <Link to="/archive">Archive</Link>
          </Button>
          <Button 
            variant={isActive("/learn") ? "default" : "ghost"} 
            size="sm" 
            asChild
          >
            <Link to="/learn">Learn</Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
          >
            <Link to="/upload">
              <Upload className="h-4 w-4" />
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            asChild
          >
            <Link to="/account">
              <User className="h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
