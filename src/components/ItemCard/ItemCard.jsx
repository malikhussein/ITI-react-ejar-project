import React from "react";
import { Link } from "react-router-dom";
import useWishlistStore from "../../Store/Wishlist";
import "./ItemCard.css";
import { useProductStore } from "../../Store/Deatils";

function ItemCard({ item, renderStars }) {
  const handleFetchProduct = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchProduct(id);
  };

  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { fetchProduct } = useProductStore();

  const isWishlisted = wishlist.some((p) => p.id === item._id);

  return (
    <Link
      onClick={() => handleFetchProduct(item._id)}
      className="nav-link"
      to={`/product/${item._id}`}
    >
      <div className="item mb-4">
        <div className="card-icons">
          <div>
            <div
              onClick={(e) => {
                e.preventDefault();
                isWishlisted
                  ? removeFromWishlist(item._id)
                  : addToWishlist(item);
              }}
              style={{ cursor: "pointer" }}
            >
              <i
                className={`fa-heart ${
                  isWishlisted ? "fas text-danger" : "far"
                }`}
              ></i>
            </div>
          </div>
        </div>

        <div className="image">
          <img className="w-100" src={item.images[0]} alt={item.name} />
        </div>

        <h3 className="mt-3 mb-0 fs-5 fw-normal">{item.name}</h3>

        <div className="d-flex gap-3 mt-2">
          <p className="price fw-bold m-0">EGP {item.daily}</p>
          {item.averageRating === 0 ? (
            <div className="newItem m-0">NEW!</div>
          ) : (
            <div className="rating d-flex gap-3 m-0">
              <div className="m-0">{renderStars(item.averageRating)}</div>
              <p className="m-0">{`(${item.review.length})`}</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
