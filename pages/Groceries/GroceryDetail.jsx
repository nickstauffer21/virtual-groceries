import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getGrocery, getRelatedGroceries } from "../../api";
import { CartContext } from "../Cart/CartProvider";

export default function GroceryDetail() {
  const [grocery, setGrocery] = useState(null);
  const [relatedGroceries, setRelatedGroceries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    async function loadGrocery() {
      setLoading(true);
      try {
        const data = await getGrocery(id);
        setGrocery(data);
        if (data.type) {
          const related = await getRelatedGroceries(data.type);
          setRelatedGroceries(related);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadGrocery();
  }, [id]);

  const handleAddToCart = () => {
    if (grocery) {
      addToCart(grocery);
    }
  };

  if (loading) {
    return <h1 className="loading">Loading...</h1>;
  }
  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }
  if (!grocery) {
    return <h1>No grocery data found</h1>;
  }

  const relatedItems = relatedGroceries
    .filter((item) => item.id !== grocery.id)
    .map((item) => {
      return (
        <div key={item.id} className="related-item">
          <Link to={`/groceries/${item.id}`} className="related-item-link">
            <img src={item.imageUrl} />
            <p>{item.name}</p>
          </Link>
        </div>
      );
    });

  const isWeighted = () => {
    return (
      <div>
        ${grocery.price}
        {grocery.weight ? grocery.weight : "/ea"}
      </div>
    );
  };

  return (
    <>
      <div className="grocery-detail-container">
        <img src={grocery.imageUrl} />
        <div className="grocery-item-detail">
          <h3 className="grocery-detail-name">{grocery.name}</h3>
          <h4 className="grocery-detail-price">{isWeighted()}</h4>
          <button onClick={handleAddToCart} className="grocery-detail-button">
            Add to cart
          </button>
        </div>
      </div>
      <div className="related-items">
        {relatedItems.length > 0 ? <h4>Related Items: </h4> : null}
        <div className="related-items-list">
          {relatedGroceries.length > 0 ? relatedItems : ""}
        </div>
      </div>
    </>
  );
}
