import React, { useState, useEffect, useContext } from "react";
import "./Groceries.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getGroceries } from "../../api";
import { Link, useSearchParams } from "react-router-dom";
import { CartContext } from "../Cart/CartProvider";
import Fuse from "fuse.js";

export default function Groceries() {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState([]);

  const { addToCart } = useContext(CartContext);

  const typeFilter = searchParams.get("type");

  useEffect(() => {
    async function loadGroceries() {
      setLoading(true);
      try {
        const data = await getGroceries();
        setGroceries(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadGroceries();
  }, []);

  const displayedGroceries = typeFilter
    ? groceries.filter((grocery) => grocery.type === typeFilter)
    : groceries;

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const isWeighted = (grocery) => {
    return `${grocery.price}${
      grocery.weight ? ` / ${grocery.weight}` : " / ea"
    }`;
  };

  const groceriesToDisplay = searchResults.length
    ? searchResults
    : displayedGroceries;

  const groceriesElement = groceriesToDisplay.map((groc) => {
    return (
      <div key={groc.id} className="groc-item">
        <Link
          to={groc.id}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
          <img src={groc.imageUrl} />
          <div className="groc-info">
            <h3>{groc.name}</h3>
            <div className="price-info">${isWeighted(groc)}</div>
          </div>
        </Link>
        <button
          className="add-to-cart-button"
          onClick={() => handleAddToCart(groc)}
        >
          Add to cart
        </button>
      </div>
    );
  });

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  const fuse = new Fuse(groceries, {
    keys: ["name", "type"],
    threshold: 0.3,
  });

  const handleSearch = (query) => {
    const searchResults = fuse.search(query);
    setSearchResults(searchResults.map(({ item }) => item));
  };

  return (
    <div>
      <div className="grocery-container">
        <div>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className="grocery-items-main-page">{groceriesElement}</div>
      </div>
    </div>
  );
}
