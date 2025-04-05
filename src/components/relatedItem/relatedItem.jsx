import "./relatedItem.css";
import { Link, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useProductStore } from "../../Store/Deatils";

const RelatedProducts = () => {
  const { product, getAllProd, productList, fetchProduct } = useProductStore();

  const handleFetchProduct = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProduct(id);
  };

  useEffect(() => {
    if (product?.data?.category) {
      console.log(product);

      getAllProd(product.data.category._id);
    }
  }, [product]);

  return (
    <div className="container my-5">
      <h5 className="text-danger fw-bold">Related Item</h5>
      <div className="row">
        {productList
          .filter((p) => p._id !== product?.data?._id && p.confirmed === true)
          .map((product) => (
            <div key={product._id} className="col-md-3 col-sm-12">
              <div className="product-card">
                <div className="image-container">
                  <span className="badge bg-danger discount-badge">
                    {product.discount}
                  </span>
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.images[0]}
                      onClick={() => handleFetchProduct(product._id)}
                      alt={product.name}
                      className="product-image"
                    />
                  </Link>

                  <div className="icons">
                    <span
                      className={`icon heart ${
                        product.isFavorite ? "filled" : "empty"
                      }`}
                    >
                      ♥
                    </span>
                  </div>
                </div>

                <div className="card-body text-center">
                  <Link className="nav-link" to={`/product/${product._id}`}>
                    <h6 className="card-title">{product.name}</h6>
                  </Link>
                  <p className="text-danger fw-bold">{product.daily} EGP/Day</p>
                  <div className="d-flex justify-content-center">
                    {product?.review && product?.review?.length > 0 ? (
                      <p className="text-muted">
                        {Array.from({ length: 5 }, (_, i) => (
                          <i
                            key={i}
                            className={`fa-star ${
                              i + 1 <= Number(product?.averageRating)
                                ? "fas"
                                : "far"
                            }`}
                            style={{
                              color:
                                i + 1 <= Number(product?.averageRating)
                                  ? "gold"
                                  : "lightgray",
                            }}
                          ></i>
                        ))}
                        <span> ({product?.review?.length} Reviews)</span>
                      </p>
                    ) : (
                      <span className="badge bg-success">NEW</span>
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
