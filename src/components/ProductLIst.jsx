import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

export default function ProductLIst() {
  const [products, setProducts] = useState([]);

  const getallProducts =async () => {
    axios.get("http://localhost:3000/api/product").then((products) => {
      console.log(products.data);
      setProducts(products.data);
    });
  };

  useEffect(() => {
    getallProducts();
  }, []);

  return (
    <>
      <div className="col-md-9">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
      </div>
    </>
  );
}
