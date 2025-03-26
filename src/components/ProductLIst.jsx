import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useLocation } from "react-router-dom";
import axios from "axios";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const categoryName = query.get("category"); // Get category from query params

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product`, {
          params: categoryName ? { category: categoryName } : {}, // If no category, fetch all products
        });

        console.log("Fetched Products:", response.data.data); // Debugging log
        setProducts(response.data.data);
      } catch (err) {
        console.log("Error fetching products:", err.message);
      }
    };

    fetchProducts();
  }, [categoryName]); // Runs when categoryName changes

  return (
    <div className="col-md-9">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
