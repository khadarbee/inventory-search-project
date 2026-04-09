import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductRow";

function App() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(""); // ✅ NEW

  const handleSearch = async () => {
    try {
      setLoading(true);
      setHasSearched(true);
      setError(""); // reset error

      const params = new URLSearchParams({
        q,
        category,
        minPrice,
        maxPrice,
      });

      const res = await fetch(`https://inventory-search-project-9cfg.onrender.com/search?${params}`);

      // ✅ HANDLE BACKEND ERROR
      if (!res.ok) {
        const err = await res.json();
        setError(err.message);
        setResults([]);
        return;
      }

      const data = await res.json();
      setResults(data);

    } catch (error) {
      setError("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🔍 Inventory Search</h1>

      <SearchBar
        q={q}
        setQ={setQ}
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        handleSearch={handleSearch}
      />

      {/* ❗ ERROR MESSAGE */}
      {error && <p className="error">{error}</p>}

      {/* Initial message */}
      {!hasSearched && (
        <p className="no-data">🔍 Start searching products</p>
      )}

      {/* Loader */}
      {loading && <div className="loader"></div>}

      {/* Results */}
      {!loading && hasSearched && !error && (
        <ProductTable results={results} />
      )}
    </div>
  );
}

export default App;