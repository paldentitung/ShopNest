import React, { useState, useEffect } from "react";
import BackButton from "../../Components/BackButton";
import MainButton from "../../Components/MainButton";
import rating40 from "../../assets/ratings/rating-40.png";
import rating45 from "../../assets/ratings/rating-45.png";
import rating50 from "../../assets/ratings/rating-50.png";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../Services/productApi";
import ReactMarkdown from "react-markdown";

const ProductDetails = () => {
  const { slug } = useParams();

  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const ratingImages = {
    4.0: rating40,
    4.5: rating45,
    5.0: rating50,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  const product = products.find((p) => p.slug === slug);

  if (!product)
    return <div className="text-center mt-20">Product not found</div>;

  const mainImage = selectedImage || product.images[0];

  return (
    <div className="mt-10 min-h-screen flex flex-col items-center px-[8%] my-10">
      <div className="w-full max-w-6xl">
        <div className="mt-10">
          <BackButton />
        </div>
        <div className="flex flex-col lg:flex-row gap-10 mt-6">
          {/* LEFT SIDE - IMAGES */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-100 object-contain rounded-md "
            />

            <div className="flex gap-3">
              {product.variations && product.variations.length > 0
                ? product.variations.map((variation, index) => (
                    <img
                      key={index}
                      src={variation.image}
                      alt={variation.name}
                      className="w-20 h-20 object-cover rounded-md cursor-pointer"
                    />
                  ))
                : null}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-gray-900">
              {product.name}
            </h2>

            <span className="text-sm text-gray-500">{product.category}</span>

            <h5 className="text-2xl font-bold text-gray-900">
              ${product.priceCents / 100}
            </h5>

            <div className="flex items-center gap-2">
              {product.rating.count > 0 ? (
                <>
                  <img
                    src={ratingImages[product.rating.stars]}
                    alt="rating"
                    className="w-24"
                  />
                  <span className="text-gray-600">
                    ({product.rating.count} reviews)
                  </span>
                </>
              ) : (
                <span className="text-gray-400">No reviews yet</span>
              )}
            </div>

            <div className="space-y-4 text-gray-700">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-2xl font-semibold text-gray-900"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2 className="text-xl font-semibold mt-4" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 space-y-1" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-700" {...props} />
                  ),
                }}
              >
                {product.description}
              </ReactMarkdown>
            </div>

            <div>
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-rose-600 font-medium">Out of Stock</span>
              )}
            </div>

            <div className="pt-4">
              <MainButton name="Add to Cart" disabled={product.stock === 0} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
