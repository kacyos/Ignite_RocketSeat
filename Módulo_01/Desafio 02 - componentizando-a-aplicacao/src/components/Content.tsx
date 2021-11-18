import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { api } from "../services/api";
import "../styles/content.scss";

interface GenreResponseProps {
  id: number;
  name: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ id, name }: GenreResponseProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then((response) => {
      setMovies(response.data);
    });
  }, [id]);

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span>{name}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
