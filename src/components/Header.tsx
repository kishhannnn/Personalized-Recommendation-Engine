import { Film, Search, Heart, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (page: 'home' | 'favorites') => void;
  currentPage: 'home' | 'favorites';
}

export const Header = ({ onSearch, onNavigate, currentPage }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">CineMatch</h1>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </form>

          <div className="flex items-center gap-2">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onNavigate('home')}
              className="relative"
            >
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant={currentPage === 'favorites' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => onNavigate('favorites')}
              className="relative"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
