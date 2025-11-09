import { Movie } from "@/types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  onFavoriteToggle?: (movieId: string) => void;
}

export const MovieCard = ({ movie, onClick, onFavoriteToggle }: MovieCardProps) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    onFavoriteToggle?.(movie.id);
  };

  return (
    <Card 
      className="group overflow-hidden border-border bg-card hover:border-primary transition-all duration-300 cursor-pointer animate-fade-in"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
          onClick={handleFavoriteClick}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </Button>

        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-1 flex-wrap mb-2">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{movie.year}</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-foreground font-medium">{movie.rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
