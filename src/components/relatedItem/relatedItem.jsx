import './relatedItem.css';
import { Link, useParams } from 'react-router-dom';
import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { useProductStore } from "../../Store/Deatils";




const RelatedProducts = () => {
  const { id } = useParams();


  const { product, getAllProd ,productList ,fetchProduct} = useProductStore();
  const navigate = useNavigate();

  const handleFetchProduct = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  
    // جلب بيانات المنتج
    fetchProduct(id);
  };
  

  let cat = product?.data.category

  useEffect(() => {
    if (product?.data?.category) {
      getAllProd(product.data.category); 
    }
    
  }, [product]);



  return (
    <div className="container my-5">
      <h5 className="text-danger fw-bold">Related Item</h5>
      <div className="row">
        {productList.map((product) => (
          <div key={product._id} className="col-md-3 col-sm-12">
            <div className="product-card">
              <div className="image-container">
                <span className="badge bg-danger discount-badge">
                  {product.discount}
                </span>
                <Link to={`/product/${product._id}`}>
  <img src={product.images[0]} onClick={()=>   handleFetchProduct(product._id)  } alt={product.name} className="product-image" />
</Link>

                <div className="icons">
                <span 
  // className={`icon heart ${true ? "filled" : "empty"}`}
  className={`icon heart ${product.isFavorite ? "filled" : "empty"}`}
>
  ♥
</span>
  
                </div>

                <button className="add-to-cart w-100">Add To Cart</button>
              </div>

              <div className="card-body text-center">
                <Link className="nav-link" to="/product/123">
                  <h6 className="card-title">{product.name}</h6>
                </Link>
                <p className="text-danger fw-bold">
                  {product.price} EGP/Day
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
                          ? 'text-warning'
                          : 'text-secondary'
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
