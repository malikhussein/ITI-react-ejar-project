import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ProductDetailsPage from "../ProductDetailsPage/ProductDetailsPage";

export default function Layout() {
  return (
    <>
      <Navbar />
      <ProductDetailsPage /> <Footer />
    </>
  );
}
