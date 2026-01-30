import products from "../data/productData";

import ProductCard from "./ProductCard";
const ProductListing = ({ products }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 flex flex-col gap-8">
      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800">
        Products
      </h2>

      {/* Grid */}
      <div className="w-full max-w-360 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {(products || []).map((product, index) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
