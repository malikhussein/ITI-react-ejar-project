import "./relatedItem.css";
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../../Store/Deatils";
import ItemCard from "../ItemCard/ItemCard";

const RelatedProducts = () => {
  const { product, getAllProd, productList,isLoading  } = useProductStore();

  useEffect(() => {
    if (product?.data?.category) {
      getAllProd(product.data.category._id);
    }
  }, [product]);

  const relatedProducts = productList.filter(
    (p) => p._id !== product?.data?._id && p.confirmed === true
  );

  return (
    <div className="container my-5">
      <h5 className="text-danger fw-bold">Related Item</h5>
     <div className="row">
    {isLoading ? (
      <div className="text-center w-100 py-4">
        <div className="spinner-border text-primary" role="status"></div>
        <h2>loading</h2>
      </div>
    ) : relatedProducts.length > 0 ? (
      relatedProducts.map((product) => (
        <div key={product._id} className="col-md-3 col-sm-12">
          <ItemCard
            item={product}
            renderStars={(rating) =>
              Array.from({ length: 5 }, (_, i) => (
                <i
                  key={i}
                  className={`fa-star ${i + 1 <= rating ? "fas" : "far"}`}
                  style={{ color: i + 1 <= rating ? "gold" : "lightgray" }}
                ></i>
              ))
            }
          />
        </div>
      ))
    ) : (
      <div className="text-center w-100 py-4">
<h2>No related products found</h2>
</div>
    )}
  </div>
    </div>
  );
};

export default RelatedProducts;
