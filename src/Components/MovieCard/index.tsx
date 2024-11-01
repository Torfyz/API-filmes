/* eslint-disable @next/next/no-img-element */
import { Movie } from "@/Types/movie";
import { FaSpinner } from "react-icons/fa"; 
import "./index.scss";

export interface Props {
  movie: Movie;
  loading: boolean; 
}

export default function MovieCard(props: Props) {
  const { movie, loading } = props;

  return (
    <li className="movie-card">
      {loading ? ( 
        <div className="loading">
          <FaSpinner className="spinner" /> 
        </div>
      ) : (
        <>
          <div className="movie-poster">
            <img src={movie.imagem} alt={movie.titulo} />
          </div>

          <div className="movie-infos">
            <p className="movie-title">{movie.titulo}</p>
            <div className="hidden-content">
              {movie.descricao && (
                <p className="description">
                  {movie.descricao.length > 200
                    ? `${movie.descricao.substring(0, 200)}...`
                    : movie.descricao}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </li>
  );
}
