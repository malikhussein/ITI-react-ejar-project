import React, { useEffect } from "react";
import ListingCard from "../ListingCard/ListingCard";
import products from "../../assets/products.json";
import useProductStore from "../../Store/product";
import useAuthStore from "../../Store/Auth";
import { useParams } from "react-router-dom";

export default function Listings() {
  const { id: userId } = useParams();
  const { userProducts, getUserProducts } = useProductStore();
  const { token } = useAuthStore();

  useEffect(() => {
    getUserProducts(token, userId);
  }, [getUserProducts, token, userId]);

  const confirmedProducts = userProducts.filter(
    (item) => item.confirmed === true
  );

  return (
    <div className="container">
      <h2 className="my-5 border-bottom pb-3 text-center text-lg-start">
        Listings
      </h2>
      <div className="row gx-5 mx-5">
        {userProducts.length === 0 ? (
          <h3 className="text-center mb-5 h1">No Listings Found</h3>
        ) : (
          confirmedProducts.map((product) => (
            <ListingCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
