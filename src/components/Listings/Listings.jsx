import React from 'react';
import ListingCard from '../ListingCard/ListingCard';
import products from '../../assets/products.json';

export default function Listings() {
  console.log(products);
  return (
    <div className="container">
      <h2 className="my-5 border-bottom pb-3 text-center text-lg-start">
        Listings
      </h2>
      <div className="row gx-5 mx-5">
        {products.map((product) => (
          <ListingCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
