import React from "react";
import useWishlistStore from "../../Store/Wishlist";
import RelatedProducts from "../RelatedProducts/RelatedProducts";
import { Link } from "react-router-dom";
import productImage from "../../assets/1.jpg";


export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist  } = useWishlistStore();

  return (<>
    <div className="container mt-4 wishlist-page">
      <h1 className="mb-4 text-left" style={{ color: "#562DDD", fontWeight: "700" }}>
        Wishlist ({wishlist.length})
      </h1>
 {/* Clear All Button */}
 {wishlist.length > 0 && (
        <button onClick={clearWishlist} className="btn btn mb-3 float-end" style={{ color: "white",  backgroundColor: "#562DDD", margin:10}}>
          <i className="fa-solid fa-trash"></i> Clear All
        </button>
      )}
      <hr />

      {wishlist.length > 0 ? (
        <div className="row gy-4 mb-5 mt-4">
          {wishlist.map((product) => (
            <div key={product.id} className="col-md-3">
              <div className="card h-100 shadow-sm">
                {/* Trash Icon for Remove */}
                <button 
                  className="btn btn-light position-absolute top-0 end-0 m-2"
                  onClick={() => removeFromWishlist(product.id)}
                  style={{ border: "none", background: "transparent", cursor: "pointer" }}
                >
                  <i className="fa-solid fa-trash text-danger"></i>
                </button>

                {/* Product Image */}
                {/* <img src={product.image} className="card-img-top" alt={product.name} /> */}
                <img src={productImage} className="card-img-top" alt={product.name} />

                {/* Product Details */}
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted">{product.price}</p>

                  {/* Add to Cart Button */}
                  <button className="btn btn-dark w-100">
                    <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                  </button>
                  {/* Demo to go back to see product from the demo route */}
                  {/* <Link to={`/product/${product.id}`} className="btn btn-primary">View Product</Link> */}

                </div>
              </div>
            </div>
          ))}
          <br /><hr /><br />
        <RelatedProducts></RelatedProducts>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p className="lead">No Products in Wishlist.</p>
          <Link to="/" className="btn btn-outline-warning">Back to Home</Link>
          </div>
      )}
    </div>
 </> );
}
