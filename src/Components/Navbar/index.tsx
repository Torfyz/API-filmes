import "./index.scss";
import { FaSearch, FaHome } from "react-icons/fa";

export default function Navbar({
  setSearchTerm,
}: {
  setSearchTerm: (term: string) => void;
}) {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchInput = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    if (searchInput.trim()) {
      setSearchTerm(searchInput);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h1 className="page-title">Filmes</h1>
      <div className="SearchBar">
        <form className="SearchBar" onSubmit={handleSearch}>
          <input type="text" placeholder="Pesquisar filmes..." />
          <button type="submit" className="button-icon">
            <FaSearch />
          </button>
        </form>
        <button onClick={handleRefresh} className="button-icon">
          <FaHome />
        </button>
      </div>
    </nav>
  );
}
