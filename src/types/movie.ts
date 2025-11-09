export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  description: string;
  director: string;
  cast: string[];
  poster: string;
  backdrop: string;
  duration: number;
  isFavorite?: boolean;
  userRating?: number;
}

export interface Recommendation {
  movieId: string;
  score: number;
  reason: string;
}
