import React, { Children } from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Outlet />
      {children}
      <Footer />
    </>
  );
}
