import { Link } from "react-router-dom";
import "./ProductCard.css";
import useWishlistStore from "../../Store/Wishlist";

export default function ProductCard({ product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  console.log("ProductCard", product);
  

  const isWishlisted = wishlist.some((p) => p.id === product.id);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = parseInt(rating, 10);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars)
          .fill()
          .map((_, i) => (
            <span key={`filled-${i}`} className="star filled">
              <i className="fa-solid fa-star"></i>
            </span>
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={`empty-${i}`} className="star empty">
              <i className="fa-regular fa-star"></i>
            </span>
          ))}
      </>
    );
  };

  return (
    <>
      <br />
      <br />
      <br />

      <div className="row g-5 overflow-hidden flex-md-row mb-4 shadow-sm position-relative">
        <div
          id="imgProduct"
          className="col-12 col-md-auto d-flex justify-content-center"
        >
          <Link >
            <img
              src={product.images[0]}
              className="bd-placeholder-img img-fluid"
              width={300}
              height={260}
            />
          </Link>
        </div>

        <div
          id="data"
          className="col-12 col-md-6 p-4 d-flex flex-column position-static text-center text-md-start "
        >
          <Link to={`/product/${product._id}`}>
            <h2 id="title" className="d-inline-block mb-2">
              {product.name}
            </h2>
          </Link>
          <h5>Description:</h5>
          <h5>{product.description.split(" ").splice(0,13).join(" ")}</h5>
          <h2 id="price">{product.daily} E.G</h2>
        </div>

        <div
          id="iconsButtons"
          className="col-12 col-md p-4 d-flex flex-column align-items-center align-items-md-end position-static"
        >
          <h5
            onClick={() =>
              isWishlisted
                ? removeFromWishlist(product.id)
                : addToWishlist(product)
            }
            style={{ cursor: "pointer" }}
          >
            <i
              className={`fa-heart ${isWishlisted ? "fas text-danger" : "far"}`}
            ></i>
          </h5>{" "}

          <h5 className="d-none d-md-block">
          {product.review.length === 0 ? (
            <span className="text-muted">No reviews yet</span>):            
            renderStars( product.averageRating)
          }  
            
          </h5>
          <Link to={`/product/${product._id}`}
            style={{ width: 180 }}
            className="btn btn-secondary rent-button py-2"
          >
          Get Details         
          </Link>
        </div>
      </div>
    </>
  );
}
