import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, Heart, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getRecommendations } from "@/lib/recommendations";
import { MovieCard } from "./MovieCard";

interface MovieDetailProps {
  movie: Movie;
  onClose: () => void;
  onMovieSelect: (movieId: string) => void;
  onFavoriteToggle: (movieId: string) => void;
}

export const MovieDetail = ({ movie, onClose, onMovieSelect, onFavoriteToggle }: MovieDetailProps) => {
  const recommendations = getRecommendations(movie);

  return (
    <div className="fixed inset-0 z-50 bg-background overflow-y-auto animate-fade-in">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-10"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="relative w-full h-[60vh]">
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="grid md:grid-cols-[300px,1fr] gap-8">
          <div>
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-full rounded-lg shadow-2xl"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {movie.title}
              </h1>
              <div className="flex gap-2 flex-wrap mb-4">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{movie.duration} min</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-foreground font-semibold text-lg">
                  {movie.rating}/10
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="gap-2"
              onClick={() => onFavoriteToggle(movie.id)}
            >
              <Heart className={movie.isFavorite ? "fill-primary text-primary" : ""} />
              {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
              <p className="text-foreground/80 leading-relaxed">
                {movie.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Director</h3>
                  <p className="text-muted-foreground">{movie.director}</p>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cast</h3>
                  <p className="text-muted-foreground">{movie.cast.join(", ")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            More Like This
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommendations.map((rec) => (
              <MovieCard
                key={rec.id}
                movie={rec}
                onClick={() => onMovieSelect(rec.id)}
                onFavoriteToggle={onFavoriteToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
