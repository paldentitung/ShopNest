import React from "react";
import { useState } from "react";
import { getAllProducts } from "../../Services/productApi";
import { useEffect } from "react";
import ProductListing from "../../Components/ProductListing";
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      console.log(data);
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <ProductListing products={products} />
    </div>
  );
};

export default ProductPage;
