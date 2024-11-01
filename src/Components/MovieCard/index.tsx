/* eslint-disable @next/next/no-img-element */
import { Movie } from "@/Types/movie";
import "./index.scss";

export interface Props {
  movie: Movie;
}

export default function MovieCard(props: Props) {
  const movie = props.movie;
  return (
    <li className="movie-card">
      <div className="movie-poster">
        <img
          src={movie.imagem}
          alt={movie.titulo}
        />
      </div>

      <div className="movie-infos">
        <p className="movie-title">{movie.titulo}</p>
        <div className="hidden-content">
          {movie.descricao &&
          <p className="description">{movie.descricao.length > 200 ? `${movie.descricao.substring(0, 200)}...` : movie.descricao}</p>}
        </div>
      </div>
    </li>
  );
}
