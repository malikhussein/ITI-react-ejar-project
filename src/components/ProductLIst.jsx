import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

import useProductStore from '../Store/productsStore';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

// const { products, fetchProducts } = useProductStore();

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};


export default function ProductLIst() {

  const [products, setProducts] = useState([]);

  const query = useQuery();
  const categoryName = query.get("category"); // Get category from query params

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product`, {
          params: { category: categoryName }, // Send category as query param
        });

        setProducts(response.data.data);
      } catch (err) {
        console.log( (err.message));
      }
    };

    if (categoryName) {
      fetchProducts();
    }
  }, [categoryName]);
  
  return (
    <>
      <div className="col-md-9">
        {products ? (
          products.map((product) => {
            return <ProductCard product={product} />;
          })
        ) : (
          <h1>loading</h1>
        )}
      </div>
    </>
  );
}
