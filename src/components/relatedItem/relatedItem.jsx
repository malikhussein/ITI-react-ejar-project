import './relatedItem.css';
import { Link, useParams } from 'react-router-dom';
import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";


import { useProductStore } from "../../Store/Deatils";




const RelatedProducts = () => {


  const { product, getAllProd ,productList ,fetchProduct} = useProductStore();

  const handleFetchProduct = (id) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  
    
    fetchProduct(id);
  };


  

  useEffect(() => {
    if (product?.data?.category) {
      console.log(product.data.category.name);
      
      getAllProd(product.data.category._id); 
    }
    
  }, [product]);



  return (
    <div className="container my-5">
      <h5 className="text-danger fw-bold">Related Item</h5>
      <div className="row">
        {productList.map((product) => (
          <div key={product.id} className="col-md-3 col-sm-12">
            <div className="product-card">
              <div className="image-container">
                <span className="badge bg-danger discount-badge">
                  {product.discount}
                </span>
                <Link to={`/product/${product.id}`}>
  <img src={product.images[0]} onClick={()=>   handleFetchProduct(product.id)  } alt={product.name} className="product-image" />
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
                  {product.daily} EGP/Day
              
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
