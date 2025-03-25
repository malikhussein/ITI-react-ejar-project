import React, { useEffect } from 'react';
import ProductCard from './ProductCard';

import useProductStore from '../Store/productsStore';

export default function ProductLIst() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
