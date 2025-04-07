import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const query = useQuery();
  const categoryName = query.get("category"); // Get category from query params
  const [page, setPage] = useState(1); // Track the current page
  const productsPerPage = 4; // Number of products per page

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

  useEffect(() => {
    fetchProducts();
  }, [categoryName]); // Runs when categoryName changes

  // Calculate the products to be displayed on the current page
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const confirmedProducts = currentProducts.filter(
    (item) => item.confirmed === true
  );

  return (
    <>
      <div className="col-md-9">
        {confirmedProducts.length > 0 ? (
          confirmedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <Stack
        spacing={2}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Pagination
          onChange={handlePageChange}
          count={5}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </>
  );
}
