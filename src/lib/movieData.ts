import { Movie } from "@/types/movie";

// Sample movie data - will be replaced with database
export const movies: Movie[] = [
  {
    id: "1",
    title: "The Stellar Voyage",
    year: 2024,
    genre: ["Sci-Fi", "Adventure"],
    rating: 8.7,
    description: "A crew of explorers ventures beyond the known galaxy to discover the secrets of an ancient civilization.",
    director: "Emma Rodriguez",
    cast: ["John Smith", "Sarah Chen", "Michael Brown"],
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=600&fit=crop",
    duration: 142,
  },
  {
    id: "2",
    title: "Echoes of Yesterday",
    year: 2023,
    genre: ["Drama", "Romance"],
    rating: 8.2,
    description: "A touching story about love, loss, and the memories that shape us through different timelines.",
    director: "David Park",
    cast: ["Emily Watson", "James Lee", "Sophie Turner"],
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=600&fit=crop",
    duration: 126,
  },
  {
    id: "3",
    title: "Shadow Protocol",
    year: 2024,
    genre: ["Action", "Thriller"],
    rating: 7.9,
    description: "An elite spy must uncover a global conspiracy before time runs out.",
    director: "Marcus Johnson",
    cast: ["Chris Evans", "Ana de Armas", "Tom Hardy"],
    poster: "https://images.unsplash.com/photo-1616530940355-351fabd9524b?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200&h=600&fit=crop",
    duration: 135,
  },
  {
    id: "4",
    title: "The Quantum Paradox",
    year: 2023,
    genre: ["Sci-Fi", "Mystery"],
    rating: 8.5,
    description: "Scientists discover a way to communicate across parallel universes, but at what cost?",
    director: "Lisa Chang",
    cast: ["Oscar Isaac", "Tilda Swinton", "Benedict Wong"],
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=600&fit=crop",
    duration: 148,
  },
  {
    id: "5",
    title: "Midnight in Paris",
    year: 2023,
    genre: ["Comedy", "Romance"],
    rating: 8.0,
    description: "A charming tale of love and art in the streets of Paris during a magical summer.",
    director: "Sophie Moreau",
    cast: ["Timothée Chalamet", "Florence Pugh", "Marion Cotillard"],
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=600&fit=crop",
    duration: 118,
  },
  {
    id: "6",
    title: "Digital Uprising",
    year: 2024,
    genre: ["Sci-Fi", "Action"],
    rating: 7.6,
    description: "In a world dominated by AI, a group of hackers fights to preserve human freedom.",
    director: "Alex Kumar",
    cast: ["Zendaya", "John Boyega", "Dev Patel"],
    poster: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=600&fit=crop",
    duration: 130,
  },
  {
    id: "7",
    title: "The Lost Kingdom",
    year: 2023,
    genre: ["Adventure", "Fantasy"],
    rating: 8.3,
    description: "An epic journey through mystical lands to restore balance to a forgotten realm.",
    director: "Peter Jackson Jr.",
    cast: ["Anya Taylor-Joy", "Henry Cavill", "Idris Elba"],
    poster: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    duration: 156,
  },
  {
    id: "8",
    title: "Crimson Horizon",
    year: 2024,
    genre: ["Western", "Drama"],
    rating: 8.1,
    description: "A gripping tale of revenge and redemption set in the dying days of the Old West.",
    director: "Quentin Martinez",
    cast: ["Mahershala Ali", "Carey Mulligan", "Jeff Bridges"],
    poster: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=600&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200&h=600&fit=crop",
    duration: 140,
  },
];

export const getFeaturedMovies = () => movies.slice(0, 3);

export const getMovieById = (id: string) => movies.find((m) => m.id === id);

export const searchMovies = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.genre.some((g) => g.toLowerCase().includes(lowerQuery)) ||
      movie.director.toLowerCase().includes(lowerQuery)
  );
};

export const getMoviesByGenre = (genre: string) => {
  return movies.filter((movie) => movie.genre.includes(genre));
};
