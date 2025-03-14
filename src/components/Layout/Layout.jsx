import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ProductCard from "../ProductCard";
import ProductPage from "../Product Page/ProductPage";

export default function Layout() {
  return (
    <>
      <Navbar />
      <ProductPage />
      <Outlet />
      <Footer />
    </>
  );
}
