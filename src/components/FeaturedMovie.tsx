import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Info, Star } from "lucide-react";

interface FeaturedMovieProps {
  movie: Movie;
  onMoreInfo: () => void;
}

export const FeaturedMovie = ({ movie, onMoreInfo }: FeaturedMovieProps) => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden rounded-lg animate-fade-in">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
      
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-4">
            <div className="flex gap-2 flex-wrap">
              {movie.genre.map((genre) => (
                <Badge key={genre} variant="secondary" className="text-sm">
                  {genre}
                </Badge>
              ))}
            </div>
            
            <h2 className="text-5xl font-bold text-foreground">
              {movie.title}
            </h2>
            
            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration} min</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-foreground font-semibold">{movie.rating}</span>
              </div>
            </div>
            
            <p className="text-lg text-foreground/90 line-clamp-3">
              {movie.description}
            </p>
            
            <div className="flex gap-3 pt-2">
              <Button size="lg" className="gap-2">
                <Play className="h-5 w-5" />
                Watch Now
              </Button>
              <Button size="lg" variant="secondary" className="gap-2" onClick={onMoreInfo}>
                <Info className="h-5 w-5" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
