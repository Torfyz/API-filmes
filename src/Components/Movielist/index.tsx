"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "@/Types/movie";
import MovieCard from "../MovieCard";
import "./index.scss";
import Navbar from "../Navbar/index";

const MOVIES_PER_PAGE = 4; // Número de filmes por página

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false); // Estado para controlar a tentativa de pesquisa

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    axios({
      method: "get",
      url: "https://api-filmes-fnqy.onrender.com/ListFilmes/api/filme/",
    }).then((response) => {
      setMovies(response.data);
      setTotalPages(Math.ceil(response.data.length / MOVIES_PER_PAGE));
      setCurrentPage(1);
    })
    .catch((error) => {
      console.error("Erro ao buscar filmes:", error);
    });
  };

  // Filtra os filmes com base no termo de pesquisa
  const filteredMovies = movies.filter(movie =>
    movie.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Atualiza a mensagem conforme a pesquisa
  useEffect(() => {
    if (hasSearched) {
      if (searchTerm === "") {
        setMessage("Digite no campo de pesquisa para prosseguir");
        setTimeout(() => setMessage(""), 3000); // Mensagem desaparece após 3 segundos
      } else if (filteredMovies.length === 0) {
        setMessage("Nenhum resultado encontrado");
        setTimeout(() => setMessage(""), 3000); // Mensagem desaparece após 3 segundos
      } else {
        setMessage(""); // Limpa a mensagem se houver resultados
      }
    }
    
    setTotalPages(Math.ceil(filteredMovies.length / MOVIES_PER_PAGE));
    setCurrentPage(1); // Resetar para a primeira página ao mudar o filtro
  }, [searchTerm, movies, filteredMovies.length, hasSearched]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setHasSearched(true); // Marca que o usuário tentou pesquisar
  };

  // Lógica de paginação
  const indexOfLastMovie = currentPage * MOVIES_PER_PAGE;
  const indexOfFirstMovie = indexOfLastMovie - MOVIES_PER_PAGE;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

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
        {currentMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
      {message && <div className="message">{message}</div>}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Próximo</button>
      </div>
    </>
  );
}
