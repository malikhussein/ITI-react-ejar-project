import React from "react";
import RelatedProducts from "../relatedItem/relatedItem";
import ProductDetails from "../ProductDetails/productDeatils";
import Reviews from "../reviews/reviews";

export default function ProductDetailsPage() {
  return (
    <>
      <ProductDetails />
      <Reviews />
      <RelatedProducts />
    </>
  );
}
