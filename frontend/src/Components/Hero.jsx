import React from "react";

const Hero = () => {
  return (
    <div class="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 mt-10">
      <div class="text-center mb-12">
        <h1 class="text-2xl md:text-4xl font-bold text-gray-900">
          Shop the Future Today
        </h1>
        <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the latest trends and must-have products delivered to your
          doorstep
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {/* Column 1 */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-400 rounded-md shadow-lg h-72">
            <img
              src="hero-image-5.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="bg-gray-400 rounded-md shadow-lg h-72">
            <img
              src="hero-image-2.jpg"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex justify-center items-center">
          <div className="bg-gray-400 rounded-md shadow-lg h-72 w-full">
            <img
              src="hero-image-6.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Column 3 */}
        <div className="flex justify-center items-center">
          <div className="bg-gray-400 rounded-md shadow-lg h-52 w-full">
            <img
              src="hero-image-1.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Column 4 */}
        <div className="flex justify-center items-center">
          <div className="bg-gray-400 rounded-md shadow-lg h-72 w-full">
            <img
              src="hero-image-7.jpg"
              alt=""
              className="h-full object-cover"
            />
          </div>
        </div>

        {/* Column 5 */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-400 rounded-md shadow-lg h-72">
            <img
              src="hero-image-3.jpg"
              alt=""
              className="h-full object-cover"
            />
          </div>
          <div className="bg-gray-400 rounded-md shadow-lg h-72">
            <img
              src="hero-image-4.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
