import React from 'react';
import RelatedProducts from '../relatedItem/relatedItem';
import ProductDetails from '../ProductDetails/productDeatils';
import Reviews from '../reviews/reviews';
import RentProductModal from '../RentProductModal/RentProductModal';

export default function ProductDetailsPage() {
  return (
    <>
      <RentProductModal />
      <ProductDetails />
      <Reviews />
      <RelatedProducts />
    </>
  );
}
