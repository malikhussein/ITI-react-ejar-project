import React, { useEffect } from 'react';
import Sidebar from '../Sidebar';
import ProductLIst from '../ProductLIst';

export default function ProductPage() {
  useEffect(() => {
    document.title = 'Explore Products | EJAR';
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <Sidebar />

          <ProductLIst />
        </div>
      </div>
    </>
  );
}
