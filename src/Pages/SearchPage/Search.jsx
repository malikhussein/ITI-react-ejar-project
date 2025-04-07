import React from "react";
import ProductList from "../../components/ProductLIst";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Search() {
  const query = useQuery();
  const searchTerm = query.get("query"); // القيمة اللي جت من النـاف بار
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/api/product`);
        const data = await res.json();
        console.log(data);

        const searcheddata = data.data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(searcheddata);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <>
      <div className="container">
        <div className="row">
            {/* <Sidebar/> */}

          <div className="search-results">
            {isLoading ? (
              <h2>Loading...</h2>
            ) : results.length > 0 ? (
              results.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <h2>لا يوجد منتجات بهذا الاسم</h2>
            )}
          </div>
        </div>
      </div>
     </>
  );
}
