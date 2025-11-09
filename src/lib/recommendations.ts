import { Movie, Recommendation } from "@/types/movie";
import { movies } from "./movieData";

// Simple recommendation algorithm based on genre matching and ratings
export const getRecommendations = (movie: Movie, count: number = 4): Movie[] => {
  const recommendations = movies
    .filter((m) => m.id !== movie.id)
    .map((m) => {
      let score = 0;
      
      // Genre matching (most important factor)
      const commonGenres = m.genre.filter((g) => movie.genre.includes(g));
      score += commonGenres.length * 3;
      
      // Rating similarity
      const ratingDiff = Math.abs(m.rating - movie.rating);
      score += (10 - ratingDiff) / 2;
      
      // Year proximity
      const yearDiff = Math.abs(m.year - movie.year);
      score += yearDiff <= 2 ? 2 : 0;
      
      return { movie: m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.movie);

  return recommendations;
};

export const getPersonalizedRecommendations = (
  favoriteMovies: Movie[],
  count: number = 6
): Movie[] => {
  if (favoriteMovies.length === 0) {
    // Return top rated movies if no favorites
    return movies.sort((a, b) => b.rating - a.rating).slice(0, count);
  }

  const favoriteIds = new Set(favoriteMovies.map((m) => m.id));
  const genreScores = new Map<string, number>();

  // Calculate genre preferences
  favoriteMovies.forEach((movie) => {
    movie.genre.forEach((genre) => {
      genreScores.set(genre, (genreScores.get(genre) || 0) + 1);
    });
  });

  const recommendations = movies
    .filter((m) => !favoriteIds.has(m.id))
    .map((m) => {
      let score = 0;
      
      // Match with preferred genres
      m.genre.forEach((genre) => {
        score += (genreScores.get(genre) || 0) * 2;
      });
      
      // Boost high-rated movies
      score += m.rating;
      
      return { movie: m, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.movie);

  return recommendations;
};
