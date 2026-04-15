import React from "react";
import { useState } from "react";
import { getAllProducts } from "../../Services/productApi";
import { useEffect } from "react";
import ProductListing from "../../Components/product/ProductListing";
const ProductPage = ({ isHidden, isShow, productLimit }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      console.log(res);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const displayedProducts = productLimit
    ? products.slice(0, productLimit)
    : products;
  return (
    <div className="mt-10 bg-white">
      <ProductListing
        products={displayedProducts}
        isHidden={isHidden}
        productLimt={productLimit}
      />
    </div>
  );
};

export default ProductPage;
