import React from "react";
import "./relatedItem.css";
const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-40%",
    rating: 4,
    reviews: 88,
    image: "../../../public/img/1.jpg",
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    price: "$960",
    oldPrice: "$1160",
    discount: "-35%",
    rating: 3.5,
    reviews: 75,
    image: "./../../public/img/2.jpg",
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    price: "$370",
    oldPrice: "$400",
    discount: "-30%",
    rating: 4.5,
    reviews: 99,
    image: "./../../public/img/3.jpg",
  },
  {
    id: 4,
    name: "RGB liquid CPU Cooler",
    price: "$160",
    oldPrice: "$170",
    discount: "-10%",
    rating: 4,
    reviews: 65,
    image: "./../../public/img/8.jpg",
  },
];

const RelatedProducts = () => {
  return (
    <div className="container my-5">
      <h5 className="text-danger fw-bold">Related Item</h5>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-12">
            <div className="product-card">
              {/* عرض الصورة */}
              <div className="image-container">
                <span className="badge bg-danger discount-badge">
                  {product.discount}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />

                <div className="icons">
                  <span className="icon heart">♥</span>
                  <span className="icon eye">👁</span>
                </div>

                <button className="add-to-cart w-100">Add To Cart</button>
              </div>

              <div className="card-body text-center">
                <h6 className="card-title">{product.name}</h6>
                <p className="text-danger fw-bold">
                  {product.price}{" "}
                  <span className="text-muted text-decoration-line-through">
                    {product.oldPrice}
                  </span>
                </p>
                <div className="d-flex justify-content-center">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < product.rating
                          ? "text-warning"
                          : "text-secondary"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-muted ms-2">({product.reviews})</span>
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
