import React from 'react';
import './ListingCard.css';
import { Link } from 'react-router-dom';

export default function ListingCard({ product }) {
  console.log(product);
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card border-0">
        <a className="square-image position-relative d-block">
          <Link to="/product/123">
            <img src={product.image} alt="" />
          </Link>
          <h5 onClick={() => console.log('working')}>
            <span className="position-absolute top-0 start-0 badge rounded-pill bg-primary">
              Primary
            </span>
          </h5>
        </a>
        <div className="card-body">
          <Link
            className="card-title text-nowrap overflow-hidden fw-bold h4 text-center text-decoration-none d-block"
            to="/product/123"
          >
            {product.title}
          </Link>
          <div className="d-flex flex-column justify-content-between">
            <p className="card-title h5 mt-1">Listed on 10/2/2025</p>
            <p className="card-title h5 mt-1">{product.price}/day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
