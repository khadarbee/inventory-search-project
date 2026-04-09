function SearchBar({
  q,
  setQ,
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  handleSearch,
}) {
  return (
    <div className="search-grid">
      <input
        placeholder="Search product"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Furniture">Furniture</option>
        <option value="Electronics">Electronics</option>
        <option value="Appliances">Appliances</option>
      </select>

      <input
        type="number"
        placeholder="Min Price"
        onChange={(e) => setMinPrice(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Price"
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <div className="button-container">
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default SearchBar;