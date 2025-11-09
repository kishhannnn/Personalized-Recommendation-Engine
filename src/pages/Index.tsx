import { useState } from "react";
import { Header } from "@/components/Header";
import { FeaturedMovie } from "@/components/FeaturedMovie";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetail } from "@/components/MovieDetail";
import { movies, getFeaturedMovies, searchMovies } from "@/lib/movieData";
import { toast } from "sonner";

const Index = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchResults, setSearchResults] = useState<typeof movies | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'favorites'>('home');

  const featuredMovies = getFeaturedMovies();
  const selectedMovie = selectedMovieId
    ? movies.find((m) => m.id === selectedMovieId)
    : null;

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      setCurrentPage('home');
      return;
    }
    
    const results = searchMovies(query);
    setSearchResults(results);
    setCurrentPage('home');
    
    if (results.length === 0) {
      toast.info("No movies found", {
        description: `No results for "${query}". Try a different search.`,
      });
    }
  };

  const handleFavoriteToggle = (movieId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(movieId)) {
        newFavorites.delete(movieId);
        toast.success("Removed from favorites");
      } else {
        newFavorites.add(movieId);
        toast.success("Added to favorites");
      }
      return newFavorites;
    });
  };

  const displayMovies = searchResults || movies;
  const favoriteMovies = movies.filter((m) => favorites.has(m.id));

  const moviesWithFavorites = displayMovies.map((m) => ({
    ...m,
    isFavorite: favorites.has(m.id),
  }));

  const favoriteMoviesWithFlag = favoriteMovies.map((m) => ({
    ...m,
    isFavorite: true,
  }));

  if (selectedMovie) {
    return (
      <MovieDetail
        movie={{ ...selectedMovie, isFavorite: favorites.has(selectedMovie.id) }}
        onClose={() => setSelectedMovieId(null)}
        onMovieSelect={setSelectedMovieId}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearch={handleSearch}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && !searchResults && (
          <>
            <section className="mb-12">
              <FeaturedMovie
                movie={featuredMovies[0]}
                onMoreInfo={() => setSelectedMovieId(featuredMovies[0].id)}
              />
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6">Popular Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {moviesWithFavorites.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {currentPage === 'home' && searchResults && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Search Results ({searchResults.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {moviesWithFavorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovieId(movie.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>
          </section>
        )}

        {currentPage === 'favorites' && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              My Favorites ({favoriteMovies.length})
            </h2>
            {favoriteMovies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No favorites yet. Start adding movies you love!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {favoriteMoviesWithFlag.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default Index;
