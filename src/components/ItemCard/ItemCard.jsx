import React from "react";
import { Link } from "react-router-dom";

import "./ItemCard.css";

function ItemCard({ item, renderStars }) {
  return (
    <Link className="nav-link" to={`/product/${item._id}`}>
      <div className="item mb-4">
        <div className="card-icons">
          <i className="fa-regular fa-heart"></i>
        </div>

        <div className="image">
          <img src={item.images[0]} alt={item.name} />
        </div>

        <h3 className="mt-3 mb-0 fs-5 fw-normal">{item.name}</h3>

        <div className="d-flex gap-3 mt-2">
          <p className="price fw-bold">EGP {item.daily}</p>
          {item.averageRating === 0 ? (
            <div className="newItem">NEW!</div>
          ) : (
            <div className="rating d-flex gap-3">
              <div>{renderStars(item.averageRating)}</div>
              <p>{`(${item.review.length})`}</p>
            </div>

            
          )}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
