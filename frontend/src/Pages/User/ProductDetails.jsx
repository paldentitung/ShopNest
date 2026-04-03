import React, { useState, useEffect } from "react";
import BackButton from "../../Components/BackButton";
import MainButton from "../../Components/MainButton";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../../Services/productApi";
import ReactMarkdown from "react-markdown";
import { useCart } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { apiFetch } from "../../utils/api";

const StarRow = ({ rating, size = "text-amber-400 text-sm" }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<FaStar key={i} />);
    else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} className="text-gray-300" />);
  }
  return <span className={`flex gap-0.5 ${size}`}>{stars}</span>;
};

const StarPicker = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          className="text-2xl transition-transform duration-100 hover:scale-110"
        >
          {star <= (hovered || value) ? (
            <FaStar className="text-amber-400" />
          ) : (
            <FaRegStar className="text-gray-300" />
          )}
        </button>
      ))}
      {value > 0 && (
        <span className="ml-2 text-sm text-gray-500 self-center">
          {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][value]}
        </span>
      )}
    </div>
  );
};

const WriteReviewModal = ({
  isOpen,
  onClose,
  productName,
  productId,
  onRatingUpdate,
  onRefreshRatings,
}) => {
  const [starValue, setStarValue] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await apiFetch("/ratings", {
      method: "POST",
      body: JSON.stringify({
        productId,
        rating: starValue,
        reviewTitle: title,
        review: body,
      }),
    });

    if (res) {
      toast.success("Rating added!");
      onRatingUpdate(res.avgRating, res.totalRatings);
      await onRefreshRatings();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    Write a Review
                  </h4>
                  <p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
                    {productName}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="px-6 py-6 flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Your Rating <span className="text-rose-400">*</span>
                  </label>
                  <StarPicker value={starValue} onChange={setStarValue} />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Review Title <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Sum it up in a sentence"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Your Review <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="What did you like or dislike? How was the quality?"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition resize-none"
                  />
                  <span className="text-[11px] text-gray-400 text-right">
                    {body.length} / 500
                  </span>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-3">
                <p className="text-[11px] text-gray-400">
                  <span className="text-rose-400">*</span> Required fields
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-200 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ReviewCard = ({ review, index }) => {
  const initials = review.userId?.username?.slice(0, 2).toUpperCase() ?? "??";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
      className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold tracking-wide shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {review.userId?.username}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <StarRow rating={review.rating} />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800 mb-1">
          {review.reviewTitle}
        </p>
        <p className="text-sm text-gray-500 leading-relaxed">{review.review}</p>
      </div>
      {review.verified && (
        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-medium">
          <FaCheckCircle />
          <span>Verified Purchase</span>
        </div>
      )}
    </motion.div>
  );
};

const RatingBar = ({ star, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <span className="w-4 text-right">{star}</span>
      <FaStar className="text-amber-400 shrink-0" />
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full bg-gray-900 rounded-full"
        />
      </div>
      <span className="w-8">{count}</span>
    </div>
  );
};

const ProductDetails = () => {
  const { slug } = useParams();
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      setProducts(res.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const fetchRatings = async (productId) => {
    const res = await apiFetch(`/ratings/${productId}`);
    if (res) setRatings(res.data);
  };

  useEffect(() => {
    if (!slug || !products.length) return;
    console.log("product data", products);
    const product = products.find((p) => p.slug === slug);
    if (!product) return;
    fetchRatings(product._id);
  }, [slug, products]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  console.log("product data", products);

  const product = products.find((p) => p.slug === slug);

  if (!product)
    return (
      <div className="text-center mt-20 text-gray-400">Product not found</div>
    );

  const mainImage = selectedImage || product.images[0];

  const handleAddItem = () => {
    addItem(product._id, 1);
    toast.success("Product Added");
  };

  const totalReviews = product.totalRatings || 0;
  const avgRating = product.averageRating || 0;
  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: ratings.filter((r) => Math.round(r.rating) === s).length,
  }));

  const handleRatingUpdate = (avgRating, totalRatings) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === product._id
          ? { ...p, averageRating: avgRating, totalRatings }
          : p,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <WriteReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        productName={product?.name}
        productId={product._id}
        onRatingUpdate={handleRatingUpdate}
        onRefreshRatings={() => fetchRatings(product._id)}
      />

      <div className="max-w-6xl mx-auto px-6 lg:px-[6%] py-12">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <BackButton />
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 mt-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col gap-4"
          >
            <div className="relative w-full h-96 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex items-center justify-center">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-105"
              />
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-rose-50 text-rose-500 border border-rose-200"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {product.variations && product.variations.length > 0 && (
              <div className="flex gap-3">
                {product.variations.map((variation, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(variation.image)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === variation.image
                        ? "border-gray-900 shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={variation.image}
                      alt={variation.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="w-full lg:w-1/2 flex flex-col gap-5"
          >
            <span className="inline-block self-start text-[11px] font-semibold tracking-widest uppercase text-gray-400 border border-dashed border-gray-300 px-3 py-1 rounded-full">
              {product.category}
            </span>

            <h2 className="text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-extrabold text-gray-900 tracking-tight">
                ${product.priceCents / 100}
              </span>
              <div className="flex items-center gap-2">
                {totalReviews > 0 ? (
                  <>
                    <StarRow
                      rating={parseFloat(avgRating)}
                      size="text-amber-400 text-base"
                    />
                    <span className="text-sm text-gray-500">
                      ({totalReviews})
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-gray-400 italic">
                    No reviews yet
                  </span>
                )}
              </div>
            </div>

            <div className="border-t border-dashed border-gray-200" />

            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-xl font-bold text-gray-900 mt-2"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-lg font-semibold text-gray-800 mt-3"
                      {...props}
                    />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="leading-relaxed text-gray-600" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul
                      className="list-disc pl-5 space-y-1 text-gray-600"
                      {...props}
                    />
                  ),
                  li: ({ node, ...props }) => <li {...props} />,
                }}
              >
                {product.description}
              </ReactMarkdown>
            </div>

            <div className="border-t border-dashed border-gray-200" />

            <motion.div whileTap={{ scale: 0.98 }}>
              <MainButton
                name="Add to Cart"
                onClick={handleAddItem}
                disabled={product.stock === 0}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-1">
                Customer Feedback
              </p>
              <h3 className="text-2xl font-bold text-gray-900">Reviews</h3>
            </div>
            <span className="text-sm text-gray-400">
              {totalReviews} reviews
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-5 sticky top-8">
                <div className="flex flex-col items-center gap-2 pb-4 border-b border-dashed border-gray-100">
                  {totalReviews > 0 ? (
                    <>
                      <span className="text-6xl font-extrabold text-gray-900 tracking-tight">
                        {avgRating}
                      </span>
                      <StarRow
                        rating={parseFloat(avgRating)}
                        size="text-amber-400 text-base"
                      />
                      <span className="text-xs text-gray-400">
                        out of 5 · {totalReviews} reviews
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      No reviews yet
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2.5">
                  {starCounts.map(({ star, count }) => (
                    <RatingBar
                      key={star}
                      star={star}
                      count={count}
                      total={ratings.length}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="mt-2 w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-sm font-semibold text-gray-500 hover:border-gray-900 hover:text-gray-900 transition-all duration-200"
                >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              {ratings.length > 0 ? (
                ratings.map((review, index) => (
                  <ReviewCard key={review._id} review={review} index={index} />
                ))
              ) : (
                <p>No Rating Yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
