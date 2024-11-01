"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/Types/movie";
import MovieCard from "../MovieCard";
import "./index.scss";
import Navbar from "../Navbar/index";
import { FaSpinner } from "react-icons/fa";

const MOVIES_PER_PAGE = 4;

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    setLoading(true); 
    axios({
      method: "get",
      url: "https://api-filmes-fnqy.onrender.com/ListFilmes/api/filme/",
    })
      .then((response) => {
        setMovies(response.data);
        setTotalPages(Math.ceil(response.data.length / MOVIES_PER_PAGE));
        setCurrentPage(1);
      })
      .catch((error) => {
        console.error("Erro ao buscar filmes:", error);
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const filteredMovies = movies.filter((movie) =>
    movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {
    if (hasSearched) {
      if (searchTerm === "") {
        setMessage("Digite no campo de pesquisa para prosseguir");
        setTimeout(() => setMessage(""), 3000); 
      } else if (filteredMovies.length === 0) {
        setMessage("Nenhum resultado encontrado");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("");
      }
    }

    setTotalPages(Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
    setCurrentPage(1); 
  }, [searchTerm, movies, filteredMovies.length, hasSearched]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setHasSearched(true); 
  };

  
  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Navbar setSearchTerm={handleSearch} />
      <ul className="movie-list">
        {loading ? (
          <div className="loading">
            <FaSpinner className="spinner" /> Carregando filmes...
          </div>
        ) : (
          currentMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} loading={loading} /> 
          ))
        )}
      </ul>
      {message && <div className="message">{message}</div>}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próximo
        </button>
      </div>
    </>
  );
}
