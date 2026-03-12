import React from "react";
import BackButton from "../../Components/BackButton";
import MainButton from "../../Components/MainButton";
import rating45 from "../../assets/ratings/rating-45.png";

const ProductDetails = () => {
  return (
    <div className="mt-10 min-h-screen flex flex-col items-center p-[8%]">
      <div>
        <BackButton />

        <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl mx-auto p-4">
          <div className="flex flex-col gap-4">
            <img
              src="../hero-image-1.jpg"
              alt="Minimalist Sneakers"
              className="w-full  object-cover rounded-md"
            />

            <div className="flex gap-2">
              <img
                src="../hero-image-1.jpg"
                alt="Sneaker view 1"
                className="w-20 h-20 object-cover rounded-md"
              />
              <img
                src="../hero-image-1.jpg"
                alt="Sneaker view 2"
                className="w-20 h-20 object-cover rounded-md"
              />
              <img
                src="../hero-image-1.jpg"
                alt="Sneaker view 3"
                className="w-20 h-20 object-cover rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">Minimalist Sneakers</h2>
            <h5 className="text-xl text-gray-700">$129.00</h5>

            <div className="flex items-center gap-1">
              <img src={rating45} alt="4.5 stars" className="w-20" />
              <span className="text-gray-600">(290)</span>
            </div>

            <p className="text-gray-700">
              Clean lines meet superior comfort in these everyday sneakers.
              Built with a cushioned sole and premium leather upper for lasting
              style and durability.
            </p>

            <span className="text-green-600 font-medium">In Stock</span>

            <MainButton name="Add to Cart" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
